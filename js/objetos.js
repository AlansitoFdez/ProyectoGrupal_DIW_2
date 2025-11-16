"use strict";

/**
 * Clase Moneda
 */
class Moneda {
  #idMoneda;
  #nombre;
  constructor(idMoneda, nombre) {
    this.#idMoneda = idMoneda;
    this.#nombre = nombre;
  }
  get idMoneda() { return this.#idMoneda; }
  set idMoneda(valor) { this.#idMoneda = valor; }
  get nombre() { return this.#nombre; }
  set nombre(valor) { this.#nombre = valor; }
  toJSON() {
    return {
      idMoneda: this.#idMoneda,
      nombre: this.#nombre
    };
  }
}

/**
 * Clase Cliente
 */
class Cliente {
  #idCliente;
  #nombre;
  #telefono;
  #activo;
  #fechaNacimiento;
  #idMoneda;
  constructor(idCliente, nombre, telefono, activo, fechaNacimiento, idMoneda) {
    this.#idCliente = idCliente;
    this.#nombre = nombre;
    this.#telefono = telefono;
    this.#activo = activo;
    this.#fechaNacimiento = fechaNacimiento;
    this.#idMoneda = idMoneda;
  }
  get idCliente() { return this.#idCliente; }
  set idCliente(valor) { this.#idCliente = valor; }
  get nombre() { return this.#nombre; }
  set nombre(valor) { this.#nombre = valor; }
  get telefono() { return this.#telefono; }
  set telefono(valor) { this.#telefono = valor; }
  get activo() { return this.#activo; }
  set activo(valor) { this.#activo = valor; }
  get fechaNacimiento() { return this.#fechaNacimiento; }
  set fechaNacimiento(valor) { this.#fechaNacimiento = valor; }
  get idMoneda() { return this.#idMoneda; }
  set idMoneda(valor) { this.#idMoneda = valor; }
  toJSON() {
    return {
      idCliente: this.#idCliente,
      nombre: this.#nombre,
      telefono: this.#telefono,
      activo: this.#activo,
      fechaNacimiento: this.#fechaNacimiento,
      idMoneda: this.#idMoneda
    };
  }
}

//--------------------------------------------------------------------------------------------------

class Wallet {
  #id_wallet;
  #money_amount;
  #wallet_name;
  #wallet_active;
  #creation_date;
  #description;
  #wallet_type_id_FK;
  #customers_id_FK;

  //Utilizo la desestructuración para mi constructor
  constructor(
    {
      id_wallet = null,
      money_amount = 0,
      wallet_name = "",
      wallet_active = 1,
      creation_date = null,
      description = "",
      wallet_type_id_FK = null,
      customers_id_FK = null
    } = {}
  ) {
    this.#id_wallet = id_wallet;
    this.#money_amount = money_amount;
    this.#wallet_name = wallet_name;
    this.#wallet_active = wallet_active;
    this.#creation_date = creation_date;
    this.#description = description;
    this.#wallet_type_id_FK = wallet_type_id_FK;
    this.#customers_id_FK = customers_id_FK;
  }

  get id_wallet() {
    return this.#id_wallet;
  }
  get money_amount() {
    return this.#money_amount;
  }
  get wallet_name() {
    return this.#wallet_name;
  }
  get wallet_active() {
    return this.#wallet_active;
  }
  get creation_date() {
    return this.#creation_date;
  }
  get description() {
    return this.#description;
  }
  get wallet_type_id_FK() {
    return this.#wallet_type_id_FK;
  }
  get customers_id_FK() {
    return this.#customers_id_FK;
  }

  set id_wallet(id_wallet) {
    this.#id_wallet = this.#id_wallet;
  }
  set money_amount(money_amount) {
    this.#money_amount = this.#money_amount;
  }
  set wallet_name(wallet_name) {
    this.#wallet_name = this.#wallet_name;
  }
  set wallet_active(wallet_active) {
    this.#wallet_active = this.#wallet_active;
  }
  set creation_date(creation_date) {
    this.#creation_date = this.#creation_date;
  }
  set description(description) {
    this.#description = this.#description;
  }
  set wallet_type_id_FK(wallet_type_id_FK) {
    this.#wallet_type_id_FK = this.#wallet_type_id_FK;
  }
  set customers_id_FK(customers_id_FK) {
    this.#customers_id_FK = this.#customers_id_FK;
  }

  toJSON() {
    let oWallet = {
      id_wallet: this.#id_wallet,
      money_amount: this.#money_amount,
      wallet_name: this.#wallet_name,
      wallet_active: this.#wallet_active,
      creation_date: this.#creation_date,
      description: this.#description,
      wallet_type_id_FK: this.#wallet_type_id_FK,
      customers_id_FK: this.#customers_id_FK,
    };
    return oWallet;
  }
}

class WalletType {
  #wallet_type_id
  #wallet_type_name
  constructor(wallet_type_id, wallet_type_name) {
    this.#wallet_type_id = wallet_type_id,
      this.#wallet_type_name = wallet_type_name
  }

  get wallet_type_id() {
    return this.#wallet_type_id;
  }
  get wallet_type_name() {
    return this.#wallet_type_name;
  }

  set wallet_type_id(wallet_type_id) {
    this.#wallet_type_id = wallet_type_id;
  }
  set wallet_type_name(wallet_type_name) {
    this.#wallet_type_name = wallet_type_name;
  }

  toJSON() {
    let oTipoWallet = {
      wallet_type_id: this.#wallet_type_id,
      wallet_type_name: this.#wallet_type_name
    }
    return oTipoWallet;
  }
}

class Gestoria {
  async altaWallet(oWallet) {
    let datos = new FormData();

    datos.append("wallet", JSON.stringify(oWallet));

    let respuesta = await peticionPOST("alta_wallet.php", datos);

    return respuesta;

  }

  async getTiposWallet() {
    let datos = new FormData();

    let respuesta = await peticionGET("get_tipos_wallet.php", datos);

    return respuesta;
  }

  async buscarWallet(wallet_name) {
    let datos = new FormData();

    datos.append("wallet_name", wallet_name);

    let respuesta = await peticionPOST("buscar_wallet.php", datos);

    return respuesta;
  }

  async listadoWallets() {
        let listado = "";

        let respuesta = await peticionGET("get_wallets.php", new FormData());

        if (!respuesta.ok) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado += "<thead><tr><th>ID WALLET</th><th>WALLET NAME</th><th>CUSTOMER NAME</th><th>MONEY AMOUNT</th><th>CREATION DATE</th><th>DESCRIPTION</th><th>WALLET TYPE</th></tr></thead><tbody>";
            listado += "<tbody>";

            for (let wallet of respuesta.datos) {
                listado += "<tr><td>" + wallet.id_wallet + "</td>";
                listado += "<td>" + wallet.wallet_name + "</td>";
                listado += "<td>" + wallet.customer_name + "</td>";
                listado += "<td>" + wallet.money_amount + "</td>";
                listado += "<td>" + wallet.creation_date + "</td>";
                listado += "<td>" + wallet.description + "</td>";
                listado += "<td>" + wallet.wallet_type_name + "</td>";

            }
            listado += "</tbody></table>";
        }
      return listado;
  }

  async modificarWallet(oWallet) {
    let datos = new FormData();

    datos.append("wallet", JSON.stringify(oWallet));

    let respuesta = await peticionPOST("modificar_wallet.php", datos);

    return respuesta;
  }

  async obtenerClientePorTelefono(phone) {
    let parametros = new FormData();

    parametros.append("phone", phone);

    const data = await peticionPOST("get_cliente_por_telefono.php", parametros);

    return data.datos.id_customers;
  }

  async borrarWallet(id_wallet) {
        let datos = new FormData();

        datos.append("id_wallet", id_wallet);

        let respuesta = await peticionPOST("borrar_wallet.php", datos);

        return respuesta;
  }

  async listadoPorWalletType(wallet_type_id){
    let datos = new FormData();

    datos.append("wallet_type_id", wallet_type_id);

    let respuesta = await peticionGET("get_wallets_por_tipo.php", datos);

    return respuesta;
  }
}

