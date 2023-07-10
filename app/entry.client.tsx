import { CacheProvider } from '@emotion/react';
import { RemixBrowser } from '@remix-run/react';

import React, { StrictMode, startTransition, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';

import LogRocket from 'logrocket';

import { ClientStyleContext } from '~/context';
import createEmotionCache, { defaultCache } from '~/createEmotionCache';

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(defaultCache);

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <ClientCacheProvider>
          <RemixBrowser />
        </ClientCacheProvider>
      </StrictMode>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}

LogRocket.init('sfcmdn/portfolio-remix');
