import fs from 'fs';
import path from 'path';

// Paste your generated Kie.ai image URL inside the quotes below
const IMAGE_URL = 'YOUR_KIE_AI_IMAGE_URL_HERE';
const outputPath = path.join(process.cwd(), 'public', 'about', 'about-hero.png');

// Ensure the target directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

async function downloadImage() {
  try {
    console.log('Downloading custom About image from Kie.ai...');
    const response = await fetch(IMAGE_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    console.log('✅ Success! Image saved to public/about/about-hero.png');
  } catch (error) {
    console.error('❌ Error downloading image:', error.message);
  }
}

downloadImage();