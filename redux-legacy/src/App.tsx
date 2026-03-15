import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { TodoList } from "./todos/TodoList";
import { TodoAdd } from "./todos/TodoAdd";

export function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/add" element={<TodoAdd />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
