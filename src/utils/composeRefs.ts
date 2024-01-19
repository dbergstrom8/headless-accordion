import React from "react";

type PossibleRefs<T> = React.Ref<T> | undefined;

/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */
export function useComposedRefs<T>(...refs: PossibleRefs<T>[]) {
  return React.useCallback((node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T>).current = node;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
