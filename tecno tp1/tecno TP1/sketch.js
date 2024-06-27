//----CONFIGURACION-----
let AMP_MIN = 0.06; // umbral mínimo de sonido que supera al ruido de fondo
let AMP_MAX = 0.3;  // amplitud máxima del sonido
let AMPLITUD= 0.48;
//--------------MICROFONO 
let mic;

//--------------AMPLITUD
let amp;
let haySonido = false;
let hayVolumen = false; 

//--------------IMPRIMIR 
let IMPRIMIR=false;

let pinceladas = [];
let cantidad = 13;

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
  for (let i = 0; i < 6; i++) {
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
  createCanvas(800, 600);
  background(0);  
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
 
  if(haySonido){
    if (horizontalLeftCounter < 800){
      for( let i = 0 ; i < 1 ; i++){
        let x = random( width );
        let y = random( height );

        let xtrazo = int( map( x , 0 , width , 0 , trazo.width ) );
        let ytrazo = int( map( y , 0 , height , 0 , trazo.height ) );
     
        let colorDeEstePixel = trazo.get( xtrazo , ytrazo );
     
        if( red( colorDeEstePixel ) < 100 ){
          let cual = int( random(cantidad));
          let tamanio = random( 0.01 , 0.6);
     
          let esteColor =  miPaleta.darColor();
          let angulo = radians(random(360)); 
          let angulo2 = radians(random(360)); 
     
          tint( red(esteColor) , green(esteColor) , blue(esteColor) , 140 );
     
          push();
          translate( x, y );
          rotate( angulo+angulo2 );
          scale( tamanio );
          image( pinceladas[cual] , 0 , 0 );
          horizontalLeftCounter++;
          pop();
        }
      }
    }
  }
 
  if(hayVolumen){  
    if (verticalRightCounter < 100){ 
        for (let i = 0; i < 1; i++) { 
            let x = random(width);
            let y = random(height);
            let scaleSize = random(0.1, 0.5); 
            let indexImagen = int(random(6)); 
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
      // Amp supera el umbral máximo, posible aplauso
      contadorAplausos++;
      resetear(); // Llamar a la función para realizar el reseteo
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
  // Aquí puedes incluir la lógica para resetear tu programa
  // Por ejemplo, podrías reiniciar contadores, limpiar la pantalla, etc.
  background(0); // Ejemplo: reiniciar el fondo a negro
  horizontalLeftCounter = 0; // Reiniciar contadores específicos
  verticalRightCounter = 0;

  // También podrías reiniciar otras variables según sea necesario
}
}