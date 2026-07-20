export type VisitorEventType =
  | "pageview"
  | "scroll"
  | "exit"
  | "outbound_click"
  | "heartbeat"
  | "offline_attempt";

export type VisitorConsentMode = "unknown" | "unset" | "essential" | "analytics";

export type VisitorIpSource =
  | "x-vercel-forwarded-for"
  | "x-forwarded-for"
  | "x-real-ip"
  | "unavailable";

export type VisitorQueryParam = {
  key: string;
  value: string | null;
};

export type VisitorLocationConfidence = "precise" | "city" | "country" | "unknown";
export type VisitorLocationPermissionState =
  | "granted"
  | "prompt"
  | "denied"
  | "unsupported"
  | "unavailable";

export type VisitorAnalyticsEvent = {
  id: string;
  recordedAt: string;
  eventType: VisitorEventType;
  page: {
    href: string;
    path: string;
    pathname: string | null;
    search: string | null;
    title: string | null;
    referrer: string | null;
    referrerHost: string | null;
    queryParams: VisitorQueryParam[];
  };
  marketing: {
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
    utmContent: string | null;
    utmTerm: string | null;
    gclid: string | null;
    fbclid: string | null;
    msclkid: string | null;
    ttclid: string | null;
    liFatId: string | null;
  };
  sessionId: string | null;
  consentMode: VisitorConsentMode;
  request: {
    method: string;
    host: string | null;
    ip: string | null;
    forwardedFor: string | null;
    realIp: string | null;
    userAgent: string | null;
    acceptLanguage: string | null;
    vercelId: string | null;
    deploymentUrl: string | null;
    ipSource: VisitorIpSource;
  };
  parsedUserAgent: {
    isBot: boolean;
    browserName: string | null;
    browserVersion: string | null;
    engineName: string | null;
    osName: string | null;
    osVersion: string | null;
    deviceType: string | null;
    deviceVendor: string | null;
    deviceModel: string | null;
    cpuArchitecture: string | null;
  };
  location: {
    continent: string | null;
    country: string | null;
    region: string | null;
    city: string | null;
    postalCode: string | null;
    latitude: string | null;
    longitude: string | null;
    timezone: string | null;
    confidence: VisitorLocationConfidence;
    precise: {
      latitude: number | null;
      longitude: number | null;
      accuracyMeters: number | null;
      altitudeMeters: number | null;
      altitudeAccuracyMeters: number | null;
      headingDegrees: number | null;
      speedMetersPerSecond: number | null;
      capturedAt: string | null;
      source: "browser-geolocation" | "ip-header" | "none";
      permissionState: VisitorLocationPermissionState | null;
    };
  };
  client: {
    language: string | null;
    languages: string[];
    timezone: string | null;
    colorScheme: "light" | "dark" | "no-preference" | null;
    screen: {
      width: number;
      height: number;
      pixelRatio: number | null;
      colorDepth: number | null;
    } | null;
    viewport: {
      width: number;
      height: number;
    } | null;
    device: {
      platform: string | null;
      vendor: string | null;
      maxTouchPoints: number | null;
      hardwareConcurrency: number | null;
      deviceMemory: number | null;
      cookieEnabled: boolean | null;
      doNotTrack: string | null;
      online: boolean | null;
    } | null;
    network: {
      effectiveType: string | null;
      downlink: number | null;
      rtt: number | null;
      saveData: boolean | null;
    } | null;
  };
  engagement: {
    scrollPercent: number | null;
    maxScrollPercent: number | null;
    timeOnPageMs: number | null;
    idleForMs: number | null;
    isVisible: boolean | null;
    isFocused: boolean | null;
  };
  performance: {
    dnsMs: number | null;
    tcpMs: number | null;
    tlsMs: number | null;
    requestMs: number | null;
    responseMs: number | null;
    domInteractiveMs: number | null;
    domCompleteMs: number | null;
    loadEventMs: number | null;
    transferSize: number | null;
    encodedBodySize: number | null;
    decodedBodySize: number | null;
    redirectCount: number | null;
  };
  link: {
    href: string | null;
    host: string | null;
    text: string | null;
  };
};

export type VisitorAnalyticsStorageInfo = {
  driver: "supabase" | "none";
  durability: "durable" | "not-configured";
  location: string;
  label: string;
};

export type VisitorAnalyticsFeedInfo = {
  loadedEventCount: number;
  totalEventCount: number;
  hasMore: boolean;
  limit: number;
};
