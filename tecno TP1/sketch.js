//----CONFIGURACION-----
let AMP_MIN = 0.06; 
let AMP_MAX = 0.23;  
let AMPLITUD= 0.32;
//--------------MICROFONO 
let mic;

//--------------AMPLITUD
let amp;
let haySonido = false;
let hayVolumen = false; 

//--------------IMPRIMIR 
let IMPRIMIR=false;

let pinceladas = [];
let cantidad = 15;

let trazos;
let estado;

let miPaleta;
let trazo;
let fondo1
let miPaletaCirculo;

let horizontalLeftCounter = 0;
let verticalRightCounter = 0; 
let contadorAplausos = 0; 



let whitePalette = ['#FFFFFF', '#F5F5F5', '#EBEBEB', '#E0E0E0', '#D6D6D6'];

let imagenes = []; // Arreglo para almacenar las imágenes "img00" a "img05"
 
function preload(){
  miPaleta = new Paleta( "data/noche.png" );
  trazo = loadImage( "data/fondo.png" );
  fondo1 = loadImage("data/fondo1.png");
  
  // Cargar la imagen "circulo.png"
  trazos = loadImage("data/circulo.png");
  miPaletaCirculo = new PaletaCirculo();

  // Cargar las imágenes "img00" a "img05" en el arreglo imagene
  for (let i = 0; i < 9; i++) {
    imagenes[i] = loadImage("data/img" + nf(i, 2) + ".png");
  }
  
  for( let i = 0 ; i < cantidad ; i++){
    let colores = "data/trazo" + nf(i, 2) + ".png";
    pinceladas[i] = loadImage(colores);
  }
}

function setup() {
  //--------------MICROFONO 
  mic = new p5.AudioIn();
  mic.start();
  userStartAudio();
  createCanvas(800, 700);
  background (46, 46, 46);

  
}





function draw() {
  
  noStroke();
  if (IMPRIMIR){
    printData();
  }
  
  //--------------AMPLITUD
  amp = mic.getLevel();
  haySonido = amp > AMP_MIN; 
  hayVolumen = amp > AMP_MAX;
 
  if (haySonido) {
    if (horizontalLeftCounter < 300) {
      for( let i = 0 ; i < 1 ; i++){
      let cuadradoAncho = 800;  
      let cuadradoAlto = 680;   
      let margen = 100;         
  
      
      let x = random(margen, cuadradoAncho - margen);
      let y = random(margen, cuadradoAlto - margen);
  
      
      let xtrazo = int(map(x, 0, cuadradoAncho, 0, trazo.width));
      let ytrazo = int(map(y, 0, cuadradoAlto, 0, trazo.height));
  
      let colorDeEstePixel = trazo.get(xtrazo, ytrazo);
  
      // Verificar que el trazo no esté tocando el borde del lienzo
      if (red(colorDeEstePixel) < 50 && xtrazo > 0 && xtrazo < trazo.width - 1 && ytrazo > 0 && ytrazo < trazo.height - 1) {
        let cual = int(random(cantidad));
        let tamanio = random(0.1, 0.5);
  
        let esteColor = miPaleta.darColor();
        let angulo = radians(random(360));
        let angulo2 = radians(random(360));
  
        tint(red(esteColor), green(esteColor), blue(esteColor), 250);
  
        push();
        translate(x, y);
        rotate(angulo + angulo2);
        scale(tamanio);
        imageMode(CENTER);
        image(pinceladas[cual], 0, 0);
        horizontalLeftCounter++;
        pop();
      }
    }
  }
}
  
 
  if(hayVolumen){  
    if (verticalRightCounter < 200){ 
        for (let i = 0; i < 1; i++) { 

            let x = random(width);
            let y = random(height);

            let scaleSize = random(0.01, 0.3); 
            let indexImagen = int(random(9)); 
            let imagen = imagenes[indexImagen]; 
       
            push();
            translate(x, y);
            scale(scaleSize); 
          
            
            
            let whiteIndex = int(random(whitePalette.length));
            tint(color(whitePalette[whiteIndex]));
            
            image(imagen, -imagen.width / 2, -imagen.height / 2); 
            verticalRightCounter++;
            pop();
        }
    }
    if (haySonido && amp > AMPLITUD) {
      contadorAplausos++;
      resetear(); 
    }
}

function printData(){
  background(200);
  push();
  textSize(16);
  fill(0);
  let texto;

  texto = 'amplitud: ' + amp;
  text(texto, 20, 20);

 
  ellipse(width/2, height-amp * 1000, 30, 30);

  pop();
}
function resetear() {
  
  background(46, 46, 46); 
  horizontalLeftCounter = 0; 
  verticalRightCounter = 0;

 
}
}