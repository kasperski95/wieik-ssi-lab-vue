<template>
  <div class="bg-primary text-white text-center m-2 p-3">
    <h3>Produkt: {{ nazwa | wielka | odwroc | globalnyFilter }}</h3>
    <h3>Cena A: {{ nizszaCalkowitaCena.toFixed(2) }} PLN</h3>
    <h3>Cena B: {{ wyzszaCalkowitaCena.toFixed(2) }} PLN</h3>
    <h3>Cena A: {{ obliczCalkowitaCena(nizszyPodatek).toFixed(2) }} PLN</h3>
    <h3>Cena B: {{ obliczCalkowitaCena(wyzszyPodatek).toFixed(2) }} PLN</h3>
    <h3>Cena B: {{ obliczCalkowitaCena(wyzszyPodatek) | waluta }}</h3>
    <h3>Cena B: {{ obliczCalkowitaCena(wyzszyPodatek) | waluta(3) }}</h3>
  </div>
</template>

<script>
export default {
  name: "MojKomponent",
  data: () => ({
    nazwa: "laptop",
    cena: 1990,
    nizszyPodatek: 15,
    wyzszyPodatek: 23,
  }),
  computed: {
    nizszaCalkowitaCena() {
      return this.obliczCalkowitaCena(this.nizszyPodatek);
    },
    wyzszaCalkowitaCena() {
      return this.obliczCalkowitaCena(this.wyzszyPodatek);
    },
  },
  methods: {
    obliczCalkowitaCena(podatek) {
      return this.cena + this.cena * (podatek / 100);
    },
  },
  filters: {
    waluta(wartosc, precyzja) {
      return new Intl.NumberFormat("pl-PL", {
        style: "currency",
        minimumFractionDigits: precyzja,
        maximumFractionDigits: precyzja,
        currency: "PLN",
      }).format(wartosc);
    },
    wielka(wartosc) {
      return wartosc[0].toUpperCase() + wartosc.slice(1);
    },
    odwroc(wartosc) {
      return wartosc.split("").reverse().join("");
    },
  },
};
</script>