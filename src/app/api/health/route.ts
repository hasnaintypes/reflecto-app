import { NextResponse } from "next/server";
import { db } from "@/server/db";
import pkg from "../../../../package.json";

/**
 * Health check endpoint.
 *
 * Used by uptime monitors (e.g. Upkeep) and deployment platforms to verify
 * that the app is running and can reach its critical dependencies.
 *
 * - Always runs on the Node.js runtime (needs a real DB connection).
 * - Never cached, so monitors always see the live status.
 * - Returns 200 when healthy, 503 when a dependency check fails.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DB_CHECK_TIMEOUT_MS = 5000;

const withTimeout = async <T>(
  promise: Promise<T>,
  timeoutMs: number,
  label: string,
): Promise<T> => {
  let timeoutId: ReturnType<typeof setTimeout>;

  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error(`${label} timed out after ${timeoutMs}ms`)),
      timeoutMs,
    );
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timeoutId!);
  }
};

interface CheckResult {
  status: "ok" | "error";
  latencyMs: number;
  error?: string;
}

const checkDatabase = async (): Promise<CheckResult> => {
  const start = Date.now();
  try {
    await withTimeout(
      db.$queryRaw`SELECT 1`,
      DB_CHECK_TIMEOUT_MS,
      "Database check",
    );
    return { status: "ok", latencyMs: Date.now() - start };
  } catch (error) {
    console.error("[Health Check] Database check failed:", error);
    return {
      status: "error",
      latencyMs: Date.now() - start,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

const buildResponse = async () => {
  const startedAt = Date.now();
  const database = await checkDatabase();

  const checks = { database };
  const isHealthy = Object.values(checks).every(
    (check) => check.status === "ok",
  );

  return {
    isHealthy,
    payload: {
      status: isHealthy ? "ok" : "error",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      version: pkg.version,
      environment: process.env.NODE_ENV,
      responseTimeMs: Date.now() - startedAt,
      checks,
    },
  };
};

export async function GET() {
  const { isHealthy, payload } = await buildResponse();

  return NextResponse.json(payload, {
    status: isHealthy ? 200 : 503,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}

export async function HEAD() {
  const { isHealthy } = await buildResponse();

  return new NextResponse(null, {
    status: isHealthy ? 200 : 503,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
