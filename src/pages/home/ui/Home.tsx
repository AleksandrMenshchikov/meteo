import { Box, CircularProgress, Container } from '@mui/material';
import { Suspense } from 'react';
import { ReactErrorBoundary } from '@/src/shared/ui';
import { CITIES, COORDINATES } from '@/src/shared/config';
import { Weather } from '@/src/pages/home/ui/Weather.tsx';

export const Home = () => {
  return (
    <ReactErrorBoundary>
      <Suspense fallback={<CircularProgress />}>
        <Container maxWidth="lg">
          <Box
            component="ul"
            sx={{
              p: 0,
              m: 0,
              listStyle: 'none',
            }}
          >
            {Object.keys(CITIES).map((key) => (
              <Box component="li" key={key}>
                <Weather
                  title={key as keyof typeof CITIES}
                  coordinates={COORDINATES[key as keyof typeof CITIES]}
                />
              </Box>
            ))}
          </Box>
        </Container>
      </Suspense>
    </ReactErrorBoundary>
  );
};
