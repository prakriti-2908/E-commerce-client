import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/layout/Layout";
import "../../components/styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const images = useMemo(
    () => [
      "signup1.png",
      "signup2.png",
      "signup3.png",
      "signup4.png",
      "signup5.png",
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/version/auth/login`,
        { password, email },
        { withCredentials: true }
      );

      if (response.data.status !== 200) {
        toast.error(response.data.error);
        return;
      } else {
        if (response.data.userDb.isAdmin) {
          toast.success("Admin logged in successfully");
        } else {
          toast.success(response.data.message);
        }

        setAuth({
          user: response.data.userDb,
          token: response.data.jwtToken,
          isAuthenticated: true,
        });
      }

      if (response.data.userDb.isAdmin) {
        console.log(response.data.userDb, "login userDb check");
        setTimeout(() => {
          localStorage.setItem("companyName", response.data.userDb.name);
          navigate("/admin-landing", {
            state: { userDb: response.data.userDb },
          });
        }, 0);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      toast.error(`Something went wrong : ${error}`);
    }
  };

  return (
    <Layout>
      <div className="register container">
        <img src={images[currentImageIndex]} alt="signup" />
        <div id="registerForm">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <p>
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Register
              </Link>
            </p>

            <button type="submit" className="btn signinBtn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
