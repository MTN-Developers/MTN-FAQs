import { createSlice } from "@reduxjs/toolkit";
import { OrganData, organsData } from "../../data/organsData";

interface OrgansState {
  data: OrganData[];
}

const initialState: OrgansState = {
  data: organsData,
};

export const organsSlice = createSlice({
  name: "organs",
  initialState,
  reducers: {
    // You can add reducers here if needed
  },
});

export default organsSlice.reducer;
