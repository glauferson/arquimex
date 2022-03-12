const Produto = require('../models/cliente.model');

module.exports = {
    async index(req, res){
        const cli = await Cliente.find();
        res.json(cli);
    },
    async create(req, res){
        const {nome_cliente, nome_reduzido_cliente, cpf_cnpj_cliente, endereco_cliente, cidade_cliente, uf_cliente,telefone_cliente,celular_cliente, email_cliente, contato_cliente} = req.body;

        let data = {};

        let cli = await Cliente.findOne({nome_cliente});

        if(!cli){
            data = {nome_cliente, nome_reduzido_cliente, cpf_cnpj_cliente, endereco_cliente, cidade_cliente, uf_cliente,telefone_cliente,celular_cliente, email_cliente, contato_cliente};
            cli = await Cliente.create(data);

            return res.status(200).json(cli);
        }else {
            return res.status(500).json(cli);
        }
    },
    async details(req,res){
        const {_id} = req.params;
        const cli = await Cliente.findOne({_id});
        res.json(cli);
    },
    async delete(req,res){
        const {_id} = req.params;
        const cli = await Produto.findByIdAndDelete({_id});
        res.json(cli);
    },
    async update(req,res){
        const { _id, nome_cliente, nome_reduzido_cliente, cpf_cnpj_cliente, endereco_cliente, cidade_cliente, uf_cliente,telefone_cliente,celular_cliente, email_cliente, contato_cliente} = req.body;
        const data = {nome_cliente, nome_reduzido_cliente, cpf_cnpj_cliente, endereco_cliente, cidade_cliente, uf_cliente,telefone_cliente,celular_cliente, email_cliente, contato_cliente};
        const cli = await Produto.findOneAndUpdate({_id},data,{new:true});
        res.json(cli);
    },
};