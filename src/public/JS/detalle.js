$(document).ready(function() {
  function obtenerDetallesProducto(id) {
    $.ajax({
      url: `https://diskdealer.cesargonzalez38.repl.co/products/${id}`,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        var detallesProducto = $("#detallesProducto");
        detallesProducto.empty();

        var detallesHTML = `
          <h2>${data.product_name}</h2>
          <p><strong>Categoría:</strong> ${data.category}</p>
          <p><strong>Precio:</strong> $${data.price}</p>
          <p><strong>Descripción:</strong> ${data.description}</p>
          <img src="${data.image_url}" alt="${data.product_name}" />
        `;

        detallesProducto.html(detallesHTML);
      },
      error: function() {
        alert("Error al cargar los detalles del producto");
      }
    });
  }

  // Obtener el ID del producto de la URL
  var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");

  if (id) {
    obtenerDetallesProducto(id);
  } else {
    alert("ID del producto no proporcionado");
    window.location.href = "index.html";
  }
});
