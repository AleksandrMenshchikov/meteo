export const API_BASE_URL = 'https://api.open-meteo.com/v1';

export const CITIES = {
  Amsterdam: 'Амстердам',
  NewYork: 'Нью-Йорк',
  Tokio: 'Токио',
};

export const COORDINATES: Record<
  keyof typeof CITIES,
  { latitude: number; longitude: number }
> = {
  Amsterdam: { latitude: 42.656, longitude: 23.4072 },
  NewYork: {
    latitude: 40.7254,
    longitude: -74.0075,
  },
  Tokio: { latitude: 35.6586, longitude: 139.7455 },
};

export const TIME_RANGES = {
  '6ч': 6,
  '24ч': 24,
  '3д': 24 * 3,
  '7д': 24 * 7,
};
