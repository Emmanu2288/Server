const express = require('express');
const app = express();
const PORT = 3000;

const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON que actúa como base de datos
const productsPath = path.join(__dirname, 'products.json');

// Funciones para leer y escribir en el archivo JSON
function readProducts() {
    const data = fs.readFileSync(productsPath, 'utf-8');
    return JSON.parse(data);
}

function writeProducts(products) {
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
}


// Middleware para fortmato JSON
app.use(express.json());

// Enrutadores
app.get('/', (req, res) => {
    res.status(200).json('¡Hola, mundo! Servidor Express funcionando correctamente.');
});

// Obtener todos los productos
app.get('/products', (req, res) => {
    const products = readProducts();
    res.status(200).json({ title: "Productos", products });
});

// Obtener un producto por id
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const products = readProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

//POST - Agregar un nuevo producto
app.post('/products', (req, res) => {
    const products = readProducts();
    const newProduct = req.body;
    if (!newProduct.name || !newProduct.price) {
        return res.status(400).json({ error: "Faltan campos obligatorios (name, price)" });
    }

    newProduct.id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push(newProduct);
    writeProducts(products);

    res.status(201).json({ message: "Producto agregado", product: newProduct });
});

//PUT - Actualizar un producto existente
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const {name, price} = req.body;
    const products = readProducts();
    const product = products.find(p => p.id === productId);

    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    if (!name && !price) return res.status(400).json({ error: "No se enviaron datos para actualizar" });

    product.name = name || product.name;
    product.price = price || product.price;

    writeProducts(products);
    res.status(200).json({ message: "Producto actualizado", product: product });
});

//DELETE - Eliminar un producto existente
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const products = readProducts();
    const product = products.find(p => p.id === productId);

    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    
    const updatedProducts = products.filter(p => p.id !== productId);
    writeProducts(updatedProducts);
    
    res.status(200).json({ message: "Producto eliminado", deleted: product });

});

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto http://localhost:${PORT}`);
});


