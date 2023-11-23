import './App.css'
import ListDeputados from './components/ListDeputados'
import { Container } from '@mui/material'

function App() {

  return (
    <>
      <Container maxWidth="lg">
        <h1>Busca de deputados</h1>
        <p>Observação: o sistema fornecido pelo pela Câmara dos Deputados é inconsistente e nem sempre retorna todos os dados solicitados</p>
        <ListDeputados />
      </Container>
    </>
  )
}

export default App
