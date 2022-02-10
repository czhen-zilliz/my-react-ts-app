/**
 * @jest-environment jsdom
 */

// https://github.com/facebookexperimental/Recoil/issues/904#issuecomment-823755253
if (!global.Window) {
  Object.defineProperty(global, "Window", {
    value: window.constructor,
    writable: true,
    enumerable: true,
    configurable: true,
  });
}

import { it, describe, expect, assert, test } from "vitest";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { snapshot_UNSTABLE, RecoilRoot } from "recoil";

import Page0 from "@/pages/Page0/Index";
import { counterState } from "@/atom";
import { counterSizeState } from "@/selector";

describe("use jsdom in this test file", () => {
  it("page init test", async () => {
    render(
      <RecoilRoot>
        <Page0 />
      </RecoilRoot>
    );
    const countSize: any = screen.getByText("countSize is: sm");
    expect(countSize).not.toBeNull();
    const countNum: any = screen.getByText("count is: 0");
    expect(countNum).not.toBeNull();
    // const syncBtn = screen.getByRole("button", { name: "Add" });
    // fireEvent.click(syncBtn);
    // const inputAfterBtnClick: any = screen.getByRole("textbox");
    // await waitFor(() => expect(inputAfterBtnClick.value).toBe(""));
  });

  it("btn click test", async () => {
    render(
      <RecoilRoot>
        <Page0 />
      </RecoilRoot>
    );
    const countNum: any = screen.getByText("count is: 0");
    expect(countNum).not.toBeNull();
    const counterBtn = screen.getByRole("button");
    fireEvent.click(counterBtn);
    const countNumNew: any = screen.getByText("count is: 1");
    expect(countNumNew).not.toBeNull();
    fireEvent.click(counterBtn);
    fireEvent.click(counterBtn);
    fireEvent.click(counterBtn);
    fireEvent.click(counterBtn);
    const count5: any = screen.getByText("count is: 5");
    expect(count5).not.toBeNull();
    const size5: any = screen.getByText("countSize is: sm");
    expect(size5).not.toBeNull();
    fireEvent.click(counterBtn);
    const count6: any = screen.getByText("count is: 6");
    expect(count6).not.toBeNull();
    const size6: any = screen.getByText("countSize is: lg");
    expect(size6).not.toBeNull();
  });

  it("Test counterState", () => {
    const initialSnapshot = snapshot_UNSTABLE();
    expect(initialSnapshot.getLoadable(counterSizeState).valueOrThrow()).toBe(
      "sm"
    );

    const testSnapshot = snapshot_UNSTABLE(({ set }) => set(counterState, 1));
    expect(testSnapshot.getLoadable(counterSizeState).valueOrThrow()).toBe(
      "sm"
    );

    const testSnapshot6 = snapshot_UNSTABLE(({ set }) => set(counterState, 6));
    expect(testSnapshot6.getLoadable(counterSizeState).valueOrThrow()).toBe(
      "lg"
    );
  });
});
