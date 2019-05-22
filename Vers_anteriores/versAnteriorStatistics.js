

//........voy pegando el archivo statistics.js por bloques.a medida que se va modificando, para ser consciente del orden y los nuevos elementos que vamos introduciendo.......luego va por bloques y orden cronologico.

///////////////////////////////////
////primer bloque que pego/////////
///////////////////////////////////





//---------creating JSON object with statistics-------

let statistics = {
            "totalDem": 0,
            "tototalRep": 0,
            "totalInd": 0,
            "total": 0,
            "votesWithDem": 0,
            "votesWithRep": 0,
            "votesWithInd": 0,
            "totalVotesWith": 0,
            "least_engaged": [],
            "most_engaged": [],
            "least_loyal": [],
            "most_loyal": [],
            "totalStates": []

        }


//----------End JSON Obejct-----------------//

//--------Begining JS code for statistics ------//

var allMembers = data.results[0].members;
var count = allMembers.length
var partyType= ""
var totalDem = 0;
var totalRep = 0;
var totalInd = 0;
var total = 0


function calculateNumbers() {
        
    for (var i = 0; i < count; i++) {
        var partyType = allMembers[i].party;
        

       

        if (partyType == "D") {
            totalDem ++;
        } else {
            if (partyType == "R") {
                totalRep ++;
            } else {
                if (partyType == "I") {
                    totalInd ++;
                }
            } 
        } 
    } 
}

calculateNumbers()
var total = (totalDem+totalRep+totalInd)

///////////////////////////////////
////segundo bloque que pego/////////
///////////////////////////////////

//he creado las estadisticas y la tabla de glance, pero al crear las tablas de loyal y engaged, me doy cuenta de que solo he "captado" cifras en los arrays, no arrays con todos los datos de los candidatos. Pego lo que tenia antes de intentar solucionarlo, porque habra que hacer bastantes cambios:


//---------creating JSON object with statistics-------

var statistics = {
    "totalDem": 0,
    "totalRep": 0,
    "totalInd": 0,
    "total": 0,
    "votesWithDem": 0,
    "votesWithRep": 0,
    "votesWithInd": 0,
    "totalVotesWith": 0,
    "least_engaged": [],
    "most_engaged": [],
    "least_loyal": [],
    "most_loyal": [],
    "totalStates": []

}


//----------End JSON Obejct-----------------//

//--------Begining JS code for statistics ------//


//create variables needed for functions and to store values/arrays for JSON object//
var allMembers = data.results[0].members;
var count = allMembers.length
var partyType = ""
var totalDem = 0;
var totalRep = 0;
var totalInd = 0;
var total = 0;
var votesWithDem = 0;
var votesWithRep = 0;
var votesWithInd = 0;
var pctWithDem = 0;
var pctWithRep = 0;
var pctWithInd = 0;
var totalPctWithParty = 0;
var arrayMissedVotes = [];
var arrayLoyal = [];
var arrayVotesWparty = [];

function calculateNumbers() { 
    
    function membersNumber() { 

    for (var i = 0; i < count; i++) {
        partyType = (allMembers[i].party); //cambio var=partyType por partyType. sigue funncionando
        arrayVotesWparty[i] = allMembers[i].votes_with_party_pct; //hago lo msimo con este array, para poder anhadir el [i]. funciona.
        arrayMissedVotes[i] = allMembers[i].missed_votes_pct;
        




        if (partyType == "D") {
            totalDem++; //total members per party type

            var votesWithDemNumber = parseFloat(arrayVotesWparty[i]); //turn array into number stored in var.
            votesWithDem += votesWithDemNumber;//added every vote to var

        }
        if (partyType == "R") {

            totalRep++;
            var votesWithRepNumber = parseFloat(arrayVotesWparty[i]);
            votesWithRep += votesWithRepNumber;
        }
        if (partyType == "I") {

            totalInd++;
            var votesWithIndNumber = parseFloat(arrayVotesWparty[i]);
            votesWithInd += votesWithIndNumber;
        }
    }
    }
membersNumber()
    
   
}


calculateNumbers()

var total = (totalDem + totalRep + totalInd)
var totalPctWithParty = ((votesWithDem + votesWithRep + votesWithInd)/total).toFixed(2)+ "%";
var pctWithDem = (votesWithDem/totalDem).toFixed(2)+ "%";
var pctWithRep = (votesWithRep/totalRep).toFixed(2)+ "%";
var pctWithInd = (votesWithInd/totalInd).toFixed(2)+ "%";

//store VAR values in JSON fields


    statistics.totalDem = totalDem;
    statistics.totalRep = totalRep;
    statistics.totalInd = totalInd;
    statistics.total = total;
    statistics.votesWithDem = pctWithDem;
    statistics.votesWithRep = pctWithRep;
    statistics.votesWithInd = pctWithInd;
    statistics.totalVotesWith = totalPctWithParty;
    statistics.least_engaged = [],
    statistics.most_engaged = [],
    statistics.least_loyal = [],
    statistics.most_loyal = [],
    statistics.totalStates = []

// calculate least engaged 

var arrayLeastEngagedTotal = arrayMissedVotes.sort(function (a,b) {
                                        return (a - b)
                                        });
console.log(arrayLeastEngagedTotal)

// calculate 10% of all members

  var tenPctOfLength = (allMembers.length * 10) / 100 
  
// calculate least engaged. Missed more  votes .
  
  var leastEngagedArrayTen = [];
    for (i = 0; i < tenPctOfLength; i++) {
            leastEngagedArrayTen.push(arrayLeastEngagedTotal[i]);
        }
    statistics.least_engaged = leastEngagedArrayTen;

// calculate most engaged. MIssed less votes.

 var arrayMostEngagedTotal = arrayMissedVotes.sort(function(a,b) {
     return (b-a)
 }); //sorting arrayMissedVotes the other way around.

var mostEngagedArrayTen = [];
 for (i = 0; i < tenPctOfLength; i++) {
     mostEngagedArrayTen.push(arrayMostEngagedTotal[i]);
 }
statistics.most_engaged = mostEngagedArrayTen;

// Loyalty-------------------------

var arrayLeastLoyalTotal = arrayVotesWparty.sort(function (a,b) {
    return (a - b) 
}); // create array witht the full list of votes w/party sorted from - to +
    
// create array for the 10pct least loyal and caclculate.
var leastLoyalArrayTen = [] 

for (i = 0; i < tenPctOfLength; i++) {
    leastLoyalArrayTen.push(arrayLeastLoyalTotal[i]);
}
   statistics.least_loyal = leastLoyalArrayTen;                                        

// create array witht the most loyal full list sorted from + to -
var arrayMostLoyalTotal = arrayVotesWparty.sort(function (a,b) {
    return (b - a) 
});

 var arrayMostLoyalTen = [];
for (i = 0; i < tenPctOfLength; i++) {
    arrayMostLoyalTen.push(arrayLeastLoyalTotal[i]);
}

statistics.most_loyal = arrayMostLoyalTen;

// End of calculations ---------------------
 //Fill glance table ------

function glanceTable() {

        document.getElementById("cellR1").innerHTML = statistics.totalRep;
        document.getElementById("cellR2").innerHTML = statistics.votesWithRep;
        document.getElementById("cellD1").innerHTML = statistics.totalDem;
        document.getElementById("cellD2").innerHTML = statistics.votesWithDem;
        document.getElementById("cellI1").innerHTML = statistics.totalInd;
        document.getElementById("cellI2").innerHTML = statistics.votesWithInd;
        document.getElementById("cellT1").innerHTML = statistics.total;
        document.getElementById("cellT2").innerHTML = statistics.totalVotesWith;

    }

glanceTable()

// fill least engage table ----------


//function engageTable(statistics) {
//    var tbody = document.getElementById("leastEngaged")
//    // tbody.innerHTML = '';
//    
//    for (i = 0; i < statistics.least_engaged.length; i++ ) {
//        var row = document.createElement("tr");
//        var cell1 = document.createElement("td");
//        var cell2 = document.createElement("td");
//        var cell3 = document.createElement("td");
//        cell1.innerHTML = allMembers[i].first_name;
//        cell2.innerHTML = allMembers[i].missed_votes;
//        cell3.innerHTML = allMembers[i].missed_votes_pct;
//        
//        row.appendChild(cell1);
//        row.appendChild(cell2);
//        row.appendChild(cell3);
//        
//        tbody.appendChild(row);
//            
//        
//    }
//}
//engageTable()


//--------_FIN SEGUNDO BLOQUE---------------__-
//--------------------------------------------

///////////////////////////////////
////3er bloque que pego/////////
///////////////////////////////////
//Pego solo el bloque fundamental, el resto no cambia... 

//solucionado con hacer el arrayMost/LeastLoyal/EngagedTotal con AllMembers.sort ..no con lo que lo  hacia. A partir de ahi bien.
//Pero encuentro el problema del Orden. Con el bloque que pego abajo, cuando la parte de CALCULO 10%LEAST LOYAL , cambia el orden de las Var mostLoyalTotal anterior. Solo comentandolo, da los valores correctos. 




//---------creating JSON object with statistics-------

var statistics = {
    "totalDem": 0,
    "totalRep": 0,
    "totalInd": 0,
    "total": 0,
    "votesWithDem": 0,
    "votesWithRep": 0,
    "votesWithInd": 0,
    "totalVotesWith": 0,
    "least_engaged": [],
    "most_engaged": [],
    "least_loyal": [],
    "most_loyal": [],
    "totalStates": []

}


//----------End JSON Obejct-----------------//

//--------Begining JS code for statistics ------//


//create variables needed for functions and to store values/arrays for JSON object//
var allMembers = data.results[0].members;
var count = allMembers.length
var partyType = ""
var totalDem = 0;
var totalRep = 0;
var totalInd = 0;
var total = 0;
var votesWithDem = 0;
var votesWithRep = 0;
var votesWithInd = 0;
var pctWithDem = 0;
var pctWithRep = 0;
var pctWithInd = 0;
var totalPctWithParty = 0;
var arrayMissedVotes = [];
var arrayLoyal = [];
var arrayVotesWparty = [];

function calculateNumbers() {

    function membersNumber() {

        for (var i = 0; i < count; i++) {
            partyType = (allMembers[i].party); //cambio var=partyType por partyType. sigue funncionando
            arrayVotesWparty[i] = allMembers[i].votes_with_party_pct; //hago lo msimo con este array, para poder anhadir el [i]. funciona.
            arrayMissedVotes[i] = allMembers[i].missed_votes_pct;





            if (partyType == "D") {
                totalDem++; //total members per party type

                var votesWithDemNumber = parseFloat(arrayVotesWparty[i]); //turn array into number stored in var.
                votesWithDem += votesWithDemNumber; //added every vote to var

            }
            if (partyType == "R") {

                totalRep++;
                var votesWithRepNumber = parseFloat(arrayVotesWparty[i]);
                votesWithRep += votesWithRepNumber;
            }
            if (partyType == "I") {

                totalInd++;
                var votesWithIndNumber = parseFloat(arrayVotesWparty[i]);
                votesWithInd += votesWithIndNumber;
            }
        }
    }
    membersNumber()


}


calculateNumbers()

var total = (totalDem + totalRep + totalInd)
var totalPctWithParty = ((votesWithDem + votesWithRep + votesWithInd) / total).toFixed(2) + "%";
var pctWithDem = (votesWithDem / totalDem).toFixed(2) + "%";
var pctWithRep = (votesWithRep / totalRep).toFixed(2) + "%";
var pctWithInd = (votesWithInd / totalInd).toFixed(2) + "%";

//store VAR values in JSON fields


statistics.totalDem = totalDem;
statistics.totalRep = totalRep;
statistics.totalInd = totalInd;
statistics.total = total;
statistics.votesWithDem = pctWithDem;
statistics.votesWithRep = pctWithRep;
statistics.votesWithInd = pctWithInd;
statistics.totalVotesWith = totalPctWithParty;
//statistics.least_engaged = [],
//    statistics.most_engaged = [],
//    statistics.least_loyal = [],
//    statistics.most_loyal = [],
//    statistics.totalStates = []

// INICIO comento este bloque buscando solucion----------- 
//-----------INICIO intento solucion

// Calculate 10% MOST ENGAGED---------

//var arrayLeastEngagedTotal = [];
//
//arrayLeastEngagedTotal = allMembers.sort(function (a, b) {
//    return b.total_votes - a.total_votes;
//})
//console.log(arrayLeastEngagedTotal)






//Calculate 10% MOST LOYAL ------------

//create array with all members order according to Votes_with_party_pct descending
var arrayMostLoyalTotal = [];


arrayMostLoyalTotal = allMembers.sort(function (a, b) {
                return b.votes_with_party_pct - a.votes_with_party_pct;
            })
console.log(arrayMostLoyalTotal)

var tenPCtOfAll = (arrayMostLoyalTotal.length * 10) / 100 //get 10% number of all members 

console.log(tenPCtOfAll)

var mostLoyalArrayTen = [];

for (i = 0; i < tenPCtOfAll; i++) {
    mostLoyalArrayTen.push(arrayMostLoyalTotal[i]);
}//push array with 10% members into var 

console.log(arrayMostLoyalTotal)
console.log(mostLoyalArrayTen)
statistics.most_loyal = mostLoyalArrayTen; //push it into my JSON key


//// calculate 10% LEAST LOYAL -----------

var arrayLeastLoyal = []
var arrayLeastLoyalTotal = arrayMostLoyalTotal.reverse(); // reverse array MostEngaged order to get the array with least Engaged
console.log(arrayLeastLoyalTotal);

var leastLoyalArrayTen = [];
for (i = 0; i < tenPCtOfAll; i++) {
    leastLoyalArrayTen.push(arrayLeastLoyalTotal[i]);
}
console.log(leastLoyalArrayTen);
statistics.least_loyal = leastLoyalArrayTen;

// -------_FIN LOYAL 




//---------------Fin intento solucion 

//Fill glance table ------

function glanceTable() {

    document.getElementById("cellR1").innerHTML = statistics.totalRep;
    document.getElementById("cellR2").innerHTML = statistics.votesWithRep;
    document.getElementById("cellD1").innerHTML = statistics.totalDem;
    document.getElementById("cellD2").innerHTML = statistics.votesWithDem;
    document.getElementById("cellI1").innerHTML = statistics.totalInd;
    document.getElementById("cellI2").innerHTML = statistics.votesWithInd;
    document.getElementById("cellT1").innerHTML = statistics.total;
    document.getElementById("cellT2").innerHTML = statistics.totalVotesWith;

}

glanceTable()
// fill least engage table ----------





   

//function engageTable(statistics) {
//    var tbody = document.getElementById("leastEngaged")
//    // tbody.innerHTML = '';
//    
//    for (i = 0; i < statistics.least_engaged.length; i++ ) {
//        var row = document.createElement("tr");
//        var cell1 = document.createElement("td");
//        var cell2 = document.createElement("td");
//        var cell3 = document.createElement("td");
//        cell1.innerHTML = allMembers[i].first_name;
//        cell2.innerHTML = allMembers[i].missed_votes;
//        cell3.innerHTML = allMembers[i].missed_votes_pct;
//        
//        row.appendChild(cell1);
//        row.appendChild(cell2);
//        row.appendChild(cell3);
//        
//        tbody.appendChild(row);
//            
//        
//    }
//}
//engageTable()



///////////////////////////////////
////4o bloque que pego/////////
///////////////////////////////////

//Funcionan las tablas y cifras correctas.Aunque deberia crear 1 funcion para rellenar ambas tablas...

//---------creating JSON object with statistics-------

var statistics = {
    "totalDem": 0,
    "totalRep": 0,
    "totalInd": 0,
    "total": 0,
    "votesWithDem": 0,
    "votesWithRep": 0,
    "votesWithInd": 0,
    "totalVotesWith": 0,
    "least_engaged": [],
    "most_engaged": [],
    "least_loyal": [],
    "most_loyal": [],
    "totalStates": []

}


//----------End JSON Obejct-----------------//

//--------Begining JS code for statistics ------//


//create variables needed for functions and to store values/arrays for JSON object//
var allMembers = data.results[0].members;
var count = allMembers.length
var partyType = ""
var totalDem = 0;
var totalRep = 0;
var totalInd = 0;
var total = 0;
var votesWithDem = 0;
var votesWithRep = 0;
var votesWithInd = 0;
var pctWithDem = 0;
var pctWithRep = 0;
var pctWithInd = 0;
var totalPctWithParty = 0;
var arrayMissedVotes = [];
var arrayLoyal = [];
var arrayVotesWparty = [];

function calculateNumbers() {

    function membersNumber() {

        for (var i = 0; i < count; i++) {
            partyType = (allMembers[i].party); //cambio var=partyType por partyType. sigue funncionando
            arrayVotesWparty[i] = allMembers[i].votes_with_party_pct; //hago lo msimo con este array, para poder anhadir el [i]. funciona.
            arrayMissedVotes[i] = allMembers[i].missed_votes_pct;





            if (partyType == "D") {
                totalDem++; //total members per party type

                var votesWithDemNumber = parseFloat(arrayVotesWparty[i]); //turn array into number stored in var.
                votesWithDem += votesWithDemNumber; //added every vote to var

            }
            if (partyType == "R") {

                totalRep++;
                var votesWithRepNumber = parseFloat(arrayVotesWparty[i]);
                votesWithRep += votesWithRepNumber;
            }
            if (partyType == "I") {

                totalInd++;
                var votesWithIndNumber = parseFloat(arrayVotesWparty[i]);
                votesWithInd += votesWithIndNumber;
            }
        }
    }
    membersNumber()


}


calculateNumbers()

var total = (totalDem + totalRep + totalInd)
var totalPctWithParty = ((votesWithDem + votesWithRep + votesWithInd) / total).toFixed(2) + "%";
var pctWithDem = (votesWithDem / totalDem).toFixed(2) + "%";
var pctWithRep = (votesWithRep / totalRep).toFixed(2) + "%";
var pctWithInd = (votesWithInd / totalInd).toFixed(2) + "%";

//store VAR values in JSON fields


statistics.totalDem = totalDem;
statistics.totalRep = totalRep;
statistics.totalInd = totalInd;
statistics.total = total;
statistics.votesWithDem = pctWithDem;
statistics.votesWithRep = pctWithRep;
statistics.votesWithInd = pctWithInd;
statistics.totalVotesWith = totalPctWithParty;









//Calculate 10% MOST LOYAL ------------

//create array with all members order according to Votes_with_party_pct descending
var arrayMostLoyalTotal = [];


arrayMostLoyalTotal = allMembers.sort(function (a, b) {
    return b.votes_with_party_pct - a.votes_with_party_pct;
})
console.log(arrayMostLoyalTotal)

var tenPctOfAll = (arrayMostLoyalTotal.length * 10) / 100 //get 10% number of all members 

console.log(tenPctOfAll)

var mostLoyalArrayTen = [];

for (i = 0; i < tenPctOfAll; i++) {
    mostLoyalArrayTen.push(arrayMostLoyalTotal[i]);
} //push array with 10% members into var 

console.log(arrayMostLoyalTotal)
console.log(mostLoyalArrayTen)



//// calculate 10% LEAST LOYAL -----------

var arrayLeastLoyalTotal = []


var arrayLeastLoyalTotal = arrayMostLoyalTotal.reverse(); // reverse array MostEngaged order to get the array with least Engaged
console.log(arrayLeastLoyalTotal);

var leastLoyalArrayTen = [];
for (i = 0; i < tenPctOfAll; i++) {
    leastLoyalArrayTen.push(arrayLeastLoyalTotal[i]);
}
console.log(leastLoyalArrayTen);

var arrayMostLoyalTotal = arrayMostLoyalTotal.reverse()
console.log(arrayMostLoyalTotal)

// -------_FIN LOYAL 

// Calculate 10% MOST ENGAGED---------

var arrayMostEngagedTotal = [];

arrayMostEngagedTotal = allMembers.sort(function (a, b) {
    return a.missed_votes_pct - b.missed_votes_pct;
})
console.log(arrayMostEngagedTotal)

var mostEngagedArrayTen = [];

for (i = 0; i < tenPctOfAll; i++) {
    mostEngagedArrayTen.push(arrayMostEngagedTotal[i]);
} //push array with 10% members into var 

console.log(arrayMostEngagedTotal)
console.log(mostEngagedArrayTen)
 //push it into my JSON key


// CAlculate 10% LEAST ENGAGED---------

var leastEngagedArrayTen = [];
for (i = allMembers.length - 1; i > allMembers.length - tenPctOfAll - 1; i--) {
    leastEngagedArrayTen.push(arrayMostEngagedTotal[i]);
} //other way to reverse array (at the same time we calculate 10%). Need clarification(see link in javascrip bookmarks folder) (aun asi se siguen cambiando los valores anteriores en los console.logs ,,aunque los de statistics estan bien...)
console.log(leastEngagedArrayTen)


//---Store Loyal & Engaged Values in JSON-----

statistics.most_loyal = mostLoyalArrayTen;
statistics.least_loyal = leastLoyalArrayTen;
statistics.most_engaged = mostEngagedArrayTen;
statistics.least_engaged = leastEngagedArrayTen

//Fill glance table ------

function glanceTable() {

    document.getElementById("cellR1").innerHTML = statistics.totalRep;
    document.getElementById("cellR2").innerHTML = statistics.votesWithRep;
    document.getElementById("cellD1").innerHTML = statistics.totalDem;
    document.getElementById("cellD2").innerHTML = statistics.votesWithDem;
    document.getElementById("cellI1").innerHTML = statistics.totalInd;
    document.getElementById("cellI2").innerHTML = statistics.votesWithInd;
    document.getElementById("cellT1").innerHTML = statistics.total;
    document.getElementById("cellT2").innerHTML = statistics.totalVotesWith;

}

glanceTable()




// fill least engage table ----------



function leastEngagedTable() {
    var tbody = document.getElementById("leastEngaged")
     tbody.innerHTML = '';
    var statisticsLE = statistics.least_engaged;
    
    for (i = 0; i < statisticsLE.length; i++ ) {
        var row = document.createElement("tr");
        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");
        var cell3 = document.createElement("td");
        var nameLink = document.createElement('a');
        
        nameLink.innerHTML = statisticsLE[i].first_name + " " + (statisticsLE[i].middle_name || " ") + " " + statisticsLE[i].last_name;
        
        
        cell2.innerHTML = statisticsLE[i].missed_votes;
        cell3.innerHTML = statisticsLE[i].missed_votes_pct + "%"; //DUDA inicialmente ponia =allmembers[i].first_name, etc.. y listaba los de Most Engage
        
        nameLink.setAttribute('href', statisticsLE[i].url);
        cell1.appendChild(nameLink);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        
        tbody.appendChild(row);
            
        
    }
}
leastEngagedTable()

function mostEngagedTable() {
    var tbody = document.getElementById("MostEngaged")
    
    var statisticsME = statistics.most_engaged;
    
    for (i = 0; i < statisticsME.length; i++ ) {
        var row = document.createElement("tr");
        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");
        var cell3 = document.createElement("td");
        var nameLink = document.createElement('a');
        
        nameLink.innerHTML = statisticsME[i].first_name + " " + (statisticsME[i].middle_name || " ") + " " + statisticsME[i].last_name;
        cell2.innerHTML = statisticsME[i].missed_votes;
        cell3.innerHTML = statisticsME[i].missed_votes_pct + "%"; 
        
        nameLink.setAttribute('href', statisticsME[i].url);
        cell1.appendChild(nameLink);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        
        tbody.appendChild(row);
            
        
    }
}
mostEngagedTable()

///////////////////////////////////
////5o bloque que pego/////////
///////////////////////////////////


//con funciones funcionando y tablas ...pero al pasar a live/agregar fecth, la tabla de glance no funciona, y los sites de loyalty no cargan tablas "typerror 0 not defined" o algo asi.

var where = window.location.pathname;

if (where == "/Senate_attendance_statistics.html" || where == "/Senate_loyalty_statistcs.html") {
    where = "senate"; //EL PROBLEMA era el where == al otro lado del ||. Una vez eliminado funcionaba.
}
if (where == "/House_attendance_statistics.html" || where == "/House_loyalty_statistics.html") {
    where = "house";
}



//---------creating JSON object with statistics-------

var allMembers = []

        var statistics = {
    "totalDem": 0,
    "totalRep": 0,
    "totalInd": 0,
    "total": 0,
    "votesWithDem": 0,
    "votesWithRep": 0,
    "votesWithInd": 0,
    "totalVotesWith": 0,
    "least_engaged": [],
    "most_engaged": [],
    "least_loyal": [],
    "most_loyal": [],
    "totalStates": []

}
//----------End JSON Obejct-----------------//


var url = "https://api.propublica.org/congress/v1/113/"+where+"/members.json";

window.onload = function () {
    fetch(url, {
            method: "GET",
            headers: {
                "X-API-Key": "ojCxY84OXesmlD2Ajw8hT2VGOwysNzhWDdpEwDeX"
            }

        })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data.results[0].members);
            allMembers = data.results[0].members;
            calculateNumbers();
            allFunctions();

        })
        .catch(function(error) {
        console.log(error)
  });   

}

//--------Begining JS code for statistics ------//

//create variables needed for functions and to store values/arrays for JSON object//
//var allMembers = data.results[0].members;
var count = allMembers.length
var partyType = ""
var totalDem = 0;
var totalRep = 0;
var totalInd = 0;
var total = 0;
var votesWithDem = 0;
var votesWithRep = 0;
var votesWithInd = 0;
var pctWithDem = 0;
var pctWithRep = 0;
var pctWithInd = 0;
var totalPctWithParty = 0;
var arrayMissedVotes = [];
var arrayLoyal = [];
var arrayVotesWparty = [];





    


function calculateNumbers() {




    function membersNumber() {

        for (var i = 0; i < count; i++) {
            partyType = (allMembers[i].party); //cambio var=partyType por partyType. sigue funncionando
            arrayVotesWparty[i] = allMembers[i].votes_with_party_pct; //hago lo msimo con este array, para poder anhadir el [i]. funciona.
            arrayMissedVotes[i] = allMembers[i].missed_votes_pct;





            if (partyType == "D") {
                totalDem++; //total members per party type

                var votesWithDemNumber = parseFloat(arrayVotesWparty[i]); //turn array into number stored in var.
                votesWithDem += votesWithDemNumber; //added every vote to var

            }
            if (partyType == "R") {

                totalRep++;
                var votesWithRepNumber = parseFloat(arrayVotesWparty[i]);
                votesWithRep += votesWithRepNumber;
            }
            if (partyType == "I") {

                totalInd++;
                var votesWithIndNumber = parseFloat(arrayVotesWparty[i]);
                votesWithInd += votesWithIndNumber;
            }
        }
    }
    membersNumber()


}

calculateNumbers()


var total = (totalDem + totalRep + totalInd)
var totalPctWithParty = ((votesWithDem + votesWithRep + votesWithInd) / total).toFixed(2) + "%";
var pctWithDem = (votesWithDem / totalDem).toFixed(2) + "%";
var pctWithRep = (votesWithRep / totalRep).toFixed(2) + "%";
var pctWithInd = (votesWithInd / totalInd).toFixed(2) + "%";

//store VAR values in JSON fields


statistics.totalDem = totalDem;
statistics.totalRep = totalRep;
statistics.totalInd = totalInd;
statistics.total = total;
statistics.votesWithDem = pctWithDem;
statistics.votesWithRep = pctWithRep;
statistics.votesWithInd = pctWithInd;
statistics.totalVotesWith = totalPctWithParty;




function allFunctions() {




//Calculate 10% MOST LOYAL ------------

//create array with all members order according to Votes_with_party_pct descending
var arrayMostLoyalTotal = [];


arrayMostLoyalTotal = allMembers.sort(function (a, b) {
    return b.votes_with_party_pct - a.votes_with_party_pct;
})
console.log(arrayMostLoyalTotal)

var tenPctOfAll = (arrayMostLoyalTotal.length * 10) / 100 //get 10% number of all members 

console.log(tenPctOfAll)

var mostLoyalArrayTen = [];

for (i = 0; i < tenPctOfAll; i++) {
    mostLoyalArrayTen.push(arrayMostLoyalTotal[i]);
} //push array with 10% members into var 

//console.log(arrayMostLoyalTotal)
//console.log(mostLoyalArrayTen)



//// calculate 10% LEAST LOYAL -----------

var arrayLeastLoyalTotal = []


var arrayLeastLoyalTotal = arrayMostLoyalTotal.reverse(); // reverse array MostEngaged order to get the array with least Engaged
//console.log(arrayLeastLoyalTotal);

var leastLoyalArrayTen = [];
for (i = 0; i < tenPctOfAll; i++) {
    leastLoyalArrayTen.push(arrayLeastLoyalTotal[i]);
}
//console.log(leastLoyalArrayTen);

var arrayMostLoyalTotal = arrayMostLoyalTotal.reverse()
//console.log(arrayMostLoyalTotal)

// -------_FIN LOYAL 

// Calculate 10% MOST ENGAGED---------

var arrayMostEngagedTotal = [];

arrayMostEngagedTotal = allMembers.sort(function (a, b) {
    return a.missed_votes_pct - b.missed_votes_pct;
})
//console.log(arrayMostEngagedTotal)

var mostEngagedArrayTen = [];

for (i = 0; i < tenPctOfAll; i++) {
    mostEngagedArrayTen.push(arrayMostEngagedTotal[i]);
} //push array with 10% members into var 

//console.log(arrayMostEngagedTotal)
//console.log(mostEngagedArrayTen)
 //push it into my JSON key


// CAlculate 10% LEAST ENGAGED---------

var leastEngagedArrayTen = [];
for (i = allMembers.length - 1; i > allMembers.length - tenPctOfAll - 1; i--) {
    leastEngagedArrayTen.push(arrayMostEngagedTotal[i]);
} //other way to reverse array (at the same time we calculate 10%). Need clarification(see link in javascrip bookmarks folder) (aun asi se siguen cambiando los valores anteriores en los console.logs ,,aunque los de statistics estan bien...)
//console.log(leastEngagedArrayTen)


//---Store Loyal & Engaged Values in JSON-----

statistics.most_loyal = mostLoyalArrayTen;
statistics.least_loyal = leastLoyalArrayTen;
statistics.most_engaged = mostEngagedArrayTen;
statistics.least_engaged = leastEngagedArrayTen

//Fill glance table ------

function glanceTable() {

    document.getElementById("cellR1").innerHTML = statistics.totalRep;
    document.getElementById("cellR2").innerHTML = statistics.votesWithRep;
    document.getElementById("cellD1").innerHTML = statistics.totalDem;
    document.getElementById("cellD2").innerHTML = statistics.votesWithDem;
    document.getElementById("cellI1").innerHTML = statistics.totalInd;
    document.getElementById("cellI2").innerHTML = statistics.votesWithInd;
    document.getElementById("cellT1").innerHTML = statistics.total;
    document.getElementById("cellT2").innerHTML = statistics.totalVotesWith;

}

glanceTable()




// fill least engage table ----------



function leastEngagedTable() {
    var tbody = document.getElementById("leastEngaged")
     tbody.innerHTML = '';
    var statisticsLE = statistics.least_engaged;
    
    for (i = 0; i < statisticsLE.length; i++ ) {
        var row = document.createElement("tr");
        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");
        var cell3 = document.createElement("td");
        var nameLink = document.createElement('a');
        
        nameLink.innerHTML = statisticsLE[i].first_name + " " + (statisticsLE[i].middle_name || " ") + " " + statisticsLE[i].last_name;
        
        
        cell2.innerHTML = statisticsLE[i].missed_votes;
        cell3.innerHTML = statisticsLE[i].missed_votes_pct + "%"; //DUDA inicialmente ponia =allmembers[i].first_name, etc.. y listaba los de Most Engage
        
        nameLink.setAttribute('href', statisticsLE[i].url);
        cell1.appendChild(nameLink);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        
        tbody.appendChild(row);
            
        
    }
}
leastEngagedTable()

function mostEngagedTable() {
    var tbody = document.getElementById("MostEngaged")
    
    var statisticsME = statistics.most_engaged;
    
    for (i = 0; i < statisticsME.length; i++ ) {
        var row = document.createElement("tr");
        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");
        var cell3 = document.createElement("td");
        var nameLink = document.createElement('a');
        
        nameLink.innerHTML = statisticsME[i].first_name + " " + (statisticsME[i].middle_name || " ") + " " + statisticsME[i].last_name;
        cell2.innerHTML = statisticsME[i].missed_votes;
        cell3.innerHTML = statisticsME[i].missed_votes_pct + "%"; 
        
        nameLink.setAttribute('href', statisticsME[i].url);
        cell1.appendChild(nameLink);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        
        tbody.appendChild(row);
            
        
    }
}
mostEngagedTable()

};


///////////////////////////////////
////6o bloque que pego/////////
///////////////////////////////////


/// aqui ya estan solucinados problemas en fetch con octavia y funcionand las tablas PERO solo carga los datos de HOUSE .los dos If no funcionan como esperado

var where = window.location.pathname;

console.log(where)
if (where == "/Senate_attendance_statistics.html" || "/Senate_loyalty_statistcs.html") {
    where = "senate";
}
if (where == "/House_attendance_statistics.html" || "/House_loyalty_statistics.html") {
    where = "house";
}


//
//var allMembers = []

var statistics = {
    "totalDem": 0,
    "totalRep": 0,
    "totalInd": 0,
    "total": 0,
    "votesWithDem": 0,
    "votesWithRep": 0,
    "votesWithInd": 0,
    "totalVotesWith": 0,
    "least_engaged": [],
    "most_engaged": [],
    "least_loyal": [],
    "most_loyal": [],
    "totalStates": []

}

var url = "https://api.propublica.org/congress/v1/113/" + where + "/members.json";

window.onload = function () {
    fetch(url, {
            method: "GET",
            headers: {
                "X-API-Key": "ojCxY84OXesmlD2Ajw8hT2VGOwysNzhWDdpEwDeX"
            }

        })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data.results[0].members);
            var allMembers = data.results[0].members;
            membersNumber(allMembers);
            allFunctions(allMembers);
        })////////////////?OBSERBAR CAMBIOS HECHOS PARA QUE FUNCIONE FETCH
        .catch(function (error) {
            console.log(error)
        });

}
///////// esos cambios son basicamente para que las funciones no se ejecuten antes de que se hayan adquirido los datos. Importante el detalle de poner el var=allMembers =data....(creamos la variable dentro del bloque then) e incluirlo en las funciones..para que? para que en vez de estar fuera del .then block, este dentro.
//Obervar como va pasando el AllMembers dentro de las funciones que no funcionaban (y ya no hace falta llamarlas abajo al fin de la funcion)
//observar tambien todo el bloque de calculos y de almacenar las Var en Statistics que mueve dentro de la funcion membersNumber.



//var allMembers = data.results[0].members;
//var count = allMembers.length

var arrayMissedVotes = [];
var arrayLoyal = [];
var arrayVotesWparty = [];









function membersNumber(allMembers) {
    var partyType = ""
    var totalDem = 0;
    var totalRep = 0;
    var totalInd = 0;
    var total = 0;
    var votesWithDem = 0;
    var votesWithRep = 0;
    var votesWithInd = 0;
    var pctWithDem = 0;
    var pctWithRep = 0;
    var pctWithInd = 0;
    var totalPctWithParty = 0;


    console.log(allMembers)
    for (var i = 0; i < allMembers.length; i++) {
        partyType = (allMembers[i].party); //cambio var=partyType por partyType. sigue funncionando
        arrayVotesWparty[i] = allMembers[i].votes_with_party_pct; //hago lo msimo con este array, para poder anhadir el [i]. funciona.
        arrayMissedVotes[i] = allMembers[i].missed_votes_pct;





        if (partyType == "D") {
            totalDem++; //total members per party type

            var votesWithDemNumber = parseFloat(arrayVotesWparty[i]); //turn array into number stored in var.
            votesWithDem += votesWithDemNumber; //added every vote to var

        }
        if (partyType == "R") {

            totalRep++;
            var votesWithRepNumber = parseFloat(arrayVotesWparty[i]);
            votesWithRep += votesWithRepNumber;
        }
        if (partyType == "I") {

            totalInd++;
            var votesWithIndNumber = parseFloat(arrayVotesWparty[i]);
            votesWithInd += votesWithIndNumber;
        }
    }

    var total = (totalDem + totalRep + totalInd)
    var totalPctWithParty = ((votesWithDem + votesWithRep + votesWithInd) / total).toFixed(2) + "%";
    var pctWithDem = (votesWithDem / totalDem).toFixed(2) + "%";
    var pctWithRep = (votesWithRep / totalRep).toFixed(2) + "%";
    var pctWithInd = (votesWithInd / totalInd).toFixed(2) + "%";
    statistics.totalDem = totalDem;
    statistics.totalRep = totalRep;
    statistics.totalInd = totalInd;
    statistics.total = total;
    statistics.votesWithDem = pctWithDem;
    statistics.votesWithRep = pctWithRep;
    statistics.votesWithInd = pctWithInd;
    statistics.totalVotesWith = totalPctWithParty;
}
//membersNumber







//store VAR values in JSON fields





console.log(statistics.totalDem)

function allFunctions(allMembers) {




    //Calculate 10% MOST LOYAL ------------

    var arrayMostLoyalTotal = [];


    arrayMostLoyalTotal = allMembers.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    })
    console.log(arrayMostLoyalTotal)

    var tenPctOfAll = (arrayMostLoyalTotal.length * 10) / 100 //get 10% number of all members 

    console.log(tenPctOfAll)

    var mostLoyalArrayTen = [];

    for (i = 0; i < tenPctOfAll; i++) {
        mostLoyalArrayTen.push(arrayMostLoyalTotal[i]);
    }
    //console.log(arrayMostLoyalTotal)
    //console.log(mostLoyalArrayTen)



    //// calculate 10% LEAST LOYAL -----------

    var arrayLeastLoyalTotal = []


    var arrayLeastLoyalTotal = arrayMostLoyalTotal.reverse();
    //console.log(arrayLeastLoyalTotal);

    var leastLoyalArrayTen = [];
    for (i = 0; i < tenPctOfAll; i++) {
        leastLoyalArrayTen.push(arrayLeastLoyalTotal[i]);
    }
    //console.log(leastLoyalArrayTen);

    var arrayMostLoyalTotal = arrayMostLoyalTotal.reverse()
    //console.log(arrayMostLoyalTotal)



    // Calculate 10% MOST ENGAGED---------

    var arrayMostEngagedTotal = [];

    arrayMostEngagedTotal = allMembers.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
    })
    //console.log(arrayMostEngagedTotal)

    var mostEngagedArrayTen = [];

    for (i = 0; i < tenPctOfAll; i++) {
        mostEngagedArrayTen.push(arrayMostEngagedTotal[i]);
    }
    //console.log(arrayMostEngagedTotal)
    //console.log(mostEngagedArrayTen)



    // CAlculate 10% LEAST ENGAGED---------

    var leastEngagedArrayTen = [];
    for (i = allMembers.length - 1; i > allMembers.length - tenPctOfAll - 1; i--) {
        leastEngagedArrayTen.push(arrayMostEngagedTotal[i]);
    }


    //---Store Loyal & Engaged Values in JSON-----

    statistics.most_loyal = mostLoyalArrayTen;
    statistics.least_loyal = leastLoyalArrayTen;
    statistics.most_engaged = mostEngagedArrayTen;
    statistics.least_engaged = leastEngagedArrayTen

    //Fill glance table ------

    function glanceTable() {

        document.getElementById("cellR1").innerHTML = statistics.totalRep;
        document.getElementById("cellR2").innerHTML = statistics.votesWithRep;
        document.getElementById("cellD1").innerHTML = statistics.totalDem;
        document.getElementById("cellD2").innerHTML = statistics.votesWithDem;
        document.getElementById("cellI1").innerHTML = statistics.totalInd;
        document.getElementById("cellI2").innerHTML = statistics.votesWithInd;
        document.getElementById("cellT1").innerHTML = statistics.total;
        document.getElementById("cellT2").innerHTML = statistics.totalVotesWith;

    }

    glanceTable()




    // fill least engage table ----------



    function leastEngagedTable() {
        var tbody = document.getElementById("leastEngaged")
        tbody.innerHTML = '';
        var statisticsLE = statistics.least_engaged;

        for (i = 0; i < statisticsLE.length; i++) {
            var row = document.createElement("tr");
            var cell1 = document.createElement("td");
            var cell2 = document.createElement("td");
            var cell3 = document.createElement("td");
            var nameLink = document.createElement('a');

            nameLink.innerHTML = statisticsLE[i].first_name + " " + (statisticsLE[i].middle_name || " ") + " " + statisticsLE[i].last_name;


            cell2.innerHTML = statisticsLE[i].missed_votes;
            cell3.innerHTML = statisticsLE[i].missed_votes_pct + "%"; //DUDA inicialmente ponia =allmembers[i].first_name, etc.. y listaba los de Most Engage

            nameLink.setAttribute('href', statisticsLE[i].url);
            cell1.appendChild(nameLink);
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);

            tbody.appendChild(row);


        }
    }
    leastEngagedTable()

    function mostEngagedTable() {
        var tbody = document.getElementById("MostEngaged")

        var statisticsME = statistics.most_engaged;

        for (i = 0; i < statisticsME.length; i++) {
            var row = document.createElement("tr");
            var cell1 = document.createElement("td");
            var cell2 = document.createElement("td");
            var cell3 = document.createElement("td");
            var nameLink = document.createElement('a');

            nameLink.innerHTML = statisticsME[i].first_name + " " + (statisticsME[i].middle_name || " ") + " " + statisticsME[i].last_name;
            cell2.innerHTML = statisticsME[i].missed_votes;
            cell3.innerHTML = statisticsME[i].missed_votes_pct + "%";

            nameLink.setAttribute('href', statisticsME[i].url);
            cell1.appendChild(nameLink);
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);

            tbody.appendChild(row);


        }
    }
    mostEngagedTable()

};