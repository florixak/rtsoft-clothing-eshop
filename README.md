# Zadání semestrální práce

## Cíl práce

Cílem semestrální práce (SP) je navrhnout a částečně implementovat
smysluplnou aplikaci s netriviálním, funkčně bohatým GUI, které
uživateli skutečně pomáhá řešit konkrétní úlohu. Hlavní důraz je kladen
na návrh uživatelského rozhraní, jeho strukturu, použitelnost a
přiměřenou komplexnost, nikoliv na úplnost backendové logiky.

Práce má studentům umožnit prakticky si vyzkoušet návrh GUI v moderní
technologii (typicky React + Material UI, případně jiná schválená
technologie) a pochopit souvislosti mezi doménou aplikace, tokem práce
uživatele a volbou konkrétních komponent.

Kvalita semestrální práce je také součástí finálního hodnocení zkoušky
(viz v menu Zkouška). Čím lépe semestrální práci vypracujete, tím lepší
známku z předmětu KIV/UUR získáte.

------------------------------------------------------------------------

## Téma aplikace

Téma aplikace SP si navrhne student samostatně nejpozději do 5. týdne
semestru. Doporučujeme zvolit doménu, která je vám blízká (studijně,
profesně nebo zájmově), tak abyste dokázali navrhnout smysluplné
uživatelské rozhraní, které není samoúčelné.

Vámi navržené zadání SP musí být schváleno cvičícím. Při schvalování
bude zohledněna zejména:

-   smysluplnost aplikace a jejího účelu,
-   přiměřená, ale zřetelná komplexnost GUI,
-   reálný scénář použití a zamýšlené práce uživatele s aplikací.

------------------------------------------------------------------------

## Požadavky na aplikaci

### 1) Netriviální struktura GUI

GUI musí tvořit ucelený pracovní celek, nikoliv jen náhodná sada
formulářů a tlačítek. Rozhraní má:

-   podporovat jeden nebo více reálných uživatelských workflow (např.:
    konfigurace → zadání dat → úprava → přehled → vizualizace),
-   mít jasný účel a reálnou přidanou hodnotu pro uživatele.

### 2) Komplexní komponenty GUI

Doporučeno použít alespoň dvě z následujících komponent:

-   tabulka (Data Grid),
-   stromová struktura (Tree View),
-   vlastní vykreslovaná komponenta (např. graf, editor, panel složený z
    grafických primitiv).

Aplikace nemá být triviální a musí umožnit práci s daty pomocí
složitějších struktur než jednoduchý formulář.

### 3) Hodnocení komplexnosti GUI

Komplexnost je hodnocena podle funkční a navigační bohatosti, nikoliv
podle počtu oken.

Aplikace musí splnit alespoň tři z následujících kritérií:

-   více funkčně odlišných pohledů / režimů práce,
-   práce s jednou datovou sadou v různých reprezentacích,
-   oddělení hlavní pracovní plochy a konfigurační části,
-   vícekrokový proces (wizard),
-   hierarchická nebo kontextová navigace,
-   kontextově závislé ovládání,
-   různé režimy ovládání,
-   reakce na změny v čase nebo stavu,
-   průběžná zpětná vazba uživateli,
-   kombinace hlavní scény s informačními vrstvami.

Dialogy typu „OK / Zrušit" se do komplexnosti nezapočítávají.

### 4) Identifikace autora

Aplikace musí obsahovat:

-   v záhlaví jméno studenta a osobní číslo,
-   dialog „O aplikaci" s informacemi o autorovi a účelu aplikace.

------------------------------------------------------------------------

## Funkčnost aplikace

Není nutné implementovat plně funkční aplikaci. Stačí:

-   implementovat GUI a minimální logiku pro demonstraci,
-   použít simulovaná (mockovaná) data,
-   komunikace s databází nebo serverem není povinná.

Vyhněte se generickým zadáním typu „klient k databázi" bez přidané
hodnoty GUI.

------------------------------------------------------------------------

## Konzultace a prezentace

Zadání je vhodné konzultovat do 5. týdne semestru.

Součástí jsou dvě povinné prezentace:

1.  prezentace tématu a návrhu GUI (polovina semestru),
2.  prezentace implementace (konec semestru).

------------------------------------------------------------------------

## Odevzdání a dokumentace

Odevzdávaná aplikace musí být spustitelná a obsahovat README s návodem
ke spuštění.

Součástí odevzdání je PDF dokumentace obsahující:

-   popis aplikace a jejího účelu,
-   vysvětlení funkcionality GUI,
-   zprávu o testování použitelnosti (min. 3 testeři),
-   shrnutí problémů a návrhů na zlepšení,
-   reakci autora,
-   vlastní zhodnocení splněných bodů.

### Odevzdávané soubory

-   obě prezentace,
-   zdrojové soubory a aplikace (před i po úpravách),
-   zprávy od testerů,
-   finální dokumentace.

------------------------------------------------------------------------

## Hodnocení semestrální práce

Maximálně 60 bodů, minimum 30 bodů.

### Základní bodování

-   Prezentace (2×): 0--5 bodů
-   Smysluplnost zadání: 0--5 bodů
-   Komplexnost aplikace: 0--5 bodů
-   Kvalita designu: 0--5 bodů
-   Funkčnost aplikace: 0--5 bodů
-   Komplexní GUI: 0--5 bodů
-   User experience: 0--10 bodů
-   Kontrola vstupů: 0--5 bodů
-   Reakce na testy: 0--5 bodů
-   Dokumentace: 0--5 bodů

### Další bodované prvky

-   Lambda výrazy: 1 bod
-   Vlastní buňky: 1--4 body
-   Grafy: 2--3 body
-   Tabulka: 1--4 body
-   Strom: 1--4 body
-   Responzivita: 3 body
-   Komponenty třetích stran: 1--4 body
-   Databáze: 1--3 body
-   Vícejazyčnost: 1--4 body
-   Síťová komunikace: 2 body
-   Ukládání stavu: 1--5 bodů
-   CSS: 2 body
-   Observable-Observer: 2 body
-   Binding: 1--3 body
-   Spolupráce více zařízení: 1--5 bodů
-   Vlastní vykreslovaná komponenta: 1--5 bodů

Možné jsou i záporné body za závažné chyby použitelnosti.

------------------------------------------------------------------------

## Termín odevzdání

Semestrální práci je nutné odevzdat do konce května (pokud není
dohodnuto jinak).

-   Pozdní odevzdání: −5 bodů
-   Každý další den prodlení: −1 bod
