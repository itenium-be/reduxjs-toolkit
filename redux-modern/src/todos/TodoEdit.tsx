import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { updateTodo } from "./todoSlice";

export const TodoEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.todos.find(todo => todo.id === Number(id)));

  const [title, setTitle] = useState(todo?.title || "");
  const [text, setText] = useState(todo?.text || "");

  const handleSave = () => {
    if (title.trim() && text.trim()) {
      dispatch(
        updateTodo({
          id: Number(id),
          title,
          text,
          done: todo?.done || false,
        })
      );
      navigate("/todos");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Edit Todo</h1>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="text"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
      <button
        className="btn btn-secondary ms-2"
        onClick={() => navigate("/todos")}
      >
        Cancel
      </button>
    </div>
  );
};
