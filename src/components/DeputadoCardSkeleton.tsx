import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Skeleton } from '@mui/material';

export default function DeputadoCardSkeleton() {
  return (
    <Card sx={{ maxWidth: 500, width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ width: 150, margin: 'auto' }}>
          <Skeleton variant="rectangular" width={150} height={200} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '350px' }}>
          <CardContent>
            <Skeleton width={200} />
            <Skeleton width={100} />
            <Skeleton width={50} />
            <Skeleton width={250} />
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
}