import { Typography, Box } from "@mui/material";

const AiSuggestion = ({ aiResponse }) => {
  return aiResponse ? (
    <Box
      sx={{
        marginTop: 2,
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
        marginBottom : 2,
      }}
    >
      <Typography 
        variant="body1" 
        sx={{ color: "blue", fontWeight: "bold" }}
      >
        AI Suggestion:
      </Typography>
      <Typography variant="body2" sx={{ color: "#333", marginTop: 1 }}>
        {aiResponse}
      </Typography>
    </Box>
  ) : null;
};

export default AiSuggestion;
