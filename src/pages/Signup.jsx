import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account created successfully!");

      navigate("/");
    } catch (error) {
      console.log(error);

      if (
        error.code ===
        "auth/email-already-in-use"
      ) {
        alert("This email is already registered.");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-left signup-left">
          <div className="auth-brand">
            🏠 StayNest
          </div>

          <div>
            <h1>
              Your New
              <br />
              Home Awaits!
            </h1>

            <p>
              Create your account and find a comfortable
              place to stay near your college.
            </p>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form">

            <span className="form-label">
              GET STARTED
            </span>

            <h2>Create an account</h2>

            <p className="form-subtitle">
              Join StayNest and find your perfect room.
            </p>

            <form onSubmit={handleSignup}>

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
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <p className="password-info">
                Password must contain at least 6
                characters.
              </p>

              <button
                type="submit"
                className="auth-button"
              >
                Create Account
              </button>

            </form>

            <p className="auth-switch">
              Already have an account?{" "}
              <Link to="/login">
                Login
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;