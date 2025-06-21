import React, { useState } from "react";
import useTopics from "../../hooks/useTopics";
import useAddLinks from "../../hooks/useAddLinks";
import DashboredItems from "../../Components/DashboredItems/DashboredItems";
import deleteImg from "../../assets/delete.png";
import addIcon from "../../assets/add_circle_2.png";
import Success from "../../Components/Success/Success";
import "./addLinks.css";

const AddLinks = () => {
  const [selectedType, setSelectedType] = useState("video");
  const {topicsRows}  = useTopics();
  const {
    rows,
    addRow,
    updateRow,
    deleteRow,
    handleSubmit,
    checkAvailability,
    message,
    severity,
    openSnackbar,
    setOpenSnackbar,
  } = useAddLinks();

  const handleRadioChange = (e) => setSelectedType(e.target.value);

  return (
    <main>
      <div className="addlinks-content">
        <div className="addlinks-top">
          <div className="addlinks-typeOne">
            <label>Single Video</label>
            <input
              type="radio"
              name="type"
              value="video"
              checked={selectedType === "video"}
              onChange={handleRadioChange}
            />
          </div>
          <div className="addlinks-typeTwo">
            <label>Playlist</label>
            <input
              type="radio"
              name="type"
              value="playlist"
              checked={selectedType === "playlist"}
              onChange={handleRadioChange}
            />
          </div>
          <DashboredItems />
        </div>

        <div className="addlinks-head">
          <div className="addlinks-url">URL</div>
          <div className="addlinks-topic">Topic</div>
        </div>

        <div className="addlinks-info">
          <div className="addlinks-row">
            {rows.map((row) => (
              <div className="addlinks-row-one" key={row.id}>
                <div className="addlinks-number">{row.id}</div>
                <input
                  type="text"
                  value={row.url}
                  onChange={(e) => updateRow(row.id, "url", e.target.value)}
                  placeholder="Enter video URL"
                  style={{ color: row.isValid ? "white" : "red" }}
                />
                <select
                  value={row.topic}
                  onChange={(e) => updateRow(row.id, "topic", e.target.value)}
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  {topicsRows && topicsRows.length > 0 ? (
                    topicsRows.map((topic, index) => (
                      <option key={index} value={topic.name}>
                        {topic.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No topics available</option>
                  )}
                </select>
                <img
                  src={deleteImg}
                  alt="Delete"
                  onClick={() => deleteRow(row.id)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
          <img
            src={addIcon}
            alt="Add"
            className="add-icon-links"
            onClick={addRow}
          />
        </div>

        <div className="addlinks-actions">
          <button className="check" onClick={() => checkAvailability(selectedType)}>
            Check
          </button>
          <button className="add" onClick={() => handleSubmit(selectedType)}>
            Add
          </button>
        </div>
      </div>

      <Success
        message={message}
        color={severity}
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />
    </main>
  );
};

export default AddLinks;