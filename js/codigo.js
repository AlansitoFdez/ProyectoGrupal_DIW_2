"use strict";

var oGestoria = new Gestoria();

registrarEventos();

function registrarEventos() {
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

    frmAltaWallet.btnAceptarAltaWallet.addEventListener("click", procesarAltaWallet);
    frmListadoWalletTipo.btnAceptarListadoWalletPorTipo.addEventListener("click", procesarListadoPorWalletType);
    frmBuscarWallet.btnBuscarWallet.addEventListener("click", procesarBuscarWallet);
    frmModificarWallet.btnAceptarModWallet.addEventListener("click", procesarModificarWallet);
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
    }
}

function ocultarFormularios() {
    frmAltaWallet.classList.add("d-none");
    frmBuscarWallet.classList.add("d-none");
    frmListadoWalletTipo.classList.add("d-none");
    frmModificarWallet.classList.add("d-none");

    // Borrado del contenido de capas con resultados
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

