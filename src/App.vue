<template>
  <div class="root">
    <div class="header">
      <div class="student">Imię Nazwisko</div>
      <div>ile różnych produktów: {{ distinctProductCount }}</div>
      <div>ile wszystkich produktów: {{ productTotalCount }}</div>
      <div>cena wszystkich produktów: {{ productTotalPrice | currency }}</div>
    </div>

    <!-- tabela -->
    <table class="table table-sm table-bordered table-striped text-left">
      <tr>
        <th
          v-for="columnName in getColumns()"
          :key="columnName"
          @click="changeSortingColumn(columnName)"
        >
          {{ appendSortingIndicator(columnName) }}
        </th>
      </tr>
      <tbody>
        <tr v-for="p in getProducts()" :key="p.id">
          <td>
            <div v-bind="cellAttributes(p)">{{ p.id }}</div>
          </td>
          <td>
            <div v-bind="cellAttributes(p)">{{ p.name }}</div>
          </td>
          <td>
            <div v-bind="cellAttributes(p)">{{ p.price | currency }}</div>
          </td>
          <td>
            <div v-bind="cellAttributes(p)">{{ p.color }}</div>
          </td>
          <td>
            <div v-bind="cellAttributes(p)">{{ p.count | nullCount }}</div>
          </td>
          <td>
            <button
              v-bind="cellAttributes(p)"
              @click="changeProductCount(p.id, 1)"
            >
              +
            </button>
            <button
              v-bind="cellAttributes(p)"
              @click="changeProductCount(p.id, -1)"
            >
              -
            </button>
            <button v-bind="cellAttributes(p)" @click="resetProductCount(p.id)">
              0
            </button>
            <button v-bind="cellAttributes(p)" @click="deleteProduct(p.id)">
              usuń
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- paginacja -->
    <div class="pagination-wrapper">
      <button
        v-for="i in pageCount"
        :class="getPageButtonClass(i)"
        :key="i"
        @click="onPageSelect(i - 1)"
      >
        {{ i }}
      </button>
    </div>

    <br />
    <br />

    <!-- przyciski dolne -->
    <div class="bottom-buttons-wrapper">
      <div>
        <button class="btn btn-primary" @click="addRandomProduct">
          Dodaj losowy produkt
        </button>
      </div>
      <div>
        <button @click="toggleFilteringProducts" :class="getFilterBtnClass">
          Filtruj wybrane produkty
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "App",
  data: () => ({
    newId: 15,
    products: [
      { id: 1, name: "Kajak", price: 234, color: "red", count: 0 },
      { id: 2, name: "Kamizelka", price: 4999, color: "pink", count: 0 },
      { id: 3, name: "Piłka", price: 194.9, color: "purple", count: 0 },
      { id: 4, name: "A", price: 100, color: "red", count: 0 },
      { id: 5, name: "B", price: 200, color: "pink", count: 0 },
      { id: 6, name: "C", price: 300, color: "purple", count: 0 },
      { id: 7, name: "D", price: 400, color: "pink", count: 0 },
      { id: 8, name: "E", price: 500, color: "red", count: 0 },
      { id: 9, name: "F", price: 600, color: "pink", count: 0 },
      { id: 10, name: "G", price: 700, color: "purple", count: 0 },
      { id: 11, name: "H", price: 800, color: "red", count: 0 },
      { id: 12, name: "I", price: 900, color: "pink", count: 0 },
      { id: 13, name: "J", price: 1000, color: "purple", count: 0 },
      { id: 14, name: "K", price: 1100, color: "red", count: 0 },
    ],
    activePage: 0,
    productsPerPage: 5,
    showOnlyBasket: false,
    sortBy: "ID",
    descendedSort: false,
  }),
  computed: {
    distinctProductCount() {
      return this.products.filter((p) => p.count > 0).length;
    },
    productTotalCount() {
      return this.products.reduce((acc, p) => {
        return acc + p.count;
      }, 0);
    },
    productTotalPrice() {
      return this.products.reduce((acc, p) => {
        return acc + p.price * p.count;
      }, 0);
    },
    pageCount() {
      return Math.ceil(this.products.length / this.productsPerPage);
    },
    getFilterBtnClass() {
      return this.showOnlyBasket ? "btn btn-secondary" : "btn btn-primary";
    },
  },
  methods: {
    getPageButtonClass(pageNumber) {
      return pageNumber - 1 === this.activePage
        ? "btn btn-secondary"
        : "btn btn-primary";
    },
    changeSortingColumn(columnName) {
      if (this.sortBy === columnName) {
        this.descendedSort = !this.descendedSort;
      } else {
        this.sortBy = columnName;
        this.descendedSort = false;
      }
    },
    appendSortingIndicator(columnName) {
      if (this.sortBy === columnName) {
        return columnName + " " + (this.descendedSort ? "▼" : "▲");
      } else return columnName;
    },
    getColumns() {
      return ["ID", "Nazwa", "Cena", "Kolor", "Ilość"];
    },

    cellAttributes(product) {
      return {
        style: {
          backgroundColor: product.color,
          color: "white",
          textAlign: "center",
          borderRadius: "4px",
        },
      };
    },

    addRandomProduct() {
      this.products.push({
        id: this.newId,
        name: Math.random().toString(36).substring(2, 16),
        price:
          parseInt(
            Math.random()
              .toString(10)
              .substring(2, 7 + (Math.random() % 4))
          ) / 100,
        color: `#${Math.random().toString(10).substring(2, 8)}`,
        count: 0,
      });
      this.activePage =
        Math.ceil(this.products.length / this.productsPerPage) - 1;
      this.newId++;
    },

    toggleFilteringProducts() {
      this.showOnlyBasket = !this.showOnlyBasket;
    },

    getProducts() {
      return this.products
        .filter((p) => {
          if (this.showOnlyBasket) return p.count > 0;
          return true;
        })
        .sort((lhs, rhs) => {
          let propName = "id";

          switch (this.sortBy) {
            case "ID":
              propName = "id";
              break;
            case "Nazwa":
              propName = "name";
              break;
            case "Cena":
              propName = "price";
              break;
            case "Kolor":
              propName = "color";
              break;
            case "Ilość":
              propName = "count";
              break;
          }

          const result = lhs[propName] > rhs[propName] ? 1 : -1;
          return result * (this.descendedSort ? -1 : 1);
        })
        .slice(
          this.activePage * this.productsPerPage,
          (this.activePage + 1) * this.productsPerPage
        );
    },

    onPageSelect(pageIndex) {
      this.activePage = pageIndex;
    },

    changeProductCount(productId, amount) {
      const index = this.products.findIndex((p) => p.id === productId);
      const product = this.products[index];
      Vue.set(this.products, index, {
        ...product,
        count: Math.max(0, product.count + amount),
      });
    },

    resetProductCount(productId) {
      const index = this.products.findIndex((p) => p.id === productId);
      const product = this.products[index];
      Vue.set(this.products, index, {
        ...product,
        count: 0,
      });
    },

    deleteProduct(productId) {
      this.products.splice(
        this.products.findIndex((p) => productId === p.id),
        1
      );
    },
  },
  filters: {
    currency(value) {
      return new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: "PLN",
      }).format(value);
    },
    nullCount(value) {
      return value ? value : "brak";
    },
  },
};
</script>

<style scoped>
th {
  cursor: pointer;
}

.bottom-buttons-wrapper {
  display: flex;
  justify-content: space-evenly;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
}

.pagination-wrapper > button {
  margin: 0.1rem;
}

.root {
  max-width: 960px;
  width: 100%;
  padding: 1rem;
  margin: 0 auto;
}

.header {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.student {
  background-color: #2288ee;
  color: white;
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 2rem;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>