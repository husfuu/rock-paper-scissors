function generateComputerOption(computerOptions) {
  /* generate random option from computer options
   * computerOptions: list of string that contain computer options
   * return: string
   */
  const randomIndex = Math.floor(Math.random() * computerOptions.length);
  return computerOptions[randomIndex];
}

function getResult(comp, player) {
  /* get result of the match
   * comp: computer option | string
   * player: player option | string
   * return: string
   */
  if (comp === player) return 'DRAW';
  if (player == 'paper') return comp == 'rock' ? 'PLAYER 1 WIN' : 'COM WIN';
  if (player == 'rock') return comp == 'scissors' ? 'PLAYER 1 WIN' : 'COM WIN';
  if (player == 'scissors') return comp == 'paper' ? 'PLAYER 1 WIN' : 'COM WIN';
}

function correctChoice(playerOption, result) {
  /* animation of correctChoice from player
   * this function will only be excecuted when the result is "COM WIN"
   * playerOption: string
   */
  if (result === 'PLAYER 1 WIN') {
    // pass
  } else if (result === 'COM WIN') {
    const startTime = new Date().getTime();

    if (playerOption.className == 'rock') {
      setInterval(function () {
        if (new Date().getTime() - startTime > 3000) {
          clearInterval;
          return;
        }
        playerOptions[2].style.backgroundColor = '#FF5C58';
        playerOptions[2].style.borderRadius = '10px';

        setTimeout(function () {
          playerOptions[2].style.backgroundColor = 'transparent';
        }, 250);
      }, 500);
    } else if (playerOption.className == 'paper') {
      setInterval(function () {
        if (new Date().getTime() - startTime > 3000) {
          clearInterval;
          return;
        }
        playerOptions[0].style.backgroundColor = '#FF5C58';
        playerOptions[0].style.borderRadius = '10px';

        setTimeout(function () {
          playerOptions[0].style.backgroundColor = 'transparent';
        }, 250);
      }, 500);
    } else if (playerOption.className == 'scissors') {
      setInterval(function () {
        if (new Date().getTime() - startTime > 3000) {
          clearInterval;
          return;
        }
        playerOptions[1].style.backgroundColor = '#FF5C58';
        playerOptions[1].style.borderRadius = '10px';

        setTimeout(function () {
          playerOptions[1].style.backgroundColor = 'transparent';
        }, 250);
      }, 500);
    }
  }
}

function disableAllOptions(playerOptions) {
  /* this function will disable all button of player options except refresh
   * playerOptions: list of string from player Options
   */
  for (let i = 0; i < playerOptions.length; i++) {
    const playerOption = playerOptions[i];
    playerOption.style.opacity = '0.5';
    playerOption.disabled = true;
  }
}

function refresh(playerOption, computerOption, resultInfo) {
  /* this function will enable and return of the web appreance as before
   * it will excecuted if we push the refresh button
   * playerOption: string
   * computerOption: string
   * resultInfo: string
   */

  refreshButton.addEventListener('click', function () {
    for (let i = 0; i < playerOptions.length; i++) {
      playerOptions[i].disabled = false;
      playerOptions[i].style.opacity = '1';
    }
    computerOption.style.backgroundColor = 'transparent';
    playerOption.style.backgroundColor = 'transparent';
    resultInfo.innerHTML = 'VS';
    resultInfo.style.backgroundColor = 'transparent';
    resultInfo.style.transform = 'none';
    resultInfo.style.color = '#BD0000';
    resultInfo.style.fontSize = '60pt';
  });
}

function resultInformation(result, resultInfo) {
  /* this function will change the appreance of resultInfo
   * result: string
   * resultInfo: object
   */
  resultInfo.innerHTML = result;
  if (result === 'DRAW') {
    resultInfo.style.backgroundColor = '#035B0C';
  } else {
    resultInfo.style.backgroundColor = '#4C9654';
  }
  // warna font dan ukurannya
  resultInfo.style.borderRadius = '10px';
  resultInfo.style.color = 'white';
  resultInfo.style.transform = 'rotate(-20deg)';
  resultInfo.style.fontSize = '30pt';
}

const playerOptions = document.querySelectorAll('.option-player input');
const computerOptions = document.querySelectorAll('.option-computer input');
const refreshButton = document.querySelector('.refresh-button');

for (let i = 0; i < playerOptions.length; i++) {
  playerOptions[i].addEventListener('click', function () {
    const computerOption = generateComputerOption(computerOptions);
    const playerOption = playerOptions[i];
    let result = getResult(computerOption.className, playerOption.className);
    const resultInfo = document.querySelector('.result');
    const scorePlayer = document.querySelector('.score-player');
    const scoreComputer = document.querySelector('.score-computer');
    let scorePlayerInt = parseInt(scorePlayer.innerHTML);
    let scoreComputerInt = parseInt(scoreComputer.innerHTML);

    playerOption.style.backgroundColor = '#E5E5E5';
    playerOption.style.borderRadius = '10px';
    computerOption.style.backgroundColor = '#E5E5E5';
    computerOption.style.borderRadius = '10px';

    correctChoice(playerOption, result);

    if (result === 'PLAYER 1 WIN') {
      scorePlayerInt += 1;
      scorePlayer.innerHTML = scorePlayerInt;
    } else if (result === 'COM WIN') {
      scoreComputerInt += 1;
      scoreComputer.innerHTML = scoreComputerInt;
    }

    resultInformation(result, resultInfo);
    disableAllOptions(playerOptions);
    refresh(playerOption, computerOption, resultInfo);
  });
}
