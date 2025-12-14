"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

const CONSENT_KEY = "strathmark_cookie_consent_v1";
const GA_MEASUREMENT_ID = "G-6W1G9FJ5TV";

function getConsentValue() {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function Analytics() {
  const consent = useSyncExternalStore(
    () => () => {
      // No-op subscription: consent changes cause reload or state change elsewhere.
    },
    () => getConsentValue(),
    () => null
  );

  if (consent !== "analytics") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}


