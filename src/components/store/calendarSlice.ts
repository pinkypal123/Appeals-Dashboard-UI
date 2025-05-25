
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type EventType = 'event' | 'reminder';

interface CalendarEntry {
  id: string;
  date: string;
  type: EventType;
  title: string;
}

interface CalendarState {
  entries: CalendarEntry[];
}

const initialState: CalendarState = {
  entries: [],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<CalendarEntry>) => {
      state.entries.push(action.payload);
    },
    deleteEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
    updateEntry: (state, action: PayloadAction<CalendarEntry>) => {
      const index = state.entries.findIndex(e => e.id === action.payload.id);
      if (index !== -1) state.entries[index] = action.payload;
    },
  },
});

export const { addEntry, deleteEntry, updateEntry } = calendarSlice.actions;
export default calendarSlice.reducer;
