const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta para servir el formulario HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Ruta para manejar el envío del formulario
// Ruta para manejar el envío del formulario
app.post('/submit', (req, res) => {
    // Obtener los datos del formulario
    const { nombre, apellido, departamento, edad, hora } = req.body;

    // Leer los datos actuales del archivo user.json
    fs.readFile('user.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            res.status(500).send('Error al procesar la solicitud.');
            return;
        }

        // Parsear el contenido JSON actual
        let usuarios = JSON.parse(data);

        // Agregar el nuevo usuario al arreglo
        usuarios.push({
            nombre,
            apellido,
            departamento,
            edad: parseInt(edad),
            hora
        });

        // Guardar los datos actualizados en el archivo user.json
        fs.writeFile('user.json', JSON.stringify(usuarios, null, 2), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo JSON:', err);
                res.status(500).send('Error al procesar la solicitud.');
                return;
            }

            res.send('Usuario registrado correctamente.');
        });
    });
});


app.listen(port, () => {
    console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
