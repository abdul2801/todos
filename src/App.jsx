import { Container } from "@mui/material";
import { useState } from "react";
import "./styles.css";
import axios from "axios";

import TaskInput from "./components/TaskInp";
import TaskList from "./components/TaskList";
import FilterDropdown from "./components/FilterDropdown";
import AiSuggestion from "./components/AiSuggestion";
import useLocalStorage from "./hooks/useLocalStorage";
function App() {
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [aiResponse, setAiResponse] = useState("");

  const onChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleClick = () => {
    if (!isEdited) {
      setTodos([
        ...todos,
        { val: inputVal, isDone: false, id: new Date().getTime() },
      ]);
    } else {
      const updatedTodos = todos.map((todo) =>
        todo.id === editedId ? { ...todo, val: inputVal } : todo
      );
      setTodos(updatedTodos);
    }
    setInputVal("");
    setIsEdited(false);
  };

  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleEdit = (id) => {
    const editVal = todos.find((todo) => todo.id === id);
    setEditedId(editVal.id);
    setInputVal(editVal.val);
    setIsEdited(true);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleAiSuggestion = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key='+apiKey, 
        {
          contents: [
            {
              parts: [
                {
                  text: "Suggest how to do this task(max 150 words keep words less only) :"+inputVal,  
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response)
  
      // Handling the response
      const aiSuggestion = response.data.candidates[0].content.parts[0].text;
  
      // setTodos([
      //   ...todos,
      //   {
      //     val: `${inputVal}: ${aiSuggestion}`,
      //     isDone: false,
      //     id: new Date().getTime(),
      //   },
      // ]);

      setAiResponse(aiSuggestion)
  
      setInputVal(""); // Reset input field
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Error fetching AI response.");
    }
  };
  
  
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.isDone;
    if (filter === "pending") return !todo.isDone;
    return true;
  });

  return (
    <Container component="main" style={{ textAlign: "center", marginTop: 100 }}>
      <TaskInput
        inputVal={inputVal}
        onChange={onChange}
        handleClick={handleClick}
        isEdited={isEdited}
        handleAiSuggestion={handleAiSuggestion}
      />
      <FilterDropdown filter={filter} handleFilterChange={handleFilterChange} />
      <AiSuggestion aiResponse={aiResponse} />

      <TaskList
        todos={filteredTodos}
        handleDone={handleDone}
        onDelete={onDelete}
        handleEdit={handleEdit}
      />
    </Container>
  );
}

export default App;
