import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

const Settings = () => {
  const { user, login } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [ticket, setTicket] = useState({
    subject: "",
    message: "",
  });

  const [feedback, setFeedback] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setFeedback({ type: "", text: "" });
    try {
      const res = await api.put("/auth/profile", profile);
      if (login && res.data) {
        login({ ...user, name: res.data.name, email: res.data.email });
      }
      setFeedback({ type: "success", text: "Profile details updated successfully." });
    } catch (err) {
      setFeedback({
        type: "error",
        text: err.response?.data?.message || "Profile update failed.",
      });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setFeedback({ type: "", text: "" });
    try {
      await api.put("/auth/change-password", passwords);
      setFeedback({ type: "success", text: "Password changed successfully." });
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setFeedback({
        type: "error",
        text: err.response?.data?.message || "Password update failed.",
      });
    }
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: "", text: "" });
    setLoading(true);
    try {
      await api.post("/support", ticket);
      setFeedback({ type: "success", text: "Support ticket submitted successfully." });
      setTicket({ subject: "", message: "" });
    } catch (err) {
      setFeedback({
        type: "error",
        text: err.response?.data?.message || "Support ticket submission failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 text-white space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Account Settings & Support</h1>

      {feedback.text && (
        <div
          className={`p-3 rounded border text-sm ${
            feedback.type === "success"
              ? "bg-emerald-500/20 border-emerald-500 text-emerald-200"
              : "bg-red-500/20 border-red-500 text-red-200"
          }`}
        >
          {feedback.text}
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleProfileUpdate} className="bg-slate-800 p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold border-b border-slate-700 pb-2">Profile Information</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            type="email"
            required
            className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 font-medium px-4 py-2 rounded transition">
          Update Profile
        </button>
      </form>

      {/* Password Change Form */}
      <form onSubmit={handlePasswordChange} className="bg-slate-800 p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold border-b border-slate-700 pb-2">Security & Password</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <input
            type="password"
            required
            className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
            value={passwords.currentPassword}
            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">New Password (min 8 characters)</label>
          <input
            type="password"
            required
            minLength={8}
            className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          />
        </div>
        <button type="submit" className="bg-slate-700 hover:bg-slate-600 border border-slate-500 font-medium px-4 py-2 rounded transition">
          Change Password
        </button>
      </form>

      {/* Support Ticket Form */}
      <form onSubmit={handleTicketSubmit} className="bg-slate-800 p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold border-b border-slate-700 pb-2">Contact Security Support</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            required
            placeholder="e.g., Incident Telemetry Ingestion Bug"
            className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
            value={ticket.subject}
            onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description / Telemetry Notes</label>
          <textarea
            required
            rows={4}
            placeholder="Describe the issue or telemetry irregularity..."
            className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
            value={ticket.message}
            onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 font-medium px-4 py-2 rounded transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>
    </div>
  );
};

export default Settings;