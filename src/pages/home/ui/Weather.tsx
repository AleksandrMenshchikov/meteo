import { CITIES, COORDINATES, TIME_RANGES } from '@/src/shared/config';
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useGetWeatherQuery } from '@/src/shared/api';
import { type ChangeEvent, useCallback, useState } from 'react';
import { BarChart } from '@mui/x-charts';
import { useSearchParams } from 'react-router';

export type WeatherProps = {
  title: keyof typeof CITIES;
  coordinates: (typeof COORDINATES)[keyof typeof CITIES];
};

const HOUR = 3_600_000; // 1 час в миллисекундах

export const Weather = ({ title, coordinates }: WeatherProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [timeRange, setTimeRange] = useState<number>(() => {
    const v = searchParams.get(title);
    return (v && +v) || TIME_RANGES['24ч'];
  });

  const { currentData, isFetching, isError, refetch } = useGetWeatherQuery(
    {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      forecast_hours: timeRange,
    },
    {
      refetchOnMountOrArgChange: timeRange,
      refetchOnReconnect: true,
      pollingInterval: HOUR,
    },
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const v = (event.target as HTMLInputElement).value;
      setTimeRange(Number(v));
      setSearchParams((prev) => {
        prev.set(title, v);
        return prev;
      });
    },
    [setSearchParams, title],
  );

  const handleButtonClick = useCallback(() => refetch(), [refetch]);

  return (
    <Box sx={{ pt: 2, pb: 2 }}>
      <Typography
        component="h3"
        sx={{ fontSize: 24, fontWeight: 500, textAlign: 'center' }}
      >
        {CITIES[title]}
      </Typography>
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 500,
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        Временной диапазон
      </Typography>
      <RadioGroup
        sx={{ flexDirection: 'row', justifyContent: 'center', gap: 1 }}
        aria-labelledby="controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={timeRange}
        onChange={handleChange}
      >
        {Object.entries(TIME_RANGES).map(([key, value]) => (
          <FormControlLabel
            value={value}
            key={key}
            control={<Radio size="small" />}
            label={key}
          />
        ))}
      </RadioGroup>
      {isFetching && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 300,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {isError && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 300,
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              color: 'warning.main',
              textAlign: 'center',
              mt: 1,
              mb: 1,
            }}
          >
            Произошла ошибка при загрузке данных
          </Typography>
          <Button
            sx={{ textTransform: 'none', fontSize: 16 }}
            onClick={handleButtonClick}
          >
            Попробуйте ещё раз
          </Button>
        </Box>
      )}
      {currentData && !isFetching && (
        <BarChart
          xAxis={[
            {
              data: currentData.hourly.time.map((item) =>
                new Date(item).toLocaleString(),
              ),
            },
          ]}
          yAxis={[
            {
              label: 'температура (°C)',
              width: 60,
            },
          ]}
          series={[
            {
              data: currentData.hourly.temperature_2m,
              valueFormatter: (v) => v + ' °C',
            },
          ]}
          height={300}
        />
      )}
    </Box>
  );
};
