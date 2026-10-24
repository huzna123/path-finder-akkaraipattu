// src/utils/helpers.js

/**
 * இந்த Function, ஒரு குறிப்பிட்ட இடத்திற்கும் (Destination) நமது "Home" 
 * இடத்திற்கும் இடையிலான தூரத்தை கிலோமீட்டரில் (Haversine Formula மூலம்) கணக்கிடுகிறது.
 */
export const calculateDistanceFromHome = (destLat, destLng) => {
  // Default Home Location (உதாரணமாக: அக்கரைப்பற்று மையப் பகுதி)
  // உங்களுக்குத் தேவையானால் இந்த Lat, Lng மதிப்புகளை மாற்றிக்கொள்ளலாம்.
  const homeLat = 7.2185; 
  const homeLng = 81.8512;

  if (!destLat || !destLng) return "N/A";

  // Degrees-ஐ Radians-ஆக மாற்றும் function
  const toRad = (value) => (value * Math.PI) / 180;
  
  const R = 6371; // பூமியின் ஆரம் (Radius of Earth in km)

  const dLat = toRad(destLat - homeLat);
  const dLng = toRad(destLng - homeLng);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(homeLat)) * Math.cos(toRad(destLat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return `${distance.toFixed(1)} km`; // தசமத்தில் ஒரு ஸ்தானம் மட்டும் காட்டும் (e.g., 4.2 km)
};


/**
 * இந்த Function, கொடுக்கப்பட்ட Latitude மற்றும் Longitude-ஐ பயன்படுத்தி 
 * புதிய Tab-இல் Google Maps-ஐ திறந்து வழியைக் (Directions) காட்டும்.
 */
export const openGoogleMaps = (lat, lng) => {
  if (lat && lng) {
    // Current Location-இல் இருந்து Destination-க்கு வழிகாட்ட Google Maps URL
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank');
  } else {
    alert("மன்னிக்கவும்! இந்த இடத்திற்கான சரியான Location (Lat, Lng) இணைக்கப்படவில்லை.");
  }
};