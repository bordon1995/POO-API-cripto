export class InterfaceUser{

  mostrarPrecios(precios){

    precios.forEach(element => {
      const resultado=this.calcularPorcentaje(element);
    
      const crearHTML=document.createElement('tr');
      crearHTML.classList.add('columnas');
      crearHTML.setAttribute('id',`${element.id}`);
      crearHTML.innerHTML=`
      <td class="tabla__filas"><strong>${element.nombre}</strong></td>
      <td class="tabla__filas precio">${element.precio} US$</td>
      <td class="tabla__filas porcentaje"><i class="fas fa-caret-up"></i> ${resultado}</td>
      <td class="tabla__filas maximo">${element.maximo} US$</td>
      <td class="tabla__filas minimo">${element.minimo} US$</td>`;

      document.querySelector('tbody').appendChild(crearHTML);
    });

  }

  calcularPorcentaje(precios){
    const porcentaje= (((precios.minimo * 100) / precios.precio) -100) * (-1);
    return porcentaje.toFixed(2);
  }

  limpiarHtml(){
    while(document.querySelector('tbody').firstChild){
      document.querySelector('tbody').removeChild(document.querySelector('tbody').firstChild);
    }
  }

  interactividadHtml(typo,id){
    if(typo === 'precioDown'){
      document.querySelector(`#${id} .precio`).classList.add('precioDown','precioDownSecondFormat');
      setTimeout(()=>{
        document.querySelector(`#${id} .precio`).classList.remove('precioDown');
        setTimeout(()=>{
          document.querySelector(`#${id} .precio`).classList.remove('precioDownSecondFormat');
        },2500)
      },1000)
    }else{
      document.querySelector(`#${id} .precio`).classList.add('precioUp','precioUpSecondFormat');
      setTimeout(()=>{
        document.querySelector(`#${id} .precio`).classList.remove('precioUp');
        setTimeout(()=>{
          document.querySelector(`#${id} .precio`).classList.remove('precioUpSecondFormat');
        },2500)
      },1000)
    }
  }

}