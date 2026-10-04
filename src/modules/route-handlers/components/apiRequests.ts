const NOTES = "/api/route-handlers/notes";

export type ApiRequest = {
  label: string;
  method: string;
  path: string;
  headers?: Record<string, string>;
  body?: string;
};

const JSON_HEADERS = { "Content-Type": "application/json" };

export const apiRequests: readonly ApiRequest[] = [
  { label: "GET /notes", method: "GET", path: NOTES },
  { label: "GET /notes?limit=abc", method: "GET", path: `${NOTES}?limit=abc` },
  { label: "POST a note", method: "POST", path: NOTES, headers: JSON_HEADERS, body: JSON.stringify({ text: "Hello from the console" }) },
  { label: "POST malformed JSON", method: "POST", path: NOTES, headers: JSON_HEADERS, body: "{not json" },
  { label: "POST empty text", method: "POST", path: NOTES, headers: JSON_HEADERS, body: JSON.stringify({ text: "" }) },
  { label: "POST as text/plain", method: "POST", path: NOTES, headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ text: "x" }) },
  { label: "GET /notes/1", method: "GET", path: `${NOTES}/1` },
  { label: "GET /notes/999", method: "GET", path: `${NOTES}/999` },
  { label: "DELETE /notes/1", method: "DELETE", path: `${NOTES}/1` },
  { label: "PUT /notes", method: "PUT", path: NOTES },
];
