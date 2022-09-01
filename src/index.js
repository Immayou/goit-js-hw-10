import './css/styles.css';
import debounce from "lodash.debounce";
import handlebars from "handlebars";
import Notiflix from "notiflix";

const DEBOUNCE_DELAY = 300;
const countryInput = document.querySelector('#search-box')
const countriesListShown = document.querySelector('.country-list')
const countriesInfoShown = document.querySelector('.country-info')

countryInput.addEventListener('input', debounce(onSearchCountryInput, DEBOUNCE_DELAY))

function onSearchCountryInput(evt) {
evt.preventDefault()
const inputValue = evt.target.value.trim()

if (inputValue !== '') {
    fetchCountries(inputValue).then(createCountriesHtmlList).catch(notFoundCountry)
} else {
    countriesInfoShown.innerHTML = ''
    countriesListShown.innerHTML = ''
}
}

function fetchCountries(name) {
return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
.then(response => {return response.json()})
}

function createCountriesHtmlList (countries) {
countries.map(({name, capital, population, flags, languages}) => {
    const templateCountry = 
    `<li class="country-item">
    <img width="40" height="30" src=${flags.svg} alt="Flag" class="image-flag">
    <span>${name.official}</span></li>`
    countriesListShown.insertAdjacentHTML('beforeend', templateCountry)})

if (countriesListShown.children.length === 1) {
    createCountriesHtmlInfo (countries) 
} else if (countriesListShown.children.length > 10) {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
} 
}


function createCountriesHtmlInfo (country) {
    const templateInfo = 
    `<p class="country-info">Capital: ${country[0].capital}</p>
     <p class="country-info">Population: ${country[0].population}</p>
     <p class="country-info">Languages: ${Object.values(country[0].languages)}</p>`
    countriesInfoShown.insertAdjacentHTML('beforeend', templateInfo)
    }
    
function notFoundCountry () {
    Notiflix.Notify.failure("Oops, there is no country with that name")
}


    
    
   