import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useRecoilSnapshot,
  useRecoilTransactionObserver_UNSTABLE,
} from "recoil";
import { counterState } from "@/atom";
import { counterSizeState } from "@/selector";
// import logo from './logo.svg'
import "./App.css";
import logo from "@/assets/logo.svg";

const App = () => {
  const [count, setCount] = useState(0);
  const [stateCount, setStateCount] = useRecoilState(counterState);
  const countSize = useRecoilValue(counterSizeState);

  const handleBtnClick = () => {
    setStateCount(stateCount + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello page0</p>
        <p>
          {/* <button type="button" onClick={() => setCount((count) => count + 1)}> */}
          <button type="button" onClick={handleBtnClick}>
            count is: {stateCount}
          </button>
          countSize is: {countSize}
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
};

export default App;
