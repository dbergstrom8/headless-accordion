import {
  ComponentType,
  createContext,
  ElementType,
  forwardRef,
  ReactNode,
  useContext,
} from "react";

const ACCORDION_NAME = "Accordion";
const ITEM_NAME = "AccordionItem";
const BUTTON_NAME = "AccordionTrigger";
const PANEL_NAME = "AccordionPanel";
const ACCORDION_CONTEXT = "AccordionContext";
const ACCORDION_ITEM_CONTEXT = "AccordionItemContext";

const Accordion = forwardRef(function (
  { children, as: Comp = "div", ...props }: AccordionProps,
  forwardedRef
) {
  return (
    <AccordionContext.Provider value={{}}>
      <Comp {...props} ref={forwardedRef} data-hb-accordion="">
        {children}
      </Comp>
    </AccordionContext.Provider>
  );
});

const AccordionItem = forwardRef(function (
  { children, as: Comp = "div", ...props }: AccordionItemProps,
  forwardedRef
) {
  return (
    <AccordionItemContext.Provider value={{}}>
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
  return (
    <Comp {...props} ref={forwardedRef} data-hb-accordion-button="">
      {children}
    </Comp>
  );
});

const AccordionPanel = forwardRef(function (
  { children, as: Comp = "div", ...props }: AccordionPanelProps,
  forwardedRef
) {
  return (
    <Comp {...props} ref={forwardedRef} data-hb-accordion-panel="">
      {children}
    </Comp>
  );
});

const AccordionContext = createContext({});
const AccordionItemContext = createContext({});

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
}

interface AccordionButtonProps {
  as?: ElementType | ComponentType;
  children: ReactNode;
}

interface AccordionPanelProps {
  as?: ElementType | ComponentType;
  children: ReactNode;
}
