import { useEffect, useState } from "react";
import api from "../../api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/users");
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleAdmin = async (id) => {
    await api.put(`/admin/users/${id}/toggle-admin`);
    fetchUsers();
  };

  const toggleBlock = async (id, blocked) => {
    await api.put(`/admin/users/${id}/${blocked ? "unblock" : "block"}`);
    fetchUsers();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Blocked</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.isAdmin ? "Admin" : "User"}</td>
                <td className="p-2 border ">{u.blocked ? "Yes" : "No"}</td>
                <td className="p-2 border space-x-8">
                  <button
                    className="px-2 py-1 border rounded-xl cursor-pointer"
                    onClick={() => toggleAdmin(u._id)}
                  >
                    {u.isAdmin ? "Demote" : "Promote"}
                  </button>
                  <button
                    className="px-2 py-1 border rounded-xl cursor-pointer"
                    onClick={() => toggleBlock(u._id, u.blocked)}
                  >
                    {u.blocked ? "Unblock" : "Block"}
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

export default AdminUsers;

