const request = require("request");
const forecast = (latitude, longitude, callback) => {
    const url =
        "https://api.weatherapi.com/v1/current.json?key=58c864ac23a44f47b24193945230301&q=" +
        latitude +
        "," +
        longitude +
        "&aqi=no";

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to fetch weather data", undefined);
        } else if (body.error) {
            callback(`${body.error.message}`, undefined);
        } else {
            callback(
                undefined,
                `${body.current.condition.text}. It is currently ${body.current.temp_f} degrees outside. It feels like ${body.current.feelslike_f} degrees outside.`
            );
        }
    });
};

module.exports = forecast;
