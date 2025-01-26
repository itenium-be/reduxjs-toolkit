import { useNavigate } from "react-router-dom";
import { useImmer, useImmerReducer } from "use-immer";
import { useAppDispatch } from "../store";
import { Todo } from "./types";
import { addTodo } from "./todoSlice";

export const TodoAddUseImmer = () => {
  const [todo, setTodo] = useImmer<Todo>({
    id: Date.now() * -1,
    title: '',
    text: '',
    done: false,
  });

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
        onChange={e => setTodo(draft => draft.title = e.target.value)}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={todo.text}
        onChange={e => setTodo(draft => draft.text = e.target.value)}
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

// NEXT: RTK Query, because maybe you want to do some fetching? See src/zoo/zoo-api.ts
