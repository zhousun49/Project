const express = require('express')
const app = express();
// Setup server port
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const CaseRoute = require('./routes/case')

mongoose.connect("mongodb+srv://Sunzhou3:Sunzhou3@cluster0.ftmpt.mongodb.net/Cases1?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true, 
        useFindAndModify: false 
    }).then(() => console.log('DB Connected'));

let port = app.listen(process.env.PORT || 5000);
// Send message for default URL
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => res.send('Hello World with Express'));
// Launch app to listen to specified port
app.use('/api', CaseRoute)

app.listen(port, function () {
     console.log("Running Cases API on port " + port);
});