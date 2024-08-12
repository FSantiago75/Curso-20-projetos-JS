const converterForm = document.querySelector(".converter-form");
const textBox = document.querySelector(".textBox");
const resultBox = document.querySelector(".resultBox");
const jsonToCsv = document.querySelector(".JSON-to-CSV");
const csvToJson = document.querySelector(".CSV-to-JSON");

textBox.addEventListener("input", () => {
  if (textBox.value.trim() !== "") {
    textBox.style.backgroundColor = "#e8e8e8";
  } else {
    textBox.style.backgroundColor = "#f6f6f6";
  }
});

const isValidJson = (input) => {
  try {
    JSON.parse(input);
    return true;
  } catch (error) {
    return false;
  }
};

jsonToCsv.addEventListener("click", () => {
  console.log("---JSON to CSV---");
  const input = textBox.value.trim();
  console.log("isValidJson: " + isValidJson(input));
  if (!isValidJson(input)) {
    alert("Entrada inválida! Por favor, insira um JSON válido.");
    return;
  }

  const json = JSON.parse(input);
  const headers = Object.keys(json[0]);
  const csvRows = [];
  csvRows.push(headers.join(","));
  console.log(headers);

  for (const row of json) {
    const values = headers.map((header) => {
      let value = row[header];
      if (value === null || value === undefined) {
        value = "";
      } else if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      return value;
    });
    csvRows.push(values.join(","));
    console.log(csvRows);
  }

  const csv = csvRows.join("\n");
  console.log(csv);
  resultBox.style.display = "block";
  resultBox.textContent = csv;
  DownloadCSV(csv);
});

const DownloadCSV = (csv) => {
  const downloadLink = document.createElement("a");
  downloadLink.setAttribute(
    "href",
    "data:text/csv;charset=utf8," + encodeURIComponent(csv)
  );
  downloadLink.setAttribute("download", "YourCSV.csv");
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

csvToJson.addEventListener("click", () => {
  console.log("---CSV to JSON---");
  const csv = textBox.value.trim();
  const lines = csv.split("\n");
  console.log(lines);
  const headers = lines[0].split(",");
  console.log(headers);
  const json = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      let value = values[j];
      if (value[0] === "{" || value[0] === "[") {
        value = JSON.parse(value);
      }
      row[headers[j]] = value;
    }
    json.push(row);
  }
  console.log(json);
  resultBox.textContent = JSON.stringify(json, null, 2);
  resultBox.style.display = "block";
});

resultBox.addEventListener("click", () => {
  navigator.clipboard.writeText(resultBox.textContent);
  alert("Copiado para a Área de Trasnferência");
});
