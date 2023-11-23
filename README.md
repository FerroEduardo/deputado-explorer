<div align="center">

# Deputado Explorer


[![lint-check](https://github.com/FerroEduardo/deputado-explorer/actions/workflows/lint.yaml/badge.svg)](https://github.com/FerroEduardo/deputado-explorer/actions/workflows/lint.yaml)
[![deploy-gh-pages](https://github.com/FerroEduardo/deputado-explorer/actions/workflows/deploy-gh-pages.yaml/badge.svg)](https://github.com/FerroEduardo/deputado-explorer/actions/workflows/deploy-gh-pages.yaml)

</div>

O **Deputado Explorer** é um projeto desenvolvido em [React v18](https://react.dev/) com [Vite](https://vitejs.dev/), sem o uso de frameworks, e utiliza a biblioteca de componentes [MUI](https://mui.com/) para simplificar o desenvolvimento da interface. Este projeto tem como objetivo explorar e visualizar dados fornecidos pela API da Câmara de Deputados, que disponibiliza informações detalhadas sobre deputados, suas despesas, eventos da câmara, partidos e muito mais.

![demo](demo.gif)

## Funcionalidades

- **Lista de Deputados:** Explore a lista completa de deputados, com informações detalhadas sobre cada um.

## Instalação

- Clone este repositório: `git clone https://github.com/FerroEduardo/deputado-explorer`
- Instale as dependências: `npm ci`
- Inicie o projeto: `npm run dev`
- Acesse o projeto no navegador: [http://localhost:5173/](http://localhost:5173/)

## Observações

O projeto pode ser acessado pelo [GitHub Pages](https://ferroeduardo.github.io/deputado-explorer/), mas, por limitação da API da Câmara de Deputados, só é possível fazer a busca dos dados quando o projeto é executado localmente (CORS não configurado na API).