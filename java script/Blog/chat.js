var pollXhr = null;
var spr = document.querySelector('#aktywny');
var czat = document.querySelector('#czat');
var nick = document.querySelector('#nick');
var wiadomosc = document.querySelector('#wiadomosc');
var wyslij = document.querySelector('#wyslij');
var formularz = document.querySelector('#formularz');

spr.addEventListener('change', onCheckboxChange);
formularz.addEventListener('submit', onMessageSubmit)

// uruchamianie czatu
function onCheckboxChange (event) {
  aktywuj(event.target.checked);
}

// Zmieniamy elementy na włączone/wyłączone
function aktywuj (enabled) {
  nick.disabled = !enabled;
  wiadomosc.disabled = !enabled;
  wyslij.disabled = !enabled;

  if (enabled) {
    zapisane();
    pollMessages();
  } else {
    // Odłączamy się od chatu
    // Kasujemy wiadomości i zamykamy polling
    wyswietl('Aktywuj czat!');
    pollXhr.abort();
  }
}

// Wysyła zapytanie do messages.php ale z parametrem ?fetch=true
// Parametr powoduje że skrypt PHP nie będzie wykonywał nieskończonej pętli
// czekając na aktualizację pliku z chatem, tylko pobierze wszystkie wiadomości
// i od razu nam je zwróci
function zapisane () {
  var xml = new XMLHttpRequest();
  xml.open('GET', 'messages.php?fetch=true');
  xml.send();

  // Wykonuje się po odebraniu odpowiedzi od serwera
  xml.onload = function () {
    if (xml.status != 200) {
      alert('Błąd ' + xml.status + ': ' + xml.statusText);
    } else {
      wyswietl(xml.responseText);
    }
  };

  xml.onerror = function () {
    alert('Błąd podczas wysyłania zapytania');
  };
}

function wyswietl (messages) {
  czat.value = messages;
}

function onMessageSubmit (event) {
  event.preventDefault();

  if (!nick.value || !wiadomosc.value) {
    alert('Pola nazwa użytkownika i wiadomość nie mogą być puste!');
    return;
  }

  // FormData zbiera wszystkie inputy w formularzu z atrybutem name
  // i tworzy mape <nazwa: wartość>, którą możemy bezpośrednio przekazać
  // do XMLHttpRequest.
  var formData = new FormData(event.target);
  var xml = new XMLHttpRequest();

  xml.open('POST', 'send.php');
  xml.send(formData);


  // Wiadomość wysłana przez autora odrazu pojawia się w jego okienku - nie czeka na odp serwera
  czat.value += nick.value + ': ' + wiadomosc.value;

  // Czyszczenie message boxa 
  wiadomosc.value = '';
}


function pollMessages () {
  pollXhr = new XMLHttpRequest();
  pollXhr.open('GET', 'messages.php');
  pollXhr.send();

  pollXhr.onload = function () {
    if (pollXhr.status != 200) {
      alert('Błąd ' + pollXhr.status + ': ' + pollXhr.statusText);
    } else {
      wyswietl(pollXhr.responseText);
      pollMessages();
    }
  };

  pollXhr.onerror = function () {
    alert('Błąd podczas wysyłania zapytania');
    pollMessages();
  };
}