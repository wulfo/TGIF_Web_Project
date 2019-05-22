//........voy pegando el archivo pro-congress-113.js por bloques.a medida que se va modificando, para ser consciente del orden y los nuevos elementos que vamos introduciendo.......luego va por bloques y orden cronologico.

///////////////////////////////////
////1er bloque que pego/////////
///////////////////////////////////

function createTable(data, field) {
    var tbody = document.getElementById("senate-data");

    tbody.innerHTML = ''; // esto lo hemos anhadido cuando estabamos creando las funciones para los filtros, para que vacie el tbody al ejecutar la funcion (sino, al ejecutarse la funcion cada vez que des/marcamos una box, va anhadiendo tabla tras tabla, repitiendo las filas) de esta forma comenzamos con la tabla limpia.

    for (var i = 0; i < data.length; i++) {
        var row = document.createElement("tr");

        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");
        var cell3 = document.createElement("td");
        var cell4 = document.createElement("td");
        var cell5 = document.createElement("td");
        var nameLink = document.createElement('a');


        nameLink.innerHTML = data[i].first_name;
        cell2.innerHTML = data[i].party;
        cell3.innerHTML = data[i].state;
        cell4.innerHTML = data[i].seniority;
        cell5.innerHTML = data[i].votes_with_party_pct;

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

createTable(data.results[0].members); //hemos eliminado los elementos anteriores para llamar la funcion, porque hemos creado esos elementos y dado contenido arriba.


// funtion for Filters   ----made with Ottavia-------

function checkedBox() { //creamos la funcion
    var selectedState = document.getElementById("stateList").value;
console.log(selectedState)
    var inputArray = Array.from(document.querySelectorAll('input[name=party]:checked')); // extraido de los resoursces (y stackoverflow) sirve para comprobar si un checkbox esta marcado. Y le damos el nombre del campo que estamos comprobando =Party . Crea un array (Array.from)con los elementos que estan marcados que almacenamos en la varianle inputArray

    var boxesMarcadas = []; //nuestra variabl epara contenr los valores que salgan de ejecutar el loop.

    for (var i = 0; i < inputArray.length; i++) { // creamos el loop sobre el Array creado al princiopio.
        boxesMarcadas.push(inputArray[i].value) // y lo metemos (push) en la variable boxesMarcadas.
    }
    console.log(boxesMarcadas) //esto es para ver como queda en la consola.
    filterMembers(boxesMarcadas) //ejecutamos la funcion que esta creada despues, pasando en ella los elementos almacenados en en boxesMarcadas.
}

function filterMembers(boxesMarcadas) { // creamos la funcion para que filtre los miembros. Queremos que pase cada vez que marcamos uno.
    var filteredMembers = []; //igual que antes. que el array (por eso []) se almacene aqui.

    if (boxesMarcadas.length === 0) { //lo haremos por comparacion. Comparando todo el conjunto de data, con 
        filteredMembers = data.results[0].members // si no hay elementos marcados (=== 0), entonces quiere decir que tenemos toda la lista, es decir, la variable con el array de los elementos filtrados es igual al array de todos los elementos.
    } else { //si no ocurre so, tenemos que 
        for (var i = 0; i < data.results[0].members.length; i++) { //ejecutar el loop para todos los datos (data.results[0].members.length) ...y detectamos si...
            if (boxesMarcadas.includes(data.results[0].members[i].party) ) { // dentro de todos esos elementos, hay alguno que incluya (ver .include en mozilla) el campo "party" . 
                filteredMembers.push(data.results[0].members[i]); //si incluye ese campo, entonces metemos todos esos (push  ...ver push en w3school) en los filteredmembers.
            }
        }
    }


    createTable(filteredMembers) // call the function de crear la tabla, pero solo con los elementos filtrados

    
    
    
    ///// recuerda que cuando comenzamos a modificar la funcion para el dropdown, tuvo que incluir el onchange en el elemento Select del html para que cuando pulsamos, ocurra algo. Ese era uno de lo sproblemas.
    
    
    ///////////////////////////////////
////2o bloque que pego/////////
///////////////////////////////////
    
    
//Borro del HTML el dropdown con todos los estados, para crearlo con una funcion ¨Funcion Dropdown". Y hay que modificar los escenarios poniendo for loops para decir que hacer en cada caso.
    
    
    // FUNCION DROPDOWN
function states() { 
    var select = document.getElementById("stateList");
	 
	for (var i = 0; i < data.results[0].members.length; i++) {//empece poniendo data.lenght , pero quiero que lo compruebe en todo el object. todo el archivo
		var option = document.createElement("option");
        option.innerHTML = data.results[0].members[i].state //una vez ejecutada el loop, que incluya en el elemento creado "option", el resultado de ejecutar el loop por los miembros de state

		stateList.appendChild(option); //anhadimos la variable creada al elemento con id"stateList" que es el dropdown.
	}
}
states() //ejecutamos la funcion.


// funtion for Filters   ----made with Ottavia-------

function checkedBox() {
    var selectedState = document.getElementById("stateList").value;
    console.log(selectedState)
    var inputArray = Array.from(document.querySelectorAll('input[name=party]:checked'));
    var boxesMarcadas = [];

    for (var i = 0; i < inputArray.length; i++) {
        boxesMarcadas.push(inputArray[i].value)
    }
    console.log(boxesMarcadas)
    filterMembers(boxesMarcadas, selectedState)
}

function filterMembers(boxesMarcadas, selectedState) {
    var filteredMembers = [];

    if (boxesMarcadas.length === 0 && selectedState === "all") {//si no hay box cheched y ningun state selected (porque "all" es el estado inicial o donde no hay ninguno seleccionado), no hay que decirle que hacer. Simplemente que mande ese resultado (que son todos los elementos)al la variable filteredMembers
        filteredMembers = data.results[0].members 
    } else if (boxesMarcadas.length === 0 && selectedState != "all") { //si ninguna box esta marcada pero si hay algun state selected. Ejecutamos un loop
        for(var i = 0; i < data.results[0].members.length; i++){ 
            if(data.results[0].members[i].state == selectedState){//ejecutamos loop para decirle que si el state selected coincide con un estado de la lista...
                filteredMembers.push(data.results[0].members[i]);//nos mande el valor/es a la variable.
            }
        }
    } else if (boxesMarcadas.length != 0 && selectedState === "all") { //y en caso de que SI haya box checked y no haya state selected...
        for(var i = 0; i < data.results[0].members.length; i++){//ejecutamos otro loop..
            if(boxesMarcadas.includes(data.results[0].members[i].party)){//y le decimos que en ese caso si las box checked incluyen valores de un partido (NOTESE el .party) 
                filteredMembers.push(data.results[0].members[i]);//nos mande esos valores a la variable.
            }
        }
    } else {
        for (var i = 0; i < data.results[0].members.length; i++) { //y nos queda el ultimo escenario, el que resta (que haya casilla marcada y state selected. y como es un "else", pues inciamos cn un loop (revisar if..else loops)
            if (boxesMarcadas.includes(data.results[0].members[i].party) //y le decimos que si las boxes marcada incluye un party, Y hay un state selected
                && 
                data.results[0].members[i].state == selectedState
               ) {
                    filteredMembers.push(data.results[0].members[i]);// entonces nos lo mande a la variable
            }
        }
    }


    createTable(filteredMembers) 

}
    
        ///////////////////////////////////
////3er bloque que pego/////////
/////////////////////////////////// anhado el bloque de codigo para el dropdown. consegiodo con ayuda github
  function createTable(data, field) {
    var tbody = document.getElementById("senate-data");

    tbody.innerHTML = ''; // esto lo hemos anhadido cuando estabamos creando las funciones para los filtros, para que vacie el tbody al ejecutar la funcion (sino, al ejecutarse la funcion cada vez que des/marcamos una box, va anhadiendo tabla tras tabla, repitiendo las filas) de esta forma comenzamos con la tabla limpia.

    for (var i = 0; i < data.length; i++) {
        var row = document.createElement("tr");

        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");
        var cell3 = document.createElement("td");
        var cell4 = document.createElement("td");
        var cell5 = document.createElement("td");
        var nameLink = document.createElement('a');


        nameLink.innerHTML = data[i].first_name;
        cell2.innerHTML = data[i].party;
        cell3.innerHTML = data[i].state;
        cell4.innerHTML = data[i].seniority;
        cell5.innerHTML = data[i].votes_with_party_pct;

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

createTable(data.results[0].members); //hemos eliminado los elementos anteriores para llamar la funcion, porque hemos creado esos elementos y dado contenido arriba.

// FUNCION DROPDOWN
function states() { // funcion para crear la lista de State
    var selectState = document.getElementById("stateList"); //identificamos el elemento donde ira
    var statesArray = [] //creamos variable para el Array de states. que ahora esta vacio.

    for (var a = 0; a < data.results[0].members.length; a++) { //corremos el lop para todo los datos de los miembros.

        var allStates = data.results[0].members[a].state;//y el resultado de todos los miembros de state (.state) lo almacenamos en ela Variable
        statesArray.sort().push(allStates) //metemos (push) esos resultados , ordenados alfabeticamente (sort) , dentro del statesArray, que ya no esta vacio.

        //        option.innerHTML = state //estas dos lineas estaban aqui antes de escribir el codigo para los State repetidos. que ahora pasan al loop de abajo del todo. Cuando metemos los valores no repetidos.
        //        stateList.appendChild(option);
        var repetedStates = []; //creamos variable para los estados repetidos, que comienza vacia.

        for (var i = 0; i < statesArray.length; i++) {//corremos loop para todos los statesArray (es decir, todos los elementos que pertenecen a .state)
            for (var j = i + 1; j < statesArray.length; j++) {//anidamos otro lop con otra variable j, que empieza 1 elemento despues del anterior (=i+1).
                if (statesArray[i] == statesArray[j]) {//y le damos la condicion de que si ambos resultados son iguales
                    if (!repetedStates.includes(statesArray[i])) { //anidamos otra condicion, de que los que no esten repetidos pero estan incuildos en el primer array...
                        repetedStates.push(statesArray[i]); //...esos elementos los meta dentro de la variable repetedStates.Es decir, el resultado es que metemos en la variable repetedStates, solo los que no estan repetidos y estan en el array (esto lo tengo confuso)
                    }
                }
            }
        }

    }

    for (var h = 0; h < repetedStates.length; h++) { //ahora corremos lop con los valores que tiene la variable repetedStes
                var option = document.createElement("option"); //creamos en el html el elemento option, propio de los dropdown. 
        option.innerHTML = repetedStates[h]//insertamos el resultado del loop anterior en el elemento option

        stateList.appendChild(option);//anhadimos ese nuevo elemento dentro del elemento de html con id stateList.
    }
}
states()





// funtion for Filters   ----made with Ottavia-------

function checkedBox() {
    var selectedState = document.getElementById("stateList").value;
    console.log(selectedState)
    var inputArray = Array.from(document.querySelectorAll('input[name=party]:checked'));
    var boxesMarcadas = [];

    for (var i = 0; i < inputArray.length; i++) {
        boxesMarcadas.push(inputArray[i].value)
    }
    console.log(boxesMarcadas)
    filterMembers(boxesMarcadas, selectedState)
}

function filterMembers(boxesMarcadas, selectedState) {
    var filteredMembers = [];

    if (boxesMarcadas.length === 0 && selectedState === "all") {
        filteredMembers = data.results[0].members
    } else if (boxesMarcadas.length === 0 && selectedState != "all") {
        for(var i = 0; i < data.results[0].members.length; i++){
            if(data.results[0].members[i].state == selectedState){
                filteredMembers.push(data.results[0].members[i]);
            }
        }
    } else if (boxesMarcadas.length != 0 && selectedState === "all") {
        for(var i = 0; i < data.results[0].members.length; i++){
            if(boxesMarcadas.includes(data.results[0].members[i].party)){
                filteredMembers.push(data.results[0].members[i]);
            }
        }
    } else {
        for (var i = 0; i < data.results[0].members.length; i++) {
            if (boxesMarcadas.includes(data.results[0].members[i].party) 
                && 
                data.results[0].members[i].state == selectedState
               ) {
                    filteredMembers.push(data.results[0].members[i]);
            }
        }
    }


    createTable(filteredMembers) 

}


///////////////////////////////////
////4o bloque que pego/////////
///////////////////////////////////
//modificicacion importante!!! Hacemos la pagina LIVE con la fetch function.Y para ello hay que modificar UN MONTON de codigo. Principalmente porque anhadimos el eventlistener en HTML porque ya no nos funciona el checkedboxes porque el onchange del HTML es lo que triggered esa funcion, y ahora esa funcion hay que llamarla desde Fetch .IMportante ENTENDER el flow de las cosas, donde se necesita un elemento que se llama en otra funcion, etc...Notar tambien como he borrado, o comentado, las Call a las funciones al final de cada una (no de todas) porque ya se llaman en el .then:

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
        .catch(function(error) {
        console.log(error)
  });   

}
/// hasta aqui la creacion del fetch 


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


        nameLink.innerHTML = data[i].first_name;
        cell2.innerHTML = data[i].party;
        cell3.innerHTML = data[i].state;
        cell4.innerHTML = data[i].seniority;
        cell5.innerHTML = data[i].votes_with_party_pct;

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

    for (var a = 0; a < members.length; a++) { //en todos los sitios donde teniamos el data.results.members[0]  , porque ya no lo necesitamos. Lo llamo  "members" (podria ser otra cosa) y es como paso la funcion States (arriba).

        var allStates = members[a].state; 
        statesArray.sort().push(allStates); 

     
        var repetedStates = []; 

        for (var i = 0; i < statesArray.length; i++) { /
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
//states() // ya no necesitamos llamar la funcion aqu'i, porque la llamamos en el .then





// funtion for Filters   
//aqui es donde viene el cambio grande. anhade al HTML el event listener (ver tambien cambio en el HTML, para que aplique una funcion anonima cuando hay un cambio en el event)
function handleEvent(members){
    
    var selectedState = document.getElementById("stateList").addEventListener('change', function(){
             checkedBox(members)
        });
    var inputArray = Array.from(document.querySelectorAll('input[name=party]'));//de aqui elimino el "checked". 
    
    inputArray.forEach(function(oneInput){ //crea aqui un loop (con forEach, podria ser de otra forma) para que cada vez que marquemos una de las tres, se active la funcion checkedBox pasandole los members
       
        oneInput.addEventListener('change', function(){
             checkedBox(members)
        })
    })
}


function checkedBox(members) {
    var selectedState = document.getElementById("stateList").value; // aqui hizo algo con el console.log para ver que al estado selecionado y poner el .value
    
    var inputArray = Array.from(document.querySelectorAll('input[name=party]:checked')); //aqui conservamos el checked...no se muy bien porque.
    
    
    
    
    var boxesMarcadas = [];

    for (var i = 0; i < inputArray.length; i++) {
        boxesMarcadas.push(inputArray[i].value)
    }
    
    filterMembers(members, boxesMarcadas, selectedState)//variacion aqui incluyendo el Members...porque FIeld ya no aplica. No nos sirve
}

function filterMembers(members, boxesMarcadas, selectedState) {
    console.log(boxesMarcadas)//hace los console para ver que llegan los elementos
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


    createTable(filteredMembers)//esto lo deja como esta.

}