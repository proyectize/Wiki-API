const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect('mongodb://wikiusr01:Gev652sQa@34.226.232.52:27017/wikiDB?authSource=wikiDB');

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", async (req, res) => {
    try {
        const foundArticles = await Article.find({});
        res.send(foundArticles);
        console.log(foundArticles);
    } catch (err) {
        console.log(err);
    }
});


app.listen(3000, function() {
    console.log("Server on port 3000");
});
