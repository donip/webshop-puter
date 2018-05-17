database
https://mlab.com/databases/pewterschmidt/collections/users
user: pewterschmidt
pw: qwertz123

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