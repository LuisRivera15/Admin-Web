<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
    <title>Medical Santa Cruz</title>
    <!-- Bootstrap-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous" />
    <!-- DataTable -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css" />
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/datatable.css" />
    <link rel="stylesheet"
        href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css" />
    <link rel="stylesheet" href="css/estilos.css" />
    <!--<link rel="stylesheet" href="catalogo.css">-->
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
        rel="stylesheet" />
</head>
<style>
a {
    text-decoration: none;
}
</style>

<body>
    <input type="checkbox" id="nav-toggle" />
    <div class="sidebar">
        <div class="sidebar-brand">
            <h2>
                <span class="las la-briefcase-medical"></span><span class="fs-3">Medical Santa Cruz</span>
            </h2>
        </div>

        <div class="sidebar-menu">
            <ul>
                <li>
                    <a href="index.html"><span class="las la-home"></span> <span>Inicio</span></a>
                </li>
                <li>
                    <a href="catalogo.html"><span class="las la-store-alt"></span> <span>Catálogo</span></a>
                </li>
                <li>
                    <a href="categorias.html"><span class="las la-icons"></span> <span>Categorías</span></a>
                </li>
                <li>
                    <a href="" class="active"><span class="las la-clipboard-list"></span>
                        <span>Inventario</span></a>
                </li>
                <li>
                    <a href="pedidos.html"><span class="las la-shopping-bag"></span> <span>Pedidos</span></a>
                </li>
                <li>
                    <a href="editarInfo.html"><span class="las la-edit"></span>
                        <span>Editar Informacion</span></a>
                </li>
                <li>
                    <a href="usuarios.html"><span class="las la-user-circle"></span> <span>Usuarios</span></a>
                </li>
                <li>
                    <a id="logout" href=""><span class="las la-sign-out-alt"></span> <span>Salir</span></a>
                </li>
            </ul>
        </div>
    </div>

    <div class="main-content">
        <header>
            <h2>
                <label for="nav-toggle">
                    <span class="las la-bars"></span>
                </label>
                Inventario
            </h2>

            <div class="user-wrapper">
                <img src="" width="" height="" alt="" />
                <div>
                    <h4>Ing. Erasmo</h4>
                    <small>Administrador</small>
                </div>
            </div>
        </header>

        <main>
            <!-- Modal AGREGAR-->
            <div class="modal fade" id="agregarModal" tabindex="-1" aria-labelledby="agregarModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="agregarModalLabel">
                                Agregar Producto
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="agregarFormulario">
                                <div class="mb-3">
                                    <label for="modalAgregarNombre" class="form-label">Nombre:</label>
                                    <input type="text" class="form-control" id="modalAgregarNombre"
                                        name="modalAgregarNombre" required />

                                    <label for="modalAgregarCatalogueId" class="form-label">Categoría:</label>
                                    <input type="text" class="form-control" id="modalAgregarCatalogueId"
                                        name="modalAgregarCatalogueId" />

                                    <label for="modalAgregarStock" class="form-label">Stock:</label>
                                    <input type="text" class="form-control" id="modalAgregarStock"
                                        name="modalAgregarStock" />

                                    <label for="modalAgregarPrice" class="form-label">Precio:</label>
                                    <input type="text" class="form-control" id="modalAgregarPrice"
                                        name="modalAgregarPrice" />

                                    <label for="modalAgregarCost" class="form-label">Costo:</label>
                                    <input type="text" class="form-control" id="modalAgregarCost"
                                        name="modalAgregarCost" />

                                    <label for="modalAgregarDiscountPct" class="form-label">Descuento (%):</label>
                                    <input type="text" class="form-control" id="modalAgregarDiscountPct"
                                        name="modalAgregarDiscountPct" />

                                    <label for="modalAgregarImg" class="form-label">Imagen:</label>
                                    <input type="file" class="form-control" id="modalAgregarImg" name="modalAgregarImg"
                                        required />
                                    <img class="img-fluid rounded-circle p-3 w-50 mx-auto d-block" id="imgAgregar"
                                        alt="Descripción de la imagen" />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Cerrar
                            </button>
                            <button type="submit" class="btn btn-primary" id="agregarBoton" form="agregarFormulario">
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Modal EDITAR-->
            <div class="modal fade" id="modalEditar" tabindex="-1" aria-labelledby="modalEditarLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="modalEditarLabel">
                                Editar Producto
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="editarFormulario">
                                <div class="mb-3">


                                    <label for="modalEditarNombre" class="form-label">Nombre:</label>
                                    <input type="text" class="form-control" id="modalEditarNombre"
                                        name="modalEditarNombre" required />

                                    <label for="modalEditarCatalogueId" class="form-label">Categoria:</label>
                                    <input type="text" class="form-control" id="modalEditarCatalogueId"
                                        name="modalEditarCatalogueId" />

                                    <label for="modalEditarStock" class="form-label">Stock:</label>
                                    <input type="text" class="form-control" id="modalEditarStock"
                                        name="modalEditarStock" />

                                    <label for="modalEditarPrice" class="form-label">Price:</label>
                                    <input type="text" class="form-control" id="modalEditarPrice"
                                        name="modalEditarPrice" />

                                    <label for="modalEditarCost" class="form-label">Cost:</label>
                                    <input type="text" class="form-control" id="modalEditarCost"
                                        name="modalEditarCost" />

                                    <label for="modalEditarDiscountPct" class="form-label">DiscountPct:</label>
                                    <input type="text" class="form-control" id="modalEditarDiscountPct"
                                        name="modalEditarDiscountPct" />

                                    <label for="modalEditarImg" class="form-label">Imagen:</label>
                                    <input type="file" class="form-control" id="modalEditarImg" name="modalEditarImg" />
                                    <img class="img-fluid rounded-circle p-3 w-50 mx-auto d-block" id="imgFirebase"
                                        alt="Descripción de la imagen" />
                                </div>
                                <input type="hidden" id="categoriaId" name="categoriaId" value="" />
                                <input type="hidden" class="form-control" id="modalEditarUrl" name="modalEditarUrl"
                                    readonly />
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Cerrar
                            </button>
                            <button type="submit" class="btn btn-primary" form="editarFormulario">
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            <!-- Modal ELIMINAR-->
            <div class="modal fade" id="modalEliminar" tabindex="-1" aria-labelledby="modalEliminarLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="modalEliminarLabel">
                                Eliminar Producto
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ¿Seguro que quieres eliminar
                            <strong id="nombreProducto"></strong> ?
                            <form id="eliminarFormulario">
                                <div class="mb-3">
                                    <input type="hidden" class="form-control" id="modalEliminarId"
                                        name="modalEliminarId" readonly />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Cerrar
                            </button>
                            <button type="submit" class="btn btn-danger" form="eliminarFormulario">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container my-4">
                <div class="col-12">
                    <h2 class="text-center w-100">PRODUCTOS DE VENTA</h2>
                </div>
                <button id="botonAñadir" type="button" class="btn btn-warning" onclick="abiriAgregarModal()">
                    <i class=" fa-solid fa-file-circle-plus"></i> Agregar producto
                </button>
            </div>

            <div class="container my-4">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <table id="datatable_ventas" class="table table-striped">
                            <caption>
                                Tabla de Productos de Venta
                            </caption>
                            <thead>
                                <tr>
                                    <th class="centered">#</th>
                                    <th class="centered">Nombre</th>
                                    <th class="centered">Categoria</th>

                                    <th class="centered">Precio</th>
                                    <th class="centered">Costo</th>
                                    <th class="centered">Stock</th>
                                    <th class="centered">Imagen</th>
                                    <th class="centered"></th>
                                    <th class="centered"></th>
                                </tr>
                            </thead>
                            <tbody id="tableBody_ventas">
                                <?php
                                require_once 'php/conexion.php';

                                // Realizar la consulta con INNER JOIN en las tablas "Products" y "Categories"
                                $consultaVenta = "SELECT p.ProductId, c.Name AS CategoryName, p.CatalogueId, p.Name, p.Stock, p.Price, p.Cost, p.DiscountPct, p.ImgPath
                    FROM Products p 
                    INNER JOIN Categories c ON p.CategoryId = c.CategoryId WHERE p.CatalogueId = '580739e4-051d-11ee-86d1-0a002700000a'";
                                $resultadoVenta = $conn->query($consultaVenta);

                                // Iterar sobre cada fila de resultados de "venta"
                                $contador = 1;
                                while ($filaVenta = $resultadoVenta->fetch(PDO::FETCH_ASSOC)) {
                                    // Acceder a los valores de las columnas
                                    $productId = $filaVenta['ProductId'];
                                    $categoryName = $filaVenta['CategoryName'];
                                    $name = $filaVenta['Name'];
                                    $price = $filaVenta['Price'];
                                    $cost = $filaVenta['Cost'];
                                    $stock = $filaVenta['Stock'];
                                    $imgPath = $filaVenta['ImgPath'];

                                    // Mostrar la fila en la tabla
                                    echo "<tr>";
                                    echo "<td class='centered'>$contador</td>";
                                    echo "<td class='centered'>$name</td>";
                                    echo "<td class='centered'>$categoryName</td>";
                                    echo "<td class='centered'>$price</td>";
                                    echo "<td class='centered'>$cost</td>";
                                    echo "<td class='centered'>$stock</td>";
                                    echo "<td class='centered'><img src='$imgPath' alt='Imagen del producto'></td>";
                                    echo "<td class='centered' style='height: 200px;'><button type='button' class='btn btn-primary' data-id='$productId' onclick='openModalEditar(this)'><i class='fa-solid fa-pencil fa-2x'></i></button></td>";
                                    echo "<td class='centered'  style= 'height: 200px;'><button type='button' class='btn btn-danger fa-2xy'><i class='fa-solid fa-trash-can' data-id='$productId' onclick='openModalEliminar(this)'></i></button></td>";
                                    echo "</tr>";

                                    $contador++;
                                }
                                ?>
                            </tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <div class="container my-4 mt-3">
                <div class="col-12">
                    <h2 class="text-center w-100">PRODUCTOS DE RENTA</h2>
                </div>
                <button id="botonAñadir" type="button" class="btn btn-warning">
                    <i class="fa-solid fa-file-circle-plus"></i> Agregar producto
                </button>
            </div>

            <div class="container my-4">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <table id="datatable_renta" class="table table-striped">
                            <caption>
                                Tabla de Productos de Renta
                            </caption>
                            <thead>
                                <tr>
                                    <th class="centered">#</th>
                                    <th class="centered">Nombre</th>
                                    <th class="centered">Categoria</th>

                                    <th class="centered">Precio</th>
                                    <th class="centered">Costo</th>
                                    <th class="centered">Stock</th>
                                    <th class="centered">Imagen</th>
                                    <th class="centered"></th>
                                    <th class="centered"></th>
                                </tr>
                            </thead>
                            <tbody id="tableBody_renta">
                                <?php
                                require_once 'php/conexion.php';

                                // Realizar la consulta con INNER JOIN en las tablas "Products" y "Categories"
                                $consultaVenta = "SELECT p.ProductId, c.Name AS CategoryName, p.CatalogueId, p.Name, p.Stock, p.Price, p.Cost, p.DiscountPct, p.ImgPath
                    FROM Products p 
                    INNER JOIN Categories c ON p.CategoryId = c.CategoryId WHERE p.CatalogueId = '580739e4-051e-11ee-86d1-0a002700000a'";
                                $resultadoVenta = $conn->query($consultaVenta);

                                // Iterar sobre cada fila de resultados de "venta"
                                $contador = 1;
                                while ($filaVenta = $resultadoVenta->fetch(PDO::FETCH_ASSOC)) {
                                    // Acceder a los valores de las columnas
                                    $productId = $filaVenta['ProductId'];
                                    $categoryName = $filaVenta['CategoryName'];
                                    $name = $filaVenta['Name'];
                                    $price = $filaVenta['Price'];
                                    $cost = $filaVenta['Cost'];
                                    $stock = $filaVenta['Stock'];
                                    $imgPath = $filaVenta['ImgPath'];

                                    // Mostrar la fila en la tabla
                                    echo "<tr>";
                                    echo "<td class='centered'>$contador</td>";
                                    echo "<td class='centered'>$name</td>";
                                    echo "<td class='centered'>$categoryName</td>";
                                    echo "<td class='centered'>$price</td>";
                                    echo "<td class='centered'>$cost</td>";
                                    echo "<td class='centered'>$stock</td>";
                                    echo "<td class='centered'><img src='$imgPath' alt='Imagen del producto'></td>";
                                    echo "<td class='centered' style= 'height: 200px;' ><button type='button' class='btn btn-primary'><i class='fa-solid fa-pencil fa-2x'></i></button></td>";
                                    echo "<td class='centered'  style= 'height: 200px;'><button type='button' class='btn btn-danger fa-2xy'><i class='fa-solid fa-trash-can'></i></button></td>";
                                    echo "</tr>";

                                    $contador++;
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
        <!-- Bootstrap-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous">
        </script>
        <!-- jQuery -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <!-- DataTable -->
        <script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
        <script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap5.min.js"></script>

        <script src="js/inventario.js"></script>
        <script src="js/index.js"></script>
    </div>
</body>

</html>