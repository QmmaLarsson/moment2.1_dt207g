const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//Routes
app.get("/api", (req, res) => {
    res.json({ message: "välkommen till mitt API" })
});

//GET-rout för att hämta jobb
app.get("/api/jobs", (req, res) => {
    res.json({ message: "Hämta jobb" });
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

    if (!id || !companyname || !jobtitle || !location || !startdate || !enddate) {
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

    let jobs = {
        id: id,
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate
    }

    res.json({ message: "Nytt jobb tillagt", jobs });
});

//PUT-rout för att uppdatera ett befintligt jobb
app.put("/api/jobs/:id", (req, res) => {
    res.json({ message: "Jobb uppdaterat: " + req.params.id });
});

//DELETE-rout för att radera ett befintligt jobb
app.delete("/api/jobs/:id", (req, res) => {
    res.json({ message: "Jobb borttaget: " + req.params.id });
});

//Lyssna på angiven port
app.listen(port, () => {
    console.log("Server is running on port: " + port)
});