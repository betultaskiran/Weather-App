const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), { origin: "cors" }); //bir web sayfasının, kullanıcıdan izin almadan, başka bir kaynaktan veri almasını veya göndermesini engeller.
  const respData = await resp.json();

  console.log(respData);

  addWeatherToPage(respData); //Alınan veriyi sayfada görüntülemek için addWeatherToPage fonksiyonunu çağırır.
}

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp); //data nesnesi API'den gelen yanıtı içerir ve sıcaklık değeri main nesnesi altında temp anahtarı ile bulunur.

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
    `;

  // cleanup
  main.innerHTML = "";

  main.appendChild(weather);
}

function KtoC(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value; //Kullanıcının girdiği şehir adını alır.

  if (city) {
    getWeatherByLocation(city);
  }
});
