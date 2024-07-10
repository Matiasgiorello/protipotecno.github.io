class Paleta {
    constructor(nombre) {
        this.imagen = loadImage(nombre);
    }

    darColor() {
        let x = int(random(this.imagen.width));
        let y = int(random(this.imagen.height));

      
        let elColor = this.imagen.get(x, y);

     
        let nuevoR = random(0, 100); 
        let nuevoG = random(100, 200); 
        let nuevoB = random(200, 255); 
       
        return color(nuevoR, nuevoG, nuevoB);
    }
}



class PaletaCirculo {

    darColor() {
        return color(255); // Devuelve blanco
    }
}

