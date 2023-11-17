//  common variables declarations
const input = document.querySelector("#input-city");
const searchForm = document.querySelector(".search");
const apiKey = "Your api key here"; //you can get api from www.weatherapi.com  
const api = "https://api.weatherapi.com/v1/current.json?key=";

// event listerner for search 
searchForm.addEventListener("submit",getData);


async function getData(e){
    e.preventDefault();

    let data;
    
    try{
        let cityName = input.value;
        let response = await fetch(api+apiKey+"&q="+cityName+"&aqi=no");
        data = await response.json();

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

    catch(error){
        console.log(error);

        // removing the previous weather
        document.querySelector(".weather").style.display="none";
        // condition to check blank submit
        if(document.querySelector(".error>p").innerText = data.error.code==1003){
            document.querySelector(".error>p").innerText ="Please enter a location";
        }
        else{  
            document.querySelector(".error>p").innerText = data.error.message;
        }

        // removing the current error
        document.querySelector(".error>p").style.display="block";
        
    }
    
}
