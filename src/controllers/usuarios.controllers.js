const Usuario = require('../models/usuario.model');
const jwt = require("jsonwebtoken");
//const { checkout } = require('../routes');
const secret = "mysecret";

module.exports = {
    async index(req, res){
        const user = await Usuario.find();
        res.json(user);
    },
    async create(req, res){
        const {nome_usuario, tipo_usuario, senha_usuario, contato_usuario} = req.body;

        let data = {};

        let user = await Usuario.findOne({nome_usuario});


        if(!user){
            data = {nome_usuario, tipo_usuario, senha_usuario, contato_usuario};
            user = await Usuario.create(data);

            return res.status(200).json(user);
        }else {
            return res.status(500).json(user);
        }
    },
    async details(req,res){
        const {_id} = req.params;
        const user = await Usuario.findOne({_id});
        res.json(user);
    },
    async delete(req,res){
        const {_id} = req.params;
        const user = await Usuario.findByIdAndDelete({_id});
        res.json(user);
    },
    async update(req,res){
        const { _id, nome_usuario, tipo_usuario, senha_usuario, contato_usuario} = req.body;
        const data = {nome_usuario, tipo_usuario, senha_usuario, contato_usuario};
        const user = await Usuario.findOneAndUpdate({_id},data,{new:true});
        res.json(user);
    },
    async login(req,res){
        const {nome,senha} = req.body;
        Usuario.findOne({nome_usuario:nome}, function (err,user) {
            if(err) {
                console.log(err);
                res.status(200).json({erro: "Erro no servidor. Por favor, tente novamente"});
            }else if (!user) {
                res.status(200).json({status:2, error: "Nome de usuário ou senha não conferem"});
            }else {
                user.isCorrectPassword(senha, async function (err, same){
                    if(err){
                        res.status(200).json({error: "Erro no servidor. Por favor, tente novamente"})
                    }else if (!same) {
                        res.status(200).json({status:2, error: "Nome de usuário ou senha não conferem"});
                    }else {
                        const payload = { nome };
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '24h'
                        });
                        res.cookie('token', token, {heepOnly: true});
                        res.status(200).json({status:1, auth:true, token:token, id_client:user._id, user_name:user.nome_usuario, user_type:user.tipo_usuario});
                    }
                });
            }
        })
    },
    async checkToken(req,res){
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
        if(!token){
            res.json({status:401,msg:'Não autorizado: Token inexistente!'});
        }else{
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.json({status:401,msg:'Não autorizado: Token inválido!'});
                }else{
                    res.json({status:200})
                }
            })
        }
    },
    async destroyToken(req,res){
        const token = req.headers.token;
        if(token){
            res.cookie('token',null,{httpOnly:true});
        }else{
            res.status(401).send("Logout não autorizado!")
        }
        res.send("Sessão finalizada com sucesso!");
    }
};