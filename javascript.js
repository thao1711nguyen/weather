const searchBox = document.querySelector('#search input')
const searchIcon = document.querySelector('#search ion-icon')
const cBtn = document.getElementById('c')
const fBtn = document.getElementById('f')

function displayTemp(data) {
    const temperature = document.querySelectorAll('#weather > h4')[0]
    if(temperature.dataset.unit === 'c') {
        temperature.textContent = `Temperature: ${data.current.temp_c}℃`
        temperature.dataset.value = data.current.temp_c
    } else {
        temperature.textContent = `Temperature: ${data.current.temp_f}℉`
        temperature.dataset.value = data.current.temp_f
    }
}
function displayWeather(data) {
    document.getElementById('error').classList.remove('display')
    document.getElementById('mid').classList.add('display')
    const location = document.querySelector('#mid > div > h2')
    const weatherCondition = document.querySelector('#weather > div > h4')
    const icon = document.querySelector('#weather > div > img')
    const humidity = document.querySelectorAll('#weather > h4')[1]
    const uv = document.querySelectorAll('#weather > h4')[2]

    location.textContent = `${data.location.name}, ${data.location.country}`
    weatherCondition.textContent = `${data.current.condition.text}`
    icon.src = `https:${data.current.condition.icon}`
    humidity.textContent = `Humidity: ${data.current.humidity}`
    uv.textContent = `UV: ${data.current.uv}`
    displayTemp(data)
}
function displayError(data) {
    document.getElementById('mid').classList.remove('display')
    document.getElementById('error').classList.add('display')
    const error = document.querySelector('#error > h2')
    error.textContent = `Error: ${data.error.message}`
}

async function howWeather(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=8779cc1017b04e75b0324657231609&q=${location}`
    
    const response = await fetch(url, {mode: 'cors'})
    const data = await response.json()
    if(response.ok) {
        displayWeather(data)
    } else {
        displayError(data)
    }
}
function changeTempUnit(unit) {
    const temperature = document.querySelectorAll('#weather > h4')[0]
    if(temperature.dataset.unit !== unit) {
        if(temperature.dataset.value !== "") {
            switch(unit) {
                case 'f':
                    const toF = ((+temperature.dataset.value * 9/5) + 32).toFixed(1)
                    temperature.dataset.value = toF
                    temperature.textContent = `Temperature: ${toF}℉`
                    break 
                default: 
                    const toC = ((+temperature.dataset.value - 32)*5/9).toFixed(1)
                    temperature.dataset.value = toC
                    temperature.textContent = `Temperature: ${toC}℃`
            }
        }
        temperature.dataset.unit = unit
    }
}
cBtn.addEventListener('click', () => {
    changeTempUnit('c')
    fBtn.classList.remove('clicked')
    cBtn.classList.add('clicked')
})
fBtn.addEventListener('click', () => {
    changeTempUnit('f')
    cBtn.classList.remove('clicked')
    fBtn.classList.add('clicked')
})
searchBox.addEventListener('keyup', async function(e) {
    if(e.key === 'Enter') {
        const location = searchBox.value
        await howWeather(location)
    }
})
searchIcon.addEventListener('click', async function() {
    const location = searchBox.value
    await howWeather(location)
})
