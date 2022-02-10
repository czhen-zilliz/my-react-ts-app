import { useEffect } from "react";
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
import App0 from "@/pages/Page0/Index";
import App1 from "@/pages/Page1/Index";
import NotFound from "@/pages/NotFount/Index";

function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.log("The following atoms were modified:");
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.log(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}

export default function App() {
  return (
    <RecoilRoot>
      <DebugObserver />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App0 />} />
          <Route path="/1" element={<App1 />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
