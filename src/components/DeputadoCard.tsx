import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActions } from '@mui/material';
import { DeputadoProp } from '../types';

export default function DeputadoCard(deputado: DeputadoProp) {
  return (
    <Card sx={{ maxWidth: 500, width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ width: 150, margin: 'auto' }}>
          <CardMedia
            component="img"
            image={deputado.urlFoto}
            loading='lazy'
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '350px' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {deputado.nome}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>
              Partido: {deputado.siglaPartido} <br />
              UF: {deputado.siglaUf} <br />
              e-mail: <a href={`mailto:${deputado.email}`}>{deputado.email}</a>
            </Typography>
          </CardContent>
          <CardActions sx={{margin: 'auto auto 0 auto'}}>
            <Button target='_blank' rel="noopener noreferrer" href={`https://www.camara.leg.br/deputados/${deputado.id}`} size="small">Mais Detalhes</Button>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
}