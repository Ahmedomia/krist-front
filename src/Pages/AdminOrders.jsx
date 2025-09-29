import { useEffect, useState } from "react";
import api from "../../api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/orders");
      setOrders(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/admin/orders/${id}/status`, { status });
    fetchOrders();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td className="p-2 border">{o._id}</td>
                <td className="p-2 border">{o.user?.email}</td>
                <td className="p-2 border">{o.totalPrice}</td>
                <td className="p-2 border">{o.status || "Pending"}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="px-2 py-1 border"
                    onClick={() => updateStatus(o._id, "Shipped")}
                  >
                    Mark Shipped
                  </button>
                  <button
                    className="px-2 py-1 border"
                    onClick={() => updateStatus(o._id, "Delivered")}
                  >
                    Mark Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;

