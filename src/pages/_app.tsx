// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from 'next-themes'
import "../styles/globals.css";
//import { useRouter } from "next/router";
//import { useEffect } from "react";
//import * as Fathom from 'fathom-client';

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  //const router = useRouter();

  //useEffect(() => {
  //  // Initialize Fathom when the app loads
  //  // Example: yourdomain.com
  //  //  - Do not include https://
  //  //  - This must be an exact match of your domain.
  //  //  - If you're using www. for your domain, make sure you include that here.
  //  Fathom.load(process.env.FATHOM_SITE_ID || '', {
  //    includedDomains: ['clientstrust.me'],
  //  });

  //  function onRouteChangeComplete() {
  //    Fathom.trackPageview();
  //  }
  //  // Record a pageview when route changes
  //  router.events.on('routeChangeComplete', onRouteChangeComplete);

  //  // Unassign event listener
  //  return () => {
  //    router.events.off('routeChangeComplete', onRouteChangeComplete);
  //  };
  //}, []);
  return (
    <SessionProvider session={session}>
      <ThemeProvider enableSystem={false}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.browser) return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
