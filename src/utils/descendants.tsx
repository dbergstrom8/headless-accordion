import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicEffect.ts";

const randomId = () => Math.random().toString(36).substring(2, 9);

const DescendantContext = createContext<DescendantProviderProps>(
  {} as DescendantProviderProps
);

export const useDescendantContext = () => {
  const context = useContext(DescendantContext);
  if (!context) {
    throw Error(
      "useDescendantContext must be used within DescendantContext Provider"
    );
  }
  return context;
};

export const Descendants = ({
  children,
  value,
}: {
  children: ReactNode;
  value: DescendantProviderProps;
}) => {
  // On every re-render of children, reset the count
  value.reset();

  return (
    <DescendantContext.Provider value={value}>
      {children}
    </DescendantContext.Provider>
  );
};

export const useDescendants = () => {
  const indexCounter = useRef(0);
  const map = useRef<Record<string, any>>({});

  const getIndex = useCallback((id: string, props?: IgetIndexProps) => {
    const hidden = props ? props.hidden : false;
    if (!map.current[id]) {
      map.current[id] = { index: hidden ? -1 : indexCounter.current++ };
    }
    map.current[id].props = props;
    return map.current[id].index;
  }, []);

  // reset the counter and map
  const reset = useCallback(() => {
    indexCounter.current = 0;
    map.current = {};
  }, []);

  return { getIndex, map, reset };
};

/**
 * Return index of the current item within its parent's list
 * @param {any} props - Props that will be exposed to the parent list
 */
export const useDescendant = (props?: Record<string, any>) => {
  const context = useDescendantContext();
  const descendantId = useRef<string>();
  if (!descendantId.current) {
    descendantId.current = randomId();
  }

  const [index, setIndex] = useState(-1);

  useIsomorphicLayoutEffect(() => {
    setIndex(context?.getIndex(descendantId.current as string, props));
  });

  return index;
};

type DescendantProviderProps = ReturnType<typeof useDescendants>;

interface IgetIndexProps {
  hidden?: boolean;

  [key: string]: any;
}
