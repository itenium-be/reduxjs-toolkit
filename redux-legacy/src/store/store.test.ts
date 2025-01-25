import { todoReducer, toggleTodo, addTodo, removeTodo } from "./store";
import { Todo } from "./types";

describe("Redux Store Tests", () => {
  const initialState = {
    todos: [
      { id: 1, title: "Task 1", text: "Description 1", done: false },
      { id: 2, title: "Task 2", text: "Description 2", done: true },
    ],
  };

  it("should handle ADD_TODO action", () => {
    const newTodo: Todo = {
      id: 3,
      title: "Task 3",
      text: "Description 3",
      done: false,
    };

    const action = addTodo(newTodo);
    const newState = todoReducer(initialState, action);

    expect(newState.todos).toHaveLength(3);
    expect(newState.todos[2]).toEqual(newTodo);
  });

  it("should handle REMOVE_TODO action", () => {
    const action = removeTodo(1);
    const newState = todoReducer(initialState, action);

    expect(newState.todos).toHaveLength(1);
    expect(newState.todos.find(todo => todo.id === 1)).toBeUndefined();
  });

  it("should handle TOGGLE_TODO action", () => {
    const action = toggleTodo(2);
    const newState = todoReducer(initialState, action);

    expect(newState.todos[1].done).toBe(false);
  });

  it("should return the current state for an unknown action type", () => {
    const unknownAction = { type: "UNKNOWN_ACTION" } as any;
    const newState = todoReducer(initialState, unknownAction);

    expect(newState).toEqual(initialState);
  });
});
