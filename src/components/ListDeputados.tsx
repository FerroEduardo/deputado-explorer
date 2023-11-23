
import SelectUF from './SelectUF'
import SelectPartido from './SelectPartido'
import SelectSex from './SelectSexo'
import { useLayoutEffect, useState } from 'react'
import { Deputado, Index, IndexDeputadoQueryParam } from '../types'
import axios from 'axios'
import DeputadoCard from './DeputadoCard'
import Grid from '@mui/material/Unstable_Grid2';
import { Pagination } from '@mui/material'
import DeputadoCardSkeleton from './DeputadoCardSkeleton'

function ListDeputados() {
  const [queryParams, setQueryParam] = useState<IndexDeputadoQueryParam[]>([
    {
      field: 'ordem',
      value: 'ASC'
    },
    {
      field: 'ordenarPor',
      value: 'nome'
    },
    {
      field: 'itens',
      value: '18'
    }
  ])
  const [deputados, setDeputados] = useState<Deputado[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useLayoutEffect(() => {
    const q = [...queryParams]
    q.push({ field: 'pagina', value: currentPage.toString() })

    const params = q.filter((queryParam) => queryParam.value)
      .map((queryParam) => `${queryParam.field}=${queryParam.value}`)
      .join('&')

    setDeputados([])
    setIsLoading(true)
    axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados?${params}`)
      .then((res: { data: Index<Deputado> }) => {
        setIsLoading(false)
        setDeputados(res.data.dados)

        const lastLink = res.data.links.find((link) => link.rel === 'last')
        const lastLinkQueryParameters = new URLSearchParams(lastLink?.href.split('?')[1])
        const lastPage = parseInt(lastLinkQueryParameters.get('pagina')!)
        setPageCount(lastPage)
      })
  }, [currentPage, queryParams])

  function handleFieldChange(field: string, value: string | string[]) {
    setCurrentPage(1)
    const parsedValue = typeof value === 'string' ? value : value.join(',')
    const newQueryParams = [...queryParams];
    const queryParam = newQueryParams.find((queryParam) => queryParam.field === field)
    if (queryParam) {
      queryParam.value = parsedValue
      setQueryParam(newQueryParams)
    } else {
      setQueryParam([
        ...newQueryParams,
        {
          field: field,
          value: parsedValue
        }
      ])
    }
  }

  return (
    <>
      <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center">
        <Grid lg={4} md={6} xs={12}>
          <SelectUF onChange={(value) => handleFieldChange('siglaUf', value)} />
        </Grid>
        <Grid lg={4} md={6} xs={12}>
          <SelectPartido onChange={(value) => handleFieldChange('siglaPartido', value)} />
        </Grid>
        <Grid lg={4} md={12} xs={12}>
          <SelectSex onChange={(value) => handleFieldChange('siglaSexo', value)} />
        </Grid>
        <Grid xs={12}>
          <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center">
            {isLoading && (
              [...Array(6)].map((e) => <Grid key={e}><DeputadoCardSkeleton /></Grid>)
            )}
            {!isLoading && deputados.length === 0 && <p>Nenhum deputado encontrado</p>}
            {deputados.map((deputado) => (
              <Grid key={deputado.id}>
                <DeputadoCard
                  id={deputado.id}
                  email={deputado.email}
                  nome={deputado.nome}
                  siglaPartido={deputado.siglaPartido}
                  siglaUf={deputado.siglaUf}
                  urlFoto={deputado.urlFoto}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid>
          <Pagination count={pageCount} page={currentPage} onChange={(_, value) => setCurrentPage(value)} />
        </Grid>
      </Grid>
    </>
  )
}

export default ListDeputados
