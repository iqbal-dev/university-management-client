import { Link } from "react-router-dom";
import "../styles/notFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="content">
        <h1 className="error-code">404</h1>
        <p className="message">
          Oops! The page you are looking for does not exist.
        </p>
      </div>
      <Link to="/login" className="home-link">
        Go back to the homepage
      </Link>
    </div>
  );
}
