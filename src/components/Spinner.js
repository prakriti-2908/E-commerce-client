import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => {
        if (prevValue <= 1) {
          clearInterval(interval);
          navigate('/admin-landing');
          return 0;
        }
        return --prevValue;
      });
    }, 1000);
  
    const checkAuth = async () => {
      try {
        await axios.get(
          `${process.env.REACT_APP_API}/api/version/auth/user-auth`,
          { withCredentials: true }
        );

        await axios.get(
          `${process.env.REACT_APP_API}/api/version/auth/admin-auth`,
          { withCredentials: true }
        );
        
        // console.log(response,"spinner check");
      } catch (error) {
        console.log(
          error.response.data.message,
          " , error in getting authentication result"
        );
        toast.error("Admin not authenticated");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    };
  
    checkAuth();
  
    return () => clearInterval(interval);
  }, [navigate]);
  

  return (
    <div>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="text-center">Redirecting to you in {count}</h1>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
