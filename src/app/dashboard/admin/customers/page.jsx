"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, User } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AllUsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch All Users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/user"); // তোমার endpoint অনুযায়ী চেঞ্জ করো
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete User (যদি দরকার হয়)
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:5000/user/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("User deleted successfully");
        fetchUsers(); // Refresh table
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return <p className="text-center py-10 text-neutral-400">Loading users...</p>;
  }

  return (
    <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <User className="text-emerald-500" />
          All Users
        </h2>
        <p className="text-sm text-neutral-400">{users.length} Users Found</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-neutral-950">
              <th className="px-6 py-4 text-left text-neutral-400 font-medium">Name</th>
              <th className="px-6 py-4 text-left text-neutral-400 font-medium">Email</th>
              <th className="px-6 py-4 text-left text-neutral-400 font-medium">Role</th>
              <th className="px-6 py-4 text-left text-neutral-400 font-medium">Joined</th>
              <th className="px-6 py-4 text-center text-neutral-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{user.name}</div>
                </td>
                <td className="px-6 py-4 text-neutral-300">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      user.role === "admin"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-400">
                  {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center px-4 justify-center gap-3">
                   
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-10 text-neutral-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}