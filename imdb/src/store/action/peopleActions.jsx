/* eslint-disable no-unused-vars */
import { loadperson } from "../reducers/personSlice";
import axios from "../../utils/Axios";

export const asyncloadperson = (id) => async(dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/combined_credits`);
    const combinedCredits = await axios.get(
      `/person/${id}/combined_credits`
    )
    const tvCredits = await axios.get(
      `/person/${id}/tv_credits`
    )
    const movieCredits = await axios.get(
      `/person/${id}/movie_credits`
    )

    let theultimateDetails = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data.cast,
      tvCredits: tvCredits.data.cast,
      movieCredits: movieCredits.data.cast
    }

    dispatch(loadperson(theultimateDetails));

  } catch (error) {
    console.log(error);
  }
};
