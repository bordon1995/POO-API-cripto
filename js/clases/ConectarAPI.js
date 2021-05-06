import {InterfaceUser} from './InterfaceUser.js';
let UI=new InterfaceUser();

export class ConectarAPI{
  constructor(){
    this._objeto=[];
    this._preciosActuales=[];
    this._vandera=true;
    this._id=0;
    this._URL='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
  }
  obtenerDatos(){
    fetch(this._URL)
      .then(archivo => archivo.json())
      .then(respuesta =>{
        this.mostrarDatos(respuesta.Data)
      })
  }

  mostrarDatos(dato){

    dato.forEach(element => {
      let cripto={
        precio:element.RAW.USD.PRICE,
        maximo:element.RAW.USD.HIGHDAY,
        minimo:element.RAW.USD.LOWDAY,
        nombre:element.RAW.USD.FROMSYMBOL,
        id:'n' + this._id++
      }
      this._objeto=[...this._objeto,cripto]
    });

    if(this._vandera){
      UI.mostrarPrecios(this._objeto);
      this._vandera=false;
      this._preciosActuales=this._objeto;
      this._objeto=[];
      this._id=0;
      setTimeout(()=>{
      this.obtenerDatos();
      },30000);
    }else{
      this.actualizarPrecios(this._preciosActuales,dato);
    }
  }

  actualizarPrecios(precioActual,dato){

    UI.limpiarHtml();
    UI.mostrarPrecios(precioActual);
    let posicion=0;

    dato.forEach(nuevo =>{

      
      if(precioActual[posicion].precio > nuevo.RAW.USD.PRICE){
        UI.interactividadHtml('precioDown',precioActual[posicion].id);
      }else if(precioActual[posicion].precio < nuevo.RAW.USD.PRICE){
        UI.interactividadHtml('precioUp',precioActual[posicion].id);
      }

      posicion++;

    });

    this._preciosActuales=this._objeto;
    this._objeto=[];
    this._id=0;

    setTimeout(()=>{
      this.obtenerDatos();
    },30000)

  }

}