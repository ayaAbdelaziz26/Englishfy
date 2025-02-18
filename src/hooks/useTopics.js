import { useEffect, useState } from "react";

const useTopics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("http://145.223.23.146:5000/api/v1/admin/topics/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTopics(data.topics);
        } else {
          console.error("Failed to fetch topics.");
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  return topics;
};

export default useTopics;