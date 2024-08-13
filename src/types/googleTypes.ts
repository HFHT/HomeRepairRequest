export type predictionType = null | {
    description: string         // full predicted address for top choice
    place_id?: string
    reference?: string
    types?: string[]
    terms?: any
    structured_formatting?: {
      main_text: string
      secondary_text: string
      main_text_matched_substrings: any[]
    }
    matched_substrings?: any[]
  }
  export type placesType = null | {
    results: placesResultType[]
    status: 'OK'
  }
  
  export type placesResultType = {
    address_components: PlacesResultAddressComponentsType[]
    formatted_address: string
    geometry: any
    place_id: string
    types: string[]
  }
  export type PlacesResultAddressComponentsType = {
    long_name: string
    short_name: string
    types: 'street number' | 'route' | 'neighborhood' | 'political' | 'locality' | 'administrative_area_level_1' | 'administrative_area_level_2' | 'country' | 'postal_code' | 'postal_code_suffix' []
  }
  export type PlacesResultAddressGeometryType = {
    bounds: {
      northeast: {lat: number, lng: number}
      southwest: {lat: number, lng: number}
    }
    location: {lat: number, lng: number}
    location_type: 'ROOFTOP' | 'GEOMETRIC_CENTER' | 'RANGE_INTERPOLATED'
    viewport: {
      northeast: {lat: number, lng: number}
      southwest: {lat: number, lng: number}
    }
    place_id: string
    types: 'premise' | 'street_address' []
  }
  