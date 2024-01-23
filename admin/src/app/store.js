import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import drawerReducer from "../features/drawer/drawerSlice";
import tableReducer from "../features/table/tableSlice";
import { generalApi } from "../features/api/general";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    drawer: drawerReducer,
    table: tableReducer,
    [generalApi.reducerPath]: generalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(generalApi.middleware),
});
