import { createCallerFactory, createTRPCRouter } from '@/deps/trpc/trpc';
import { articleRouter } from '@/modules/article/api/router';
import { authRouter } from '@/modules/auth/api/router';
import { carouselRouter } from '@/modules/carousel/api/router';
import { contactFormRouter } from '@/modules/contact-form/api/router';
import { dashboardRouter } from '@/modules/dashboard/api/router';
import { doctorRouter } from '@/modules/doctor/api/router';
import { fileRouter } from '@/modules/file/api/router';
import { kvRouter } from '@/modules/kv/api/router';
import { serviceRouter } from '@/modules/service/api/router';
import { customerReviewRouter } from '@/modules/testimonial/api/router';
import { userRouter } from '@/modules/user/api/router';

export const appRouter = createTRPCRouter({
	auth: authRouter,
	article: articleRouter,
	contactForm: contactFormRouter,
	customerReview: customerReviewRouter,
	service: serviceRouter,
	doctor: doctorRouter,
	dashboard: dashboardRouter,
	file: fileRouter,
	user: userRouter,
	kv: kvRouter,
	carousel: carouselRouter
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
