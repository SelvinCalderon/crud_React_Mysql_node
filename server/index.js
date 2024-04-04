const express = require ("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"p_react"
});

app.post("/create",(req,res)=>{
  const nombre = req.body.nombre;  
  const edad = req.body.edad;  
  const pais = req.body.pais;  
  const cargo = req.body.cargo;  
  const anios = req.body.anios;  

  db.query('INSERT INTO empleados (nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
  (err,result)=>{
    if (err){
        console.log(err);
    } else {
        res.send("Empleado registrado con exito!");
    }
  }
  );
});

app.get("/empleados",(req,res)=>{

    db.query('SELECT * FROM empleados', 
    (err,result)=>{
      if (err){
          console.log(err);
      } else {
          res.send(result);
      }
    }
    );
  });

  app.put("/update",(req,res)=>{
    const ID = req.body.ID;  
    const nombre = req.body.nombre;  
    const edad = req.body.edad;  
    const pais = req.body.pais;  
    const cargo = req.body.cargo;  
    const anios = req.body.anios;  
  /* En los corchetes los datos deben ser enviados en el orden en el que la consulta los esta recibiendo con '?' */
    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE ID=?',[nombre,edad,pais,cargo,anios,ID],
    (err,result)=>{
      if (err){
          console.log(err);
      } else {
          res.send("Empleado Actualizado!");
      }
    }
    );
  });

  app.delete("/delete/:ID",(req,res)=>{
    const ID = req.params.ID;  

    db.query('DELETE FROM empleados WHERE ID=?',[ID],
    (err,result)=>{
      if (err){
          console.log(err);
      } else {
          res.send("Empleado Eliminado!");
      }
    }
    );
  });



app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})