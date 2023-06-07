const admin = require('firebase-admin');
// import env vars from env.example file
require('dotenv').config();

const serviceAccount = {
  "type": "service_account",
  "project_id": "autopassport-chl",
  "private_key_id": "884091a729551afb0ce770c7093c033419aa7705",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDB2PvijtUAIhBv\nKXYnNnwgx4eQEJldqO3+gOf2/JofIbvOWfVF4cfwEFo7scyNXJv/7VGkQCp+xF5b\nYvnEVBFT5CY1/TDiSCNDIw+wLY8RkUROoFoX5UvXoKrG3mh8L8M17dJ4S7u9hhtA\nPXV7vKkblsYmKDuYPkj6JtBxmPVlxNNQcW/oKTbz5Q4hUA8VT0QgD2zpaVNdKxEo\nYTtvxUIBkwIsPev6z0QQOxJLiob1bIDsytsXXnQctjM4Vr2CtS6TjqIE6J4rrELV\nau86StiXVKPUNy294fkGCexn/LjqkrjzdC+Do6a9pHYlpr7LDg/HOMGnyZyIGxpI\ndA/2IA0BAgMBAAECggEACqBC2n365hl37igHLooZjtBxOW/3gD9Y4HkffhYFuswm\nF98th0mjpKC42YnbDSq08HgJYCgWTEGmbHsF9wGmu4MHpzD8Y4MRz8XVv9IXhB6C\n8I5wsdujZywLAIDDmH8jw8qIHYkFPxPhXYmg7Yn/eSAwN3pAHg3YAUJsbbW1SgFC\nFviVHTW+yJLmOjQqeiD/9w2i5z0XqDPhdyk4C6eg9vtGso+3LFzOjLfyxphs9jp+\nE5T2TC4RndqWIUSd3PXz1K1J1TZkwVoexNUObmw4E9StDvsU4NrnQJXy3A6+9um1\n9H3j3sxZ69dS8gYQZejW4Syq8StUw0rJkZvB/gMTiwKBgQDwyZ/xo5iHf9ab/zdD\nIlJzjSkT4OsyQ7CdlFseA//fqB6g9L2aFvLI/sJiTZHRnQwFWOCc0cGLN52YJ/hl\nqiF34o4Bp2GtlH5rwZEtbYR3iCS9TE/j3orJfK4macJqzem4dbIFIHnfeO8tCUTn\n5E1x4wpvvjnkjQPodiyTrRKQ2wKBgQDOGCzy5h7iYZZQ/Xof1hfsHKMnMi4KfT0x\nIC2mNnTaMz4IFSkLur7zLKg3z0g63+p0hI5KlvcabQJftxAOH1nUgRuGtjqoovId\nsvxVs1wzzlKlvqgORK/ujHGnbBo8mz2EKhxauTqdmny4gBv5m06m8LggrwCQI1Ak\nE2MghPoiUwKBgHOI6zvwuYFar8kOPp/x2goj02/8Xh4yKI6T3tyaIq5YZsnoZQmI\ntVoIE5FDkxI2/suaB7x3URzRxMZ7d06gwYpapLTacZ3uQHLH4Dch84u/QZGrCjJW\nV9WyA4Xe/TBuORUPNCoNmSzHREwhxHRYMWjR/fH8Hp8xooxqF52MT/o9AoGBAJU4\n8/K7pEkNl6T0o2RBw/h1k7xhnOyDWbckMWlTrLAAwj1f9ORFRtUT1Ij0ULwwPLY4\n9D4VqL09iKZ9Cebv1D8FbETR1Q8dTGksm4AB6hSoozbXIR+TpD74+aHbp/OSA6ya\nQQV/cG2E2iFMwPSt+vjs+qTPkXzL1M8KKo/1OJd5AoGAbI26dQX3oTmdCeI9LB3p\n7ccHPHET3VOHJOPLYnzE390AFdBrboHEBE3E8s5KI2ydrVgbzPNgqvXKAezC054c\n3nwvRj9wsO0D05G3a1pBEoF47gt7DLJ0QjRu/pcJlbreA2B/CvLPwEQpMu8vQg2E\nxvsfxK8hdOg0SlSemQYnvDA=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-b8k1m@autopassport-chl.iam.gserviceaccount.com",
  "client_id": "100069902742080220146",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b8k1m%40autopassport-chl.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;