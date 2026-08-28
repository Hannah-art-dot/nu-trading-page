import fs from "fs";
import path from "path";

const apiKey = process.env.KIE_API_KEY;

if (!apiKey) {
  console.error("CRITICAL ERROR: KIE_API_KEY is not set.");
  process.exit(1);
}

const tasks = [
  { name: "adaptation", taskId: "972c5362bf311a5d810c2df031ebc5ef" },
  { name: "installation", taskId: "16bbde87760cda4b26bc1fe16d649902" },
  { name: "recruitment", taskId: "5dcd0c0a541cdf55d55bbec0d4f60b8c" },
  { name: "training", taskId: "16bc4a3fe5287697d61466af02ed2c6b" },
  { name: "business-plan", taskId: "220c128de57d8adb419419d025c66dd4" },
  { name: "maintenance", taskId: "87bd7d7b6d48b055507c0ab8f9097f9d" }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function checkTask(task) {
  const dir = path.join(process.cwd(), "public", "services");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Try alternative path structures commonly used by AI wrappers
  const endpoints = [
    `https://api.kie.ai/api/v1/flux/task-status?taskId=${task.taskId}`,
    `https://api.kie.ai/api/v1/jobs/record?taskId=${task.taskId}`,
    `https://api.kie.ai/api/v1/flux/kontext/record?taskId=${task.taskId}`
  ];

  for (let attempt = 1; attempt <= 15; attempt++) {
    for (const url of endpoints) {
      try {
        const response = await fetch(url, {
          headers: { "Authorization": `Bearer ${apiKey}` },
        });

        if (response.ok) {
          const data = await response.json();
          const status = data.data?.status || data.status;
          console.log(`[${task.name}] Status via ${url}: ${status}`);

          if (status === "completed" || data.data?.imageUrl || data.data?.resultUrl) {
            const imageUrl = data.data?.imageUrl || data.data?.resultUrl || data.imageUrl;
            console.log(`[${task.name}] Downloading from ${imageUrl}...`);
            
            const imgRes = await fetch(imageUrl);
            const buffer = Buffer.from(await imgRes.arrayBuffer());
            fs.writeFileSync(path.join(dir, `${task.name}.png`), buffer);
            console.log(`[SUCCESS] Saved public/services/${task.name}.png`);
            return;
          }
        }
      } catch (e) {
        // Ignore and try next endpoint
      }
    }

    console.log(`[${task.name}] Attempt ${attempt}: Still processing, waiting 10s...`);
    await sleep(10000);
  }
}

async function main() {
  console.log("=== POLLING ALTERNATIVE KIE.AI ENDPOINTS ===");
  await Promise.all(tasks.map(task => checkTask(task)));
  console.log("=== DONE ===");
}

main();