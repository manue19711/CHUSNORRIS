// Ojo reducido de Emsley: 60 D, índice 1,336, longitud axial 22,27 mm.
// El ojo modelo es miope con astigmatismo: −2,25 −1,00 × 90.
// Con el eje del cilindro a 90°, la potencia del cilindro actúa en el meridiano horizontal.
export const MODEL = {
  index: 1.336,
  axial: 1336 / 60, // mm
  eyeV: 62.25, // meridiano vertical: 2,25 D de más
  eyeH: 63.25, // meridiano horizontal: 3,25 D de más
};

// Dónde enfoca un meridiano con una lente de prueba (dioptrías, lente pegada al ojo).
// error > 0: detrás de la retina; error < 0: delante.
export function focusOf(eye, lens) {
  const image = 1336 / (eye + lens);
  return { image, error: image - 1336 / 60 };
}
