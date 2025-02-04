export interface Coordinates {
  documentation: string
  licenses: License[]
  rate: Rate
  results: Result[]
  status: Status
  stay_informed: StayInformed
  thanks: string
  timestamp: Timestamp
  total_results: number
}

interface License {
  name: string
  url: string
}

interface Rate {
  limit: number
  remaining: number
  reset: number
}

interface Result {
  annotations: Annotations
  bounds: Bounds
  components: Components
  confidence: number
  formatted: string
  geometry: Geometry
}

interface Annotations {
  DMS: {
    lat: string
    lng: string
  }
  MGRS: string
  Maidenhead: string
  Mercator: {
    x: number
    y: number
  }
  NUTS: {
    NUTS0: { code: string }
    NUTS1: { code: string }
    NUTS2: { code: string }
    NUTS3: { code: string }
  }
  OSM: {
    edit_url: string
    note_url: string
    url: string
  }
  UN_M49: {
    regions: {
      DE: string
      EUROPE: string
      WESTERN_EUROPE: string
      WORLD: string
    }
    statistical_groupings: string[]
  }
  callingcode: number
  currency: Currency
  flag: string
  geohash: string
  qibla: number
  roadinfo: {
    drive_on: string
    road: string
    speed_in: string
  }
  sun: {
    rise: Time
    set: Time
  }
  timezone: Timezone
  what3words: {
    words: string
  }
  wikidata: string
}

interface Currency {
  alternate_symbols: string[]
  decimal_mark: string
  html_entity: string
  iso_code: string
  iso_numeric: number
  name: string
  smallest_denomination: number
  subunit: string
  subunit_to_unit: number
  symbol: string
  symbol_first: number
  thousands_separator: string
}

interface Time {
  apparent: number
  astronomical: number
  civil: number
  nautical: number
}

interface Timezone {
  name: string
  now_in_dst: number
  offset_sec: number
  offset_string: string
  short_name: string
}

interface Bounds {
  northeast: Coordinate
  southwest: Coordinate
}

interface Components {
  "ISO_3166-1_alpha-2": string
  "ISO_3166-1_alpha-3": string
  "ISO_3166-2": string[]
  _category: string
  _normalized_city: string
  _type: string
  continent: string
  country: string
  country_code: string
  house_number: string
  museum: string
  political_union: string
  postcode: string
  road: string
  state: string
  suburb: string
  town: string
}

interface Geometry {
  lat: number
  lng: number
}

interface Status {
  code: number
  message: string
}

interface StayInformed {
  blog: string
  mastodon: string
}

interface Timestamp {
  created_http: string
  created_unix: number
}

interface Coordinate {
  lat: number
  lng: number
}
