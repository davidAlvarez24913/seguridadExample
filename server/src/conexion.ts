import mysql from "mysql";
export const db_con = mysql.createConnection({
  host: "localhost",
  user: "seguridad",
  password: "david",
  database: "seguridad",
});

db_con.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database");
  }
});
