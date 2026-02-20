import { defineStore } from 'pinia'
import { loginApi } from '@/api/auth'
import { getUsersApi, addUserApi } from '@/api/users'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    users: [],
  }),

  actions: {
    async fetchUsers() {
      try {
        const data = await getUsersApi()
        this.users = data.slice(0, 4) 
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },

    async login(username, password) {
      try {
        const localUser = this.users.find(u => u.username === username)
        
        try {
          const data = await loginApi(username, password)
          this.token = data.token
          localStorage.setItem('token', data.token)
          
          if (localUser) {
            this.user = localUser
            localStorage.setItem('user', JSON.stringify(localUser))
          }
          return true
        } catch (apiError) {
          if (localUser && localUser.password === password) {
            const mockToken = `mock-token-${Date.now()}`
            this.token = mockToken
            this.user = localUser
            localStorage.setItem('token', mockToken)
            localStorage.setItem('user', JSON.stringify(localUser))
            return true
          }
          throw apiError
        }
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },

    async addUser(userData) {
      try {
        const newUser = await addUserApi(userData)
        
        const userWithDetails = { ...userData, id: newUser.id }
        this.users.push(userWithDetails)
        
        return userWithDetails
      } catch (error) {
        console.error('Error adding user:', error)
        return null
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
  }
})
