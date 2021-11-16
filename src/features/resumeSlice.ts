import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Experience {
  id: number;
  title: string;
  employer: string;
  location: string;
  fromDate: string;
  toDate: string;
  order: number;
  currentlyWorking: boolean;
  responsibilities: string;
}

interface Qualification {
  id: number;
  title: string;
  institute: string;
  location: string;
  finishedDate: string;
  order: number;
}

interface Customize {
  template: string;
  color: string;
  font: string;
  lineHeight: string;
}

interface ResumeState {
  resumeTitle: string;
  name: string;
  personalStatement: string;
  email: string;
  mobile: string;
  visaStatus: string;
  location: string;
  order: string[];
  customize: Customize;
  skills: string;
  experiences: Experience[];
  qualifications: Qualification[];
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
  skills: '',
  order: [],
  customize: {template: '', color: '', font: '', lineHeight: ''},
  experiences: [],
  qualifications: [],
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
    setCustomizeResume: (state, action: PayloadAction<any>) => {
      state.customize = action.payload;
    },
    customizeResume: (state, action: PayloadAction<string>) => {
      state.customize = {
        ...state.customize,
        template: action.payload.template,
        color: action.payload.color,
        font: action.payload.font,
        lineHeight: action.payload.lineHeight,
      };
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
    addResumeSkills: (state, action: PayloadAction<string>) => {
      state.skills = action.payload;
    },
    setClickedResume: (state, action: PayloadAction<any>) => {
      state.clickedResume = action.payload;
    },
    setExperience: (state, action: PayloadAction<any>) => {
      state.experiences = action.payload;
    },
    setQualification: (state, action: PayloadAction<any>) => {
      state.qualifications = action.payload;
    },
    addResumeOrder: (state, action: PayloadAction<any>) => {
      state.order = action.payload;
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
          order: state.experiences[action.payload.id].order,
          currentlyWorking: action.payload.currentlyWorking,
          responsibilities: action.payload.responsibilities,
        },
      };
    },
    addExperience: (state, action: PayloadAction<any>) => {
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
          order: action.payload.order,
          currentlyWorking: action.payload.currentlyWorking,
        },
      };
    },
    deleteExperience: (state, action: PayloadAction<any>) => {
      delete state.experiences[action.payload];
    },
    editQualification: (state, action: PayloadAction<any>) => {
      state.qualifications = {
        ...state.qualifications,
        [action.payload.id]: {
          id: action.payload.id,
          title: action.payload.title,
          institute: action.payload.institute,
          location: action.payload.location,
          order: state.qualifications[action.payload.id].order,
          finishedDate:
            action.payload.finishedDate.split('"').length > 1
              ? action.payload.finishedDate.split('"')[1]
              : action.payload.finishedDate,
        },
      };
    },
    addQualification: (state, action: PayloadAction<any>) => {
      state.qualifications = {
        ...state.qualifications,
        [action.payload.id]: {
          id: action.payload.id,
          title: action.payload.title,
          institute: action.payload.institute,
          location: action.payload.location,
          order: action.payload.order,
          finishedDate:
            action.payload.finishedDate.split('"').length > 1
              ? action.payload.finishedDate.split('"')[1]
              : action.payload.finishedDate,
        },
      };
    },
    deleteQualification: (state, action: PayloadAction<any>) => {
      delete state.qualifications[action.payload];
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
  setQualification,
  editExperience,
  editQualification,
  addExperience,
  addQualification,
  addResumeOrder,
  deleteExperience,
  deleteQualification,
  addResumeSkills,
  setCustomizeResume,
  customizeResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;
