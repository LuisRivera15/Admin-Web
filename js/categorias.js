let dataTable;
let dataTableIsInitialized = false;
const firebaseConfig = {
  apiKey: "AIzaSyBBQRXbjVwYJK61XxlcQQqR2FUviHx-3zI",
  authDomain: "proyecto-escuela-379119.firebaseapp.com",
  databaseURL: "https://proyecto-escuela-379119-default-rtdb.firebaseio.com",
  projectId: "proyecto-escuela-379119",
  storageBucket: "proyecto-escuela-379119.appspot.com",
  messagingSenderId: "583336265352",
  appId: "1:583336265352:web:95d3ea79a5891fa325c13d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Referencia al Firebase Storage
var storage = firebase.storage();
window.addEventListener("load", async () => {
  await initDataTable();
});

const dataTableOptions = {
  //scrollX: "2000px",
  lengthMenu: [5, 10, 15, 20, 100, 200, 500],
  columnDefs: [
    { className: "centered", targets: [0, 1, 2, 3, 4, 5] },
    { className: "centered", targets: [5] },
    { orderable: false, targets: [4, 5] },
    { searchable: false, targets: [1] },
    //{ width: "50%", targets: [0] }
  ],
  pageLength: 5,
  destroy: true,
  language: {
    lengthMenu: "Mostrar _MENU_ registros por página",
    zeroRecords: "Ningún categoria encontrado",
    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
    infoEmpty: "Ningún categoria encontrado",
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
    const body = {
      catalogueId: "580739e4-051d-11ee-86d1-0a002700000a",
    };

    const response = await fetch(
      "http://api.medicalsantacruz.com/categories/all",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      }
    );
    const categorias = await response.json();
    console.log(categorias);
    let content = ``;
    categorias.forEach((categoria, index) => {
      content += `
        <tr>
            <td>${index + 1}</td>
            <td>${categoria.parentId}</td>
            <td>${categoria.label}</td>
            <td><img src= "${
              categoria.imgPath
            }"    style=" height: 200px;"></img></td>
            <td><button type="button" class="btn btn-primary" onclick="editarModal(this)"  data-id ="${
              categoria.id
            }"><i class="fa-solid fa-pencil fa-2x"></i>
            </button></td>
            <td  style=" height: 200px;" >
            <button type="button" class="btn btn-danger fa-2x" onclick="eliminarModal(this)" data-id ="${
              categoria.id
            }"><i class="fa-solid fa-trash-can"></i>
            </button>
            </td>
        </tr>`;
    });
    tableBody_users.innerHTML = content;
  } catch (ex) {
    console.log(ex);
    alert(ex);
  }
};

const getCatalogoById = async (userId) => {
  try {
    const cuerpo = {
      catalogueId: "580739e4-051d-11ee-86d1-0a002700000a",
      id: userId,
    };
    const response = await fetch(
      "http://api.medicalsantacruz.com/categories/id",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cuerpo),
      }
    );
    const categoria = await response.json();
    return categoria;
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    return null;
  }
};

const showAgregarModal = () => {
  $("#agregarModal").modal("show");
};

const handleAgregarButtonClick = (event) => {
  showAgregarModal();
  console.log("Botón Agregar clickeado");
};

async function editarModal(boton) {
  const id = boton.dataset.id;
  const categoria = await getCatalogoById(id);
  const elementInsideModal = $("#modalEditar").find("#modalEditarNombre");
  elementInsideModal.val(categoria["label"]);
  const inputId = $("#modalEditar").find("#categoriaId");
  const elementParent = $("#modalEditar").find("#modalEditarParent");
  elementParent.val(categoria["parentId"]);
  inputId.val(categoria["id"]);

  const rutaImg = categoria["imgPath"];
  const inputImagen = $("#modalEditar").find("#imgFirebase");
  inputImagen.attr("src", rutaImg);

  const urlImagen = $("#modalEditar").find("#modalEditarUrl");
  urlImagen.val(categoria["imgPath"]);

  $("#modalEditar").modal("show");
}

async function eliminarModal(boton) {
  const id = boton.dataset.id;
  const categoria = await getCatalogoById(id);
  console.log(categoria);
  const parrafo = document.getElementById("nombreCategoria");

  parrafo.innerText = categoria["label"];

  const inputId = document.getElementById("modalEliminarId");

  inputId.value = categoria["id"];

  $("#modalEliminar").modal("show");
}

/// ----------------- PARA HACER EL CREATE -------------------
$("#agregarFormulario").submit(async function (event) {
  event.preventDefault();

  const nombre = $("#modalAgregarNombre").val();
  const imagenFile = $("#modalAgregarImg")[0].files[0];
  const padre = $("#modalAgregarParent").val();
  let direccionImagen;

  try {
    const storageRef = storage.ref().child("categorias/" + imagenFile.name);
    const snapshot = await storageRef.put(imagenFile);
    console.log("Imagen subida correctamente");
    direccionImagen = await storageRef.getDownloadURL();
    console.log("URL de la imagen:", direccionImagen);
  } catch (error) {
    console.error("Error: ", error);
  }

  const token = JSON.parse(sessionStorage.getItem("token"));
  console.log(token);

  const cuerpo = {
    catalogueId: "580739e4-051d-11ee-86d1-0a002700000a",
    parentId: padre,
    label: nombre,
    imgPath: direccionImagen,
  };
  console.log(cuerpo);
  try {
    const response = await fetch("http://api.medicalsantacruz.com/categories", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(cuerpo),
    });
    const datos = await response.json();
    console.log(datos);
  } catch (error) {
    console.log("Error en la solicitud:", error);
  } finally {
    setTimeout(function () {
      location.reload();
    }, 2000);
  }
});

//--------------------- FUNCION PARA HACER EL UPDATE -----------------
const form = document.getElementById("editarFormulario");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  var datos = await new FormData(form);

  var nombre = datos.get("modalEditarNombre");
  let direccionImagen = datos.get("modalEditarUrl");
  const imagenFile = document.getElementById("modalEditarImg").files[0];
  const parentId = datos.get("modalEditarParent");

  if (imagenFile) {
    const storageRef = storage.ref().child("categoria/" + nombre + ".png");

    try {
      const fileUrl = direccionImagen;

      const fileName = decodeURIComponent(
        fileUrl.split("/").pop().split("?")[0]
      );

      const fileRef = storage.ref().child(fileName);

      fileRef
        .delete()
        .then(() => {})
        .catch((error) => {
          console.error("Error al eliminar el archivo:", error);
        });

      await storageRef.put(imagenFile);
      const url = await storageRef.getDownloadURL();
      direccionImagen = url;
      console.log("URL de la imagen:", direccionImagen);
    } catch (error) {
      console.error("Error al actualizar la imagen:", error);
    }
  }

  const id = datos.get("categoriaId");

  const token = JSON.parse(sessionStorage.getItem("token"));
  console.log(token);

  const cuerpo = {
    catalogueId: "580739e4-051d-11ee-86d1-0a002700000a",
    destCategoryId: id,
    parentId: parentId,
    label: nombre,
    ImgPath: direccionImagen,
  };
  console.log(cuerpo);
  try {
    const response = await fetch("http://api.medicalsantacruz.com/categories", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(cuerpo),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error en la solicitud:", error);
  } finally {
    setTimeout(function () {
      location.reload();
    }, 2000);
  }
});

//--------------- FUNCION PARA ELIMINAR PRODUCTO --------------
const fomrEliminar = document.getElementById("eliminarFormulario");

fomrEliminar.addEventListener("submit", async function (event) {
  event.preventDefault();

  var datos = await new FormData(fomrEliminar);

  const id = datos.get("modalEliminarId");
  console.log(id);

  const token = JSON.parse(sessionStorage.getItem("token"));

  const cuerpo = {
    catalogueId: "580739e4-051d-11ee-86d1-0a002700000a",
    id: id,
  };

  try {
    const response = await fetch("http://api.medicalsantacruz.com/categories", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
      body: JSON.stringify(cuerpo),
    });
  } catch (error) {
    console.log("Error en la solicitud:", error);
  } finally {
    setTimeout(function () {
      location.reload();
    }, 2000);
  }
});

//-----------------AQUI VAN A ESTAR LAS FUNCIONES CUANDO SE SELECCIONA IMAGEN APARECE LA IMAGEN QUE ES----------------------

//PRIMERO LA DE EDITAR
const inputFile = document.getElementById("modalEditarImg");
const imgElement = document.getElementById("imgFirebase");

inputFile.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function () {
      imgElement.src = reader.result;
    };

    reader.readAsDataURL(file);
  }
});

//DESPUES LA DE AGREGAR
const fileAgregar = document.getElementById("modalAgregarImg");
const imgAgregar = document.getElementById("imgAgregar");

fileAgregar.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function () {
      imgAgregar.src = reader.result;
    };

    reader.readAsDataURL(file);
  }
});
