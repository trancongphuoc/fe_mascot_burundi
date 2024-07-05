import { KeyframeOptions, animate, useInView, useIsomorphicLayoutEffect } from "framer-motion"
import { useRef } from "react"

type AnimatedCounterProps = {
    from: number,
    to: number,
    animationOptions?: KeyframeOptions

}

const AnimatedCounter = ({from, to, animationOptions}: AnimatedCounterProps) => {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, {once: true})

    useIsomorphicLayoutEffect(() => {
        const element = ref.current;

        if (!element) return;
        if (!inView) return;
        if (window.matchMedia("(prefers-reduced-motion)").matches) {
            element.textContent = String(to);
            return;
        }

        element.textContent = String(from)

        const controls = animate(from, to, {

            duration: .75,
            ease: "easeOut",
            ...animationOptions,
            onUpdate(value) {
                console.log(value)
                element.textContent = value.toFixed(0);
            }
        })

        return () => { controls.stop()}

    },[ref, inView,from, to])

    return <span ref={ref} style={{ color: 'white' }}/>;
}

export default AnimatedCounter;

