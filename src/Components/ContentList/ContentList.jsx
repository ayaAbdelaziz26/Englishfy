import React from 'react'
import backIcon from '../../assets/Chevron left.png';
import videoLabel from '../../assets/video-label.png';
import playlistLabel from '../../assets/playlist-label.png';
import recommendLabel from '../../assets/recommended-label.png';
import { useNavigate } from "react-router-dom";
import videoIcon from '../../assets/Video.png';
import hourIcon from '../../assets/Clock.png';
import './contentList.css'

import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

const ContentList = ({selectedTopic,selectedHours,selectedVideos,selectedTopicId,content}) => {

    const { showRoadmap, setShowRoadmap } = useContext(UserContext);

    const navigate = useNavigate();
    const handlePlaylistClick = (topicId, item) => {
        if (item.numberOfVideos !== undefined) {
            navigate(`/topics/${topicId}/playlists/${item._id}`);
        } else {
            navigate(`/topics/${topicId}/video/${item._id}`);
        }
    };

  return (
                  <div className='course-videos'>
                {/* Back Button for Mobile */}

                <div className="course-videos-title">
                    <img src={backIcon} alt="Back" className='back-icon' onClick={() => setShowRoadmap(true)}/>
                    <h2>{selectedTopic}</h2>
                    <div className="course-videos-duration">
                        <div className="hours">
                            <img src={hourIcon} alt="Clock Icon" className='hour-icon'/>
                            <span>{selectedHours}</span>
                        </div>
                        <div className="videos">
                            <img src={videoIcon} alt="Video Icon" className='video-icon'/>
                            <span>{selectedVideos}</span>
                        </div>
                    </div>
                </div>

                <div className="course-videos-content">
                    {content.map((item) => (
                        <div key={item._id} onClick={() => handlePlaylistClick(selectedTopicId, item)}>
                            <img src={item.thumbnailUrl} alt={item.title} className="video-thumbnail" />
                            {item.isRecommended && <img src={recommendLabel} className="recommend-label" />}
                            <img src={item.numberOfVideos ? playlistLabel : videoLabel} className="video-label" />
                            <h3>{item.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
  )
}

export default ContentList