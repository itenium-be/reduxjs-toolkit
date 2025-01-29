import { useParams } from "react-router-dom";
import { Loading } from "../../layout/Loading";
import { Visitor } from "../../zoo/MythicalZoo";
import { WildsNavigator } from "./WildsNavigator";
import { VisitWilds } from "./VisitWilds";
import { Creatures, Facilities, FavouriteCreatures } from "../../zoo/components/ZooDetail";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { useEffect } from "react";
import { deleteVisitor, fetchWild, selectZoo } from "../wildsSlice";
import { createSelector } from "@reduxjs/toolkit";


export const WildsDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isLoading = useAppSelector(state => state.wilds.status !== 'succeeded');

  // Our selectZoo selector
  const data = useAppSelector(state => selectZoo(state, id!));

  // Another naive implementation, once fetched we never refetch!
  useEffect(() => {
    if (!data) {
      dispatch(fetchWild(Number(id)));
    }
  }, [id, data, dispatch]);

  // NEXT: WildsNavigator.tsx: reselect's createSelector


  if (isLoading && !data)
    return <Loading />;

  if (!data)
    return <p>Wilds not found.</p>;

  return (
    <div className="container mt-4">
      <WildsNavigator />
      <div className="card shadow-lg">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`/zoos/${data.id}.png`}
              alt={data.name}
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title mb-4">
                {data.name} &nbsp;
                {data.rating}
              </h1>
              <p className="fs-4">
                {data.desc}
              </p>
            </div>
          </div>
          <Creatures creatures={data.creatures} />
          <Facilities facilities={data.facilities} />
          <Visitors visitors={data.visitors} />
        </div>
      </div>
    </div>
  );
};

const selectVisitorsWithCreatures = createSelector(
  [
    (state: RootState) => state.wilds.creatures,
    (_, visitors: Visitor[]) => visitors,
  ],
  (creatures, visitors) => {
    return visitors.map(visitor => ({
      ...visitor,
      favoriteCreatures: visitor.favoriteCreatures
        .map(creatureId => creatures.find(c => c.id === creatureId))
        .filter(x => !!x)
    }))
  }
)

const Visitors = ({visitors}: {visitors: Visitor[]}) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const fullVisitors = useAppSelector(state => selectVisitorsWithCreatures(state, visitors));

  return (
    <div className="card-body border-top">
      <h3 className="mt-5">
        Notable Visitors
        <VisitWilds zooId={Number(id)} />
      </h3>
      <div className="row g-3">
        {fullVisitors.filter(visitor => !!visitor).map(visitor => (
          <div key={visitor.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body pb-0">
                <h5 className="card-title">
                  {visitor.name} <span className="badge bg-info">{visitor.type}</span>
                  <span className="badge bg-success float-end">{visitor.ticketType}</span>
                </h5>
                <FavouriteCreatures favoriteCreatures={visitor.favoriteCreatures} />
              </div>
              <div className="card-footer bg-transparent border-0 pt-0">
                <button className="btn btn-outline-danger float-end" type="button" onClick={() => {
                    dispatch(deleteVisitor({zooId: Number(id), visitorId: visitor.id}));
                  }}
                >
                  <i className="far fa-trash-alt" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
