"use client";

import { useEffect, useState } from "react";

const NEWS_URL =
  "https://hn.algolia.com/api/v1/search_by_date?query=AI&tags=story&hitsPerPage=5";
const NEWS_SEARCH_URL = "https://hn.algolia.com/?query=AI&type=story";
const REFRESH_INTERVAL = 15 * 60 * 1000;

type HackerNewsHit = {
  objectID?: string;
  title?: string;
  url?: string | null;
  created_at_i?: number;
};

type HackerNewsResponse = {
  hits?: HackerNewsHit[];
};

type NewsStory = {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: number | null;
  sample: boolean;
};

const sampleStories: NewsStory[] = [
  {
    id: "sample-open-models",
    title: "Explore open models for private AI projects",
    url: "https://huggingface.co/blog",
    source: "Hugging Face Blog",
    publishedAt: null,
    sample: true,
  },
  {
    id: "sample-rag",
    title: "See how retrieval helps AI answer from trusted sources",
    url: "https://arxiv.org/list/cs.CL/recent",
    source: "arXiv · Computation and Language",
    publishedAt: null,
    sample: true,
  },
  {
    id: "sample-evaluation",
    title: "Explore evaluation tools for reliable AI applications",
    url: "https://github.com/topics/llm-evaluation",
    source: "GitHub Topics",
    publishedAt: null,
    sample: true,
  },
];

function parseStories(hits: HackerNewsHit[]): NewsStory[] {
  return hits
    .flatMap((hit) => {
      if (!hit.objectID || !hit.title?.trim()) return [];

      const discussionUrl = `https://news.ycombinator.com/item?id=${encodeURIComponent(hit.objectID)}`;
      const articleUrl = hit.url?.startsWith("https://")
        ? hit.url
        : discussionUrl;
      const host = articleUrl.match(/^https:\/\/([^/?#]+)/i)?.[1];
      if (!host) return [];

      return [
        {
          id: hit.objectID,
          title: hit.title.trim(),
          url: articleUrl,
          source: host.replace(/^www\./i, ""),
          publishedAt:
            typeof hit.created_at_i === "number" &&
            Number.isFinite(hit.created_at_i)
              ? hit.created_at_i
              : null,
          sample: false,
        },
      ];
    })
    .slice(0, 5);
}

function formatPublishedAt(timestamp: number | null) {
  if (timestamp === null) return "Demo update";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp * 1000));
}

export default function NewsFeed() {
  const [stories, setStories] = useState(sampleStories);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadStories() {
      setIsLoading(true);
      setLoadError("");

      try {
        const response = await fetch(NEWS_URL, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error(`The news service returned HTTP ${response.status}.`);
        }

        const data = (await response.json()) as HackerNewsResponse;
        const latestStories = parseStories(data.hits ?? []);
        if (latestStories.length === 0) {
          throw new Error("The news service returned no usable AI stories.");
        }

        if (active) {
          setStories(latestStories);
          setIsLive(true);
        }
      } catch (error) {
        if (!active || controller.signal.aborted) return;
        setStories(sampleStories);
        setIsLive(false);
        setLoadError(
          error instanceof Error ? error.message : "The news request failed.",
        );
      } finally {
        if (active && !controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadStories();
    const refreshTimer = window.setTimeout(
      () => setRefreshKey((current) => current + 1),
      REFRESH_INTERVAL,
    );

    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(refreshTimer);
    };
  }, [refreshKey]);

  return (
    <section
      className="news-feed-card"
      id="news"
      aria-labelledby="news-feed-title"
    >
      <div className="news-feed-heading">
        <div>
          <p className="overline">AI &amp; OPEN SOURCE</p>
          <h2 id="news-feed-title">News feed</h2>
        </div>
        <button
          className="news-feed-refresh"
          type="button"
          onClick={() => setRefreshKey((current) => current + 1)}
          disabled={isLoading}
          aria-label="Refresh AI news feed"
        >
          {isLoading ? "Loading" : "Refresh"}
        </button>
      </div>

      <p
        className={`news-feed-status${isLive ? " news-feed-live" : ""}`}
        role="status"
      >
        {isLoading
          ? "Checking for the latest AI stories…"
          : isLive
            ? "Live from Hacker News"
            : "Sample AI updates"}
      </p>

      {loadError && (
        <p className="news-feed-error" role="status">
          Live feed unavailable: {loadError}. Showing clearly labeled sample
          updates instead.
        </p>
      )}

      <div className="news-feed-stories">
        {stories.map((story) => (
          <article className="news-feed-story" key={story.id}>
            <a href={story.url} target="_blank" rel="noopener noreferrer">
              {story.title}
            </a>
            <div>
              <span>
                {story.sample ? "Sample · " : ""}
                {story.source}
              </span>
              <time
                dateTime={
                  story.publishedAt
                    ? new Date(story.publishedAt * 1000).toISOString()
                    : undefined
                }
              >
                {formatPublishedAt(story.publishedAt)}
              </time>
            </div>
          </article>
        ))}
      </div>

      <a
        className="news-feed-more"
        href={NEWS_SEARCH_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Explore all AI stories <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
