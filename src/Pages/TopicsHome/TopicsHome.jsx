import React, { useState, useEffect, useContext } from 'react';
import RoadmapList from '../../Components/RoadmapList/RoadmapList';
import ContentList from '../../Components/ContentList/ContentList';
import './topicsHome.css';
import { UserContext } from '../../Context/UserContext';

const TopicsHome = () => {
    const { showRoadmap, setShowRoadmap } = useContext(UserContext);

    const [rows, setRows] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedHours, setSelectedHours] = useState(null);
    const [selectedVideos, setSelectedVideos] = useState(null);
    const [selectedTopicId, setSelectedTopicId] = useState(null);
    const [content, setContent] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1000);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/v1/user/topics/", {
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

                    if (topics.length > 0 && !isMobile) {
                        const storedTopicId = localStorage.getItem('lastTopicId');
                        const topicId = storedTopicId || topics[0].topicId;
                        fetchTopicDetails(topicId);
                    }
                } else {
                    console.log("Failed to fetch topics.");
                }
            } catch (error) {
                console.error("Error fetching topics:", error);
            }
        };

        fetchTopics();
    }, [isMobile]);

    const fetchTopicDetails = async (topicId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/user/topics/${topicId}`);
            if (response.ok) {
                const data = await response.json();
                const combinedContent = [...data.topic.video, ...data.topic.playlist];
                setContent(combinedContent);
                setSelectedTopic(data.topic.name);
                setSelectedHours(data.topic.totalHours.hours);
                setSelectedVideos(data.topic.numberOfVideos);
                setSelectedTopicId(data.topic._id);
                setShowRoadmap(false);
            } else {
                console.log("Failed to fetch topic details.");
            }
        } catch (error) {
            console.error("Error fetching topic details:", error);
        }
    };

    // تخزين آخر topic اختاره المستخدم
    useEffect(() => {
        if (selectedTopicId) {
            localStorage.setItem('lastTopicId', selectedTopicId);
            console.log("Saved to localStorage:", selectedTopicId);
        }
    }, [selectedTopicId]);

    // استرجاع آخر topic لو المستخدم كان على صفحة المحتوى ورجع تاني
    useEffect(() => {
        if (showRoadmap === false && !content.length && rows.length > 0) {
            const storedTopicId = localStorage.getItem('lastTopicId');
            const topicId = storedTopicId || rows[0]?.topicId;
            if (topicId) {
                fetchTopicDetails(topicId);
            }
        }
    }, [showRoadmap, rows, isMobile]);

    return (
        <div className='topics-home'>
            {isMobile ? (
                showRoadmap ? (
                    <RoadmapList
                        rows={rows}
                        fetchTopicDetails={fetchTopicDetails}
                    />
                ) : (
                    <ContentList
                        selectedTopic={selectedTopic}
                        selectedHours={selectedHours}
                        selectedVideos={selectedVideos}
                        selectedTopicId={selectedTopicId}
                        content={content}
                    />
                )
            ) : (
                <>
                    <RoadmapList
                        rows={rows}
                        fetchTopicDetails={fetchTopicDetails}
                    />
                    <ContentList
                        selectedTopic={selectedTopic}
                        selectedHours={selectedHours}
                        selectedVideos={selectedVideos}
                        selectedTopicId={selectedTopicId}
                        content={content}
                    />
                </>
            )}
        </div>
    );
};

export default TopicsHome;