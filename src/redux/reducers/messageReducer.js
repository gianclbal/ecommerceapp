const INITIAL_STATE = {
  messages: [],
  text: '',
  clientCount: 0,
  users: [],
};

// [db] (State)
// action -> redux
// reducers([db, action] -> [db])

const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.users,
      }
    case 'SET_CLIENT_COUNT':
      return {
        ...state,
        clientCount: action.clientCount,
      };
    case 'SET_TEXT':
      return {
        ...state,
        text: action.text,
      };
    case 'UPDATE_CHAT':
      return {
        ...state,
        messages: action.messages,
      }
    default:
      return state;
  }
};

export default messageReducer;