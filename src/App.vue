<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getDailyWeather, getCoordinates } from "./services/services"
import type { Coordinates } from "./types/coordinates"
import type { currentWeather } from "./types/weather"

let inputCity = ref("")
let coordinates = ref<Coordinates>(null)
let todayWeather = ref<currentWeather>(null)

const handleSearch = async (): Promise<any> => {
  coordinates.value = await getCoordinates(inputCity.value)

  console.log(
    coordinates.value.results[0].geometry.lat,
    coordinates.value.results[0].geometry.lng
  )

  todayWeather.value = await getDailyWeather(
    coordinates.value.results[0].geometry.lat,
    coordinates.value.results[0].geometry.lng
  )

  console.log("Weather data:", todayWeather.value.coord.lon)
}
</script>

<template>
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
          {{ coordinates.results[0].formatted }}
          {{ coordinates.results[0].annotations.flag }}
        </h3>
        <p>{{ todayWeather.weather.description }}</p>
      </div>
      <h2>{{ todayWeather.main.temp }}</h2>
    </div>
  </div>
  <div class="weather_details">
    <h3>Today's Highlights</h3>
    <div>
      <span></span>
      <h4>Feels Like</h4>
      <h5>{{ Math.round(todayWeather.main.temp) }}</h5>
    </div>
    <div>
      <span></span>
      <h4>Min - Max Temp</h4>
      <h5>
        {{ Math.round(todayWeather.main.temp_min) }} -
        {{ Math.round(todayWeather.main.temp_max) }}
      </h5>
    </div>
    <div>
      <span></span>
      <h4>Visibility</h4>
      <h5>{{ todayWeather.visibility }}</h5>
    </div>
    <div>
      <span></span>
      <h4>Humidity</h4>
      <h5>{{ todayWeather.main.humidity }}</h5>
    </div>
    <div>
      <span></span>
      <h4>Pressure</h4>
      <h5>{{ todayWeather.main.pressure }}</h5>
    </div>
    <div>
      <span></span>
      <h4>Wind</h4>
      <h5>{{ Math.trunc(todayWeather.wind.speed * 3.6) }} km/h</h5>
    </div>
  </div>
</template>

<style>
.test {
  border: 2px solid yellow;
}
</style>
