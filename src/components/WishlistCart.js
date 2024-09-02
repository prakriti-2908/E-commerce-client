import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import toast from "react-hot-toast";
import "./styles/CartCard.css";

const WishlistCard = ({ product, onRemove }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true); 


  const { _id, name, price, image } = product;
  const imageUrl = `${process.env.REACT_APP_API}/${image}`;

  const handleCardClick = () => {
    navigate("/product-details", { state: { product } });
  };

  const handleRemoveProduct = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/version/product/remove-wishlist`,
        { productId: _id },
        { withCredentials: true }
      );
      // console.log(response);
      if (response.data.status === 200) {
        setIsVisible(false); 
        toast.success(response.data.message);
        if (onRemove) {
          onRemove(_id);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    isVisible && ( 
      <div className="cart-card"> 
        <div className="cart-card-container">
          <div className="cart-img-container" onClick={handleCardClick}>
            <img src={imageUrl} alt={name} />
          </div>
          <div className="cart-content-container">
            <i className="fa-solid fa-xmark" onClick={handleRemoveProduct}></i>
            <h5 onClick={handleCardClick}>{name}</h5>
            <div className="price-handler">
              {(
                <p>{price}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default WishlistCard;
