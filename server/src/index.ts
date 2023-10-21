import express from "express";
import { db_con } from "./conexion";

const app = express();
app.use(express.json());
const PORT = 3001;

app.get("/ping", (_req, res) => {
  console.log(res);
  res.send("pong");
});

app.get("/verifyUser", (_req, res) => {
  db_con.connect((resp) => {
    console.log(resp, res);
  });
});
app.post("/createUser/:data", (req, res) => {
  const { name, password } = JSON.parse(req.params.data);
  db_con.connect(() => {
    const sql = `INSERT INTO user (user_name, password, rol) VALUES ("${name}","${password}", "admin");`;
    console.log(sql);
    db_con.query(sql, (err) => console.log(err));
  });
  res.send(200);
});
app.listen(PORT, () => {
  console.log(" Server running on port 3001");
});
