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

export const insertNewUser = async (existData, newUser) => {
  const updateValues = [];
  const existDataLength = existData[0].length;
  for (let i = 1; i < existDataLength; i++) {
    updateValues.push([existData[0][i], existData[1][i], existData[2][i]]);
  }
  await service.spreadsheets.values.update({
    spreadsheetId,
    range: spreadsheetName,
    valueInputOption: "RAW",
    requestBody: {
      values: [
        ["이름", "패널티 카운트", "제출 일자"],
        ...updateValues,
        [newUser, 0, formatToday()],
      ],
    },
  });
};
