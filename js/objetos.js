"use strict";

/**
 * Clase Moneda
 */
class Currency {
    #currency_id;
    #customer_name;
    constructor(currency_id, customer_name) {
        this.#currency_id = currency_id;
        this.#customer_name = customer_name;
    }
    get currency_id() { return this.#currency_id; }
    set currency_id(valor) { this.#currency_id = valor; }
    get customer_name() { return this.#customer_name; }
    set customer_name(valor) { this.#customer_name = valor; }
    toJSON() {
        let oCurrency =  {
            currency_id: this.#currency_id,
            customer_name: this.#customer_name 
        };
        return oCurrency;
    }
    
}

/**
 * Clase Cliente
 */
class Customer {
    #id_customers;
    #customer_name;
    #phone;
    #customer_active;
    #birthdate;
    #currency_id;
    constructor(id_customers, customer_name, phone, customer_active, birthdate, currency_id) {
        this.#id_customers = id_customers;
        this.#customer_name = customer_name;
        this.#phone = phone;
        this.#customer_active = customer_active;
        this.#birthdate = birthdate;
        this.#currency_id = currency_id;
    }
    get id_customers() { return this.#id_customers; }
    set id_customers(valor) { this.#id_customers = valor; }
    get customer_name() { return this.#customer_name; }
    set customer_name(valor) { this.#customer_name = valor; }
    get phone() { return this.#phone; }
    set phone(valor) { this.#phone = valor; }
    get customer_active() { return this.#customer_active; }
    set customer_active(valor) { this.#customer_active = valor; }
    get birthdate() { return this.#birthdate; }
    set birthdate(valor) { this.#birthdate = valor; }
    get currency_id() { return this.#currency_id; }
    set currency_id(valor) { this.#currency_id = valor; }
    toJSON() {
        let oCustomer = {
            id_customers: this.#id_customers,
            customer_name: this.#customer_name,
            phone: this.#phone,
            customer_active: this.#customer_active,
            birthdate: this.#birthdate,
            currency_id: this.#currency_id
        };
        return oCustomer;
    }
}

//----------------------------------------------Wallet----------------------------------------------------------------------------

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
    
    id_wallet,
    money_amount,
    wallet_name,
    wallet_active,
    creation_date,
    description,
    wallet_type_id_FK,
    customers_id_FK
    
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

//---------------------------------------------------------------------Stocks-----------------------------------------------------------------------------

class Stock_type {
  #stock_type_id;
  #stock_type_name;
  #stock_type_quality;

  constructor(stock_type_id, stock_type_name, stock_type_quality) {
    this.#stock_type_id = stock_type_id;
    this.#stock_type_name = stock_type_name;
    this.#stock_type_quality = stock_type_quality;
  }

  get stock_type_id() { return this.#stock_type_id }
  set stock_type_id(stock_type_id) { this.#stock_type_id = stock_type_id }

  get stock_type_name() { return this.#stock_type_name }
  set stock_type_name(stock_type_name) { this.#stock_type_name = stock_type_name }

  get stock_type_quality() { return this.#stock_type_quality }
  set stock_type_quality(stock_type_quality) { this.#stock_type_quality = stock_type_quality }

  toJSON() {
    return {
      stock_type_id: this.#stock_type_id,
      stock_type_name: this.#stock_type_name,
      stock_type_quality: this.#stock_type_quality
    };
  }
}

//Clase Stocks
class Stock {
  #id_stocks;
  #quantity;
  #stock_name;
  #in_use;
  #added_date;
  #wallet_id_FK;
  #stock_type_id_FK;

  constructor(id_stocks, quantity, stock_name, in_use, added_date, wallet_id_FK, stock_type_id_FK) {
    this.#id_stocks = id_stocks;
    this.#quantity = quantity;
    this.#stock_name = stock_name;
    this.#in_use = in_use;
    this.#added_date = added_date;
    this.#wallet_id_FK = wallet_id_FK;
    this.#stock_type_id_FK = stock_type_id_FK;
  }

  get id_stocks() {
    return this.#id_stocks;
  }
  set id_stocks(id_stocks) {
    this.#id_stocks = id_stocks;
  }

  get quantity() {
    return this.#quantity;
  }
  set quantity(quantity) {
    this.#quantity = quantity;
  }

  get stock_name() {
    return this.#stock_name;
  }
  set stock_name(stock_name) {
    this.#stock_name = stock_name;
  }

  get in_use() {
    return this.#in_use;
  }
  set in_use(in_use) {
    this.#in_use = in_use;
  }

  get added_date() {
    return this.#added_date;
  }
  set added_date(added_date) {
    this.#added_date = added_date;
  }

  get wallet_id_FK() {
    return this.#wallet_id_FK;
  }
  set wallet_id_FK(wallet_id_FK) {
    this.#wallet_id_FK = wallet_id_FK;
  }

  get stock_type_id_FK() {
    return this.#stock_type_id_FK;
  }
  set stock_type_id_FK(stock_type_id_FK) {
    this.#stock_type_id_FK = stock_type_id_FK;
  }

  toJSON() {
    return {
      id_stocks: this.#id_stocks,
      quantity: this.#quantity,
      stock_name: this.#stock_name,
      in_use: this.#in_use,
      added_date: this.#added_date,
      wallet_id_FK: this.#wallet_id_FK,
      stock_type_id_FK: this.#stock_type_id_FK
    };
  }
}




class Gestoria {

  async altaCliente(oCliente) {
        let datos = new FormData();
        datos.append("cliente", JSON.stringify(oCliente));
        return await peticionPOST("alta_cliente.php", datos);
    }

    async modificarCliente(oCliente) {
        let datos = new FormData();
        datos.append("cliente", JSON.stringify(oCliente.toJSON()));
        return await peticionPOST("editar_cliente.php", datos);
    }    
    
    async getClientes() {
        let datos = new FormData();
        return await peticionGET("listar_clientes.php", datos);
    }

    async buscarCliente(customer_name) {
        let datos = new FormData();
        datos.append("customer_name", customer_name);
        return await peticionPOST("buscar_cliente.php", datos);
    }

    async borrarCliente(id_customers) {
        let datos = new FormData();
        datos.append("id_cliente", id_customers);
        return await peticionPOST("borrar_cliente.php", datos);
    }

    async getMonedas() {
        let datos = new FormData();
        let respuesta = await peticionGET("get_monedas.php", datos);
        return respuesta
    }

    async listarClientesPorMoneda(currency_id) {
        let datos = new FormData();
        datos.append("currency_id", currency_id);
        return await peticionGET("listar_clientes_moneda.php", datos);
    }

//--------------------------------------------------------Wallet-------------------------------------------------------

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

  async listadoPorWalletType(wallet_type_id) {
    let datos = new FormData();

    datos.append("wallet_type_id", wallet_type_id);

    let respuesta = await peticionGET("get_wallets_por_tipo.php", datos);

    return respuesta;
  }

  //------------------------------------------------------------------Stocks--------------------------------------------------------------

  async getTiposStock() {
    let datos = new FormData();

    let respuesta = await peticionGET("get_tipos_stock.php", datos);

    return respuesta;
  }

  async altaStock(oStock) {
    let datos = new FormData();

    datos.append("stock", JSON.stringify(oStock));

    let respuesta = await peticionPOST("alta_stock.php", datos);

    return respuesta;
  }

  async obtenerIdWallet(wallet_name) {
    let datos = new FormData();

    datos.append("wallet_name", wallet_name);

    let respuesta = await peticionGET("id_wallet_para_stock.php", datos);

    if (respuesta.ok) {
      return respuesta.datos;
    } else {
      alert(respuesta.mensaje);
    }
  }

  async buscarStock(stock_name) {
    let datos = new FormData();

    datos.append("stock_name", stock_name);

    let respuesta = await peticionGET("busca_stock.php", datos);

    return respuesta;
  }

  async obtenerListadoStockTipos(id_tipo) {
    let datos = new FormData();

    datos.append("id_tipo", id_tipo);

    let respuesta = await peticionGET("get_listado_stocks_tipo.php", datos);

    return respuesta;
  }

  async modificarStock(id_stock, stock_name, quantity, stock_type_id) {
    let datos = new FormData();

    datos.append("id_stock", id_stock);
    datos.append("stock_name", stock_name);
    datos.append("quantity", quantity);
    datos.append("stock_type_id", stock_type_id);

    let respuesta = await peticionPOST("modificar_stock.php", datos);

    return respuesta;
  }

  async listadoStocks() {
    let respuesta = await peticionGET("listado_stocks.php", new FormData());
    let listado = "";

    if (!respuesta.ok) {
      listado += respuesta.mensaje;
    } else {
      listado += "<table class='table table-striped'>";
      listado += "<thead><tr><th>STOCK NAME</th><th>QUANTITY</th><th>WALLET NAME</th><th>ADDED DATE</th><th>STOCK TYPE</th></tr></thead>";
      listado += "<tbody>";

      for (let stock of respuesta.datos) {
        listado += "<tr>";
        listado += "<td>" + stock.stock_name + "</td>";
        listado += "<td>" + stock.quantity + "</td>";
        listado += "<td>" + stock.wallet_name + "</td>";
        listado += "<td>" + stock.added_date + "</td>";
        listado += "<td>" + stock.stock_type_name + "</td>";
        listado += "</tr>";
      }

      listado += "</tbody></table>";
    }
    return listado;
  }

  async borrarStock(id_stock) {
    let datos = new FormData();

    datos.append("id_stock", id_stock);

    let respuesta = await peticionPOST("borrar_stock.php", datos);

    return respuesta;
  }
}






