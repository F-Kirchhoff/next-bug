import create from "zustand";

const myMiddleware = (config) => (set, get, api) => {
  let hasHydrated = false;

  const setHasHydrated = (state) => {
    console.log("Hydtrated!");
    hasHydrated = state;
  };
  const myGet = () => {
    if (hasHydrated) {
      console.log("store used for get.");
      const state = JSON.parse(localStorage.getItem("storage"));
      return state;
    } else {
      console.log("Nomal state used for get.");
      return get();
    }
  };

  const mySet = (args) => {
    if (hasHydrated) {
      console.log("store used for set.", args);
      localStorage.setItem("storage", JSON.stringify({ ...get(), ...args }));
      set(myGet());
    } else {
      console.log("Normal state used for set.");
      set(...args);
    }
  };
  return config(mySet, myGet, setHasHydrated, api);
};

const useStore = create(
  myMiddleware((set, get, _setHasHydrated) => {
    return {
      setHasHydrated: (hydrationState) => {
        _setHasHydrated(hydrationState);
        set((state) => state);
      },
      count: 10,
      incrementCount: () => {
        set((state) => ({ count: ++state.count }));
      },
    };
  })
);

export default useStore;
