let searchBtn = document.getElementById("search-btn");
let country = document.getElementById("user-inp");
let loader = document.querySelector(".loader");

const afterLoad = () => {
  loader.style.opacity = 1;
  country.value = "";
  searchBtn.classList.add("btndisplay");
};
const err = () => {
  if (!data) {
    alert("wrong input, check spelling. No countries found");
    location.reload();
  }
};
// function addCommas(str) {
//   var result = "";
//   for (var i = 0; i < str.length; i++) {
//     if (i % 3 === 0 && i !== 0) {
//       result += ",";
//     }
//     result += str.charAt(i);
//   }
//   return result;
// }

let data;
const load = () => {
  loader.style.opacity = 1;
  let countryName = country.value;
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  console.log(finalURL);
  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
      result.innerHTML = `
      <div class="flags">
        <div class="coats">
          <img src="${data[0].flags.svg}" class="flag-img">
          <p class="flagTitle">Flag</p>
        </div>
        <div class="coats2">
            <img src="${data[0].coatOfArms.svg}" class="flag-img">
            <p class="flagTitle">Coat Of Arms</p>
        </div>
      </div>
      </div>
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continent:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Population:</h4>
                <span>${data[0].population} People</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Currency:</h4>
                <span>${
                  data[0].currencies[Object.keys(data[0].currencies)].name
                } - ${Object.keys(data[0].currencies)[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Common Languages:</h4>
                <span>${Object.values(data[0].languages)
                  .toString()
                  .split(",")
                  .join(", ")}</span>
            </div>
        </div>
      `;
      afterLoad();
      loader.style.opacity = 0;
    })

    .catch(() => {
      err();
    });
  country.addEventListener("focus", function () {
    searchBtn.classList.remove("btndisplay");
  });
};

searchBtn.addEventListener("click", load);
