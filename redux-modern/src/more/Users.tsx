import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "../store";
import { moreSlice, selectAllUsers } from "./moreSlice";

export const Users = () => {
  const dispatch = useDispatch();
  const users = useAppSelector(state => selectAllUsers(state.more));
  const userIds = useAppSelector(state => state.more.users.ids);
  const [name, setName] = useState("");

  const addUser = () => {
    if (name.trim()) {
      dispatch(moreSlice.actions.addUser({ id: nanoid(), name }));
      setName("");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.name} className="list-group-item d-flex justify-content-between align-items-center">
            {user.name}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => dispatch(moreSlice.actions.removeUser(user.name))}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </li>
        ))}
      </ul>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter user name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addUser}>
          Add User
        </button>
      </div>
      <div>
        <b>UserIds with selectId and sortComparer</b>
        <br />
        {JSON.stringify(userIds)}
      </div>
    </div>
  );
};
