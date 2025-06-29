import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { infoMessages } from "@/data/responseMessages"
import { InfoModel } from "@/model/InfoModel"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const [rows] = await db.query(
      "SELECT id, title, content FROM info WHERE id = ?",
      [id]
    )
    const results = Array.isArray(rows) ? (rows as InfoModel[]) : []

    if (results.length === 0) {
      return NextResponse.json(
        { error: infoMessages.notFound },
        { status: 404 }
      )
    }

    return NextResponse.json(results[0])
  } catch (error) {
    console.error("Erreur MySQL (GET /api/infos/[id]) :", error)
    return NextResponse.json({ error: infoMessages.server }, { status: 500 })
  }
}
