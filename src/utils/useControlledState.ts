import React, { useCallback, useRef, useState } from "react";
import { isDev } from "./isDev.ts";

type UseControlledStateParams<T> = {
  controlledValue: T | undefined;
  defaultValue: T | (() => T);
  calledFrom?: string;
};

export function useControlledState<T>({
  controlledValue,
  defaultValue,
  calledFrom = "A component",
}: UseControlledStateParams<T>): [T, React.Dispatch<React.SetStateAction<T>>] {
  const isControlled = controlledValue !== undefined;
  const wasControlledRef = useRef(isControlled);

  if (isDev()) {
    if (wasControlledRef.current && !isControlled) {
      console.warn(
        `${calledFrom} is changing from controlled to uncontrolled. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      );
    }
    if (!wasControlledRef.current && isControlled) {
      console.warn(
        `${calledFrom} is changing from uncontrolled to controlled. Components should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      );
    }
  }

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const effectiveValue =
    controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const set: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (newValue) => {
      if (!controlledValue) {
        setUncontrolledValue(newValue);
      }
    },
    []
  );
  return [effectiveValue, set];
}
