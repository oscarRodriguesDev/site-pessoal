import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const COSMIC_API = process.env.API_URL;
const WRITE_KEY = process.env.COSMIC_WRITE_KEY;

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
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado" },
        { status: 400 }
      );
    }

    // Validar tipo do arquivo
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Tipo de arquivo não suportado. Use JPEG, PNG, WebP ou GIF.",
        },
        { status: 400 }
      );
    }

    // Validar tamanho (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Arquivo muito grande. Máximo 5MB." },
        { status: 400 }
      );
    }

    // Preparar FormData para o Cosmic JS
    const cosmicForm = new FormData();
    cosmicForm.append("media", file, file.name);

    const res = await fetch(`${COSMIC_API}media`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WRITE_KEY}`,
      },
      body: cosmicForm,
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: `Erro ao fazer upload: ${errorText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const mediaUrl = data?.media?.url || data?.url || null;

    if (!mediaUrl) {
      return NextResponse.json(
        { error: "URL da mídia não retornada pelo Cosmic" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: mediaUrl }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        error: `Erro interno: ${
          err instanceof Error ? err.message : "desconhecido"
        }`,
      },
      { status: 500 }
    );
  }
}
