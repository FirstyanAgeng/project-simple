import { useEffect, useState } from "react";

const AdminComponent = () => {
  const [products, setProducts] = useState([]);
  const [namaProduk, setNamaProduk] = useState("");
  const [stock, setStock] = useState("");

  const endpoint = "http://localhost:3001/api/products";

  const fetchData = async () => {
    const response = await fetch(endpoint);
    const data = await response.json();
    setProducts(data.data);
    console.log(data);
  };

  const addProduct = async () => {
    await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nama_produk: namaProduk, stock }),
    });
    fetchData();
  };

  const updateProduct = async (id) => {
    const newProduct = prompt("Enter new produk name");
    const newStock = prompt("Enter new stock");

    await fetch(`${endpoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nama_produk: newProduct, stock: newStock }),
    });
    fetchData(); // Refresh the product list after updating
  };

  const deleteProduct = async (id) => {
    await fetch(`${endpoint}/${id}`, {
      method: "DELETE",
    });
    fetchData(); // Refresh the product list after deleting
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <input
        type="text"
        placeholder="Nama Produk"
        value={namaProduk}
        onChange={(e) => setNamaProduk(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <button onClick={addProduct}>Add Product</button>

      <table border={1}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama Produk</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nama_produk}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => updateProduct(product.id)}>
                  Update
                </button>
                <button onClick={() => deleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminComponent;
