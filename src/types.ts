export interface Index<T> {
  dados: T[];
  links: Array<{
    rel: string;
    href: string;
  }>;
}

export interface UF {
  cod: string;
  sigla: string;
  nome: string;
  descricao: string;
}

export interface Partido {
  id: string;
  sigla: string;
  nome: string;
  uri: string;
}

export interface Sex {
  value: string;
  label: string;
}

export interface Deputado {
  id: number,
  uri: string,
  nome: string,
  siglaPartido: string,
  uriPartido: string,
  siglaUf: string,
  idLegislatura: number,
  urlFoto: string,
  email: string
}

export interface IndexDeputadoQueryParam {
  field: string;
  value: string
}

export interface FieldProps {
  onChange: (value: string | string[]) => void
}

export interface DeputadoProp {
  id: number;
  nome: string,
  siglaPartido: string,
  siglaUf: string,
  urlFoto: string,
  email: string,
}