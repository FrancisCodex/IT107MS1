const { Pool } = require("pg");

const pool = new Pool(process.env.DBURL);


module.exports = pool;
