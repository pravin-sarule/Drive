// const { Storage } = require('@google-cloud/storage');
// const admin = require('firebase-admin');
// require('dotenv').config();

// // Initialize Firebase Admin SDK
// const serviceAccount = require('../../gcs-key.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// // Initialize Google Cloud Storage
// const storage = new Storage({
//   projectId: serviceAccount.project_id,
//   keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
// });

// const bucket = storage.bucket(process.env.GCS_BUCKET);

// module.exports = { bucket, admin };

const { Storage } = require('@google-cloud/storage');

const keyBuffer = Buffer.from(process.env.GCS_KEY_BASE64, 'base64');
const gcsKey = JSON.parse(keyBuffer.toString());

const storage = new Storage({
  projectId: gcsKey.project_id,
  credentials: gcsKey,
});

module.exports = storage;
