# Wheel of Pokemons — kontekst projektu

## Cel aplikacji

Wheel of Pokemons to **picker osoby prowadzącej standup** z Pokemon-ową stylistyką i animacjami. Używany przez zespół deweloperski do losowego wyboru prowadzącego daily standup.

## Jak działa

1. **Lewa kolumna (sidebar)** — lista wszystkich członków zespołu z checkboxami. Zaznaczeni ludzie pojawiają się w puli losowania. Stan (kto jest zaznaczony) jest zapisywany w `localStorage` przeglądarki — każdy użytkownik ma swój własny wybór, niezależny od innych.

2. **Prawa strona (karty)** — każda zaznaczona osoba jest wyświetlona jako karta Pokemon z:
   - Imieniem i avatarem (`{name}.png`)
   - Losowym HP (50–150)
   - Losową zdolnością (ability) z listy ABILITIES
   - Losowym bonusem (bonus) z listy BONUSES
   - Losowym blockerem i "drogą ucieczki" ze standupu

3. **Przycisk "Throw Pokéball to pick standup"** — uruchamia animację losowania:
   - Przez ~3 sekundy karty są losowo podświetlane (efekt `rolling`)
   - Wylosowana osoba dostaje klasę `shiny` — karta świeci złotym kolorem (efekt CSS, nie wymaga osobnego assetu)
   - Pojawia się overlay z animacją rzutu Pokéballem i ujawnieniem wylosowanej osoby
   - W overlayzie odtwarzane jest video `{name}_picked.mp4` (lub `.gif`, `.webm`, a fallback to normalny avatar)
   - Spada "confetti" z losowych sprite'ów Pokemonów (z PokeAPI)

## Struktura plików

- `index.html` — cała aplikacja (HTML + CSS + JavaScript, single-file)
- `admin.html` — panel admina do zarządzania listą osób, grupami i assetami (patrz sekcja niżej)
- `config.json` — źródło prawdy dla listy osób i grup, ładowane runtime'owo przez `index.html`
- `card.js` — plik z danymi pomocniczymi (nieużywany bezpośrednio w głównej logice, prawdopodobnie legacy)
- `{name}.png` — avatar osoby
- `{name}_picked.mp4` — krótkie video wyświetlane po wylosowaniu danej osoby

## Osoby w puli

Lista osób i grup żyje w **`config.json`** i jest zarządzana z panelu admina (`admin.html`) — nie jest predefiniowana w kodzie.

- **`admin.html`** — GUI do edycji `config.json`: dodawanie/usuwanie osób, przypisywanie do grup, upload avatarów (`{name}.png`) i filmików picked (`{name}_picked.mp4`). Zmiany są commitowane bezpośrednio do repo przez GitHub API (wymaga Personal Access Token wklejonego w panelu).
- **`index.html`** ładuje `config.json` przy starcie (`fetch('./config.json')`). Jeśli fetch się nie uda (np. serwowanie przez `file://` albo brak pliku), używa hardcoded fallbacku `_DEFAULT_PEOPLE` / `_DEFAULT_GROUPS` w źródle — ta lista jest historyczna i może być nieaktualna względem `config.json`.
- **Assety** — każda osoba powinna mieć swój `{name}.png`. `{name}_picked.mp4` jest opcjonalny; przy braku aplikacja spada z fallbackiem do zwykłego avatara w overlayzie wylosowania.

## Kluczowe decyzje techniczne

- **Single-file app** — cały kod (HTML/CSS/JS) jest w jednym pliku `index.html`, bez build toola ani frameworka
- **localStorage** — jedyny mechanizm persystencji; stan jest per-przeglądarka, nie współdzielony między użytkownikami
- **Dane kart są losowane przy każdym załadowaniu strony** — HP, ability, bonus, blocker, escape są losowane w `generateCardData()` przy inicjalizacji, więc zmieniają się po odświeżeniu
- **Media fallback** — dla wylosowanej osoby aplikacja próbuje kolejno: `.gif` → `.mp4` → `.webm` → normalny avatar PNG
- **Pokemon sprites** — tło strony i confetti w overlayzie korzystają z publicznego API PokeAPI (raw GitHub sprites)
