const request = require("request");

const geocode = (address, callback) => {
    const url =
        "https://api.geoapify.com/v1/geocode/search?text=" +
        encodeURIComponent(address) +
        "&format=json&apiKey=ddf645429b3a4971ad5da5d51ad009a0&limit=1";

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (body.results.length === 0) {
            callback("Unable to find location. Try another search.", undefined);
        } else {
            callback(undefined, {
                latitude: body.results[0].lat,
                longitude: body.results[0].lon,
                location: body.results[0].formatted,
            });
        }
    });
};

module.exports = geocode;
