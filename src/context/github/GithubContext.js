import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();
// const GITHUB_URL = process.env.REACT_APP_REACT_URL;
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
    repos: [],
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  //Get search result
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({ q: text });
    const res = await fetch(`https://api.github.com/search/users?${params}`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });

    const { items } = await res.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  //get Silgle user
  const getUser = async (login) => {
    setLoading();

    const res = await fetch(`https://api.github.com/users/${login}`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });

    if (res.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await res.json();

      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //Get user repos

  const getUserRepos = async (login) => {
    setLoading();

    const res = await fetch(
      `${process.env.REACT_APP_REACT_URL}/users/${login}/repos`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );

    const data = await res.json();

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };
  //ClearUser from state
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  //set Loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
