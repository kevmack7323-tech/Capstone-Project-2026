import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Officer",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", formData);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register New Account</h2>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
            placeholder="Officer John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
            placeholder="officer@macksolutions.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            minlength="6"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
          >
            <option value="Officer">Officer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded transition duration-200 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 hover:underline">
          Sign in here
        </Link>
      </p>
    </div>
  );
};

export default Register;