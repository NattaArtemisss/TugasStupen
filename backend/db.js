import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ✅ gunakan DATABASE_URL dari .env
});

// Uji koneksi
pool.connect()
  .then(() => console.log('✅ Koneksi PostgreSQL berhasil'))
  .catch(err => console.error('❌ Gagal koneksi ke PostgreSQL:', err));

export default pool;
