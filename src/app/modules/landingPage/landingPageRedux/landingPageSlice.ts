import { createSlice } from "@reduxjs/toolkit";

const initialEmailTemplateState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  kBPortalForEdit: [],
  languageData: [],
  multiLangdata: [],
  lastError: null
};

export const callTypes = {
  list: "list",
  action: "action"
};

export const kBPortalSlice = createSlice({
  name: "emailTemplate",
  initialState: initialEmailTemplateState,
  reducers: {
    catchError: (state:any, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state:any, action) => {
      state.error = null;
      state.msg = null
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getEmailTemplateById
    emailTemplateFetched: (state:any, action) => {
      state.actionsLoading = false;
      state.kbsForEdit = action.payload.emailTemplateForEdit;
      state.error = null;
    },
    // findEmailTemplate
    emailTemplatesFetched: (state:any, action) => {
      state.kbsForEdit = ""
      state.msg = null

      const { totalItems, items } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = items;
      state.totalCount = totalItems;
    },
    // createEmailTemplate
    emailTemplateCreated: (state:any, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.msg = action.payload.message
      state.entities.push(action.payload.EmailtemplateForCreation);
    },
    // updateEmailTemplate
    emailTemplateUpdated: (state:any, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.msg = action.payload.msg
      state.entities = state.entities.map((entity:any) => {
        if (entity.id === action.payload.EmailTepmplate.id) {
          return action.payload.EmailTepmplate;
        }
        return entity;
      });
    },
    // deleteEmailTemplate
    emailTemplateDeleted: (state:any, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.msg = action.payload.msg
      state.entities = state.entities.filter((el:any) => el.id !== action.payload.id);
    },
    // deleteEmailTemplates
    emailTemplatesDeleted: (state:any, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.msg = action.payload.msg
      state.entities = state.entities.filter(
        (el:any) => !action.payload.ids.includes(el.id)
      );
    },
    // EmailTemplatesUpdateState
    emailTemplatesStatusUpdated: (state:any, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.msg = action.payload.msg
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity:any) => {
        if (ids.findIndex((id:number) => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },

    languageFetched: (state:any, action) => {
      const { totalItems, items } = action.payload
      state.actionsLoading = false;
      state.languageData = items;
      state.totalItems = totalItems;
      state.error = null;
    },

    emailTemplateData: (state:any, action) => {
      const { language_id, formate, subject, title } = action.payload
      state.multiLangdata[language_id] = { ...state.multiLangdata[language_id], language_id: language_id, formate: formate, subject: subject, title: title };
    }
  }

});
