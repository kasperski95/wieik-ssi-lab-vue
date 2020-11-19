<template>
  <div class="container-fluid text-center">
    <div class="bg-primary text-white text-center m-2 p-3">
      <h4>Produkt: {{ nazwa | wielka | odwroc | globalnyFilter }}</h4>
      <h4>Cena A: {{ nizszaCalkowitaCena.toFixed(2) }} PLN</h4>
      <h4>Cena B: {{ wyzszaCalkowitaCena.toFixed(2) }} PLN</h4>
      <h4>Cena A: {{ obliczCalkowitaCena(nizszyPodatek).toFixed(2) }} PLN</h4>
      <h4>Cena B: {{ obliczCalkowitaCena(wyzszyPodatek).toFixed(2) }} PLN</h4>
      <h4>Cena B: {{ obliczCalkowitaCena(wyzszyPodatek) | waluta }}</h4>
      <h4>Cena B: {{ obliczCalkowitaCena(wyzszyPodatek) | waluta(3) }}</h4>

      <h4>Produkt: <span v-text="fragment"></span></h4>
      <span v-html="fragment" />
      <h4 v-if="pokazElementy">Cena (v-if): {{ cena }} PLN</h4>
    </div>
    <div class="bg-primary text-white text-center m-2 p-3">
      <ul class="text-left">
        <template v-if="pokazElementy">
          <li>Pierwszy element listy</li>
          <li>Drugi element listy</li>
        </template>
      </ul>
      <h3 v-if="pokazElementy">Produkt: {{ nazwa }}</h3>
      <h3 v-if="!pokazElementy">Cena: {{ cena }}</h3>
      <h3 v-if="pokazElementy">Produkt: {{ nazwa }}</h3>
      <h3 v-else>Cena: {{ cena }}</h3>
    </div>

    <div class="bg-primary text-white text-center m-2 p-3">
      <h2 v-if="pokazElementy">Produkt: {{ nazwa }}</h2>
      <h2 v-if="!pokazElementy">Cena: {{ cena }}</h2>
    </div>
    <div class="bg-primary text-white text-center m-2 p-3">
      <h2 v-show="pokazElementy">Produkt: {{ nazwa }}</h2>
      <h2 v-show="!pokazElementy">Cena: {{ cena }}</h2>
    </div>

    <button class="btn btn-primary" v-on:click="przechwycKlikniecie">
      Kliknij mnie
    </button>

    <h3 v-if="licznik % 3 === 0">Produkt: {{ nazwa }}</h3>
    <h3 v-else-if="licznik % 3 === 1">Cena: {{ nazwa }}</h3>
    <h3 v-else>Kategoria: {{ kategoria }}</h3>
    <button class="btn btn-primary" v-on:click="przechwycKlikniecieShow">
      Albo Kliknij mnie
    </button>

    <div class="bg-primary text-white text-center m-2 p-3">
      <h2 v-bind:class="klasyElementu">Produkt: {{ nazwa }}</h2>
      <h2 :class="klasyElementu">Produkt: {{ nazwa }}</h2>
    </div>
    <button class="btn btn-primary" v-on:click="przechwycKlikniecieBind">
      Albo Kliknij mnie
    </button>

    <div class="bg-primary text-white text-center m-2 p-3">
      <h2 :class="klasyElementu2">Produkt: {{ nazwa }}</h2>
    </div>
    <button class="btn btn-primary" v-on:click="przechwycKlikniecieBind1">
      Kliknij mnie
    </button>
    <button class="btn btn-primary" v-on:click="przechwycKlikniecieBind2">
      Kliknij mnie
    </button>

    <div class="bg-primary text-white text-center m-2 p-3">
      <h2 :data-size="rozmiar" class="p-4">Produkt: {{ nazwa }}</h2>
    </div>
    <button class="btn btn-primary" v-on:click="przechwycKlikniecieData">
      Kliknij mnie
    </button>

    <div class="bg-primary text-white text-center m-2 p-3">
      <h2 v-bind="wartosciAtrybutow">Produkt: {{ nazwa }}</h2>
    </div>
    <button class="btn btn-primary" v-on:click="przechwycKlikniecieAtrybuty">
      Kliknij mnie
    </button>

    <div class="bg-primary text-white text-center m-2 p-3">
      <h2 v-bind:text-content.prop="zawartoscTekstowa"></h2>
    </div>
    <button class="btn btn-primary" v-on:click="przechwycKlikniecieProp">
      Kliknij mnie
    </button>

    <h2 class="bg-primary text-white text-center p-3">Produkty</h2>
    <table class="table table-sm table-bordered table-striped text-left">
      <tr>
        <th>Index</th>
        <th>Nazwa</th>
        <th>Cena</th>
      </tr>
      <tbody>
        <tr
          v-for="(p, index) in produktyNaStronie(aktywnaStrona)"
          :key="p.nazwa"
          :odd="index % 2 == 0"
        >
          <td>{{ aktywnaStrona * iloscProduktowNaStrone + index + 1 }}</td>
          <td>{{ p.nazwa }}</td>
          <td>{{ p.cena }}</td>
        </tr>
      </tbody>
    </table>
    <button
      v-for="i in obliczIloscStron()"
      :key="i"
      v-on:click="przechwycKlikniecieLiczba(i - 1)"
    >
      {{ i }}
    </button>

    <br />
    <br />
    <button class="btn btn-primary" v-on:click="przechwycKlikniecieTable">
      Kliknij mnie
    </button>

    <h2 class="bg-primary text-white text-center p-3">Produkty</h2>
    <table class="table table-sm table-bordered table-striped text-left">
      <tr>
        <th>Index (obiekt)</th>
        <th>Nazwa</th>
        <th>Cena</th>
      </tr>
      <tbody>
        <tr v-for="(p, key, index) in produktyObiekt" :key="p.nazwa">
          <td>{{ index + 1 }}</td>
          <td>{{ p.nazwa }}</td>
          <td>{{ p.cena }}</td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-primary" v-on:click="przechwycKlikniecieTable">
      Kliknij mnie
    </button>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "MojKomponent",
  data: () => ({
    nazwa: "laptop",
    cena: 1990,
    nizszyPodatek: 15,
    wyzszyPodatek: 23,

    fragment: `<div class="form-group">
    Hasło: <input class="form-control" />
    </div>`,
    pokazElementy: true,
    licznik: 0,
    kategoria: "Komputery",
    podswietlenie: false,
    podswietlenie1: false,
    podswietlenie2: false,
    podswietlenieData: false,
    podswietlenieAtrybuty: false,
    podswietlenieProp: false,
    produkty: [
      { nazwa: "Kajak", cena: 234 },
      { nazwa: "Kamizelka", cena: 49.99 },
      { nazwa: "Piłka", cena: 19.49 },
      { nazwa: "A", cena: 100 },
      { nazwa: "B", cena: 200 },
      { nazwa: "C", cena: 300 },
      { nazwa: "D", cena: 400 },
      { nazwa: "E", cena: 500 },
      { nazwa: "F", cena: 600 },
      { nazwa: "G", cena: 700 },
      { nazwa: "H", cena: 800 },
      { nazwa: "I", cena: 900 },
      { nazwa: "J", cena: 1000 },
      { nazwa: "K", cena: 1100 },
    ],
    aktywnaStrona: 0,
    iloscProduktowNaStrone: 5,
    produktyObiekt: {
      1: { nazwa: "Kajak", cena: 234 },
      2: { nazwa: "Kamizelka", cena: 49.99 },
      3: { nazwa: "Piłka", cena: 19.49 },
    },
  }),
  computed: {
    nizszaCalkowitaCena() {
      return this.obliczCalkowitaCena(this.nizszyPodatek);
    },
    wyzszaCalkowitaCena() {
      return this.obliczCalkowitaCena(this.wyzszyPodatek);
    },
    klasyElementu() {
      return this.podswietlenie
        ? ["bg-light", "text-dark", "display-4"]
        : ["bg-dark", "text-light", "p-2"];
    },
    klasyElementu2() {
      return {
        "text-dark": this.podswietlenie1,
        "bg-light": this.podswietlenie2,
      };
    },
    rozmiar() {
      return this.podswietlenieData ? "big" : "small";
    },

    wartosciAtrybutow() {
      return {
        class: this.podswietlenieAtrybuty ? ["bg-light", "text-dark"] : [],
        style: { border: this.podswietlenieAtrybuty ? "5px solid red" : "" },
        "data-size": this.podswietlenieAtrybuty ? "big" : "small",
      };
    },

    zawartoscTekstowa() {
      return this.podswietlenieProp
        ? "Podświetlenie"
        : `Produkt: ${this.nazwa}`;
    },
  },
  methods: {
    obliczCalkowitaCena(podatek) {
      return this.cena + this.cena * (podatek / 100);
    },
    przechwycKlikniecie() {
      this.pokazElementy = !this.pokazElementy;
    },
    przechwycKlikniecieShow() {
      this.licznik++;
    },
    przechwycKlikniecieBind() {
      this.podswietlenie = !this.podswietlenie;
    },
    przechwycKlikniecieBind1() {
      this.podswietlenie1 = !this.podswietlenie1;
    },
    przechwycKlikniecieBind2() {
      this.podswietlenie2 = !this.podswietlenie2;
    },
    przechwycKlikniecieData() {
      this.podswietlenieData = !this.podswietlenieData;
    },
    przechwycKlikniecieAtrybuty() {
      this.podswietlenieAtrybuty = !this.podswietlenieAtrybuty;
    },
    przechwycKlikniecieProp() {
      this.podswietlenieProp = !this.podswietlenieProp;
    },
    przechwycKlikniecieTable() {
      // this.produkty = this.produkty.push(this.produkty.shift());
      // this.produkty = this.produkty.filter((p) => p.cena > 20);

      // this.produkty[1] = ... // nie działa
      Vue.set(this.produkty, 1, { nazwa: "Buty", cena: 99 });
    },
    przechwycKlikniecieLiczba(i) {
      this.aktywnaStrona = i;
    },
    obliczIloscStron() {
      return Math.ceil(this.produkty.length / this.iloscProduktowNaStrone);
    },
    produktyNaStronie(i) {
      return this.produkty.slice(
        i * this.iloscProduktowNaStrone,
        (i + 1) * this.iloscProduktowNaStrone
      );
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

<style>
h2:first-child {
  background-color: aquamarine;
  padding: 10px;
  color: black;
}
[data-size="small"] {
  font-size: 20px;
}
[odd] {
  color: royalblue;
}
</style>