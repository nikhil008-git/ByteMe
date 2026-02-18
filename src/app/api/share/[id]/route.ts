// app/api/share/[id]/route.ts
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
    req: Request,
    context: { params: { id: string } }
) {
    const params = await context.params;

    if (!params?.id) {
        return new NextResponse("ID is required", { status: 400 });
    }

    const snippet = await prisma.snippet.findUnique({
        where: { id: params.id }
    })

    // Only return if snippet is public
    if (!snippet || !snippet.isPublic) {
        return new NextResponse("Not Found", { status: 404 })
    }

    return NextResponse.json(snippet)
}
