const axios = require('axios');

const openWeatherMapAPIURL = process.env.OPEN_WEATHER_MAP_API_URL;
const openWeatherMapAPIKey = process.env.OPEN_WEATHER_MAP_API_KEY;

module.exports = {
    getWeatherAsync: async function(queryParams) {
        /*
        prevent axios from throwing
        await axios({
        method: "GET",
        url: "https://example.com",
        validateStatus: () => true,
        }) */
        let res = await axios.get(formatUrl(queryParams))
        if (res.status == 200) {
            return {
                weather: convertToDTO(res.data),
                status: 200,
            }
        } else {
            return {
                status: res.status,
                message: res.message ?? 'Unknown Error'
            }
        }
    }
}

function convertToDTO(item) {
    console.log(item)
    return {
        temperature: item?.main?.temp ?? 'N/A',
        windSpeed: item?.wind?.speed ?? 'N/A'
    }
}

function formatUrl(queryParams) {
    let url = openWeatherMapAPIURL;
    
    for (const [key, value] of Object.entries(queryParams)) {
        url += `${key}=${value}&`
    }

    url += `units=imperial&`
    url += `appid=${openWeatherMapAPIKey}`
    console.log(url)
    return url
}
