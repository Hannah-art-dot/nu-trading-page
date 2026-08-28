import fs from "fs";
import path from "path";

const apiKey = process.env.KIE_API_KEY;

if (!apiKey) {
  console.error("Error: KIE_API_KEY is not set. Check your .env.local file.");
  process.exit(1);
}

const servicePrompts = [
  {
    name: "adaptation",
    prompt: "A modern futuristic industrial technology adaptation lab, engineers integrating advanced circuit boards and automation panels, glowing amber light accents, dark tech aesthetic, photorealistic, 8k"
  },
  {
    name: "installation",
    prompt: "Professional industrial machinery installation, heavy-duty mechanical equipment setup by engineers in a high-tech factory, polished steel, subtle amber light highlights, photorealistic, 8k"
  },
  {
    name: "recruitment",
    prompt: "Professional team of diverse African technical specialists and engineers collaborating in a modern high-tech workspace, corporate industrial office, subtle amber accents, photorealistic, 8k"
  },
  {
    name: "training",
    prompt: "Hands-on technical training session in an advanced industrial facility, engineers learning how to operate CNC machinery and controllers, glowing amber highlights, photorealistic, 8k"
  },
  {
    name: "business-plan",
    prompt: "Strategic industrial business planning, architectural blueprints, futuristic financial graphs on digital screens, professional corporate environment, amber glow, photorealistic, 8k"
  },
  {
    name: "maintenance",
    prompt: "Precision industrial machinery maintenance, close up of an expert technician inspecting mechanical gears and components with diagnostic tools, dark moody lighting, amber accents, 8k"
  }
];

async function generateServiceImages() {
  console.log("Starting service image generation via Kie.ai...");

  for (const service of servicePrompts) {
    console.log(`\nGenerating image for: ${service.name}...`);
    try {
      const response = await fetch("https://api.kie.ai/api/v1/flux/kontext/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: service.prompt,
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

      console.log(`Success for ${service.name}! Response data:`);
      console.log(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(`Failed to generate ${service.name}:`, err.message);
    }
  }
}

generateServiceImages();