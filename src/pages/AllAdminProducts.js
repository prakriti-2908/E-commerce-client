import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "../components/styles/CartCard.css";
import AdminProductCard from "../components/AdminProductCart";
import AdminLayout from "../components/layout/AdminLayout";
 
const AdminProductsPage = () => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const getAllAdminProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/version/product/get-admin-products`,
          { withCredentials: true }
        );
        console.log(response);
        if (response.data.status === 200) {
          setCartProducts(response.data.products);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
        // console.log(error);
      }
    };

    getAllAdminProducts();
  }, []);



  return (
    <AdminLayout>
      <div className="cart-page-container">
        {cartProducts.length > 0 ? (
          <div className="cart-page">
            {cartProducts.map((product) => (
              <AdminProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="no-product">No products in shop.</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProductsPage;
