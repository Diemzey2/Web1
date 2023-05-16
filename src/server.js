const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public')); // Sirve archivos en la carpeta "public"

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/HTML/index.html');
});

app.get('/login', (req, res) => { // Asegúrate de que la ruta /chat esté configurada aquí
  res.sendFile(__dirname + '/public/HTML/login.html');
});

app.get('/register', (req, res) => { // Asegúrate de que la ruta /chat esté configurada aquí
  res.sendFile(__dirname + '/public/HTML/register.html');
});

app.get('/detalle', (req, res) => { // Asegúrate de que la ruta /chat esté configurada aquí
  res.sendFile(__dirname + '/HTML/detalle.html');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
