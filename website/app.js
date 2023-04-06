/* Global Variables */

// Personal API Key for OpenWeatherMap API

const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = 'InsertYourOwnApiKeyHere&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
const mNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let newDate = d.getDate() + '. '+ mNames[d.getMonth()] + ' ' + d.getFullYear();

//Get All Data
const getAllData = async() => {
    const res = await fetch('/all')
    try{
        const allData = await res.json()
            document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' °F';
            document.getElementById('content').innerHTML = allData.feel;
            document.getElementById('date').innerHTML = allData.date;
    } catch (err){
        console.log('ERROR', err)
    }
}
//Get Temp from OPENWEATHERMAP
const getTemp = async() => {
    const zip = document.getElementById('zip').value;
    const response = await fetch(baseURL + '?zip=' + zip + '&appid=' + apiKey)
    try {
        const weather = await response.json()     
        return weather.main.temp
    } catch(err) {
        console.log('ERROR', err)
    }
}
//Post new Entry
const postData = async(url='', data={}) => {
    const response = await fetch(url, {
        method:'POST', 
        credentials: 'same-origin', 
        headers: {  
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(data)
    });
    try {
        const res = await response; 
        return res;
    } catch(err) {
        console.log('ERROR', err)
    }
}

//clickHandler
const handlePostData = (e) => {
    e.preventDefault()
    getTemp()
        .then((TempResult) => {
            const feelGood = document.getElementById('feelings').value
            postData('/addEntry', {temp: TempResult, date: newDate, feel: feelGood}); 
        })
        .then(()=> {
            getAllData()
        }) 
}

const generateButton = document.getElementById('generate')
generateButton.addEventListener('click', handlePostData)

