import { config } from "dotenv";
import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";
import { formatToday } from "./date.js";

config();

const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT_FILE;
const spreadsheetName = process.env.GOOGLE_SPREADSHEET_NAME;

const auth = new GoogleAuth({
  scopes: "https://www.googleapis.com/auth/spreadsheets",
  keyFile,
});
const service = google.sheets({ version: "v4", auth });

export const getValues = async () => {
  try {
    const result = await service.spreadsheets.values.get({
      spreadsheetId,
      range: spreadsheetName,
      majorDimension: "COLUMNS",
    });

    return result.data.values;
  } catch (err) {
    throw err;
  }
};

export const insertNewUser = async (insertIndex, newUser) => {
  try {
    await service.spreadsheets.values.update({
      spreadsheetId,
      range: `${spreadsheetName}!A${insertIndex}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[newUser, 0, formatToday()]],
      },
    });
  } catch (err) {
    throw err;
  }
};

export const updateValue = async (existIndex) => {
  try {
    await service.spreadsheets.values.update({
      spreadsheetId,
      range: `${spreadsheetName}!C${existIndex}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[formatToday()]],
      },
    });
  } catch (err) {
    throw err;
  }
};
