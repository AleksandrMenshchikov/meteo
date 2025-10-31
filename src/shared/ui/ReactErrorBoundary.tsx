import { ErrorBoundary } from 'react-error-boundary';
import type { ReactNode } from 'react';
import { Box, Button, Typography } from '@mui/material';

function Fallback({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}): ReactNode {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'inherit',
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 20 }}>Что-то пошло не так!</Typography>
        <Button
          variant="outlined"
          sx={{ textTransform: 'none', fontSize: 16, mt: 2 }}
          onClick={() => resetErrorBoundary()}
        >
          Попробуйте ещё раз
        </Button>
      </Box>
    </Box>
  );
}

export const ReactErrorBoundary = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onError={(err: Error) => console.error(err.message)}
    >
      {children}
    </ErrorBoundary>
  );
};
