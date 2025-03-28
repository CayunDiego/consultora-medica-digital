import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

let net;
if (typeof window === 'undefined') {
  net = require('net');
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SHEET_ID = [process.env.GOOGLE_SHEETS_SHEET_ID, process.env.GOOGLE_SHEETS_SHEET_ID2];

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

export const appendSpreadsheet = async (row, n_sheet ) => {
  const sheetID = SHEET_ID[n_sheet]
  try {
    await doc.loadInfo(); // Carga las propiedades del documento y las hojas
    console.log(doc.sheetsById); // Verifica las hojas disponibles
    const sheet = doc.sheetsById[sheetID];
    if (!sheet) {
      throw new Error(`Sheet with ID ${sheetID} not found`);
    }
    await sheet.loadHeaderRow(); // Asegúrate de que los encabezados estén cargados
    console.log(sheet.headerValues); // Verifica los encabezados de la hoja
    await sheet.addRow(row);
  } catch (e) {
    console.error('Error: ', e);
  }
};