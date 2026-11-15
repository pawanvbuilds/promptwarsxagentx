import { deduplicateCitations, extractCleanDomain, type SearchHit } from "./citations";

async function queryTinySearch(query: string): Promise<SearchHit[]> {
  const apiKey = process.env.TINYFISH_API_KEY?.trim();
  if (!apiKey) return [];

  try {
    const res = await fetch("https://agent.tinyfish.io/api/v1/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({ query, limit: 5 }),
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) return [];
    const data = (await res.json()) as {
      results?: Array<{ title?: string; url?: string; snippet?: string }>;
    };

    if (!Array.isArray(data.results)) return [];
    return data.results
      .filter((r): r is { title?: string; url: string; snippet?: string } => Boolean(r.url))
      .map((r) => ({
        title: r.title || extractCleanDomain(r.url),
        url: r.url,
        snippet: r.snippet || "",
        domain: extractCleanDomain(r.url),
      }));
  } catch {
    return [];
  }
}

async function queryDuckDuckGo(query: string): Promise<SearchHit[]> {
  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];

    const data = (await res.json()) as {
      Heading?: string;
      AbstractText?: string;
      AbstractURL?: string;
      RelatedTopics?: Array<{ Text?: string; FirstURL?: string }>;
    };

    const hits: SearchHit[] = [];

    if (data.AbstractURL && data.AbstractText) {
      hits.push({
        title: data.Heading || "Executive Brief",
        url: data.AbstractURL,
        snippet: data.AbstractText,
        domain: extractCleanDomain(data.AbstractURL),
      });
    }

    if (Array.isArray(data.RelatedTopics)) {
      for (const item of data.RelatedTopics) {
        if (item.FirstURL && item.Text) {
          hits.push({
            title: item.Text.split(" - ")[0]?.slice(0, 80) || "Industry Insight",
            url: item.FirstURL,
            snippet: item.Text,
            domain: extractCleanDomain(item.FirstURL),
          });
        }
      }
    }

    return hits;
  } catch {
    return [];
  }
}

/**
 * Searches the live web with multi-tier fallback (TinySearch -> DuckDuckGo)
 */
export async function executeLiveGrounding(query: string): Promise<{
  hits: SearchHit[];
  formattedContext: string;
}> {
  if (!query || query.trim().length === 0) {
    return { hits: [], formattedContext: "No live web queries specified." };
  }

  let hits = await queryTinySearch(query);
  if (hits.length === 0) {
    hits = await queryDuckDuckGo(query);
  }

  const citations = deduplicateCitations(hits, 5);

  const formattedContext = citations.length > 0
    ? citations
        .map(
          (c, idx) =>
            `[Source ${idx + 1}] ${c.title}\nURL: ${c.url}\nContext: ${c.snippet || "Relevant industry reference."}`
        )
        .join("\n\n")
    : "Live web search returned minimal public disclosures. Rely on authoritative industry benchmarks and economic heuristics.";

  return { hits, formattedContext };
}
