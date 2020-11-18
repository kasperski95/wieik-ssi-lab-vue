<template>
  <div class="text-center p-3">
    <h1 class="bg-secondary text-white p-3">
      {{ komunikat }}
    </h1>
    <button class="btn btn-secondary" v-on:click="przechwycKlikniecie">
      Kliknij mnie
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    licznik: 0,
  }),
  methods: {
    przechwycKlikniecie() {
      this.licznik++;
    },
  },
  computed: {
    komunikat() {
      return this.licznik == 0
        ? "Przycisk nie został kliknięty"
        : `Liczba kliknięć: ${this.licznik}`;
    },
  },
};
</script>