import { StripeCheckout } from '@/components/StripeCheckout';

export default function UpgradePage() {
    const premiumPriceId = 'price_XXXXXXXXXXXXXXXXXXXXXXXX'; // Replace with your actual Stripe Price ID

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Upgrade to Premium</h1>
            <p className="mb-4">Unlock premium features by upgrading your account.</p>
            <StripeCheckout priceId={premiumPriceId} />
        </div>
    );
}
