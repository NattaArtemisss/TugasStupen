import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      Swal.fire({
        icon: 'success',
        title: 'Registrasi Berhasil!',
        text: 'Akun Anda berhasil dibuat. Silakan login.',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      }).then(() => navigate('/login'));
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Registrasi Gagal!',
        text: err.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.',
        confirmButtonText: 'Tutup',
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px' }} className="p-4 shadow">
        <h4 className="text-center mb-3">Register</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              name="name"
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100">Register</Button>
        </Form>
        <p className="text-center mt-3">
          Sudah punya akun? <a href="/login">Login</a>
        </p>
      </Card>
    </Container>
  );
}

export default Register;