
function Producto(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.calcularTotal = function() {
        return this.precio * this.stock;
    };
}

let inventario = [];

const nombreInput = document.getElementById("nombre");
const precioInput = document.getElementById("precio");
const stockInput = document.getElementById("stock");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("lista");
const totalSpan = document.getElementById("total");
const mensaje = document.getElementById("mensaje");

btnAgregar.addEventListener("click", agregarProducto);

function agregarProducto() {
    try {
        const nombre = nombreInput.value.trim();
        const precio = parseFloat(precioInput.value);
        const stock = parseInt(stockInput.value);

        if (!nombre || isNaN(precio) || isNaN(stock)) {
            throw new Error("Datos inválidos");
        }

        const nuevoProducto = new Producto(
            Date.now(),
            nombre,
            precio,
            stock
        );

        inventario.push(nuevoProducto);

        guardarStorage();
        renderizar();
        limpiarInputs();

        mostrarMensaje("Producto agregado correctamente");

    } catch (error) {
        mostrarMensaje(error.message);
    }
}

function renderizar() {
    const tabla = document.getElementById("tablaProductos");
    tabla.innerHTML = "";

    inventario.forEach(producto => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.stock}</td>
            <td>$${producto.calcularTotal()}</td>
            <td>
                <button onclick="eliminarProducto(${producto.id})">
                    Eliminar
                </button>
            </td>
        `;

        tabla.appendChild(fila);
    });

    calcularTotal();
}

function calcularTotal() {
    const total = inventario.reduce((acumulador, producto) => {
        return acumulador + producto.calcularTotal();
    }, 0);

    totalSpan.textContent = total;
}

function eliminarProducto(id) {
    inventario = inventario.filter(producto => producto.id !== id);
    guardarStorage();
    renderizar();
}


function guardarStorage() {
    localStorage.setItem("inventario", JSON.stringify(inventario));
}

function cargarStorage() {
    const datos = localStorage.getItem("inventario");

    if (datos) {
        const arrayParseado = JSON.parse(datos);

        inventario = arrayParseado.map(prod => 
            new Producto(prod.id, prod.nombre, prod.precio, prod.stock)
        );
    }
}


function limpiarInputs() {
    nombreInput.value = "";
    precioInput.value = "";
    stockInput.value = "";
}

function mostrarMensaje(texto) {
    mensaje.textContent = texto;

    setTimeout(() => {
        mensaje.textContent = "";
    }, 2000); // asincronismo básico
}


cargarStorage();
renderizar();