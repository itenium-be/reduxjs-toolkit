import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { TodoList } from "./todos/TodoList";
import { TodoAdd } from "./todos/TodoAdd";
import { TodoEdit } from "./todos/TodoEdit";
import { TodoAddUseImmer } from "./todos/TodoAddUseImmer"; // eslint-disable-line
import { ZooList } from "./zoo/components/ZooList";

const Home = () => <h2>Modern Redux</h2>;

export function App() {
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
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
