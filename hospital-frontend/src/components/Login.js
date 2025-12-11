import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authContext, LoginContext } from "./AuthContext";

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const {loginUser}=useContext(authContext);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setServerError("");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let msg = "Invalid email or password";
        try {
          const err = await response.json();
          msg = err.message || err.error || msg;
        } catch {}
        setServerError(msg);
        return;
      }

      const data = await response.json();

      const token = data?.token;
      const user = data?.userDto || data?.user;

      if (!token) {
        setServerError("Token missing in response");
        return;
      }

      // save using context
      loginUser(token, user);

      // redirect after login
      navigate("/home");
    } 
    catch (error) {
      console.error(error);
      setServerError("Network error — backend not reachable");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>CareSync Login</h2>

        {serverError && <p style={styles.serverError}>{serverError}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            {...register("email", { required: "Email is required" })}
            style={styles.input}
          />
          {errors.email && <p style={styles.fieldError}>{errors.email.message}</p>}

          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            {...register("password", { required: "Password is required" })}
            style={styles.input}
          />
          {errors.password && <p style={styles.fieldError}>{errors.password.message}</p>}

          <button type="submit" style={styles.button} disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#eaf6ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "360px",
    padding: "28px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    fontSize: "26px",
    marginBottom: "18px",
    color: "#007bff",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "12px",
  },
  serverError: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },
  fieldError: {
    color: "red",
    fontSize: "13px",
    marginBottom: "6px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#007bff",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },
};
