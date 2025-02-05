import axios from "axios"
import type { Coordinates } from "../types/coordinates"

// API requests

const weather_API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const geocoding_API_KEY = import.meta.env.VITE_GEOCODING_API_KEY
const rapid_API_KEY = import.meta.env.VITE_RAPID_API_KEY

const geocoding_BASE_URL = "https://api.opencagedata.com/geocode/v1/json?q="
const weather_BASE_URL = "https://api.openweathermap.org/data/2.5/weather?lat="

export const getDailyWeather = async (
  lat: number,
  lon: number
): Promise<any> => {
  try {
    const res: any = await axios.get(
      `${weather_BASE_URL}${lat}&lon=${lon}&appid=${weather_API_KEY}&units=metric`
    )
    return res.data
  } catch (error: any) {
    console.error(`Error getting Current weather: ${error}`)
  }
}

export const getCoordinates = async (
  city: String
): Promise<Coordinates | any> => {
  try {
    const res: any = await axios.get(
      `${geocoding_BASE_URL}${city}&key=${geocoding_API_KEY}`
    )
    return res.data
  } catch (error: any) {
    console.error(`Error getting Current coordinates: ${error.message}`)
    return null
  }
}

export const getMoonData = async (lat: number, lon: number) => {
  try {
    const res = await axios.get("https://moon-phase.p.rapidapi.com/advanced", {
      params: { lat, lon },
      headers: {
        "X-Rapidapi-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-Rapidapi-Host": "moon-phase.p.rapidapi.com",
      },
    })

    return res.data
  } catch (error) {
    console.error("Error fetching moon data:", error)
    return null
  }
}
