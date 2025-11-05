import React, { useState, useEffect } from 'react';
import api from '../api/api';
import NavbarApp from '../components/Navbar';
import FormModal from '../components/FormModal';
import { Container, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchItems = async () => {
    const res = await api.get('/items', { headers: { Authorization: `Bearer ${token}` } });
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${token}` };
    try {
      if (editMode) {
        await api.put(`/items/${selectedId}`, form, { headers });
        Swal.fire('Data diperbarui!', '', 'success');
      } else {
        await api.post('/items', form, { headers });
        Swal.fire('Data ditambahkan!', '', 'success');
      }
      fetchItems();
      setShowModal(false);
      setForm({ title: '', description: '' });
      setEditMode(false);
    } catch {
      Swal.fire('Gagal menyimpan data', '', 'error');
    }
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setSelectedId(item.id);
    setForm({ title: item.title, description: item.description });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Hapus data?',
      text: 'Data ini akan dihapus permanen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.delete(`/items/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        Swal.fire('Data dihapus!', '', 'success');
        fetchItems();
      }
    });
  };

  return (
    <>
      <NavbarApp />
      <Container className="mt-4">
        <Card className="shadow">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5 className="m-0">Data Items</h5>
            <Button onClick={() => setShowModal(true)}>+ Tambah</Button>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>No</th>
                  <th>Judul</th>
                  <th>Deskripsi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item, i) => (
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>
                        <Button variant="warning" size="sm" onClick={() => handleEdit(item)} className="me-2">
                          Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">Belum ada data</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      <FormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSave}
        form={form}
        setForm={setForm}
        editMode={editMode}
      />
    </>
  );
}