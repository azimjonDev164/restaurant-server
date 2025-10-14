const express = require("express");
const router = express.Router();
const typesenseClient = require("../utils/typesenseClient");

// Example: /api/search?query=pilaf
router.get("/", async (req, res) => {
  const query = req.query.query || "";

  try {
    const searchResults = await typesenseClient
      .collections("dishes")
      .documents()
      .search({
        q: query,
        query_by: "name,category",
        sort_by: "price:asc", // optional
      });

    res.json(searchResults.hits.map((hit) => hit.document));
  } catch (err) {
    console.error("❌ Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
