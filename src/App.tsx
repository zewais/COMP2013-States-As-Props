import "./App.css";
import FruitsApp from "./Components/FruitsApp";

import data from "./data/data";

function App() {
  return (
    <>
      <h1>Fruits Counter</h1>
      <FruitsApp data={data} />
    </>
  );
}

export default App;
