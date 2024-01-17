import {
  ComponentType,
  createContext,
  ElementType,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
} from "react";
import { useControlledState } from "../utils/useControlledState.ts";

const ACCORDION_NAME = "Accordion";
const ITEM_NAME = "AccordionItem";
const BUTTON_NAME = "AccordionTrigger";
const PANEL_NAME = "AccordionPanel";
const ACCORDION_CONTEXT = "AccordionContext";
const ACCORDION_ITEM_CONTEXT = "AccordionItemContext";

export function noop() {}

enum AccordionStates {
  Open = "OPEN",
  Collapsed = "COLLAPSED",
}

const Accordion = forwardRef(function (
  {
    children,
    as: Comp = "div",
    defaultIndex,
    index: controlledIndex,
    onChange,
    multiple = false,
    readOnly = false,
    collapsible = false,
    ...props
  }: AccordionProps,
  forwardedRef
) {
  const [openPanels, setOpenPanels] = useControlledState({
    controlledValue: controlledIndex,
    defaultValue: () => {
      if (defaultIndex != null) {
        if (multiple) {
          // If multiple is set to true, we need to make sure the `defaultIndex`
          // is an array (and vice versa).
          return Array.isArray(defaultIndex) ? defaultIndex : [defaultIndex];
        } else {
          return Array.isArray(defaultIndex)
            ? defaultIndex[0] ?? 0
            : defaultIndex;
        }
      }
      if (collapsible) {
        // collapsible with no defaultIndex will start with all panels collapsed
        return multiple ? [] : -1;
      }
      return multiple ? [0] : 0;
    },
    calledFrom: "Accordion",
  });

  const onAccordionItemClick = useCallback(
    (index: number) => {
      if (controlledIndex != undefined) {
        onChange && onChange(index);
        return;
      }

      setOpenPanels((prevOpenPanels) => {
        if (multiple) {
          prevOpenPanels = prevOpenPanels as number[];
          // close open  panels
          if (prevOpenPanels.includes(index)) {
            // other panels are open OR accordion is allowed to collapse
            if (prevOpenPanels.length > 1 || collapsible) {
              return prevOpenPanels.filter((i) => i !== index);
            }
          } else {
            // open panel
            return [...prevOpenPanels, index].sort();
          }
        } else {
          return prevOpenPanels === index && collapsible ? -1 : index;
        }
        return prevOpenPanels;
      });
    },
    [multiple, collapsible, onChange, controlledIndex]
  );

  const context = {
    openPanels: controlledIndex ? controlledIndex : openPanels,
    onAccordionItemClick: readOnly ? noop : onAccordionItemClick,
    readOnly,
  };

  return (
    <AccordionContext.Provider value={context}>
      <Comp {...props} ref={forwardedRef} data-hb-accordion="">
        {children}
      </Comp>
    </AccordionContext.Provider>
  );
});

const AccordionItem = forwardRef(function (
  {
    children,
    as: Comp = "div",
    disabled = false,
    index,
    ...props
  }: AccordionItemProps,
  forwardedRef
) {
  const { openPanels } = useAccordionContext();

  const state =
    (Array.isArray(openPanels)
      ? openPanels.includes(index) && AccordionStates.Open
      : openPanels === index && AccordionStates.Open) ||
    AccordionStates.Collapsed;

  const context = {
    index,
    state,
    disabled,
  };

  return (
    <AccordionItemContext.Provider value={context}>
      <Comp {...props} ref={forwardedRef} data-hb-accordion-item="">
        {children}
      </Comp>
    </AccordionItemContext.Provider>
  );
});

const AccordionButton = forwardRef(function (
  { children, as: Comp = "button", ...props }: AccordionButtonProps,
  forwardedRef
) {
  const { onAccordionItemClick } = useAccordionContext();
  const { disabled, index } = useAccordionItemContext();

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) {
      return;
    }
    onAccordionItemClick(index);
  };

  return (
    <Comp
      {...props}
      ref={forwardedRef}
      data-hb-accordion-button=""
      onClick={handleTriggerClick}
    >
      {children}
    </Comp>
  );
});

const AccordionPanel = forwardRef(function (
  { children, as: Comp = "div", ...props }: AccordionPanelProps,
  forwardedRef
) {
  const { state } = useAccordionItemContext();

  return (
    <Comp
      {...props}
      ref={forwardedRef}
      data-hb-accordion-panel=""
      hidden={state !== AccordionStates.Open}
    >
      {children}
    </Comp>
  );
});

const AccordionContext = createContext<
  InternalAccordionContextValue | undefined
>(undefined);
const AccordionItemContext = createContext<
  InternalAccordionItemContextValue | undefined
>(undefined);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw Error("useAccordionContext must be used within Accordion.");
  }
  return context;
};

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw Error("useAccordionItemContext must be used within AccordionItem.");
  }
  return context;
};

Accordion.displayName = ACCORDION_NAME;
AccordionItem.displayName = ITEM_NAME;
AccordionButton.displayName = BUTTON_NAME;
AccordionPanel.displayName = PANEL_NAME;
AccordionContext.displayName = ACCORDION_CONTEXT;
AccordionItemContext.displayName = ACCORDION_ITEM_CONTEXT;

const AccordionNamespace = Object.assign(Accordion, {
  Item: AccordionItem,
  Button: AccordionButton,
  Panel: AccordionPanel,
});

export { AccordionNamespace as Accordion };

type AccordionIndex = number | number[];

interface AccordionProps {
  children: ReactNode;
  index?: AccordionIndex;
  defaultIndex?: AccordionIndex;

  onChange?(index?: number): void;

  readOnly?: boolean;
  multiple?: boolean;
  collapsible?: boolean;
  as?: ElementType | ComponentType;
}

interface AccordionItemProps {
  as?: ElementType | ComponentType;
  children: ReactNode;
  disabled?: boolean;
  index: number;
}

interface AccordionButtonProps {
  as?: ElementType | ComponentType;
  children: ReactNode;
}

interface AccordionPanelProps {
  as?: ElementType | ComponentType;
  children: ReactNode;
}

interface InternalAccordionContextValue {
  openPanels: AccordionIndex;

  onAccordionItemClick(index: AccordionIndex): void;

  readOnly: boolean;
}

interface InternalAccordionItemContextValue {
  index: number;
  disabled: boolean;
  state: AccordionStates;
}
