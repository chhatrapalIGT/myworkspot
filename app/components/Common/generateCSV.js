/* eslint-disable no-restricted-syntax */
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

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

export const generateCSV = (exportType, header, data, filename) => {
  if (exportType === 'CSV') {
    const csvData = arrayToCsv(header, data);
    download(csvData, filename, exportType);
  } else {
    download(data, filename, exportType);
  }
};

const fileType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

export const exportToSpreadsheet = async (data, Name) => {
  const fileName = Name;
  const workSheet = XLSX.utils.json_to_sheet(data);
  const workBook = {
    Sheets: { data: workSheet, cols: [] },
    SheetNames: ['data'],
  };
  const excelBuffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });
  const fileData = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(fileData, fileName + fileExtension);
};
