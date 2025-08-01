const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
// const { admin } = require('../config/gcs'); // For Firebase Admin SDK

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ username, email, password: hashedPassword, auth_type: 'manual' });

    const token = generateToken(user);
    res.status(201).json({ message: 'User registered successfully', token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ message: 'Logged in successfully', token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// const firebaseAuth = async (req, res) => {
//   const { idToken } = req.body;

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     const firebaseUid = decodedToken.uid;
//     const email = decodedToken.email;
//     const displayName = decodedToken.name || email.split('@')[0];
//     const profileImage = decodedToken.picture || null;

//     let user = await User.findByFirebaseUid(firebaseUid);

//     if (!user) {
//       // User does not exist, create a new user
//       user = await User.create({
//         username: displayName,
//         email: email,
//         firebase_uid: firebaseUid,
//         auth_type: 'firebase',
//         profile_image: profileImage,
//         password: null // Password is not required for Firebase auth
//       });
//     } else {
//       // User exists, update their profile image if it's changed
//       if (user.profile_image !== profileImage) {
//         await User.update(user.id, { profile_image: profileImage });
//         user.profile_image = profileImage; // Update the user object for the response
//       }
//     }

//     const token = generateToken(user);
//     res.status(200).json({ message: 'Firebase authentication successful', token, user: { id: user.id, username: user.username, email: user.email, profile_image: user.profile_image } });

//   } catch (error) {
//     console.error('Error during Firebase authentication:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

module.exports = { register, login };