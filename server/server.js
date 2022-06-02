require("dotenv").config();
const { initializeApp } = require("firebase/app");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

console.log(process.env.PORT);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`STARDUST Game Server listening on port ${PORT}`);
});

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = JSON.parse(process.env.FIREBASECONFIG);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
