let searchBtn = document.getElementById("search-btn");
let country = document.getElementById("user-inp");

searchBtn.addEventListener("click", () => {
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
      console.log(data);
      country.value = "";
      searchBtn.classList.add("btndisplay");
    })

    .catch(() => {
      if (countryName.length == 0) {
        result.innerHTML = `<h3>You have not entered any value</h3>`;
      } else {
        // location.reload();
        result.innerHTML = `<h3>The country you entered is invalid, check spelling and try again.</h3>`;
      }
    });
  country.addEventListener("focus", function () {
    searchBtn.classList.remove("btndisplay");
  });
});
