import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY || 'sk_test_51S97F1EhQ5YxuMB8lncbT6x0wMWuEViqyp4b9cZAsXV2y7FNVNH4DS7wZv3FRD2K6evmfMwH9j4UQ5SBhWSo9Apq00WJxL7KDX';
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY environment variable is required');
    }
    stripeClient = new Stripe(key, {
      apiVersion: '2026-02-25.clover',
    });
  }
  return stripeClient;
}
