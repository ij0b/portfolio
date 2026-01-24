import { createRoot } from 'react-dom/client';
//import {BrowserRouter as Router} from 'react-router-dom';
import {HashRouter} from 'react-router-dom';
import App from './App';
//import './scss.scss';
//import './css.css';
import './styles/scss.scss';

//На самом деле Webpack делает всё это за вас. Если вы хотите увидеть файлы CSS, 
//запустите npm run build Это создаст папку для сборки, внутри которой вы найдёте static/css

let root = createRoot(document.querySelector('#root'));



root.render(
  //<StictMode>
  <HashRouter>
    <App />
  </HashRouter>
  //</StictMode>
);