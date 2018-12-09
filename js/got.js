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
  getPortraits(userDatas);
  console.log(userDatas);

  // visszadja a console-ra annak a karakternek a nevét, akire kattintottunk
  var clickedPortait = document.querySelectorAll('.portraits');
  for (var i = 0; i < clickedPortait.length; i++) {
    if (clickedPortait.hasOwnProperty(i)) {
      clickedPortait[i].addEventListener('click', function () {
        var name = this.querySelector('.names').innerHTML;
        whichCharacter(userDatas, name);
        console.log(name);
      });
    }
  }
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
  var tableRow = '';
  for (var i = 0; i < arrayOfCharacters.length; i++) {
    if (arrayOfCharacters.hasOwnProperty(i) && !arrayOfCharacters[i].dead) {
      tableRow += `
            <div class="portraits">
              <img class="pics" id="${i}" src="/${
  arrayOfCharacters[i].portrait
}" alt=""><br>
            <label for="${i}" class="names">${arrayOfCharacters[i].name}</label>
              </div>
  `;
    }
  }
  document.querySelector('#pics').innerHTML = tableRow;
}

// a console-ra kiíratott nevet megkeresi a tömb elemei között és ha megtalálja, akkor lefuttatja a négy függvényt,
// amik beillesztik a karakter képét, nevét, házát és leírását
function whichCharacter(arrayOfCharacters, nameOfCharacter) {
  for (var i = 0; i < arrayOfCharacters.length; i++) {
    if (arrayOfCharacters[i].name === nameOfCharacter) {
      if (arrayOfCharacters[i].picture) {
        showPicture(arrayOfCharacters[i].picture, arrayOfCharacters[i].name);
      } else {
        showPicture('/assets/pictures/jorah.webp');
      }
      showName(arrayOfCharacters[i].name);
      if (arrayOfCharacters[i].house) {
        showHouse(arrayOfCharacters[i].house);
        showDesc(arrayOfCharacters[i].bio);
      }
    }
  }
}

function showPicture(picture) {
  var whereToPutPicture = document.querySelector('#showPicture');
  whereToPutPicture.innerHTML = '';
  var image = document.createElement('img');
  image.src = picture;
  image.alt = '';
  image.className = 'pictureOfCharacter';
  whereToPutPicture.appendChild(image);
}

function showName(name) {
  var whereToPutName = document.querySelector('#showName');
  whereToPutName.innerHTML = '';
  var paragraph = document.createElement('p');
  paragraph.innerHTML = name;
  paragraph.className = 'namesOfCharacter';
  whereToPutName.appendChild(paragraph);
}

function showHouse(house) {
  var whereToPutHouse = document.querySelector('#showHouse');
  whereToPutHouse.innerHTML = '';
  var imageHouse = document.createElement('img');
  imageHouse.src = `/assets/houses/${house}.png`;
  imageHouse.className = 'housesOfCharacter';
  whereToPutHouse.appendChild(imageHouse);
}

function showDesc(desc) {
  var whereToPutDesc = document.querySelector('#showDesc');
  whereToPutDesc.innerHTML = '';
  var paragraphDesc = document.createElement('p');
  paragraphDesc.innerHTML = desc;
  paragraphDesc.className = 'descOfCharacter';
  whereToPutDesc.appendChild(paragraphDesc);
}
