import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminHeader() {
  const { auth, setAuth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(document.cookie.JWT,"cookie hehe")
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/version/auth/user-auth`,
          {
            withCredentials: true,
          }
        );
        if (response.data.ok) {
          // User is authenticated
          setAuth({
            user: response.data.userDb,
            token: response.data.jwtToken,
            isAuthenticated: true,
          });
        }
      } catch (error) {
        console.error(error.response.data.message);
        // Handle unauthorized status (e.g., clear auth state)
        setAuth({
          user: null,
          token: "",
          isAuthenticated: false,
        });
      }
    };

    checkAuthStatus();
  }, [setAuth]);

  const handleLogOut = async (type) => {
    try {
      let apiUrl;
      if (type === "device") {
        apiUrl = `${process.env.REACT_APP_API}/api/version/auth/logout`;
      } else if (type === "allDevices") {
        apiUrl = `${process.env.REACT_APP_API}/api/version/auth/logout-from-all-devices`;
      }

      const response = await axios.post(
        apiUrl,
        {},
        {
          withCredentials: true,
        }
      );

      // console.log(response, "response of handle log out ");
      if (response.data.status === 200) {
        document.cookie = `JWT=; expires=${Date.now()}; path=/;`;
        document.cookie = `[connect.sid]=; expires=${Date.now()}; path=/;`;
        toast.success("Successfully logged out");
        setAuth({
          user: null,
          token: "",
          isAuthenticated: false,
        });
        setShowModal(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error, "error hehe log out");
      toast.error("Error: ", error);
    }
  };

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink to="/">
              <img
                src="logo.png"
                className="navbar-brand"
                alt="Chhammak Chhallo"
                title="Chhammak Chhallo"
              />
            </NavLink>
            {/* <input type="text" placeholder="Search" className="navbar-search" />
            <i
              className="fa-solid fa-magnifying-glass"
              title="Search"
              onClick={search}
            ></i> */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/admin-landing" className="nav-link active">
                  <i className="fa-solid fa-house" title="Home"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin-shop" className="nav-link">
                  <i className="fa-solid fa-shop" title="shop"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                {auth.isAuthenticated === false ? (
                  <NavLink
                    to="/register"
                    className="nav-link active signup"
                    aria-current="page"
                    title="Signup"
                  >
                    Signup
                  </NavLink>
                ) : (
                  <span
                    className="nav-link active signup"
                    title="Logout"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showModal && (
        <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-overlay"></div>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancel}
                ></button>
              </div>
              <div className="modal-body">
                <p>Log out from this device or all devices?</p>
              </div>
              <div className="modal-bottom">
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleLogOut("device")}
                >
                  From this device
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleLogOut("allDevices")}
                >
                  From all devices
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
