import { auth } from "@/lib/auth"

export async function requireUser(req: Request) {
    const session = await auth.api.getSession({ headers: req.headers })
    const user = session?.user
    if (!session?.user) {
        return null
    }
    return user
}
