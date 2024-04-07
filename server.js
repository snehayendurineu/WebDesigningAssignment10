const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes/userRouter');
const cors = require('cors');
const path = require('path');

const PORT = 8080;
const app = express()

//app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))
app.use("/images", express.static('images'));

app.use('/', routes);

module.exports = app;
