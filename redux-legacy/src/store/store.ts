import { createStore } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { fetchTodos } from './fetchTodos';
import { RootStore, Todo } from './types';

const initialState = {
  todos: fetchTodos(),
};

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

interface ToggleTodoAction {
  type: "TOGGLE_TODO";
  payload: number;
}

interface AddTodoAction {
  type: "ADD_TODO";
  payload: Todo;
}

interface RemoveTodoAction {
  type: "REMOVE_TODO";
  payload: number;
}

type TodoAction = ToggleTodoAction | AddTodoAction | RemoveTodoAction;

export const toggleTodo = (id: number): ToggleTodoAction => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const addTodo = (todo: Todo): AddTodoAction => ({
  type: ADD_TODO,
  payload: todo,
});

export const removeTodo = (id: number): RemoveTodoAction => ({
  type: REMOVE_TODO,
  payload: id,
});


function rootReducer(state = initialState, action: TodoAction) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => todo.id === action.payload ? {...todo, done: !todo.done} : todo),
      }
    default:
      return state;
  }
}

export const store = createStore(rootReducer);

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
