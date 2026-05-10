import { useInView  } from "react-intersection-observer";

const useFadeIn = () => {
    const [ ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return {
        ref,
        className: inView ? "fade-in visible" : "fade-in",
    };
};

export default useFadeIn;