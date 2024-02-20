export const formatTime = (time) => {
    const duracion = time; // Obtenemos la duración en segundos
      // Formateamos la duración en minutos y segundos
      const minutos = Math.floor(duracion / 60);
      const segundos = Math.floor(duracion % 60);
      let tiempoTotal = padDigits(minutos, 2) + ':' + padDigits(segundos, 2);//un total de dos
      const duracionFormateada = tiempoTotal;
      return duracionFormateada;
}

//para formatear el tiempo
function padDigits(number, digits) { // number numeros y digits digitos
    return String(number).padStart(digits, '0'); // 0 a la izquierda si no tiene dos numeros
  }