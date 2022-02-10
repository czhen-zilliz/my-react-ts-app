import {
  RecoilRoot,
  atom,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { counterState, todoListState, todoListFilterState } from "@/atom";

export const counterSizeState = selector({
  key: "counterSizeState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const count = get(counterState);

    return count > 5 ? "lg" : "sm";
  },
});

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item: any) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item: any) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter(
      (item: any) => item.isComplete
    ).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted =
      totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

export const toDoItemQuerySync = selectorFamily({
  key: "toDoItemQuerySync",
  get:
    (item: any) =>
    ({ get }) => {
      return {
        ...item,
        text: `Sync-${item.text}`,
      };
    },
});

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function sleep(fn: Function, ...args: any[]) {
  await timeout(3000);
  return fn(...args);
}

export const toDoItemQueryAsync = selectorFamily({
  key: "toDoItemQueryAsync",
  get:
    (item: any) =>
    async ({ get }) => {
      await sleep(() => {});
      return {
        ...item,
        text: `Async-${item.text}`,
      };
    },
});
