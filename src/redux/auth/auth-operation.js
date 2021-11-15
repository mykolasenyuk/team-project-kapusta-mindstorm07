import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const logIn = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const { data } = await axios.post("/users/login", credentials);
    token.set(data.token);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const signUp = createAsyncThunk("auth/signup", async (credentials) => {
  try {
    const { data } = await axios.post("/users/signup", credentials);

    token.set(data.token);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
});

// export const signUp = createAsyncThunk('auth/signup', async (credentials) => {
//   try {
//     const { data } = await axios.post('/users/signup', credentials)

//     if (data) {
//       try {
//         const { data } = await axios.post('/users/login', credentials)
//         token.set(data.token)

//         return data
//       } catch (error) {
//         return Promise.reject(error)
//       }
//     }

//     return data
//   } catch (error) {
//     return Promise.reject(error)
//   }
// })

export const logOut = createAsyncThunk("auth/logout", async () => {
  try {
    const { data } = await axios.post("/users/logout");
    token.unset();

    return data;
  } catch (error) {}
});

// export const fetchCurrentUser = createAsyncThunk(
//   'auth/refreh',
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState()
//     const persistedToken = state.auth.token

//     console.log(persistedToken)
//     if (!persistedToken) {
//       return state
//       //thunkAPI.rejectWithValue()
//     }

//     token.set(persistedToken)

//     try {
//       const { data } = await axios.get('/users/current')
//       return data
//     } catch (error) {
//       return Promise.reject(error)
//     }
//   },
// )

export const fetchCurrentUser = createAsyncThunk(
  "auth/refreh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    console.log(persistedToken);
    try {
      if (persistedToken === null) {
        return thunkAPI.rejectWithValue();
      }
      token.set(persistedToken);
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);