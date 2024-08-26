const express = require('express');
const app = express();

app.use(express.json()); // Para poder manejar JSON en las peticiones

let productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 40 }
];

// Obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Agregar un nuevo producto (POST)
app.post('/productos', (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Actualizar un producto (PUT)
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    producto.nombre = req.body.nombre || producto.nombre;
    producto.precio = req.body.precio || producto.precio;

    res.json(producto);
});

// Eliminar un producto (DELETE)
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    productos = productos.filter(p => p.id !== id);
    res.status(204).send();
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
