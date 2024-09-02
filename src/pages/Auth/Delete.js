import axios from "axios";
import "../../components/styles/Footer.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../components/styles/Delete.css";
import Layout from "../../components/layout/Layout";

const Delete = () => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/version/auth/delete-account`,
        {},
        { withCredentials: true }
      );
      console.log(response, "response of handle delete");
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/register");
      }, 1500);
    } catch (error) {
        console.log(error," error in handle delete");
        toast.error(error.message);
    }
  };

  const handleCancel = () => {
    toast.success("Rediricting to Login...");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <Layout>
      <div className="Delete">
        <div className="delete-top">
          <h5>Do You want to delete your account ?</h5>
        </div>
        <div className="delete-bottom">
          <button className="btn" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </Layout>
  );
};
export default Delete;
