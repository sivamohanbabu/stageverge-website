"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";

type ContrastMode = "standard" | "soft" | "high";

function ReaderIcon({
  name,
  size = 18,
}: {
  name: "book" | "upload" | "minus" | "plus" | "chevron" | "music" | "shield" | "arrow";
  size?: number;
}) {
  const paths = {
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
        <path d="M4 5.5v16M8 7h8M8 11h7" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4m-5 5 5-5 5 5" />
        <path d="M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
      </>
    ),
    minus: <path d="M5 12h14" />,
    plus: <path d="M12 5v14m-7-7h14" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    music: (
      <>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  };

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
      {paths[name]}
    </svg>
  );
}

export default function PdfReader() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [zoom, setZoom] = useState(100);
  const [contrast, setContrast] = useState<ContrastMode>("standard");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!pdfFile) {
      setPdfUrl("");
      return;
    }

    const url = URL.createObjectURL(pdfFile);
    setPdfUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [pdfFile]);

  useEffect(() => {
    if (!audioFile) {
      setAudioUrl("");
      return;
    }

    const url = URL.createObjectURL(audioFile);
    setAudioUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [audioFile]);

  function choosePdf(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Choose a PDF file to open in your reading room.");
      return;
    }

    setError("");
    setPage(1);
    setPageInput("1");
    setZoom(100);
    setPdfFile(file);
  }

  function chooseAudio(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setAudioFile(file);
  }

  function changePage(nextPage: number) {
    const safePage = Math.max(1, Math.floor(nextPage));
    setPage(safePage);
    setPageInput(String(safePage));
  }

  function submitPage() {
    const requestedPage = Number.parseInt(pageInput, 10);
    if (Number.isFinite(requestedPage)) changePage(requestedPage);
    else setPageInput(String(page));
  }

  return (
    <main className="reader-shell">
      <header className="reader-topbar">
        <a className="reader-brand" href="/" aria-label="StageVerge Reader home">
          <span className="reader-brand-mark">S</span>
          <span className="reader-brand-name">stageverge<span> / reader</span></span>
        </a>
        <div className="reader-topbar-center">
          <span className="reader-status-dot" />
          A quiet space to learn
        </div>
        <div className="reader-private-label">
          <ReaderIcon name="shield" size={15} />
          <span>Private by design</span>
        </div>
      </header>

      <div className="reader-layout">
        <aside className="reader-sidebar">
          <div className="reader-sidebar-heading">
            <span className="reader-eyebrow">YOUR SPACE</span>
            <button
              className="reader-icon-button reader-add-button"
              type="button"
              aria-label="Open a local PDF"
              onClick={() => fileInputRef.current?.click()}
            >
              <ReaderIcon name="plus" size={17} />
            </button>
          </div>

          <button
            className={`reader-library-item${pdfFile ? " is-active" : ""}`}
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="reader-library-icon"><ReaderIcon name="book" size={17} /></span>
            <span className="reader-library-copy">
              <strong>{pdfFile ? pdfFile.name : "Open a document"}</strong>
              <small>{pdfFile ? "On this device" : "Choose a PDF to begin"}</small>
            </span>
            <ReaderIcon name="chevron" size={15} />
          </button>

          <div className="reader-sidebar-divider" />
          <span className="reader-eyebrow reader-sidebar-subhead">A GENTLE READING ROUTE</span>
          <ol className="reader-route">
            <li className="is-current">
              <span className="reader-route-number">01</span>
              <span><strong>Settle in</strong><small>Choose your material</small></span>
            </li>
            <li>
              <span className="reader-route-number">02</span>
              <span><strong>Read with care</strong><small>Move at your own pace</small></span>
            </li>
            <li>
              <span className="reader-route-number">03</span>
              <span><strong>Keep one idea</strong><small>Pause and reflect</small></span>
            </li>
          </ol>

          <div className="reader-sidebar-note">
            <span className="reader-note-spark">✳</span>
            <p>A little focus goes a long way.</p>
            <span>Make this time your own.</span>
          </div>

          <div className="reader-sidebar-footer">
            <ReaderIcon name="shield" size={15} />
            <span>Your files never leave this device.</span>
          </div>
        </aside>

        <section className="reader-main" aria-label="PDF reading room">
          <div className="reader-page-heading">
            <div>
              <span className="reader-eyebrow">YOUR READING ROOM</span>
              <h1>Make space for a new idea.</h1>
              <p>Bring your own reading. We’ll take care of the little things.</p>
            </div>
            <div className="reader-heading-action">
              <input
                ref={fileInputRef}
                className="reader-hidden-input"
                type="file"
                accept="application/pdf,.pdf"
                onChange={choosePdf}
                aria-label="Choose a PDF from this device"
              />
              <button
                className="reader-open-button"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                <ReaderIcon name="upload" size={17} />
                <span>{pdfFile ? "Change PDF" : "Open a PDF"}</span>
              </button>
            </div>
          </div>

          {error && <p className="reader-error" role="alert">{error}</p>}

          <div className="reader-toolbar">
            <div className="reader-page-controls" aria-label="Page navigation">
              <button
                className="reader-toolbar-button"
                type="button"
                aria-label="Previous page"
                onClick={() => changePage(page - 1)}
                disabled={!pdfFile || page <= 1}
              >
                <span className="reader-chevron-left"><ReaderIcon name="chevron" size={16} /></span>
              </button>
              <label className="reader-page-number">
                <span>Page</span>
                <input
                  type="number"
                  min="1"
                  value={pageInput}
                  disabled={!pdfFile}
                  onChange={(event) => setPageInput(event.target.value)}
                  onBlur={submitPage}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      submitPage();
                      event.currentTarget.blur();
                    }
                  }}
                />
              </label>
              <button
                className="reader-toolbar-button"
                type="button"
                aria-label="Next page"
                onClick={() => changePage(page + 1)}
                disabled={!pdfFile}
              >
                <ReaderIcon name="chevron" size={16} />
              </button>
            </div>

            <span className="reader-toolbar-divider" />

            <div className="reader-zoom-controls" aria-label="Zoom controls">
              <button
                className="reader-toolbar-button"
                type="button"
                aria-label="Zoom out"
                disabled={!pdfFile || zoom <= 50}
                onClick={() => setZoom((current) => Math.max(50, current - 10))}
              >
                <ReaderIcon name="minus" size={16} />
              </button>
              <span className="reader-zoom-value">{zoom}%</span>
              <button
                className="reader-toolbar-button"
                type="button"
                aria-label="Zoom in"
                disabled={!pdfFile || zoom >= 200}
                onClick={() => setZoom((current) => Math.min(200, current + 10))}
              >
                <ReaderIcon name="plus" size={16} />
              </button>
            </div>

            <span className="reader-toolbar-divider reader-contrast-divider" />

            <div className="reader-contrast-controls" aria-label="Page contrast">
              <span className="reader-contrast-label">Contrast</span>
              {(["standard", "soft", "high"] as const).map((mode) => (
                <button
                  className={`reader-contrast-option contrast-${mode}${contrast === mode ? " is-selected" : ""}`}
                  type="button"
                  key={mode}
                  aria-label={`${mode} contrast`}
                  aria-pressed={contrast === mode}
                  disabled={!pdfFile}
                  onClick={() => setContrast(mode)}
                />
              ))}
            </div>
          </div>

          <div className="reader-viewer-wrap">
            {pdfUrl ? (
              <>
                <div className="reader-document-caption">
                  <span className="reader-file-indicator" />
                  <span className="reader-document-name">{pdfFile?.name}</span>
                  <span className="reader-caption-separator">·</span>
                  <span>Page {page}</span>
                </div>
                <iframe
                  className={`reader-pdf-frame reader-contrast-${contrast}`}
                  title={pdfFile ? `PDF reader: ${pdfFile.name}` : "PDF reader"}
                  src={`${pdfUrl}#page=${page}&zoom=${zoom}`}
                />
              </>
            ) : (
              <div className="reader-empty-state">
                <div className="reader-empty-art" aria-hidden="true">
                  <span className="reader-art-back" />
                  <span className="reader-art-page">
                    <i /><i /><i /><b />
                  </span>
                  <span className="reader-art-spark">✳</span>
                </div>
                <span className="reader-eyebrow">A FRESH PAGE</span>
                <h2>Your next idea starts here.</h2>
                <p>Open a PDF from your device to settle in and read.</p>
                <button
                  className="reader-empty-button"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose a PDF <ReaderIcon name="arrow" size={16} />
                </button>
                <span className="reader-local-caption">
                  <ReaderIcon name="shield" size={14} />
                  It opens locally. Nothing is uploaded.
                </span>
              </div>
            )}
          </div>

          {pdfFile && (
            <div className="reader-viewer-footer">
              <span>Use the document controls to navigate pages and find text.</span>
              <button type="button" onClick={() => fileInputRef.current?.click()}>
                Choose another document <ReaderIcon name="arrow" size={14} />
              </button>
            </div>
          )}
        </section>

        <aside className="reader-study-panel">
          <span className="reader-eyebrow">A LITTLE GUIDANCE</span>
          <h2>Read with intention.</h2>
          <p className="reader-study-intro">No rush. A simple rhythm can help an idea stay with you.</p>

          <div className="reader-study-steps">
            <div className="reader-study-step">
              <span className="reader-step-orb orb-lilac">01</span>
              <p><strong>Begin with a question</strong><span>What would you like to understand?</span></p>
            </div>
            <div className="reader-step-connector" />
            <div className="reader-study-step">
              <span className="reader-step-orb orb-coral">02</span>
              <p><strong>Pause between ideas</strong><span>Let the important parts land.</span></p>
            </div>
            <div className="reader-step-connector" />
            <div className="reader-study-step">
              <span className="reader-step-orb orb-gold">03</span>
              <p><strong>Make it your own</strong><span>Keep one thought to return to.</span></p>
            </div>
          </div>

          <div className="reader-panel-divider" />
          <div className="reader-audio-heading">
            <div className="reader-audio-icon"><ReaderIcon name="music" size={17} /></div>
            <div><h3>Soundtrack your focus</h3><span>Use audio you have permission to play.</span></div>
          </div>
          <input
            ref={audioInputRef}
            className="reader-hidden-input"
            type="file"
            accept="audio/*"
            onChange={chooseAudio}
            aria-label="Choose an audio file from this device"
          />
          {!audioFile ? (
            <button
              className="reader-audio-select"
              type="button"
              onClick={() => audioInputRef.current?.click()}
            >
              <ReaderIcon name="plus" size={15} />
              Add a local audio file
            </button>
          ) : (
            <div className="reader-audio-player">
              <div className="reader-audio-file">
                <span className="reader-audio-mini-icon"><ReaderIcon name="music" size={14} /></span>
                <span title={audioFile.name}>{audioFile.name}</span>
                <button
                  type="button"
                  aria-label="Choose a different audio file"
                  onClick={() => audioInputRef.current?.click()}
                >
                  Change
                </button>
              </div>
              <audio controls src={audioUrl}>Your browser does not support audio playback.</audio>
            </div>
          )}
          <p className="reader-audio-note">Your audio stays on this device.</p>
        </aside>
      </div>
    </main>
  );
}
