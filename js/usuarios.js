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
    const response = await fetch("https://medsantacruz.ezequiel4722.workers.dev/api/users", {
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
            <td>${user.Name} ${user.FirstSurname}</td>
            <td>${user.Email}</td>
            <td>${user.Password}</td>
            <td>${user.RegistrationDate}</td>
            <td>
                <button class="btn btn-sm btn-primary editar" data-user-id="${user.Id
        }"><i class="fa-solid fa-pencil"></i></button>
                <button class="btn btn-sm btn-danger eliminar" data-user-id="${user.Id
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

const createUser = async () => {
  try {
    const user = {
      Name: document.getElementById("modalAgregarName").value,
      FirstSurname: document.getElementById("modalAgregarFirstSurname").value,
      LastSurname: document.getElementById("modalAgregarLastSurname").value,
      Email: document.getElementById("modalAgregarEmail").value,
      Password: document.getElementById("modalAgregarPassword").value,
      RegistrationDate: document.getElementById("modalAgregarRegistrationDate").value,
    };

    const response = await fetch("https://medsantacruz.ezequiel4722.workers.dev/api/users/create", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });

    const result = await response.json();

    if (result) {
      alert("Usuario creado exitosamente");
      $("#modalAgregar").modal("hide");
      await initDataTable();
    } else {
      alert("Error al crear el usuario");
    }
  } catch (error) {
    console.error("Error al crear el usuario:", error);
  }
};

const updateUser = async () => {
  try {
    const user = {
      Id: document.getElementById("modalEditarId").value,
      Name: document.getElementById("modalEditarName").value,
      FirstSurname: document.getElementById("modalEditarFirstSurname").value,
      LastSurname: document.getElementById("modalEditarLastSurname").value,
      Email: document.getElementById("modalEditarEmail").value,
      Password: document.getElementById("modalEditarPassword").value,
      RegistrationDate: document.getElementById("modalEditarRegistrationDate").value,
    };

    const response = await fetch("https://medsantacruz.ezequiel4722.workers.dev/api/users/update", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });

    const result = await response.json();

    if (result) {
      alert("Usuario actualizado exitosamente");
      $("#modalEditar").modal("hide");
      await initDataTable();
    } else {
      alert("Error al actualizar el usuario");
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
  }
};


const deleteUser = async () => {
  try {
    const Id = document.getElementById("modalEliminarId").value;

    const response = await fetch("https://medsantacruz.ezequiel4722.workers.dev/api/users/delete", {
      method: "POST",
      body: JSON.stringify({ Id }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });

    const result = await response.json();

    if (result) {
      alert("Usuario eliminado exitosamente");
      document.getElementById("modalEliminarId").value = "";
      $("#modalEliminar").modal("hide");
      await initDataTable();
    } else {
      alert("Error al eliminar el usuario");
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
  }
};

const handleEditarButtonClick = async (event) => {
  const userId = event.target.dataset.userId;
  console.log(event.target.dataset.userId);

  const response = await fetch(`https://medsantacruz.ezequiel4722.workers.dev/api/users/${userId}`, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });

  const user = await response.json();

  console.log(user);

  document.getElementById("modalEditarId").value = user.Id;
  document.getElementById("modalEditarName").value = user.Name;
  document.getElementById("modalEditarFirstSurname").value = user.FirstSurname;
  document.getElementById("modalEditarLastSurname").value = user.LastSurname;
  document.getElementById("modalEditarEmail").value = user.Email;
  document.getElementById("modalEditarPassword").value = user.Password;
  document.getElementById("modalEditarRegistrationDate").value = user.RegistrationDate;


  $("#modalEditar").modal("show");
};

const handleEliminarButtonClick = (event) => {
  $("#modalEliminar").modal("show");
  const userIdField = document.getElementById("modalEliminarId");
  userIdField.value = event.target.dataset.userId;
};

window.addEventListener("load", async () => {
  await initDataTable();
});
