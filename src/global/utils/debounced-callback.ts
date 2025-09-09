// export const debounce = <T extends (...args: any[]) => any>(
// 	fn: T,
// 	delay: number
// ): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
// 	let timer: NodeJS.Timeout | null = null;
// 	let resolveQueue: ((value: any) => void)[] = [];

// 	return (...args: Parameters<T>) => {
// 		console.log('call');

// 		if (timer) {
// 			clearTimeout(timer);
// 		}

// 		return new Promise<ReturnType<T>>((resolve) => {
// 			resolveQueue.push(resolve);

// 			timer = setTimeout(async () => {
// 				timer = null;
// 				try {
// 					console.log('executing');

// 					const result = await fn(...args);
// 					resolveQueue.forEach((res) => res(result));
// 				} catch (err) {
// 					resolveQueue.forEach((res) => res(Promise.reject(err as Error)));
// 				} finally {
// 					resolveQueue = [];
// 				}
// 			}, delay);
// 		});
// 	};
// };

export const debounce = <T extends unknown[]>(
	callback: (...args: T) => void,
	delay: number
) => {
	let timeoutTimer: ReturnType<typeof setTimeout>;

	return (...args: T) => {
		clearTimeout(timeoutTimer);

		timeoutTimer = setTimeout(() => {
			callback(...args);
		}, delay);
	};
};
