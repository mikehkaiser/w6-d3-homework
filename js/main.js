/* 
    I had a really hard time with this. At around 11 I started
    looking at code from Adam and Jesse to make sense of things.
    I can understand what they are doing, and obviously I borrowed 
    a lot from them, especially Adam, but I did retype all the code 
    that is here myself and did a few things my own way. 
    Honestly, just accessing the data was the hardest part, since it
    seemed to be a step beyond what we did in class.
*/

// defining variables
let form = document.querySelector('#which-season');
let table = document.querySelector('.driver-results')
let season_query = document.querySelector('#season-input');
let round_query = document.querySelector('#round-input');
let submit_message = document.createElement('h3');
let message_div = document.getElementById('lineup');


// getting data from the api
const apiFetch = async (season_query, round_query) =>{
    let response = await axios.get(`https://ergast.com/api/f1/${season_query}/${round_query}/driverStandings.json`)
    console.log(response.data)
    return response.data
};

// playing around with building the tables dynamically
const Ergast_data = {
    driver_rows: '.driver-results'
}

// add event listener to submit button to create a message upon pushing button
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    submit_message.innerHTML = "The results are in!";
    message_div.append(submit_message);
    let season = event.path[0][0].value
    let round = event.path[0][1].value
    console.log(`Season: ${season} Round: ${round}`)
});

// add another listener to add data to table
form.addEventListener('submit', async (event) =>{
    let season = event.path[0][0].value
    let round = event.path[0][1].value
    const drivers = await apiFetch(season, round)
    for(let i = 0; i<7; i++){
    let driver_name = `${drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName} ${drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName}`;
    let nationality = `${drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.nationality}`;
    let sponsor = `${drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Constructors[0].name}`;
    let points = `${drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points}`;
    document.getElementById("name" + String(i)).innerHTML = `${driver_name}`
    document.getElementById("nationality" + String(i)).innerHTML = `${nationality}`
    document.getElementById("sponsor" + String(i)).innerHTML = `${sponsor}`
    document.getElementById("points" + String(i)).innerHTML = `${points}`
    }
})
