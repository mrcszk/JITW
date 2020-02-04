function init(){
    ustawDate();
    ustawGodzine();
}

function ustawDate(){
	var dataT = new Date();
	var rok = dataT.getFullYear();
	var miesiac = (dataT.getMonth()+1).toString().padStart(2,'0');
	var dzien = dataT.getDate().toString().padStart(2,'0');
    document.getElementsByName('date')[0].value = rok + "-" + miesiac + "-" + dzien;
}

function ustawGodzine(){
	var dataT = new Date();
	var godziny = dataT.getHours().toString().padStart(2,'0');
	var minuty = dataT.getMinutes().toString().padStart(2,'0');
	document.getElementsByName('time')[0].value = godziny + ':' + minuty;
}

function sprawdzFormatGodzina() {
    var wzor = /^[0-9][0-9]:[0-9][0-9]$/;
    var godzina = document.getElementsByName('time')[0].value;
    if (wzor.test(godzina) != true) {
        alert("Podano godzine w nieprawidłowym formacie (poprawnie GG-MM) - ustawiona zostaje aktualna godzina!");
        ustawGodzine();
    }

}

function sprawdzFormatData() {
    var wzor = /^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$/;
    var data = document.getElementsByName('date')[0].value;
    if (wzor.test(data) != true) {
        alert("Podano date w nieprawidłowym formacie (poprawnie RRRR-MM-DD) - ustawiona zostaje aktualna data!");
        ustawDate();
    }
}

function sprawdzPoprawnoscGodzina() {
    sprawdzFormatGodzina();
    sprawdzPoprawnoscData();
    var czyPoprawna = true;
    var godzina = document.getElementsByName('time')[0].value.split(':');
    var data = document.getElementsByName('date')[0].value.split('-');
    if (godzina[0] < 0 || godzina[0] > 23 || godzina[1] < 0 || godzina[1] > 59) {
        czyPoprawna = false;
    }

    var dataT = new Date();
	var rok = dataT.getFullYear();
	var miesiac = (dataT.getMonth()+1).toString().padStart(2,'0');
	var dzien = dataT.getDate().toString().padStart(2,'0');
	var godziny = dataT.getHours().toString().padStart(2,'0');
	var minuty = dataT.getMinutes().toString().padStart(2,'0');

    if( czyPoprawna && ( (data[0] == rok) && (data[1] == miesiac) && (data[2] == dzien) ) && ( (godzina[0] > godziny) || ( ( godzina[0] == godziny ) && ( godzina[1] > minuty ))) )
        czyPoprawna = false;

    if (czyPoprawna == false) {
        alert("Niepoprawna godzina, została ustawiona aktualna godzina!");
        ustawGodzine();
    }
}

function sprawdzPoprawnoscData() {
    sprawdzFormatData();
    var data = document.getElementsByName('date')[0].value.split('-');
    var czyPoprawna = true;
    if (data[0] < 0 || data[1] <= 0 || data[1] > 12 || data[2] <= 0) {
        czyPoprawna = false;
    } else if (data[0] % 4 == 0 && data[0] % 100 != 0 || data[0] % 400 == 0) {
        if (data[1] == 2 && data[2] > 29)
            czyPoprawna = false;
        if ((data[1] == 1 || data[1] == 3 || data[1] == 5 || data[1] == 7 || data[1] == 8 || data[1] == 10 || data[1] == 12) && data[2] > 31)
            czyPoprawna = false;
        if ((data[1] == 4 || data[1] == 6 || data[1] == 9 || data[1] == 11) && data[2] > 30)
            czyPoprawna = false;
    } else {
        if (data[1] == 2 && data[2] > 28)
            czyPoprawna = false;
        if ((data[1] == 1 || data[1] == 3 || data[1] == 5 || data[1] == 7 || data[1] == 8 || data[1] == 10 || data[1] == 12) && data[2] > 31)
            czyPoprawna = false;
        if ((data[1] == 4 || data[1] == 6 || data[1] == 9 || data[1] == 11) && data[2] > 30)
            czyPoprawna = false;
    }
	
    var dataT = new Date();
	var rok = dataT.getFullYear();
	var miesiac = (dataT.getMonth()+1).toString().padStart(2,'0');
	var dzien = dataT.getDate().toString().padStart(2,'0');

    if( czyPoprawna && (data[0] > rok || ( data[0] == rok && data[1] > miesiac ) || (data[0] == rok && data[1] == miesiac && data[2] > dzien) ) )
        czyPoprawna = false;

    if (czyPoprawna == false) {
        alert("Podano błędną date - ustawiona zostaje aktualna data!");
        ustawDate();
    }
}

var licznikZalacznikow = 0;

function dodajKolejnyZalacznik(kontener) {
    licznikZalacznikow += 1;
    var znacznik = document.createElement('input');
    var br = document.createElement('br');
    znacznik.setAttribute('type', 'file');
    znacznik.setAttribute('name', 'plik' + licznikZalacznikow);
    var kontener = document.getElementById(kontener);
    kontener.appendChild(znacznik);
    kontener.appendChild(br);
}

function resecik(kontener)
{
    document.getElementsByName("nazwa_uzytkownika")[0].value = '';
    document.getElementsByName('haslo')[0].value = '';
    document.getElementsByName('post')[0].value = '';
	init();
	var element = document.getElementById(kontener);	
	for(var lz = 2*licznikZalacznikow;lz > 0;lz--){
		element.removeChild(element.firstElementChild);
	}
	licznikZalacznikow = 0;
}