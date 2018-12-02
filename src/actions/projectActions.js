export const createProject = project => {
  return (dispatch, getState, { getFirestore }) => {
    //make an async call to database to fetch project
    const firestore = getFirestore();
    firestore
      .collection('Projects')
      .add({
        ...project,
        authorFirstname: 'Tim',
        authorLastname: 'Pegas',
        authorID: 1,
        date: new Date()
      })
      .then(() => {
        dispatch({ type: 'CREATE_PROJECT_SUCCESS', project });
      })
      .catch(error => {
        dispatch({ type: 'CREATE_PROJECT_FAIL', error });
      });
  };
};
