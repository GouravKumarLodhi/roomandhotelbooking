import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login successful!");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-left">
          <div className="auth-brand">
            🏠 StayNest
          </div>

          <div>
            <h1>
              Welcome
              <br />
              Back!
            </h1>

            <p>
              Login to manage your room, bookings and
              stay details.
            </p>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form">

            <span className="form-label">
              WELCOME BACK
            </span>

            <h2>Login to your account</h2>

            <p className="form-subtitle">
              Enter your details to continue.
            </p>

            <form onSubmit={handleLogin}>

              <label>Email Address</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <div className="form-options">
                <label className="remember">
                  <input type="checkbox" />
                  Remember me
                </label>

                <a href="#">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="auth-button"
              >
                Login
              </button>

            </form>

            <p className="auth-switch">
              Don't have an account?{" "}
              <Link to="/signup">
                Create Account
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;