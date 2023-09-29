const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DBNAME,
    password: process.env.DB_PASSW,
    port: process.env.DB_PORT
});

module.exports = pool;

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