import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useRecoilSnapshot,
  useRecoilTransactionObserver_UNSTABLE,
  useRecoilValueLoadable,
} from "recoil";
import { counterState } from "@/atom";
import { counterSizeState, userListQueryAsync } from "@/selector";
// import logo from './logo.svg'
import "./App.css";
import logo from "@/assets/logo.svg";

const Content = () => {
  // Here fetch the users from API.
  const userListLoadable = useRecoilValueLoadable(userListQueryAsync);
  switch (userListLoadable.state) {
    case "hasValue":
      const userList = userListLoadable.contents;
      return (
        <>
          {userList.map((i: any) => (
            <p key={i.id}>{`id:${i.id}, name: ${i.name}, email: ${i.email}`}</p>
          ))}
        </>
      );
    case "loading":
      return <div>加载中……</div>;
    case "hasError":
      throw userListLoadable.contents;
    default:
      return <div>加载中111……</div>;
  }
};

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Users</p>
        <Content />
      </header>
    </div>
  );
};

export default App;
