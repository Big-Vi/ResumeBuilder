import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Experience {
  id: number;
  title: string;
  employer: string;
  location: string;
  fromDate: string;
  toDate: string;
  currentlyWorking: boolean;
  responsibilities: string[];
}

interface ResumeState {
  resumeTitle: string;
  name: string;
  personalStatement: string;
  email: string;
  mobile: string;
  visaStatus: string;
  location: string;
  experiences: Experience[];
  clickedResume: [];
}

const initialState: ResumeState = {
  resumeTitle: '',
  name: '',
  personalStatement: '',
  email: '',
  mobile: '',
  visaStatus: '',
  location: '',
  experiences: [],
  clickedResume: [],
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    addResumeTitle: (state, action: PayloadAction<string>) => {
      state.resumeTitle = action.payload;
    },
    addResumeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addResumeEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    addResumeMobile: (state, action: PayloadAction<string>) => {
      state.mobile = action.payload;
    },
    addResumeVisa: (state, action: PayloadAction<string>) => {
      state.visaStatus = action.payload;
    },
    addResumeLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    addResumePersonalStatement: (state, action: PayloadAction<string>) => {
      state.personalStatement = action.payload;
    },
    setClickedResume: (state, action: PayloadAction<any>) => {
      state.clickedResume = action.payload;
    },
    setExperience: (state, action: PayloadAction<any>) => {
      state.experiences = action.payload;
    },
    editExperience: (state, action: PayloadAction<any>) => {
      state.experiences = {
        ...state.experiences,
        [action.payload.id]: {
          id: action.payload.id,
          title: action.payload.title,
          employer: action.payload.employer,
          location: action.payload.location,
          fromDate:
            action.payload.fromDate.split('"').length > 1
              ? action.payload.fromDate.split('"')[1]
              : action.payload.fromDate,
          toDate:
            action.payload.toDate.split('"').length > 1
              ? action.payload.toDate.split('"')[1]
              : action.payload.toDate,
          currentlyWorking: action.payload.currentlyWorking,
        },
      };
    },
    addExperience: (state, action: PayloadAction<any>) => {
      console.log(action);
      state.experiences = {
        ...state.experiences,
        [action.payload.id]: {
          id: action.payload.id,
          title: action.payload.title,
          employer: action.payload.employer,
          location: action.payload.location,
          fromDate:
            action.payload.fromDate.split('"').length > 1
              ? action.payload.fromDate.split('"')[1]
              : action.payload.fromDate,
          toDate:
            action.payload.toDate.split('"').length > 1
              ? action.payload.toDate.split('"')[1]
              : action.payload.toDate,
          currentlyWorking: action.payload.currentlyWorking,
        },
      };
    },
    deleteExperience: (state, action: PayloadAction<any>) => {
      delete state.experiences[action.payload];
    },
  },
});

export const {
  addResumeTitle,
  addResumeName,
  addResumeEmail,
  addResumeMobile,
  addResumeVisa,
  addResumeLocation,
  addResumePersonalStatement,
  setClickedResume,
  setExperience,
  editExperience,
  addExperience,
  deleteExperience,
} = resumeSlice.actions;

export default resumeSlice.reducer;
