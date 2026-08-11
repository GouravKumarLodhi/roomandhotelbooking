import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Check Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);

      setMenuOpen(false);

      navigate("/");
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  // Close mobile menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Check active route
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <div className="logo-icon">
            🏠
          </div>

          <div className="logo-text">
            <span>Stay</span>Nest
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links">

          <Link
            to="/"
            className={isActive("/")}
          >
            Home
          </Link>

          <Link
            to="/rooms"
            className={isActive("/rooms")}
          >
            Rooms
          </Link>

          <Link
            to="/about"
            className={isActive("/about")}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={isActive("/contact")}
          >
            Contact
          </Link>

        </div>

        {/* Desktop Actions */}
        <div className="navbar-actions">

          {user ? (
            <>
              <div className="user-info">
                <div className="user-avatar">
                  {user.email?.charAt(0).toUpperCase()}
                </div>

                <span>
                  {user.email?.split("@")[0]}
                </span>
              </div>

              <button
                className="navbar-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="navbar-login"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="navbar-signup"
              >
                Get Started
              </Link>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="mobile-menu">

          <Link
            to="/"
            className={isActive("/")}
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/rooms"
            className={isActive("/rooms")}
            onClick={closeMenu}
          >
            Rooms
          </Link>

          <Link
            to="/about"
            className={isActive("/about")}
            onClick={closeMenu}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={isActive("/contact")}
            onClick={closeMenu}
          >
            Contact
          </Link>

          <div className="mobile-actions">

            {user ? (
              <>
                <div className="mobile-user">
                  <div className="user-avatar">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>

                  <span>
                    {user.email}
                  </span>
                </div>

                <button
                  className="navbar-logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="navbar-login"
                  onClick={closeMenu}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="navbar-signup"
                  onClick={closeMenu}
                >
                  Get Started
                </Link>
              </>
            )}

          </div>

        </div>
      )}
    </header>
  );
}

export default Navbar;