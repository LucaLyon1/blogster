import { auth } from "@/lib/auth";
import { useSession } from "next-auth/react";

export default function BuyButton() {
    return (
        <form action={async () => {
            'use server'
            const session = await auth();
            const user = await prisma?.user.findUnique({
                where: { id: session?.user?.id }
            })
        }}>
            <button type="submit">Upgrade to Pro</button>
        </form>
    );
}

