let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
  //scrollX: "2000px",
  lengthMenu: [5, 10, 15, 20, 100, 200, 500],
  columnDefs: [
    { className: "centered", targets: [0, 1, 2, 3, 4, 5] },
    { orderable: false, targets: [4 ,5] },
    { searchable: false, targets: [1] }
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
      previous: "Anterior"
    }
  }
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
            <!-- Button trigger modal EDITAR -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEditar"><i class="fa-solid fa-pencil"></i>
            </button>

            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalEliminar"><i class="fa-solid fa-trash-can"></i>
            </button>
            
            <!-- Modal EDITAR-->
            <div class="modal fade" id="modalEditar" tabindex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalEditarLabel">Editar Catalogo</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                  <form>

                    <div class="mb-3">
                    <label for="formGroupExampleInput" class="form-label">Name</label>
                    <input type="text" class="form-control" id="formGroupExampleInput">
                  </div>
                  <div class="mb-3">
                    <label for="formGroupExampleInput2" class="form-label">Model</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2">
                  </div>
                  <div class="mb-3">
                    <label for="formGroupExampleInput2" class="form-label">Brand</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2">
                  </div>
                  <div class="mb-3">
                    <label for="formGroupExampleInput2" class="form-label">Description</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2">
                  </div>
                  <div class="mb-3">
                    <label for="formGroupExampleInput2" class="form-label">ImgPath</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2">
                  </div>
                  <div class="mb-3">
                    <label for="formGroupExampleInput2" class="form-label">Stock</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2">
                  </div>
                  <div class="mb-3">
                    <label for="formGroupExampleInput2" class="form-label">Price</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2">
                  </div>
                  <div class="mb-3">
                    <label for="formGroupExampleInput2" class="form-label">DisconutPct</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2">
                  </div>
                  <div class="mb-3">
                    <label for="formGroupExampleInput2" class="form-label">Featured</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2">
                  </div>
                  

                </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary">Guardar Cambios</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal ELIMINAR-->
            <div class="modal fade" id="modalEliminar" tabindex="-1" aria-labelledby="modalEliminarLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalEliminarLabel">Eliminar Catalogo</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    Seguro que quieres eliminar esta categoria?
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-danger">Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
            
            </td>
        </tr>`;
    });
    tableBody_users.innerHTML = content;

    // Agregar eventos click a los botones "editar" y "eliminar"
    document.getElementById("botonAñadir").addEventListener("click", showAgregarModal);
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
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    return null;
  }
};

const showAgregarModal = () => {
  $('#agregarModal').modal('show');
};

const handleAgregarButtonClick = (event) => {
  // Aquí puedes agregar la lógica para manejar el evento click del botón "Agregar"
  showAgregarModal();
  console.log("Botón Agregar clickeado");
};

const handleEditarButtonClick = (event) => {
  const userId = event.target.dataset.userId;
  // Lógica para editar el usuario con el ID especificado
  console.log("Editar usuario con ID:", userId);
};


const handleEliminarButtonClick = (event) => {
  const userId = event.target.dataset.userId;
  // Lógica para eliminar el usuario con el ID especificado
  console.log("Eliminar usuario con ID:", userId);
};

window.addEventListener("load", async () => {
  await initDataTable();
});