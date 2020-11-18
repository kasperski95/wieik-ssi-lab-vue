export function runCounterVanillaApp() {
  let licznik = 0;

  const container = document.createElement('div');
  container.classList.add('text-center', 'p-3');

  const msg = document.createElement('h1');
  msg.textContent = 'Przycisk nie został kliknięty';
  msg.classList.add('bg-primary', 'text-white', 'p-3');

  const button = document.createElement('button');
  button.textContent = 'Kliknij mnie';
  button.classList.add('btn', 'btn-secondary');
  button.onclick = () => {
    msg.textContent = `Przycisk został kliknięty: ${++licznik}`;
  };

  container.appendChild(msg);
  container.appendChild(button);
  const app = document.getElementById('app');
  app.parentElement.replaceChild(container, app);
}
