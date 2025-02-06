<script setup lang="ts">
import { onMounted, ref } from "vue"
import {
  getDailyWeather,
  getCoordinates,
  getMoonData,
} from "./services/services"
import type { Coordinates } from "./types/coordinates"
import type { currentWeather } from "./types/weather"
import type { moonType } from "./types/moon"

let inputCity = ref("Athens Greece")
let coordinates = ref<Coordinates | null>(null)
let todayWeather = ref<currentWeather | null>(null)
let moon = ref<moonType | null>(null)
let isLoading = ref(false)
let errorMessage = ref<string | null>(null)
import { MapPin, Search } from "lucide-vue-next"

const weatherIcons: Record<string, string> = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Fog: "🌁",
  Tornado: "🌪️",
  Default: "🌈",
}

const getWeatherIcon = (description: string | undefined): string => {
  if (!description) return weatherIcons.Default

  const formattedDescription = description
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return weatherIcons[formattedDescription] || weatherIcons.Default
}

const handleSearch = async (): Promise<void> => {
  isLoading.value = true
  errorMessage.value = null

  try {
    coordinates.value = await getCoordinates(inputCity.value)
    if (!coordinates.value?.results?.[0]?.geometry) {
      throw new Error("Invalid coordinates data")
    }

    const { lat, lng } = coordinates.value.results[0].geometry

    moon.value = await getMoonData(lat, lng)

    todayWeather.value = await getDailyWeather(lat, lng)
  } catch (error) {
    console.error("Error fetching data:", error)
    errorMessage.value = "Failed to fetch data. Please try again."
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div v-if="coordinates && todayWeather && moon">
    <section class="weather_search">
      <h2><MapPin /></h2>
      <div class="weather_search_input">
        <input
          type="text"
          v-model="inputCity"
          placeholder="Press Enter City Name"
          @keydown.enter="handleSearch"
        />
        <button @click="handleSearch"><Search /></button>
      </div>
    </section>
    <div class="weather_view">
      <section class="weather_basic">
        <span>{{ getWeatherIcon(todayWeather?.weather?.[0]?.main) }}</span>
        <div class="weather_basic_today">
          <div>
            <h3>
              {{ coordinates?.results?.[0]?.formatted ?? "Location not found" }}
              {{ coordinates?.results?.[0]?.annotations?.flag ?? "" }}
            </h3>
            <p>{{ todayWeather?.weather?.[0]?.description ?? "No data" }}</p>
          </div>
          <h2>{{ todayWeather?.main?.temp.toFixed(1) ?? "N/A" }}&deg;</h2>
        </div>
      </section>
      <section v-if="todayWeather" class="weather_details">
        <div class="weather_details_box">
          <img src="/img/feels_like.png" alt="thermometer icon" />
          <h4>Feels Like</h4>
          <h5>{{ Math.round(todayWeather?.main?.feels_like ?? 0) }}&deg;</h5>
        </div>
        <div class="weather_details_box">
          <img src="/img/min_max.png" alt="meter icon" />
          <h4>
            Min - Max <br />
            Temp
          </h4>
          <h5>
            {{ Math.round(todayWeather?.main?.temp_min ?? 0) }}&deg; -
            {{ Math.round(todayWeather?.main?.temp_max ?? 0) }}&deg;
          </h5>
        </div>
        <div class="weather_details_box">
          <img src="/img/visibility.png" alt="fog icon" />
          <h4>Visibility</h4>
          <h5>{{ todayWeather?.visibility ?? "N/A" }} meters</h5>
        </div>
        <div class="weather_details_box">
          <img src="/img/humidity.png" alt="humidity icon" />
          <h4>Humidity</h4>
          <h5>{{ todayWeather?.main?.humidity ?? "N/A" }} %</h5>
        </div>
        <div class="weather_details_box">
          <img src="/img/pressure.png" alt="pressure meter icon" />
          <h4>Pressure</h4>
          <h5>{{ todayWeather?.main?.pressure ?? "N/A" }} hPa</h5>
        </div>
        <div class="weather_details_box">
          <img src="/img/wind.png" alt="wind meter icon" />
          <h4>Wind</h4>
          <h5>{{ Math.trunc((todayWeather?.wind?.speed ?? 0) * 3.6) }} km/h</h5>
        </div>
      </section>

      <aside v-if="moon" class="weather_moon">
        <div class="weather_moon_box">
          <h4>Sunrise & Sunset:</h4>
          <p>
            {{ moon.sun?.sunrise_timestamp ?? "N/A" }}🌅-{{
              moon.sun?.sunset_timestamp ?? "N/A"
            }}🌇
          </p>
        </div>
        <div class="weather_moon_box">
          <h4>Moonrise & Moonset:</h4>
          <p>
            {{ moon.moon?.moonrise ?? "N/A" }}🌙-{{
              moon.moon?.moonset ?? "N/A"
            }}🌓
          </p>
        </div>
        <div class="weather_moon_box">
          <h4>Current Moon Phase:</h4>
          <p>
            {{ moon.moon?.phase_name ?? "N/A" }}{{ moon.moon?.emoji ?? "" }}
          </p>
        </div>

        <div class="weather_moon_box">
          <h4>Next Solar Eclipse:</h4>
          <p>
            {{ moon.sun?.next_solar_eclipse?.datestamp ?? "N/A" }} 🌑({{
              moon.sun?.next_solar_eclipse?.type ?? "N/A"
            }})
          </p>
        </div>
        <div class="weather_moon_box">
          <h4>Next Lunar Eclipse:</h4>
          <p>{{ moon.moon?.next_lunar_eclipse?.datestamp ?? "N/A" }}🌔</p>
        </div>

        <div class="weather_moon_box">
          <h4>Zodiac Sign:</h4>
          <p>
            🌞 Sun in {{ moon.moon?.zodiac?.sun_sign ?? "N/A" }} | 🌙 Moon in
            {{ moon.moon?.zodiac?.moon_sign ?? "N/A" }}
          </p>
        </div>
      </aside>
    </div>
  </div>
</template>
