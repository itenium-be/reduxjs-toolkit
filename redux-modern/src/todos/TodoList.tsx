import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { removeTodo, toggleTodo } from "./todoSlice";
import { selectAllTodosTriggersIdentityFunctionCheckWarning, selectMyTodosCompletedCount, selectTodos } from "./todoSelectors"; // eslint-disable-line

export const TodoList = () => {
  const doneCount = useAppSelector(selectMyTodosCompletedCount);
  const [search, setSearch] = useState('');
  const todos = useAppSelector(state => selectTodos(state, search));
  // const todos = useAppSelector(selectAllTodosTriggersIdentityFunctionCheckWarning);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <h1>
        Upgrade Legacy React App
        <small className="float-end">✔️ {doneCount}</small>
      </h1>
      <SearchInput search={search} setSearch={setSearch} />
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
      <ReselectMeta />
    </>
  );
}

type SearchInputProps = {
  search: string;
  setSearch: (value: string) => void;
};


const SearchInput = ({ search, setSearch }: SearchInputProps) => {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <span className="input-group-text">
        <i className="fas fa-search" />
      </span>
    </div>
  );
};


const ReselectMeta = () => {
  const meta = {
    lastResult: selectMyTodosCompletedCount.lastResult(),
    recomputations: selectMyTodosCompletedCount.recomputations(),
    dependencyRecomputations: selectMyTodosCompletedCount.dependencyRecomputations(),
    argsMemoize: selectMyTodosCompletedCount.argsMemoize,
  }

  return (
    <>
      <h2 style={{marginTop: 16}}>Reselect selectMyTodosCompletedCount Meta</h2>
      <pre>{JSON.stringify(meta, null, 4)}</pre>
    </>
  );
}
