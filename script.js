let covid19data;

// Cette fonction est appelée dès que la page est chargée
(function onLoad()
{
    setButtonFunctions();
    getLatestCOVID19Data();
})();

// Cette fonction définit les fonctions de bouton
function setButtonFunctions()
{
    // Lorsque l'utilisateur sélectionne un pays les statistiques pour ce pays sont affichées
    document.getElementById('countries').onchange = function() {
        let selectedValue = document.getElementById('countries').value;
        let countryData = covid19data.filter(c => c.country == selectedValue)[0];


        let NouveauxCas = document.getElementById('NouveauxCas');
        let TotalCas = document.getElementById('TotalCas');
        let NouveauxDécès = document.getElementById('NouveauxDécès');
        let TotalDécès = document.getElementById('TotalDécès');
        let Date = document.getElementById('Date');

        // Afficher les statistiques pour le pays sélectionné
        (countryData.cases.new) ? NouveauxCas.innerHTML = 'Nouveaux cas confirmés: ' + countryData.cases.new : NouveauxCas.innerHTML = 'Nouveaux cas confirmés: 0';
        (countryData.cases.total) ? TotalCas.innerHTML = 'Total des cas confirmés: ' + countryData.cases.total : TotalCas.innerHTML = 'Total des cas confirmés: 0';
        (countryData.deaths.new) ? NouveauxDécès.innerHTML = 'Nouveaux décès: ' + countryData.deaths.new : NouveauxDécès.innerHTML = 'Nouveaux décès: 0';
        (countryData.deaths.total) ? TotalDécès.innerHTML = 'Décès totaux:' + countryData.deaths.total : TotalDécès.innerHTML = 'Décès totaux: 0';
        Date.innerHTML = 'Dernière mise à jour: ' + countryData.day;
    };
}

// Cette fonction récupère les dernières données COVID-19.
function getLatestCOVID19Data() {
    fetch("https://covid-193.p.rapidapi.com/statistics", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            'X-RapidAPI-Key': '26fac2d393msh757428e7ddd32f8p1c7137jsnf56d93c39f43',
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("COVID 19 API object:");
        console.log(response);

        // Trier les pays par ordre alphabétique
        response.response.sort((a, b) => a.country.localeCompare(b.country));

        // Ajouter chaque pays comme option dans la liste déroulante
        response.response.forEach(c => {
            let option = document.createElement('option');
            option.innerHTML = c.country;
            document.getElementById('countries').appendChild(option);   
        })

        // Stocker les données COVID-19 dans une variable globale
        covid19data = response.response;
    })
    .catch(err => {
        console.log(err);
    });
}
