import { FormData } from '@/types/form';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface FormState {
  entries: FormData[];
}

const initialState: FormState = {
  entries: [
    {
      id: '1',
      taxYear: 2017,
      company: 'First Coast Railroad Inc.',
      state: 'AL',
      assessor: 'Wilcox County Tax Collector',
      accountNumber: '1_87060',
      appealDate: '2025-05-13T05:55:19.000Z',
      appealBy: 'Jack Ryan',
      status: 'Sent',
      appealDeadline:"2025-05-13T05:55:19.000Z"
    },
    {
      id: '2',
      taxYear: 2021,
      company: 'Georgia Central Railway LP',
      state: 'KY',
      assessor: 'Pike County Revenue Commissioner',
      accountNumber: 'PUBUT - 000780 (TROY)-50054',
      appealDate: '2025-05-13T05:55:19.000Z',
      appealBy: 'Jack Ryan',
      status: 'Sent',
      appealDeadline:"2025-05-13T05:55:19.000Z"
    },
    {
      id: '3',
      taxYear: 2022,
      company: 'KWT Railway Inc.',
      state: 'UT',
      assessor: 'City Of Dublin',
      accountNumber: '400 294_400 294',
      appealDate: '2025-05-13T05:55:19.000Z',
      appealBy: 'Jack Ryan',
      status: 'Sent',
      appealDeadline:"2025-05-13T05:55:19.000Z"
    },
  ],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addEntry(state, action: PayloadAction<FormData>) {
      state.entries.unshift(action.payload); // Add at the top
    },
    updateEntry(state, action: PayloadAction<FormData>) {
      const index = state.entries.findIndex(e => e.id === action.payload.id);
      if (index !== -1) state.entries[index] = action.payload;
    },
    deleteEntry: (state, action) => {
  state.entries = state.entries.filter(entry => entry.id !== action.payload);
}
  },
});

export const { addEntry, updateEntry,deleteEntry} = formSlice.actions;
export default formSlice.reducer;
