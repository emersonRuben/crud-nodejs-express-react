const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'universidad',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

// Crear estudiante
app.post('/estudiantes', (req, res) => {
  const estudiante = req.body;
  connection.query('INSERT INTO estudiantes SET ?', estudiante, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Leer estudiantes
app.get('/estudiantes', (req, res) => {
  connection.query('SELECT * FROM estudiantes', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Actualizar estudiante
app.put('/estudiantes/:id', (req, res) => {
  const { id } = req.params;
  const estudiante = req.body;
  connection.query('UPDATE estudiantes SET ? WHERE id = ?', [estudiante, id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Eliminar estudiante
app.delete('/estudiantes/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM estudiantes WHERE id = ?', id, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
