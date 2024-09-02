import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CartCard from "../components/cartCard";
import Layout from "../components/layout/Layout";
import "../components/styles/CartCard.css";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(true); // State to control cart visibility
  const [showVideo, setShowVideo] = useState(false); // State to control video visibility

  useEffect(() => {
    const getAllCartProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/version/product/get-cart`,
          { withCredentials: true }
        );
        if (response.data.status === 200) {
          setCartProducts(response.data.products.products);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
        // console.log(error);
      }
    };

    getAllCartProducts();
  }, []);

  useEffect(() => {
    const calculateTotalBill = () => {
      const total = cartProducts.reduce((acc, product) => {
        return acc + product.productId.price; 
      }, 0);
      setTotalBill(total);
    };

    calculateTotalBill();
  }, [cartProducts]);

  const handleRemoveProduct = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/version/product/remove-all-cart`,
        {},
        { withCredentials: true }
      );
      console.log(response,"cart page error");
      // console.log(response);
      if (response.data.status === 200) {
        setIsCartVisible(false); // Hide the cart products
        setShowVideo(true); // Show the video
        setTotalBill(0); 
        // Hide the video after 4 seconds
        setTimeout(() => {
          setShowVideo(false);
        }, 4000);

        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <Layout>
      <div className="heading">
        <img src="cartHeader.png" alt="product-header-image" />
      </div>
      <div className="cart-page-container">
        {isCartVisible && cartProducts.length > 0 ? (
          <div className="cart-page">
            {cartProducts.map((product) => (
              <CartCard key={product._id} product={product.productId} />
            ))}
          </div>
        ) : (
          <p className="no-product">No products in the cart.</p>
        )}
        <div className="cart-page-bill">
          <h5>Total Bill: &#8377;{totalBill}</h5>
          <p>Platform fee <span>2%</span></p>
          <p>GST <span>12%</span></p>
          <p>Delivery Charge <span>&#8377;{200}</span></p>
          <button className="btn" onClick={handleRemoveProduct}>Place Order</button>
        </div>
        {showVideo && ( // Conditionally render the video
          <div className="video-container order-video-dance">
            <video
              src="OrderDance.mp4"
              autoPlay
              muted
              onEnded={() => setShowVideo(false)} // Hide video when it ends
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
