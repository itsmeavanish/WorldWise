const admin = require('firebase-admin');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');

const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccountBase64) {
  throw new Error('Missing FIREBASE_SERVICE_ACCOUNT environment variable');
}

const serviceAccount = JSON.parse(
  Buffer.from(serviceAccountBase64, 'base64').toString('utf-8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'worldwise-e2399.appspot.com',
});

const db = getFirestore();
const bucket = getStorage().bucket();

module.exports = { admin, db, bucket, FieldValue };
