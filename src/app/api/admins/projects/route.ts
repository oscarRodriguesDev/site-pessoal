import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const COSMIC_API = process.env.API_URL;
const WRITE_KEY = process.env.COSMIC_WRITE_KEY;

interface ProjectInput {
  title: string;
  slug: string;
  short_description: string;
  description: string;
  tech_stack: string[];
  live_url: string;
  github_url?: string;
  featured_image_url?: string;
  screenshot_urls?: string[];
}

export async function POST(req: NextRequest) {
  // Verificar autenticação
  const token = req.cookies.get("admin_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  if (!COSMIC_API || !WRITE_KEY) {
    return NextResponse.json(
      { error: "API do Cosmic não configurada" },
      { status: 500 }
    );
  }

  try {
    const body: ProjectInput = await req.json();

    // Validações básicas
    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: "Título e slug são obrigatórios" },
        { status: 400 }
      );
    }

    // Montar objeto para o Cosmic JS
    const cosmicObject: Record<string, unknown> = {
      title: body.title,
      type: "projects",
      slug: body.slug,
      metadata: {
        title: body.title,
        short_description: body.short_description || "",
        description: body.description || "",
        featured_image: body.featured_image_url
          ? { url: body.featured_image_url }
          : null,
        screenshots: body.screenshot_urls?.map((url) => ({ url })) ?? [],
        tech_stack: body.tech_stack ?? [],
        live_url: body.live_url || "",
        github_url: body.github_url || null,
        featured: false,
      },
    };

    const res = await fetch(`${COSMIC_API}objects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${WRITE_KEY}`,
      },
      body: JSON.stringify(cosmicObject),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: `Erro ao criar projeto: ${errorText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, object: data.object }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: `Erro interno: ${err instanceof Error ? err.message : "desconhecido"}` },
      { status: 500 }
    );
  }
}

// Listar projetos (para o dashboard)
export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  if (!COSMIC_API) {
    return NextResponse.json(
      { error: "API do Cosmic não configurada" },
      { status: 500 }
    );
  }

  try {
    const readKey = process.env.COSMIC_READ_KEY;
    const url = `${COSMIC_API}objects?read_key=${readKey}&type=projects&props=slug,title,type,metadata`;
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Erro ao buscar projetos" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ objects: data?.objects ?? [] });
  } catch (err) {
    return NextResponse.json(
      { error: `Erro interno: ${err instanceof Error ? err.message : "desconhecido"}` },
      { status: 500 }
    );
  }
}
