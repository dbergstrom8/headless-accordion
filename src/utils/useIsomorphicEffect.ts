import { useEffect, useLayoutEffect } from "react";

/*
  useLayoutEffect is a browser hook, so for React code generated from the server it will give error.
  For more details check: https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
