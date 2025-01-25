import { createStore } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { fetchTodos } from './fetchTodos';
import { RootStore, Todo } from './types';

const initialState = {
  todos: fetchTodos(),
};

type AddTodoAction = ReturnType<typeof addTodo>;
type RemoveTodoAction = ReturnType<typeof removeTodo>;
type ToggleTodoAction = ReturnType<typeof toggleTodo>;
type TodoActions = AddTodoAction | RemoveTodoAction | ToggleTodoAction;

export const addTodo = (todo: Todo) => ({type: "ADD_TODO" as const, payload: todo});
export const removeTodo = (id: number) => ({type: "REMOVE_TODO" as const, payload: id});
export const toggleTodo = (id: number) => ({type: "TOGGLE_TODO" as const, payload: id});

export function todoReducer(state = initialState, action: TodoActions) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map(todo => todo.id === action.payload ? {...todo, done: !todo.done} : todo),
      };
    default:
      return state;
  }
}

export const store = createStore(todoReducer);

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
