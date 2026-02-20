import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  actions: {
    addItem(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    incrementItem(id) {
      const item = this.items.find(item => item.id === id)
      if (item) item.quantity++
    },
    decrementItem(id) {
      const item = this.items.find(item => item.id === id)
      if (item) {
        if (item.quantity > 1) {
          item.quantity--
        } else {
          this.removeItem(id)
        }
      }
    },
    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id)
    },
    clearCart() {
        this.items = []
    }
  },

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }
})
