import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { FaRocket, FaArrowRight } from 'react-icons/fa';

export default function BuyButton({ subscription }: { subscription: string }) {
    let priceId: string;

    switch (subscription) {
        case 'enterprise':
            priceId = 'price_1Q2JDqAbDJvILy2KgFeK8bZP';
            break;
        case 'pro':
            priceId = 'price_1Q2JDqAbDJvILy2KgFeK8bZP';
            break;
        default:
            priceId = 'price_1Q2JDqAbDJvILy2KgFeK8bZP';
            break;
    }

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
                    price: priceId,
                    quantity: 1
                }],
                success_url: 'http://localhost:3000/create-offer',
                cancel_url: 'http://localhost:3000/error',
                metadata: { subscription: subscription }
            });
            if (stripeSession.url) {
                redirect(stripeSession.url);
            } else {
                throw new Error('Failed to create stripe session');
            }
        }}>
            <button
                type="submit"
                className="group relative mt-6 w-full py-3 px-6 text-lg font-bold text-white rounded-full overflow-hidden bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg hover:shadow-xl"
            >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-out"></span>
                <span className="relative flex items-center justify-center">
                    <FaRocket className="mr-2 animate-bounce" />
                    Upgrade Now
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
            </button>
        </form>
    );
}
