window.addEventListener("load", async () => {
  await initDataTable();
});

/**------------ESTA PARTA VA A HACER PARA LAS FUNCIONES DEL PRODUCTOS DE VENTA --------------------- */

let dataTable;
let dataTableRenta;
let dataTableIsInitialized = false;

const dataTableOptions = {
  //scrollX: "2000px",
  lengthMenu: [5, 10, 15, 20, 100, 200, 500],
  columnDefs: [
    { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
    { orderable: false, targets: [6, 7, 8] },
    { searchable: false, targets: [1] },
    //{ width: "50%", targets: [0] }
  ],
  pageLength: 5,
  destroy: true,
  language: {
    lengthMenu: "Mostrar _MENU_ registros por página",
    zeroRecords: "Ningún Producto de Venta Encontrado",
    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
    infoEmpty: "Ningún Producto de Venta Encontrado",
    infoFiltered: "(filtrados desde _MAX_ registros totales)",
    search: "Buscar:",
    loadingRecords: "Cargando...",
    paginate: {
      first: "Primero",
      last: "Último",
      next: "Siguiente",
      previous: "Anterior",
    },
  },
};

const initDataTable = async () => {
  if (dataTableIsInitialized) {
    dataTable.destroy();
  }

  dataTable = $("#datatable_ventas").DataTable(dataTableOptions);
  tablaRenta = $("#datatable_renta").DataTable(dataTableOptions);
  await listUsers();
  await listRenta();

  dataTable = $("#datatable_ventas").DataTable(dataTableOptions);
  dataTableRenta = $("#datatable_renta").DataTable(dataTableOptions);

  dataTableIsInitialized = true;
};

function abiriAgregarModal() {
  // Abrir el modal
  $("#agregarModal").modal("show");
}

const listUsers = async () => {
  try {
    const response = await fetch("https://medsantacruz.ezequiel4722.workers.dev/api/products/Venta", {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    const users = await response.json();

    let content = ``;
    users.forEach((user, index) => {
      content += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.Name}</td>
            <td>${new Intl.NumberFormat('es-MX', { style: 'currency', currency: "MXN" }).format(user.Price)}</td>
            <td>${user.Stock}</td>
            <td><i class="fa-solid fa-check" style="color: green;"></i></td>
            <td>  
              <button class="btn btn-sm btn-primary editar" data-user-id="${user.id
        }"><i class="fa-solid fa-pencil"></i></button>
              
                <button class="btn btn-sm btn-danger eliminar" data-user-id="${user.id
        }"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>`;
    });
    tableBody_ventas.innerHTML = content;

    // Agregar eventos click a los botones "editar" y "eliminar"
    document
      .getElementById("botonAñadir")
      .addEventListener("click", showAgregarModal);
    const editarButtons = document.querySelectorAll(".editar");
    const eliminarButtons = document.querySelectorAll(".eliminar");

    editarButtons.forEach((button) => {
      button.addEventListener("click", handleEditarButtonClick);
    });

    eliminarButtons.forEach((button) => {
      button.addEventListener("click", handleEliminarButtonClick);
    });
  } catch (ex) {
    alert(ex);
  }
};

const listRenta = async () => {
  try {
    const response = await fetch("https://medsantacruz.ezequiel4722.workers.dev/api/products/Renta", {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    const users = await response.json();

    let content = ``;
    users.forEach((user, index) => {
      content += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.Name}</td>
            <td>${new Intl.NumberFormat('es-MX', { style: 'currency', currency: "MXN" }).format(user.Price)}</td>
            <td>${user.Stock}</td>
            <td><i class="fa-solid fa-check" style="color: green;"></i></td>
            <td>  
              <button class="btn btn-sm btn-primary editar" data-user-id="${user.id
        }"><i class="fa-solid fa-pencil"></i></button>
              
                <button class="btn btn-sm btn-danger eliminar" data-user-id="${user.id
        }"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>`;
    });
    tableBody_renta.innerHTML = content;

    // Agregar eventos click a los botones "editar" y "eliminar"
    document
      .getElementById("botonAñadir")
      .addEventListener("click", showAgregarModal);
    const editarButtons = document.querySelectorAll(".editar");
    const eliminarButtons = document.querySelectorAll(".eliminar");

    editarButtons.forEach((button) => {
      button.addEventListener("click", handleEditarButtonClick);
    });

    eliminarButtons.forEach((button) => {
      button.addEventListener("click", handleEliminarButtonClick);
    });
  } catch (ex) {
    alert(ex);
  }
};

const getUserById = async (userId) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    return null;
  }
};

async function openModalEditar(button) {
  const productId = button.getAttribute("data-id");

  // Abrir el modal
  $("#modalEditar").modal("show");
}

function openModalEliminar(button) {
  $("#modalEliminar").modal("show");
}
