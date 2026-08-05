"use client";

import { useState } from "react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import createEmotionCache from "./createEmotionCache";
import ThemeRegistry from "./themeRegistry";

const clientSideEmotionCache = createEmotionCache();

interface EmotionRegistryProps {
  children: React.ReactNode;
  emotionCache?: EmotionCache;
}

export default function EmotionRegistry({
  children,
  emotionCache = clientSideEmotionCache,
}: EmotionRegistryProps) {
  const [cache] = useState(emotionCache);

  useServerInsertedHTML(() => {
    if (!cache.sheet.tags.length) {
      return null;
    }

    const styles = cache.sheet.tags
      .map((tag) => tag.textContent)
      .join("");

    return (
      <style
        data-emotion={`${cache.key} ${cache.sheet.tags.map((tag) => tag.key).join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeRegistry>{children}</ThemeRegistry>
    </CacheProvider>
  );
}
