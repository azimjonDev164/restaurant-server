const client = require("./typesenseClient");

async function createCollection() {
  const schema = {
    name: "dishes",
    fields: [
      { name: "id", type: "string" },
      { name: "name", type: "string" },
      { name: "category", type: "string", facet: true },
      { name: "price", type: "float" }, // ✅ changed from string → float
      { name: "image", type: "string", optional: true },
    ],
  };

  try {
    // optional: delete existing collection first if it already exists
    try {
      await client.collections("dishes").delete();
      console.log("🗑️ Old collection deleted");
    } catch (err) {
      console.log("ℹ️ No existing collection found, creating new one");
    }

    const result = await client.collections().create(schema);
    console.log("✅ Collection created:", result);
  } catch (err) {
    console.error("❌ Error creating collection:", err);
  }
}

createCollection();
