### 4. Termék(product) felvitele, módosítása és törlése

  * Terméket az új termék hozzáadása formmal tudjuk hozzáadni. A kötelező adatokat validálja az oldal és hibát jelez ha üres.
    1. Név - kötelező adat - szöveg
    2. Márka - kötelező adat - szöveg
    3. Ár -kötelező adat - szám
    4. Kategória - kötelező adat
    5. Képfeltöltés - Choose File gombbal tudunk képet kiválasztani
    6. Bevitel gombbal hozzáadódik a termék
  * Termék módosítása a listázott terméknél lévő adatok átírásával lehetséges.
    1. Név - kötelező adat - szöveg
    2. Márka - kötelező adat - szöveg
    3. Ár -kötelező adat - szám
    4. Kategória - kötelező adat
    5. Képfeltöltés - Choose File gombbal tudunk képet kiválasztani az oldal tetéjen, ahol a terméket létrehoztuk
    6. Módosítás a frissítés gomb lenyomásával történik, a régi képet törli majd feltölti a szerverbe az új képet, ha nincs kép akkor a default jelenik meg
  * Termék törlése
    1. Törlés gomb lenyomásával törlődik a termék illetve a hozzá kapcsolódó kép is az szerverről
  * Az oldal alján van egy rejtett gomb amivel "fake" adatokat tudunk létrehozni

### 5. Rendelés felvitele, módosítása és törlése
A rendelésnél populate-tel hozzáfűzi a termékneveket és felhasználó adatokat, amennyiben le lett törölve a termék a megrendelésben, akkor törölt termékként jelenik meg.
 * Új rendelés felvitele
  1. Kiválasztjuk az ügyfelet a legördülő listából, ha üresen marad akkor nem küldi el 
  2. Kiválasztjuk a terméket a legördülő listából, ha üresen marad akkor nem küldi el 
  3. Beírjuk a mennyiséget a mennyiség input mezőbe
 * Meglévő rendelés módosítása
  1. A rendelésnél lévő módosít gomb megnyomása esetén lévő modalba tudjuk beírni az adatokat
  2. Rendelési név módosítás az első input mezőnél lehetséges
  3. Rendelés állapota lehet folyamatban vagy teljesítveű
  4. Terméknév módosítás
  5. Mennyiség beírása
  6. Mentés gombbal elküldjük a módosítást
* Meglévő rendelés törlése
  1. Rendelésnél lévő X gomb megnyomásával töröljük a megrendelést