//  common variables declarations
const input = document.querySelector("#input-city");
const searchForm = document.querySelector(".search");
const apiKey = "26a1e74625a0488fa6c121139231611";
const api = "https://api.weatherapi.com/v1/current.json?key=";

// event listerner for search 
searchForm.addEventListener("submit",getData);


async function getData(e){
    e.preventDefault();

    let cityName = input.value;
    let response = await fetch(api+apiKey+"&q="+cityName+"&aqi=no");
    
    
    try{
        let data = await response.json();

        // feeding data to html elements
        document.querySelector("#city").innerText=data.location.name;
        document.querySelector("#temp").innerText=data.current.temp_c+"°C";
        document.querySelector("#weather-img").src=data.current.condition.icon;
        document.querySelector("#weather-img").alt=data.current.condition.text;
        document.querySelector("#humidity").innerText=data.current.humidity+"%";
        document.querySelector("#wind").innerText=data.current.wind_kph+"km/h";

        // removing the previous error
        document.querySelector(".error>p").style.display="none";
        // clearing texts in input field
        input.value = "";
        // showing the current weather
        document.querySelector(".weather").style.display="block";
    }

    catch{
        // removing the previous weather
        document.querySelector(".weather").style.display="none";
        // removing the current error
        document.querySelector(".error>p").style.display="block";
    }
    
}
