const { Client } = require("pg");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

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
        console.log("Du är ansluten till databasen")
    }
});

app.use(cors());
app.use(express.json());

//Routes
app.get("/api", (req, res) => {
    res.json({ message: "välkommen till mitt API" })
});

//GET-rout för att hämta jobb
app.get("/api/jobs", (req, res) => {
    client.query(`SELECT id, companyname, jobtitle, location, TO_CHAR(startdate, 'YYYY-MM-DD') AS startdate, TO_CHAR(enddate, 'YYYY-MM-DD') AS enddate FROM jobs;`, (err, results) => {
        //Hantering av fel
        if (err) {
            res.status(500).json({ error: "Något gick fel: " + err });
            return;
        }

        //Resultat
        if (results.rows.length === 0) {
            res.status(404).json({ message: "Inga jobb hittades" });
        } else {
            res.json(results.rows);
        }
    });
});

//POST-rout för att lägga till nytt jobb
app.post("/api/jobs", (req, res) => {
    let id = req.body.id;
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;

    //Hantering av fel
    let errors = {
        message: "",
        detail: "",
        https_response: {

        }
    };

    if (!companyname || !jobtitle || !location || !startdate || !enddate) {
        //Error meddelande
        errors.message = "All information är inte ifylld";
        errors.detail = "Du måste fylla i all information i JSON";

        //Responskod för fel
        errors.https_response.message = "Bad Request";
        errors.https_response.code = 400;

        //Returnera felmeddelande och sluta köra funktionen
        res.status(400).json(errors);
        return;
    }

    client.query(`INSERT INTO jobs(companyname, jobtitle, location, startdate, enddate) VALUES ($1, $2, $3, $4, $5)`, [companyname, jobtitle, location, startdate, enddate], (err, results) => {
        //Hantering av fel
        if (err) {
            res.status(500).json({ error: "Något gick fel: " + err });
            return;
        }

        console.log("Fråga skickad " + results);

        let jobs = {
            companyname: companyname,
            jobtitle: jobtitle,
            location: location,
            startdate: startdate,
            enddate: enddate
        }

        res.json({ message: "Nytt jobb tillagt", jobs });
    });
});

//PUT-rout för att uppdatera ett befintligt jobb
app.put("/api/jobs/:id", (req, res) => {
    res.json({ message: "Jobb uppdaterat: " + req.params.id });
});

//DELETE-rout för att radera ett befintligt jobb
app.delete("/api/jobs/:id", (req, res) => {
    let jobId = req.params.id;

    client.query(`DELETE FROM jobs WHERE id = $1`, [jobId], (err, results) => {
        //Hantering av fel
        if (err) {
            res.status(500).json({ error: "Något gick fel: " + err });
            return;
        }

        //Om inget jobb hittas
        if (results.rowCount === 0) {
            res.status(404).json({ message: "Inget jobb hittades" });
            return;
        }

        //Om jobbet raderas
        res.json({ message: "Jobb borttaget: " + jobId });
    });
});

//Starta servern
app.listen(port, () => {
    console.log("Servern är startad på port: " + port)
});