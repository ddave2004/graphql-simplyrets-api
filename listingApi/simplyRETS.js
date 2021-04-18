/**
 * simplyrets API class to query properties.
 */
var btoa = require('btoa');
var fetch = require('cross-fetch')

const SIMPLYRETS_URL = "https://api.simplyrets.com/properties"

class simplyretsApi {

    constructor({ user, password }) {
        this._btoa = btoa(`${user}:${password}`)
    }

    GetPropertiesByCity(city = 'Houston') {

        var thiscontext = this
        //TODO : CACHING of Promise or DATA ??
        return new Promise((resolve, reject) => {

            fetch(`${SIMPLYRETS_URL}?cities=${city}`, {
                method: 'GET',
                headers: { 'Authorization': `Basic ${thiscontext._btoa}` }
            })
                .then(response => response.json())
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    console.error("simplyrets", error);
                    reject(error)
                });
        });
    }

    // init({ user, password }) {
    //     this._btoa = btoa(`${user}:${password}`)
    // }
}

module.exports = function (user, password) {
    return new simplyretsApi({
        user: user, //"simplyrets",
        password: password//"simplyrets"
    })
}
 //TODO : strategy of DEV vs PROD environment endpoint(if it is),  and auth credential.
 //TODO : Question :can this be singelton instance ?
