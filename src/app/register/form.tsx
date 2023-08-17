"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

export const RegisterForm = () => {
  let [loading, setLoading] = useState(false);
  let [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios(`/api/register `, {
        method: "POST",
        data: formValues,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);

      signIn(undefined, { callbackUrl: "/" });
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) alert(error.message);
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <form onSubmit={onSubmit} className="text-center flex flex-col ">
      <label htmlFor="name">Username</label>
      <input
        required
        id="name"
        type="name"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        className="bg-slate-700 border border-black rounded-md p-2 mb-5"
      />
      <label htmlFor="email">Email:</label>
      <input
        required
        id="email"
        type="email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        className="bg-slate-700 border border-black rounded-md p-2 mb-5"
      />
      <label htmlFor="password">Password:</label>
      <input
        required
        id="password"
        type="password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
        className="bg-slate-700 border border-black rounded-md p-2 mb-5"
      />
      <button
        style={{
          backgroundColor: `${
            loading ? "#ccc" : "rgb(55 65 81 / var(--tw-bg-opacity))"
          }`,
          cursor: "pointer",
        }}
        disabled={loading}
        className={` text-gray-300 bg-gray-700 hover:bg-gray-800 hover:text-white rounded-md p-2 text-sm font-medium`}
      >
        {loading ? "loading..." : "Register"}
      </button>
    </form>
  );
};
