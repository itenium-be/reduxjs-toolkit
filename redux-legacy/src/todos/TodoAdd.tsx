import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { addTodo } from "../store/store";

export const TodoAdd = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddTodo = () => {
    dispatch(addTodo({
      id: Date.now(),
      title,
      text,
      done: false,
    }));
    navigate('/todos');
  };

  return (
    <div className="mb-4">
      <h2>Add Todo</h2>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={text}
        onChange={e => setText(e.target.value)}
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
};
