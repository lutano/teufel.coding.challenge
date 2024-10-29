<script setup lang="ts">
import { ref, computed } from "vue";
import { ProductList } from "../types/ProductTypes";
import productData from "../data/bikiniberlin.json";

const products = productData as ProductList;
const selectedId = ref("001");

const selectedProduct = computed(() => products[selectedId.value]);

const selectProduct = (id: string) => {
  selectedId.value = id;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(price / 100);
};

const productName = "BOOMSTER Go";

const getProductImageUrl = (imageUrl: string) => {
  const imageDomain =
    "https://cdn.teufelaudio.com/image/upload/c_fill,f_auto,h_200,q_auto,w_300";

  return new URL(imageUrl, imageDomain).toString();
};
</script>

<template>
  <div class="product-details">
    <img
      :src="getProductImageUrl(selectedProduct.imageUrl)"
      :alt="selectedProduct.productVariant"
      class="product-details__image"
    />
    <h1 class="product-details__name">{{ productName }}</h1>
    <span class="price product-details__price">
      {{ formatPrice(selectedProduct.productPrice) }}</span
    >
    <div class="product-details__colors">
      <button
        v-for="(product, id) in products"
        :key="id"
        :class="['color-swatch', { active: id === selectedId }]"
        :style="{ backgroundColor: product.productColour }"
        :aria-label="`Select ${product.productVariant}`"
        @click="selectProduct(String(id))"
      />
    </div>
    <button class="button" :disabled="!selectedProduct.inStock">
      {{ selectedProduct.inStock ? "Buy now" : "Out of stock" }}
    </button>
  </div>
</template>

<style scoped>
.product-details {
  max-width: 18.75rem;
  padding: 1.25rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-details__image {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

.product-details__name {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
  text-align: center;
}

.product-details__price {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.product-details__colors {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.color-swatch {
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0;
}

.color-swatch:hover {
  border-color: #000;
}

.button {
  width: 100%;
  padding: 0.75rem;
  background-color: #008744;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
}

.button:hover {
  background-color: #006633;
}

.button:disabled {
  background-color: #808080;
  color: #fafafa;
  border: 1px solid #666666;
}
</style>
