import api from "./api"

export async function registerUser(payload) {
  return await api.post("/register", payload)
}