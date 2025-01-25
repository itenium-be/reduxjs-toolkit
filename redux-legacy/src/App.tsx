import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { TodoList } from "./todos/TodoList";

const Home = () => <h2>Legacy Redux</h2>;
const TodoAdd = () => <h2>Add Todo</h2>;

export function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/add" element={<TodoAdd />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
