const apiKey = process.env.KIE_API_KEY;
const taskId = "a8d582fccbc207473ea907705bd90f64";

if (!apiKey) {
  console.error("Error: KIE_API_KEY is not set.");
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function pollTask() {
  console.log(`Polling status for task: ${taskId}...`);

  while (true) {
    try {
      const response = await fetch(
        `https://api.kie.ai/api/v1/flux/kontext/record-info?taskId=${taskId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || JSON.stringify(data));
      }

      const state = data.data?.state;

      if (state === "success") {
        console.log("\n Image ready! Details:");
        console.log(JSON.stringify(data.data, null, 2));
        break;
      } else if (state === "failed") {
        console.error("\n Generation failed:", data.data);
        break;
      } else {
        process.stdout.write(".");
        await sleep(3000); // Check every 3 seconds
      }
    } catch (err) {
      console.error("\nError checking status:", err.message);
      break;
    }
  }
}

pollTask();