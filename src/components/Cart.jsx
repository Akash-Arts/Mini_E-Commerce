import React from 'react'
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    Button,
    Stack
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'
import { useCart } from '../context/CartContext'

export default function Cart({ open, onClose }) {
    const { items, increase, decrease, remove, totalPrice, clear } = useCart()

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{ sx: { width: { xs: '100%', sm: 420, md: 450 } } }}
        >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Your Cart
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />

            
            <List sx={{ ml: 2, flex: 1, overflowY: 'auto' }}>
                {items.length === 0 && (
                    <Typography variant="body1" sx={{ p: 2 }}>
                        Your cart is empty.
                    </Typography>
                )}

                {items?.map((item) => (
                    <ListItem key={item.id} disableGutters sx={{ py: 1 }}>
                        <ListItemAvatar>
                            <Avatar
                                variant="rounded"
                                src={item.image}
                                alt={item.title}
                                sx={{ width: 60, height: 70, mr: 1 }}
                            />
                        </ListItemAvatar>

                        <Box
                            sx={{
                                mt: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                flexGrow: 1,
                                minWidth: 0
                            }}
                        >
                            <Typography variant="subtitle2" sx={{ fontsize: { xs: 16, md: 18 } }} >
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                ${item.price.toFixed(2)} × {item.quantity} = $
                                {(item.price * item.quantity).toFixed(2)}
                            </Typography>


                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <IconButton size="small" onClick={() => decrease(item.id)}>
                                    <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography>{item.quantity}</Typography>
                                <IconButton size="small" onClick={() => increase(item.id)}>
                                    <AddIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => remove(item.id)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Stack>
                        </Box>
                    </ListItem>
                ))}
            </List>


            <Divider />


            <Box sx={{ p: 2 }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ mb: 2 }}
                    gap={1}
                    justifyContent="end "
                >
                    <Typography variant="subtitle1">Total :</Typography>
                    <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Button fullWidth variant="outlined" onClick={clear}>
                        Clear
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        disabled={items.length === 0}
                    >
                        Checkout
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    )
}
