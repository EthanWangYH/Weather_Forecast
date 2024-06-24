const apikey ="6affd8059cf109ba83cb65dc695acfa9";
const weatherFrom = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card =document.querySelector(".card");

weatherFrom.addEventListener("submit",async event=>{
 event.preventDefault();

 const city = cityInput.value;
 if(city){
 try{
    const weatherData = await getWeatherData(city);
    displayWeatherInfor(weatherData);
 }catch(error){
    console.error(error);
    displayError(error);
 }
 }else{
    displayError("Please enter an valid city name!!!");
 }

});

async function getWeatherData(city){
 const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
 const response = await fetch(apiUrl);
 if(!response.ok){
    throw new Error("could not fetch weather data");
 } 
return await response.json();
}

function displayWeatherInfor(data){
 const{name:city,
       main:{temp,humidity},
       weather:[{description,id}]} =data;
 console.log(description);
 card.textContent="";
 card.style.display = "flex";
 const cityDisplay = document.createElement("p");
 const tempDisplay = document.createElement("p");
 const humidityDisplay = document.createElement("p");
 const descDisplay = document.createElement("p");
 const weatherEmoji = document.createElement("p")
 cityDisplay.textContent = city;
 tempDisplay.textContent = `${((temp-273.15)*(9/5)+32).toFixed(1)}°F`;
 humidityDisplay.textContent =`Humidity: ${humidity}%`;
 descDisplay.textContent = description;
 weatherEmoji.textContent = getWeatherEmoji(id);
 cityDisplay.classList.add("cityDisplay");
 tempDisplay.classList.add("temDisplay");
 humidityDisplay.classList.add("humidityDisplay");
 descDisplay.classList.add("descDisplay");
 weatherEmoji.classList.add("weatherEmoji");

 card.appendChild(cityDisplay);
 card.appendChild(tempDisplay);
 card.appendChild(humidityDisplay);
 card.appendChild(descDisplay);
 card.appendChild(weatherEmoji);
} 
function getWeatherEmoji(weatherId){
 switch(true){
    case(weatherId>=200&&weatherId<300):
    return "⛈️";
    case(weatherId>=300&&weatherId<400):
    return "🌧️";
    case(weatherId>=500&&weatherId<600):
    return "🌧️";
    case(weatherId>=600&&weatherId<700):
    return "❄️";
    case(weatherId>=700&&weatherId<800):
    return "🌫️";
    case(weatherId===800):
    return "☀️";
    case(weatherId>=801&&weatherId<810):
    return "☁️";
    default:
        return "❔";
 }
}

function displayError(message){
 const errorDisplay = document.createElement("p");
 errorDisplay.textContent =message;
 errorDisplay.classList.add("errorDisplay");
 card.textContent="";
 card.style.display = "flex";
 card.appendChild(errorDisplay);
}