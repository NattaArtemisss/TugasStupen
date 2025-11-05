import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import api from "../api/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.name || form.email);
      Swal.fire({
        icon: "success",
        title: "Login Berhasil!",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/dashboard");
    } catch (err) {
      Swal.fire(
        "Login Gagal",
        err.response?.data?.message ||
          "Terjadi kesalahan, Email atau Password salah.",
        "error"
      );
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <h4 className="text-center mb-3">Login</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100">
            Login
          </Button>
        </Form>
        <p className="text-center mt-3">
          Belum punya akun? <a href="/register">Register</a>
        </p>
      </Card>
    </Container>
  );
}