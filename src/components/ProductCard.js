import { useNavigate } from "react-router-dom";
import "./styles/ProductCard.css";
// import { useEffect } from "react";
import toast from "react-hot-toast"; // Import react-hot-toast
import axios from "axios";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  const imageUrl = product.image
    ? `${process.env.REACT_APP_API}/${product.image.replace(/\\/g, "/")}`
    : "path/to/default/image/category1.png";

  const handleCardClick = () => {
    navigate("/product-details", { state: { product } });
  };

  const truncateTitle = (title) => {
    const words = title.split(" ");
    return words.length > 4 ? words.slice(0, 4).join(" ") + "..." : title;
  };

  const checkAuth = async () => {
    try {
      await axios.get(
        `${process.env.REACT_APP_API}/api/version/auth/user-auth`,
        { withCredentials: true }
      );
      return;
    } catch (error) {
      // console.log(
      // error.response.data.message,
      // " , error in getting authentication result"
      // );
      toast.error(error.response.data.message);
    }
  };

  const handleAddToCart = async () => {
    checkAuth();
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/api/version/product/add-cart`,
        { productId: product._id }, // Pass _id as productId
        { withCredentials: true } // This enables sending cookies with the request
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
    <div className="product-card" onClick={handleCardClick}>
      <div className="card" style={{ width: "18rem" }}>
        <img src={imageUrl} alt={product.name} />

        <div className="card-body">
          <div className="card-body-left">
            <h5 className="card-title">{truncateTitle(product.name)}</h5>
            <p>&#8377;{product.price}</p>
          </div>
          <div className="card-body-right">
            <button
              className="btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i>
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
      </div>
    </div>
  );
};

export default ProductCard;
