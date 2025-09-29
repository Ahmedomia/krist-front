import { useEffect, useState } from "react";
import api from "../../api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          api.get("/admin/users"),
          api.get("/admin/orders"),
          api.get("/products"),
        ]);
        setUsers(usersRes.data || []);
        setOrdersCount(
          Array.isArray(ordersRes.data) ? ordersRes.data.length : 0
        );
        setProductsCount(
          Array.isArray(productsRes.data) ? productsRes.data.length : 0
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded">
          <div className="font-semibold mb-2">Users</div>
          {loading ? (
            <div>Loading...</div>
          ) : users.length === 0 ? (
            <div>No users</div>
          ) : (
            <ul className="max-h-48 overflow-auto list-disc list-inside">
              {users.map((u) => (
                <li key={u._id}>{u.name || u.email}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-4 border rounded">
          <div className="font-semibold mb-2">Orders</div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="text-3xl">{ordersCount}</div>
          )}
        </div>
        <div className="p-4 border rounded">
          <div className="font-semibold mb-2">Products</div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="text-3xl">{productsCount}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
