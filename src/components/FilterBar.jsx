import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'


export default function FilterBar({ categories, value, onChange }) {
    return (
        <FormControl fullWidth>
            <InputLabel id="cat-label">Category</InputLabel>
            <Select
                labelId="cat-label"
                label="Category"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <MenuItem value="all">All</MenuItem>
                {categories.map((c) => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}