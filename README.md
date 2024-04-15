# Moment 2.1 i kursen DT207G, Backend-baserad webbutveckling

Detta är ett REST API som används för att hantera tidigare arbetslivserfarenheter. APIet är skapat med hjälp av NodeJs, Express och databasen Postgre. Webbtjänsten kan hantera CRUD-operationer, det vill säga CREATE, READ, UPDATE och DELETE.

### Installation av databas

APIet är kopplat till en Postgre-databas. För att komma igång, börja med att klona ned källkodsfilerna. Kör sedan kommandot "npm install" för att installera de nödvändiga npm-paketen. Slutligen, kör installations-skriptet "install.js".

### Användning av API

Nedan finns en beskriving av hur man på olika sätt kan nå APIet:

| Metod | Ändpunkt | Beskrivning |
|---|---|---|
| GET | /jobs | Hämtar alla jobb som finns tillagda i databasen |
| POST | /jobs/:id | Lägger till ett jobb till databasen |
| DELETE | jobs/:id | Raderar ett jobb från databasen |
| PUT | jobs/:id | Uppdaterar ett jobb från databasen (inte implementerad i nuläget) |

Ett objekt returneras med följande struktur:

{

id: 1

companyname: "Cairns Marine"

jobtitle: "Dykare"

location: "Cairns"

startdate: "2023-11-04"

enddate: "2024-03-04"

}
