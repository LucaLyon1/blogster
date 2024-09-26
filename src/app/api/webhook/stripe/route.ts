import { NextRequest } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export const POST = async (req: NextRequest) => {
    const body = await req.json() as Stripe.Event;
    switch (body.type) {
        case 'checkout.session.completed': {
            const checkoutSession = body.data.object as Stripe.Checkout.Session;
            const subscription = checkoutSession.metadata?.subscription;
            console.log(subscription)
            const user = await findUser(checkoutSession.customer);
            if (user) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        role: subscription
                    }
                });
            }
            console.log('checkout.session.completed');
            break;
        }
        case 'invoice.paid': {
            const invoice = body.data.object as Stripe.Invoice;
            const subscription = invoice.metadata?.subscription;
            const user = await findUser(invoice.customer);
            if (user) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        role: subscription
                    }
                });
            }
            break;
        }
        case 'invoice.payment_failed': {
            const invoice = body.data.object as Stripe.Invoice;
            const user = await findUser(invoice.customer);
            if (user) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        role: 'free'
                    }
                });
            }
            break;
        }
        case 'customer.subscription.deleted': {
            const subscriptionDeleted = body.data.object as Stripe.Subscription;
            const user = await findUser(subscriptionDeleted.customer);
            if (user) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        role: 'free'
                    }
                });
            }
            break;
        }
    }
    return new Response(null, { status: 200 });
}

const findUser = async (stripeCustomerId: unknown) => {
    if (typeof stripeCustomerId === 'string') {
        const user = await prisma.user.findFirst({
            where: { stripeCustomerId }
        });
        return user;
    }
    return null;
}