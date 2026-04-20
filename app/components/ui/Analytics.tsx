"use client";

import Script from "next/script";
import { useEffect } from "react";

const CONSENT_KEY = "strathmark_cookie_consent_v1";
const GA_MEASUREMENT_ID = "G-6W1G9FJ5TV";
const CLARITY_PROJECT_ID = "wce5rr4juk";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  // If the user has already consented, upgrade analytics storage on mount.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(CONSENT_KEY);
    } catch {
      stored = null;
    }

    if (stored === "analytics" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  }, []);

  return (
    <>
      {/* Consent Mode defaults should be set before gtag loads */}
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
        `}
      </Script>

      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="beforeInteractive"
      />

      <Script id="ga4-init" strategy="beforeInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>

      <Script id="clarity-stylesheet-unmask" strategy="beforeInteractive">
        {`
(function() {
  function normaliseStylesheetLink(link) {
    if (!(link instanceof HTMLLinkElement)) return;
    if (link.rel !== 'stylesheet' || !link.getAttribute('href')) return;

    link.setAttribute('data-clarity-unmask', 'true');

    var rawHref = link.getAttribute('href');
    if (!rawHref) return;

    if (rawHref.startsWith('/')) {
      link.setAttribute('href', new URL(rawHref, window.location.origin).toString());
    }
  }

  function normaliseExistingStylesheets(root) {
    root.querySelectorAll('link[rel="stylesheet"][href]').forEach(normaliseStylesheetLink);
  }

  function watchHead() {
    if (!document.head) return;

    normaliseExistingStylesheets(document);

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (!(node instanceof Element)) return;

          if (node.matches('link[rel="stylesheet"][href]')) {
            normaliseStylesheetLink(node);
          }

          normaliseExistingStylesheets(node);
        });
      });
    });

    observer.observe(document.head, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', watchHead, { once: true });
  } else {
    watchHead();
  }
})();
        `}
      </Script>

      <Script id="microsoft-clarity" strategy="beforeInteractive">
        {`
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
        `}
      </Script>
    </>
  );
}
