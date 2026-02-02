const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para fortmato JSON
app.use(express.json());

// Base de datos simulada
let products = [
    { id: 1, name: 'Camiseta', price: 20000 },
    { id: 2, name: 'Pantalón', price: 35000 },
    { id: 3, name: 'Zapatos', price: 50000 },
    { id: 4, name: 'Campera', price: 80000 },
    { id: 5, name: 'Gorra', price: 15000 },
    { id: 6, name: 'Bufanda', price: 12000 },
    { id: 7, name: 'Guantes', price: 10000 },
    { id: 8, name: 'Medias', price: 8000 },
    { id: 9, name: 'Cinturón', price: 25000 },
    { id: 10, name: 'Reloj', price: 90000 },
    { id: 11, name: 'Mochila', price: 60000 },
    { id: 12, name: 'Gafas de sol', price: 40000 },
];

// Enrutadores
app.get('/', (req, res) => {
    res.status(200).json('¡Hola, mundo! Servidor Express funcionando correctamente.');
});

// Obtener todos los productos
app.get('/products', (req, res) => {
    res.status(200).json({ title: "Productos", products: products });
});

// Obtener un producto por id
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto http://localhost:${PORT}`);
});


