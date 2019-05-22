var where = window.location.pathname;

console.log(where)
if (where == "/senate_attendance_statistics.html" || where == "/senate_loyalty_statistics.html") {
    where = "senate";
}
if (where == "/house_attendance_statistics.html" || where == "/house_loyalty_statistics.html") {
    where = "house";
}
//
//if (where.includes("senate")) {
//    where = "senate";
//}
//if (where.includes("house")) {
//    where = "house";
//}

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
        })
        .catch(function (error) {
            console.log(error)
        });

}





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
    var pctWithInd = ((votesWithInd / totalInd).toFixed(2) + "%");
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
//    console.log(arrayMostLoyalTotal)
//    console.log(mostLoyalArrayTen)



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
//    console.log(mostEngagedArrayTen)


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




    // If function to select which betweem Engagment or loyalty tables to be executed
    
    function selectTable() {
    
        
        
        switch (window.location.pathname) {
            case ("/senate_attendance_statistics.html" ) :
                console.log("1");
                leastEngagedTable();
                mostEngagedTable();
                break;
            case ("/house_attendance_statistics.html") :
                console.log("2");
                leastEngagedTable();
                mostEngagedTable();
                break;
            case ("/senate_loyalty_statistics.html") :
                console.log("3");
                leastLoyalTable();
                mostLoyalTable();
                break;
            case ("/house_loyalty_statistics.html") :
                console.log("4");
                leastLoyalTable();
                mostLoyalTable();
                break;
            default :
                console.log("Something went wrong");

        }
        
    //Con IFs no funciona. ...tengo que preguntar porque.
//    if (window.location.pathname == "/Senate_attendance_statistics.html" ) {        
//        console.log("1"); 
//        leastEngagedTable();
//        
//        }
//     if (window.location.pathname == "/House_attendance_statistics.html") {
//        console.log("2");
//            mostEngagedTable();
//        }
//         if (window.location.pathname == "/Senate_loyalty_statistics.html") {
//            console.log("3");            
//            leastLoyalTable;
//        }
//        
//            
//    
//         if (window.location.pathname == "/House_loyalty_statistics.html" ) 
//         {
//         
//            console.log("4");
//            mostLoyalTable;
//        }

    }
    
    selectTable()




    
    
    
    };

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
            cell3.innerHTML = statisticsLE[i].missed_votes_pct + "%"; 

            nameLink.setAttribute('href', statisticsLE[i].url);
            cell1.appendChild(nameLink);
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);

            tbody.appendChild(row);


        }
    }
    

    function mostEngagedTable() {
        var tbody = document.getElementById("mostEngaged")
        tbody.innerHTML = '';
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
    


    
    

    function leastLoyalTable() {
        var tbody = document.getElementById("leastLoyal")
        tbody.innerHTML = '';
        var statisticsLeastLoyal = statistics.least_loyal;

        for (i = 0; i < statisticsLeastLoyal.length; i++) {
            var row = document.createElement("tr");
            var cell1 = document.createElement("td");
            var cell2 = document.createElement("td");
            var cell3 = document.createElement("td");
            var nameLink = document.createElement('a');

            nameLink.innerHTML = statisticsLeastLoyal[i].first_name + " " + (statisticsLeastLoyal[i].middle_name || " ") + " " + statisticsLeastLoyal[i].last_name;


            cell2.innerHTML = ((statisticsLeastLoyal[i].total_votes * statisticsLeastLoyal[i].votes_with_party_pct) /100).toFixed(0);
            cell3.innerHTML = statisticsLeastLoyal[i].votes_with_party_pct + "%"; 

            nameLink.setAttribute('href', statisticsLeastLoyal[i].url);
            cell1.appendChild(nameLink);
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);

            tbody.appendChild(row);


        }
    }
    

    function mostLoyalTable() {
        var tbody = document.getElementById("mostLoyal")
        tbody.innerHTML = '';
        var statisticsMostLoyal = statistics.most_loyal;

        for (i = 0; i < statisticsMostLoyal.length; i++) {
            var row = document.createElement("tr");
            var cell1 = document.createElement("td");
            var cell2 = document.createElement("td");
            var cell3 = document.createElement("td");
            var nameLink = document.createElement('a');

            nameLink.innerHTML = statisticsMostLoyal[i].first_name + " " + (statisticsMostLoyal[i].middle_name || " ") + " " + statisticsMostLoyal[i].last_name;
            cell2.innerHTML = ((statisticsMostLoyal[i].total_votes * statisticsMostLoyal[i].votes_with_party_pct) /100).toFixed(0);
            cell3.innerHTML = statisticsMostLoyal[i].votes_with_party_pct + "%";

            nameLink.setAttribute('href', statisticsMostLoyal[i].url);
            cell1.appendChild(nameLink);
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);

            tbody.appendChild(row);


        }
    }