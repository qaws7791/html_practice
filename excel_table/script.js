// Load the XLS file
const tbody = document.querySelector(".table tbody");
const dateFmt = "yyyy-mm-dd hh:mm:ss AM/PM";

function readExcel() {
  let input = event.target;
  let reader = new FileReader();
  reader.onload = function () {
    let data = reader.result;
    let workBook = XLSX.read(data, { type: "binary" });
    workBook.SheetNames.forEach(function (sheetName) {
      const worksheet = workBook.Sheets[sheetName];
      const range = XLSX.utils.decode_range(worksheet["!ref"]);
      console.log(range);
      for (let rowNum = 2; rowNum <= range.e.r - range.s.r + 1; rowNum++) {
        // Get the cell values for the row
        const values = [];
        for (let colNum = 1; colNum <= range.e.c - range.s.c + 1; colNum++) {
          const cellAddress = XLSX.utils.encode_cell({
            r: rowNum - 1,
            c: colNum - 1,
          });
          console.log(cellAddress);
          const cell = worksheet[cellAddress] || { t: "s", v: "" };
          console.log(cell);
          if (cell.t === "s" && colNum >= 9) {
            values.push(getHyperlinkAddress(cell));
          } else if (cell.t === "n" && colNum === 2) {
            // If the cell is a number and it's in the second column,
            // assume it's a date and time value and format it accordingly

            const dateString = XLSX.SSF.format(dateFmt, cell.v);
            values.push(dateString);
          } else {
            // Otherwise, use the cell value as is
            values.push(cell.v);
          }
        }

        // Use the cell values and hyperlink address
        console.log(values);
      }

      pushTable(rows);
    });
  };
  reader.readAsBinaryString(input.files[0]);
}
function excelSerialDateToJSDate(excelSerialDate) {
  const daysBeforeUnixEpoch = 70 * 365 + 19;
  const hour = 60 * 60 * 1000;

  return new Date(
    Math.round((excelSerialDate - daysBeforeUnixEpoch) * 24 * hour) + 12 * hour
  );
}

function pushTable(rows) {
  rows.map((row) => {
    const dateFmt = "yyyy-mm-dd hh:mm:ss AM/PM";
    const serialNumber = row.발생시각 - 52 / 86400;
    const dateString = XLSX.SSF.format(dateFmt, serialNumber);
    let tr = document.createElement("tr");
    tr.innerHTML = `
       <td>${row.번호}</td>
       <td>${dateString}</td>
       <td>${row.규모}</td>
       <td>${row["깊이(km)"]}</td>
       <td>${row["최대\n진도"]}</td>
       <td>${row.위도}</td>
       <td>${row.경도}</td>
       <td>${row.위치}</td>
       <td><button class='btn'>보기</button></td>
     `;
    tbody.appendChild(tr);
  });
}

function getHyperlinkAddress(cell) {
  if (cell.l) {
    return cell.l.Target;
  }
  return "-";
}
