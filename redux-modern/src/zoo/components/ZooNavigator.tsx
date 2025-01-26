import { useEffect } from "react"; // eslint-disable-line
import { useNavigate, useParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { RootState, useAppDispatch, useAppSelector } from "../../store"; // eslint-disable-line
import { DbZoo } from "../MythicalZoo";
import { useGetZoosQuery, zooApiSlice } from "../zoo-api";

type PrevAndNextZoos = {
  prevZoo?: DbZoo;
  nextZoo?: DbZoo;
}

export const ZooNavigator = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentZooId = Number(id);
  const dispatch = useAppDispatch(); // eslint-disable-line

  const { prevZoo, nextZoo } = useGetZoosQuery(undefined, {
    selectFromResult: ({ data }) => {
      const prevAndNex: PrevAndNextZoos = {};
      if (data) {
        prevAndNex.prevZoo = data.find(zoo => zoo.id === currentZooId - 1);
        prevAndNex.nextZoo = data.find(zoo => zoo.id === currentZooId + 1)
      }
      return prevAndNex;
    }
  });
  // NEXT: Time to mutate, see ZooVisit.tsx

  // While using a selector is possible, it doesn't really mix well with RTK Query...
  // const { prevZoo, nextZoo } = useAppSelector(state => selectPreviousAndNextZoo(state, currentZooId));
  // useEffect(() => {
  //   if (!prevZoo && !nextZoo) {
  //     dispatch(zooApiSlice.endpoints.getZoos.initiate());
  //   }
  // }, [dispatch]);

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      {prevZoo && (
        <button className="btn btn-outline-secondary" onClick={() => navigate(`/zoos/${prevZoo.id}`)}>
          <i className="fas fa-arrow-left" /> Goto {prevZoo.name}
        </button>
      )}
      {nextZoo && (
        <button className="btn btn-outline-secondary" onClick={() => navigate(`/zoos/${nextZoo.id}`)}>
          Goto {nextZoo.name} <i className="fas fa-arrow-right" />
        </button>
      )}
    </div>
  );
}


const selectPreviousAndNextZoo = createSelector( // eslint-disable-line
  [
    (state: RootState) => state,
    (state, currentZooId: number) => currentZooId,
  ],
  (state, currentZooId) => {
    // Right...
    // This is not really the intention; if the getZoos has never been
    // fetched, this code will NOT fetch it either!!
    // We've worked around this with an useEffect() in the component...
    const zoos = zooApiSlice.endpoints.getZoos.select()(state)?.data ?? [];

    const prevAndNext: PrevAndNextZoos = {
      prevZoo: zoos.find(zoo => zoo.id === currentZooId - 1),
      nextZoo: zoos.find(zoo => zoo.id === currentZooId + 1),
    };
    return prevAndNext;
  }
);
