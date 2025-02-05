export interface moonType {
  timestamp: number
  datestamp: string
  sun: {
    sunrise: number
    sunrise_timestamp: string
    sunset: number
    sunset_timestamp: string
    solar_noon: string
    day_length: string
    sun_altitude: number
    sun_distance: number
    sun_azimuth: number
    next_solar_eclipse: EclipseEvent
  }
  moon: {
    phase: number
    phase_name: string
    stage: string
    illumination: string
    age_days: number
    lunar_cycle: string
    emoji: string
    zodiac: {
      sun_sign: string
      moon_sign: string
    }
    moonrise: string
    moonrise_timestamp: number
    moonset: string
    moonset_timestamp: number
    moon_altitude: number
    moon_distance: number
    moon_azimuth: number
    moon_parallactic_angle: number
    next_lunar_eclipse: EclipseEvent
  }
  moon_phases: {
    new_moon: MoonPhaseDetails
    first_quarter: MoonPhaseDetails
    full_moon: FullMoonDetails
    last_quarter: MoonPhaseDetails
  }
  location: {
    latitude: number
    longitude: number
  }
}

interface EclipseEvent {
  timestamp: number
  datestamp: string
  type: string
  visibility_regions: string
}

interface MoonPhaseDetails {
  last: PhaseTimestamp
  next: PhaseTimestamp
}

interface FullMoonDetails {
  last: FullMoonInfo
  next: FullMoonInfo
}

interface PhaseTimestamp {
  timestamp: number
  datestamp: string
  days_ago?: number
  days_ahead?: number
}

interface FullMoonInfo extends PhaseTimestamp {
  name: string
  description: string
}
