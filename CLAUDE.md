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
   - Wylosowana osoba dostaje klasę `shiny` — karta świeci złotym kolorem, avatar zmienia się na wersję `{name}_shiny.png`
   - Pojawia się overlay z animacją rzutu Pokéballem i ujawnieniem wylosowanej osoby
   - W overlayzie odtwarzane jest video `{name}_picked.mp4` (lub `.gif`, `.webm`, a fallback to normalny avatar)
   - Spada "confetti" z losowych sprite'ów Pokemonów (z PokeAPI)

## Struktura plików

- `index.html` — cała aplikacja (HTML + CSS + JavaScript, single-file)
- `card.js` — plik z danymi pomocniczymi (nieużywany bezpośrednio w głównej logice, prawdopodobnie legacy)
- `{name}.png` — avatar osoby (normalny)
- `{name}_shiny.png` — avatar osoby (wersja "shiny"/świecąca, pokazywana po wylosowaniu)
- `{name}_picked.mp4` — krótkie video wyświetlane po wylosowaniu danej osoby

## Osoby w puli

Lista jest **predefiniowana** — to rzeczywiści członkowie zespołu. Docelowo każda osoba powinna mieć zarówno shiny avatar, jak i filmik picked. Brakujące assety wynikają z limitów narzędzi do generowania obrazków i video.

| Osoba     | Avatar (`{name}.png`) | Shiny (`{name}_shiny.png`) | Video (`{name}_picked.mp4`) |
|-----------|:---------------------:|:--------------------------:|:---------------------------:|
| Ankit     | ✅                    | ✅                         | ❌                          |
| Danny     | ✅                    | ✅                         | ❌                          |
| Marian    | ✅                    | ✅                         | ✅                          |
| Mariusz   | ✅                    | ✅                         | ✅                          |
| Minesh    | ✅                    | ✅                         | ✅                          |
| Muhammad  | ✅                    | ✅                         | ✅                          |
| Paul      | ✅                    | ✅                         | ✅                          |
| Deepthi   | ✅                    | ✅                         | ✅                          |
| Rares     | ✅                    | ✅                         | ✅                          |
| Yasmin    | ✅                    | ✅                         | ✅                          |
| Francois  | ✅                    | ✅                         | ✅                          |
| Eric      | ✅                    | ✅                         | ✅                          |
| Alex      | ✅                    | ✅                         | ✅                          |

**Brakuje video dla:** Ankit, Danny

Pliki `old_{name}_shiny.png` to poprzednie wersje shiny avatarów (zastąpione nowszymi) — można je ignorować.

## Kluczowe decyzje techniczne

- **Single-file app** — cały kod (HTML/CSS/JS) jest w jednym pliku `index.html`, bez build toola ani frameworka
- **localStorage** — jedyny mechanizm persystencji; stan jest per-przeglądarka, nie współdzielony między użytkownikami
- **Dane kart są losowane przy każdym załadowaniu strony** — HP, ability, bonus, blocker, escape są losowane w `generateCardData()` przy inicjalizacji, więc zmieniają się po odświeżeniu
- **Media fallback** — dla wylosowanej osoby aplikacja próbuje kolejno: `.gif` → `.mp4` → `.webm` → normalny avatar PNG
- **Pokemon sprites** — tło strony i confetti w overlayzie korzystają z publicznego API PokeAPI (raw GitHub sprites)
