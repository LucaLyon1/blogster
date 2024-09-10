'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeCheckoutProps {
    priceId: string;
}

export function StripeCheckout({ priceId }: StripeCheckoutProps) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ priceId }),
            });

            const { sessionId } = await response.json();
            const stripe = await stripePromise;
            const { error } = await stripe!.redirectToCheckout({ sessionId });

            if (error) {
                console.error('Stripe checkout error:', error);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleCheckout}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
            {loading ? 'Processing...' : 'Upgrade to Premium'}
        </button>
    );
}
