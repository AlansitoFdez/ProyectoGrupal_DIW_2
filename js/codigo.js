"use strict";

var oGestoria = new Gestoria();

registrarEventos();

function registrarEventos() {
    document.querySelector("#mnuAltaCliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarCliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoClientes").addEventListener("click", mostrarListadoClientes);
    document.querySelector("#mnuListadoClientesMoneda").addEventListener("click", mostrarFormulario);


    document
        .querySelector("#mnuAltaWallet")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuBuscarWallet")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuListadoWalletsPorTipo")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuListadoWallets")
        .addEventListener("click", mostrarListadoWallets);

    //APARTADO DE STOCKS
    document.querySelector("#mnuAltaStock").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarStock").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoStocks").addEventListener("click", mostrarListadoStocks);
    document.querySelector("#mnuListadoStockPorTipo").addEventListener("click", mostrarFormulario);


    frmAltaCliente.btnAltaCliente.addEventListener("click", procesarAltaCliente);
    frmBuscarCliente.btnBuscarCliente.addEventListener("click", procesarBuscarCliente);
    frmEditarCliente.btnEditarCliente.addEventListener("click", procesarEditarCliente);
    frmListadoClientesMoneda.btnListadoClientesMoneda.addEventListener("click", procesarListadoClientesPorMoneda);

    frmAltaWallet.btnAceptarAltaWallet.addEventListener("click", procesarAltaWallet);
    frmListadoWalletTipo.btnAceptarListadoWalletPorTipo.addEventListener("click", procesarListadoPorWalletType);
    frmBuscarWallet.btnBuscarWallet.addEventListener("click", procesarBuscarWallet);
    frmModificarWallet.btnAceptarModWallet.addEventListener("click", procesarModificarWallet);

    frmAltaStock.btnAceptarAltaStock.addEventListener("click", procesarAltaStock);
    frmBuscarStock.btnBuscarStock.addEventListener("click", procesarBuscarStock);
    frmListarStockTipo.btnListarStocksTipo.addEventListener("click", procesarListadoStockTipos);
    frmModificarStock.btnAceptarModStock.addEventListener("click", procesaroModificarStock);
}

function mostrarFormulario(oEvento) {
    let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)

    ocultarFormularios();

    switch (opcionMenu) {
        case "mnuAltaWallet":
            frmAltaWallet.classList.remove("d-none");
            actualizarDesplegableTiposWallet(undefined);
            break;
        case "mnuBuscarWallet":
            frmBuscarWallet.classList.remove("d-none");
            break;
        case "mnuListadoWalletsPorTipo":
            frmListadoWalletTipo.classList.remove("d-none");
            actualizarDesplegableTiposWallet(undefined);
            break;
        case "mnuAltaStock":
            frmAltaStock.classList.remove("d-none");
            actualizarDesplegableTiposStock(undefined);
            break;
        case "mnuBuscarStock":
            frmBuscarStock.classList.remove("d-none");
            break;
        case "mnuListadoStockPorTipo":
            frmListarStockTipo.classList.remove("d-none");
            actualizarDesplegableTiposStock(undefined);
            break;
        case "mnuAltaCliente":
            frmAltaCliente.classList.remove("d-none");
            actualizarDesplegableMonedas(undefined);
            break;
        case "mnuBuscarCliente":
            frmBuscarCliente.classList.remove("d-none");
            break;
        case "mnuListadoClientesMoneda":
            frmListadoClientesMoneda.classList.remove("d-none");
            actualizarDesplegableMonedas(undefined);
            break;
    }
}

function ocultarFormularios() {
    //-----------------Customers------------------------
    frmAltaCliente.classList.add("d-none");
    frmBuscarCliente.classList.add("d-none");
    frmEditarCliente.classList.add("d-none");
    frmListadoClientesMoneda.classList.add("d-none");
    //-----------------Wallets------------------------
    frmAltaWallet.classList.add("d-none");
    frmBuscarWallet.classList.add("d-none");
    frmListadoWalletTipo.classList.add("d-none");
    frmModificarWallet.classList.add("d-none");
    //-----------------Stocks------------------------
    frmAltaStock.classList.add("d-none");
    frmBuscarStock.classList.add("d-none");
    frmListarStockTipo.classList.add("d-none");
    frmModificarStock.classList.add("d-none");

    // Borrado del contenido de capas con resultados
    document.querySelector("#resultadoBusqueda").innerHTML = "";
    document.querySelector("#resultadoListado").innerHTML = "";
    document.querySelector("#listados").innerHTML = "";
}

async function actualizarDesplegableTiposWallet(idTipoSeleccionado) {

    let respuesta = await oGestoria.getTiposWallet();
    let options = "";

    for (let tipo of respuesta.datos) {
        if (idTipoSeleccionado && idTipoSeleccionado == tipo.wallet_type_id) { // Si llega el parámetro ( != undefined )
            options += "<option selected value='" + tipo.wallet_type_id + "' >" + tipo.wallet_type_name + "</option>";
        } else {
            options += "<option value='" + tipo.wallet_type_id + "' >" + tipo.wallet_type_name + "</option>";
        }

    }
    // Agrego los options generados a partir del contenido de la BD en todos los desplegables
    frmListadoWalletTipo.lstWalletTipo.innerHTML = options;
    frmModificarWallet.lstModWalletTipo.innerHTML = options;
    frmAltaWallet.lstAltaWalletTipo.innerHTML = options;
}

async function actualizarDesplegableTiposStock(idTipoSeleccionado) {
    let respuesta = await oGestoria.getTiposStock();

    let options = "";

    for (let tipo of respuesta.datos) {
        if(idTipoSeleccionado && idTipoSeleccionado == tipo.stock_type_id) {
            options += "<option selected value='" + tipo.stock_type_id + "' >" + tipo.stock_type_name + "</option>";
        } else {
            options += "<option value='" + tipo.stock_type_id + "' >" + tipo.stock_type_name + "</option>";
        }
    }

    frmAltaStock.lstStockTipo.innerHTML = options;
    frmListarStockTipo.lstStockTipo.innerHTML = options;
    frmModificarStock.lstModStockTipo.innerHTML = options;
}

async function actualizarDesplegableMonedas(idSelect) {
    let respuesta = await oGestoria.getMonedas();
    let options = "";
    for (let tipo of respuesta.datos) {
        if (idSelect && idSelect == tipo.currency_id) { // Si llega el parámetro ( != undefined ) 
            options += "<option selected value='" + tipo.currency_id + "' >" + tipo.currency_name + "</option>";
        } else {
            options += "<option value='" + tipo.currency_id + "' >" + tipo.currency_name + "</option>";
        }
    }
    frmListadoClientesMoneda.lstFiltroMoneda.innerHTML = options;
    frmEditarCliente.lstEditMoneda.innerHTML = options;
    frmAltaCliente.lstNuevoMoneda.innerHTML = options;
}

// Listado de clientes CON BOTONES DE EDITAR Y BORRAR
async function mostrarListadoClientes() {
    ocultarFormularios();
    let respuesta = await oGestoria.getClientes();
    if(!respuesta.ok){
        alert("Error cargando clientes: " + respuesta.mensaje);
        return;
    }
    let html = "<h2>Listado de clientes</h2><table class='table table-striped'><thead><tr>"
            + "<th>ID</th><th>currency_name</th><th>Teléfono</th><th>customer_active</th><th>Fecha nacimiento</th><th>Moneda</th><th>Acciones</th></tr></thead><tbody>";
    for (let cli of respuesta.datos) {
        html += "<tr><td>" + cli.id_customers + "</td><td>"
                          + cli.customer_name + "</td><td>"
                          + cli.phone + "</td><td>"
                          + (cli.customer_active ? 'Sí':'No') + "</td><td>"
                          + cli.birthdate + "</td><td>"
                          + cli.currency_name + "</td><td>"
                          + "<button class='btn btn-primary btnEditarClienteTabla' data-cliente='" + JSON.stringify(cli) + "'>Editar</button> "
                          + "<button class='btn btn-danger btnBorrarClienteTabla' data-id='" + cli.id_customers + "'>Borrar</button>"
                          + "</td></tr>";
    }
    html += "</tbody></table>";
    document.getElementById('listados').innerHTML = html;

    document.querySelectorAll(".btnEditarClienteTabla").forEach(boton => {
        boton.addEventListener("click", procesarBotonEditarCliente);
    });
    document.querySelectorAll(".btnBorrarClienteTabla").forEach(boton => {
        boton.addEventListener("click", procesarBotonBorrarCliente);
    });
}

// Alta cliente
async function procesarAltaCliente() {
    let customer_name = frmAltaCliente.txtNuevoNombreCliente.value.trim();
    let phone = frmAltaCliente.txtNuevoTelefono.value.trim();
    let nacimiento = frmAltaCliente.txtNuevoFecha.value.trim();
    let currency_id = frmAltaCliente.lstNuevoMoneda.value;
    let customer_active = 1;

    let cliente = new Customer(null, customer_name, phone, customer_active, nacimiento, currency_id);
    let respuesta = await oGestoria.altaCliente(cliente);
    alert(respuesta.mensaje);
    if (respuesta.ok) {
        frmAltaCliente.reset();
        frmAltaCliente.classList.add("d-none");
    }
}

// Buscar cliente por nombre CON BOTONES DE EDITAR Y BORRAR
async function procesarBuscarCliente() {
    let customer_name = frmBuscarCliente.txtBuscarNombre.value.trim();
    if (customer_name.length == 0) {
        alert("Escribe algún nombre de cliente para buscar.");
        return;
    }
    let respuesta = await oGestoria.buscarCliente(customer_name);
    if(!respuesta.ok || !respuesta.datos.length){
        alert("No se encontraron clientes.");
        return;
    }
    let html = "<h2>Búsqueda de clientes</h2><table class='table table-striped'><thead><tr>"
            + "<th>ID</th><th>Nombre</th><th>Teléfono</th><th>Activo</th><th>Fecha nacimiento</th><th>Moneda</th><th>Acciones</th></tr></thead><tbody>";
    for (let cli of respuesta.datos) {
        html += "<tr><td>" + cli.id_customers + "</td><td>"
                          + cli.customer_name + "</td><td>"
                          + cli.phone + "</td><td>"
                          + (cli.customer_active ? 'Sí':'No') + "</td><td>"
                          + cli.birthdate + "</td><td>"
                          + cli.currency_name + "</td><td>"
                          + "<button class='btn btn-primary btnEditarClienteTabla' data-cliente='" + JSON.stringify(cli) + "'>Editar</button> "
                          + "<button class='btn btn-danger btnBorrarClienteTabla' data-id='" + cli.id_customers + "'>Borrar</button>"
                          + "</td></tr>";
    }
    html += "</tbody></table>";
    document.querySelector("#resultadoBusqueda").innerHTML = html;

    document.querySelectorAll(".btnEditarClienteTabla").forEach(boton => {
        boton.addEventListener("click", procesarBotonEditarCliente);
    });
    document.querySelectorAll(".btnBorrarClienteTabla").forEach(boton => {
        boton.addEventListener("click", procesarBotonBorrarCliente);
    });
}

// Editar cliente
function procesarBotonEditarCliente(oEvento) {
    let boton = oEvento.target;
    let cliente = JSON.parse(boton.dataset.cliente);
    ocultarFormularios();
    frmEditarCliente.classList.remove("d-none");
    frmEditarCliente.txtEditIdCliente.value = cliente.id_customers;
    frmEditarCliente.txtEditNombre.value = cliente.customer_name;
    frmEditarCliente.txtEditTelefono.value = cliente.phone;
    frmEditarCliente.txtEditFecha.value = cliente.birthdate;
    // El select de moneda
    actualizarDesplegableMonedas(cliente.currency_id_FK).then(() => { frmEditarCliente.lstEditMoneda.value = cliente.currency_id_FK; });
}


// Confirmar y ejecutar BORRADO cliente
async function procesarBotonBorrarCliente(event) {
    let idCliente = event.target.dataset.id;
    if (confirm("¿Seguro que quieres borrar el cliente con ID " + idCliente + "?")) {
        let respuesta = await oGestoria.borrarCliente(idCliente);
        alert(respuesta.mensaje);
        if (respuesta.ok) {
            mostrarListadoClientes();
        }
    }
}

async function procesarEditarCliente() {
    let id_customers = frmEditarCliente.txtEditIdCliente.value;
    let customer_name = frmEditarCliente.txtEditNombre.value.trim();
    let phone = frmEditarCliente.txtEditTelefono.value.trim();
    let birthdate = frmEditarCliente.txtEditFecha.value.trim();
    let currency_id = frmEditarCliente.lstEditMoneda.value;
    let customer_active = 1;
    let cliente = new Customer(id_customers, customer_name, phone, customer_active, birthdate, currency_id);
    let respuesta = await oGestoria.modificarCliente(cliente);
    alert(respuesta.mensaje);
    if (respuesta.ok) {
        frmEditarCliente.reset();
        frmEditarCliente.classList.add("d-none");
        mostrarListadoClientes();
    }
}

// Listado filtrado por moneda
async function procesarListadoClientesPorMoneda() {
    let currency_id = frmListadoClientesMoneda.lstFiltroMoneda.value;
    let respuesta = await oGestoria.listarClientesPorMoneda(currency_id);
    if(!respuesta.ok){
        alert("Error cargando listado filtrado: " + respuesta.mensaje);
        return;
    }
    let html = "<h2>Listado de clientes por moneda</h2><table class='table table-striped'><thead><tr>"
            + "<th>ID</th><th>Nombre</th><th>Teléfono</th><th>Activo</th><th>Fecha nacimiento</th><th>Moneda</th></tr></thead><tbody>";
    for (let cli of respuesta.datos) {
        html += "<tr><td>" + cli.id_customers + "</td><td>"
                          + cli.customer_name + "</td><td>"
                          + cli.phone + "</td><td>"
                          + (cli.customer_active ? 'Sí':'No') + "</td><td>"
                          + cli.birthdate + "</td><td>"
                          + cli.currency_name + "</td></tr>";
    }
    html += "</tbody></table>";
    document.getElementById('listados').innerHTML = html;
}

//------------------------------------------------------Wallets---------------------------------------------------------------

async function procesarAltaWallet() {
    const fechaActual = new Date();
    // Recuperar datos del formulario frmAltaWallet
    let wallet_name = frmAltaWallet.txtAltaWalletNombre.value.trim();
    let description = frmAltaWallet.txtAltaWalletDescripcion.value.trim();
    let idWalletType = frmAltaWallet.lstAltaWalletTipo.value;
    let phone = frmAltaWallet.txtAltaWalletTelefono.value;
    let money_amount = 0;
    let wallet_active = 1;
    const fecha = fechaActual.toLocaleDateString();

    // Validar datos del formulario
    if (validarAltaWallet()) {
        const customer = await oGestoria.obtenerClientePorTelefono(phone);

        let respuesta = await oGestoria.altaWallet(new Wallet(null, money_amount, wallet_name, wallet_active, fecha, description, idWalletType, customer));
        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmAltaWallet.reset();
            // Ocultar el formulario
            frmAltaWallet.classList.add("d-none");
        }
    }
}

//VAlidación del alta de la wallet
function validarAltaWallet() {
    // Recuperar datos del formulario frmModificarComponente
    let wallet_name = frmAltaWallet.txtAltaWalletNombre.value.trim();
    let description = frmAltaWallet.txtAltaWalletDescripcion.value.trim();
    let phone = parseInt(frmAltaWallet.txtAltaWalletTelefono.value.trim());

    let valido = true;
    let errores = "";

    if (isNaN(phone)) {
        valido = false;
        errores += "El numero telefónico debe ser numérico";
    }

    if (wallet_name.length == 0 || description.length == 0) {
        valido = false;
        errores += "El nombre y la descripción no pueden estar vacíos";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}

//Proceso de busqueda de wallet
async function procesarBuscarWallet() {
    if (validarBuscarWallet()) {
        let txtNombre = frmBuscarWallet.txtBuscarWallet.value.trim();

        let respuesta = await oGestoria.buscarWallet(txtNombre);

        if (!respuesta.error) {
            let tabla = "<table class='table table-striped' id='listadoDeBuscar'>";
            tabla += "<thead><tr><th>WALLET NAME</th><th>MONEY AMOUNT</th><th>CUSTOMER NAME</th><th>CREATION DATE</th><th>DESCRIPTION</th><th>WALLET TYPE</th><th>ACCION</th></tr></thead><tbody>";

            for (let wallet of respuesta.datos) {
                tabla += "<tr><td>" + wallet.wallet_name + "</td>";
                tabla += "<td>" + wallet.money_amount + "</td>";
                tabla += "<td>" + wallet.customer_name + "</td>";
                tabla += "<td>" + wallet.creation_date + "</td>";
                tabla += "<td>" + wallet.description + "</td>";
                tabla += "<td>" + wallet.wallet_type_name + "</td>";

                tabla += "<td><button class='btn btn-primary' data-wallet='" + JSON.stringify(wallet) + "'><i class='bi bi-pencil-square'></i></button></td>";
                tabla += "<td><button class='btn btn-danger' data-id_wallet='" + wallet.id_wallet + "'><i class='bi bi-trash'></i></button></td></tr>";
            }

            tabla += "</tbody></table>";

            document.querySelector("#listados").innerHTML = tabla;
            document.querySelector("#listadoDeBuscar").addEventListener('click', procesarBotonEditarWallet);
            document.querySelector("#listadoDeBuscar").addEventListener("click", borrarWallet);
        } else { // Si hay error
            alert(respuesta.mensaje);
        }

    }
}

//Validación la busqueda de wallet
function validarBuscarWallet() {
    let txtNombre = frmBuscarWallet.txtBuscarWallet.value.trim();
    let valido = true;
    let errores = "";

    if (txtNombre.length == 0) {
        valido = false;
        errores += "El nombre no puede estar vacío";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}

function mostrarListadoWallets() {
    open("listado_wallets.html ");
}

//Proceso del boton de editar wallet
function procesarBotonEditarWallet(oEvento) {
    let boton = null;

    // Verificamos si han hecho clic sobre el botón o el icono
    if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "button") {
        if (oEvento.target.nodeName == "I") {
            // Pulsacion sobre el icono
            boton = oEvento.target.parentElement; // El padre es el boton
        } else {
            boton = oEvento.target;
        }


        ocultarFormularios();

        frmModificarWallet.classList.remove("d-none");

        let wallet = JSON.parse(boton.dataset.wallet);

        frmModificarWallet.txtModIdWallet.value = wallet.id_wallet;
        frmModificarWallet.txtModNombreWallet.value = wallet.wallet_name;
        frmModificarWallet.txtModDescripcionWallet.value = wallet.description;
        actualizarDesplegableTiposWallet(wallet.wallet_type_id_FK);
    }
}

//Modificación de la Wallet
async function procesarModificarWallet() {

    let id_wallet = frmModificarWallet.txtModIdWallet.value.trim();
    let wallet_name = frmModificarWallet.txtModNombreWallet.value.trim();
    let description = frmModificarWallet.txtModDescripcionWallet.value.trim();
    let wallet_type_id_FK = frmModificarWallet.lstModWalletTipo.value;

    // Validar datos del formulario
    if (validarModWallet()) {
        let respuesta = await oGestoria.modificarWallet(new Wallet({ id_wallet, wallet_name, description, wallet_type_id_FK }));

        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmModificarWallet.reset();
            // Ocultar el formulario
            frmModificarWallet.classList.add("d-none");
        }

    }
}

function validarModWallet() {
    let wallet_name = frmModificarWallet.txtModNombreWallet.value.trim();
    let description = frmModificarWallet.txtModDescripcionWallet.value.trim();

    let valido = true;
    let errores = "";

    if (wallet_name.length == 0 || description.length == 0) {
        valido = false;
        errores += "El nombre y la descripción no pueden estar vacíos";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}

async function borrarWallet(oEvento) {
    let boton = oEvento.target.closest("button");
    if (!boton) return; // seguridad

    let id_wallet = boton.dataset.id_wallet; // ahora sí coincide

    let respuesta = await oGestoria.borrarWallet(id_wallet);

    alert(respuesta.mensaje);

    if (!respuesta.error) {
        boton.closest("tr").remove();
    }
}

async function procesarListadoPorWalletType() {
    let wallet_type_id = frmListadoWalletTipo.lstWalletTipo.value;

    let respuesta = await oGestoria.listadoPorWalletType(wallet_type_id);

    
    let tabla = "<table class='table table-striped' id='listadoPorTipo'>";
    tabla += "<thead><tr><th>WALLET NAME</th><th>MONEY AMOUNT</th><th>CUSTOMER NAME</th><th>CREATION DATE</th><th>DESCRIPTION</th><th>WALLET TYPE</th><th>ACCION</th></tr></thead><tbody>";

    for (let wallet of respuesta.datos) {
        tabla += "<tr><td>" + wallet.wallet_name + "</td>";
        tabla += "<td>" + wallet.money_amount + "</td>";
        tabla += "<td>" + wallet.customer_name + "</td>";
        tabla += "<td>" + wallet.creation_date + "</td>";
        tabla += "<td>" + wallet.description + "</td>";
        tabla += "<td>" + wallet.wallet_type_name + "</td>";

        tabla += "<td><button class='btn btn-primary' data-wallet='" + JSON.stringify(wallet) + "'><i class='bi bi-pencil-square'></i></button></td>";
        tabla += "<td><button class='btn btn-danger' data-id_wallet='" + wallet.id_wallet + "'><i class='bi bi-trash'></i></button></td></tr>";
    }

    tabla += "</tbody></table>";

    document.querySelector("#listados").innerHTML = tabla;
    document.querySelector("#listadoPorTipo").addEventListener('click', procesarBotonEditarWallet);
    document.querySelector("#listadoPorTipo").addEventListener("click", borrarWallet);
    
}

//-----------------------------------------------------------------Funciones de Stock----------------------------------------------------------------------

//Procesar Alta Stock
async function procesarAltaStock() {
    let fechaActual = new Date();

    let wallet_name = frmAltaStock.txtStockWalletName.value.trim();
    let stock_name = frmAltaStock.txtNombreStock.value.trim();
    let quantity = frmAltaStock.nmbCantidadStock.value.trim();
    let stock_type_id_FK = frmAltaStock.lstStockTipo.value;
    let in_use = 1;
    let added_date = fechaActual.toISOString().slice(0, 10);


    if (validarAltaStock()) {
            let wallet_id_FK = await oGestoria.obtenerIdWallet(wallet_name);

        let respuesta = await oGestoria.altaStock(new Stock(null, quantity, stock_name, in_use, added_date, wallet_id_FK, stock_type_id_FK));

        alert(respuesta.mensaje);

        if (!respuesta.error) { 
            //Resetear formulario
            frmAltaStock.reset();
            // Ocultar el formulario
            frmAltaStock.classList.add("d-none");
        }

    }
}

function validarAltaStock() {
    let wallet_name = frmAltaStock.txtStockWalletName.value.trim();
    let stock_name = frmAltaStock.txtNombreStock.value.trim();
    let quantity = frmAltaStock.nmbCantidadStock.value.trim();

    let valido = true;
    let errores = "";

    if (quantity <= 0) {
        valido = false;
        errores += "La cantidad no puede ser 0."
    }

    if (wallet_name.length == 0 || stock_name.length == 0) {
        valido = false;
        errores += "Los campos de Nombre Wallet y Nombre Stock deben estar rellenos."
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}


//Buscar Stock
async function procesarBuscarStock() {
    if (validarBuscarStock()) {
        let stock_name = frmBuscarStock.txtBuscarStockNombre.value.trim();

        let respuesta = await oGestoria.buscarStock(stock_name);

        if (!respuesta.error) {
            let tabla = "<table class='table table-striped' id='listadoDeBuscar'>";
            tabla += `<thead><tr><th>STOCK NAME</th><th>QUANTITY</th><th>WALLET NAME</th><th>ADDED DATE</th><th>STOCK TYPE</th><th class='text-end'>ACTIONS</th></tr></thead><tbody>`;

            for (let stock of respuesta.datos) {
                tabla += "<tr><td>" + stock.stock_name + "</td>";
                tabla += "<td>" + stock.quantity + "</td>";
                tabla += "<td>" + stock.wallet_name + "</td>";
                tabla += "<td>" + stock.added_date + "</td>";
                tabla += "<td>" + stock.stock_type_name + "</td>";
                tabla += "<td class='text-end' style='white-space:nowrap';>";

                tabla += "<button class='btn btn-primary me-2' data-wallet='" + JSON.stringify(stock) +"'><i class='bi bi-pencil-square'></i></button>";
                tabla += "<button class='btn btn-danger' data-id_wallet='"+ stock.id_stocks + "'><i class='bi bi-trash'></i></button></tr>";
            }

            tabla += "</tbody></table>";

            document.querySelector("#resultadoBusqueda").innerHTML = tabla;
            document.querySelector("#listadoDeBuscar").addEventListener('click', procesarBotonModificacionStock);
            document.querySelector("#listadoDeBuscar").addEventListener("click", procesarBorradoStock);
        } else {
            alert(respuesta.mensaje);
        }
    }
}

function validarBuscarStock() {
    let stock_name = frmBuscarStock.txtBuscarStockNombre.value.trim();
    let valido = true;
    let errores = "";

    if (stock_name.length == 0) {
        valido = false;
        errores += "El nombre no puede estar vacío";
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}

//LISTAR TODOS LOS STOCKS POR TIPO

async function procesarListadoStockTipos() {
    let tipo = frmListarStockTipo.lstStockTipo.value;
    let respuesta = await oGestoria.obtenerListadoStockTipos(tipo);

    if (!respuesta.error) {
        let tabla = "<table class='table table-striped' id='listadoPorTipo'>"
        tabla += "<thead><tr><th>STOCK NAME</th><th>QUANTITY</th><th>WALLET NAME</th><th>ADDED DATE</th></tr></thead><tbody>";

        for (let stock of respuesta.datos) {
            tabla +="<tr><td>" + stock.stock_name + "</td>";
            tabla +="<td>" + stock.quantity + "</td>";
            tabla +="<td>" + stock.wallet_name + "</td>";
            tabla +="<td>" + stock.added_date + "</td></tr>";
        }
        tabla += "</tbody></table>";
        document.querySelector("#resultadoListado").innerHTML = tabla;
    } else {
        alert(respuesta.mensaje);
    }
}

// MODIFICAR STOCK 

function procesarBotonModificacionStock(oEvento) {
    let boton = null;
    if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "button") {
        if (oEvento.target.nodeName == "I") {
            boton = oEvento.target.parentElement;
        } else {
            boton = oEvento.target;
        }

        if (boton.dataset.wallet !== undefined) {
            ocultarFormularios();
            frmModificarStock.classList.remove("d-none");
            let stock = JSON.parse(boton.dataset.wallet);

            frmModificarStock.txtModIdStock.value = stock.id_stocks;
            frmModificarStock.txtModNombreStock.value = stock.stock_name;
            frmModificarStock.nmbModCantidadStock.value = stock.quantity;

            actualizarDesplegableTiposStock(stock.stock_type_id_FK);
        }
    }
}

async function procesaroModificarStock() {
    let id_stock = frmModificarStock.txtModIdStock.value.trim();
    let stock_name = frmModificarStock.txtModNombreStock.value.trim();
    let quantity = frmModificarStock.nmbModCantidadStock.value.trim();
    let stock_type_id = frmModificarStock.lstModStockTipo.value;

    if (validarModStock()) {
        let respuesta = await oGestoria.modificarStock(id_stock, stock_name, quantity, stock_type_id);

        alert(respuesta.mensaje);

        if (!respuesta.error) {
            frmModificarStock.reset();
            frmModificarStock.classList.add("d-none");
        }
    }
}

function validarModStock() {
    let stock_name = frmModificarStock.txtModNombreStock.value.trim();
    let quantity = frmModificarStock.nmbModCantidadStock.value.trim();

    let valido = true;
    let errores = "";

    if (stock_name.length == 0 || quantity.length <= 0) {
        valido = false;
        errores += "El nombre y la cantidad deben estar rellenos y la cantidad ser mayor que 0";
    }

    if (!valido) alert(errores);
    return valido;
}

//BOTON DE BORRADO DE STOCK Y UPDATEO DE WALLET
async function procesarBorradoStock(oEvento) {
    let boton = oEvento.target.closest("button");
    if (!boton) return; // seguridad para que no falle si no es botón

    let id_stock = boton.dataset.id_wallet || boton.dataset.id_stock; // usa data-id_stock en tu tabla

    let respuesta = await oGestoria.borrarStock(id_stock);

    alert(respuesta.mensaje);

    if (!respuesta.error) {
        boton.closest("tr").remove();  // Borra visualmente la fila de la tabla
    }
}

//LISTAR TODOS LOS STOCKS
function mostrarListadoStocks() {
    open("listado_stocks.html");
}

