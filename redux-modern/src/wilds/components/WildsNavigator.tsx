import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSelector, lruMemoize } from "@reduxjs/toolkit"; // eslint-disable-line
import { shallowEqual } from "react-redux"; // eslint-disable-line
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { DbZoo } from "../../zoo/MythicalZoo";
import { fetchWilds, wildsSlice } from "../wildsSlice"; // eslint-disable-line

type PrevAndNextZoos = {
  prevZoo?: DbZoo;
  nextZoo?: DbZoo;
}

// ReduxJS/Toolkit also comes with "createSelector"
// to create memoized "selector" functions
// https://github.com/reduxjs/reselect ⭐ 19k
const createAppSelector = createSelector.withTypes<RootState>();

const selectPreviousAndNextZoo = createAppSelector(
  [
    state => state.wilds.zoos,
    (zoos, currentZooId: number) => currentZooId,
  ],
  (zoos, currentZooId) => {
    const prevAndNext: PrevAndNextZoos = {
      prevZoo: zoos.find(zoo => zoo.id === currentZooId - 1),
      nextZoo: zoos.find(zoo => zoo.id === currentZooId + 1),
    };
    console.log(`Calculated Prev&Next for Wilds=${currentZooId}`);
    return prevAndNext;
  },
  {
    // Default memoize fn: weakMapMemoize
    // Currently experimental: unstable_autotrackMemoize
    // lruMemoize: Legacy "Least Recently Used" (with cache size 1 -- configurable)

    // Use createSelectorCreator to create a selector with fixed options
    // (vs providing the same options over & over)

    // memoize: lruMemoize,
    // memoizeOptions: {
    //   equalityCheck: shallowEqual,
    //   resultEqualityCheck: shallowEqual,
    //   maxSize: 2
    // },
    // argsMemoize: lruMemoize,
    // argsMemoizeOptions: {
    //   equalityCheck: shallowEqual,
    //   resultEqualityCheck: shallowEqual,
    //   maxSize: 2
    // }
  }
);

export const WildsNavigator = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentZooId = Number(id);
  const dispatch = useAppDispatch();

  // Using our selector fn:
  const { prevZoo, nextZoo } = useAppSelector(state => selectPreviousAndNextZoo(state, currentZooId));
  // const { prevZoo, nextZoo } = useAppSelector(state => wildsSlice.selectors.selectPreviousAndNextZoo(state, currentZooId));

  // Additional code that RTK Query in the Mythical Zoos took care off for us!
  useEffect(() => {
    if (!prevZoo && !nextZoo) {
      dispatch(fetchWilds());
    }
  }, [dispatch, nextZoo, prevZoo]);

  // NEXT: Back to wildsSlice.ts for the create builder reducers with buildCreateSlice

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
