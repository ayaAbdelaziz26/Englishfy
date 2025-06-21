import React from 'react';
import roadmapIcon from '../../assets/roadmap.png';
import videoIcon from '../../assets/Video.png';
import hourIcon from '../../assets/Clock.png';
import './roadmapList.css'

const TopicsHome = ({rows,fetchTopicDetails}) => {
    return (
            <div className='roadmap'>
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
    );
};

export default TopicsHome;
