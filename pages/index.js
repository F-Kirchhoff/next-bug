import useStore from "../hooks/useStore";

export default function IndexPage() {
  const count = useStore((state) => state.count);
  const incrementCount = useStore((state) => state.incrementCount);

  return (
    <div>
      <p>{count}</p>
      <button
        onClick={() => {
          incrementCount();
        }}
      >
        +
      </button>
    </div>
  );
}
