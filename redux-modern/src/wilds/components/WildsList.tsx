import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SerializedErrorDisplay } from "../../layout/ErrorDisplay";
import { Loading } from "../../layout/Loading";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchWilds } from "../wildsSlice";

export const WildsList = () => {
  const data = useAppSelector(state => state.wilds.zoos);
  const status = useAppSelector(state => state.wilds.status);
  const error = useAppSelector(state => state.wilds.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWilds());
  }, [dispatch]);

  if (!data?.length && (status === 'idle' || status === 'pending'))
    return <Loading />;

  if (status === 'failed')
    return <SerializedErrorDisplay {...error} />;

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">
        Enchanted Wilds
        <div style={{fontSize: 18, color: '#ccc'}}>Discover the Magic Beyond Imagination</div>
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
                <Link to={`/wilds/${zoo.id}`} className="btn btn-success" style={{width: '100%'}}>
                  Visit the Wilds
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
