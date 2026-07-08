import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../index.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")));

  const syncAuthState = () => {
    setIsLoggedIn(Boolean(localStorage.getItem("token")));
  };

  useEffect(() => {
    syncAuthState();
  }, [location]);

  useEffect(() => {
    const handleStorage = () => syncAuthState();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    syncAuthState();
    navigate("/");
  };

  return (
    <>
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4">
            <Link to="/">
                <img src="https://previews.123rf.com/images/azaman357/azaman3571606/azaman357160600012/58688096-healthcare-icon-for-people.jpg"
                    width="50px" height="50px"
                    alt="" />
            </Link>
            <nav className="nav">
              <Link className="nav-link text-dark" to="/find" style={{borderBottom:window.location.pathname==="/find"?"5px solid #199FD9":"none"}}>Find Doctor</Link>
              <Link className="nav-link text-dark" to="/video" style={{borderBottom:window.location.pathname==="/video"?"5px solid #199FD9":"none"}}>Video Consult</Link>
              <Link className="nav-link text-dark" to="/lab">Lab Tests</Link>
              <Link className="nav-link text-dark" to="/surgeries">Surgeries</Link>
            </nav>
          </div>
          <div className="d-flex align-items-center gap-3">
            <ul className="nav align-items-center">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                  <span className="badge rounded-pill bg-primary me-2">NEW</span>For Corporate
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                  <li><a className="dropdown-item" href="#">Separated link</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">For Providers</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">Security & help</a>
              </li>
            </ul>
            {isLoggedIn ? (
              <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/loginsignup" className="btn btn-outline-primary">Login / Signup</Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;