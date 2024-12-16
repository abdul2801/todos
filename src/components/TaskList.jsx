import {
  List,
  ListItem,
  Button,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";

const TaskList = ({ todos, handleDone, onDelete, handleEdit }) => {
  return (
    <List sx={{ width: "90%", margin: "auto", padding: 0 }}>
      {todos.map((todo) => (
        <ListItem
          divider
          key={todo.id}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stacks on small screens
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
            border: "1px solid lightgray",
            borderRadius: "8px",
            marginBottom: 2,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", sm: "70%" }, // Full width on mobile
              marginBottom: { xs: 1, sm: 0 }, // Adds spacing for stacked layout
            }}
          >
            <Checkbox
              onClick={() => handleDone(todo.id)}
              checked={todo.isDone}
              sx={{ marginRight: 2 }}
            />
            <Typography
              sx={{
                flex: 1,
                color: todo.isDone ? "green" : "inherit",
                wordWrap: "break-word", // Prevents overflow
                whiteSpace: "normal", // Allows wrapping on small screens
                fontSize: { xs: "1rem", sm: "1.2rem" }, // Responsive font size
              }}
            >
              {todo.val}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Button
              onClick={() => handleEdit(todo.id)}
              variant="contained"
              size="small"
              sx={{
                marginLeft: { xs: 0, sm: 2 },
                marginRight: { xs: 1, sm: 0 },
                fontSize: "0.8rem",
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => onDelete(todo.id)}
              color="secondary"
              variant="contained"
              size="small"
              sx={{
                marginLeft: { xs: 0, sm: 2 },
                fontSize: "0.8rem",
              }}
            >
              Delete
            </Button>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
