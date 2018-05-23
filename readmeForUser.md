# Egyedi fejlesztésű webshop

## Felhasználói kézikönyv


### 1. Felhasználó regisztráció


Kötelezően megadandó adatok
- Név
- Email
- Jelszó

Egyéb követelmények

- Jelszó minimum 8 karakter hosszú
- Jelszónak egyeznie kell a megerősítésként beírt jelszóval

### 2. Felhasználó bejelentkezés

A felhasználó a helyes emailcím és jelszó megadása után tud bejelentkezni. A bejelentkezés a Login gomb megnyomásával véglegesíthető.

Bejelentekezett felhasználót a Logout gomb megnyomásával léptethetünk ki.

A profil gomb a bejelentkezett felhasználót adja vissza a devtoolban (F12 gomb lenyomása esetén válik láthatóvá).

### 3. Jogosultsági szintek

Jelenleg 2 jogoultsági szintet különböztetünk meg.
- Normál felhasználó
- Admin

A normál felhasználó a termékeket meg tudja nézni, rendelést tud leadni, illetve meg tudja nézni a statisztikai kimutatásokat is.

Ehhez képest az admin felhasználóknak jelentős többlet jogosultságai vannak. A termékeket módosíthatja, törölheti és újakat is létrehozhat. Az ordereket módosíthatja, törölheti, és normál vásárló jelleggel létre is hozohatja.

### 4. Felhasználó kezelés

Erre az oldalra csak admin jogosultságú felhasználó tud átnavigálni a bejelentkezés után. A regisztrációs oldalhoz hasonlóan itt is tudunk felhasználót regisztrálni, valamint itt megadhatjuk a jogosultság típusát is. **Admin jogosultságot kizárólag ezen a felületen tud megadni az admin jogosultsággal rendelkező felhasználó.** A meglévő felhasználók módosítása és törlése is innen történik. 

### 5. Statisztika

Grafikonos formában ábrázoljuk a napi rendelések összértékét. Továbbá informatív mutatószámok jelennek meg a felső sorban az  egy vevőre eső bevételről, eladott termékek számáról, aggregált bevételi adatokról és az aktuális összes ügyfél számáról. A frissítés automatikus.

### 6. Termék(product) felvitele, módosítása és törlése

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

### 7. Rendelés felvitele, módosítása és törlése
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

### 8. Adatbázis információk

- database
- https://mlab.com/databases/pewterschmidt/collections/users
- user: pewterschmidt
- pw: qwertz123
