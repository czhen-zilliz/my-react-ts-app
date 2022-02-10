import React, { useState } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { todoListState, todoListFilterState } from "@/atom";
import {
  filteredTodoListState,
  todoListStatsState,
  toDoItemQuerySync,
  toDoItemQueryAsync,
} from "@/selector";

export default function TodoList() {
  // changed from todoListState to filteredTodoListState
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map((todoItem: any) => (
        <React.Suspense
          key={`susp-${todoItem.id}`}
          fallback={<div>加载中。。。</div>}
        >
          <TodoItem item={todoItem} key={todoItem.id} />
        </React.Suspense>
      ))}
    </>
  );
}

export function TodoItemCreator() {
  const [inputValue, setInputValue] = useState("");
  const setTodoList: any = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList: any) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  const addItemAsync = () => {
    setTodoList((oldTodoList: any) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
        async: true,
      },
    ]);
    setInputValue("");
  };

  const onChange = ({ target: { value } }: any) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
      <button onClick={addItemAsync}>Add Async(2s)</button>
    </div>
  );
}

function TodoItem({ item }: any) {
  const [todoList, setTodoList]: [any, any] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem: any) => listItem === item);
  const itemData = item.async
    ? useRecoilValue(toDoItemQueryAsync(item))
    : useRecoilValue(toDoItemQuerySync(item));

  const editItemText = ({ target: { value } }: any) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...itemData,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...itemData,
      isComplete: !itemData.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={itemData.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={itemData.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({ target: { value } }: any) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}

function TodoListStats() {
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
    useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}

function replaceItemAtIndex(arr: any[], index: number, newValue: any) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: any[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

// 用于创建唯一 id 的工具函数
let id = 0;
function getId() {
  return id++;
}
