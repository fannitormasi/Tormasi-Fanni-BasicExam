function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed

  sortByName(userDatas);
  getPortraits(userDatas);

  var clickedPortait = document.querySelectorAll(".portraits");
  for (var i = 0; i < clickedPortait.length; i++) {
    if (clickedPortait.hasOwnProperty(i)) {
      clickedPortait[i].addEventListener("click", function() {
        var nameOfCharacter = this.querySelector(".names").innerHTML;
        console.log(nameOfCharacter);
      });
    }
  }
}

getGameOfThronesCharacterDatas(
  "./json/got.json",
  successGetGameOfThronesCharacterDatas
);
/*
 * TODO: Hívd meg a getGameOfThronesCharacterDatas függvény olyan paraméterekkel, ami
 * a js mappában lévő got.js filet kéri el a szervertől
 */
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

// a tömb elemeit ABC sorrendbe rendezi
function sortByName(arrayOfCharacters) {
  var temp;
  for (var k = 0; k < arrayOfCharacters.length; k++) {
    for (var i = k + 1; i < arrayOfCharacters.length; i++) {
      if (arrayOfCharacters[k].name > arrayOfCharacters[i].name) {
        temp = arrayOfCharacters[k];
        arrayOfCharacters[k] = arrayOfCharacters[i];
        arrayOfCharacters[i] = temp;
      }
    }
  }
  return arrayOfCharacters;
}

// ha a karakter nem halott, vissza adja az adott karakter portréját és nevét
function getPortraits(arrayOfCharacters) {
  var tableRow = "";
  for (var i = 0; i < arrayOfCharacters.length; i++) {
    if (arrayOfCharacters.hasOwnProperty(i) && !arrayOfCharacters[i].dead) {
      tableRow += `
            <div class="portraits">
              <img class="pics" src="/${
                arrayOfCharacters[i].portrait
              }" alt=""><br>
            <label class="names">${arrayOfCharacters[i].name}
              </label>
              </div>
  `;
    }
  }
  document.querySelector("#pics").innerHTML = tableRow;
}
