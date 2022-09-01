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

fetchCountries(inputValue).then(createCountriesHtmlList)

}

function fetchCountries(name) {
return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
.then(response => {return response.json()})
}

function createCountriesHtmlList (countries) {
countries.map(({name, capital, population, flags, languages}) => 
{const template = 
`<li class="countries-item"><svg width="40" height="40"><use href=${flags.svg}></use></svg><span>${name.official}</span></li>`
    countriesListShown.insertAdjacentHTML('beforeend', template)})


}



    
    
   