/* eslint-disable no-unused-vars */
import { loadtv } from "../reducers/tvSlice";
import axios from "../../utils/Axios";

export const asyncloadtv = (id) => async(dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendation = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
    let theultimatedetails = {
        detail: detail.data,
        externalid: externalid.data,
        recommendation: recommendation.data.results,
        similar: similar.data.results,
        videos: videos.data.results.find((m)=> m.type === 'Trailer'),
        watchproviders: watchproviders.data.results.IN,
    }
    dispatch(loadtv(theultimatedetails));
   console.log(theultimatedetails);

  } catch (error) {
    console.log(error);
  }
};
