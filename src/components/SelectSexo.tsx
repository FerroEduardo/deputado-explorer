import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, useTheme } from '@mui/material'
import { useState } from 'react'
import { FieldProps } from '../types';

function getStyles(name: string, selectedSex: string, theme: Theme) {
  return {
    fontWeight:
      selectedSex === name
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const sexes = [
  {
    value: '',
    label: 'Ambos'
  },
  {
    value: 'M',
    label: 'Masculino'
  },
  {
    value: 'F',
    label: 'Feminino'
  }
];

export default function SelectSex({ onChange }: FieldProps) {
  const theme = useTheme();
  const [selectedSex, setSelectedSex] = useState<string>('');

  const handleChange = (event: SelectChangeEvent<typeof selectedSex>) => {
    const {
      target: { value },
    } = event;
    onChange(value)
    setSelectedSex(value);
  };

  return (
    <>
      <FormControl sx={{ width: '100%' }} size='small'>
        <InputLabel id="select-sex-label">Sexo</InputLabel>
        <Select
          labelId="select-sex-label"
          id="select-sex"
          value={selectedSex}
          onChange={handleChange}
          input={<OutlinedInput label="Sexo" />}
        >
          {sexes.map((sex) => (
            <MenuItem
              key={sex.value}
              value={sex.value}
              style={getStyles(sex.value, selectedSex, theme)}
            >
              {sex.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}
