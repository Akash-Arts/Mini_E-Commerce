import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'


export default function SearchBar({ value, onChange }) {
    return (
        <TextField
            fullWidth
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search product"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    )
}