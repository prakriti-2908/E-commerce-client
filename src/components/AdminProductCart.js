import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./styles/CartCard.css";

const AdminProductCard = ({ product, onRemove }) => {
  // const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // console.log(product, "cart card product");
  }, [product]);

  const { _id, name, price, image } = product;
  const totalPrice = price;
  const imageUrl = `${process.env.REACT_APP_API}/${image}`;

  const handleRemoveProduct = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/version/product/remove-product`,
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
          <div className="cart-img-container" >
            <img src={imageUrl} alt={name} />
          </div>
          <div className="cart-content-container">
            <i className="fa-solid fa-trash" onClick={handleRemoveProduct}></i>
            <h5>{name}</h5>
            <p>{totalPrice}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default AdminProductCard;
