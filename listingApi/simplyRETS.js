/**
 * simplyrets API class to query properties.
 */
var btoa = require('btoa');
var fetch = require('cross-fetch')

const SIMPLYRETS_URL = "https://api.simplyrets.com/properties"

/**
 * @example
 * var api = new simplyRETS(simplyrets_user,simplyrets_password);
 * var listings = api.GetPropertiesByCity('Miami');
 */
class simplyretsApi {

    constructor({ user, password }) {
        this._btoa = btoa(`${user}:${password}`)
        this._ApiPromises = { }
    }

    _getApiPromise(city){
        
        if (this._ApiPromises[city] && !this._ApiPromises[city].resolved) {
            return this._ApiPromises[city];
        }

        var promise =  fetch(`${SIMPLYRETS_URL}?cities=${city}`, {
            method: 'GET',
            headers: { 'Authorization': `Basic ${this._btoa}` }
        });
        this._ApiPromises[city] = {
            prommise : promise,
            resolved: false,
            data : []
        }

        return promise;

    }
    _resolveApiPromise(city, data=[]) {
        if (this._ApiPromises[city]) {
            this._ApiPromises[city].resolved = true;
            this._ApiPromises[city].data = data 
        }
    }

    /**
     * Gets properties by city name
     * @param {String} city 
     * @returns [ Listting ]
     */
    GetPropertiesByCity(city = 'Houston') {
        //TODO : CACHING of Promise or DATA ??
        return new Promise((resolve, reject) => {
                this._getApiPromise(city)
                .then(response => response.json())
                .then(result => {
                    this._resolveApiPromise(city/*,result*/);//save data if we want caching
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
