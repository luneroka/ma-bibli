const admin = require('firebase-admin');

const firebaseAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = { uid: decodedToken.uid };
    next();
  } catch (error) {
    console.error('Error verifying Firebase token', error);
    res.status(401).send({ error: 'Unauthorized' });
  }
};

module.exports = firebaseAuthMiddleware;
