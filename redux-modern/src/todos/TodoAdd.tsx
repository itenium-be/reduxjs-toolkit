import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { produce } from "immer";
import { useAppDispatch } from "../store";
import { Todo } from "./types";
import { addTodo } from "./todoSlice";

export const TodoAdd = () => {
  // If you've got 10 properties, then 10x useState???
  // const [title, setTitle] = useState("");
  // const [text, setText] = useState("");

  // Nimmer!
  const [todo, setTodo] = useState<Todo>(produce(() => ({
    id: Date.now() * -1,
    title: '',
    text: '',
    done: false,
  })));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddTodo = () => {
    dispatch(addTodo(todo));
    navigate('/todos');
  };

  return (
    <div className="mb-4">
      <h2>Add Todo</h2>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Title"
        value={todo.title}
        onChange={e => setTodo(produce(todo, draft => {draft.title = e.target.value}))}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={todo.text}
        onChange={e => setTodo(produce(todo, draft => {draft.text = e.target.value}))}
      />
      <button
        className="btn btn-primary"
        onClick={handleAddTodo}
        disabled={!todo.title.trim() || !todo.text.trim()}
      >
        Add Todo
      </button>
    </div>
  );
}


export const TodoAddHelperFunction = () => {
  const [todo, setTodo] = useState<Todo>(produce(() => ({
    id: Date.now() * -1,
    title: '',
    text: '',
    done: false,
  })));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // We could simplify this a bit with a helper function
  // But, there is a 📦 for that: use-immer ⭐ 4.2k
  // NEXT: See TodoAddUseImmer.tsx
  const updateTodo = <K extends keyof Todo>(key: K, value: Todo[K]) => {
    setTodo(produce(todo, draft => {
      draft[key] = value;
    }));
  }

  const handleAddTodo = () => {
    dispatch(addTodo(todo));
    navigate('/todos');
  };

  return (
    <div className="mb-4">
      <h2>Add Todo</h2>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Title"
        value={todo.title}
        onChange={e => updateTodo('title', e.target.value)}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={todo.text}
        onChange={e => updateTodo('text', e.target.value)}
      />
      <button
        className="btn btn-primary"
        onClick={handleAddTodo}
        disabled={!todo.title.trim() || !todo.text.trim()}
      >
        Add Todo
      </button>
    </div>
  );
}
