// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const citySelector = document.querySelector("#city-selector");
const day_0 = document.querySelector("#day-0");
const day_1 = document.querySelector("#day-1");
const day_2 = document.querySelector("#day-2");



citySelector.addEventListener("change", process);
process();



var curentIndex = 0;





function process()
{

    // on prend la city qui est chargé a l'ecran et la transforme en key qui a été donné par le site de l'api
    var strCity = citySelector.options[citySelector.selectedIndex].value;
    var cityId = getCityId(strCity);
    // on transforme cette key en addresse
    var api = 'https://api.openweathermap.org/data/2.5/forecast?id='+cityId+'&APPID=9e28b421b8666bb6151577ee289baa64';
    // puis on recupere / analyse le tout
    getWeather(api).then(useWeather);

}

function getWeather(apiKey) 
{
    return fetch(apiKey).then(res => res.json());

}

function useWeather(weather)
{
    // l'api renvois un tableau ou il y'a le temps prevus toutes les 3 heures
    // il suffis donc d'utiliser les index list[0]  list[8]  list[16]
    // pour avoir le temps sur les 3 jours

    // on a donc  =>  weather['list'][0] 
    //            =>  weather['list'][8]
    //            =>  weather['list'][16]  
    setUi(weather['list'][0],day_0);
    setUi(weather['list'][8],day_1);
    setUi(weather['list'][16],day_2);


}

// when you want to visualy set the ui to the items
function setUi(JsonWeather , item)
{

    var temp = Math.round(parseFloat(JsonWeather["main"]["temp"]) - 273.15);
    var tempFL = Math.round(parseFloat(JsonWeather["main"]["feels_like"]) - 273.15);
    var wind = Math.round(parseFloat(JsonWeather["wind"]["speed"]) * 3.6);


    console.log(JsonWeather);
    setWeatherIcon(JsonWeather["weather"][0]["icon"] , item);


    item.querySelector("#temp").innerText = "Température : " + temp.toString() + "°C";
    item.querySelector("#wind").innerText = "Vent : " + wind.toString() + "km/h";
    item.querySelector("#hum").innerText = "Humiditée : " + parseFloat(JsonWeather["main"]["humidity"]) + "%";
    setSlide(curentIndex);
}

// permet de definir quelle image mettre sur un item en fonction de ce que envois l'api
function setWeatherIcon(icon, item){
    if(icon === '01n' || icon === '01d'){      item.querySelector("#img_icon").src = "img/sun.png";       item.querySelector("#img_icon").setAttribute('background',"img/sun.jpg") }
    else if(icon === '02n' || icon === '02d') {item.querySelector("#img_icon").src = "img/cloudy.png";    item.querySelector("#img_icon").setAttribute('background',"img/cloudy.jpg")}
    else if(icon === '03n' || icon === '03d') {item.querySelector("#img_icon").src = "img/cloud.png";     item.querySelector("#img_icon").setAttribute('background',"img/cloud.jpg")}
    else if(icon === '04n' || icon === '04d') {item.querySelector("#img_icon").src = "img/bigcloudy.png"; item.querySelector("#img_icon").setAttribute('background',"img/bigcloudy.jpg")}
    else if(icon === '09n' || icon === '09d') {item.querySelector("#img_icon").src = "img/rain.png";      item.querySelector("#img_icon").setAttribute('background',"img/rain.jpg")}
    else if(icon === '10n' || icon === '10d') {item.querySelector("#img_icon").src = "img/rain.png";      item.querySelector("#img_icon").setAttribute('background',"img/rain.jpg")}
    else if(icon === '11n' || icon === '11d') {item.querySelector("#img_icon").src = "img/storm.png";     item.querySelector("#img_icon").setAttribute('background',"img/storm.jpg")}
    else if(icon === '13n' || icon === '13d') {item.querySelector("#img_icon").src = "img/snow.png";      item.querySelector("#img_icon").setAttribute('background',"img/snow.jpg")}
    else if(icon === '15n' || icon === '15d') {item.querySelector("#img_icon").src = "img/windi.png";     item.querySelector("#img_icon").setAttribute('background',"img/windi.jpg")}
}

// on recuper l'id d'une ville a partir de son 
function getCityId(name)
{
    switch (name) {
        case 'ny':
          return '5128581';
        case 'pa':
            return '2968815';
        case 'mo':
            return '524894';
        case 'to':
            return '1850147';
        case 'sy':
            return '2147714';
        case '':
            return '2968815';
    }
}


function nextSlide(){
    if(curentIndex == 2)setSlide(0);
    else setSlide(curentIndex+1);
}

function prevSlide(){
    if(curentIndex == 0)setSlide(2);
    else setSlide(curentIndex-1);
}

function setSlide(index){

    if(index===0){
        day_0.style.display = "block";
        day_1.style.display = "none";
        day_2.style.display = "none";

        var str = day_0.querySelector("#img_icon").getAttribute('background');
        document.body.style.backgroundImage = "url('"+ str.toString() +"')";}


    if(index===1){
        day_0.style.display = "none";
        day_1.style.display = "block";
        day_2.style.display = "none";

        var str = day_1.querySelector("#img_icon").getAttribute('background');
        document.body.style.backgroundImage = "url('"+ str.toString() +"')";}


    if(index===2){
        day_0.style.display = "none";
        day_1.style.display = "none";
        day_2.style.display = "block";

        var str = day_2.querySelector("#img_icon").getAttribute('background');
        document.body.style.backgroundImage = "url('"+ str.toString() +"')";}


    curentIndex = index;
}