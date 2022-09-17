import './sass/reset.scss';
import './sass/global.scss';
import './sass/loader.scss';
import App from './app/app';

const rootElem = document.getElementById('root');
if (rootElem) {
  const app = new App(rootElem);
  app.start();
}
