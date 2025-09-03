import React, { createContext, useContext, useState, useMemo } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [items, setItems] = useState([])

    const addToCart = (product) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === product.id)
            if (existing) {
                return prev.map((i) =>
                    i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const increase = (id) =>
        setItems((prev) =>
            prev.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + 1 } : i
            )
        )

    const decrease = (id) =>
        setItems((prev) =>
            prev.map((i) =>
                i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
            )
        )

    const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

    const clear = () => setItems([])

    const totalPrice = useMemo(() =>
        items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items])
    const cartCount = useMemo(
        () => items.reduce((sum, i) => sum + i.quantity, 0),
        [items]
    )

    return (
        <CartContext.Provider
            value={{ items, addToCart, increase, decrease, remove, clear, totalPrice, cartCount }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}
