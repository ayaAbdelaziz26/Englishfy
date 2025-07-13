import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import './videoHome.css';
import videoIcon from '../../assets/Video.png';
import hourIcon from '../../assets/Clock.png';
import maximizeIcon from '../../assets/maximize.png';
import backIcon from '../../assets/Chevron left.png';
import cancelIcon from '../../assets/close.png';
import { UserContext } from '../../Context/UserContext';

const VideoHome = () => {
  const { showRoadmap, setShowRoadmap } = useContext(UserContext);
  const { maximize, setMaximize } = useOutletContext();
  const { topicId, itemId } = useParams(); // فقط فيديو ID
  const navigate = useNavigate();

  const [currentVideo, setCurrentVideo] = useState(null);
  const [topicDetails, setTopicDetails] = useState({ name: '', totalHours: 0, totalVideos: 0 });

  const handleBack = () => {
    navigate('/');
    setShowRoadmap(false);
  };

  const extractYouTubeVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const fetchTopicDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/user/topics/${topicId}`);
        if (response.ok) {
          const data = await response.json();
          setTopicDetails({
            name: data.topic.name,
            totalHours: data.topic.totalHours.hours,
            totalVideos: data.topic.numberOfVideos,
          });
        }
      } catch (error) {
        console.error("Error fetching topic details:", error);
      }
    };

    const fetchSingleVideo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/user/topics/${topicId}/video/${itemId}`);
        if (response.ok) {
          const data = await response.json();
          setCurrentVideo(data.video);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchTopicDetails();
    fetchSingleVideo();
  }, [topicId, itemId]);

  return (
    <div className='video-home'>
      <div className={`show-video maximize`}>
        {/* <div className="show-video-title">
          <img src={backIcon} alt="Back" onClick={handleBack} className='back-icon'/>
          <h2>{topicDetails.name || 'Loading...'}</h2>

          <div className="show-video-duration">
            <div className="hours">
              <img src={hourIcon} alt="Duration" className='hour-icon'/>
              <span>{topicDetails.totalHours || 0}</span>
            </div>

            <div className="videos">
              <img src={videoIcon} alt="Videos" className='video-icon'/>
              <span>{topicDetails.totalVideos || 0}</span>
            </div>
          </div>
        </div> */}

        <div className="show-video-content">
          {/* <div className="icons">
            <img src={cancelIcon} alt="Close" onClick={() => setMaximize(false)} />
            <img src={maximizeIcon} alt="Maximize" onClick={() => setMaximize(true)} />
          </div> */}

          <div className="video">
            {currentVideo ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${extractYouTubeVideoId(currentVideo.url)}`}
                title={currentVideo.title}
                frameBorder="0"
                allowFullScreen
              />
            ) : (
              "No video selected"
            )}
          </div>
        </div>

        {/* <div className="show-video-name">
          <h3>{currentVideo?.title || 'Video Name'}</h3>
        </div> */}
      </div>
    </div>
  );
};

export default VideoHome;