
class Carta {
  constructor(valor, palo) {
    this.valor = valor;
    this.palo = palo;
    this.volteada = false;
  }

  voltear() {
    this.volteada = !this.volteada;
  }
}

class Baraja{
  constructor(){
     this.cartas = [];
     this.pilas = []
    let palos = ["diamante","trebol","corazon","picas"];
    let valores = ["1","2","3","4","5","6","7","8","9","10","11","12","13"];
    palos.forEach(palo=>{
      valores.forEach(valor=>{
        this.cartas.push( new Carta(valor,palo));
      })
    })      
  }
  
  agregarColor(){
    this.cartas.forEach(carta=>{
      if(carta.palo == "diamante" || carta.palo == "corazon"){
        carta.color = "rojo";
      }else{
        carta.color = "negro"
      }
    })
  }
  
  
  mezclar(){
    for(let i=0; i<this.cartas.length; i++){
      let azar =Math.floor(Math.random()*9);
      [this.cartas[azar],this.cartas[i]] = [this.cartas[i],this.cartas[azar]] 
    }
  }

  crearCarta(carta){
      let cartaContenedor = document.createElement("div");
      cartaContenedor.classList.add("card");
      cartaContenedor.classList.add("margin-bottom");
      cartaContenedor.id = `${carta.valor}_${carta.palo}`
      let img = document.createElement("img");
      img.src = `/cartas/${carta.valor}_${carta.palo}.png`;
      
      cartaContenedor.appendChild(img)
      cartaContenedor.draggable = true;


// dragstart: Este evento se dispara cuando comienza el arrastre de un elemento. Aquí configurarás la información que se va a transferir durante el arrastre.
// Puedes usar el método dataTransfer.setData() para luego acceder ene el drop
cartaContenedor.addEventListener("dragstart",(carta)=>{
  carta.dataTransfer.setData("text/plain", cartaContenedor.id);
  carta.dataTransfer.setData("text/lugar",cartaContenedor.parentNode)
  let contenedorPila = cartaContenedor.parentNode;
  let posicionEnPila = Array.from(contenedorPila.children).indexOf(cartaContenedor);
  console.log(posicionEnPila)
})

cartaContenedor.addEventListener("dragover",(carta)=>{
  carta.preventDefault(carta);
})

cartaContenedor.addEventListener("drop",(carta)=>{
  // Primer carta seleccionada
  let datosArrastre = carta.dataTransfer.getData("text/plain");
  let lugar = carta.dataTransfer.getData("text/lugar");
  console.log(lugar)
  datosArrastre = datosArrastre.split("_")
  let numeroDeArrastre = Number(datosArrastre[0]);
  
  // Carta que hay que verificar si se cumple o no la condicion para aceptar la carta seleccionada
  let cartaParaVerificar = cartaContenedor.id; 
  cartaParaVerificar = cartaParaVerificar.split("_")
  let numeroParaVerificar = Number(cartaParaVerificar[0])
 
  
  });
      return cartaContenedor
  }
  
  crearCartaBocaAbajo(){
      let cartaContenedor = document.createElement("div");
      cartaContenedor.classList.add("card");
      cartaContenedor.classList.add("margin-bottom");
      
      let img = document.createElement("img");
      img.src = `/cartas/cardDown.png`;
      
      cartaContenedor.appendChild(img)
      return cartaContenedor;
  }
  repartir(){
    
    // Reparte las cartas de arrow-2
    
    for(let i = 0;i<=6;i++){   
      this.pilas[i] = this.cartas.splice(0, i + 1);
    }
    
    // Chequea la ultima carta de la pila si es true esta boca a bajo false muestra el numero
    this.pilas.forEach(pila=>{
      pila[pila.length-1].volteada = true;
    })
    
    this.pilas.forEach(pila=>{
      let lugar = document.createElement("div");
      lugar.classList.add("lugar");
      
      let arrow2 = document.querySelector(".arrow-2");
      arrow2.appendChild(lugar);

      pila.forEach(carta=>{
        if(carta.volteada){
          lugar.appendChild(this.crearCarta(carta));
        }
        else{
         lugar.appendChild(this.crearCartaBocaAbajo());
        }
      })
    })
  }

  mazoRestante(){
    let cartasOcultas = document.querySelector(".cartas-ocultas");
    this.cartas.forEach(carta=>{
      if(carta.volteada){
        cartasOcultas.appendChild(this.crearCarta(carta));
      }else{
        cartasOcultas.appendChild(this.crearCartaBocaAbajo());
      }
    })
  }

  actualizarMazo(){
    let cartasOcultas = document.querySelector(".cartas-ocultas");
    let arrayMazoVisible = [];
    let arrayMazoOculto = mazo.cartas;

    cartasOcultas.addEventListener("click",()=>{
      let divCartasVisibles = document.querySelector(".cartas-visibles");
      
      if(divCartasVisibles === null){
        let divCartasVisibles = document.createElement("div");
        divCartasVisibles.classList.add("cartas-visibles");
        let mazo = document.querySelector(".mazo");
        mazo.appendChild(divCartasVisibles);

        let ultimaCarta = arrayMazoOculto.pop();
        divCartasVisibles.appendChild(this.crearCarta(ultimaCarta));

        arrayMazoVisible.push(ultimaCarta);

      }else if(arrayMazoOculto[0] === undefined){
       arrayMazoOculto = [...arrayMazoVisible];
       arrayMazoVisible = [];
       divCartasVisibles.remove();

      }else{
        let divCartasVisibles = document.querySelector(".cartas-visibles");

        
        let ultimaCarta = arrayMazoOculto.pop();
        arrayMazoVisible.push(ultimaCarta);
        
        divCartasVisibles.appendChild(this.crearCarta(ultimaCarta));
      }
    })
  }
}


let mazo = new Baraja
window.onload=main();




function main(){
  mazo.agregarColor()
  mazo.mezclar();
  mazo.repartir();
  mazo.mazoRestante();
  mazo.actualizarMazo();
}
