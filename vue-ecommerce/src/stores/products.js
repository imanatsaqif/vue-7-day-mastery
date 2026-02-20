import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAllProducts, getProductById } from '@/api/products'

export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const currentProduct = ref(null)
  const loading = ref(false)
  const error = ref('')

  const fetchProducts = async () => {
    if (products.value.length > 0) return

    loading.value = true
    error.value = ''
    try {
      const data = await getAllProducts()
      products.value = data
      // Extract unique categories from products
      categories.value = [...new Set(data.map(p => p.category))]
    } catch (err) {
      error.value = 'Failed to load products. Please try again.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const fetchProductById = async (id) => {
    loading.value = true
    error.value = ''
    currentProduct.value = null 
    
    try {
      const existing = products.value.find(p => p.id == id)
      if (existing) {
        currentProduct.value = existing
      } else {
        currentProduct.value = await getProductById(id)
      }
    } catch (err) {
      error.value = 'Failed to load product details.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    categories,
    currentProduct,
    loading,
    error,
    fetchProducts,
    fetchProductById
  }
})
