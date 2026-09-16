import { Link } from "react-router-dom";

type Example = {
  to: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
};

const examples: Example[] = [
  {
    to: "/todos",
    image: "zoos/3.png",
    title: "✅ Todos, with Immer",
    subtitle: "createSlice",
    description: "Action types, action creators and reducers in one object. Immer lets those reducers mutate state directly and still hand back a new immutable tree.",
  },
  {
    to: "/zoos",
    image: "zoos/1.png",
    title: "🏰 Mythical Zoos",
    subtitle: "RTK Query",
    description: "createApi generates the hooks, the cache, the loading flags and the invalidation. No reducers, no thunks, no fetch.",
  },
  {
    to: "/wilds",
    image: "zoos/2.png",
    title: "🌿 Enchanted Wilds",
    subtitle: "createAsyncThunk",
    description: "The same screens, but owning the request yourself: thunk lifecycle actions in the slice and derived state with createSelector.",
  },
];

export const Home = () => (
  <>
    <h2 className="mb-4">Modern Redux</h2>
    <div className="row g-4">
      {examples.map(example => (
        <div className="col-md-4" key={example.to}>
          <Link className="card h-100 text-decoration-none text-dark" to={example.to}>
            <img
              className="card-img-top"
              src={`${import.meta.env.BASE_URL}${example.image}`}
              alt={example.title}
              style={{ aspectRatio: "1", objectFit: "cover" }}
            />
            <div className="card-body">
              <h3 className="card-title h5 mb-1">{example.title}</h3>
              <p className="text-muted small mb-2">
                <code>{example.subtitle}</code>
              </p>
              <p className="card-text">{example.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </>
);
