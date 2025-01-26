import { Link } from "react-router-dom";
import { useGetZoosQuery } from "../zoo-api";
import { ErrorDisplay } from "../../layout/ErrorDisplay";
import { Loading } from "../../layout/Loading";

export const ZooList = () => {
  // The createApi from @reduxjs/toolkit/query/react creates this hook
  const { data, error, isLoading } = useGetZoosQuery();
  // NEXT: ZooDetail.tsx

  if (isLoading)
    return <Loading />;

  if (error)
    return <ErrorDisplay {...error as any} />;

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">
        Mythical Zoos
        <div style={{fontSize: 18, color: '#ccc'}}>Where do you want to go today?</div>
      </h1>
      <div className="row g-4">
        {data!.map(zoo => (
          <div key={zoo.id} className="col-md-6 col-lg-4">
            <div className="card shadow-sm">
              <img src={`/zoos/${zoo.id}.png`} className="card-img-top" alt={zoo.name} />
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between align-items-center">
                  <span>{zoo.name}</span>
                  <span>{zoo.rating}</span>
                </h5>
                <p className="card-text">
                  {zoo.desc}
                </p>
                <Link to={`/zoos/${zoo.id}`} className="btn btn-success" style={{width: '100%'}}>
                  Visit Zoo
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
