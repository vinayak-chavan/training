const mongoose = require('mongoose');

(async () => {
  try {
    // mongodb://localhost:27017/todo-app?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
    await mongoose.connect(
      "mongodb+srv://vinayak:vinayak@cluster0.mjwtrzs.mongodb.net/todo-app?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (e) {
    console.log(`connection error ${e}`);
  }
})();

const db = mongoose.connection;

db.once("open", async () => {
  console.log(`✔ Successfully connected to mongodb database`);
});
db.on("error", () => {
  console.log(`connection error while connection at ${URL}`);
});
