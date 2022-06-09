import { useEffect } from "react";
import useStore from "../hooks/useStore";

export default function IndexPage() {
  const setHasHydrated = useStore((state) => state.setHasHydrated);
  const count = useStore((state) => state.count);
  const incrementCount = useStore((state) => state.incrementCount);

  useEffect(() => setHasHydrated(true), []);

  return (
    <div>
      <p>{count}</p>
      <button onClick={incrementCount}>+</button>
    </div>
  );
}
