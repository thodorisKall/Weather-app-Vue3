<script setup lang="ts">
import { onMounted } from "vue"
import { getDailyWeather, getCoordinates } from "./services/services"

onMounted(async () => {
  const weatherData = await getDailyWeather(50.9775106, 11.3285424)
  console.log("Weather Data:", weatherData)

  const coordinates = await getCoordinates("New York")
  console.log("Coordinates:", coordinates)
})
</script>

<template>
  <h1>Weather App</h1>
</template>
