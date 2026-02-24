<script setup>
import IconShop from '@/components/icons/IconShop.vue'
</script>

<template>
  <footer class="main-footer">
    <div class="container footer-content">
      <div class="footer-info">
        <div class="footer-logo">
          <IconShop class="footer-logo-icon" />
          <span class="logo-text">VueShop</span>
        </div>
        <p class="footer-tagline">Building modern e-commerce experiences with Vue 3.</p>
        <div class="project-details">
          <span class="badge">7-Day Vue Mastery</span>
          <p class="about-text">
            This project is a <strong>learning-by-doing</strong> practice part of my 7-day intensive Vue mastery journey. 
            Focused on building a robust, real-world e-commerce application using the latest Vue ecosystem.
          </p>
        </div>
      </div>
      
      <div class="footer-links">
        <div class="link-group">
          <h4>Explore</h4>
          <ul>
            <li><router-link to="/">Collections</router-link></li>
            <li><router-link to="/cart">My Bag</router-link></li>
            <li><router-link to="/login">Account</router-link></li>
          </ul>
        </div>
        <div class="link-group">
          <h4>Tech Stack</h4>
          <ul>
            <li><a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3 (Composition API)</a></li>
            <li><a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia State Management</a></li>
            <li><a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a></li>
            <li><a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-cta">
        <h4>Stay Connected</h4>
        <p>Check out the open-source code and follow the journey on GitHub.</p>
        <a href="https://github.com/imanatsaqif/vue-7-day-mastery/tree/main/vue-ecommerce" target="_blank" rel="noopener" class="github-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          View Repository
        </a>
      </div>
      
      <div class="footer-bottom">
        <div class="author-credits">
          <p>Developed by <strong>Imana Tsaqif</strong></p>
        </div>
        <p class="copyright">&copy; 2026 VueShop E-Commerce. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.main-footer {
  background-color: var(--bg-card);
  border-top: 1px solid var(--border-color);
  padding: 5rem 0 3rem;
  margin-top: 6rem;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

/* Subtle background accent */
.main-footer::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
  opacity: 0.03;
  pointer-events: none;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 4rem;
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-logo-icon {
  width: 32px;
  height: 32px;
  color: var(--primary);
}

.logo-text {
  font-family: var(--font-primary);
  font-weight: 800;
  font-size: 1.75rem;
  background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 50%, var(--primary) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: gradientFlow 4s ease-in-out infinite alternate;
  display: inline-block;
  vertical-align: middle;
}

.dark-mode .logo-text {
  background-image: linear-gradient(90deg, var(--school-bus-yellow) 0%, var(--gold) 50%, var(--school-bus-yellow) 100%);
}

.footer-tagline {
  color: var(--text-main);
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: rgba(var(--primary-rgb, 0, 53, 102), 0.1);
  color: var(--primary);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  border: 1px solid rgba(var(--primary-rgb, 0, 53, 102), 0.1);
}

.dark-mode .badge {
  background-color: rgba(255, 195, 0, 0.1);
  color: var(--school-bus-yellow);
  border-color: rgba(255, 195, 0, 0.2);
}

.about-text {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 400px;
}

.footer-links {
  display: flex;
  gap: 3rem;
}

.link-group h4, .footer-cta h4 {
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--text-main);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.link-group ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.link-group a {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.link-group a:hover {
  color: var(--primary);
  padding-left: 5px;
}

.footer-cta p {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--primary);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--shadow);
}

.dark-mode .github-link {
  background-color: var(--school-bus-yellow);
  color: var(--ink-black);
}

.github-link:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  filter: brightness(1.1);
}

.footer-bottom {
  grid-column: 1 / -1;
  border-top: 1px solid var(--border-color);
  padding-top: 2rem;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author-credits p {
  font-size: 1rem;
  color: var(--text-main);
  margin: 0;
}

.author-credits strong {
  color: var(--primary);
  font-weight: 800;
}

.copyright {
  font-size: 0.85rem;
  color: var(--text-muted);
}

@keyframes gradientFlow {
  0% { background-position: 0% center; }
  100% { background-position: 100% center; }
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
  .footer-cta {
    grid-column: span 2;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2.5rem;
  }
  
  .footer-info, .footer-links, .footer-cta {
    align-items: center;
    grid-column: span 1;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 2rem;
  }
  
  .about-text {
    max-width: none;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>
