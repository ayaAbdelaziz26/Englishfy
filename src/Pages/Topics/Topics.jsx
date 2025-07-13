import React, { useState } from "react";
import "./topics.css";
import editIcon from "../../assets/Edit.png";
import deleteIcon from "../../assets/delete.png";
import addIcon from "../../assets/add.png";
import DashboredItems from "../../Components/DashboredItems/DashboredItems";
import Success from "../../Components/Success/Success";
import useTopics from "../../hooks/useTopics";
import ConfirmDialog from "../../Components/ConfirmDialog/ConfirmDialog";

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

  const [confirmationModal, setConfirmationModal] = useState({
    open: false,
    message: "",
    action: null,
  });

  const handleDelete = (id) => {
    setConfirmationModal({
      open: true,
      message: "Are you sure you want to delete this topic?",
      action: () => deleteRow(id),
    });
  };

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
              topicsRows.slice(0, numRows).map(({ id, name }) => (
                <div className="topics-row-one" key={id}>
                  <div className="topic-number">{id}</div>
                  <input
                    type="text"
                    value={name}
                    className="topic-name"
                    onChange={(e) => updateRow(id, e.target.value)}
                  />
                  <div className="topic-actions">
                    <img
                      src={editIcon}
                      alt="edit"
                      onClick={() => renameTopic(id, name)}
                      style={{ cursor: "pointer" }}
                    />
                    <img
                      src={deleteIcon}
                      alt="delete"
                      onClick={() => handleDelete(id)}
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

        <ConfirmDialog
          open={confirmationModal.open}
          message={confirmationModal.message}
          onConfirm={() => {
            if (confirmationModal.action) confirmationModal.action();
            setConfirmationModal({ open: false, action: null, message: "" });
          }}
          onCancel={() =>
            setConfirmationModal({ open: false, action: null, message: "" })
          }
        />
      </div>
    </main>
  );
};

export default Topics;