import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';

import {startClusterConnection} from '@redux/thunks/cluster';

import {DashboardMenu, DashboardState} from '@shared/models/dashboard';
import {trackEvent} from '@shared/utils/telemetry';

import {initialState} from './state';

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setActiveDashboardMenu: (state: Draft<DashboardState>, action: PayloadAction<DashboardMenu>) => {
      state.ui.activeMenu = action.payload;
    },
    setDashboardMenuList: (state: Draft<DashboardState>, action: PayloadAction<Array<DashboardMenu>>) => {
      state.ui.menuList = action.payload;
    },
    setDashboardSelectedResourceId: (state: Draft<DashboardState>, action: PayloadAction<string | undefined>) => {
      state.tableDrawer.selectedResourceId = action.payload;
    },
    setActiveTab: (state: Draft<DashboardState>, action: PayloadAction<'Info' | 'Manifest'>) => {
      state.ui.activeTab = action.payload;
      trackEvent('dashboard/selectTab', {tab: action.payload});
    },
  },
  extraReducers: builder => {
    builder.addCase(startClusterConnection.fulfilled, state => {
      state.tableDrawer.selectedResourceId = undefined;
    });
  },
});

export const {setActiveDashboardMenu, setDashboardMenuList, setDashboardSelectedResourceId, setActiveTab} =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
