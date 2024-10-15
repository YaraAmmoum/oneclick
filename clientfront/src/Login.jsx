import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./assets/styles/style.css";
import Nav from "./Nav";
import Footer from "./Footer";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (email === "admin@gmail.com" && password === "admin") {
        navigate("/admin");
      }
      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setError("Invalid login");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <Nav />
      <div className="outer-container">
        <div className="form-container">
          <form onSubmit={handleLogin}>
            <h3 className="headForm">Login</h3>
            <label className="label" htmlFor="email">
              User Email:
            </label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <label className="label" htmlFor="password">
              Password:
            </label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button className="submit-button" type="submit">
              Login
            </button>
            {error && <p>{error}</p>}
            <p className="dont">
              Don't have an account<Link to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>{" "}
      <Footer />
    </>
  );
}

export default Login;
