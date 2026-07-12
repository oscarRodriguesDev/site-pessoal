import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-dev-secret"
);

const ADMIN_USER = process.env.ADMIN_USER || "oscar.rodrigues";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Rk40&Sr32@%";

export interface TokenPayload {
  user: string;
  iat: number;
  exp: number;
}

export async function createToken(): Promise<string> {
  return new SignJWT({ user: ADMIN_USER })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

export function validateCredentials(
  user: string,
  password: string
): boolean {
  return user === ADMIN_USER && password === ADMIN_PASSWORD;
}
