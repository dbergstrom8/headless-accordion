import { ComponentType, ElementType, forwardRef, ReactNode } from "react";

const ACCORDION_NAME = "Accordion";
const ITEM_NAME = "AccordionItem";
const BUTTON_NAME = "AccordionTrigger";
const PANEL_NAME = "AccordionPanel";

const Accordion = forwardRef(function (
  { children, as: Comp = "div", ...props }: AccordionProps,
  forwardedRef
) {
  return (
    <Comp {...props} ref={forwardedRef} data-hb-accordion="">
      {children}
    </Comp>
  );
});

const AccordionItem = forwardRef(function (
  { children, as: Comp = "div", ...props }: AccordionItemProps,
  forwardedRef
) {
  return (
    <Comp {...props} ref={forwardedRef} data-hb-accordion-item="">
      {children}
    </Comp>
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

Accordion.displayName = ACCORDION_NAME;
AccordionItem.displayName = ITEM_NAME;
AccordionButton.displayName = BUTTON_NAME;
AccordionPanel.displayName = PANEL_NAME;

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
