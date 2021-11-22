import { Link } from "react-router-dom";
import "./Navbar.css";
import Searchbar from "./Searchbar";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { color, changeColor } = useTheme();
  return (
    <div
      className="navbar"
      onClick={() => changeColor("pink")}
      style={{ backgroundColor: color }}
    >
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Ninja</h1>
        </Link>
        <Searchbar />
        <Link to="/create" className="brand">
          <h1>Create Recipe</h1>
        </Link>
      </nav>
    </div>
  );
}
