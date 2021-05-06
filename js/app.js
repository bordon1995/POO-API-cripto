import { ConectarAPI } from './clases/ConectarAPI.js';
let conectarApi=new ConectarAPI();
import {InterfaceUser} from './clases/InterfaceUser.js';
let UI=new InterfaceUser();

eventListener();
function eventListener(){
  document.addEventListener('DOMContentLouded',conectarApi.obtenerDatos());
}