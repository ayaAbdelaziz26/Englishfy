import React, {useState } from "react";
import "./videos.css";
import DashboredItems from "../../Components/DashboredItems/DashboredItems";
import Success from "../../Components/Success/Success";
import useTopics from "../../hooks/useTopics";
import useVideos from "../../hooks/useVideos";

const Videos = () => {
  const {videosRows,
    activateVideoFun,
    deactivateVideoFun,
    deleteVideoFun,
    recommendVideoFun
  } = useVideos();

  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {topicsRows}  = useTopics();

  const [selectedCourse, setSelectedCourse] = useState("");
  const [videoFilter, setVideoFilter] = useState("");
  
  const[rowsNum,setRowsNum]=useState(25);


  const handleCheckboxChange = (videoId) => {
    const isSelected = selectedVideos.includes(videoId);
    const updatedSelectedVideos = isSelected
      ? selectedVideos.filter((id) => id !== videoId)
      : [...selectedVideos, videoId];

    setSelectedVideos(updatedSelectedVideos);
  };

  const handleActivateClick = () => {
    selectedVideos.forEach(activateVideoFun);
  };

  const handleDeactivateClick = () => {
    selectedVideos.forEach(deactivateVideoFun);
  };

  const handleDeleteClick = () => {
    selectedVideos.forEach(deleteVideoFun);
  };

  const handleRecommendClick = () => {
    selectedVideos.forEach(recommendVideoFun);
  };


const filteredVideos = videosRows.filter(video => {
  let matchesCourse = true;
  let matchesFilter = true;
  

  //  Use topicsNames instead of topics
  if (selectedCourse) {
    const topic = topicsRows.find(t => t.topicId === video.topicId._id);
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
              {topicsRows.map((topic, index) => (
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
