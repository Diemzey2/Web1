$(document).ready(function() {
  function obtenerDetallesProducto(id) {
    $.ajax({
      url: `https://diskdealer.cesargonzalez38.repl.co/products/${id}`,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        $('#title').val(data.product_name);
        $('#category').val(data.category);
        $('#price').val(data.price);
        $('#description').val(data.description);
        $('#image').val(data.image_url);
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

  // Enviar formulario
  $('#editarProducto').submit(function(e) {
    e.preventDefault();

    var data = {
      'product_name': $('#title').val(),
      'category': $('#category').val(),
      'price': $('#price').val(),
      'description': $('#description').val(),
      'image_url': $('#image').val()
    };

    $.ajax({
      url: `https://diskdealer.cesargonzalez38.repl.co/products/${id}`,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      success: function(data) {
        alert('Producto actualizado exitosamente!');
      },
      error: function() {
        alert("Error al actualizar el producto");
      }
    });
  });

  // Eliminar producto
  $('#eliminarProducto').click(function(e) {
    e.preventDefault();

    // Confirmar la eliminación
    var confirmar = confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (confirmar) {
      $.ajax({
        url: `https://diskdealer.cesargonzalez38.repl.co/products/${id}`,
        type: 'DELETE',
        dataType: 'json',
        success: function(data) {
          alert('Producto eliminado exitosamente!');
          window.location.href = "index.html";
        },
        error: function() {
          alert("Error al eliminar el producto");
        }
      });
    }
  });
});
