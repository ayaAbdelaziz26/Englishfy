// hooks/useTopics.js
import { useEffect, useState } from "react";
import { getTopics, createTopic, updateTopic, deleteTopic } from "../services/topicsService";

const useTopics = () => {
  const [topicsRows, setTopicsRows] = useState([]);
  const [fetchedTopics, setFetchedTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [numRows, setNumRows] = useState(38);


  useEffect(() => {
    const loadTopics = async () => {
      setIsLoading(true);
      try {
        const topics = await getTopics();
        const formatted = topics.map((topic, index) => ({
          id: index + 1,
          name: topic.name,
          topicId: topic._id,
        }));

        setTopicsRows(formatted);
        setFetchedTopics(formatted.map((t) => t.name.toLowerCase()));

      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Failed to fetch topics.");

      } finally {
        setIsLoading(false);
      }
    };

    loadTopics();
  }, []);


  //handle rows filteration
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    setNumRows(isNaN(value) || value < 0 ? 0 : value);
  };

  // Fetch topics
  useEffect(() => {
    const fetchTopics = async () => {
      setIsLoading(true);
      try {
        const { data } = await getTopics();
        const formattedTopics = data.topics.map((topic, index) => ({
          id: index + 1,
          name: topic.name,
          topicId: topic._id,
        }));

        setTopicsRows(formattedTopics);
        setFetchedTopics(formattedTopics.map((topic) => topic.name.toLowerCase()));
        
      } catch (error) {
        setErrorMessage("An error occurred while fetching topics.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const addRow = () => {
    const newId = topicsRows.length + 1;
    setTopicsRows([...topicsRows, { id: newId, name: "", topicId: null }]);
  };

  const updateRow = (id, newName) => {
    setTopicsRows(topicsRows.map((row) => (row.id === id ? { ...row, name: newName } : row)));
  };

  const renameTopic = async (id, newName) => {
    const topic = topicsRows.find((row) => row.id === id);
    if (!topic || !topic.topicId) return;

    setIsLoading(true);
    try {
      await updateTopic(topic.topicId, newName);
      setTopicsRows(topicsRows.map((row) => (row.id === id ? { ...row, name: newName } : row)));
      setMessage("Updated successfully!");
    } catch (error) {
      setMessage("Failed to update!");
      setSeverity("error");
    } finally {
      setIsLoading(false);
      setOpenSnackbar(true);
    }
  };

  const deleteRow = async (id) => {
    const topic = topicsRows.find((row) => row.id === id);
    if (!topic || !topic.topicId) {
      setTopicsRows(topicsRows.filter((row) => row.id !== id));
      return;
    }

    setIsLoading(true);
    try {
      await deleteTopic(topic.topicId);
      setTopicsRows(topicsRows.filter((row) => row.id !== id));
      setMessage("Deleted successfully!");
      setSeverity("success");
    } catch (error) {
      setMessage("Failed to delete!");
      setSeverity("error");
    } finally {
      setIsLoading(false);
      setOpenSnackbar(true);
    }
  };

  const confirmAdd = async () => {
    setIsLoading(true);
    const newTopics = topicsRows.filter(
      (row) =>
        row.name.trim() !== "" &&
        !fetchedTopics.includes(row.name.toLowerCase()) &&
        !row.topicId
    );

    if (newTopics.length === 0) {
      setIsLoading(false);
      return;
    }

    try {
      for (const topic of newTopics) {
        const { data } = await createTopic(topic.name);
        topic.topicId = data.data.topic._id;
        setFetchedTopics((prev) => [...prev, topic.name.toLowerCase()]);
      }
      setMessage("Topics added successfully!");
      setSeverity("success");
    } catch (error) {
      setMessage("Failed to add topics!");
      setSeverity("error");
    } finally {
      setIsLoading(false);
      setOpenSnackbar(true);
    }
  };

  return {
    topicsRows,
    numRows,
    isLoading,
    message,
    severity,
    openSnackbar,
    errorMessage,
    addRow,
    updateRow,
    renameTopic,
    deleteRow,
    confirmAdd,
    setOpenSnackbar,
    handleInputChange,
  };
};

export default useTopics;