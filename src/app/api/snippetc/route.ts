//CREATE + LIST

import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

import { requireUser } from "@/lib/permissions"

export async function POST(req: Request) {
    try {
        const user = await requireUser(req)

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const body = await req.json()

        const snippet = await prisma.snippet.create({
            data: {
                title: body.title,
                code: body.code,
                language: body.language,
                isPublic: body.isPublic ?? false,
                userId: user.id
            }
        })

        return NextResponse.json(snippet)
    } catch (error) {
        console.error("Error creating snippet:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET(req: Request) {
    const user = await requireUser(req)

    const snippets = await prisma.snippet.findMany({
        where: { userId: user?.id },
        orderBy: { createdAt: "desc" }
    })

    return Response.json(snippets)
}
