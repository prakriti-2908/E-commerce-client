import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import toast from "react-hot-toast";
import "./styles/CartCard.css";

const CartCard = ({ product, onRemove }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true); 

  useEffect(() => {
    // console.log(product, "cart card product");
  }, [product]);

  const { _id, name, price, isDiscount, discountedPrice, image } = product;

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = quantity * price;
  const imageUrl = `${process.env.REACT_APP_API}/${image}`;

  const handleCardClick = () => {
    navigate("/product-details", { state: { product } });
  };

  const handleRemoveProduct = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/version/product/remove-cart`,
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
      // console.log(error);
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
              {isDiscount ? (
                <>
                  <p>{totalPrice}</p>
                  <sub>
                    <s>{discountedPrice}</s>
                  </sub>
                </>
              ) : (
                <p>{totalPrice}</p>
              )}
              <div className="quantity-handler">
                <button className="btn" onClick={handleDecrease}>
                  <i className="fa-solid fa-minus"></i>
                </button>
                <p>{quantity}</p>
                <button className="btn" onClick={handleIncrease}>
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CartCard;
