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

    // Validar tipo do arquivo (qualquer image/*)
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Tipo de arquivo não suportado. Envie uma imagem." },
        { status: 400 }
      );
    }

    // Validar tamanho (máx 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Arquivo muito grande. Máximo 10MB." },
        { status: 400 }
      );
    }

    // Ler o arquivo como ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Enviar para o Cosmic JS como raw binary (mais confiável que multipart)
    const res = await fetch(`${COSMIC_API}media`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WRITE_KEY}`,
        "Content-Type": file.type,
        "Content-Length": buffer.length.toString(),
      },
      body: buffer,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Cosmic upload error:", res.status, errorText);
      return NextResponse.json(
        { error: `Erro ao fazer upload (${res.status})` },
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
    console.error("Upload error:", err);
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
