const app = require("../app");
const path = require("path");
const db = require("../model/db");
const { createFoldereIsNotExist } = require("../helpers/foldersCreator");

const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);

db.then(() => {
  app.listen(PORT, async () => {
    await createFoldereIsNotExist(UPLOAD_DIR);
    console.log(`Server running. Use our API on port: ${PORT}`);
    console.log("Database connection successful");
  });
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
});
