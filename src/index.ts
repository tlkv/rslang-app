import './sass/reset.scss';
import './sass/global.scss';
import App from './components/app/app';

const app = new App(document.querySelector('.root') as HTMLDivElement);
app.start();
