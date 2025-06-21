// src/api/videos.js
import axiosInstance from "../api/axiosInstance";

export const addVideos = (videos) => {
  return axiosInstance.post("/admin/videos/", { videos });
};

export const checkVideosAvailability = (videos) => {
  return axiosInstance.post("/admin/videos/isAvailable", { videos });
};

export const addPlaylists = (playlists) => {
  return axiosInstance.post("/admin/playLists", { playlists });
};

export const checkPlaylistsAvailability = (urls) => {
  return axiosInstance.post("/admin/playLists/isAvailable", { urls });
};