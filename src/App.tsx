import { Accordion } from "./components/Accordion.tsx";
import { useState } from "react";

function App() {
  const [openAccordions, setOpenAccordion] = useState([0, 2]);

  const handleAccordionChange = (index: number) => {
    setOpenAccordion((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index].sort();
      }
    });
  };

  return (
    <>
      <Accordion index={openAccordions} onChange={handleAccordionChange}>
        <Accordion.Item>
          <Accordion.Button>Button 1</Accordion.Button>
          <Accordion.Panel>Panel 1</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item disabled>
          <Accordion.Button>Button 2</Accordion.Button>
          <Accordion.Panel>Panel 2</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Button>Button 3</Accordion.Button>
          <Accordion.Panel>Panel 3</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Button>Button 4</Accordion.Button>
          <Accordion.Panel>Panel 4</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Button>Button 5</Accordion.Button>
          <Accordion.Panel>Panel 5</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default App;
