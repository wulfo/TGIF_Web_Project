var url = "https://api.propublica.org/congress/v1/113/senate/members.json";

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
            var dataSenate = data.results[0].members
            handleEvent(dataSenate);
            states(dataSenate);
            createTable(dataSenate);


        })
        .catch(function (error) {
            console.log(error)
        });

}








function createTable(data) {
    var tbody = document.getElementById("senate-data");

    tbody.innerHTML = '';

    for (var i = 0; i < data.length; i++) {
        var row = document.createElement("tr");

        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");
        var cell3 = document.createElement("td");
        var cell4 = document.createElement("td");
        var cell5 = document.createElement("td");
        var nameLink = document.createElement('a');


        nameLink.innerHTML = data[i].first_name + " " + (data[i].middle_name || " ") + " " + data[i].last_name;
        cell2.innerHTML = data[i].party;
        cell3.innerHTML = data[i].state;
        cell4.innerHTML = data[i].seniority;
        cell5.innerHTML = data[i].votes_with_party_pct + "%";

        nameLink.setAttribute('href', data[i].url);
        cell1.appendChild(nameLink);


        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);

        tbody.appendChild(row);;

    }
}



// FUNCION DROPDOWN
function states(members) {
    var selectState = document.getElementById("stateList");
    var statesArray = []

    for (var a = 0; a < members.length; a++) {

        var allStates = members[a].state;
        
        statesArray.sort().push(allStates);


        var repetedStates = [];

        for (var i = 0; i < statesArray.length; i++) {
            for (var j = i + 1; j < statesArray.length; j++) {
                if (statesArray[i] == statesArray[j]) {
                    if (!repetedStates.includes(statesArray[i])) {
                        repetedStates.push(statesArray[i]);
                    }
                }
            }
        }

    }

    for (var h = 0; h < repetedStates.length; h++) {
        var option = document.createElement("option");
        option.innerHTML = repetedStates[h]

        stateList.appendChild(option);
    }
}






// funtion for Filters  
function handleEvent(members) {//aqui pasamos los members no porque los necesitamos, no hacemos nada con ellos, solo para que esten presentes en el evento (explicacion aprox. de ottavia...need clarification)

    var selectedState = document.getElementById("stateList").addEventListener('change', function () {
        checkedBox(members) //anade el addEvent para que cuando clickamos en cualquier parte de la pagina, carge la funcion
    });
    var inputArray = Array.from(document.querySelectorAll('input[name=party]'));

    inputArray.forEach(function (oneInput) {

        oneInput.addEventListener('change', function () {
            checkedBox(members)//llamamos la funcion de checkbox para que cree la tabla dinamicamente. 
        })
    })
}


function checkedBox(members) {
    var selectedState = document.getElementById("stateList").value;

    var inputArray = Array.from(document.querySelectorAll('input[name=party]:checked'));




    var boxesMarcadas = [];

    for (var i = 0; i < inputArray.length; i++) {
        boxesMarcadas.push(inputArray[i].value)
    }

    filterMembers(members, boxesMarcadas, selectedState)
}

function filterMembers(members, boxesMarcadas, selectedState) {
    console.log(boxesMarcadas)
    console.log(selectedState)
    var filteredMembers = [];
    console.log(members)
    if (boxesMarcadas.length === 0 && selectedState === "all") {
        filteredMembers = members
    } else if (boxesMarcadas.length === 0 && selectedState != "all") {
        for (var i = 0; i < members.length; i++) {
            if (members[i].state == selectedState) {
                filteredMembers.push(members[i]);
            }
        }
    } else if (boxesMarcadas.length != 0 && selectedState === "all") {
        for (var i = 0; i < members.length; i++) {
            if (boxesMarcadas.includes(members[i].party)) {
                filteredMembers.push(members[i]);
            }
        }
    } else {
        for (var i = 0; i < members.length; i++) {
            if (boxesMarcadas.includes(members[i].party) &&
                members[i].state == selectedState
            ) {
                filteredMembers.push(members[i]);
            }
        }
    }


    createTable(filteredMembers)

}
