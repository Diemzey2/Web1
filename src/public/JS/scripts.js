$(document).ready(function() {
  function actualizarTabla() {
    const token = localStorage.getItem("token");
    $.ajax({
      url: 'https://diskdealer.cesargonzalez38.repl.co/products',
      type: 'GET',
      dataType: 'json',
      timeout: 5000,
      success: function(data) {
        var tbody = $("#miTabla tbody");
        tbody.empty();
  
        data.forEach(item => {
          var precioEnDolares = (item.price / 18).toFixed(2);
          var row = `
            <tr>
              <td><img src="${item.image_url}" alt="${item.product_name}"></td>
              <td class="title-link" data-id="${item._id}">${item.product_name}</td>
              <td>${item.category}</td>
              <td>${item.price}</td>
              <td>${precioEnDolares}</td>
              ${token ? `<td><button class="btnEditar" data-id="${item._id}">Editar</button></td>` : ''}
              ${token ? `<td><button class="btnConsultar" data-id="${item._id}">Consultar</button></td>` : ''}
            </tr>
          `;
          tbody.append(row);
        });
      },
      error: function() {
        alert("Error de conexión");
      }
    });
  }

  
  function abrirPaginaDetalle(id) {
    window.open(`/HTML/detalle.html?id=${id}`, "_blank");
  }

  function abrirPaginaBorrar(id, title) {
    window.open(`/HTML/borrar.html?id=${id}&title=${title}`, "_blank");
  }

  function abrirPaginaActualizar(id) {
    window.open(`/HTML/actualizar.html?id=${id}`, "_blank");
  }

  actualizarTabla();

  $("#actualizar").click(actualizarTabla);

  $("#miTabla").on("click", ".title-link, .btnConsultar", function() {
    var id = $(this).data("id");
    abrirPaginaDetalle(id);
  });

  $("#miTabla").on("click", ".btnBorrar", function() {
    var id = $(this).data("id");
    var title = $(this).parent().siblings('.title-link').text();
    abrirPaginaBorrar(id, title);
  });

  $("#miTabla").on("click", ".btnEditar", function() {
    var id = $(this).data("id");
    abrirPaginaActualizar(id);
  });

  $("#loginForm").on("submit", function (event) {
    event.preventDefault();

    const username = $("#username").val();
    const password = $("#password").val();

    if (username === "" || password === "") {
      $("#loginMessage")
        .text("Por favor ingresa un usuario y contraseña")
        .css("color", "red")
        .show();
      return;
    }

    loginUser(username, password);
  });

$("#crearProductoForm").on("submit", function (event) {
    event.preventDefault();

    const nombre = $("#nombre").val();
    const categoria = $("#categoria").val();
    const precio = $("#precio").val();
    const descripcion = $("#descripcion").val();
    const imagen = $("#imagen").val();

    if (nombre === "" || categoria === "" || precio === "" || descripcion === "" || imagen === "") {
      alert("Por favor llena todos los campos.");
      return;
    }

    const producto = {
      product_name: nombre,
      category: categoria,
      price: precio,
      description: descripcion,
      image_url: imagen
    };

    $.ajax({
      url: "https://diskdealer.cesargonzalez38.repl.co/products",
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(producto),
      dataType: 'json',
      success: function(data) {
        alert('Producto creado exitosamente!');
        window.location.href = "/";
      },
      error: function() {
        alert("Error al crear el producto");
      }
    });
  });

  const token = localStorage.getItem("token");
  if (token) {
    fetchUser();
  }
});

function loginUser(username, password) {
  fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error al iniciar sesión");
      }
    })
    .then((json) => {
      console.log(json);
      localStorage.setItem("token", json.token);
      window.location.href = "/"; 
    })
    .catch((error) => {
      $("#loginMessage")
        .text("Error al iniciar sesión. Verifica tus credenciales.")
        .css("color", "red")
        .show();
    });
}

function fetchUser() {
  fetch("https://fakestoreapi.com/users/1")
    .then((res) => res.json())
    .then((json) => {
      updateUserUI(json);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateUserUI(user) {
  const loginDiv = $(".login");
  loginDiv.empty();
  const userNameDiv = $(`<div>Bienvenido, ${user.name.firstname} ${user.name.lastname}</div>`);
  const logoutButton = $(`<button id="btnLogout">Cerrar sesión</button>`);
  const editButton = $(`<button id="btnEdit">Editar</button>`);
  $("#crearProducto").show();

  logoutButton.on("click", function () {
    localStorage.removeItem("token");
    location.reload();
  });

  editButton.on("click", function () {
    window.location.href = "/edit-profile.html";
  });

  loginDiv.append(userNameDiv, logoutButton, editButton);

  $("#crearProducto").show();

  actualizarTabla();
}

