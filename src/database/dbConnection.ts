import * as mysql from "mysql2/promise";

export const  MySQL_Connection = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"advik@1626",
    database:"nest_ejs",
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
})