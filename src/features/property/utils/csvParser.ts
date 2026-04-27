import { PropertyPurpose, PropertyType } from "../types/enums";
import type { UpsertPropertyPayload } from "../types";

export type CsvRowError = {
  row: number;
  column: string;
  value: string;
  message: string;
};

export type CsvParseResult = {
  rows: UpsertPropertyPayload[];
  errors: CsvRowError[];
};

const REQUIRED_COLUMNS = [
  "property_name",
  "property_address",
  "property_type",
  "property_purpose",
] as const;

const OPTIONAL_COLUMNS = [
  "property_images",
  "property_id_prefix",
  "access_details",
  "city",
  "state",
  "number_of_unit",
  "number_of_floors",
] as const;

const ALL_COLUMNS = [...REQUIRED_COLUMNS, ...OPTIONAL_COLUMNS] as const;
type KnownColumn = (typeof ALL_COLUMNS)[number];

const VALID_PROPERTY_TYPES = Object.values(PropertyType);
const VALID_PROPERTY_PURPOSES = Object.values(PropertyPurpose);

function parseRawCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(field.trim());
        field = "";
      } else if (ch === "\n" || (ch === "\r" && next === "\n")) {
        if (ch === "\r") i++;
        row.push(field.trim());
        if (row.some((f) => f !== "")) rows.push(row);
        row = [];
        field = "";
      } else if (ch === "\r") {
        row.push(field.trim());
        if (row.some((f) => f !== "")) rows.push(row);
        row = [];
        field = "";
      } else {
        field += ch;
      }
    }
  }

  if (field !== "" || row.length > 0) {
    row.push(field.trim());
    if (row.some((f) => f !== "")) rows.push(row);
  }

  return rows;
}

function validateField(
  col: KnownColumn,
  value: string,
  row: number,
  errors: CsvRowError[]
) {
  const addError = (message: string) =>
    errors.push({ row, column: col, value, message });

  switch (col) {
    case "property_name":
      if (!value) addError("Property name is required");
      else if (value.length > 255)
        addError("Property name must be 255 characters or less");
      break;

    case "property_address":
      if (!value) addError("Property address is required");
      break;

    case "property_type":
      if (!value) {
        addError("Property type is required");
      } else if (!VALID_PROPERTY_TYPES.includes(value as PropertyType)) {
        addError(
          `Invalid property type. Must be one of: ${VALID_PROPERTY_TYPES.join(", ")}`
        );
      }
      break;

    case "property_purpose":
      if (!value) {
        addError("Property purpose is required");
      } else if (
        !VALID_PROPERTY_PURPOSES.includes(value as PropertyPurpose)
      ) {
        addError(
          `Invalid property purpose. Must be one of: ${VALID_PROPERTY_PURPOSES.join(", ")}`
        );
      }
      break;

    case "property_id_prefix":
      if (value && value.length > 10)
        addError("Property ID prefix must be 10 characters or less");
      break;

    case "number_of_unit":
      if (value !== "") {
        const n = Number(value);
        if (!Number.isInteger(n) || n < 0)
          addError("Number of units must be a non-negative integer");
      }
      break;

    case "number_of_floors":
      if (value !== "") {
        const n = Number(value);
        if (!Number.isInteger(n) || n < 0)
          addError("Number of floors must be a non-negative integer");
      }
      break;
  }
}

export function parsePropertyCSV(text: string): CsvParseResult {
  const rawRows = parseRawCSV(text.trim());

  if (rawRows.length === 0) {
    return {
      rows: [],
      errors: [{ row: 0, column: "—", value: "", message: "CSV file is empty" }],
    };
  }

  const headers = rawRows[0].map((h) => h.toLowerCase().trim());
  const errors: CsvRowError[] = [];

  // Check required columns exist
  for (const required of REQUIRED_COLUMNS) {
    if (!headers.includes(required)) {
      errors.push({
        row: 0,
        column: required,
        value: "",
        message: `Missing required column: "${required}"`,
      });
    }
  }

  // Warn about unknown columns
  for (const header of headers) {
    if (!ALL_COLUMNS.includes(header as KnownColumn)) {
      errors.push({
        row: 0,
        column: header,
        value: "",
        message: `Unknown column "${header}" — will be ignored`,
      });
    }
  }

  if (rawRows.length === 1) {
    errors.push({
      row: 0,
      column: "—",
      value: "",
      message: "CSV has no data rows (only a header was found)",
    });
    return { rows: [], errors };
  }

  const rows: UpsertPropertyPayload[] = [];

  for (let i = 1; i < rawRows.length; i++) {
    const rawRow = rawRows[i];
    const rowNumber = i;
    const get = (col: string): string =>
      (rawRow[headers.indexOf(col)] ?? "").trim();

    for (const col of ALL_COLUMNS) {
      if (headers.includes(col)) {
        validateField(col, get(col), rowNumber, errors);
      }
    }

    // Only collect a parsed row if its required fields are individually valid
    const rowErrors = errors.filter((e) => e.row === rowNumber);
    if (rowErrors.length === 0) {
      const numUnits = get("number_of_unit");
      const numFloors = get("number_of_floors");
      const images = get("property_images");

      rows.push({
        property_name: get("property_name"),
        property_address: get("property_address"),
        property_type: get("property_type") as PropertyType,
        property_purpose: get("property_purpose") as PropertyPurpose,
        property_images: images
          ? images.split("|").map((s) => s.trim()).filter(Boolean)
          : [],
        property_id_prefix: get("property_id_prefix") || undefined,
        access_details: get("access_details") || undefined,
        city: get("city") || undefined,
        state: get("state") || undefined,
        number_of_unit: numUnits !== "" ? Number(numUnits) : undefined,
        number_of_floors: numFloors !== "" ? Number(numFloors) : undefined,
      });
    }
  }

  return { rows, errors };
}

export function generateSampleCSV(): string {
  const headers = ALL_COLUMNS.join(",");
  const row1 = [
    "Sunrise Residency",
    "123 Main Street Karachi",
    "apartment",
    "residential",
    "https://example.com/img1.jpg|https://example.com/img2.jpg",
    "SR",
    "Gate pass required",
    "Karachi",
    "Sindh",
    "20",
    "5",
  ].join(",");
  const row2 = [
    "Business Tower",
    "Shahrah-e-Faisal Karachi",
    "office",
    "commercial",
    "",
    "BT",
    "Reception Desk",
    "Karachi",
    "Sindh",
    "50",
    "10",
  ].join(",");
  return [headers, row1, row2].join("\n");
}
