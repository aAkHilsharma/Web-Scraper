import axios from "axios";

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`/api/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { loginUser };
