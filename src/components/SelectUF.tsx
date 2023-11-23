import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, useTheme } from '@mui/material'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import axios from 'axios'
import { FieldProps, Index, UF } from '../types';

function getStyles(name: string, selectedSiglasUF: string[], theme: Theme) {
  return {
    fontWeight:
      selectedSiglasUF.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectUF({ onChange }: FieldProps) {
  const theme = useTheme();
  const [selectedSiglasUF, setSelectedSiglasUF] = useState<string[]>([]);
  const [UF, setUF] = useState<UF[]>([])
  const ready = useRef(false);

  useEffect(() => {
    function getSiglas() {
      axios.get('https://dadosabertos.camara.leg.br/api/v2/referencias/deputados/siglaUF')
        .then((res: {data: Index<UF>}) => {
          setUF(res.data.dados)
          ready.current = true
        })
    }
    getSiglas();
  }, [])

  useLayoutEffect(() => {
    if (!ready.current) {
      return;
    }

    onChange(selectedSiglasUF)
  }, [selectedSiglasUF])

  const handleChange = (event: SelectChangeEvent<typeof selectedSiglasUF>) => {
    const {
      target: { value },
    } = event;
    setSelectedSiglasUF(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      <FormControl sx={{ width: '100%' }} size='small'>
        <InputLabel id="select-siglauf-label">UF</InputLabel>
        <Select
          labelId="select-siglauf-label"
          id="select-siglauf"
          multiple
          value={selectedSiglasUF}
          onChange={handleChange}
          input={<OutlinedInput label="UF" />}
          MenuProps={MenuProps}
        >
          {UF.map((uf) => (
            <MenuItem
              key={uf.cod}
              value={uf.sigla}
              style={getStyles(uf.sigla, selectedSiglasUF, theme)}
            >
              {uf.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}
