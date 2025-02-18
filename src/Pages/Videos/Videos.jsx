import React, { useEffect, useState } from "react";
import "./videos.css";
import DashboredItems from "../../Components/DashboredItems/DashboredItems";
import Success from "../../Components/Success/Success";

const Videos = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [topicsNames, setTopicsNames] = useState([]);
  const [topics, setTopics] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [videoFilter, setVideoFilter] = useState("");
  
  const[rowsNum,setRowsNum]=useState(25);

  // Get videos
  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("http://145.223.23.146:5000/api/v1/admin/videos/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const formattedVideos = data.data.map((video, index) => ({
            id: index + 1,
            title: video.title,
            thumbnail: video.thumbnailUrl,
            videoId: video._id,
            isActive: video.isActive,  
            topicId: video.topicId,
          }));

          setRows(formattedVideos);
        } else {
          setErrorMessage("Failed to fetch videos.");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setErrorMessage("An error occurred while fetching videos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);


  //get Topics names
  useEffect(() => {
    const fetchTopics = async () => {

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
          setTopics(data.data)
          const formattedTopics = data.topics.map((topic, index) => ({
            name: topic.name,
            topicId: topic._id,
          }));

          setTopicsNames(formattedTopics);

        } else {
          setErrorMessage("Failed to fetch topics.");
        }
      }

      catch (error) {
        console.error("Error fetching topics:", error);
        setErrorMessage("An error occurred while fetching topics.");
      }
    };

    fetchTopics();
  }, []);

  const handleCheckboxChange = (videoId) => {
    const isSelected = selectedVideos.includes(videoId);
    const updatedSelectedVideos = isSelected
      ? selectedVideos.filter((id) => id !== videoId)
      : [...selectedVideos, videoId];

    setSelectedVideos(updatedSelectedVideos);
  };

  const activateVideo = async (videoId) => {
    try {
      const response = await fetch("http://145.223.23.146:5000/api/v1/admin/videos/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ videoIds: [videoId] }),
      });

      if (response.ok) {
        setMessage(`Videos activated successfully.`);
        setSeverity("success");
      } else {
        setMessage(`Failed to activate videos.`);
        setSeverity("error");
      }
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error activating video:", error);
      setMessage("An error occurred while activating the video.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const deactivateVideo = async (videoId) => {
    try {
      const response = await fetch("http://145.223.23.146:5000/api/v1/admin/videos/deactivate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ videoIds: [videoId] }),
      });

      if (response.ok) {
        setMessage(`Videos deactivated successfully.`);
        setSeverity("success");
      } else {
        setMessage(`Failed to deactivate videos.`);
        setSeverity("error");
      }
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deactivating video:", error);
      setMessage("An error occurred while deactivating the video.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const deleteVideo = async (videoId) => {
    try {
      const response = await fetch("http://145.223.23.146:5000/api/v1/admin/videos/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ videoIds: [videoId] }),
      });

      if (response.ok) {
        setMessage(`Videos deleted successfully.`);
        setSeverity("success");
      } else {
        setMessage(`Failed to delete videos.`);
        setSeverity("error");
      }
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting video:", error);
      setMessage("An error occurred while deleting the video.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const recommendVideo = async (videoId) => {
    try {
      const response = await fetch("http://145.223.23.146:5000/api/v1/admin/videos/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ videoIds: [videoId] }),
      });

      if (response.ok) {
        setMessage(`Videos marked as recommended successfully.`);
        setSeverity("success");
      } else {
        setMessage(`Failed to mark videos as recommended.`);
        setSeverity("error");
      }
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error recommending video:", error);
      setMessage("An error occurred while recommending the video.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleActivateClick = () => {
    selectedVideos.forEach(activateVideo);
  };

  const handleDeactivateClick = () => {
    selectedVideos.forEach(deactivateVideo);
  };

  const handleDeleteClick = () => {
    selectedVideos.forEach(deleteVideo);
  };

  const handleRecommendClick = () => {
    selectedVideos.forEach(recommendVideo);
  };


const filteredVideos = rows.filter(video => {
  let matchesCourse = true;
  let matchesFilter = true;
  

  //  Use topicsNames instead of topics
  if (selectedCourse) {
    const topic = topicsNames.find(t => t.topicId === video.topicId._id);
    matchesCourse = topic ? topic.name === selectedCourse : false;
  }

  //  Filter by video status
  if (videoFilter) {
    switch (videoFilter) {
      case "noThumbnail":
        matchesFilter = !video.thumbnail;
        break;
      case "noThumbnailActivated":
        matchesFilter = !video.thumbnail && video.isActive;
        break;
      case "noThumbnailDeactivated":
        matchesFilter = !video.thumbnail && !video.isActive;
        break;
      case "thumbnailDeactivated":
        matchesFilter = video.thumbnail && !video.isActive;
        break;
      case "deactivated":
        matchesFilter = !video.isActive;
        break;
      default:
        matchesFilter = true;
    }
  }

  return matchesCourse && matchesFilter;
});

const handleInputChange = (e) => {
  setRowsNum(Number(e.target.value));
};

  return (
    <main>
      <div className="videos-content">
        <div className="videos-top">
          <div className="videos-rowsNum">
            <label>Number of rows:</label>
            <input type="number"
             value={rowsNum}
            onChange={handleInputChange} />
          </div>

          <div className="videos-filterOne">
            <label>Select course:</label>
            <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
              <option value="">All videos</option>
              {topicsNames.map((topic, index) => (
                <option key={index} value={topic.name}>{topic.name}</option>
              ))}
            </select>
          </div>

          <div className="videos-filterTwo">
            <label>Select videos:</label>
            <select value={videoFilter} onChange={(e) => setVideoFilter(e.target.value)}>
              <option value="">All videos</option>
              <option value="noThumbnail">No Thumbnail</option>
              <option value="noThumbnailActivated">No Thumbnail & Activated</option>
              <option value="noThumbnailDeactivated">No Thumbnail & Deactivated</option>
              <option value="thumbnailDeactivated">Thumbnail & Deactivated</option>
              <option value="deactivated">Deactivated</option>
            </select>
          </div>

          <DashboredItems />
        </div>

        <div className="videos-head">
          <div className="videos-thumbnail">Image</div>
          <div className="videos-title">Title</div>
          <div className="videos-select">Select</div>
        </div>

        <div className="videos-info">
          {isLoading && <div>Loading...</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {!isLoading && !errorMessage && filteredVideos.length === 0 && (
            <div>No videos match your filters</div>
          )}
          <div className="videos-row">
            {filteredVideos.slice(0, rowsNum).map((video) => (
              <div className="videos-row-one" key={video.id}>
                <div className="videos-number">{video.id}</div>
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                ) : (
                  <div className="no-thumbnail" style={{backgroundColor:'black'}}></div>
                )}

                <input type="text" value={video.title} className="topic-name" readOnly style={{color:video.isActive?'white':'red'}}/>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(video.videoId)}
                  checked={selectedVideos.includes(video.videoId)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="videos-actions">
          <button className="activate" onClick={handleActivateClick}>Activate</button>
          <button className="deactivate" onClick={handleDeactivateClick}>Deactivate</button>
          <button className="delete" onClick={handleDeleteClick}>Delete</button>
          <button className="recommended" onClick={handleRecommendClick}>Recommended</button>
        </div>
      </div>

      <Success message={message} color={severity} open={openSnackbar} setOpen={setOpenSnackbar} />
    </main>
  );
};

export default Videos;