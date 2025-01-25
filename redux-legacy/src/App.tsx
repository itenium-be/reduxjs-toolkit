import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

const Home = () => <h2>Legacy Redux</h2>;
const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;

export function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
