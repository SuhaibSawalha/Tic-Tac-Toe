const player1Default = `<svg
style="width: 50px; height: 50px;"
xmlns="http://www.w3.org/2000/svg"
width="16"
height="16"
fill="currentColor"
class="bi bi-x text-info"
viewBox="0 0 16 16"
>
<path
  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
/>
</svg>`,
  player2Default = `<svg
  style="width: 32px; height: 32px;"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="currentColor"
  class="bi bi-circle text-warning"
  viewBox="0 0 16 16"
>
  <path
    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
  />
</svg>`;
let player1, player2;

const check = (name, val) => {
  if (localStorage.getItem(name)) {
    return localStorage.getItem(name);
  }
  localStorage.setItem(name, val);
  return val;
};
const gameOnProgress = check("gameOnProgress", 0);
if (gameOnProgress == 1) {
  onePlayer();
} else if (gameOnProgress == 2) {
  twoPlayers();
}

function menu() {
  window.open("index.html", "_self");
  localStorage.clear();
}

function checkWinner(array) {
  if (array.includes(1) && array.includes(2) && array.includes(3)) {
    return [1, 2, 3];
  }
  if (array.includes(4) && array.includes(5) && array.includes(6)) {
    return [4, 5, 6];
  }
  if (array.includes(7) && array.includes(8) && array.includes(9)) {
    return [7, 8, 9];
  }
  if (array.includes(1) && array.includes(4) && array.includes(7)) {
    return [1, 4, 7];
  }
  if (array.includes(2) && array.includes(5) && array.includes(8)) {
    return [2, 5, 8];
  }
  if (array.includes(3) && array.includes(6) && array.includes(9)) {
    return [3, 6, 9];
  }
  if (array.includes(1) && array.includes(5) && array.includes(9)) {
    return [1, 5, 9];
  }
  if (array.includes(3) && array.includes(5) && array.includes(7)) {
    return [3, 5, 7];
  }
}

function winningMoves(array, rem) {
  let cnt = 0;
  if (rem.includes(1) && array.includes(2) && array.includes(3)) {
    ++cnt;
  }
  if (array.includes(1) && rem.includes(2) && array.includes(3)) {
    ++cnt;
  }
  if (array.includes(1) && array.includes(2) && rem.includes(3)) {
    ++cnt;
  }
  if (rem.includes(4) && array.includes(5) && array.includes(6)) {
    ++cnt;
  }
  if (array.includes(4) && rem.includes(5) && array.includes(6)) {
    ++cnt;
  }
  if (array.includes(4) && array.includes(5) && rem.includes(6)) {
    ++cnt;
  }
  if (rem.includes(7) && array.includes(8) && array.includes(9)) {
    ++cnt;
  }
  if (array.includes(7) && rem.includes(8) && array.includes(9)) {
    ++cnt;
  }
  if (array.includes(7) && array.includes(8) && rem.includes(9)) {
    ++cnt;
  }
  if (rem.includes(1) && array.includes(4) && array.includes(7)) {
    ++cnt;
  }
  if (array.includes(1) && rem.includes(4) && array.includes(7)) {
    ++cnt;
  }
  if (array.includes(1) && array.includes(4) && rem.includes(7)) {
    ++cnt;
  }
  if (rem.includes(2) && array.includes(5) && array.includes(8)) {
    ++cnt;
  }
  if (array.includes(2) && rem.includes(5) && array.includes(8)) {
    ++cnt;
  }
  if (array.includes(2) && array.includes(5) && rem.includes(8)) {
    ++cnt;
  }
  if (rem.includes(3) && array.includes(6) && array.includes(9)) {
    ++cnt;
  }
  if (array.includes(3) && rem.includes(6) && array.includes(9)) {
    ++cnt;
  }
  if (array.includes(3) && array.includes(6) && rem.includes(9)) {
    ++cnt;
  }
  if (rem.includes(1) && array.includes(5) && array.includes(9)) {
    ++cnt;
  }
  if (array.includes(1) && rem.includes(5) && array.includes(9)) {
    ++cnt;
  }
  if (array.includes(1) && array.includes(5) && rem.includes(9)) {
    ++cnt;
  }
  if (rem.includes(3) && array.includes(5) && array.includes(7)) {
    ++cnt;
  }
  if (array.includes(3) && rem.includes(5) && array.includes(7)) {
    ++cnt;
  }
  if (array.includes(3) && array.includes(5) && rem.includes(7)) {
    ++cnt;
  }
  return cnt;
}

function onePlayer(itsAtie) {
  const playerScore = check("playerScore", 0);
  const ties = check("ties", 0);
  const cpuScore = check("cpuScore", 0);
  const player = document.getElementById("player");
  const cpu = document.getElementById("cpu");
  player.innerHTML = `${localStorage.getItem("name")}
      <p id="playerScore"></p>
      `;
  document.getElementById("playerScore").textContent = playerScore;
  document.getElementById("ties").textContent = ties;
  document.getElementById("cpuScore").textContent = cpuScore;
  const games = Number(playerScore) + Number(ties) + Number(cpuScore);
  if (games % 2 == 0) {
    player1 = player1Default;
    player2 = player2Default;
    player.className = "col col-4 bg-info";
    cpu.className = "col col-4 bg-warning";
  } else {
    player1 = player2Default;
    player2 = player1Default;
    cpu.className = "col col-4 bg-info";
    player.className = "col col-4 bg-warning";
  }
  let playerMoves = check("playerMoves", "").split(",");
  let cpuMoves = check("cpuMoves", "").split(",");
  let remainingMoves =
    itsAtie == 1 ? [] : check("remainingMoves", "1,2,3,4,5,6,7,8,9").split(",");
  if (playerMoves[0] == "") {
    playerMoves = [];
  }
  if (cpuMoves[0] == "") {
    cpuMoves = [];
  }
  if (remainingMoves[0] == "") {
    remainingMoves = [];
  }
  playerMoves = playerMoves.map((x) => Number(x));
  cpuMoves = cpuMoves.map((x) => Number(x));
  remainingMoves = remainingMoves.map((x) => Number(x));
  playerMoves.forEach((i) => {
    const cell = document.getElementById(`cell-${i}`);
    cell.innerHTML = player1;
    cell.disabled = true;
    cell.style.opacity = 1;
    cell.onmouseenter = () => {};
    cell.onmouseleave = () => {};
  });
  cpuMoves.forEach((i) => {
    const cell = document.getElementById(`cell-${i}`);
    cell.innerHTML = player2;
    cell.disabled = true;
    cell.style.opacity = 1;
    cell.onmouseenter = () => {};
    cell.onmouseleave = () => {};
  });
  remainingMoves.forEach((i) => {
    const cell = document.getElementById(`cell-${i}`);
    cell.innerHTML = ``;
    cell.style.opacity = 1;
    cell.disabled = false;
    cell.onmouseenter = () => {
      document.getElementById(`cell-${i}`).innerHTML = player1;
      document.getElementById(`cell-${i}`).style.opacity = 0.2;
    };
    cell.onmouseleave = () => {
      document.getElementById(`cell-${i}`).innerHTML = ``;
      document.getElementById(`cell-${i}`).style.opacity = 1;
    };
  });
  if (checkWinner(playerMoves)) {
    playerOne(checkWinner(playerMoves), games % 2, "playerScore");
    return;
  }
  if (checkWinner(cpuMoves)) {
    playerTwo(checkWinner(cpuMoves), games % 2, "cpuScore");
    return;
  }
  if (itsAtie == 1) {
    Tie();
    return;
  }
  if ((remainingMoves.length + games) % 2 == 1) {
    document.getElementById("turn").innerHTML = `${localStorage.getItem(
      "name"
    )} <br/>Turn`;
  } else {
    cpuMove();
  }
}

function Clear(winner, array, games) {
  for (let i = 1; i <= 9; ++i) {
    const cell = document.getElementById(`cell-${i}`);
    cell.disabled = true;
    if (array.includes(i)) {
      cell.style.boxShadow = `0 0 30px ${
        games == 0 ? "#0DCAF0" : games == 1 ? "#FFC107" : "#DC3545"
      }`;
    } else {
      cell.style.opacity = 0.3;
    }
  }
  localStorage.removeItem("playerMoves");
  localStorage.removeItem("cpuMoves");
  localStorage.removeItem("remainingMoves");
  localStorage.removeItem("firstPlayerMoves");
  localStorage.removeItem("secondPlayerMoves");
  setTimeout(() => {
    document.getElementById("winnerBox").hidden = false;
    document.getElementById("winner").innerHTML = winner;
  }, 2000);
  setTimeout(() => {
    document.getElementById("winnerBox").hidden = true;
    for (let i = 1; i <= 9; ++i) {
      const cell = document.getElementById(`cell-${i}`);
      cell.style.boxShadow = ``;
    }
    gameOnProgress == 1 ? onePlayer() : twoPlayers();
  }, 5000);
}

function Tie() {
  localStorage.setItem("ties", Number(check("ties", 0)) + 1);
  Clear(`IT'S A TIE!`, [1, 2, 3, 4, 5, 6, 7, 8, 9], 2);
}

function playerOne(array, games, score) {
  localStorage.setItem(score, Number(check(score, 0)) + 1);
  Clear(
    gameOnProgress == 1
      ? "YOU WON!"
      : `${localStorage.getItem("firstPlayerName")} WON!`,
    array,
    games
  );
}

function playerTwo(array, games, score) {
  localStorage.setItem(score, Number(check(score, 0)) + 1);
  Clear(
    gameOnProgress == 1
      ? "YOU LOST!"
      : `${localStorage.getItem("secondPlayerName")} WON!`,
    array,
    1 - games
  );
}

function put(index) {
  let playerMoves = check("playerMoves", "").split(",");
  let cpuMoves = check("cpuMoves", "").split(",");
  let remainingMoves = check("remainingMoves", "1,2,3,4,5,6,7,8,9").split(",");
  if (playerMoves[0] == "") {
    playerMoves = [];
  }
  if (cpuMoves[0] == "") {
    cpuMoves = [];
  }
  if (remainingMoves[0] == "") {
    remainingMoves = [];
  }
  playerMoves = playerMoves.map((x) => Number(x));
  cpuMoves = cpuMoves.map((x) => Number(x));
  remainingMoves = remainingMoves.map((x) => Number(x));
  playerMoves.push(index);
  remainingMoves.splice(
    remainingMoves.findIndex((x) => x == index),
    1
  );
  localStorage.setItem("playerMoves", playerMoves);
  localStorage.setItem("remainingMoves", remainingMoves);
  onePlayer(remainingMoves.length == 0);
}

let firstCell,
  corners = [1, 3, 7, 9];
function bestMove(player, cpu, rem) {
  for (let i = 0; i < rem.length; ++i) {
    cpu.push(rem[i]);
    if (checkWinner(cpu)) {
      return cpu.pop();
    }
    cpu.pop();
  }
  for (let i = 0; i < rem.length; ++i) {
    player.push(rem[i]);
    if (checkWinner(player)) {
      return player.pop();
    }
    player.pop();
  }
  for (let i = 0; i < rem.length; ++i) {
    cpu.push(rem[i]);
    if (winningMoves(cpu, rem) > 1) {
      return cpu.pop();
    }
    cpu.pop();
  }
  if (
    cpu.includes(5) &&
    cpu.includes(7) &&
    rem.includes(1) &&
    rem.includes(4) &&
    rem.includes(9)
  ) {
    return 1;
  }
  if (
    cpu.includes(5) &&
    cpu.includes(3) &&
    rem.includes(1) &&
    rem.includes(2) &&
    rem.includes(9)
  ) {
    return 1;
  }
  if (
    cpu.includes(5) &&
    cpu.includes(1) &&
    rem.includes(2) &&
    rem.includes(3) &&
    rem.includes(7)
  ) {
    return 3;
  }
  if (
    cpu.includes(5) &&
    cpu.includes(9) &&
    rem.includes(3) &&
    rem.includes(6) &&
    rem.includes(7)
  ) {
    return 3;
  }
  if (
    cpu.includes(1) &&
    cpu.includes(5) &&
    rem.includes(3) &&
    rem.includes(4) &&
    rem.includes(7)
  ) {
    return 7;
  }
  if (
    cpu.includes(5) &&
    cpu.includes(9) &&
    rem.includes(3) &&
    rem.includes(7) &&
    rem.includes(8)
  ) {
    return 7;
  }
  if (
    cpu.includes(5) &&
    cpu.includes(7) &&
    rem.includes(1) &&
    rem.includes(8) &&
    rem.includes(9)
  ) {
    return 9;
  }
  if (
    cpu.includes(5) &&
    cpu.includes(3) &&
    rem.includes(6) &&
    rem.includes(1) &&
    rem.includes(9)
  ) {
    return 9;
  }
  if (
    rem.length == 8 &&
    (player.includes(1) ||
      player.includes(3) ||
      player.includes(7) ||
      player.includes(9))
  ) {
    return 5;
  }
  if (
    rem.length == 6 &&
    cpu.includes(5) &&
    ((player.includes(1) && player.includes(9)) ||
      (player.includes(3) && player.includes(7)))
  ) {
    return 2;
  }
  if (rem.length == 9) {
    firstCell = corners[Math.floor(Math.random() * 4)];
    return firstCell;
  }
  if (rem.length == 7) {
    if (
      player.includes(2) ||
      player.includes(4) ||
      player.includes(6) ||
      player.includes(8)
    ) {
      return 5;
    }
    if (firstCell == 1) {
      if (player.includes(3) || player.includes(7)) {
        return 9;
      }
      if (player.includes(9)) {
        return 3;
      }
      if (player.includes(5)) {
        return 9;
      }
    } else if (firstCell == 3) {
      if (player.includes(1) || player.includes(9)) {
        return 7;
      }
      if (player.includes(7)) {
        return 1;
      }
      if (player.includes(5)) {
        return 7;
      }
    } else if (firstCell == 7) {
      if (player.includes(1) || player.includes(9)) {
        return 3;
      }
      if (player.includes(3)) {
        return 1;
      }
      if (player.includes(5)) {
        return 3;
      }
    } else {
      if (player.includes(3) || player.includes(7)) {
        return 1;
      }
      if (player.includes(1)) {
        return 3;
      }
      if (player.includes(5)) {
        return 1;
      }
    }
  }
  if (player.includes(2) && player.includes(4) && rem.includes(1)) {
    return 1;
  }
  if (player.includes(2) && player.includes(6) && rem.includes(3)) {
    return 3;
  }
  if (player.includes(4) && player.includes(8) && rem.includes(7)) {
    return 7;
  }
  if (player.includes(6) && player.includes(8) && rem.includes(9)) {
    return 9;
  }
  if (rem.includes(5)) {
    return 5;
  }
  if (rem.includes(1)) {
    return 1;
  }
  if (rem.includes(3)) {
    return 3;
  }
  if (rem.includes(7)) {
    return 7;
  }
  if (rem.includes(9)) {
    return 9;
  }
  return rem[0];
}

function cpuMove() {
  let playerMoves = check("playerMoves", "").split(",");
  let cpuMoves = check("cpuMoves", "").split(",");
  let remainingMoves = check("remainingMoves", "1,2,3,4,5,6,7,8,9").split(",");
  if (playerMoves[0] == "") {
    playerMoves = [];
  }
  if (cpuMoves[0] == "") {
    cpuMoves = [];
  }
  if (remainingMoves[0] == "") {
    remainingMoves = [];
  }
  playerMoves = playerMoves.map((x) => Number(x));
  cpuMoves = cpuMoves.map((x) => Number(x));
  remainingMoves = remainingMoves.map((x) => Number(x));
  const index = bestMove(playerMoves, cpuMoves, remainingMoves);
  cpuMoves.push(index);
  remainingMoves.splice(
    remainingMoves.findIndex((x) => x == index),
    1
  );
  localStorage.setItem("cpuMoves", cpuMoves);
  localStorage.setItem("remainingMoves", remainingMoves);
  onePlayer(remainingMoves.length == 0);
}

function onePlayerMode() {
  const name = document.getElementById("onePlayerName").value.trim();
  if (name) {
    localStorage.setItem("name", name);
    window.open("onePlayer.html", "_self");
    localStorage.setItem("gameOnProgress", 1);
    onePlayer();
  } else {
    document.getElementById("required").innerHTML = `
    #onePlayerName {
        animation-name: required;
        animation-duration: 1s;
      }
      @keyframes required {
        from {
          border: 1px solid red;
          box-shadow: 0 0 30px red;
        }
      }
    `;
    setTimeout(
      () => (document.getElementById("required").innerHTML = ``),
      1000
    );
  }
}
function onePlayerInput() {
  window.open("inputOnePlayer.html", "_self");
}

function twoPlayersInput() {
  window.open("inputTwoPlayers.html", "_self");
}
function twoPlayersMode() {
  const firstName = document.getElementById("firstPlayerName").value.trim();
  const secondName = document.getElementById("secondPlayerName").value.trim();
  if (firstName && secondName) {
    if (firstName == secondName) {
    }
    localStorage.setItem("firstPlayerName", firstName);
    localStorage.setItem("secondPlayerName", secondName);
    window.open("twoPlayers.html", "_self");
    localStorage.setItem("gameOnProgress", 2);
    twoPlayers();
    return;
  }
  if (!firstName) {
    document.getElementById("required-1").innerHTML = `
      #firstPlayerName {
          animation-name: required;
          animation-duration: 1s;
        }
        @keyframes required {
          from {
            border: 1px solid red;
            box-shadow: 0 0 30px red;
          }
        }
      `;
    setTimeout(
      () => (document.getElementById("required-1").innerHTML = ``),
      1000
    );
  }
  if (!secondName) {
    document.getElementById("required-2").innerHTML = `
      #secondPlayerName {
          animation-name: required;
          animation-duration: 1s;
        }
        @keyframes required {
          from {
            border: 1px solid red;
            box-shadow: 0 0 30px red;
          }
        }
      `;
    setTimeout(
      () => (document.getElementById("required-2").innerHTML = ``),
      1000
    );
  }
}
function twoPlayers(itsAtie) {
  const firstPlayerScore = check("firstPlayerScore", 0);
  const ties = check("ties", 0);
  const secondPlayerScore = check("secondPlayerScore", 0);
  const firstPlayer = document.getElementById("firstPlayer");
  const secondPlayer = document.getElementById("secondPlayer");
  firstPlayer.innerHTML = `${localStorage.getItem("firstPlayerName")}
        <p id="firstPlayerScore"></p>
        `;
  secondPlayer.innerHTML = `${localStorage.getItem("secondPlayerName")}
        <p id="secondPlayerScore"></p>
        `;
  document.getElementById("firstPlayerScore").textContent = firstPlayerScore;
  document.getElementById("ties").textContent = ties;
  document.getElementById("secondPlayerScore").textContent = secondPlayerScore;
  const games =
    Number(firstPlayerScore) + Number(ties) + Number(secondPlayerScore);
  if (games % 2 == 0) {
    player1 = player1Default;
    player2 = player2Default;
    firstPlayer.className = "col col-4 bg-info";
    secondPlayer.className = "col col-4 bg-warning";
  } else {
    player1 = player2Default;
    player2 = player1Default;
    secondPlayer.className = "col col-4 bg-info";
    firstPlayer.className = "col col-4 bg-warning";
  }
  let firstPlayerMoves = check("firstPlayerMoves", "").split(",");
  let secondPlayerMoves = check("secondPlayerMoves", "").split(",");
  let remainingMoves =
    itsAtie == 1 ? [] : check("remainingMoves", "1,2,3,4,5,6,7,8,9").split(",");
  if (firstPlayerMoves[0] == "") {
    firstPlayerMoves = [];
  }
  if (secondPlayerMoves[0] == "") {
    secondPlayerMoves = [];
  }
  if (remainingMoves[0] == "") {
    remainingMoves = [];
  }
  firstPlayerMoves = firstPlayerMoves.map((x) => Number(x));
  secondPlayerMoves = secondPlayerMoves.map((x) => Number(x));
  remainingMoves = remainingMoves.map((x) => Number(x));
  firstPlayerMoves.forEach((i) => {
    const cell = document.getElementById(`cell-${i}`);
    cell.innerHTML = player1;
    cell.disabled = true;
    cell.style.opacity = 1;
    cell.onmouseenter = () => {};
    cell.onmouseleave = () => {};
  });
  secondPlayerMoves.forEach((i) => {
    const cell = document.getElementById(`cell-${i}`);
    cell.innerHTML = player2;
    cell.disabled = true;
    cell.style.opacity = 1;
    cell.onmouseenter = () => {};
    cell.onmouseleave = () => {};
  });
  remainingMoves.forEach((i) => {
    const cell = document.getElementById(`cell-${i}`);
    cell.innerHTML = ``;
    cell.style.opacity = 1;
    cell.disabled = false;
    cell.onmouseenter = () => {
      document.getElementById(`cell-${i}`).innerHTML = player1;
      document.getElementById(`cell-${i}`).style.opacity = 0.2;
    };
    cell.onmouseleave = () => {
      document.getElementById(`cell-${i}`).innerHTML = ``;
      document.getElementById(`cell-${i}`).style.opacity = 1;
    };
  });
  if (checkWinner(firstPlayerMoves)) {
    playerOne(checkWinner(firstPlayerMoves), games % 2, "firstPlayerScore");
    return;
  }
  if (checkWinner(secondPlayerMoves)) {
    playerTwo(checkWinner(secondPlayerMoves), games % 2, "secondPlayerScore");
    return;
  }
  if (itsAtie == 1) {
    Tie();
    return;
  }
  document.getElementById("turn").innerHTML = `${localStorage.getItem(
    (remainingMoves.length + games) % 2 == 1
      ? "firstPlayerName"
      : "secondPlayerName"
  )} <br/>Turn`;
}

function put2(index) {
  const firstPlayerScore = check("firstPlayerScore", 0);
  const ties = check("ties", 0);
  const secondPlayerScore = check("secondPlayerScore", 0);
  const games =
    Number(firstPlayerScore) + Number(ties) + Number(secondPlayerScore);
  let firstPlayerMoves = check("firstPlayerMoves", "").split(",");
  let secondPlayerMoves = check("secondPlayerMoves", "").split(",");
  let remainingMoves = check("remainingMoves", "1,2,3,4,5,6,7,8,9").split(",");
  if (firstPlayerMoves[0] == "") {
    firstPlayerMoves = [];
  }
  if (secondPlayerMoves[0] == "") {
    secondPlayerMoves = [];
  }
  if (remainingMoves[0] == "") {
    remainingMoves = [];
  }
  firstPlayerMoves = firstPlayerMoves.map((x) => Number(x));
  secondPlayerMoves = secondPlayerMoves.map((x) => Number(x));
  remainingMoves = remainingMoves.map((x) => Number(x));
  ((remainingMoves.length + games) % 2 == 1
    ? firstPlayerMoves
    : secondPlayerMoves
  ).push(index);
  remainingMoves.splice(
    remainingMoves.findIndex((x) => x == index),
    1
  );
  localStorage.setItem("firstPlayerMoves", firstPlayerMoves);
  localStorage.setItem("secondPlayerMoves", secondPlayerMoves);
  localStorage.setItem("remainingMoves", remainingMoves);
  twoPlayers(remainingMoves.length == 0);
}
