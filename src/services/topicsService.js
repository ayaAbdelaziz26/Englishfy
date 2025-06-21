// services/topicsService.js
import axiosInstance from "../api/axiosInstance";

export const getTopics = () => {
  return axiosInstance.get("admin/topics/");
};

export const createTopic = (name) => {
  return axiosInstance.post("admin/topics/", { name });
};

export const updateTopic = (topicId, newname) => {
  return axiosInstance.put("admin/topics/", { topicId, newname });
};

export const deleteTopic = (topicId) => {
  return axiosInstance.delete(`admin/topics/`, { params: { topicId } });
};