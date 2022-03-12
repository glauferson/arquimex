const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome_cliente:String,
    nome_reduzido_cliente:String,
    cpf_cnpj_cliente:Number,
    endereco_cliente:String,
    cidade_cliente:String,
    uf_cliente:String,
    telefone_cliente:String,
    celular_cliente:String,
    email_cliente:String,
    contato_cliente:String
},{
    timestamps:true
});


const clientes = mongoose.model('Clientes', DataSchema);
module.exports = clientes;