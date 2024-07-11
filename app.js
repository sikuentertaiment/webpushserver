const axios = require('axios');
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

app.use(cors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.post("/save", async (req, res) => {
    if(await saveToken(req.body).valid);
        return res.json({ status: "Success", message: "Subscription saved!" })
    res.json({status:'Failed'});
})

app.post("/send",(req, res) => {
    req.body.forEach(async (data)=>{
        await sendMessage(data);
    })
    res.json({ "status": "Success", "message": "Message sent to push service" });
})

app.listen(port, () => {
    console.log("Server running on port 3000!");
})


const saveToken = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const response = await axios.post('https://wispay.biz.id/library/ajax/savesubs.php', data)
            console.log(response);
            resolve({valid:true});
        }catch(e){
            resolve({valid:false});
        }
    })
}

const sendMessage = (data)=>{
    return new Promise(async (resolve,reject)=>{
        if(!data.subscription || data.subscription === '')
            return resolve(true);
        const response = await webpush.sendNotification(data.subscription, JSON.stringify(data.notification));
        console.log(response);
        resolve(true);  
    })
}