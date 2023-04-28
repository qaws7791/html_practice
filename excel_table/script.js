const tbody = document.querySelector(".table tbody");
const dateFmt = "yyyy-mm-dd hh:mm:ss AM/PM";

function readExcel() {
  let reader = new FileReader();
  reader.onload = function () {
    let data = reader.result;
    let workBook = XLSX.read(data, { type: "binary" });
    workBook.SheetNames.forEach(function (sheetName) {
      const worksheet = workBook.Sheets[sheetName];
      const range = XLSX.utils.decode_range(worksheet["!ref"]);
      //1 - 3행은 헤더이므로 생략. 4부터 진행
      for (let rowNum = 4; rowNum <= range.e.r - range.s.r + 1; rowNum++) {
        const values = [];
        for (let colNum = 1; colNum <= range.e.c - range.s.c + 1; colNum++) {
          const cellAddress = XLSX.utils.encode_cell({
            r: rowNum - 1,
            c: colNum - 1,
          });
          const cell = worksheet[cellAddress] || { t: "s", v: "" };
          if (cell.t === "s" && colNum >= 9) {
            values.push(getHyperlinkAddress(cell));
          } else if (cell.t === "n" && colNum === 2) {
            const dateString = XLSX.SSF.format(dateFmt, cell.v);
            values.push(dateString);
          } else {
            values.push(cell.v);
          }
        }

        pushTable(values);
      }
    });
  };
  reader.readAsBinaryString(input.files[0]);
}

function pushTable(rows) {
  let tr = document.createElement("tr");
  const time = `${rows[1].slice(0, 10)} <br>${rows[1].slice(10)}`;
  const locList = rows[7].split(" ");
  const location = `
  ${locList.slice(0, 2).join(" ")} 
  <br> 
  ${locList.slice(2).join(" ")}`;
  tr.innerHTML = `
       <td>${rows[0]}</td>
       <td>${time}</td>
       <td>${rows[2]}</td>
       <td>${rows[3]}</td>
       <td>${rows[4]}</td>
       <td>${rows[5]}</td>
       <td>${rows[6]}</td>
       <td>${location}</td>
       <td><a href='${rows[8]}' class='link'>지도</a></td>
       <td><a href='${rows[9]}' class='link'>상세보기</a></td>
       <td><button class='btn'>보기</button></td>
     `;
  tbody.appendChild(tr);
}

function getHyperlinkAddress(cell) {
  if (cell.l) {
    return cell.l.Target;
  }
  return "-";
}
