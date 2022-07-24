//premenne
//vybratie veci co potrebujeme
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restart = document.querySelector("#restartButton");

//podmienka pre vytazstvo
const vyhra = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

];

//placeholder
let moznosti = ["", "", "", "", "", "", "", "", ""];


let sucasnyHrac = "X";
let running = false;

//spustenie kodu
spustenieHry();


//funkcie hry
//spustemie hry
function spustenieHry(){
    cells.forEach(cell => cell.addEventListener("click", cellKlinkute));
    restart.addEventListener("click", restartHry);
    statusText.textContent = `${sucasnyHrac} je na tahu`;

    running = true;
}

//kliknutie na hernu bunku
function cellKlinkute(){
    const cellIndex = this.getAttribute("cellIndex");

    //zistenie ci na mieste sa nenachadza nic (arena placeholderu)
    if(moznosti[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    vytaz();
}

//update bunky
function updateCell(cell, index){
    moznosti[index] = sucasnyHrac;
    cell.textContent = sucasnyHrac;
}

//zmenenie hraca
function zmenaHraca(){
    sucasnyHrac = (sucasnyHrac == "X") ? "O" : "X";
}

//urcenie vytaza
function vytaz(){
    let koloVyhrane = false;

    for(let i = 0; i < vyhra.length; i++){
        //kazde kolo bude hra kontrolovat ci nastane jedna z vytaznych podmienok aby sa potvrdilo vytazstvo
        const podmienka = vyhra[i];
        const cellA = moznosti[podmienka[0]];
        const cellB = moznosti[podmienka[1]];
        const cellC = moznosti[podmienka[2]];

        //zistenie ci sa na miestach v poli nenachadza medzere aby nahodou nebolo vyhodnotene nespravne
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        //uistenie sa ze ci na miestach sa nachadza rovnaky znak aby bola mozna vyhrana podmienka
        if(cellA == cellB && cellB == cellC){
            koloVyhrane = true;
            break;
        }
    }

    //ak sa najde zhoda s podmienkami tak hrac x/o vyhral hru a vypise sa text
    if(koloVyhrane){
        statusText.textContent = `${sucasnyHrac} vyhral`
        running = false;
    }
    //ak sa na mieste v hre nenachadzaju ziadne volne polia dojde k remize
    else if(!moznosti.includes("")){
        statusText.textContent = `Remiza`;
        running = false;
    }
    else{
        zmenaHraca();
    }
}

//restart hry
function restartHry(){
    sucasnyHrac = "X";
    moznosti = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${sucasnyHrac} je na tahu`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}