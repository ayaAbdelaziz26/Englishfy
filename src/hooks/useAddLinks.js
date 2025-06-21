// 📁 src/hooks/useVideosApis.js
import { useState } from "react";
import {
  addVideos,
  addPlaylists,
  checkVideosAvailability,
  checkPlaylistsAvailability,
} from "../services/addLinksService";

const useAddLinks = () => {
  const [rows, setRows] = useState([{ id: 1, url: "", topic: "", isValid: true }]);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState([]);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const convertToShortUrl = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.*\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([a-zA-Z0-9_-]{11})(?:[^\w\s-]|$)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://youtu.be/${match[1]}`;
    }
    return url;
  };

  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, url: "", topic: "", isValid: true }]);
  };

  const updateRow = (id, field, value) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleSubmit = async (selectedType) => {
    if (selectedType === "video") {
      await handleVideoSubmit();
    } else {
      await handlePlaylistSubmit();
    }
  };

  const handleVideoSubmit = async () => {
    const validRows = rows.filter((row) => row.url.trim() && row.topic.trim());
    if (validRows.length === 0) {
      setErrors([{ error: "Please enter at least one valid URL and select a topic." }]);
      return;
    }

    const videos = validRows.map((row) => ({
      url: convertToShortUrl(row.url),
      topicName: row.topic,
    }));

    try {
      const { data } = await addVideos(videos);
      setSuccess(data.addedVideos || []);
      setErrors(data.errors || []);
      setRows([{ id: 1, url: "", topic: "", isValid: true }]);
      setMessage("Videos added successfully!");
      setSeverity("success");
    } catch (error) {
      setErrors([{ error: error.response?.data?.message || "Failed to add videos." }]);
      setSuccess([]);
      setMessage("Failed to add videos!");
      setSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handlePlaylistSubmit = async () => {
    const validRows = rows.filter((row) => row.url.trim() && row.topic.trim());
    if (validRows.length === 0) {
      setErrors([{ error: "Please enter at least one valid URL and select a topic." }]);
      return;
    }

    const playlists = validRows.map((row) => ({
      url: row.url,
      topicName: row.topic,
    }));

    try {
      const { data } = await addPlaylists(playlists);
      setErrors(data.errors || []);
      setRows([{ id: 1, url: "", topic: "", isValid: true }]);
      setMessage("Playlists added successfully!");
      setSeverity("success");
    } catch (error) {
      setErrors([{ error: error.response?.data?.message || "Failed to add playlists." }]);
      setSuccess([]);
      setMessage("Failed to add playlists!");
      setSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const checkAvailability = async (selectedType) => {
    if (selectedType === "video") {
      await checkVideoAvailability();
    } else {
      await checkPlaylistAvailability();
    }
  };

  const checkVideoAvailability = async () => {
    const videos = rows.map((row) => row.url).filter((url) => url.trim());
    try {
      const { data } = await checkVideosAvailability(videos);
      const notAvailableUrls = data.notAvailableVideos.map((v) => v.url);
      setRows((prev) =>
        prev.map((row) => ({ ...row, isValid: !notAvailableUrls.includes(row.url) }))
      );
      setMessage("Checked successfully!");
      setSeverity("success");
    } catch (error) {
      setMessage(error.response?.data?.message || "Check failed.");
      setSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const checkPlaylistAvailability = async () => {
    const urls = rows.map((row) => row.url).filter((url) => url.trim());
    try {
      const { data } = await checkPlaylistsAvailability(urls);
      const notAvailableUrls = data.notFoundPlaylists?.map((p) => p.url) || [];
      setRows((prev) =>
        prev.map((row) => ({ ...row, isValid: !notAvailableUrls.includes(row.url) }))
      );
      setMessage("Checked successfully!");
      setSeverity("success");
    } catch (error) {
      setMessage(error.response?.data?.message || "Check failed.");
      setSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  return {
    rows,
    setRows,
    addRow,
    updateRow,
    deleteRow,
    handleSubmit,
    handleVideoSubmit,
    handlePlaylistSubmit,
    checkAvailability,
    errors,
    success,
    message,
    severity,
    openSnackbar,
    setOpenSnackbar,
  };
};

export default useAddLinks;
  