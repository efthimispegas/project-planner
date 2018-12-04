const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send('Hello, mofos');
// });

const createNotification = notification => {
  return admin
    .firestore()
    .collection('Notifications')
    .add(notification)
    .then(doc => console.log('notification created', doc));
};

exports.projectCreated = functions.firestore
  .document('Projects/{projectId}')
  .onCreate(doc => {
    const project = doc.data();

    const notification = {
      content: 'Added a new project',
      user: `${project.authorFirstname} ${project.authorLastname}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };

    return createNotification(notification);
  });

exports.userJoined = functions.auth.user().onCreate(user => {
  return admin
    .firestore()
    .collection('Users')
    .doc(user.uid)
    .get()
    .then(doc => {
      const newUser = doc.data();
      const notification = {
        content: 'Joined the party',
        user: `${newUser.firstname} ${newUser.lastname}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      };

      return createNotification(notification);
    });
});
