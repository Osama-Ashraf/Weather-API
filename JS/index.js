const today = document.getElementById('today');
const tomorrow = document.getElementById('tomorrow');
const afterTomorrow = document.getElementById('afterTomorrow');
const search = document.getElementById('search');
const regex = /[A-z a-z]{3}/;
let city = 'cairo';
const date = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

today.children[0].children[0].innerHTML = days[date.getDay()];
today.children[0].children[1].innerHTML = `${date.getDate()} ${months[date.getMonth()]}`;

if(days[date.getDay() == 6]){
    tomorrow.children[0].innerHTML = days[0];
    afterTomorrow.children[0].innerHTML = days[1];
}
else if(date.getDay() +1 == 6){
    tomorrow.children[0].innerHTML = days[6];
    afterTomorrow.children[0].innerHTML = days[0];
}
else{
    tomorrow.children[0].innerHTML = days[date.getDay() + 1];
    afterTomorrow.children[0].innerHTML = days[date.getDay() +2];
}

async function getCurrentWeather(city){
    let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=93983e29f7d34b53a34144426232402&q=${city}`);
    let finalResponse = await response.json();
    today.children[1].children[0].innerHTML = finalResponse.location.name;
    today.children[1].children[1].innerHTML = `${finalResponse.current.temp_c} ℃`;
    today.children[1].children[2].setAttribute('src' , finalResponse.current.condition.icon);
    today.children[1].children[3].innerHTML = finalResponse.current.condition.text;
}

async function getForcastWeather(city){
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=93983e29f7d34b53a34144426232402&q=${city}&days=3`);
    let finalResponse = await response.json();
    //first day
    tomorrow.children[1].children[0].setAttribute('src' ,finalResponse.forecast.forecastday[1].day.condition.icon ); 
    tomorrow.children[1].children[1].innerHTML = finalResponse.forecast.forecastday[1].day.maxtemp_c;
    tomorrow.children[1].children[2].innerHTML = finalResponse.forecast.forecastday[1].day.mintemp_c;
    tomorrow.children[1].children[3].innerHTML = finalResponse.forecast.forecastday[1].day.condition.text;

    //second day
    afterTomorrow.children[1].children[0].setAttribute('src' ,finalResponse.forecast.forecastday[1].day.condition.icon ); 
    afterTomorrow.children[1].children[1].innerHTML = finalResponse.forecast.forecastday[2].day.maxtemp_c;
    afterTomorrow.children[1].children[2].innerHTML = finalResponse.forecast.forecastday[2].day.mintemp_c;
    afterTomorrow.children[1].children[3].innerHTML = finalResponse.forecast.forecastday[2].day.condition.text;
    
}

async function searchLocation(term){
    await getCurrentWeather(term);
    await getForcastWeather(term); 
}

async function getWeather(){
    await getCurrentWeather('cairo');
    await getForcastWeather('cairo');
    search.addEventListener('input', function(){
        if(regex.test(search.value)){
            searchLocation(search.value);
            
        }
    })
}

getWeather();





