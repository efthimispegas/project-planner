const initState = {};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT_SUCCESS':
      console.log('created project', action.project);
      return {
        ...state,
        project: action.project
      };

    case 'CREATE_PROJECT_ERROR':
      console.log('create project error', action.error);
      return { ...state };

    default:
      return { ...state };
  }
};

export default projectReducer;
