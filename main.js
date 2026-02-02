// Simulador de chino de barrio (kiosco):
// 1 El usuario entra y debe elegir entre varios productos con sus respectivos precios.
// 2 El usuario es notificado de que agregó el producto a su carro de compras y se le muestra el total a pagar hasta ahora.
// 3 Se le pregunta al usuario si desea seguir comparndo o finalizar la compra.
// 4 Según lo que elija, el ciclo vuelve a empezar (sumando los precios de los nuevos productos) o se finaliza agradeciendo por la compra.

const productos = [
    { nombre: "Café", precio: 150 },
    { nombre: "Té", precio: 120 },
    { nombre: "Chocolate", precio: 200 }
];

let total = 0;
let seguirComprando = true;

function mostrarProductos() {
    let mensaje = "Productos disponibles:\n";

    for (let i = 0; i < productos.length; i++) {
        mensaje += `${i + 1} - ${productos[i].nombre} ($${productos[i].precio})\n`;
    }

    return mensaje;
}

while (seguirComprando) {
    let eleccion = prompt(mostrarProductos() + "\nIngrese el número del producto:");

    if (eleccion === null) {
    break;
    }

    eleccion = parseInt(eleccion);

    if (eleccion >= 1 && eleccion <= productos.length) {
        let productoElegido = productos[eleccion - 1];
        total += productoElegido.precio;
        alert(`Agregaste ${productoElegido.nombre}. Total actual: $${total}`);
        console.log("Producto agregado:", productoElegido.nombre);
    } else {
        alert("Opción inválida");
    }

    seguirComprando = confirm("¿Querés agregar otro producto?");
}

alert("Gracias por tu compra");
alert("Total a pagar: $" + total);
console.log("Total final:", total);
