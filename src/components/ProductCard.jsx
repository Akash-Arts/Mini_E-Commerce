import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Stack, Button } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'


export default function ProductCard({ product }) {
    const navigate = useNavigate()
    const { addToCart } = useCart()


    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea onClick={() => navigate(`/product/${product.id}`)} sx={{ flexGrow: 1 }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 220 }}>
                    <CardMedia component="img" image={product.image} alt={product.title} sx={{ maxHeight: 180, width: 'auto' , maxWidth:200, objectFit: 'contain' }} />
                </Box>
                <CardContent>
                    <Typography variant="subtitle1" noWrap title={product.title}>{product.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{product.category}</Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>${product.price.toFixed(2)}</Typography>
                </CardContent>
            </CardActionArea>
            <Box sx={{ p: 2, pt: 0 }}>
                <Button fullWidth variant="contained" startIcon={<AddShoppingCartIcon />} onClick={() => { addToCart(product, 1) }}>
                    Add to Cart
                </Button>
            </Box>
        </Card>
    )
}