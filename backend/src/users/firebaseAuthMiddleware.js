const admin = require('firebase-admin');

/**
 * Middleware to authenticate requests using Firebase Authentication
 * Extracts and verifies the Firebase ID token from the Authorization header
 */
const firebaseAuthMiddleware = async (req, res, next) => {
  // Skip auth for development if needed
  if (process.env.SKIP_AUTH === 'true') {
    req.user = { uid: 'dev-user-id' };
    return next();
  }

  // Check for Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'No valid authorization token provided',
    });
  }

  // Extract the token
  const idToken = authHeader.split('Bearer ')[1];

  try {
    // Verify the token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Add user data to request object
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      // Add any other fields you need
    };

    next();
  } catch (error) {
    console.error('Error verifying Firebase token:', error);

    // Return appropriate error response based on the error
    if (error.code === 'auth/id-token-expired') {
      return res
        .status(401)
        .json({ error: 'Unauthorized', message: 'Token expired' });
    } else if (error.code === 'auth/id-token-revoked') {
      return res
        .status(401)
        .json({ error: 'Unauthorized', message: 'Token revoked' });
    }

    // Default unauthorized response
    return res
      .status(401)
      .json({ error: 'Unauthorized', message: 'Invalid token' });
  }
};

module.exports = firebaseAuthMiddleware;
