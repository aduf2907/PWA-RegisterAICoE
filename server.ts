import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for registration
  app.post("/api/register", async (req, res) => {
    try {
      const visitorData = req.body;
      console.log("Received visitor registration:", visitorData);

      const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

      if (webhookUrl) {
        console.log("Attempting to send data to webhook:", webhookUrl.substring(0, 30) + "...");
        
        // Basic validation to help user identify wrong URL
        if (webhookUrl.includes("docs.google.com/spreadsheets")) {
          console.error("ERROR: GOOGLE_SHEET_WEBHOOK_URL looks like a Spreadsheet URL, not an Apps Script Web App URL.");
          return res.status(200).json({ 
            success: true, 
            message: "Warning: URL might be wrong. Please use the Apps Script Web App URL, not the Spreadsheet URL." 
          });
        }

        try {
          const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(visitorData),
            redirect: "follow"
          });

          console.log("Google Apps Script response status:", response.status);

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to send data to Google Sheets. Status:", response.status);
            console.error("Response body snippet:", errorText.substring(0, 200));
          } else {
            const result = await response.json().catch(() => ({}));
            console.log("Data successfully sent to Google Sheets. Result:", result);
          }
        } catch (error) {
          console.error("Network error or timeout sending data to Google Sheets:", error);
        }
      } else {
        console.warn("GOOGLE_SHEET_WEBHOOK_URL is not set in environment variables.");
      }

      res.status(200).json({ success: true, message: "Registration successful" });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
