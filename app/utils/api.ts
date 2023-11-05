import axios from "axios";

const otcGuideAPI = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getExclusionQuestions = async (id: number) => {
  const response = await otcGuideAPI.get(`/disease-classes/${id}/exclusions`);
  return response.data;
};

export const getAlgorithmStart = async (id: number) => {
  const response = await otcGuideAPI.get(
    `/disease-classes/${id}/algorithm-start`
  );
  return response.data;
};

export const getAlgorithmQuestion = async (id: number) => {
  const response = await otcGuideAPI.get(`/algorithm/${id}`);
  return response.data;
};
