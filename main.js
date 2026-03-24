let productos = [];

// Cargar datos
async function cargarDatos() {
    try {
        const res = await fetch("productos.json");

        if (!res.ok) throw new Error("No se encontró el JSON");

        const data = await res.json();

        const guardados = JSON.parse(localStorage.getItem("productos"));

        if (Array.isArray(guardados) && guardados.length > 0) {
        productos = guardados;
        } else {
        productos = data;
        }

    } catch (error) {
        console.warn("Error cargando datos, usando fallback");

        productos = [
        { id: 1, nombre: "Teclado", precio: 20, cantidad: 5, categoria: "Periféricos" },
        { id: 2, nombre: "Mouse", precio: 10, cantidad: 2, categoria: "Periféricos" }
        ];
    }

    renderProductos();
}  

// Guardar
function guardar() {
    localStorage.setItem("productos", JSON.stringify(productos));
    }

// Alertas lindas
function mostrarMensaje(texto, tipo = "success") {
    Swal.fire({
        text: texto,
        icon: tipo,
        timer: 1500,
        showConfirmButton: false
    });
}

// Agregar producto
function agregarProducto() {

    if (!Array.isArray(productos)) {
        productos = [];
    }

    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const categoria = document.getElementById("categoria").value;

    if (!nombre || isNaN(precio) || isNaN(cantidad)) {
        mostrarMensaje("Completa los campos correctamente", "error");
        return;
    }

    productos.push({
        id: Date.now(),
        nombre,
        precio,
        cantidad,
        categoria
    });

    guardar();
    renderProductos();
    mostrarMensaje("Producto agregado");
}

// Eliminar producto
function eliminarProducto(id) {
    productos = productos.filter(p => p.id !== id);
    guardar();
    renderProductos();
    mostrarMensaje("Producto eliminado", "info");
}

// Cambiar stock
function cambiarStock(id, cambio) {
    const p = productos.find(p => p.id === id);

    if (!p) return;

    if (p.cantidad + cambio < 0) {
        mostrarMensaje("Stock insuficiente", "error");
        return;
    }

    p.cantidad += cambio;
    guardar();
    renderProductos();
}

// Calcular total
function calcularTotal() {
    const total = productos.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
    document.getElementById("total").textContent = total.toFixed(2);
}

// Render
function renderProductos() {
    const lista = document.getElementById("lista");
    const filtro = document.getElementById("busqueda").value.toLowerCase();

    lista.innerHTML = "";

    productos
        .filter(p => p.nombre.toLowerCase().includes(filtro))
        .forEach(p => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <strong>${p.nombre}</strong> (${p.categoria})<br>
            Precio: $${p.precio}<br>
            Stock: <span class="${p.cantidad <= 3 ? 'low' : ''}">${p.cantidad}</span><br>
            <button onclick="cambiarStock(${p.id}, 1)">+1</button>
            <button onclick="cambiarStock(${p.id}, -1)">-1</button>
            <button onclick="eliminarProducto(${p.id})">Eliminar</button>
        `;

        lista.appendChild(div);
        });

    calcularTotal();
}

// Eventos
    document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnAgregar").addEventListener("click", agregarProducto);
    document.getElementById("busqueda").addEventListener("input", renderProductos);

    cargarDatos();
});

document.getElementById("resetBtn").addEventListener("click", () => {
    localStorage.clear();
    mostrarMensaje("Inventario reiniciado", "info");
    cargarDatos();
});