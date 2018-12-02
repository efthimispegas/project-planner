import { capitalize } from 'lodash';

export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS', credentials });
      })
      .catch(error => {
        dispatch({ type: 'LOGIN_FAIL', error });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const { email, password, firstname, lastname } = newUser;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        const { user } = response;

        firestore
          .collection('Users')
          .doc(user.uid)
          .set({
            firstname,
            lastname,
            initials: capitalize(firstname[0]) + capitalize(lastname[0])
          });
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch(error => {
        dispatch({ type: 'SIGNUP_FAIL', error });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      })
      .catch(error => {
        dispatch({ type: 'SIGNOUT_FAIL' });
      });
  };
};
