import Mysql from 'mysql';

const connection = Mysql.createConnection({
    host: "localhost",
    user: "root",
    pass: "2daw",
    database: "peluqueria",

});

export default connection;

/*
Connection.query("INSERT INTO usuarios (cod_usuario, user, pass) VALUES (NULL, '"+newName+"', "+newPass+"');", (err,result)=>{
    if(err){
        prompt("Error");
    }else{
        prompt("Éxito");
    }
})*/