<template>
  <footer class="main-footer">
    <div class="container footer-content">
      <div class="footer-info">
        <div class="footer-logo">
          <span class="logo-text">VueShop</span>
        </div>
        <p class="footer-tagline">Your one-stop shop for premium products.</p>
      </div>
      
      <div class="footer-links">
        <div class="link-group">
          <h4>Shop</h4>
          <ul>
            <li><router-link to="/">All Products</router-link></li>
            <li><router-link to="/">New Arrivals</router-link></li>
          </ul>
        </div>
        <div class="link-group">
          <h4>Support</h4>
          <ul>
            <li><router-link to="/">Help Center</router-link></li>
            <li><router-link to="/">Shipping Info</router-link></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 VueShop E-Commerce. All rights reserved.</p>
        <div class="social-links">
          <!-- Simple placeholders for social icons -->
          <span class="social-dot"></span>
          <span class="social-dot"></span>
          <span class="social-dot"></span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.main-footer {
  background-color: var(--bg-card);
  border-top: 1px solid var(--border-color);
  padding: 4rem 0 2rem;
  margin-top: 5rem;
  transition: background-color 0.4s ease, border-color 0.4s ease;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-logo-icon {
  color: var(--primary);
}

.logo-text {
  font-family: var(--font-primary);
  font-weight: 800;
  font-size: 1.5rem;
  background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 50%, var(--primary) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientFlow 4s ease-in-out infinite alternate;
  display: inline-block;
}

.dark-mode .logo-text {
  background: linear-gradient(90deg, var(--school-bus-yellow) 0%, var(--white) 50%, var(--school-bus-yellow) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-tagline {
  color: var(--text-muted);
  max-width: 300px;
  font-size: 0.95rem;
}

.footer-links {
  display: flex;
  gap: 4rem;
}

.link-group h4 {
  font-size: 1rem;
  margin-bottom: 1.25rem;
  color: var(--text-main);
}

.link-group ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.link-group a {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 0.9rem;
  transition: color 0.2s;
}

.link-group a:hover {
  color: var(--primary);
}

.footer-bottom {
  grid-column: 1 / -1;
  border-top: 1px solid var(--border-color);
  padding-top: 2rem;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bottom p {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-dot {
  width: 10px;
  height: 10px;
  background-color: var(--border-color);
  border-radius: 50%;
}

@keyframes gradientFlow {
  0% { background-position: 0% center; }
  100% { background-position: 100% center; }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .footer-info {
    align-items: center;
  }
  
  .footer-links {
    justify-content: center;
    gap: 2rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
