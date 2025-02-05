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

    console.log("Weather data:", todayWeather.value?.coord?.lon)
    console.log(
      "Moon data:",
      moon.value?.moon_phases?.full_moon?.next?.datestamp
    )
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
    <section>
      <div>
        <h2>- {{ inputCity }}</h2>
      </div>
      <div>
        <input
          type="text"
          v-model="inputCity"
          placeholder="Press Enter City Name"
          @keydown.enter="handleSearch"
        />
      </div>
      <button @click="handleSearch">Search</button>
    </section>

    <h1>Weather App</h1>
    <div class="weather_basic">
      <span></span>
      <div>
        <div>
          <h3>
            {{ coordinates?.results?.[0]?.formatted ?? "Location not found" }}
            {{ coordinates?.results?.[0]?.annotations?.flag ?? "" }}
          </h3>
          <p>{{ todayWeather?.weather?.[0]?.description ?? "No data" }}</p>
        </div>
        <h2>{{ todayWeather?.main?.temp ?? "N/A" }}&deg;</h2>
      </div>
    </div>
    <div v-if="todayWeather" class="weather_details">
      <h3>Today's Highlights</h3>
      <div>
        <span></span>
        <h4>Feels Like</h4>
        <h5>{{ Math.round(todayWeather?.main?.feels_like ?? 0) }}&deg;</h5>
      </div>
      <div>
        <span></span>
        <h4>Min - Max Temp</h4>
        <h5>
          {{ Math.round(todayWeather?.main?.temp_min ?? 0) }}&deg; -
          {{ Math.round(todayWeather?.main?.temp_max ?? 0) }}&deg;
        </h5>
      </div>
      <div>
        <span></span>
        <h4>Visibility</h4>
        <h5>{{ todayWeather?.visibility ?? "N/A" }} meters</h5>
      </div>
      <div>
        <span></span>
        <h4>Humidity</h4>
        <h5>{{ todayWeather?.main?.humidity ?? "N/A" }} %</h5>
      </div>
      <div>
        <span></span>
        <h4>Pressure</h4>
        <h5>{{ todayWeather?.main?.pressure ?? "N/A" }} hPa</h5>
      </div>
      <div>
        <span></span>
        <h4>Wind</h4>
        <h5>{{ Math.trunc((todayWeather?.wind?.speed ?? 0) * 3.6) }} km/h</h5>
      </div>
    </div>
    <aside v-if="moon" class="weather_moon">
      <div>
        <h4>Sunrise & Sunset:</h4>
        <p>
          {{ moon.sun?.sunrise_timestamp ?? "N/A" }}🌅-{{
            moon.sun?.sunset_timestamp ?? "N/A"
          }}🌇
        </p>
      </div>
      <div>
        <h4>Moonrise & Moonset:</h4>
        <p>
          {{ moon.moon?.moonrise ?? "N/A" }}🌙-{{
            moon.moon?.moonset ?? "N/A"
          }}🌓
        </p>
      </div>
      <div>
        <h4>Current Moon Phase:</h4>
        <p>{{ moon.moon?.phase_name ?? "N/A" }}{{ moon.moon?.emoji ?? "" }}</p>
      </div>

      <div>
        <h4>Next Solar Eclipse:</h4>
        <p>
          {{ moon.sun?.next_solar_eclipse?.datestamp ?? "N/A" }} 🌑({{
            moon.sun?.next_solar_eclipse?.type ?? "N/A"
          }})
        </p>
      </div>
      <div>
        <h4>Next Lunar Eclipse:</h4>
        <p>{{ moon.moon?.next_lunar_eclipse?.datestamp ?? "N/A" }}🌔</p>
      </div>
      <div>
        <h4>Next Full Moon:</h4>
        <p>
          {{ moon?.value?.moon_phases?.full_moon?.next?.datestamp ?? "N/A" }}
        </p>
      </div>
      <div>
        <h4>Zodiac Sign:</h4>
        <p>
          🌞 Sun in {{ moon.moon?.zodiac?.sun_sign ?? "N/A" }} | 🌙 Moon in
          {{ moon.moon?.zodiac?.moon_sign ?? "N/A" }}
        </p>
      </div>
    </aside>
  </div>
</template>

<style>
.test {
  border: 2px solid yellow;
}
</style>
