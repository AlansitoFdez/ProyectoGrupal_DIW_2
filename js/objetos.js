"use strict"

//Clase Stock Type
class Stock_type {
    #stock_type_id;
    #stock_type_name;
    #stock_type_quality;

    constructor(stock_type_id, stock_type_name, stock_type_quality) {
        this.#stock_type_id = stock_type_id;
        this.#stock_type_name = stock_type_name;
        this.#stock_type_quality = stock_type_quality;
    }

    get stock_type_id() { return this.#stock_type_id}
    set stock_type_id(stock_type_id) { this.#stock_type_id = stock_type_id}

    get stock_type_name() { return this.#stock_type_name}
    set stock_type_name(stock_type_name) { this.#stock_type_name = stock_type_name}

    get stock_type_quality() { return this.#stock_type_quality}
    set stock_type_quality(stock_type_quality) { this.#stock_type_quality = stock_type_quality}

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

    async modificarStock(id_stock, stock_name, quantity, stock_type_id)  {
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