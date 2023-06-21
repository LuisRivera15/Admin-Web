let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
  //scrollX: "2000px",
  lengthMenu: [5, 10, 15, 20, 100, 200, 500],
  columnDefs: [
    { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
    { orderable: false, targets: [5, 6] },
    { searchable: false, targets: [1] },
    //{ width: "50%", targets: [0] }
  ],
  pageLength: 5,
  destroy: true,
  language: {
    lengthMenu: "Mostrar _MENU_ registros por página",
    zeroRecords: "Ningún usuario encontrado",
    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
    infoEmpty: "Ningún usuario encontrado",
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

  await listUsers();

  dataTable = $("#datatable_users").DataTable(dataTableOptions);

  dataTableIsInitialized = true;
};

const listUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    let content = ``;
    users.forEach((user, index) => {
      content += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.address.city}</td>
            <td>${user.company.name}</td>
            <td><i class="fa-solid fa-check" style="color: green;"></i></td>
            <td>
                <button class="btn btn-sm btn-primary editar" data-user-id="${
                  user.id
                }"><i class="fa-solid fa-pencil"></i></button>
                <button class="btn btn-sm btn-danger eliminar" data-user-id="${
                  user.id
                }"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>`;
    });
    tableBody_users.innerHTML = content;

    // Agregar eventos click a los botones "editar" y "eliminar"
    document
      .getElementById("botonAñadir")
      .addEventListener("click", handleAgregarButtonClick);
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

const handleAgregarButtonClick = (event) => {
  $("#modalAgregar").modal("show");
};

const handleEditarButtonClick = (event) => {
  $("#modalEditar").modal("show");
};

const handleEliminarButtonClick = (event) => {
  $("#modalEliminar").modal("show");
};

window.addEventListener("load", async () => {
  await initDataTable();
});
