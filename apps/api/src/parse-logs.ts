import * as fs from "fs";

const logPath = "C:\\Users\\DELL\\.gemini\\antigravity\\brain\\9d42bbf5-054f-4ef9-8544-34541151d438\\.system_generated\\tasks\\task-2610.log";
if (fs.existsSync(logPath)) {
  const content = fs.readFileSync(logPath, "utf-8");
  const lines = content.split("\n");
  const deleteLines = lines.filter(l => l.includes("DELETE") || l.includes("delete") || l.includes("Error") || l.includes("error"));
  console.log("Delete or error lines in logs:");
  console.log(deleteLines.slice(-30).join("\n"));
} else {
  console.log("Log file not found");
}
