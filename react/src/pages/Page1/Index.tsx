import { useState } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
// import logo from './logo.svg'
import "./App.css";
import logo from "@/assets/logo.svg";
import TodoList from "@/components/toDoList";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello page1</p>
        <TodoList />
      </header>
    </div>
  );
};

export default App;
