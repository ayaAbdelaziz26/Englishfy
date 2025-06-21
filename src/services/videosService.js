import axiosInstance from "../api/axiosInstance";

export const getVideos = () => {
    return axiosInstance.get('/admin/videos/')
};

export const activateVideo = (videoId) => {
    return axiosInstance.post('/admin/videos/activate/', {
        videoIds: [videoId]
    })
}

export const deactivateVideo = (videoId) => {
    return axiosInstance.post('/admin/videos/deactivate/', {
        videoIds: [videoId]
    })
}


export const deleteVideo = (videoId) => {
    return axiosInstance.delete('/admin/videos/', {
        data: {
            videoIds: [videoId]
        }
    });
};

export const recommendVideo = (videoId) => {
    return axiosInstance.post('/admin/videos/recommend/', {
        videoIds: [videoId]
    })
}