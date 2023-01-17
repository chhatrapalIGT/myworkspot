/* eslint-disable no-restricted-syntax */
// Function to convert the JSON(Array of objects) to CSV.
const arrayToCsv = (headers, data) => {
  const csvRows = [];
  // getting headers.
  const headerValues = headers.map(header => header);
  csvRows.push(headerValues.join(`,`)); // Push into array as comma separated values
  // Getting rows.
  for (const row of data) {
    const rowValues = headers.map(header => {
      const escaped = ` ${row[header]}`.replace(/"/g, '\\'); // To replace the unwanted quotes.
      return `"${escaped}"`; // To escape the comma in a address like string.
    });
    csvRows.push(rowValues.join(`,`)); // Push into array as comma separated values.
  }
  return csvRows.join(`\n`); // To enter the next rows in the new line '\n'
};

// Function to download the generated CSV as a .csv file.
const download = (data, fileName, exportType) => {
  if (exportType === 'CSV') {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement(`a`);
    a.setAttribute(`hidden`, ``);
    a.setAttribute(`href`, url);
    a.setAttribute(`download`, `${fileName}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else if (exportType === 'XLSX') {
    const blob = new Blob([data], { type: 'text/xlsx' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement(`a`);
    a.setAttribute(`hidden`, ``);
    a.setAttribute(`href`, url);
    a.setAttribute(`download`, `${fileName}.xlsx`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    const blob = new Blob([data], { type: 'text/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement(`a`);
    a.setAttribute(`hidden`, ``);
    a.setAttribute(`href`, url);
    a.setAttribute(`download`, `${fileName}.sav`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

const generateCSV = (exportType, header, data, filename) => {
  if (exportType === 'CSV') {
    const csvData = arrayToCsv(header, data);
    download(csvData, filename, exportType);
  }
  if (exportType === 'XLSX') {
    const xlsData = arrayToCsv(header, data);
    download(xlsData, filename, exportType);
  }
};

export default generateCSV;
