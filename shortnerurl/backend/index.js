const express = require('express');
const app = express();
const mongoose = require('mongoose')
const shortUrl = require('./model/shorturl.model');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost/URLshort')

app.get('/', async (req, res) => {
    const info = await shortUrl.find().lean().exec();
    // console.log(info)
    res.send(info)
})
app.get('/:short', async (req, res) => {
    // console.log("in short url",req.params.short);
    const url = await shortUrl.find({ short_url: req.params.short })
    console.log(url);
    // console.log("The url is ",url[0].full_url);
    res.send(url);

})
app.post('/url', async (req, res) => {
    // console.log(req.body.Name);
    const short_url = await shortUrl.create(req.body);
    // console.log(short_url);
    // console.log("In the post request of url",req.body);
    res.send("Hello world");
})
app.listen(5000, () => {
    console.log("listening on the port 8080")
})