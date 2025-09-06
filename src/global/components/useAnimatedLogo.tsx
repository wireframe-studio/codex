import { useEffect, useRef } from 'react';

// // -80 -> 80
// const clipX = (x: number) => {
// 	return ((x + 80) % 160) - 80;
// };

// x -> y
// (x, -80, 80)
const clipX = (x: number, from: number, to: number) => {
	return ((x + to) % (to - from)) + from;
};

const speedHorizontal = 50;
const speedVertical = 1;
const amplitudeVertical = 10;

export const useAnimatedLogo = () => {
	const mask1Ref = useRef<SVGPathElement>(null);
	const mask2Ref = useRef<SVGPathElement>(null);
	const animationFrameRef = useRef<number | undefined>(undefined);

	const setX = (x: number, lastUpdate: number, signal: AbortSignal) => {
		if (signal.aborted) return;

		const now = Date.now();
		const delta = ((now - lastUpdate) / 1000) * speedHorizontal;

		if (mask1Ref.current && mask2Ref.current) {
			const _x = clipX(x, -40, 120).toFixed(2);
			const _y = Math.sin((now / 1000) * speedVertical) * amplitudeVertical + 5;
			mask1Ref.current.setAttribute('transform', `translate(${_x}, ${_y})`);
			mask2Ref.current.setAttribute('transform', `translate(${_x}, ${_y})`);
		}

		animationFrameRef.current = requestAnimationFrame(() => {
			setX(x - delta, now, signal);
		});
	};

	useEffect(() => {
		// Wait for the next frame to ensure refs are mounted
		const frameId = requestAnimationFrame(() => {
			if (mask1Ref.current && mask2Ref.current) {
				const controller = new AbortController();
				setX(-80, Date.now(), controller.signal);

				return () => {
					controller.abort();
					if (animationFrameRef.current) {
						cancelAnimationFrame(animationFrameRef.current);
					}
				};
			}
		});

		return () => {
			cancelAnimationFrame(frameId);
		};
	}, []);

	return { mask1Ref, mask2Ref };
};
