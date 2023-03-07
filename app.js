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
    } catch (err) {
        console.log(err);
    }
});

app.post("/articles", async (req, res) => {
    try {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save().then(savedDoc => {
            savedDoc === newArticle;
        });
        res.send("Successfully added!")
    } catch (err) {
        res.send(err);
    }
})

app.delete("/articles", async (req, res) => {
    try {
        response = await Article.deleteMany()
        res.send("Successfully deleted all articles.")
    } catch (err) {
        res.send(err);
    }
});

app.listen(3000, function() {
    console.log("Server on port 3000");
});
