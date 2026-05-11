import { z } from "zod";

const nullableShortString = z.string().trim().min(1).max(255).nullable().optional();
const nullableLongString = z.string().trim().min(1).max(2048).nullable().optional();
const boundedNumber = z.number().finite().nonnegative();
const signedLatitude = z.number().finite().gte(-90).lte(90);
const signedLongitude = z.number().finite().gte(-180).lte(180);
const visitorEventTypeSchema = z.enum([
  "pageview",
  "scroll",
  "exit",
  "outbound_click",
  "heartbeat",
]);
const visitorLocationPermissionStateSchema = z.enum([
  "granted",
  "prompt",
  "denied",
  "unsupported",
  "unavailable",
]);

export const clientVisitorEventSchema = z.object({
  type: visitorEventTypeSchema.default("pageview"),
  href: z.string().url().max(2048),
  path: z.string().trim().min(1).max(1024),
  pathname: nullableLongString,
  search: nullableLongString,
  title: nullableLongString,
  referrer: nullableLongString,
  referrerHost: nullableShortString,
  queryParams: z
    .array(
      z.object({
        key: z.string().trim().min(1).max(64),
        value: z.string().trim().max(512).nullable().optional(),
      })
    )
    .max(32)
    .optional(),
  marketing: z
    .object({
      utmSource: nullableShortString,
      utmMedium: nullableShortString,
      utmCampaign: nullableShortString,
      utmContent: nullableShortString,
      utmTerm: nullableShortString,
      gclid: nullableShortString,
      fbclid: nullableShortString,
      msclkid: nullableShortString,
      ttclid: nullableShortString,
      liFatId: nullableShortString,
    })
    .optional(),
  preciseLocation: z
    .object({
      latitude: signedLatitude,
      longitude: signedLongitude,
      accuracyMeters: boundedNumber.max(1_000_000).nullable().optional(),
      altitudeMeters: z.number().finite().min(-20_000).max(20_000).nullable().optional(),
      altitudeAccuracyMeters: boundedNumber.max(1_000_000).nullable().optional(),
      headingDegrees: boundedNumber.max(360).nullable().optional(),
      speedMetersPerSecond: boundedNumber.max(1000).nullable().optional(),
      capturedAt: z.string().datetime().max(64).nullable().optional(),
      source: z.enum(["browser-geolocation"]).default("browser-geolocation"),
      permissionState: visitorLocationPermissionStateSchema.nullable().optional(),
    })
    .optional(),
  sessionId: z.string().uuid().nullable().optional(),
  language: nullableShortString,
  languages: z.array(z.string().trim().min(1).max(32)).max(10).optional(),
  timezone: nullableShortString,
  colorScheme: z.enum(["light", "dark", "no-preference"]).nullable().optional(),
  screen: z
    .object({
      width: boundedNumber.max(20000),
      height: boundedNumber.max(20000),
      pixelRatio: boundedNumber.max(10).nullable().optional(),
      colorDepth: boundedNumber.max(128).nullable().optional(),
    })
    .optional(),
  viewport: z
    .object({
      width: boundedNumber.max(20000),
      height: boundedNumber.max(20000),
    })
    .optional(),
  device: z
    .object({
      platform: nullableShortString,
      vendor: nullableShortString,
      maxTouchPoints: boundedNumber.max(20).nullable().optional(),
      hardwareConcurrency: boundedNumber.max(256).nullable().optional(),
      deviceMemory: boundedNumber.max(1024).nullable().optional(),
      cookieEnabled: z.boolean().nullable().optional(),
      doNotTrack: nullableShortString,
      online: z.boolean().nullable().optional(),
    })
    .optional(),
  network: z
    .object({
      effectiveType: nullableShortString,
      downlink: boundedNumber.max(10000).nullable().optional(),
      rtt: boundedNumber.max(100000).nullable().optional(),
      saveData: z.boolean().nullable().optional(),
    })
    .optional(),
  engagement: z
    .object({
      scrollPercent: boundedNumber.max(100).nullable().optional(),
      maxScrollPercent: boundedNumber.max(100).nullable().optional(),
      timeOnPageMs: boundedNumber.max(86_400_000).nullable().optional(),
      idleForMs: boundedNumber.max(86_400_000).nullable().optional(),
      isVisible: z.boolean().nullable().optional(),
      isFocused: z.boolean().nullable().optional(),
    })
    .optional(),
  performance: z
    .object({
      dnsMs: boundedNumber.max(86_400_000).nullable().optional(),
      tcpMs: boundedNumber.max(86_400_000).nullable().optional(),
      tlsMs: boundedNumber.max(86_400_000).nullable().optional(),
      requestMs: boundedNumber.max(86_400_000).nullable().optional(),
      responseMs: boundedNumber.max(86_400_000).nullable().optional(),
      domInteractiveMs: boundedNumber.max(86_400_000).nullable().optional(),
      domCompleteMs: boundedNumber.max(86_400_000).nullable().optional(),
      loadEventMs: boundedNumber.max(86_400_000).nullable().optional(),
      transferSize: boundedNumber.max(1_000_000_000).nullable().optional(),
      encodedBodySize: boundedNumber.max(1_000_000_000).nullable().optional(),
      decodedBodySize: boundedNumber.max(1_000_000_000).nullable().optional(),
      redirectCount: boundedNumber.max(100).nullable().optional(),
    })
    .optional(),
  link: z
    .object({
      href: z.string().url().max(2048).nullable().optional(),
      host: nullableShortString,
      text: z.string().trim().max(255).nullable().optional(),
    })
    .optional(),
});

export type ClientVisitorEvent = z.infer<typeof clientVisitorEventSchema>;
