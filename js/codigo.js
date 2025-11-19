"use strict"

var oGestoria = new Gestoria();

registrarEventos();

function registrarEventos() {
    //Configuracion de Opciones de Menú

    //APARTADO DE STOCKS
    document.querySelector("#mnuAltaStock").addEventListener("click", mostrarFormularios);
    document.querySelector("#mnuBuscarStock").addEventListener("click", mostrarFormularios);
    document.querySelector("#mnuListadoStocks").addEventListener("click", mostrarListadoStocks);
    document.querySelector("#mnuListadoStockPorTipo").addEventListener("click", mostrarFormularios);

    //Configuracion de Botones
    frmAltaStock.btnAceptarAltaStock.addEventListener("click", procesarAltaStock);
    frmBuscarStock.btnBuscarStock.addEventListener("click", procesarBuscarStock);
    frmListarStockTipo.btnListarStocksTipo.addEventListener("click", procesarListadoStockTipos);
    frmModificarStock.btnAceptarModStock.addEventListener("click", procesaroModificarStock);
}

function mostrarFormularios(oEvento){
    let opcionMenu = oEvento.target.id;

    ocultarFormularios();

    switch(opcionMenu) {
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
    }
}

function ocultarFormularios() {
    frmAltaStock.classList.add("d-none");
    frmBuscarStock.classList.add("d-none");
    frmListarStockTipo.classList.add("d-none");
    frmModificarStock.classList.add("d-none");
    document.querySelector("#resultadoBusqueda").innerHTML = "";
    document.querySelector("#resultadoListado").innerHTML = "";
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




