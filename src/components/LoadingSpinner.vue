<template>
  <div class="product-details__loading">
    <div class="spinner"></div>
    <span>Loading products...</span>
  </div>
</template>

<style scoped>
.product-details__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  .spinner {
    width: 2rem;
    height: 2rem;
    border: 0.25rem solid var(--color-muted);
    border-top: 0.25rem solid var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
