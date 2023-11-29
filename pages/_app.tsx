import '@/styles/globals.css';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { useEffect, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { supabase } from '../utils/supabase';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case 'FCP':
      console.log(`FCP ${Math.round(metric.value * 10) / 10}`);
      break;
    case 'LCP':
      console.log(`LCP ${Math.round(metric.value * 10) / 10}`);
      break;
    case 'TTFB':
      console.log(`TTFB ${Math.round(metric.value * 10) / 10}`);
      break;
    case 'Next.js-hydration':
      console.log(
        `Hydration ${Math.round(metric.startTime * 10) / 10} → ${
          Math.round((metric.startTime + metric.value) * 10) / 10
        }`
      );
      break;
    default:
      break;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps, router }: AppProps) {
  const validateSession = useCallback(async () => {
    const user = await supabase.auth.getUser();
    if (user.data.user && router.pathname === '/') {
      router.push('/dashboard');
    } else if (!user && router.pathname !== '/') {
      router.push('/');
    }
  }, [router]);
  supabase.auth.onAuthStateChange((event, _) => {
    if (event === 'SIGNED_IN' && router.pathname === '/') {
      router.push('/dashboard');
    } else if (event === 'SIGNED_OUT') {
      router.push('/');
    }
  });

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
