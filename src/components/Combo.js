import { Link } from "react-router-dom";
import "./styles/Category.css";

const Combo = () => {
  return (
    <div className="categories">
      <h2>Combos</h2>
      <div className="category-container">
        <div className="category">
          <Link to="/products?category=mother-daughter">
            <img src="combo1.jpeg" alt="mother-daughter" className="combo-img" />
          </Link>
          <p>Mother-Daughter</p>
        </div>

        <div className="category">
          <Link to="/products?category=mother-son">
            <img src="combo2.png" alt="mother-son" className="combo-img" />
          </Link>
          <p>Mother-Son</p>
        </div>

        <div className="category">
          <Link to="/products?category=father-daughter">
            <img src="combo3.png" alt="father-daughter" className="combo-img" />
          </Link>
          <p>Father-Daughter</p>
        </div>

        <div className="category">
          <Link to="/products?category=father-son">
            <img src="combo4.png" alt="father-son" className="combo-img" />
          </Link>
          <p>Father-Son</p>
        </div>

        <div className="category">
          <Link to="/products?category=couple">
            <img src="combo5.png" alt="couple" className="combo-img" />
          </Link>
          <p>Couples</p>
        </div>
      </div>
    </div>
  );
};

export default Combo;
