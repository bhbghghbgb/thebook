import React, { useState } from "react";
import InputField from "./InputField";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  onMessage: (message: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onMessage }) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = "https://localhost:5001/api/auth/register";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        onMessage(result.message);
        setFormData({ username: "", email: "", password: "", confirmPassword: "" });
      } else {
        const errorData = await response.json();
        onMessage("Registration failed: " + JSON.stringify(errorData.errors));
      }
    } catch (error) {
      console.error("Error:", error);
      onMessage("An error occurred while registering.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <InputField
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
