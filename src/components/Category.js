import { Link } from "react-router-dom";
import "./styles/Category.css";

const Category = () => {
  return (
    <div className="categories">
      <h2>Categories</h2>
      <div className="category-container">
        <div className="category">
          <Link to="/products?category=male">
            <img src="category1.png" alt="male" />
          </Link>
          <p>Male</p>
        </div>

        <div className="category">
          <Link to="/products?category=female">
            <img src="category2.png" alt="female" />
          </Link>
          <p>Female</p>
        </div>

        <div className="category">
          <Link to="/products?category=kids">
            <img src="category3.png" alt="kids" />
          </Link>
          <p>Kids</p>
        </div>

        <div className="category">
          <Link to="/products?category=accessories">
            <img src="category4.png" alt="accessories" />
          </Link>
          <p>Accessories</p>
        </div>
      </div>
    </div>
  );
};

export default Category;
