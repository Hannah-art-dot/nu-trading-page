import fs from "fs";
import path from "path";

// The direct URLs you retrieved from your Kie.ai logs dashboard
const imageLinks = [
  { name: "adaptation", url: "https://tempfile.aiquickdraw.com/a2/972c5362bf311a5d810c2df031ebc5ef_1787926580966.png" }, // Replace with your actual URL if needed
  { name: "installation", url: "https://tempfile.aiquickdraw.com/a2/16bbde87760cda4b26bc1fe16d649902_1787926596514.png" },
  { name: "recruitment", url: "https://tempfile.aiquickdraw.com/a2/5dcd0c0a541cdf55d55bbec0d4f60b8c_1787926588911.png" },
  { name: "training", url: "https://tempfile.aiquickdraw.com/a2/16bc4a3fe5287697d61466af02ed2c6b_1787926580455.png" },
  { name: "business-plan", url: "https://tempfile.aiquickdraw.com/a2/220c128de57d8adb419419d025c66dd4_1787926586647.png" },
  { name: "maintenance", url: "https://tempfile.aiquickdraw.com/a2/87bd7d7b6d48b055507c0ab8f9097f9d_1787926595374.png" }
];

async function downloadImages() {
  const dir = path.join(process.cwd(), "public", "services");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const item of imageLinks) {
    console.log(`Downloading ${item.name} from ${item.url}...`);
    try {
      const res = await fetch(item.url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(path.join(dir, `${item.name}.png`), buffer);
      console.log(`Saved: public/services/${item.name}.png`);
    } catch (err) {
      console.error(`Failed to download ${item.name}:`, err.message);
    }
  }
  console.log("All downloads complete!");
}

downloadImages();