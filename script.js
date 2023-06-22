let fields = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

let currentPlayer = 'cross';

function init() {
  render();
  document.getElementById('HeaderCircle').innerHTML = generateCircleSVG();
  document.getElementById('HeaderCross').innerHTML = generateCrossSVG();
}

function renderField(index) {
  const fieldValue = fields[index];

  const tdElement = document.getElementById(`cell-${index}`);
  tdElement.innerHTML = fieldValue === 'circle' ? generateCircleSVG() : generateCrossSVG();
}

function render() {
  let tableHTML = '<table>';
  for (let i = 0; i < 3; i++) {
    tableHTML += '<tr>';
    for (let j = 0; j < 3; j++) {
      let index = i * 3 + j;
      tableHTML += `<td id="cell-${index}" onclick="handleClick(${index})">`;

      const fieldValue = fields[index];
      if (fieldValue === 'circle') {
        tableHTML += generateCircleSVG();
      } else if (fieldValue === 'cross') {
        tableHTML += generateCrossSVG();
      }

      tableHTML += '</td>';
    }
    tableHTML += '</tr>';
  }
  tableHTML += '</table>';

  let contentDiv = document.getElementById('tableBackground');
  contentDiv.innerHTML = tableHTML;
}

function handleClick(index) {
  if (fields[index] === null) {
    fields[index] = currentPlayer;
    renderField(index);

    if (currentPlayer === 'circle') {
      currentPlayer = 'cross';
    } else {
      currentPlayer = 'circle';
    }
  }
  checkWinnerDialog();
}

function checkWinnerDialog() {
  if (checkWinner() == true) {
    document.getElementById('winnerDialog').classList.remove('dnone');
    if (currentPlayer == 'cross') {
      document.getElementById('winnerSymbol').innerHTML = generateCircleSVG();
    } else {
      document.getElementById('winnerSymbol').innerHTML = generateCrossSVG();
    }
  };
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Gewinnkombinationen
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Gewinnkombinationen
    [0, 4, 8], [2, 4, 6] // Diagonale Gewinnkombinationen
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      // Gewinner gefunden!
      const winningSymbols = [a, b, c];

      for (const symbol of winningSymbols) {
        const cellElement = document.getElementById(`cell-${symbol}`);
        drawWinnerLines(winningSymbols, cellElement);
      }
      return true;
    }
  }

  return false;
}

function drawWinnerLines(winningCombination, cellElement) {
  cellElement.classList.add('winner');
  JSON.stringify(winningCombination);
  if (winningCombination === [0, 3, 6] || winningCombination === [1, 4, 7] || winningCombination === [2, 5, 8]) {
    cellElement.classList.add('winnerVertical');
  } else if (winningCombination === [0, 4, 8]) {
    cellElement.classList.add('winnerDiagonalLeftRight');
  } else if (winningCombination === [2, 4, 6]) {
    cellElement.classList.add('winnerDiagonalRightLeft');
  }
}

function resetGame() {
  fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  currentPlayer = 'cross';
  document.getElementById('winnerDialog').classList.add('dnone');
  init();
}

function generateCircleSVG() {
  const color = "#00B0EF";
  const width = 70;
  const height = 70;
  const strokeWidth = 10;
  const animationDuration = 300;

  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashArray = `${circumference} ${circumference}`;
  const dashOffset = circumference;

  const svgCode = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <circle cx="${width / 2}" cy="${height / 2}" r="${radius}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-dasharray="${dashArray}" stroke-dashoffset="${dashOffset}">
          <animate attributeName="stroke-dashoffset" from="${dashOffset}" to="0" dur="${animationDuration}ms" begin="0s" fill="freeze" />
        </circle>
      </svg>
    `;

  return svgCode;
}

function generateCrossSVG() {
  const color = "#FFC000";
  const width = 70;
  const height = 70;
  const strokeWidth = width / 5;
  const animationDuration = 300;

  const svgCode = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="${color}" stroke-width="${strokeWidth}">
          <animate attributeName="stroke-dasharray" values="0 ${width}; ${width} 0" dur="${animationDuration}ms" begin="0s" fill="freeze" />
        </line>
        <line x1="0" y1="${height}" x2="${width}" y2="0" stroke="${color}" stroke-width="${strokeWidth}">
          <animate attributeName="stroke-dasharray" values="0 ${width}; ${width} 0" dur="${animationDuration}ms" begin="0s" fill="freeze" />
        </line>
      </svg>
    `;

  return svgCode;
}