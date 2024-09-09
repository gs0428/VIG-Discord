import { config } from "dotenv";
import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";

config();

const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT_FILE;
const spreadsheetRange = process.env.GOOGLE_SPREADSHEET_RANGE;

async function getValues(range) {
  const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/spreadsheets",
    keyFile,
  });

  const service = google.sheets({ version: "v4", auth });
  try {
    const result = await service.spreadsheets.values.get({
      spreadsheetId,
      range,
      majorDimension: "COLUMNS",
    });
    return result;
  } catch (err) {
    throw err;
  }
}

getValues(spreadsheetRange);
