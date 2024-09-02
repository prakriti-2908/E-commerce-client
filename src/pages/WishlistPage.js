import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/layout/Layout";
import "../components/styles/CartCard.css";
import WishlistCard from "../components/WishlistCart";

const WishlistPage = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const getAllWishlistProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/version/product/get-wishlist`,
          { withCredentials: true }
        );
        if (response.data.status === 200) {
          setWishlistProducts(response.data.products.products);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if(error.response.status === 401){
          toast.error("Unauthorized Access");
        }else
        toast.error(error.message);
      }
    };

    getAllWishlistProducts();
  }, []);


  return (
    <Layout>
    <div className="heading">
        <img src="wishlistHeader.png" alt="product-header-image" />
      </div>
      <div className="cart-page-container">
        {wishlistProducts.length > 0 ? (
          <div className="cart-page">
            {wishlistProducts.map((product) => (
              <WishlistCard key={product._id} product={product.productId} />
            ))}
          </div>
        ) : (
          <p className="no-product">No products in Wishlists.</p>
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;
