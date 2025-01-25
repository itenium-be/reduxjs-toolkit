import { toggleTodo, useAppDispatch, useAppSelector } from "../store/store";

export const TodoList = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const handleToggleDone = (id: number) => {
    dispatch(toggleTodo(id));
  };

  return (
    <>
      <h1>Upgrade Legacy React App</h1>
      <ul className="list-group">
        {todos.map(todo => (
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
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleToggleDone(todo.id)}
            >
              {todo.done ? "Mark as Incomplete" : "Mark as Done"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
