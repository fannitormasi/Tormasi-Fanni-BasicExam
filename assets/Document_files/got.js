function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed

  sortByName(userDatas);
  console.log(userDatas);
  getPictures(userDatas);
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);
/*
 * TODO: Hívd meg a getGameOfThronesCharacterDatas függvény olyan paraméterekkel, ami
 * a js mappában lévő got.js filet kéri el a szervertől
 */
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */


function getPictures(arrayOfCharacters) {
  var tableRow = '';
  for (var i = 0; i < arrayOfCharacters.length; i++) {
    if (arrayOfCharacters.hasOwnProperty(i) && !arrayOfCharacters[i].dead) {
      tableRow += `
            <div class="portraits" id="${i}">
              <img class="pics" src="/${arrayOfCharacters[i].portrait}" alt=""><br>
            <label for="${i}" class="names">${arrayOfCharacters[i].name}
              </label>
              </div>
  `;
    }
  }
  document.querySelector('#pics').innerHTML = tableRow;
}

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
