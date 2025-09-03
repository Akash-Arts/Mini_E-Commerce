import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
    Grid,
    Typography,
    Box,
    Button,
    Alert,
    CircularProgress,
    Chip,
    Stack
} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useCart } from '../context/CartContext'

export default function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { addToCart } = useCart()

    useEffect(() => {

        setLoading(true)
        setError('')

        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
                setProduct(res.data)
            } catch (err) {
                setError(err.message || 'Something went wrong')
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress />
            </Box>
        )
    }

    if (error) return <Alert severity="error">{error}</Alert>
    if (!product) return null

    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
                <Box
                    sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                        borderRadius: 2
                    }}
                >
                    <Box
                        component="img"
                        src={product.image}
                        alt={product.title}
                        sx={{ maxHeight: 420, width: '100%', objectFit: 'contain' }}
                    />
                </Box>
            </Grid>
            <Grid size={{ xs: 12, }}>
                <Stack spacing={2}>
                    <Typography variant="h5">{product.title}</Typography>
                    <Chip sx={{ width: { xs: "50%", sm: "25%" } }} label={product.category} variant="outlined" />
                    <Typography variant="h6">${product.price.toFixed(2)}</Typography>
                    <Typography variant="body1" color="text.secondary">
                        {product.description}
                    </Typography>
                    <Button
                        size="large"
                        variant="contained"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={() => addToCart(product)}
                    >
                        Add to cart
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    )
}
