"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, User, Sparkles, MessageSquare, ShieldAlert } from "lucide-react";
import {
  WAR_ROOM_PERSONAS,
  type WarRoomPersonaId,
  type PersonaProfile,
} from "@/lib/types/personas";
import type { VentureDossier } from "@/lib/types/domain";

interface WarRoomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  dossier?: VentureDossier;
}

interface ChatMessage {
  id: string;
  sender: "user" | "advisor";
  personaId?: WarRoomPersonaId;
  personaName?: string;
  avatarIcon?: string;
  text: string;
  timestamp: string;
}

let messageSeq = 0;
function createMessageId(prefix: string): string {
  messageSeq++;
  return `${prefix}_${messageSeq}`;
}

function getFormattedTime(): string {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

export function WarRoomDrawer({ isOpen, onClose, dossier }: WarRoomDrawerProps) {
  const [activePersonaId, setActivePersonaId] = useState<WarRoomPersonaId>("yc_partner");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuestion, setInputQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activePersona: PersonaProfile = WAR_ROOM_PERSONAS[activePersonaId];
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when drawer opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Close drawer on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSend = async (questionText?: string) => {
    const q = (questionText || inputQuestion).trim();
    if (!q || isLoading) return;

    setInputQuestion("");
    setErrorMessage(null);

    const userMsg: ChatMessage = {
      id: createMessageId("usr"),
      sender: "user",
      text: q,
      timestamp: getFormattedTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/warroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personaId: activePersonaId,
          question: q,
          dossierContext: dossier,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || errJson.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const advisorMsg: ChatMessage = {
        id: createMessageId("adv"),
        sender: "advisor",
        personaId: activePersonaId,
        personaName: activePersona.name,
        avatarIcon: activePersona.avatarIcon,
        text: data.answer,
        timestamp: getFormattedTime(),
      };

      setMessages((prev) => [...prev, advisorMsg]);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to contact War Room advisor."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="warroom-title"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-slate-50 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/90 dark:bg-slate-900/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h2 id="warroom-title" className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">
                  Interactive War Room Co-Pilot
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {dossier ? `Context: ${dossier.framing.ventureName}` : "General Advisory"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close War Room"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Persona Switcher Tabs */}
          <div className="p-2 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/30 grid grid-cols-4 gap-1.5">
            {Object.values(WAR_ROOM_PERSONAS).map((persona) => {
              const isActive = persona.id === activePersonaId;
              return (
                <button
                  key={persona.id}
                  onClick={() => setActivePersonaId(persona.id)}
                  className={`flex flex-col items-center p-2 rounded-xl text-center transition-all ${
                    isActive
                      ? "bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`}
                >
                  <span className="text-base mb-0.5">{persona.avatarIcon}</span>
                  <span className="text-[10px] font-semibold truncate w-full">
                    {persona.name.split(" ")[0]}
                  </span>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 truncate w-full">
                    {persona.role.split(",")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Persona Banner */}
          <div className="px-4 py-2.5 bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/60 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-900 dark:text-white mr-1.5">
                {activePersona.name}
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-normal">
                ({activePersona.role})
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {activePersona.tagline}
              </p>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-8 px-4">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mx-auto flex items-center justify-center text-2xl mb-3 shadow-inner">
                  {activePersona.avatarIcon}
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                  Consult with {activePersona.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
                  {activePersona.tagline}
                </p>

                {/* Suggested Prompts */}
                <div className="text-left space-y-2 max-w-md mx-auto">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
                    Suggested Diligence Inquiries:
                  </div>
                  {activePersona.suggestedPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(prompt)}
                      className="w-full text-left p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-between group"
                    >
                      <span className="line-clamp-2">{prompt}</span>
                      <Sparkles className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "advisor" && (
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-sm shrink-0">
                      {msg.avatarIcon || "🤖"}
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-emerald-600 text-white rounded-tr-sm"
                        : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm whitespace-pre-line"
                    }`}
                  >
                    {msg.sender === "advisor" && (
                      <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center justify-between">
                        <span>{msg.personaName}</span>
                        <span className="text-slate-500 dark:text-slate-400 font-normal">{msg.timestamp}</span>
                      </div>
                    )}
                    {msg.text}
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-sm shrink-0">
                  {activePersona.avatarIcon}
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  <span>{activePersona.name} is evaluating the dossier...</span>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/60">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                placeholder={`Ask ${activePersona.name.split(" ")[0]} anything about your startup...`}
                disabled={isLoading}
                className="flex-1 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputQuestion.trim() || isLoading}
                className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                aria-label="Send Inquiry"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
