import axios from "axios";

const otcGuideAPI = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getExclusionQuestions = async (id: number) => {
  const response = await otcGuideAPI.get(`/disease-classes/${id}/exclusions`);
  return response.data;
};
