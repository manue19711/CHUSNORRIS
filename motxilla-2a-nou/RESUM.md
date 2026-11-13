# Motxilla 2A · resum del projecte

App web gratuïta per a 2n de Primària, en valencià i castellà (i anglés en el tema de vocabulari). Funciona sense servidor, sense comptes i sense analítica: tot es guarda al navegador de cada dispositiu.

## On està cada cosa

| Fitxer | Per a què serveix |
|---|---|
| `index.html` | **Portada**: la mochila que surt i entra, el material escolar i el botó «Entra a jugar». |
| `app.html` | **L'app** per a l'alumne: avui, mapa, carnet, jocs i zona de famílies. |
| `privacitat.html` | Pàgina de privacitat. |
| `presentacio-antiga.html` | Versió anterior de la presentació (no es fa servir). |
| `js/content.js` | Dades: nombres en valencià i castellà, lectures, lèxic i els textos dels temes. |
| `js/curriculum.js` | Temari (àrees i temes), habilitats i **llista de dibuixos** dels alumnes (`AVATARS`). |
| `js/engine.js` | Motor: perfils, domini dels temes, repàs espaiat, sessions i prova de nivell. |
| `js/ui.js` | Pantalles de l'app (Avui, mapa, carnet, famílies, sessió, final de sessió). |
| `js/mes.js` | **Generadors d'exercicis sense fi** (sumes, restes, nombres, multiplicació, problemes, lectures i nombres en valencià del 1 al 100). |
| `js/games.js` | Jocs: construir el nombre, globus, tren, parelles, sopa de lletres i mots encreuats. |
| `js/sheets.js` | Fitxes en PDF, llista d'alumnes i botó «Dibuix». |
| `js/setmana.js` | Contrasenya de l'alumne, **avaluació setmanal**, informe per a famílies, impressió dels exercicis fets i canvi de dibuix. |
| `js/art.js` | Dibuixos de la mascota i de les viñetes. |
| `css/app.css` · `css/kids.css` | Estil base i estil infantil. |
| `css/nou.css` | **Tot el pulit nou**: botons divertits, animacions d'entrada, avaluació i informe. Per a tornar a l'estil anterior, lleveu la seua línia de `app.html` i `index.html`. |
| `img/esc/` | Material escolar (Fluent Emoji, MIT). |
| `img/anim/` | **Dibuixos d'alumne animats** (SVG, 16 en total). |
| `img/art/`, `img/obj/` | Dibuixos antics i objectes 3D (3dicons, CC0). |
| `sw.js` | Memòria sense xarxa. **Cada vegada que es canvia un fitxer, cal pujar el número de versió** (`motxilla2a-nou-vN`) perquè el navegador no vegi la versió antiga. |
| `LEEME - Cómo usarlo.txt` | Instruccions per a famílies i docents, amb tot el que fa l'app. |

Carpetes del repositori:
- `motxilla-2a/`: **la versió original**, sense tocar. No l'edites.
- `motxilla-2a-nou/`: **la versió de treball** (la que es millora).
- `Motxilla-2A-nou-disseny.zip`: el zip per a descarregar (es torna a generar cada vegada que canviem alguna cosa).

## Com funciona (resum per a l'alumne)

1. **Avui:** la sessió del dia (repàs, una habilitat nova, pràctica i descans). Botó «Canvia el meu dibuix».
2. **Mapa:** totes les assignatures i temes estan **oberts**. Es pot practicar qualsevol tema, i «Més exercicis» n'afig més.
3. **Carnet:** els segells dels temes dominats.
4. **Jocs:** sis jocs.
5. **Avaluació setmanal:** 4 preguntes per àrea (20 en total). Si una àrea és 4 de 4, es dona per **acabada** i es felicita l'alumne pel seu nom.

Els perfils tenen **contrasenya obligatòria**, que es demana cada vegada que s'entra.

## Zona de famílies (candau de baix a l'esquerra, o des de la pantalla de perfils)

- **Fitxes en PDF:** tema, àrea o avaluació; de 6 a 40 exercicis; nivells; 1–3 models; lletra gran; 1 o 2 columnes; amb o sense explicació i solucions.
- **Informe setmanal:** dies, minuts, exercicis, encert per àrea, avaluació, temes dominats i errades. Es pot veure la setmana anterior i imprimir-lo.
- **Alumnes:** afegir, canviar el dibuix, posar/canviar/llevar la contrasenya, i eliminar.
- Preferències: durada, sons, jocs, pràctica lliure, PIN i còpia de seguretat.

## Com treballar amb això (per al proper cop)

Des del repositori:

```bash
# Versió de treball:
cd motxilla-2a-nou
python3 -m http.server 8802     # i obrir http://localhost:8802/index.html

# Generar el zip per a descarregar (des de l'arrel del repositori):
cp -r motxilla-2a-nou "/ruta/temporal/Motxilla 2A - nou disseny"
cd /ruta/temporal && zip -qr z.zip "Motxilla 2A - nou disseny"
cp z.zip /home/user/CHUSNORRIS/Motxilla-2A-nou-disseny.zip
```

Després, `git add -A motxilla-2a-nou Motxilla-2A-nou-disseny.zip`, `git commit` i `git push` a la rama `claude/peaceful-gates-52j8yz`.

Enllaç per a descarregar el zip (requereix sessió de GitHub):
https://github.com/manue19711/CHUSNORRIS/raw/claude/peaceful-gates-52j8yz/Motxilla-2A-nou-disseny.zip

## Comprovacions que s'han fet servir

- **Exercicis:** generar milers d'exercicis per tema i comprovar que cap és buit, que la resposta correcta és entre les opcions i que no hi ha `undefined` ni `NaN`.
- **Recorregut complet:** una pràctica des del mapa fins a «Més exercicis», en mòbil i ordenador.
- **Contrasenya i borrat:** crear, entrar amb la contrasenya bona i dolenta, i eliminar un alumne.
- **Portada:** fotogrames de la sortida del material, de l'entrada a la mochila i del pas a l'app.

Els scripts de prova estaven a la carpeta temporal de la sessió i no es guarden al repositori; si cal repetir-los, es poden tornar a escriure amb Playwright.

## Pendent o per decidir

- **Escriure la paraula sencera** a mà en els exercicis de valencià (ara només es respon amb cifres o triant opció).
- **Revisió lingüística:** els textos en valencià i castellà els he revisat jo, no un parlant nadiu. Convé que una persona els llegisca.
- **Fotos reals de la portada:** no s'ha trobat una mochila escolar amb llicència lliure i neta. Si s'envien fotos del material, es poden usar en lloc dels dibuixos.
- **Telèfon real:** les animacions i els botons s'han comprovat en ordenador i en simulació de mòbil, no en un dispositiu real.
- **Pròxims ajuts possibles:** que l'alumne puga canviar el dibuix sense passar per la zona de famílies (ja pot des d'«Avui»); ampliar els temes de medi, anglés i ortografia amb exercicis generats com els de matemàtiques.

## Decisions preses (per a no tornar-les a discutir)

- **Tot és local:** sense servidor ni base de dades, per això les dades són només al navegador (la còpia de seguretat és un fitxer JSON).
- **Els temes estan tots oberts:** l'ordre no bloqueja res; la progressió es mostra amb els estats «Oberta», «En camí», «Dominada» i «Per repassar».
- **Dibuixos propis:** no es fan servir personatges amb drets (Stitch, Batman...).
- **Llicències:** Fluent Emoji (MIT), 3dicons (CC0), Fredoka i Andika (SIL OFL). Les fotos de Wikimedia Commons porten el seu crèdit a la presentació.
