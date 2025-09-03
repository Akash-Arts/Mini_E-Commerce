import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import {
    Grid,
    Alert,
    CircularProgress,
    Box,
    Stack,
} from '@mui/material'

import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'

export default function ProductList() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('all')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        let active = true
        setLoading(true)
        setError('')

        const fetchData = async () => {
            try {
                const [pRes, cRes] = await Promise.all([
                    axios.get('https://fakestoreapi.com/products'),
                    axios.get('https://fakestoreapi.com/products/categories')
                ])
                if (!active) return
                setProducts(pRes.data)
                setCategories(cRes.data)
            } catch (err) {
                setError(err.message || 'Something went wrong')
            } finally {
                if (active) setLoading(false)
            }
        }

        fetchData()
        return () => {
            active = false
        }
    }, [])

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        return products.filter((p) => {
            const matchesQuery = q === '' || p.title.toLowerCase().includes(q)
            const matchesCategory = category === 'all' || p.category === category
            return matchesQuery && matchesCategory
        })
    }, [products, query, category])

    return (
        <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <SearchBar value={query} onChange={setQuery} />
                <FilterBar categories={categories} value={category} onChange={setCategory} />
            </Stack>

            {/* Loading */}
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && filtered.length === 0 && (
                <Alert severity="info">No products found</Alert>
            )}

            {!loading && !error && filtered.length > 0 && (
                <Grid container spacing={2}>
                    {filtered.map((product) => (
                        <Grid
                            key={product.id}
                            size={{ xs: 12, sm: 4, md: 3 }}
                        >
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Stack>
    )
}
