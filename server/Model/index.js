
const { Pool, Client } = require('pg');
require("dotenv").config();
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Employee_Database",
    password: "admin",
    port: process.env.DB_PORT
})

pool.connect();

pool.query(`select * from hr.regions`, (err, result) => {
    if (!err) {
        console.log(result.rows);
    }
    pool.end
})

// //importing modules
// const {Sequelize, DataTypes} = require('sequelize')

// //Database connection with dialect of postgres specifying the database we are using
// //port for my database is 5433
// //database name is discover
// const sequelize = new Sequelize(`postgres://postgres:admin@localhost:5432/cosmos`, {dialect: "postgres"})

// //checking if connection is done
//     sequelize.authenticate().then(() => {
//         console.log(`Database connected to cosmos`)
//     }).catch((err) => {
//         console.log(err)
//     })

//     const db = {}
//     db.Sequelize = Sequelize
//     db.sequelize = sequelize

// //connecting to model
// db.users = require('./userModel') (sequelize, DataTypes)

// //exporting the module
// module.exports = db