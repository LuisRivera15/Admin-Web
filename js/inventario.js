window.addEventListener("load", async () => {
  await initDataTable();
});

/**------------ESTA PARTA VA A HACER PARA LAS FUNCIONES DEL PRODUCTOS DE VENTA --------------------- */

let dataTable;
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

  dataTableIsInitialized = true;
};

async function openModal(button) {
  const productId = button.getAttribute("data-id");

  // Abrir el modal
  $("#modalEditar").modal("show");
}

function openModalEliminar(button) {
  $("#modalEliminar").modal("show");
}
