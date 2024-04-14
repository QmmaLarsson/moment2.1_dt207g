const { Client } = require("pg");
require("dotenv").config();

//Anslut till databas
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },

});

client.connect((err) => {
    if (err) {
        console.log("Fel vid anslutning: " + err)
    } else {
        console.log("Du är ansluten till databasen.")
    }
});

//Skapa tabell
client.query(`
    DROP TABLE IF EXISTS jobs;
    CREATE TABLE jobs(
        id SERIAL PRIMARY KEY,
        companyname VARCHAR(40),
        jobtitle VARCHAR(30),
        location VARCHAR (64),
        startdate DATE,
        enddate DATE
    )
    `);