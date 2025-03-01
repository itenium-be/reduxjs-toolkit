import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { removeTodo, toggleTodo } from "./todoSlice";
import { selectMyTodosCompletedCount } from "./todoSelectors";

export const TodoList = () => {
  const todos = useAppSelector(state => state.todos);
  const doneCount = useAppSelector(selectMyTodosCompletedCount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <h1>
        Upgrade Legacy React App
        <small className="float-end">✔️ {doneCount}</small>
      </h1>
      <ul className="list-group">
        {todos.toSorted((a, b) => a.id - b.id).map(todo => (
          <li
            key={todo.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              todo.done ? "list-group-item-success" : ""
            }`}
          >
            <div>
              <h5>{todo.title}</h5>
              <p className="mb-0">{todo.text}</p>
            </div>
            <div>
              <button
                className="btn btn-sm btn-warning"
                onClick={() => navigate(`/todos/${todo.id}`)}
                style={{marginRight: 8}}
              >
                <i className="fas fa-edit"></i> Edit
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={() => dispatch(toggleTodo(todo.id))}
                style={{marginRight: 8}}
              >
                <i className="fas fa-check" />&nbsp; Done
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => dispatch(removeTodo(todo.id))}
              >
                <i className="far fa-trash-alt"></i> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
