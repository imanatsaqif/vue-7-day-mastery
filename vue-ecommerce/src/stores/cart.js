import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  actions: {
    addItem(product) {
      this.items.push(product)
    },
    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id)
    }
  },

  getters: {
    totalItems: (state) => state.items.length,
    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + item.price, 0)
  }
})