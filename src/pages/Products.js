import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout/Layout";
import ProductCard from "../components/ProductCard";
import "../components/styles/ProductCard.css";
import { useLocation } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  
  // Extract category from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const [topImg, setTopImg] = useState(""); // Initialize topImg in state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let apiUrl;

        switch (category) {
          case "female":
            apiUrl = `${process.env.REACT_APP_API}/api/version/product/female-products`;
            setTopImg("femaleProduct.jpg");
            break;
          case "male":
            apiUrl = `${process.env.REACT_APP_API}/api/version/product/male-products`;
            setTopImg("maleProduct.jpg");
            break;
          case "kids":
            apiUrl = `${process.env.REACT_APP_API}/api/version/product/kids-products`;
            setTopImg("kidsProduct.jpg");
            break;
          case "accessories":
            apiUrl = `${process.env.REACT_APP_API}/api/version/product/accessories-products`;
            setTopImg("accessoriesProduct.jpg");
            break;
          case "mother-daughter":
            apiUrl = `${process.env.REACT_APP_API}/api/version/product/mother-daughter`;
            setTopImg("m-dProduct.jpg");
            break;
          case "father-daughter":
            apiUrl = `${process.env.REACT_APP_API}/api/version/product/father-daughter`;
            setTopImg("f-dProduct.jpg");
            break;
          case "father-son":
            apiUrl = `${process.env.REACT_APP_API}/api/version/product/father-son`;
            setTopImg("f-sProduct.jpg");
            break;
          case "mother-son":
            apiUrl = `${process.env.REACT_APP_API}/api/version/product/mother-son`;
            setTopImg("m-sProduct.jpg");
            break;
          case "couple":
            apiUrl = `${process.env.REACT_APP_API}/api/version/product/couple`;
            setTopImg("coupleProduct.jpg");
            break;
          default:
            throw new Error("Invalid category");
        }

        const response = await axios.get(apiUrl);

        if (response.status === 200) {
          setProducts(response.data.products);
        } else {
          throw new Error(`API responded with status ${response.status}`);
        }
      } catch (error) {
        setError(`Error fetching products: ${error.message}`);
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <Layout>
      <div className="heading">
        <img src={topImg} alt="product-header-image" />
      </div>
      <div className="products-category">
        {error ? (
          <p>{error}</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </Layout>
  );
};

export default Products;
