"use client";

import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

const GA_MEASUREMENT_ID = "G-6W1G9FJ5TV";
const CLARITY_PROJECT_ID = "wce5rr4juk";

export function Analytics() {
  return (
    <>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />

      <Script id="clarity-stylesheet-unmask" strategy="afterInteractive">
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

      <Script id="microsoft-clarity" strategy="afterInteractive">
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
