import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './videoHome.css';
import playlistIcon from '../../assets/playlist.png';
import videoIcon from '../../assets/Video.png';
import hourIcon from '../../assets/Clock.png';
import maximizeIcon from '../../assets/maximize.png';
import recommendLabel from '../../assets/recommended-label.png';
import backIcon from '../../assets/Chevron left.png';
import cancelIcon from '../../assets/close.png';
import { useOutletContext } from 'react-router-dom';

//use context
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

const VideoHome = () => {

  //use context
  const { showRoadmap, setShowRoadmap } = useContext(UserContext);


  const { maximize, setMaximize } = useOutletContext();
  const { topicId, playlistId, itemId } = useParams(); // Added itemId
  const navigate = useNavigate();

  const [playlist, setPlaylist] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [topicDetails, setTopicDetails] = useState({ name: '', totalHours: 0, totalVideos: 0 });

  const isSingleVideo = !!itemId;

  const handleBack=()=>{
    navigate('/')
    setShowRoadmap(false)
    console.log(showRoadmap)
  }

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

    fetchTopicDetails();
  }, [topicId]);

  const extractYouTubeVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        let response, data;

        if (!isSingleVideo) {
          // Fetch playlist
          response = await fetch(`http://localhost:5000/api/v1/user/topics/${topicId}/playlists/${playlistId}`);
          if (response.ok) {
            data = await response.json();
            setPlaylist(data.playlist.video || []);
            if (data.playlist.video.length > 0) {
              setCurrentVideo(data.playlist.video[0]);
            }
          }
        } else if (isSingleVideo) {
          // Fetch single video
          response = await fetch(`http://localhost:5000/api/v1/user/topics/${topicId}/video/${itemId}`);
          if (response.ok) {
            data = await response.json();
            setCurrentVideo(data.video);
          }
        } else {
          console.error("No valid playlistId or itemId found.");
        }

      } catch (error) {
        console.error("Error fetching content details:", error);
      }
    };

    fetchContentDetails();
  }, [topicId, playlistId, itemId]);

  return (
    <div className='video-home'>
      <div className={`show-video ${maximize || isSingleVideo ? 'maximize' : ''}`}>
        <div className="show-video-title">
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
        </div>

        <div className="show-video-content">
          {!isSingleVideo && (
            <div className="icons">
              <img src={cancelIcon} alt="Close" onClick={() => setMaximize(false)} />
              <img src={maximizeIcon} alt="Maximize" onClick={() => setMaximize(true)} />
            </div>
          )}


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

        <div className="show-video-name">
          <h3>{currentVideo?.title || 'Video Name'}</h3>
        </div>
      </div>

      {playlist.length > 0 && (
        <div className={`playlist ${maximize ? 'maximize' : ''}`}>
          <div className="playlist-head">
            <img src={playlistIcon} alt="Playlist" />
            <h2>Playlist</h2>
          </div>

          <div className="playlist-videos">
            {playlist.map((video) => (
              <div key={video._id} onClick={() => setCurrentVideo(video)}>
                <img src={video.thumbnailUrl} alt={video.title} className={currentVideo?._id === video._id ? "selected" : ""} />
                {video.isRecommended && <img src={recommendLabel} className="recommend-label" />}
                <h3>{video.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoHome;