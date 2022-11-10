const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "client")))
app.use(bodyParser.json())

const publicVapidKey = 'BJEHpRyYsV0YEDZOt7idN-Lf7MVIyiPAMwuyUllc2LZ5GsYKKdmfHYCiEmv4R6QmKHVpk5aNP6ygJjdW6-L4y-E';
const privateVapidKey = 'y9dh99BChu44GsSaSGOhblRnwVfb7KLakRnOZC458rI';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)

// Subscribe route
app.post('/subscribe', (req, res) => {
    //Get pushsubscription object
    const subscription = req.body;
    console.log(subscription);
    res.status(201).json({})

    //Create payload
    const payload = JSON.stringify({ title: "PUSH test" })

    //Pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
})

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))