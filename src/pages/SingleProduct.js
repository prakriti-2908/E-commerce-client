import { useLocation } from "react-router-dom"; // Import useLocation
import Layout from "../components/layout/Layout";
import "../components/styles/SingleProduct.css";
import toast from "react-hot-toast";
import axios from "axios";

const SingleProduct = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const { product } = location.state || {};

  if (!product) {
    return <div>No product found!</div>;
  }

  const imageUrl = product.image
    ? `${process.env.REACT_APP_API}/${product.image.replace(/\\/g, "/")}`
    : "path/to/default/image/category1.png";

  const checkAuth = async () => {
    try {
      await axios.get(
        `${process.env.REACT_APP_API}/api/version/auth/user-auth`,
        { withCredentials: true }
      );
      console.log(product, "product of single product");
      return;
    } catch (error) {
      console.log(
        error.response.data.message,
        " , error in getting authentication result"
      );
      toast.error(error.response.data.message);
    }
  };

  const handleAddToCart = async () => {
    checkAuth();
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/api/version/product/add-cart`,
        { productId: product._id },
        { withCredentials: true }
      );

      toast.success("Product added to cart!");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("This product already exists in the cart.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleAddToWishlist = async () => {
    checkAuth();
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/api/version/product/add-wishlist`,
        { productId: product._id },
        { withCredentials: true }
      );

      toast.success("Product added to wishlist!");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("This product already exists in the cart.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Layout>
      <div className="single-product">
        <div className="single-product-top">
          <img src={imageUrl} alt="product" />
          <div className="product-details">
            <h2>{product.name}</h2>
            <p>
              <b>By : {product.company}</b>
            </p>
            <p>{product.description}</p>
            <h4>Price: &#8377; {product.price}</h4>
            <button
              className="btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              Add To Cart
            </button>
            <button
              className="btn back-to-home"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToWishlist();
              }}
            >
              <i className="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
        <div className="single-product-bottom">
          <h2>Reviews</h2>
          <div className="comments">
            <h4>
              <i className="fa-solid fa-user"></i> user 1
            </h4>
            <p>
              <i className="fa-regular fa-comment"></i> hi am test user,
              Prakriti will replace me with real time user's review
            </p>
          </div>
          <form action="" className="review-box">
            <h4>Add Review</h4>
            <textarea
              name="review"
              id="review"
              placeholder="Type your review"
            ></textarea>
            <button className="btn">Submit</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;
