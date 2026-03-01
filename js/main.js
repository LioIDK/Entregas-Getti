document.addEventListener("DOMContentLoaded", function(){

    let inventario = JSON.parse(localStorage.getItem("inventario")) || [];

    const nombreInput = document.getElementById("nombre");
    const precioInput = document.getElementById("precio");
    const stockInput = document.getElementById("stock");
    const btnAgregar = document.getElementById("btnAgregar");
    const tabla = document.getElementById("tablaProductos");
    const totalSpan = document.getElementById("totalInventario");

    btnAgregar.addEventListener("click", agregarProducto);

    function agregarProducto() {
        const nombre = nombreInput.value.trim();
        const precio = parseFloat(precioInput.value);
        const stock = parseInt(stockInput.value);

        if (!nombre || isNaN(precio) || isNaN(stock)) return;

        const producto = {
            id: Date.now(),
            nombre,
            precio,
            stock
        };

        inventario.push(producto);
        localStorage.setItem("inventario", JSON.stringify(inventario));

        renderizar();
        limpiarInputs();
    }

    function renderizar() {
        tabla.innerHTML = "";
        let totalInventario = 0;

        inventario.forEach(producto => {
            const fila = document.createElement("tr");
            const totalProducto = producto.precio * producto.stock;
            totalInventario += totalProducto;

            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>$${totalProducto}</td>
                <td><button onclick="eliminarProducto(${producto.id})">Eliminar</button></td>
            `;

            tabla.appendChild(fila);
        });

        totalSpan.textContent = totalInventario;
    }

    window.eliminarProducto = function(id) {
        inventario = inventario.filter(prod => prod.id !== id);
        localStorage.setItem("inventario", JSON.stringify(inventario));
        renderizar();
    }

    function limpiarInputs() {
        nombreInput.value = "";
        precioInput.value = "";
        stockInput.value = "";
    }

    renderizar();
});