//only for read, update & delete

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"
import { requireUser } from "@/lib/permissions"

export async function PATCH(req: Request, context: { params: { id: string } }) {
    const params = await context.params; // unwrap the promise
    const user = await requireUser(req);
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    if (!params?.id) {
        return new NextResponse("ID is required", { status: 400 });
    }

    console.log("params.id:", params.id);

    const body = await req.json();


    const snippet = await prisma.snippet.findUnique({
        where: { id: params.id }
    });


    if (!snippet || snippet.userId !== user.id) {
        return new NextResponse("Forbidden", { status: 403 });
    }

    try {
        const updated = await prisma.snippet.update({
            where: { id: params.id },
            data: body
        });
        return NextResponse.json(updated);
    } catch (err) {
        console.error("Update failed:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export async function DELETE(req: Request,
    context: { params: { id: string } }) {
    try {
        const params = await context.params; // unwrap the promise
        const user = await requireUser(req)

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        await prisma.snippet.deleteMany({
            where: {
                id: params.id,
                userId: user.id
            }
        })
        return new NextResponse("Deleted successfully", { status: 200 });


    }
    catch (err) {
        console.error("Error creating snippet:", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }

}