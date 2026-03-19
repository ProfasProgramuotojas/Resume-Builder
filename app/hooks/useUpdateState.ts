import { useCallback } from "react";
import { produce } from "immer";
import set from "lodash.set";
import get from "lodash.get";

export function useUpdateState<T>(
  setState: React.Dispatch<React.SetStateAction<T>>,
) {
  const update = useCallback(
    (path: string, value: unknown) => {
      setState((prev) => {
        if (!prev || typeof prev !== "object") return prev;

        return produce(prev as T, (draft) => {
          set(draft as any, path, value);
        });
      });
    },
    [setState],
  );

  const add = useCallback(
    (path: string, defaultValue: unknown) => {
      setState((prev) => {
        if (!prev || typeof prev !== "object") return prev;

        return produce(prev as T, (draft) => {
          const arr = get(draft as any, path);

          if (!Array.isArray(arr)) {
            console.warn(`add(): Path is not an array → ${path}`);
            return;
          }

          arr.push(defaultValue);
        });
      });
    },
    [setState],
  );

  const remove = useCallback(
    (path: string, index: number) => {
      setState((prev) => {
        if (!prev || typeof prev !== "object") return prev;

        return produce(prev as T, (draft) => {
          const arr = get(draft as any, path);

          if (!Array.isArray(arr)) {
            console.warn(`remove(): Path is not an array → ${path}`);
            return;
          }

          arr.splice(index, 1);
        });
      });
    },
    [setState],
  );

  const switchItems = useCallback(
    (path: string, index1: number, index2: number) => {
      setState((prev) => {
        if (!prev || typeof prev !== "object") return prev;

        return produce(prev as T, (draft) => {
          const arr = get(draft as any, path);

          if (!Array.isArray(arr)) {
            console.warn(`switch(): Path is not an array → ${path}`);
            return;
          }

          if (
            index1 < 0 ||
            index2 < 0 ||
            index1 >= arr.length ||
            index2 >= arr.length
          ) {
            console.warn(
              `switch(): Invalid indices → ${index1}, ${index2} (length: ${arr.length})`,
            );
            return;
          }

          [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
        });
      });
    },
    [setState],
  );

  return { update, add, remove, switchItems };
}
