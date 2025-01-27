import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { TodoList } from "./todos/TodoList";
import { TodoAdd } from "./todos/TodoAdd";
import { TodoEdit } from "./todos/TodoEdit";
import { TodoAddUseImmer } from "./todos/TodoAddUseImmer"; // eslint-disable-line
import { ZooList } from "./zoo/components/ZooList";
import { ZooDetail } from "./zoo/components/ZooDetail";
import { WildsList } from "./wilds/components/WildsList";
import { WildsDetail } from "./wilds/components/WildsDetail";
import { getCreatures } from "./wilds/wildsSlice";
import { useAppDispatch } from "./store";

const Home = () => (
  <>
    <h2>Modern Redux</h2>
    <ul>
      <li><b>Todos</b>: Basics + Immer</li>
      <li><b>Mythical Zoos</b>: RTK Query</li>
      <li><b>Enchanted Wilds</b>: createAsyncThunk</li>
    </ul>
  </>
);

export function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCreatures());
  });

  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/todos/:id" element={<TodoEdit />} />
          <Route path="/add" element={<TodoAdd />} />
          {/* <Route path="/add" element={<TodoAddUseImmer />} /> */}

          <Route path="/zoos" element={<ZooList />} />
          <Route path="/zoos/:id" element={<ZooDetail />} />

          <Route path="/wilds" element={<WildsList />} />
          <Route path="/wilds/:id" element={<WildsDetail />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
