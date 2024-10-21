import { atom, useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";

type PluginDBReturn<Value> = [Awaited<Value>, (data: Value) => void];

export const createPluginDB = <T>(
  key: string,
  initialValue: T
): (() => PluginDBReturn<T>) => {
  const getInitialValue = (): T => {
    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.error(
        `Error getting item from localStorage with key "${key}":`,
        error
      );
    }
    return initialValue;
  };

  const baseAtom = atom<T>(getInitialValue());

  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      try {
        const nextValue =
          typeof update === "function" ? update(get(baseAtom)) : update;
        // Só atualiza o localStorage se o valor for diferente do atual
        const currentValue = JSON.parse(localStorage.getItem(key) || "null");
        if (JSON.stringify(currentValue) !== JSON.stringify(nextValue)) {
          localStorage.setItem(key, JSON.stringify(nextValue));
        }
        set(baseAtom, nextValue);
      } catch (error) {
        console.error(
          `Error setting item in localStorage with key "${key}":`,
          error
        );
      }
    }
  );

  return () => {
    const [value, setValue] = useAtom(derivedAtom);
    const setAtomValue = useSetAtom(baseAtom);

    useEffect(() => {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === key) {
          console.log("storage change", event.newValue);
        }
      };

      // Escuta as mudanças no localStorage
      window.addEventListener("storage", handleStorageChange);

      // Limpeza ao desmontar o componente
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }, []);

    return [value, setValue];
  };
};
