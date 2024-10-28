import React, { useState } from "react";
import RegisterForm from './components/RegisterFrom';

const Register: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <RegisterForm onMessage={setMessage} />
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
