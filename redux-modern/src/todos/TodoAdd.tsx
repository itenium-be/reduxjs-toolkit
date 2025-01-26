import { useState } from "react";
import { useAppDispatch } from "../store";
import { Todo } from "./types";
import { addTodo } from "./todoSlice";
import { useNavigate } from "react-router-dom";

export const TodoAdd = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddTodo = () => {
    if (title.trim() && text.trim()) {
      const newTodo: Todo = {
        id: Date.now() * -1,
        title,
        text,
        done: false,
      };

      dispatch(addTodo(newTodo));
      navigate('/todos');
    }
  };

  return (
    <div className="mb-4">
      <h2>Add a New Todo</h2>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="btn btn-primary"
        onClick={handleAddTodo}
        disabled={!title.trim() || !text.trim()}
      >
        Add Todo
      </button>
    </div>
  );
}
