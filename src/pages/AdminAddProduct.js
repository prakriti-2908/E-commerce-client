import { useEffect, useState } from "react";
import axios from "axios";
import "../components/styles/AdminAddProduct.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";

const AdminAddProduct = () => {
  const navigate = useNavigate();

  // Retrieve companyName from localStorage
  const companyName = localStorage.getItem("companyName") || "Chhammak Chhallo";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_API}/api/version/auth/admin-auth`, { withCredentials: true });
      } catch (error) {
        toast.error(error.response.data.message);
        setTimeout(() => { navigate('/') }, 3000);
      }
    };
    checkAuth();
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    isDiscount: false,
    discountPercent: "",
    category: "female",
    image: null,
    isCombo: false,
    combo: "none",
    company: companyName, // Set company name from localStorage
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      description,
      price,
      category,
      isDiscount,
      discountPercent,
      image,
      isCombo,
      combo,
      company,
    } = formData;

    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("price", price);
    data.append("category", category);
    data.append("isDiscount", isDiscount);
    data.append("discountPercent", discountPercent);
    data.append("image", image);
    data.append("isCombo", isCombo);
    data.append("combo", combo);
    data.append("company", company);

    try {
      await axios.post(
        `${process.env.REACT_APP_API}/api/version/product/add-product`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast.success("Product added successfully!");

      // Clear form inputs
      setFormData({
        name: "",
        description: "",
        price: "",
        isDiscount: false,
        discountPercent: "",
        category: "female",
        image: null,
        isCombo: false,
        combo: "none",
        company: companyName, // Reset to company name from localStorage
      });
      setImagePreview(null); // Clear image preview
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
      toast.error(
        "Error adding product: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <AdminLayout>
      <h2 className="store-heading">Store: {companyName}</h2>
      <div className="admin-add-product">
        <div className="admin-add-product-left">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Product's Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <textarea
                name="description"
                placeholder="Product's Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex flex-container-admin">
              <div className="d-flex flex-column">
                <label>
                  <input
                    type="checkbox"
                    name="isDiscount"
                    checked={formData.isDiscount}
                    onChange={handleChange}
                  />
                  Is Discount?
                </label>
                {formData.isDiscount && (
                  <div>
                    <input
                      type="number"
                      placeholder="Discount Percent"
                      name="discountPercent"
                      value={formData.discountPercent}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
              <div>
                <select
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="kid">Kid</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div className="d-flex flex-column">
                <label>
                  <input
                    type="checkbox"
                    name="isCombo"
                    checked={formData.isCombo}
                    onChange={handleChange}
                  />
                  Is Combo?
                </label>
                {formData.isCombo && (
                  <div>
                    <select
                      name="combo"
                      value={formData.combo}
                      onChange={handleChange}
                    >
                      <option value="">Select Combo</option>
                      <option value="mother-daughter">Mother-Daughter</option>
                      <option value="mother-son">Mother-Son</option>
                      <option value="father-daughter">Father-Daughter</option>
                      <option value="father-son">Father-Son</option>
                      <option value="couple">Couple</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "2rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label>Image:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className="btn add-product-btn">
              Add Product
            </button>
          </form>
        </div>

        <div className="admin-add-product-right">
          {imagePreview && <img src={imagePreview} alt="product-preview" />}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAddProduct;
