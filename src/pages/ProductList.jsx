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

    // categories list (derived from products or hardcoded)
    const categories = useMemo(() => {
        const unique = [...new Set(products.map(p => p.category))]
        return ['all', ...unique]
    }, [products])

    useEffect(() => {
        let active = true
        setLoading(true)
        setError('')

        const fetchData = async () => {
            try {
                const res = await axios.get('https://fakestoreapi.com/productsss')
                if (!active) return
                setProducts(res.data)
            } catch (err) {
                if (!active) return
                if (err.response) {
                    // Server responded with error status
                    if (err.response.status === 404) {
                        setError('Products not found.')
                    } else if (err.response.status === 401) {
                        setError('Unauthorized. Please log in.')
                    } else {
                        setError('Unable to load products. Please try again later.')
                    }
                } else if (err.request) {
                    // No response received
                    setError('Network error. Please check your connection.')
                } else {
                    // Something else went wrong
                    setError('An unexpected error occurred.')
                }
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

            {/* Error */}
            {error && (
                <Box component='p' sx={{ display: 'flex', justifyContent: 'center', py: 6, fontSize: { xs: 16, md: 20 } }}>
                    {error}
                </Box>
            )}
            {/* No products */}
            {!loading && !error && filtered.length === 0 && (
                <Box component='p' sx={{ display: 'flex', justifyContent: 'center', py: 6, fontSize: { xs: 16, md: 20 } }}>
                    No products found
                </Box>
            )}

            {/* Product grid */}
            {!loading && !error && filtered.length > 0 && (
                <Grid container spacing={2}>
                    {filtered.map((product) => (
                        <Grid
                            key={`${product.id}-${product.title}`}
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
