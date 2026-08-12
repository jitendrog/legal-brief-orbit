import { useEffect, useState } from "react";

/** True when the user has requested reduced motion. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Coarse device-capability hint used to scale down 3D work. */
export function useLowPower() {
  const [low, setLow] = useState(false);
  useEffect(() => {
    const coarse = window.matchMedia("(max-width: 768px)").matches;
    const cores = navigator.hardwareConcurrency ?? 8;
    setLow(coarse || cores <= 4);
  }, []);
  return low;
}
