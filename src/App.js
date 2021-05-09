import './App.css';
import Board from "./Components/Board";

function App() {
  return (
    <div className="App">
      <Board chance={.25}/>
    </div>
  );
}

export default App;
