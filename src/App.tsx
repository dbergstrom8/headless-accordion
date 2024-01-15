import { Accordion } from "./components/Accordion.tsx";

function App() {
  return (
    <>
      <Accordion>
        <Accordion.Item>
          <Accordion.Button>Button 1</Accordion.Button>
          <Accordion.Panel>Panel 1</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Button>Button 2</Accordion.Button>
          <Accordion.Panel>Panel 2</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Button>Button 3</Accordion.Button>
          <Accordion.Panel>Panel 3</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default App;
