import { initialLayout } from './initialLayout';
import './style.css';

const root = document.querySelector<HTMLDivElement>('#app');

function main() {
  if (root == null) {
    console.error('Root element not found. Cannot start game loop.');
    return;
  }

  initialLayout(root);
};

main();
