const main = document.getElementById('main')
const addUser = document.getElementById('add-user')
const double = document.getElementById('double')
const showMill = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateBtn = document.getElementById('calculate-wealth')

let data = []

getRandomUser()
getRandomUser()
getRandomUser()

//fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/')
    const data = await res.json()

    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

function doubleMoney() {
    data = data.map(user => {
        return {
            ...user,
            money: user.money * 2
        }
    })

    updateDOM()
}

function sortByRichest() {
    data.sort((a, b) => {
        return b.money - a.money
    })

    updateDOM()
}

function showMillionaire() {
    data = data.filter(user => {
        return user.money > 1000000
    })
    updateDOM()
}

function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0)

    const wealthElement = document.createElement('div')
    wealthElement.innerHTML = `<h3>Total Wealth: ${formatMoney(wealth)}</h3>`
    main.appendChild(wealthElement)
}

function addData(obj) {
    data.push(obj)

    updateDOM()

}

//update dom
function updateDOM(providedData = data) {
    //clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

    providedData.forEach(item => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element)

    })
}

//format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//add a random user via btn
addUser.addEventListener('click', getRandomUser)
double.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMill.addEventListener('click', showMillionaire)
calculateBtn.addEventListener('click', calculateWealth)