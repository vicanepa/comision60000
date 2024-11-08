const btn_cp = document.querySelector('#cp');
btn_cp.addEventListener('click', () => {
    const cp = prompt('Agregar  CP');

    btn_cp.textContent = 'CP: ' + cp;
})



const agregarAlCarrito = document.querySelectorAll('.agregarAlCarrito');
console.log(agregarAlCarrito);

agregarAlCarrito.forEach(button => {
    button.addEventListener('click', () => {

        const productoCard = button.closest('article'); // uso closest para obtener el contenedor del producto
        const nombreProducto = productoCard.querySelector('h2').textContent;
        const precioProducto = productoCard.querySelector('.price').textContent;


        const precio = parseFloat(precioProducto.replace(/[^\d.-]/g, '')); // Limpiamos el símbolo de moneda y los puntos

        if (isNaN(precio)) {
            console.log('El precio del producto no es válido');
            return;
        }

        const datosDelProducto = {
            nombre: nombreProducto,
            precio: precio
        };

        agregarProducto(datosDelProducto);
    });
});

function agregarProducto(datosDelProducto) {

    let carrito = obtenerCarroDesdeAlmacenamiento();


    carrito.push(datosDelProducto);


    guardarCarritoEnAlmacenamiento(carrito);

    actualizarVisualizacionCarrito();
}

function obtenerCarroDesdeAlmacenamiento() {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
}

function guardarCarritoEnAlmacenamiento(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarVisualizacionCarrito() {
    const carritoContador = document.getElementById('carritoContador');

    const cantidadProductos = obtenerCarroDesdeAlmacenamiento().length;

    console.log('Cantidad de productos en el carrito:', cantidadProductos);

    carritoContador.textContent = cantidadProductos;
}

actualizarVisualizacionCarrito();






