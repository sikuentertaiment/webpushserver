const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors")

const port = 3000;

const apiKeys = {
    publicKey: "BCX7s7xCODtfqtTP92eRSv9ICc6tPLxs8aDHEMMssoxXs_A1TWGFGxK7UHWrKdVex5n5in_w6o5Pq39AWzTdk0U",
    privateKey: "blttpBIkqo5S23pnuDaJHlHhC9KZ4DVtXnbhEkLKDQw"
}

webpush.setVapidDetails(
    'mailto:YOUR_MAILTO_STRING',
    apiKeys.publicKey,
    apiKeys.privateKey
)

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
})

const subDatabse = [];


app.post("/save-subscription", (req, res) => {
    console.log(req.body);
    subDatabse.push(req.body);
    res.json({ status: "Success", message: "Subscription saved!" })
})

app.get("/send-notification", (req, res) => {
    webpush.sendNotification(subDatabse[0], "Hello world");
    res.json({ "statue": "Success", "message": "Message sent to push service" });
})

app.listen(port, () => {
    console.log("Server running on port 3000!");
})