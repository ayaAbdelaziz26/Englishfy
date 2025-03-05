import React, { useState, useEffect } from "react";
import "./topics.css";
import editIcon from "../../assets/Edit.png";
import deleteIcon from "../../assets/delete.png";
import addIcon from "../../assets/add.png";
import DashboredItems from "../../Components/DashboredItems/DashboredItems";
import Success from "../../Components/Success/Success";

const Topics = () => {
  const [rows, setRows] = useState([]);
  const [fetchedTopics, setFetchedTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [numRows, setNumRows] = useState(38);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumRows(isNaN(value) ? 0 : value); 
  };

  // Get topics
  useEffect(() => {
    const fetchTopics = async () => {
      setIsLoading(true);
      
      try {
        const response = await fetch("http://145.223.23.146:5000/api/v1/admin/topics/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const formattedTopics = data.topics.map((topic, index) => ({
            id: index + 1,
            name: topic.name,
            topicId: topic._id,
          }));

          setRows(formattedTopics);
          setFetchedTopics(formattedTopics.map(topic => topic.name.toLowerCase()));

        } else {
          setErrorMessage("Failed to fetch topics.");
        }
      }
      
      catch (error) {
        console.error("Error fetching topics:", error);
        setErrorMessage("An error occurred while fetching topics.");
      }
      
      
      finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);



  //Add a new empty row for input
  const addRow = () => {
    const newId = rows.length + 1;
    setRows([...rows, { id: newId, name: "", topicId: null }]);
  };


  //Update a specific row
  const updateRow = (id, newName) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, name: newName } : row)));
  };

  //Update an existing topic
  const renameTopic = async (id, newName) => {
    const topic = rows.find(row => row.id === id);
    if (!topic || !topic.topicId) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://145.223.23.146:5000/api/v1/admin/topics/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ newname: newName, topicId: topic.topicId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Updated successfully!')
        setRows(rows.map(row => row.id === id ? { ...row, name: newName } : row));

      } else {
        setMessage('Failed to update!')
        setSeverity('error')
      }
    } 
    
    catch (error) {
      setMessage(error.message)
      setSeverity('error')
    }
    
    finally {
      setIsLoading(false);
      setOpenSnackbar(true)
    }
  };

  //Delete a topic
  const deleteRow = async (id) => {
    const topic = rows.find(row => row.id === id);
    if (!topic || !topic.topicId) {
      setRows(rows.filter(row => row.id !== id));
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `http://145.223.23.146:5000/api/v1/admin/topics/?topicId=${topic.topicId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setRows(rows.filter(row => row.id !== id));
        setMessage('Deleted Successfully!')
        setSeverity('success')
      } else {
        setMessage('Failed to delete!')
        setSeverity('error')
      }
    }
    
    catch (error) {
      setMessage(error.message)
      setSeverity('error')
    }
    
    finally {
      setIsLoading(false);
      setOpenSnackbar(true)
    }
  };


  //Add new topics
  const confirmAdd = async () => {
    setIsLoading(true);
    setErrorMessage("");

    const url = "http://145.223.23.146:5000/api/v1/admin/topics/";
    const newTopics = rows.filter((row) =>
      row.name.trim() !== "" && !fetchedTopics.includes(row.name.toLowerCase()) && !row.topicId
    );

    if (newTopics.length === 0) {
      setIsLoading(false);
      return;
    }

    try {
      for (const topic of newTopics) {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({ name: topic.name }),
        });

        const data = await response.json();

        if (response.ok) {
          topic.topicId = data.data.topic._id;
          setFetchedTopics([...fetchedTopics, topic.name.toLowerCase()]);
          setMessage('Topic added successfully!')
          setSeverity('success')

        } else {
          setMessage('Failed to add topic!')
          setSeverity('error')
          return;
        }
      }
    } 
    
    catch (error) {
      setMessage(error.message)
      setSeverity('error')
    }
    
    finally {
      setIsLoading(false);
      setOpenSnackbar(true)
    }
  };


  return (
    <main>
      <div className="topics-content">
        <div className="topics-top">
          <div className="topics-rowsNum">
            <label>Number of rows:</label>
            <input type="number"
             min={0}
             value={numRows} 
             onChange={handleInputChange}  />
          </div>

          <DashboredItems />
        </div>

        <div className="topics-head">
          <div>Topics</div>
        </div>

        <div className="topics-info">
          <div className="topics-row">
            {rows.length > 0 ? (
              rows.slice(0,numRows).map((item) => (
                <div className="topics-row-one" key={item.id}>
                  <div className="topic-number">{item.id}</div>
                  <input
                    type="text"
                    value={item.name}
                    className="topic-name"
                    onChange={(e) => updateRow(item.id, e.target.value)}
                  />
                  <div className="topic-actions">
                    <img
                      src={editIcon}
                      alt="edit"
                      onClick={() => renameTopic(item.id, item.name)}
                      style={{ cursor: "pointer" }}
                    />
                    <img
                      src={deleteIcon}
                      alt="delete"
                      onClick={() => deleteRow(item.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No topics available.</p>
            )}
          </div>
        </div>

        <div className="topics-btns">
          <button onClick={addRow}>
            <img src={addIcon} alt="add" />
            new row
          </button>
          <button onClick={confirmAdd} disabled={isLoading}>
            {isLoading ? "Loading..." : "Add"}
          </button>
        </div>
        
        <Success message={message} color={severity} open={openSnackbar} setOpen={setOpenSnackbar} />
      </div>
    </main>
  );
};

export default Topics;