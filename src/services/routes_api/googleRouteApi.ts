import axios from "axios";

export const googleRouteApiService = axios.create({
    baseURL: 'https://routes.googleapis.com',
    headers: {
        "X-Goog-Api-Key": process.env.GOOGLE_API_KEY
    }
})