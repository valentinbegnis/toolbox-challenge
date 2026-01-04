import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getFilesData } from '../api/filesApi'

export const fetchFilesData = createAsyncThunk(
  'files/fetchData',
  async (fileName) => {
    const data = await getFilesData(fileName)
    return data
  }
)

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    selectedFile: '',
    data: [],
    loading: false,
    error: null
  },
  reducers: {
    setSelectedFile (state, action) {
      state.selectedFile = action.payload
    },
    clearError (state) {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilesData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFilesData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchFilesData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || 'Unknown error'
      })
  }
})

export const { setSelectedFile, clearError } = filesSlice.actions
export default filesSlice.reducer
