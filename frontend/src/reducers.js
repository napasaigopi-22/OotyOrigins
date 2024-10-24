const initialState = {
    user:{},
    userId:"",
    todos: [
      { id: 0, text: 'Learn React', completed: true },
      { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
      { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
    ],
    filters: {
      status: 'All',
      colors: []
    }
  }

  // Use the initialState as a default value
  export default function rootReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case "updateUser":
            return {
                ...state,
                user: state.user + action.payload
              };
      // Do something here based on the different types of actions
      default:
        console.log("no action found");
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
  }