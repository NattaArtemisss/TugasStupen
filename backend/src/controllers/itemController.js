import pool from '../../db.js';

export const getItems = async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM items ORDER BY id ASC');
    res.json(data.rows);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data', error: err.message });
  }
};

export const createItem = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newItem = await pool.query(
      'INSERT INTO items (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.json(newItem.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambah data', error: err.message });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updated = await pool.query(
      'UPDATE items SET title=$1, description=$2 WHERE id=$3 RETURNING *',
      [title, description, id]
    );
    res.json(updated.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengupdate data', error: err.message });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM items WHERE id=$1', [id]);
    res.json({ message: 'Data berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus data', error: err.message });
  }
};