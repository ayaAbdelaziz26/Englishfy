import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './topicsHome.css';
import playlistLabel from '../../assets/playlist-label.png';
import recommendLabel from '../../assets/recommended-label.png';
import videoLabel from '../../assets/video-label.png';
import roadmapIcon from '../../assets/roadmap.png';
import videoIcon from '../../assets/Video.png';
import hourIcon from '../../assets/Clock.png';
import backIcon from '../../assets/Chevron left.png';

const TopicsHome = () => {
    const [rows, setRows] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedHours, setSelectedHours] = useState(null);
    const [selectedVideos, setSelectedVideos] = useState(null);
    const [selectedTopicId, setSelectedTopicId] = useState(null);
    const [content, setContent] = useState([]);
    const [showRoadmap, setShowRoadmap] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await fetch("http://145.223.23.146:5000/api/v1/user/topics/", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (response.ok) {
                    const data = await response.json();
                    const topics = data.topics.map((topic, index) => ({
                        id: index + 1,
                        name: topic.name,
                        topicId: topic._id,
                        topicHours: topic.totalHours.hours,
                        topicVideos: topic.numberOfVideos,
                    }));

                    setRows(topics);
                    if (topics.length > 0 && showRoadmap) {
                        fetchTopicDetails(topics[0].topicId);
                    }
                } else {
                    console.log("Failed to fetch topics.");
                }
            } catch (error) {
                console.error("Error fetching topics:", error);
            }
        };
        fetchTopics();
    }, []);

    const fetchTopicDetails = async (topicId) => {
        try {
            const response = await fetch(`http://145.223.23.146:5000/api/v1/user/topics/${topicId}`);
            if (response.ok) {
                const data = await response.json();
                const combinedContent = [...data.topic.video, ...data.topic.playlist];
                setContent(combinedContent);
                setSelectedTopic(data.topic.name);
                setSelectedHours(data.topic.totalHours.hours);
                setSelectedVideos(data.topic.numberOfVideos);
                setSelectedTopicId(data.topic._id);
                setShowRoadmap(false); // Hide roadmap on topic selection (for mobile view)
            } else {
                console.log("Failed to fetch topic details.");
            }
        } catch (error) {
            console.error("Error fetching topic details:", error);
        }
    };

    const handlePlaylistClick = (topicId, item) => {
        if (item.numberOfVideos !== undefined) {
            navigate(`/topics/${topicId}/playlists/${item._id}`);
        } else {
            navigate(`/topics/${topicId}/video/${item._id}`);
        }
    };

    return (
        <div className='topics-home'>
            {/* Roadmap Section */}
            <div className={`roadmap ${showRoadmap ? 'show' : 'hidden'}`}>
                <div className="roadmap-head">
                    <img src={roadmapIcon} alt="Roadmap Icon" />
                    <h2>Roadmap</h2>
                </div>

                <div className="roadmap-courses">
                    {rows.map((item) => (
                        <div className="roadmap-course" key={item.id} onClick={() => fetchTopicDetails(item.topicId)}>
                            <div className="roadmap-course-num">{item.id}</div>
                            <div className="roadmap-course-title">
                                {item.name}
                                <div className="roadmap-course-duration">
                                    <div className="hours">
                                        <img src={hourIcon} alt="Clock Icon" />
                                        <span>{item.topicHours}</span>
                                    </div>
                                    <div className="videos">
                                        <img src={videoIcon} alt="Video Icon" />
                                        <span>{item.topicVideos}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Course Videos Section */}
            <div className={`course-videos ${showRoadmap ? 'hidden' : 'show'}`}>
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
        </div>
    );
};

export default TopicsHome;
