import { useEffect, useState } from "react";
import api from "../../api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editedStock, setEditedStock] = useState({});

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const remove = async (id) => {
    await api.delete(`/admin/products/${id}`);
    fetchProducts();
  };

  const saveStock = async (id) => {
    const value = Number(editedStock[id]);
    if (Number.isNaN(value) || value < 0) return;
    await api.put(`/admin/products/${id}/stock`, { stock: value });
    fetchProducts();
  };


  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <div className="mb-4 flex">
        <a className="px-3 py-1 border" href="/admin/products/new">
          Add Product
        </a>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.price}</td>
                <td className="p-2 border">
                  <input
                    type="number"
                    className="border px-2 py-1 w-24"
                    value={editedStock[p._id] ?? p.stock ?? 0}
                    onChange={(e) =>
                      setEditedStock((s) => ({ ...s, [p._id]: e.target.value }))
                    }
                    min={0}
                  />
                </td>
                <td className="p-2 border">
                  <div className="flex gap-2">
                    <button
                      className="px-2 py-1 border"
                      onClick={() => saveStock(p._id)}
                    >
                      Save
                    </button>
                    <button
                      className="px-2 py-1 border"
                      onClick={() => remove(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminProducts;
