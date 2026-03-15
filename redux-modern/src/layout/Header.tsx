import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="https://itenium.be" target="_blank" rel="noopener noreferrer">
            <img src={`${import.meta.env.BASE_URL}itenium.png`} alt="itenium company logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/todos">
                  ✅ Todos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">
                  Add
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/zoos">
                  🏰 Mythical Zoos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/wilds">
                  🌿 Enchanted Wilds
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                <i className="fas fa-user"></i>
              </Link>
            </li>
          </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
