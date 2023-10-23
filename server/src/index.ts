import express from "express";
import { db_con } from "./conexion";

const app = express();
app.use(express.json());
const PORT = 3001;

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/verifyUser/:data", (req, res) => {
  const { name } = JSON.parse(req.params.data);

  db_con.connect(() => {
    const sql = `select u.rol from user as u where u.user_name = "${name}";`;
    console.log(sql);

    db_con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ error: "Error en la consulta de la base de datos" });
      } else if (result && result.length > 0) {
        const { rol } = result[0]; // Extraer el valor de rol de la primera fila
        console.log(rol);
      } else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
    });
    res.json({ rol: "asda" }).status(200);
  });
});
app.post("/createUser/:data", (req, res) => {
  const { name, password } = JSON.parse(req.params.data);
  db_con.connect(() => {
    const sql = `INSERT INTO user (user_name, password, rol) VALUES ("${name}","${password}", "user");`;
    db_con.query(sql, (err) => console.log(err));
  });
  res.send(200);
});
app.listen(PORT, () => {
  console.log(" Server running on port 3001");
});
