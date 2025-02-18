import React, { useState } from "react";
import "./changePass.css";
import DashboredItems from "../../Components/DashboredItems/DashboredItems";
import Success from "../../Components/Success/Success";

const ChangePass = () => {
  const [formData, setFormData] = useState({
    password: "",
    newpassword: "",
    confirmNewPass: "",
  });

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newpassword !== formData.confirmNewPass) {
      setMessage("New passwords don't match.");
      setSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/admin/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      setMessage("Password changed successfully!");
      setSeverity("success");
      setFormData({ password: "", newpassword: "", confirmNewPass: "" });

    } catch (error) {
      setMessage(error.message);
      setSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  return (
    <div>
      <DashboredItems />
      <div className="change-pass">
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="password">Old Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="newpassword">New Password:</label>
            <input
              type="password"
              id="newpassword"
              name="newpassword"
              value={formData.newpassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="confirmNewPass">Retype New Password:</label>
            <input
              type="password"
              id="confirmNewPass"
              name="confirmNewPass"
              value={formData.confirmNewPass}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Change</button>
        </form>
      </div>

      <Success message={message} color={severity} open={openSnackbar} setOpen={setOpenSnackbar} />
    </div>
  );
};

export default ChangePass;