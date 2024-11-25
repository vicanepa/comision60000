/* =====================================
=          funcion para cp             =
===================================== */
const btn_cp = document.querySelector('#cp');
btn_cp.addEventListener('click', () => {
    const cp = prompt('Agregar  CP');

    btn_cp.textContent = 'CP: ' + cp;
})


/* =====================================
= funcionamiento del carrito y el local  =
===================================== */

const btnCarrito = document.querySelector('.carrito-compras');
const contenedorProductosCarrito = document.querySelector('.ventana-carrito');

btnCarrito.addEventListener('click', () => {
    contenedorProductosCarrito.classList.toggle('carrito-oculto');
});

/* ========================= */


const infoCarrito = document.querySelector('.producto');
const productoEnCarro = document.querySelector('.producto-en-carrito');

const listaDeProductos = document.querySelector('.container-cards');

let todosLosProductos = obtenerCarroDesdeAlmacenamiento(); // Cambiado a let para poder modificarlo

const valorTotal = document.querySelector('.total-pagar');

const contadorProductos = document.querySelector('#carritoContador');

const carroVacio = document.querySelector('.carro-vacio');
const totalCarrito = document.querySelector('.total-carrito');


listaDeProductos.addEventListener('click', e => {
    if (e.target.classList.contains('agregarAlCarrito')) {
        const producto = e.target.parentElement;

        const infoProducto = {
            quantify: 1,
            titulo: producto.querySelector('h2').textContent,
            precio: producto.querySelector('.price').textContent,
        };

        const exists = todosLosProductos.some(
            prod => prod.titulo === infoProducto.titulo
        );

        if (exists) {
            todosLosProductos = todosLosProductos.map(prod => {
                if (prod.titulo === infoProducto.titulo) {
                    prod.quantify++;
                    return prod;
                } else {
                    return prod;
                }
            });
        } else {
            todosLosProductos.push(infoProducto); // Agregar al array
        }

        guardarCarritoEnAlmacenamiento(todosLosProductos);
        mostrarHTML();
    }
});

productoEnCarro.addEventListener('click', e => {
    if (e.target.classList.contains('icono-cerrado')) {
        const producto = e.target.parentElement;
        const titulo = producto.querySelector('p').textContent;

        todosLosProductos = todosLosProductos.filter(
            prod => prod.titulo !== titulo
        );

        guardarCarritoEnAlmacenamiento(todosLosProductos);
        mostrarHTML();
    }
});

function obtenerCarroDesdeAlmacenamiento() {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
}

function guardarCarritoEnAlmacenamiento(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para mostrar el HTML
const mostrarHTML = () => {
    if (!todosLosProductos.length) {
        carroVacio.style.display = 'block';
        productoEnCarro.classList.add('oculto');
        totalCarrito.classList.add('oculto');
    } else {
        carroVacio.style.display = 'none';
        productoEnCarro.classList.remove('oculto');
        totalCarrito.classList.remove('oculto');
    }

    // Limpio el HTML
    productoEnCarro.innerHTML = '';

    let total = 0;
    let totalDeProductos = 0;

    todosLosProductos.forEach(producto => {
        const contenedorProducto = document.createElement('div');
        contenedorProducto.classList.add('producto');

        contenedorProducto.innerHTML = `
            <div class="info-producto">
                <span class="cantidad-producto-carrito">${producto.quantify}</span>
                <p class="titulo-producto-carrito">${producto.titulo}</p>
                <span class="precio-producto-carrito">${producto.precio}</span>
            </div>
            <i class="fa-solid fa-x icono-cerrado"></i>
        `;

        productoEnCarro.append(contenedorProducto); // Añadir el contenedor del producto


        const precioNumerico = parseFloat(producto.precio.replace('$', ''));
        total += producto.quantify * precioNumerico;
        totalDeProductos += producto.quantify;
    });

    valorTotal.innerText = `$${total.toFixed(2)}`; // Formatear el total a dos decimales
    contadorProductos.innerText = totalDeProductos;
};


/* =====================================
=              Toastify              =
===================================== */

const showToastBtn = document.getElementById("agregar");

showToastBtn.addEventListener("click", () => {

    Toastify({
        text: "¡Producto agregado con éxito!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        avatar: "https://images.vexels.com/content/157931/preview/curved-check-mark-circle-icon-b1fec1.png", // URL del ícono
    }).showToast();
});

/* =====================================
=               FETCH                =
===================================== */



