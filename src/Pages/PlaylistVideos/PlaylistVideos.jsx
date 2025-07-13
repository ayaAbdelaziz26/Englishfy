import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './playlistVideos.css';
import playlistImg from '../../assets/playlist.png'

const PlaylistVideos = () => {
  const { topicId, playlistId } = useParams();
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/user/topics/${topicId}/playlists/${playlistId}`);
        const data = await response.json();
        setVideos(data.playlist.video || []);
      } catch (error) {
        console.error("Error fetching playlist videos:", error);
      }
    };

    fetchPlaylist();
  }, [topicId, playlistId]);

  const handleVideoClick = (videoId) => {
    navigate(`/topics/${topicId}/video/${videoId}`);
  };

  return (
    <div className="playlist-videos-page">
      <h2>Playlist Videos</h2>
      <div className="videos-grid">
        {videos.map((video) => (
          <div key={video._id} className="video-thumbnail" onClick={() => handleVideoClick(video._id)}>
            <img src={video.thumbnailUrl} alt={video.title} />
            <h3>{video.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistVideos;