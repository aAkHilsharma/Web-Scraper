import axios from "axios";

const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`/api/auth/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { registerUser };
