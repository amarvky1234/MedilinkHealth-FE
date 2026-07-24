const API_URL = "http://localhost:3300";

export const getDoctorImage = (photo) => {
    if (!photo) {
        return "/default-doctor.png"; // Optional fallback image
    }

    return photo.startsWith("http")
        ? photo
        : `${API_URL}${photo}`;
};