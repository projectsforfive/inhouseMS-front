import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ProfileType } from '@/types/profileTypes'; // Ensure ProfileType is correctly defined

// Define a type for the initial state
interface ProfileState {
  profile: ProfileType;
  loading: boolean; // To manage loading state
  error: string | null; // To manage error state
}

// Set the initial state
const initialState: ProfileState = {
  profile: {
    userName: 'John',
    email: 'john.doe@example.com',
    team: ['Team 1'],
    birthday: '1990-01-01',
    language: ['English']
  },
  loading: false,
  error: null,
};

// API URL
const API_URL = 'https://api.example.com/profiles'; // Update based on your backend

// Create an async thunk for fetching user profile
export const fetchProfile = createAsyncThunk<ProfileType, number>(
  'profile/fetchProfile',
  async (userId: number) => {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data; // Directly return the data
  }
);

// Create an async thunk for updating user profile
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData: FormData) => {
    const response = await axios.put(`${API_URL}/${profileData.get('id')}`, profileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Return the updated profile
  }
);

// Create the profile slice
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Profile
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true; // Set loading state to true
        state.error = null; // Reset error state
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false; // Set loading state to false
        state.profile = action.payload; // Store fetched profile in state
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false; // Set loading state to false
        state.error = action.error.message || 'Failed to fetch profile'; // Set error message
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true; // Set loading state to true during the request
        state.error = null; // Reset error state
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false
        state.profile = action.payload; // Update the profile in the state
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false; // Set loading to false
        state.error = action.error.message || 'Failed to update profile'; // Set error message
      });
  },
});

// Export actions
export default profileSlice.reducer;
