import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

export function App() {
  return (
    <div className="App">
      <Header />
      <div className="container mt-4">
        <h1>Legacy Redux</h1>
        <p>This is a basic template to get started.</p>
      </div>
      <Footer />
    </div>
  );
}
