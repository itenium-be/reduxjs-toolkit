import { useParams } from "react-router-dom";
import { Loading } from "../../layout/Loading";
import { useGetZooQuery } from "../zoo-api";
import { ErrorDisplay } from "../../layout/ErrorDisplay";
import { Creature, Facility, Visitor } from "../MythicalZoo";
import { ZooNavigator } from "./ZooNavigator";
import { VisitZoo } from "./VisitZoo";

export const ZooDetail = () => {
  const { id } = useParams();

  // The hook created for /api/zoos/:id
  const { data, error, isLoading, isFetching, refetch } = useGetZooQuery(Number(id), {
    // pollingInterval: 2000,
    // refetchOnMountOrArgChange: true,
    // skip & skipPollingIfUnfocused
    // refetchOnFocus & refetchOnReconnect --> requires setupListeners(store.dispatch);
  });
  // NEXT: ZooNavigator.tsx

  if (isLoading || (isFetching && data.id !== Number(id)))
    return <Loading />;

  if (error)
    return <ErrorDisplay {...error as any} />;

  if (!data)
    return <p>Zoo not found.</p>;

  return (
    <div className="container mt-4">
      <ZooNavigator />
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
              <p className="fs-4">
                <button type="button" className="btn btn-secondary" onClick={refetch} disabled={isFetching}>
                  {isFetching ? "Refetching..." : "Update"}
                </button>
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




const Facilities = ({facilities}: {facilities: Facility[]}) => {
  return (
    <div className="card-body border-top">
      <h3 className="mt-4">Facilities</h3>
      <div className="row g-4">
        {facilities.map(facility => (
          <div key={facility.id} className="col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="position-relative">
                <img
                    src={`/zoos/facility/${facility.id}.webp`}
                  alt={facility.name}
                  className="card-img-top"
                />
                <div className="position-absolute bottom-0 start-0 w-100 p-2 bg-dark bg-opacity-50 text-white d-flex justify-content-between align-items-center">
                  <span>{facility.type}</span>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">{facility.name}</h5>
                <p className="card-text">{facility.description}</p>
                {facility.offers.map(offer => (
                  <span key={offer} className="badge bg-info" style={{marginRight: 12, fontSize: 24}}>
                    {offer}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Creatures = ({creatures}: {creatures: Creature[]}) => {
  return (
    <div className="card-body border-top">
      <h3 className="mt-5">Creatures</h3>
      <div className="row g-4">
        {creatures.map(creature => (
          <div key={creature.id} className="col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="position-relative">
                <img
                    src={`/zoos/creature/${creature.id}.webp`}
                  alt={creature.name}
                  className="card-img-top"
                />
                <div className="position-absolute bottom-0 start-0 w-100 p-2 bg-dark bg-opacity-50 text-white d-flex justify-content-between align-items-center">
                  <span>{creature.habitat}</span>
                  <span>✨ {creature.magicLevel}</span>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  {creature.type} {creature.name}
                </h5>
                <p className="card-text">Diet: {creature.diet}</p>
                <p className="card-text">
                  {creature.specialAbilities.join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Visitors = ({visitors}: {visitors: Visitor[]}) => {
  const { id } = useParams();

  return (
    <div className="card-body border-top">
      <h3 className="mt-5">
        Notable Visitors
        <VisitZoo zooId={Number(id)} />
      </h3>
      <div className="row g-3">
        {visitors.map((visitor) => (
          <div key={visitor.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  {visitor.name} <span className="badge bg-info">{visitor.type}</span>
                </h5>
                {!!visitor.favoriteCreatures?.length && (
                  <p className="card-text">Favorite Creatures: {visitor.favoriteCreatures.join(", ")}</p>
                )}
                <p className="card-text">
                  Ticket: <span className="badge bg-success">{visitor.ticketType}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
