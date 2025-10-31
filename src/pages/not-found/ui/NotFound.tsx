import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

export const NotFound = () => {
  const navigate = useNavigate();

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
        <Typography component="h1" sx={{ fontSize: 28, textAlign: 'center' }}>
          404
        </Typography>
        <Typography sx={{ fontSize: 20, textAlign: 'center', mt: 1 }}>
          Страница не найдена
        </Typography>
        <Button
          sx={{
            fontSize: 16,
            textTransform: 'none',
            fontWeight: 400,
            mt: 1,
          }}
          onClick={() => navigate('/', { replace: true })}
        >
          Перейти на главную страницу
        </Button>
      </Box>
    </Box>
  );
};
