import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const ProductInquiry: React.FC = () => {
  const [question, setQuestion] = useState("");

  const handleSubmit = () => {
    if (question.trim()) {
      console.log("문의 제출:", question);
      setQuestion("");
    }
  };

  return (
    <Box sx={{ mt: 6, py: 4, borderTop: "1px solid #E0E0E0" }}>
      <Typography
        variant="h2"
        sx={{ mb: 3, fontSize: "1.5rem", fontWeight: 700 }}
      >
        상품 문의
      </Typography>

      <Box sx={{ maxWidth: 600 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="문의하기"
          placeholder="이 상품에 대해 궁금한 점을 문의해주세요..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!question.trim()}
            sx={{
              px: 4,
              backgroundColor: "#FF8A00",
              "&:hover": { backgroundColor: "#E67300" },
            }}
          >
            문의 등록
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductInquiry;
