const admin = require('firebase-admin');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'worldwise-e2399.firebasestorage.app', // ✅ correct format
});

const db = getFirestore();        // ✅ FIXED
const bucket = getStorage().bucket();  // ✅ FIXED
module.exports = { admin, db, bucket, FieldValue };
