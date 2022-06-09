import create from "zustand";
let count = 0;
const myMiddleware = (config) => (set, get, api) => {
  console.clear();
  console.log("Calling Middelware: ", count++);

  let hasHydrated = false;
  const setHasHydrated = (state) => {
    if (hasHydrated) return;
    console.log("Hydtrated!");
    hasHydrated = state;
    const localStorageState = JSON.parse(localStorage.getItem("storage"));
    console.log(localStorageState);
    if (localStorageState) {
      set(localStorageState);
    }
  };

  const myGet = () => {
    if (hasHydrated) {
      console.log("store used for get.");
      const state = JSON.parse(localStorage.getItem("storage"));
      return state;
    } else {
      console.log("Normal state used for get.");
      return get();
    }
  };

  const mySet = (updater) => {
    const currentState = get();
    console.log({ currentState });
    if (hasHydrated) {
      console.log("store used for set.");
      localStorage.setItem(
        "storage",
        JSON.stringify({ ...currentState, ...updater(currentState) })
      );
      set(myGet());
    } else {
      console.log("Normal state used for set.");
      set(currentState);
    }
  };
  return config(mySet, myGet, setHasHydrated, api);
};

const useStore = create(
  myMiddleware((set, get, _setHasHydrated) => {
    return {
      setHasHydrated: (hydrationState) => {
        _setHasHydrated(hydrationState);
      },
      count: 10,
      test: "1234",
      incrementCount: () => {
        set((state) => ({ count: ++state.count }));
      },
    };
  })
);

export default useStore;
