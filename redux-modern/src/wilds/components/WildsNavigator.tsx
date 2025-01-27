import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { DbZoo } from "../../zoo/MythicalZoo";
import { fetchWilds, wildsSlice } from "../wildsSlice";

type PrevAndNextZoos = {
  prevZoo?: DbZoo;
  nextZoo?: DbZoo;
}

const selectPreviousAndNextZoo = createSelector( // eslint-disable-line
  [
    (state: RootState) => state.wilds.zoos,
    (zoos, currentZooId: number) => currentZooId,
  ],
  (zoos, currentZooId) => {
    const prevAndNext: PrevAndNextZoos = {
      prevZoo: zoos.find(zoo => zoo.id === currentZooId - 1),
      nextZoo: zoos.find(zoo => zoo.id === currentZooId + 1),
    };
    return prevAndNext;
  }
);

export const WildsNavigator = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentZooId = Number(id);
  const dispatch = useAppDispatch();

  // const { prevZoo, nextZoo } = useAppSelector(state => selectPreviousAndNextZoo(state, currentZooId));
  const { prevZoo, nextZoo } = useAppSelector(state => wildsSlice.selectors.selectPreviousAndNextZoo(state, currentZooId));
  useEffect(() => {
    if (!prevZoo && !nextZoo) {
      dispatch(fetchWilds());
    }
  }, [dispatch, nextZoo, prevZoo]);

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      {prevZoo && (
        <button className="btn btn-outline-secondary" onClick={() => navigate(`/wilds/${prevZoo.id}`)}>
          <i className="fas fa-arrow-left" /> Goto {prevZoo.name}
        </button>
      )}
      {nextZoo && (
        <button className="btn btn-outline-secondary" onClick={() => navigate(`/wilds/${nextZoo.id}`)}>
          Goto {nextZoo.name} <i className="fas fa-arrow-right" />
        </button>
      )}
    </div>
  );
}
