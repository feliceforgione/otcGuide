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

export const getStartingUPCs = async (id: number) => {
  const response = await otcGuideAPI.get(`/upc/plan/${id}`);
  return response.data;
};

export const getContraindications = async (upcs: string) => {
  const response = await otcGuideAPI.get(
    `/upc/medical-conditions/?upcs=${upcs}`
  );
  return response.data;
};

export const getFilterQuestions = async (upcs: string) => {
  const response = await otcGuideAPI.get(`/upc/filter-questions/?upcs=${upcs}`);
  return response.data;
};

export const getSymptoms = async (id: number) => {
  const response = await otcGuideAPI.get(`/algorithm/symptoms/${id}`);
  return response.data;
};

export const getSymptomsCombo = async (id: number, combo: string) => {
  const response = await otcGuideAPI.get(
    `/algorithm/symptoms-combo/${id}/?combo=${combo}`
  );
  return response.data;
};

export const getAllergies = async (upcs: string) => {
  const response = await otcGuideAPI.get(`/upc/allergies/?upcs=${upcs}`);
  return response.data;
};

export const getTreatmentPlan = async (id: number, upcs: string) => {
  const response = await otcGuideAPI.get(`/plan/${id}/?upcs=${upcs}`);
  return response.data;
};
