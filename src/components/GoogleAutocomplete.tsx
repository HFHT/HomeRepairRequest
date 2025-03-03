//@ts-ignore
import { APILoader, PlacePicker } from '@googlemaps/extended-component-library/react';
import './../assets/styles/google.css'
import { getAddressComponent } from '../utils';

type GoogleAutocompleteType = {
  placeholder?: string
  countries?: string[]
  setAddress: (e: any) => void
}
export function GoogleAutocomplete({ placeholder = 'Address...', countries = ['us'], setAddress }: GoogleAutocompleteType) {
  const handlePlaceChange = (e: any) => {
    console.log(e.target.value?.addressComponents)
    console.log(e.target.value?.location.lat(), e.target.value?.location.lng())
    console.log(e.target.value?.types)
    const addr = `${getAddressComponent(e.target.value?.addressComponents, 'street_number')} ${getAddressComponent(e.target.value?.addressComponents, 'route')}, ${getAddressComponent(e.target.value?.addressComponents, 'locality')}, ${getAddressComponent(e.target.value?.addressComponents, 'administrative_area_level_1', true)} ${getAddressComponent(e.target.value?.addressComponents, 'postal_code')}`
    setAddress({ place: e.target.value?.addressComponents, formatted: addr, location: { lat: e.target.value?.location.lat(), lng: e.target.value?.location.lng() } })
  };

  return (
    <div>
      <APILoader apiKey={import.meta.env.VITE_GOOGLE_APIKEY} solutionChannel="GMP_GCC_placepicker_v1" />
      <div className="google-container">
        <PlacePicker country={countries} placeholder={placeholder} onPlaceChange={handlePlaceChange} />
        <div className="google-result">
        </div>
      </div>
    </div>
  );
}
