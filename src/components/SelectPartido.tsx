import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, useTheme } from '@mui/material'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import axios from 'axios'
import { FieldProps, Index, Partido } from '../types';

function getStyles(name: string, selectedPartidos: string[], theme: Theme) {
  return {
    fontWeight:
      selectedPartidos.indexOf(name) === -1
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

export default function SelectPartido({ onChange }: FieldProps) {
  const theme = useTheme();
  const [selectedPartidos, setSelectedPartidos] = useState<string[]>([]);
  const [partidos, setPartidos] = useState<Partido[]>([])
  const ready = useRef(false);

  useEffect(() => {
    function getSiglas() {
      axios.get('https://dadosabertos.camara.leg.br/api/v2/partidos?itens=100')
        .then((res: {data: Index<Partido>}) => {
          setPartidos(res.data.dados)
          ready.current = true
        })
    }
    getSiglas();
  }, [])

  useLayoutEffect(() => {
    if (!ready.current) {
      return;
    }
    
    onChange(selectedPartidos)
  }, [selectedPartidos])

  const handleChange = (event: SelectChangeEvent<typeof selectedPartidos>) => {
    const {
      target: { value },
    } = event;
    setSelectedPartidos(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      <FormControl sx={{ width: '100%' }} size='small'>
        <InputLabel id="select-partido-label">Partido</InputLabel>
        <Select
          labelId="select-partido-label"
          id="select-partido"
          multiple
          value={selectedPartidos}
          onChange={handleChange}
          input={<OutlinedInput label="Partido" />}
          MenuProps={MenuProps}
        >
          {partidos.map((partido) => (
            <MenuItem
              key={partido.id}
              value={partido.sigla}
              style={getStyles(partido.sigla, selectedPartidos, theme)}
            >
              {partido.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}
