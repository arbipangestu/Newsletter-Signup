const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const app = express();
const https = require("https");
const port = 3000


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(__dirname + '/signup.html'));

app.post('/', function (req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/41f63b0285";

    const options = {
        method: "POST",
        auth: "arbi1:de62c43fcc7f72b6ccc2f0a1fbae904a-us18"
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});


app.post("/failure", function (req, res) {
    res.redirect("/");
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


//API Key
// de62c43fcc7f72b6ccc2f0a1fbae904a - us18

// list ID
// 41f63b0285