const countriesList = document.getElementById('countries-list');


const getCountries = async ()=>{
    try{
        const response = await fetch('https://restcountries.com/v3/all')
        if (!response.ok){
            throw new Error ('Error en la solicitud');
        }
        const countries = await response.json();
        return countries;
    }catch (error){
        console.error('error en la solicitud', error);
    }
}
const printCountries = (countries) =>{
    //ordenamos los paises alfabeticamente
    countries.sort((x,y)=> x.name.common.localeCompare(y.name.common));
        
    countries.forEach((country, i )=> {
        const { name, flags} = country;
         countriesList.innerHTML += `<div class='countryClass' value=${i}><img src='${flags[0]}' alt='${name.common}'/>
        <p>${name.common}</p></div>`
    });

    const countryClass = document.querySelectorAll('.countryClass');
    countryClass.forEach((country) => {
        country.addEventListener('click', ()=>{
            const arrayID = country.getAttribute('value');
            newWindow(countries, arrayID)
        })
    })
   
}

const newWindow = ((countries, id) =>{
     console.log(id);
    const {capital, population, name, flags, car} = countries[id];
    console.log(name.common, capital)
    const template = ` 
            <div class="containerCountry">
                <img src="${flags[1]}" alt="${name.common}"/>            
                <div class="datos">
                    <h2>${name.common}</h2>
                    <p>Capital: ${capital}</p>
                    <p>Población: ${population}</p>
                    <p>lado carretera: ${car.side}</p>
                </div>
            </div> 
            <button id="btnClose">Cerrar</button>`;
        
    const container = document.getElementById('container');
    container.classList.add('container');
    container.innerHTML = template;
    
    const boton = document.getElementById('btnClose');
    boton.addEventListener('click', () =>{
        container.innerHTML ='';
        container.classList.remove('container');
    })
})

getCountries().then((countries)=> printCountries(countries));

