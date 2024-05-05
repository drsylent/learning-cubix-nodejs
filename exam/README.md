# Hogyan futtatható

Az alkalmazás futtatható a gyökérből: `node src/index.js` parancs segítségével.
Előtte szükséges beállítani a `DATABASE_LOCATION` környezeti változót, ami megadja a fájl helyét,
amiben a LokiJS adatbázis tárolásra kerül.
Amennyiben a függőségek nem voltak előtte letöltve, `npm install` vagy `npm ci` parancs segítségével telpíthetőek.

Továbbá készült egy konténerizált verzió az alkalmazásból, ez a mellékelt Docker Compose fájl segítségével futtatható.

# További konfigurációs lehetőségek

Ezek mind környezeti változókból állíthatóak be:

- DATABASE_LOCATION: adatbázis fájl helye (kötelező)
- LOGGING_LEVEL: naplózás szintje, `INFO`, `DEBUG`, vagy `TRACE` (alapértelmezetten `INFO`)
- SERVER_PORT: a szerver portja (alapértelmezetten `8080`)
- BASE_URL: a kiküldött emailekben használt URL eleje (alapértelmezetten `http://localhost:8080`)
