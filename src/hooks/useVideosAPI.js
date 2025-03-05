// src/hooks/useVideosApis.js
import { useState } from "react";

const useVideosApis = () => {
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
    const validRows = rows.filter((row) => row.url.trim() !== "" && row.topic.trim() !== "");
    if (validRows.length === 0) {
      setErrors([{ error: "Please enter at least one valid URL and select a topic." }]);
      return;
    }

    const requestBody = {
      videos: validRows.map((row) => ({
        url: convertToShortUrl(row.url),
        topicName: row.topic,
      })),
    };

    try {
      const response = await fetch("http://145.223.23.146:5000/api/v1/admin/videos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.addedVideos || []);
        setErrors(data.errors || []);
        setRows([{ id: 1, url: "", topic: "", isValid: true }]);
        setMessage("Videos added successfully!");
        setSeverity("success");
      } else {
        setErrors(data.errors || [{ error: "Failed to add videos." }]);
        setSuccess([]);
        setMessage("Failed to add videos!");
        setSeverity("error");
      }
    } catch (error) {
      console.error("Error submitting videos:", error);
      setErrors([{ error: "An error occurred while processing your request." }]);
      setSuccess([]);
      setMessage(error.message);
      setSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handlePlaylistSubmit = async () => {
    const validRows = rows.filter((row) => row.url.trim() !== "" && row.topic.trim() !== "");
    if (validRows.length === 0) {
      setErrors([{ error: "Please enter at least one valid URL and select a topic." }]);
      return;
    }

    const requestBody = {
      playlists: validRows.map((row) => ({
        url: row.url,
        topicName: row.topic,
      })),
    };

    try {
      const response = await fetch("http://145.223.23.146:5000/api/v1/admin/playLists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setErrors(data.errors || []);
        setRows([{ id: 1, url: "", topic: "", isValid: true }]);
        setMessage("Playlists added successfully!");
        setSeverity("success");
      } else {
        setErrors(data.errors || [{ error: "Failed to add playlists." }]);
        setSuccess([]);
        setMessage("Failed to add playlists!");
        setSeverity("error");
      }
    } catch (error) {
      console.error("Error submitting playlists:", error);
      setErrors([{ error: "An error occurred while processing your request." }]);
      setSuccess([]);
      setMessage(error.message);
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
    const requestBody = {
      videos: rows
        .map((row) => (row.url))
        .filter((url) => url.trim() !== ""),
    };

    try {
      const response = await fetch("http://145.223.23.146:5000/api/v1/admin/videos/isAvailable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data)
        const notAvailableUrls = data.notAvailableVideos.map((video) => video.url);
        setRows((prevRows) =>
          prevRows.map((row) => ({
            ...row,
            isValid: !notAvailableUrls.includes(row.url),
          }))
        );

        setMessage("Checked successfully!");
      } else {
        setMessage("Invalid YouTube URL!");
        setSeverity("error");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setOpenSnackbar(true);
    }
  };

  const checkPlaylistAvailability = async () => {
    const requestBody = {
      urls: rows
        .map((row) => row.url)
        .filter((url) => url.trim() !== ""),
    };

    try {
      const response = await fetch("http://145.223.23.146:5000/api/v1/admin/playLists/isAvailable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data)
        const notAvailableUrls = data.notFoundPlaylists?.map((playlist) => playlist.url) || [];

        setRows((prevRows) =>
          prevRows.map((row) => ({
            ...row,
            isValid: !notAvailableUrls.includes(row.url),
          }))
        );

        setMessage("Checked successfully!");
        setSeverity("success");
      } else {
        setMessage(data.message || "Invalid YouTube playlist URL!");
        setSeverity("error");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
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

export default useVideosApis;
