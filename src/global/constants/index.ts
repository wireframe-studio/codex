import { env } from '@/env';

export const isProduction = env.NEXT_PUBLIC_DEPLOYMENT === 'production';
export const isStaging = env.NEXT_PUBLIC_DEPLOYMENT === 'staging';
export const isDevelopment = env.NODE_ENV === 'development';
