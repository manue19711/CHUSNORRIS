/* Vinyetes de còmic en lloc de les fotos antigues.
   Dibuixos: Fluent Emoji de Microsoft (llicència MIT), compostos en vinyetes pròpies (img/art). */
Object.keys(IMG).forEach(k => { IMG[k] = 'img/art/' + k + '.svg'; });
PHOTOS.forEach((p, i) => { p.s = 'img/art/p' + String(i).padStart(2, '0') + '.svg'; p.c = null; });
Object.keys(CREDITS).forEach(k => { delete CREDITS[k]; });
