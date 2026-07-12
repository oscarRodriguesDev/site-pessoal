/**
 * Auth utilities for Edge Runtime (middleware).
 * Uses Web Crypto API instead of jose (which uses Node.js APIs).
 */

async function getSecretKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const secret = process.env.JWT_SECRET || "fallback-dev-secret";
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function base64UrlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
}

export async function verifyTokenEdge(
  token: string
): Promise<{ user: string } | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const header = JSON.parse(new TextDecoder().decode(base64UrlDecode(parts[0])));
    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(parts[1])));
    const signature = parts[2];

    if (header.alg !== "HS256") return null;

    // Verify HMAC signature
    const key = await getSecretKey();
    const data = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);
    const expectedSig = await crypto.subtle.sign("HMAC", key, data);
    const expectedSigStr = base64UrlEncode(expectedSig);

    if (signature !== expectedSigStr) return null;

    // Check expiration
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;

    return { user: payload.user };
  } catch {
    return null;
  }
}
