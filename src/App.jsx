import React, { useMemo, useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import {
  AppBar, Toolbar, Typography, IconButton, Badge, Container, Box
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { CartProvider, useCart } from './context/CartContext'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import Cart from './components/Cart'


function AppShell() {
  const { cartCount } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const location = useLocation()


  const title = useMemo(() => (
    location.pathname.startsWith('/product/') ? 'Product Details' : 'Mini Store'
  ), [location.pathname])


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" color="primary" enableColorOnDark>
        <Toolbar>
          <StorefrontIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component={Link} to="/" color="inherit" sx={{ textDecoration: 'none', flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton color="inherit" onClick={() => setCartOpen(true)} aria-label="Open cart">
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>


      <Container sx={{ py: 3, flex: 1 }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Container>


      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
    </Box>
  )
}


export default function App() {
  return (
    <CartProvider>
      <AppShell />
    </CartProvider>
  )
}