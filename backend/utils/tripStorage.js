const { db } = require('./firebase'); // or use Mongo
const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');

async function uploadTripJson(tripData, city) {
  const filename = `${city}_${Date.now()}.json`;
  const filePath = path.join(__dirname, '../trips', filename);
  fs.writeFileSync(filePath, JSON.stringify(tripData, null, 2));
  return `/trips/${filename}`; // use storage URL if uploaded elsewhere
}

async function saveTripMetadata({ userId, city, path }) {
  const newTrip = {
    id: uuid(),
    userId,
    city,
    path,
    createdAt: new Date().toISOString(),
  };

  await db.collection('tripMetadata').doc(newTrip.id).set(newTrip);
  return newTrip;
}

module.exports = { uploadTripJson, saveTripMetadata };
