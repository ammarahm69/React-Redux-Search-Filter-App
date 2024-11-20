import { createStore, combineReducers } from 'redux';


const initialUsersState = { users: [], searchQuery: '' };
const initialPostsState = { posts: [] };


const SET_USERS = 'SET_USERS';
const SET_POSTS = 'SET_POSTS';
const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';


export const setUsers = (users) => ({ type: SET_USERS, payload: users });
export const setPosts = (posts) => ({ type: SET_POSTS, payload: posts });
export const setSearchQuery = (query) => ({ type: SET_SEARCH_QUERY, payload: query });


const usersReducer = (state = initialUsersState, action) => {
  console.log('Users Reducer Triggered:', action);
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};


const postsReducer = (state = initialPostsState, action) => {
  console.log('Posts Reducer Triggered:', action);
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};

// Combine Reducers
const rootReducer = combineReducers({
  usersState: usersReducer,
  postsState: postsReducer,
});

// Create Store
const store = createStore(rootReducer);

// Log Initial State
console.log('Initial State:', store.getState());

// Subscribe to State Changes
store.subscribe(() => {
  console.log('Updated State:', store.getState());
});

export default store;
