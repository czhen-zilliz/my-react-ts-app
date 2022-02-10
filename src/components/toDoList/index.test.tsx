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
import { snapshot_UNSTABLE } from "recoil";

import { TodoItemCreator } from "@/components/toDoList/index";

describe("use jsdom in this test file", () => {
  it("use jsdom in this test file", () => {
    const element = document.createElement("div");
    expect(element).not.toBeNull();
  });

  it("TodoItemCreator", async () => {
    render(<TodoItemCreator />);
    const input: any = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "123" } });
    expect(input.value).toBe("123");
    // const syncBtn = screen.getByRole("button", { name: "Add" });
    // fireEvent.click(syncBtn);
    // const inputAfterBtnClick: any = screen.getByRole("textbox");
    // await waitFor(() => expect(inputAfterBtnClick.value).toBe(""));
  });
});
