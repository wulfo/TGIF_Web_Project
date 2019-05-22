/----GLOBAL VARIABLES----//

//---PUT THE NAME OF THE HTML I STAY (SENATE OR HOUSE) TO URL---//
var donde = window.location.pathname;

if (donde == "/TGIF/senate-attendance.html") {
    donde = "senate";
}
if (donde == "/TGIF/house-attendance.html") {
    donde = "house";
}

var url = "https://api.propublica.org/congress/v1/113/"+donde+"/members.json";
var arrayMember;
var arrayMemberT = [];
var arrayMemberB = [];
var republican = [];
var democrat = [];
var independent = [];


//--------FETCH----------//

fetch(url, {
    headers: {
        "X-API-Key": "Gk4q1LhfyZlB9T5EedIxo3BU7pLqjIl41GO4ZY13"
    }
}).then(function (data) {
    return data.json();
}).then(function (myData) {
    console.log(myData);
    arrayMember = myData.results[0].members;

    init();

})

//----CALL ALL THE FUNCTIONS ON FETCH---//

function init() {

    //---VAR WITH 10% ROUNDED UP OF ALL ARRAY WITH MEMBERS---//

    var percent = Math.round(arrayMember.length * 0.10);

    //---ARRAY ORDERED BY MISSED_VOTES_PCT---//

    arrayMember.sort(function (a, b) {
        if (a.missed_votes_pct > b.missed_votes_pct) {
            return -1;
        }
        if (a.missed_votes_pct < b.missed_votes_pct) {
            return 1;
        }
        return 0;
    });

    //---CUT START AT 0 AND END (10%) ALL ARRAY = IN NEW ARRAY---//

    arrayMemberT = arrayMember.slice(0, percent);

    //--FUNCTION COMPARE LAST 11% (ARRAYMEMBERT) WITH ARRAYMEMBERS--//

    function compare() {
        for (var i = arrayMemberT.length; i < arrayMember.length; i++) {
            if (arrayMemberT[arrayMemberT.length - 1].missed_votes_pct == arrayMember[i].missed_votes_pct) {
                arrayMemberT.push(arrayMember[i]);
            }

        }
    }

    //---INVERSE ORDER BY MISSED_VOTES_PCT---//

    arrayMember.sort(function (a, b) {
        if (a.missed_votes_pct > b.missed_votes_pct) {
            return 1;
        }
        if (a.missed_votes_pct < b.missed_votes_pct) {
            return -1;
        }
        return 0;
    });
    arrayMemberB = arrayMember.slice(0, percent);

    //--FUNCTION COMPARE LAST 11% (ARRAYMEMBERT) WITH ARRAYMEMBERS--//

    function compare() {
        for (var i = arrayMemberB.length; i < arrayMember.length; i++) {
            if (arrayMemberB[arrayMemberB.length - 1].missed_votes_pct == arrayMember[i].missed_votes_pct) {
                arrayMemberB.push(arrayMember[i]);
            }
        }
    }

    party();

    var members = {
        "party_rep": republican.length,
        "party_dem": democrat.length,
        "party_ind": independent.length,
        "total": arrayMember.length,
        "votes_with_party_pct_rep": votes(republican),
        "votes_with_party_pct_dem": votes(democrat),
        "votes_with_party_pct_ind": votes(independent),
        "averageTotal": votes(arrayMember)
    }

    //---CALL FUNCTIONS---//
    tableFix(members);
    compare();
    compare();
    newTable(arrayMemberB);
    newTable2(arrayMemberT);
}

//-----FUNCTION PARTY MEMBERS ON DIFERENT ARRAYS-----//

function party() {
    for (var i = 0; i < arrayMember.length; i++) {
        if (arrayMember[i].party == "R") {
            republican.push(arrayMember[i]);
        }
        if (arrayMember[i].party == "D") {
            democrat.push(arrayMember[i]);
        }
        if (arrayMember[i].party == "I") {
            independent.push(arrayMember[i]);
        }
    }
}

//-----FUNCTION AVERAGE VOTES-----//

function votes(partyType) {
    var votes_r = 0;
    if (partyType.length == 0) {
        return 0;
    } else {
        for (var i = 0; i < partyType.length; i++) {
            votes_r = votes_r + partyType[i].votes_with_party_pct;

        }
        return votes_r / partyType.length;
    }

}


//-----TABLE LEAST LOYAL ----//

function newTable(pArray) {
    var table = document.getElementById("statistics2");

    for (var i = 0; i < pArray.length; i++) {

        var tr = document.createElement("tr");
        //        tr.setAttribute("class", pArray[i].total_votes);

        var td = document.createElement("td");

        var a = document.createElement("a");
        a.setAttribute("href", pArray[i].url);


        if (pArray[i].middle_name == null) {
            a.innerHTML = pArray[i].first_name + " " + pArray[i].last_name;
        } else {
            a.innerHTML = pArray[i].first_name + " " + pArray[i].middle_name + " " + pArray[i].last_name;

        }
        td.appendChild(a);
        tr.appendChild(td);

        var td1 = document.createElement("td");
        td1.innerHTML = pArray[i].missed_votes;
        tr.appendChild(td1);


        var td2 = document.createElement("td");
        td2.innerHTML = pArray[i].missed_votes_pct + " %";
        tr.appendChild(td2);

        table.appendChild(tr);
    }

}

//-------TABLE MOST LOYAL-----//

function newTable2(pArray) {
    var table = document.getElementById("statistics3");

    for (var i = 0; i < pArray.length; i++) {

        var tr = document.createElement("tr");
        //        tr.setAttribute("class", pArray[i].total_votes);

        var td = document.createElement("td");

        var a = document.createElement("a");
        a.setAttribute("href", pArray[i].url);


        if (pArray[i].middle_name == null) {
            a.innerHTML = pArray[i].first_name + " " + pArray[i].last_name;
        } else {
            a.innerHTML = pArray[i].first_name + " " + pArray[i].middle_name + " " + pArray[i].last_name;

        }
        td.appendChild(a);
        tr.appendChild(td);

        var td1 = document.createElement("td");
        td1.innerHTML = pArray[i].missed_votes;
        tr.appendChild(td1);


        var td2 = document.createElement("td");
        td2.innerHTML = pArray[i].missed_votes_pct + " %";
        tr.appendChild(td2);

        table.appendChild(tr);
    }

}

//--------TABLE FIXED--------//

function tableFix(members) {
    document.getElementById("td1").innerHTML = members.party_rep;
    document.getElementById("td2").innerHTML = members.party_dem;
    document.getElementById("td3").innerHTML = members.party_ind;
    document.getElementById("td4").innerHTML = members.votes_with_party_pct_rep.toFixed(2) + " %";
    document.getElementById("td5").innerHTML = members.votes_with_party_pct_dem.toFixed(2) + " %";
    document.getElementById("td6").innerHTML = members.votes_with_party_pct_ind.toFixed(2) + " %";
    document.getElementById("td7").innerHTML = members.total;
    document.getElementById("td8").innerHTML = members.averageTotal.toFixed(2) + " %";
}
