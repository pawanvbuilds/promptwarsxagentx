import type { SourceCitation } from "../types/domain";

export interface SearchHit {
  title: string;
  url: string;
  snippet: string;
  domain: string;
}

/**
 * Extracts clean domain name from URL string
 */
export function extractCleanDomain(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return rawUrl;
  }
}

/**
 * Normalizes, deduplicates, and validates source citations
 */
export function deduplicateCitations(
  hits: SearchHit[],
  maxLimit = 6
): SourceCitation[] {
  const seenUrls = new Set<string>();
  const citations: SourceCitation[] = [];

  for (const hit of hits) {
    if (!hit.url || seenUrls.has(hit.url)) continue;

    // Validate URL syntax
    try {
      new URL(hit.url);
      seenUrls.add(hit.url);
      citations.push({
        title: hit.title || hit.domain || "Web Source",
        url: hit.url,
        domain: hit.domain || extractCleanDomain(hit.url),
        snippet: hit.snippet ? hit.snippet.slice(0, 300) : undefined,
      });
      if (citations.length >= maxLimit) break;
    } catch {
      // Skip invalid URLs
    }
  }

  return citations;
}
