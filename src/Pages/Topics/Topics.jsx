import React from "react";
import "./topics.css";
import editIcon from "../../assets/Edit.png";
import deleteIcon from "../../assets/delete.png";
import addIcon from "../../assets/add.png";
import DashboredItems from "../../Components/DashboredItems/DashboredItems";
import Success from "../../Components/Success/Success";
import useTopics from "../../hooks/useTopics";

const Topics = () => {
  const {
    topicsRows,
    numRows,
    isLoading,
    message,
    severity,
    openSnackbar,
    handleInputChange,
    addRow,
    updateRow,
    renameTopic,
    deleteRow,
    confirmAdd,
    setOpenSnackbar,
  } = useTopics();

  return (
    <main>
      <div className="topics-content">
        <div className="topics-top">
          <div className="topics-rowsNum">
            <label>Number of rows:</label>
            <input
              type="number"
              min={0}
              value={numRows}
              onChange={handleInputChange}
            />
          </div>
          <DashboredItems />
        </div>

        <div className="topics-head">
          <div>Topics</div>
        </div>

        <div className="topics-info">
          <div className="topics-row">
            {topicsRows.length > 0 ? (
              topicsRows.slice(0, numRows).map((item) => (
                <div className="topics-row-one" key={item.id}>
                  <div className="topic-number">{item.id}</div>
                  <input
                    type="text"
                    value={item.name}
                    className="topic-name"
                    onChange={(e) => updateRow(item.id, e.target.value)}
                  />
                  <div className="topic-actions">
                    <img
                      src={editIcon}
                      alt="edit"
                      onClick={() => renameTopic(item.id, item.name)}
                      style={{ cursor: "pointer" }}
                    />
                    <img
                      src={deleteIcon}
                      alt="delete"
                      onClick={() => deleteRow(item.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No topics available.</p>
            )}
          </div>
        </div>

        <div className="topics-btns">
          <button onClick={addRow}>
            <img src={addIcon} alt="add" />
            new row
          </button>
          <button onClick={confirmAdd} disabled={isLoading}>
            {isLoading ? "Loading..." : "Add"}
          </button>
        </div>

        <Success
          message={message}
          color={severity}
          open={openSnackbar}
          setOpen={setOpenSnackbar}
        />
      </div>
    </main>
  );
};

export default Topics;