//-----------Core Node Modules-----------
const path = require("path");

//---------External NPM Modules----------
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 3000;

// Set-up static directory to serve
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

// Set-up handle bars engine engine and path to custom views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather Forecast",
        name: "Aang",
        description:
            "This app fetches weather information for specified locations. Begin by entering an address in the search bar below.",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Aang",
        movie: "Avatar",
    });
});

app.get("/help", (req, res) => {
    res.render("help", { title: "Help", name: "Aang" });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        res.send({ error: "Error! No address provided." });
        return;
    }

    const address = req.query.address;

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({ error: error });
            return;
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({ error: error });
                return;
            }

            res.send({
                address: address,
                forecast: forecastData,
                location: location,
            });
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "An error occured",
        errorMessage: "Help article not found",
        name: "...not available. Click to be redirected",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "An error occured",
        errorMessage: "Page not found",
        name: "...not available. Click to be redirected",
    });
});

app.listen(port, () => {
    console.log("Server is up and running on port: " + port);
});
