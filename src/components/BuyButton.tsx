import { auth } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export default function BuyButton() {
    return (
        <form action={async () => {
            'use server'
            const session = await auth();
            const user = await prisma?.user.findUnique({
                where: { id: session?.user?.id },
                select: { stripeCustomerId: true }
            });

            const stripeCustomerId = user?.stripeCustomerId ?? undefined;

            const stripeSession = await stripe.checkout.sessions.create({
                customer: stripeCustomerId,
                mode: 'subscription',
                payment_method_types: ['card'],
                line_items: [{
                    price: 'price_1Q2JDqAbDJvILy2KgFeK8bZP',
                    quantity: 1
                }],
                success_url: 'http://localhost:3000/',
                cancel_url: 'http://localhost:3000/error',

            });
            if (stripeSession.url) {
                redirect(stripeSession.url);
            } else {
                throw new Error('Failed to create stripe session');
            }
        }}>
            <button type="submit">Upgrade to Pro</button>
        </form>
    );
}

