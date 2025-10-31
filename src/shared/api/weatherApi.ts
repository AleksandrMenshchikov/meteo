import { baseApi } from '@/src/shared/api/baseApi.ts';
import type { Weather } from '@/src/shared/entities';

export const weatherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWeather: builder.query<
      Weather,
      {
        latitude: number;
        longitude: number;
        forecast_hours: number;
      }
    >({
      query: ({ latitude, longitude, forecast_hours }) => ({
        url: '/forecast',
        method: 'GET',
        params: {
          timezone: 'auto',
          hourly: 'temperature_2m',
          latitude,
          longitude,
          forecast_hours,
        },
      }),
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
