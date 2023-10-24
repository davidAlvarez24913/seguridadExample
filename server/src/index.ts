import express from "express";
import { db_con } from "./conexion";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.post("/verifyUser/:name/:password", (req, res) => {
  const name = req.params.name;
  const password = req.params.password;

  db_con.connect(() => {
    const sql = `select u.rol from user as u where u.user_name = "${name}" and u.password = "${password}";`;
    // console.log(sql);

    db_con.query(sql, (err, result) => {
      if (err) {
        // console.log(err);
        res
          .status(500)
          .json({ error: "Error en la consulta de la base de datos" });
      } else if (result && result.length > 0) {
        const { rol } = result[0]; // Extraer el valor de rol de la primera fila
        // console.log(rol);
        res.json({ rol: rol }).status(200);
      } else {
        res.status(404).json("Usuario no encontrado");
      }
    });
  });
});
app.post("/createUser/:data", (req, res) => {
  const { name, password } = JSON.parse(req.params.data);
  db_con.connect(() => {
    const sql = `INSERT INTO user (user_name, password, rol) VALUES ("${name}","${password}", "user");`;
    db_con.query(sql, (err) => console.log(err));
  });
  res.status(200);
});

app.listen(PORT, () => {
  console.log(" Server running on port 3001");
});

app.post("/allusers", (_req, res) => {
  db_con.connect(() => {
    const sql = `select user_name, rol from user;`;
    db_con.query(sql, (err, result) => {
      if (err) {
        // console.log(err);
        res
          .status(500)
          .json({ error: "Error en la consulta de la base de datos" });
      } else if (result && result.length > 0) {
        res.json({ users: result }).status(200);
      } else {
        res.status(404).json("");
      }
    });
  });
});
