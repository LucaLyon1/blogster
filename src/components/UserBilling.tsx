import { auth } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export default function UserBilling() {
    return (
        <form action={async () => {
            'use server'
            const session = await auth();
            const user = await prisma?.user.findUnique({
                where: { id: session?.user?.id },
                select: { stripeCustomerId: true }
            });

            const stripeCustomerId = user?.stripeCustomerId ?? undefined;

            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: stripeCustomerId ?? "",
                return_url: '/'

            });
            if (stripeSession.url) {
                redirect(stripeSession.url);
            } else {
                throw new Error('Failed to create stripe session');
            }
        }}>
            <button type="submit">Change Premium Plan</button>
        </form>
    );
}

