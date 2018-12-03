export const createProject = project => {
  return (dispatch, getState, { getFirestore }) => {
    //make an async call to database to fetch project
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const uid = getState().firebase.auth.uid;
    firestore
      .collection('Projects')
      .add({
        ...project,
        authorFirstname: profile.firstname,
        authorLastname: profile.lastname,
        authorID: uid,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: 'CREATE_PROJECT_SUCCESS', project });
      })
      .catch(error => {
        dispatch({ type: 'CREATE_PROJECT_FAIL', error });
      });
  };
};
