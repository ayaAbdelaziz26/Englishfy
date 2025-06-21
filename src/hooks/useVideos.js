import {
    getVideos,
    activateVideo,
    deactivateVideo,
    deleteVideo,
    recommendVideo
} from "../services/videosService";
import {
    useEffect,
    useState
} from "react";

const useVideos = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [videosRows, setVideosRows] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");
    const [openSnackbar, setOpenSnackbar] = useState(false);


    // Get Videos
    useEffect(() => {
        const fetchVideos = async () => {
            setIsLoading(true);
            try {
                const videos = await getVideos();
                console.log(videos)
                const formattedVideos = videos.data.data.map((video, index) => ({
                    id: index + 1,
                    title: video.title,
                    thumbnail: video.thumbnailUrl,
                    videoId: video._id,
                    isActive: video.isActive,
                    topicId: video.topicId,
                }));

                setVideosRows(formattedVideos);
            } catch (error) {
                setErrorMessage("An error occurred while fetching videos.");

            } finally {
                setIsLoading(false);
            }
        };

        fetchVideos();
    }, []);


    //Activate Video Function
    const activateVideoFun = async (videoId) => {
    try{
    const res= await activateVideo(videoId);
      if (res) {
        setMessage(`Videos activated successfully.`);
        setSeverity("success");
      }
       else {
        setMessage(`Failed to activate videos.`);
        setSeverity("error");
      }
      setOpenSnackbar(true);
    }
     catch (error) {
      console.error("Error activating video:", error);
      setMessage("An error occurred while activating the video.");
      setSeverity("error");
      setOpenSnackbar(true);
  }};


  //Deactivate Video
  const deactivateVideoFun = async (videoId) => {
    try{
    const res= await deactivateVideo(videoId);
      if (res) {
        setMessage(`Videos deactivated successfully.`);
        setSeverity("success");
      }
       else {
        setMessage(`Failed to deactivate videos.`);
        setSeverity("error");
      }
      setOpenSnackbar(true);
    }
     catch (error) {
      console.error("Error deactivating video:", error);
      setMessage("An error occurred while deactivating the video.");
      setSeverity("error");
      setOpenSnackbar(true);
  }};


  //Delete Video
  const deleteVideoFun = async (videoId) => {
    try{
    const res= await deleteVideo(videoId);
      if (res) {
        setMessage(`Videos deleted successfully.`);
        setSeverity("success");
      }
       else {
        setMessage(`Failed to delete videos.`);
        setSeverity("error");
      }
      setOpenSnackbar(true);
    }
     catch (error) {
      console.error("Error deleting video:", error);
      setMessage("An error occurred while deleting the video.");
      setSeverity("error");
      setOpenSnackbar(true);
  }};

  //Recommend Video
  const recommendVideoFun = async (videoId) => {
    try{
    const res= await recommendVideo(videoId);
      if (res) {
        setMessage(`Videos recommended successfully.`);
        setSeverity("success");
      }
       else {
        setMessage(`Failed to recommend videos.`);
        setSeverity("error");
      }
      setOpenSnackbar(true);
    }
     catch (error) {
      console.error("Error recommending video:", error);
      setMessage("An error occurred while recommending the video.");
      setSeverity("error");
      setOpenSnackbar(true);
  }};

    return {
        videosRows,
        activateVideoFun,
        deactivateVideoFun,
        deleteVideoFun,
        recommendVideoFun
    }
}

export default useVideos;