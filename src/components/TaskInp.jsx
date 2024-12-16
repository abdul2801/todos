import { TextField, Button } from "@mui/material";

const TaskInput = ({
  inputVal,
  onChange,
  handleClick,
  isEdited,
  handleAiSuggestion,
}) => {
  return (
    <>
      <TextField
        variant="outlined"
        onChange={onChange}
        label="Type your task"
        value={inputVal}
        style={{ width: "70%", marginBottom: 30 }}
      />
      <Button
        size="large"
        variant={isEdited ? "outlined" : "contained"}
        color="primary"
        onClick={handleClick}
        style={{ height: 55, marginBottom: 30 }}
        disabled={!inputVal}
      >
        {isEdited ? "Edit Task" : "Add Task"}
      </Button>
      <Button
        size="large"
        variant="contained"
        color="secondary"
        onClick={handleAiSuggestion}
        disabled={!inputVal}
        style={{ height: 55, marginBottom: 30, margin: 10 }}
      >
        Get "How to do" Suggestion
      </Button>
    </>
  );
};

export default TaskInput;
