export const dynamic = "force-dynamic";

async function forward(method, body) {
  try {
    const upstream = await fetch(new URL("/notes", process.env.API_URL), {
      method,
      headers: body === undefined ? {} : { "Content-Type": "application/json" },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (upstream.status >= 500) throw new Error("Upstream unavailable");
    return Response.json(await upstream.json(), {
      status: upstream.status,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json({ error: "Layanan catatan tidak tersedia. Coba lagi nanti." }, {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}

export function GET() {
  return forward("GET");
}

export async function POST(request) {
  let body;
  try {
    body = JSON.stringify(await request.json());
  } catch {
    return Response.json({ error: "JSON tidak valid." }, { status: 400 });
  }
  return forward("POST", body);
}
