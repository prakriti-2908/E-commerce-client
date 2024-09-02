import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/layout/Layout";
import "../../components/styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const RegisterPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // New state for isAdmin

  const navigate = useNavigate();

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
        `${process.env.REACT_APP_API}/api/version/auth/register`,
        { password, name, email, address, contactNumber, isAdmin } // Passing isAdmin to the API
      );
      if (response.data.status !== 201) {
        toast.error(response.data.error);
        return;
      } else {
        toast.success(response.data.message);
      }
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(`Something went wrong : ${error}`);
      // console.log(error);
    }
  };

  return (
    <Layout>
      <div className="register container">
        <img src={images[currentImageIndex]} alt="signup" />
        <div id="registerForm">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
                placeholder="Name or Company's Name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
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
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="exampleInputPhoneNumber"
                aria-describedby="emailHelp"
                placeholder="Phone Number"
                required
                value={contactNumber}
                onChange={(e) => {
                  setContactNumber(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="exampleInputAddress"
                aria-describedby="emailHelp"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)} // Toggle isAdmin state based on checkbox
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Register as Admin
              </label>
            </div>
            <p>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
                Login
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

export default RegisterPage;
