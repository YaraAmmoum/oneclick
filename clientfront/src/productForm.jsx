import React, { useState, useEffect } from "react";
import "./assets/styles/form.css";
import Nav from "./Nav";
import Footer from "./Footer";

export default function ProductForm({ product }) {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [category, setCategory] = useState("");

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      alert("You are not logged in. You must log in first.");
      return;
    }

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Fetched products:", data);

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    }
  };

  const addProduct = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
      }
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const updateProduct = async (id, formData) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(
          products.map((p) =>
            p._id === updatedProduct._id ? updatedProduct : p
          )
        );
      }
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };
  if (quantity === 0) {
    deleteProduct(product._id);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", parseFloat(price));
    formData.append("quantity", parseInt(quantity));
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }
    if (editingProduct) {
      await updateProduct(editingProduct._id, formData);
    } else {
      await addProduct(formData);
    }
    fetchProducts();
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setQuantity("");
    setDesc("");
    setImage(null);
    setImagePreview("");
    setCategory("");
    setEditingProduct(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setQuantity(product.quantity);
    setDesc(product.desc);
    setCategory(product.category);
    setImagePreview(
      product.image ? `http://localhost:5000/${product.image}` : ""
    );
  };

  return (
    <>
      <Nav />
      <div className="product-form">
        <h1 className="headProduct">Manage Your Products</h1>
        <form className="addForm" onSubmit={handleSubmit}>
          <select
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="inputForm"
          >
            <option value="">Select the type</option>

            <option value="airpods">airpods</option>
            <option value="tv">tv</option>
            <option value="audio system">audio</option>
            <option value="keyboard">keyboard</option>
            <option value="charger">charger</option>
            <option value="sunblock">sunblock</option>
            <option value="cream">cream</option>
            <option value="serum">serum</option>
            <option value="serum">mask</option>
            <option value="makeup remover">makeup remover</option>
            <option value="ball">ball</option>
            <option value="helmet">helmet</option>
            <option value="bycycle">bycycle</option>
            <option value="dumbbells ">dumbbells </option>
            <option value="basket">basket</option>
            <option value="decoration">decoration</option>
            <option value="plant">plant</option>
            <option value="other">other</option>
          </select>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            className="inputForm"
            required
          ></textarea>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="inputForm"
            required
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="inputForm"
            required
          />

          <input type="file" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" />}
          <select
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="inputForm"
          >
            <option value="">Select a category</option>
            <option value="ele">Electronic</option>
            <option value="skincare">SkinCare</option>
            <option value="home">Home</option>
            <option value="sport">Sport</option>
          </select>
          <button type="submit" className="addBtn">
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </form>
        <div className="product-list">
          {products.map((product) => (
            <div className="product-item">
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.name}
                style={{ width: "100px" }}
              />
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <p>${product.price}</p>
              <p>Available Quantity : {product.quantity}</p>
              <button onClick={() => handleEdit(product)} className="formBtn">
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="formBtn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
