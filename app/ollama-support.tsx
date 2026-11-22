"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

const OLLAMA_URL = "http://localhost:11434";
const SYSTEM_PROMPT =
  "You are StageVerge Learn's concise, encouraging learning companion. Help learners understand concepts, plan projects, and build practical skills. Explain ideas clearly, ask clarifying questions when useful, and do not claim access to course materials unless the learner includes them.";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  error?: boolean;
};

type ModelResponse = {
  models?: { name?: string }[];
};

type ChatChunk = {
  message?: { content?: string };
  error?: string;
};

function SparkIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
      <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />
    </svg>
  );
}

export default function OllamaSupport({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [models, setModels] = useState<string[]>([]);
  const [model, setModel] = useState("llama3.2");
  const [connected, setConnected] = useState(false);
  const [checking, setChecking] = useState(false);
  const [connectionError, setConnectionError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const checkConnection = useCallback(async () => {
    setChecking(true);
    setConnectionError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 4000);

    try {
      const response = await fetch(`${OLLAMA_URL}/api/tags`, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`Ollama returned HTTP ${response.status}.`);
      }

      const data = (await response.json()) as ModelResponse;
      const availableModels = (data.models ?? [])
        .map((entry) => entry.name)
        .filter((name): name is string => Boolean(name));
      setModels(availableModels);
      setModel((current) =>
        availableModels.includes(current) ? current : availableModels[0] ?? current,
      );
      setConnected(true);
      setConnectionError(
        availableModels.length === 0
          ? "Ollama is running, but no model is installed. Run ollama pull llama3.2."
          : "",
      );
    } catch (error) {
      setConnected(false);
      setModels([]);
      setConnectionError(
        error instanceof Error && error.name === "AbortError"
          ? "Ollama did not respond. Make sure it is running locally."
          : "Could not reach Ollama. Start Ollama and allow this site in OLLAMA_ORIGINS.",
      );
    } finally {
      window.clearTimeout(timeout);
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    if (open) void checkConnection();
  }, [checkConnection, open]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = draft.trim();
    if (!content || sending) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };
    const assistantId = crypto.randomUUID();
    const history = messages
      .filter((message) => !message.error)
      .slice(-8)
      .map(({ role, content: messageContent }) => ({
        role,
        content: messageContent,
      }));

    setDraft("");
    setSending(true);
    setMessages((current) => [
      ...current,
      userMessage,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch(`${OLLAMA_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          stream: true,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...history,
            { role: userMessage.role, content: userMessage.content },
          ],
        }),
      });

      if (!response.ok) {
        const detail = await response.text();
        throw new Error(
          detail.trim() || `Ollama returned HTTP ${response.status}.`,
        );
      }
      if (!response.body) {
        throw new Error("Ollama returned an empty response stream.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let receivedContent = false;

      const addChunk = (line: string) => {
        if (!line.trim()) return;
        const chunk = JSON.parse(line) as ChatChunk;
        if (chunk.error) throw new Error(chunk.error);
        const text = chunk.message?.content;
        if (text) {
          receivedContent = true;
          setMessages((current) =>
            current.map((message) =>
              message.id === assistantId
                ? { ...message, content: message.content + text }
                : message,
            ),
          );
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        buffer += decoder.decode(value, { stream: !done });
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() ?? "";
        for (const line of lines) addChunk(line);
        if (done) break;
      }
      addChunk(buffer);
      if (!receivedContent) {
        throw new Error("The selected model returned an empty answer.");
      }
    } catch (error) {
      const detail =
        error instanceof TypeError
          ? "Connection blocked. Check that Ollama is running and OLLAMA_ORIGINS includes this site."
          : error instanceof Error
            ? error.message
            : "The request to Ollama failed.";
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId
            ? {
                ...message,
                content: `I couldn’t get a response: ${detail}`,
                error: true,
              }
            : message,
        ),
      );
      setConnected(false);
      setConnectionError(detail);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {open && (
        <section
          className="support-panel"
          aria-label="Ollama learning support"
          aria-modal="false"
          role="dialog"
        >
          <header className="support-header">
            <div className="support-brand-icon">
              <SparkIcon size={18} />
            </div>
            <div className="support-heading">
              <strong>StageVerge AI</strong>
              <span className={connected ? "model-status online" : "model-status"}>
                <i />
                {checking
                  ? "Connecting to Ollama…"
                  : connected
                    ? models.length > 0
                      ? `${model} · running locally`
                      : "Ollama connected · no model found"
                    : "Ollama disconnected"}
              </span>
            </div>
            <button
              className="support-close"
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close AI support"
            >
              ×
            </button>
          </header>

          {(!connected || models.length === 0) && !checking && (
            <div className="ollama-alert" role="status">
              <span>{connectionError}</span>
              <button type="button" onClick={() => void checkConnection()}>
                Retry
              </button>
            </div>
          )}

          {models.length > 0 && (
            <label className="model-picker">
              <span>MODEL</span>
              <select value={model} onChange={(event) => setModel(event.target.value)}>
                {models.map((availableModel) => (
                  <option key={availableModel} value={availableModel}>
                    {availableModel}
                  </option>
                ))}
              </select>
            </label>
          )}

          <div className="support-messages" ref={listRef} aria-live="polite">
            <div className="message-row assistant-row">
              <span className="message-avatar"><SparkIcon size={14} /></span>
              <div className="message-bubble">
                <p>
                  Hey Alex! I&apos;m your learning companion. What are you
                  working through today?
                </p>
                <div className="suggested-prompts">
                  {[
                    "Explain product-market fit",
                    "Help me plan a study session",
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => setDraft(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {messages.map((message) => (
              <div
                className={`message-row ${message.role === "user" ? "user-row" : "assistant-row"}`}
                key={message.id}
              >
                {message.role === "assistant" && (
                  <span className="message-avatar"><SparkIcon size={14} /></span>
                )}
                <div
                  className={`message-bubble${message.error ? " message-error" : ""}`}
                >
                  {message.content || (
                    <span className="typing-indicator" aria-label="AI is responding">
                      <i /><i /><i />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form className="support-composer" onSubmit={sendMessage}>
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask anything about your learning..."
              aria-label="Message your AI learning companion"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={!draft.trim() || sending}
              aria-label="Send message"
            >
              {sending ? (
                <span className="send-loading" />
              ) : (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              )}
            </button>
          </form>
          <p className="support-privacy">
            <span>⌑</span> Runs on your device with Ollama. Your chats stay local.
          </p>
        </section>
      )}

      <button
        className={`support-launcher${open ? " launcher-open" : ""}`}
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-label={open ? "Close AI learning support" : "Open AI learning support"}
        aria-expanded={open}
      >
        {open ? <span className="launcher-x">×</span> : <SparkIcon size={20} />}
        {!open && <span>Ask your AI tutor</span>}
      </button>
    </>
  );
}
