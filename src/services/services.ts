import axios from "axios"

// API requests

const weather_API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const geocoding_API_KEY = import.meta.env.VITE_GEOCODING_API_KEY

const geocoding_BASE_URL = "https://api.opencagedata.com/geocode/v1/json?q="
const weather_BASE_URL = "https://api.openweathermap.org/data/2.5/weather?lat="

export const getDailyWeather = async (lat: any, lon: any): Promise<any> => {
  try {
    const res: any = await axios.get(
      `${weather_BASE_URL}${lat}&lon=${lon}&appid=${weather_API_KEY}`
    )
    return res.data
  } catch (error: any) {
    console.error(`Error getting Current weather: ${error}`)
  }
}

export const getCoordinates = async (city: String): Promise<any> => {
  try {
    const res: any = await axios.get(
      `${geocoding_BASE_URL}${city}&key=${geocoding_API_KEY}`
    )
    return res
  } catch (error: any) {
    console.error(`Error getting Current coordinates: ${error.message}`)
    return null
  }
}
