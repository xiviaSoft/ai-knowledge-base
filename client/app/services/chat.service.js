import api from "./api.service";

export const askQuestion = async (question) => {
  const response = await api.post("/chat", {
    question,
  });

  return response.data;
};