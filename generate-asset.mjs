import fs from "fs";
import path from "path";

const apiKey = process.env.KIE_API_KEY;

if (!apiKey) {
  console.error("Error: KIE_API_KEY is not set. Check your .env.local file.");
  process.exit(1);
}

async function generateImage() {
  console.log("Connecting to Kie.ai API...");
  try {
    const response = await fetch("https://api.kie.ai/api/v1/flux/kontext/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: "A photorealistic, high-resolution product shot of premium industrial spare parts, precision-machined gears, metallic bearings, dark matte aluminum, polished steel, subtle Amber and Gold color accents, clean light gray studio background.",
        enableTranslation: true,
        aspectRatio: "1:1",
        outputFormat: "png",
        promptUpsampling: false,
        model: "flux-kontext-pro"
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || JSON.stringify(data));
    }

    console.log("Generation successful! Check the response for the image URL:");
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Failed to generate:", err.message);
  }
}

generateImage();