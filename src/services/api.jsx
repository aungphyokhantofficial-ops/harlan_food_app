import axios from "axios";

const API_URL = "http://localhost:8800"; // သင့် Backend Port အတိုင်းပြင်ပါ

export const getReservations = () => axios.get(`${API_URL}/reservations`);

export const updateStatus = (id, status) => axios.patch(`${API_URL}/reservations/${id}/status`, { status });

export const deleteReservation = (id) => axios.delete(`${API_URL}/reservations/${id}`);
