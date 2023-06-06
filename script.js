let fields = [
    'circle',
    'cross',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
]

function init() {
    render();
}

function render() {
  let tableHTML = '<table>';
  for (let i = 0; i < 3; i++) {
    tableHTML += '<tr>';
    for (let j = 0; j < 3; j++) {
      let index = i * 3 + j;
      let fieldValue = fields[index];

      tableHTML += '<td onclick="handleClick(this)">';

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

  let contentDiv = document.getElementById('content');
  contentDiv.innerHTML = tableHTML;
}

function handleClick(td) {
  let index = Array.from(td.parentNode.children).indexOf(td);
  if (fields[index] === null) {
    if (fields.filter((field) => field !== null).length % 2 === 0) {
      fields[index] = 'circle';
      td.innerHTML = generateCircleSVG();
    } else {
      fields[index] = 'cross';
      td.innerHTML = generateCrossSVG();
    }
    td.onclick = null;
  }
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