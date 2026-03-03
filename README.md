# Zadání semestrální práce

## Cíl práce

Cílem semestrální práce (SP) je navrhnout a částečně implementovat smysluplnou aplikaci s netriviálním, funkčně bohatým GUI, které uživateli skutečně pomáhá řešit konkrétní úlohu. Hlavní důraz je kladen na návrh uživatelského rozhraní, jeho strukturu, použitelnost a přiměřenou komplexnost, nikoliv na úplnost backendové logiky.

Práce má studentům umožnit prakticky si vyzkoušet návrh GUI v moderní technologii (typicky React + Material UI, případně jiná schválená technologie) a pochopit souvislosti mezi doménou aplikace, tokem práce uživatele a volbou konkrétních komponent.

Kvalita semestrální práce je také součástí finálního hodnocení zkoušky (viz v menu Zkouška), jinými slovy, čím lépe semestrální práci vypracujete, tím lepší známku z předmětu KIV/UUR získáte.

---

## Téma aplikace

Téma aplikace SP si navrhne student samostatně nejpozději do 5. týdne semestru. Doporučujeme zvolit doménu, která je vám blízká (studijně, profesně nebo zájmově) tak, abyste dokázali navrhnout smysluplné uživatelské rozhraní, které není samoúčelné.

Vámi navržené zadání SP musí být schváleno cvičícím. Při schvalování bude zohledněna zejména:

- smysluplnost aplikace a jejího účelu,
- přiměřená, ale zřetelná komplexnost GUI,
- reálný scénář použití a zamýšlené práce uživatele s aplikací.

Aplikace musí splňovat následující požadavky.

### 1) Netriviální struktura GUI

GUI musí tvořit ucelený pracovní celek, nikoliv jen náhodná sada formulářů a tlačítek. Rozhraní má být navrženo tak, aby:

- podporovalo jeden nebo více reálných uživatelských workflow (např.: konfigurace → zadání dat → jejich úprava → přehled → vizualizace),
- bylo zřejmé, že aplikace „k něčemu je", tj. má jasný účel a dokáže svému uživateli usnadnit práci.

### 2) Komplexní komponenty GUI

Je doporučeno použít alespoň dvě z následujících komponent:

- tabulka (Data Grid),
- stromová struktura (Tree View),
- vlastní vykreslovaná komponenta (např. graf, editor, panel složený z grafických primitiv).

Cílem je, aby aplikace nebyla triviální a umožnila práci s daty využitím struktur složitějších než jednoduchý formulář.

### 3) Hodnocení komplexnosti GUI

Komplexnost navrhovaného GUI demonstrujete cvičícímu při první prezentaci SP (pokud si s ní nejste jistí, tak během první prezentace se obvykle zadání ujasní).

Komplexnost GUI není hodnocena počtem samostatných oken, ale podle funkční a navigační bohatosti rozhraní. Aplikace musí splnit alespoň tři z následujících kritérií (případně jiná složitostně srovnatelná, která proberete se cvičícím):

- více funkčně odlišných pohledů / režimů práce (např. přehledový pohled, detail, editace, konfigurace, vizualizace)
- práce s jednou datovou sadou v různých reprezentacích (např. tabulka ↔ graf ↔ detail),
- oddělení hlavní pracovní plochy a konfigurační / nastavovací části aplikace.
- vícekrokový proces (wizard, průvodce, stavový workflow),
- hierarchická nebo kontextová navigace (např. strom, karty, boční panel, breadcrumb navigace),
- kontextově závislé ovládání (měnící se nástroje, panely nebo akce podle stavu aplikace),
- různé způsoby ovládání nebo herní režimy (např. běžná interakce × editovací mód × pauza × replay), přičemž význam vstupů a dostupné akce se mění podle aktuálního režimu.
- reakce na změny v čase nebo herním stavu (např. běžící simulace, tahy hráčů, cooldowny, animované přechody stavů) a jejich vhodná vizualizace uživateli (např. ubýhání času).
- průběžná zpětná vazba na akce uživatele (zvýraznění, animace, indikátory, efekty), která je důležitou součástí pochopení stavu aplikace či hry.
- kombinace hlavní herní nebo simulační scény s jednou či více informačními vrstvami (HUD, minimapa, stavové panely, kontextové nápovědy), které se dynamicky aktualizují a mohou být zapínatelné či přizpůsobitelné.

Dialogy typu „OK / Zrušit" nebo jednoduchá informační okna se do komplexnosti nezapočítávají.

### 4) Identifikace autora

Aplikace musí obsahovat:

- v záhlaví jméno studenta a osobní číslo,
- dialog „O aplikaci" se základními informacemi o autorovi a účelu aplikace.

---

## Funkčnost aplikace

Není nutné implementovat plně funkční aplikaci. Stačí:

- implementovat GUI a minimální logiku nutnou k jeho demonstraci,
- data mohou být simulována (statická, mockovaná),
- není povinná komunikace s databází nebo serverem.

Je možné propojit semestrální práci s jiným projektem, na kterém student pracuje.

Vyhněte se generickým zadáním typu „klient k databázi" bez jasné přidané hodnoty GUI.

---

## Konzultace a prezentace

Zadání je vhodné konzultovat do 5. týdne semestru osobně nebo emailem se svým cvičím.

Součástí práce jsou dvě povinné prezentace (viz v menu záložka Prezentace):

1. prezentace tématu a návrhu GUI (struktura, workflow, hlavní obrazovky) v polovině semestru, což upřesní zadání,
2. prezentace aktuálního stavu implementace na konci semestru.

---

## Odevzdání a dokumentace

Odevzdávaná aplikace musí být spustitelná. V archivu musí být readme soubor jednoznačně popisující, jak aplikaci spustit / spouštěcí skripty.

Součástí odevzdání je PDF dokumentace, která obsahuje:

- stručný popis aplikace a jejího účelu,
- vysvětlení funkcionality hlavních částí GUI a zdůvodnění jejich návrhu,
- zprávu o testování použitelnosti aplikace alespoň 3 testery,
  - jednotlivé zprávy,
  - shrnutí nalezených problémů a návrhů na zlepšení,
  - reakci autora na výsledky testování,
- vlastní zhodnocení, o které body z hodnocení semestrální práce usilujete a jak jste je naplnili.

### Odevzdávané soubory

- obě prezentace,
- zdrojové soubory a spustitelná aplikace ve verzi testované uživateli,
- zdrojové soubory a spustitelná aplikace po zapracování připomínek,
- zprávy od testerů,
- finální dokumentace k aplikaci.

> **Poznámka:** Při hodnocení je kladen důraz především na kvalitu návrhu GUI, jeho srozumitelnost, konzistenci a přiměřenou komplexnost odpovídající zvolenému tématu.

*Poslední změna: 06.02.2026*

---

## Hodnocení semestrální práce

Semestrální práce bude bodována – může být hodnocena až 60 body, přičemž je nutné získat nejméně 30 bodů (pokud byste měli nárok na víc bodů, ke zkoušce se přenese jen 60). Body se přenáší ke zkoušce a kvalita SP má tedy výrazný vliv na známku z předmětu. Protože zadání je v podstatě na Vás, tak zde uvedené bodování je spíš orientační a je možné udělit body podle našeho uvážení i za další věci.

Pro hodnocení je stěžení Vaše dokumentace – v závěru sepište a racionálně zhodnoťte, na jaké body aspirujete (včetně odkazů do kódu – kde jsou definovány tabulky, kde jsou lambda výrazy apod.), na základě tohoto návrhu budeme aplikaci kontrolovat.

### Bodování

- **Každá z prezentací** – 0–5 bodů (podle kvality přípravy a přednesení; nehodnotí se téma práce, ale jak je práce prezentována; vynechaná prezentace znamená ztrátu bodů).
- **Smysluplnost zadání** – 0–5 bodů (jak zajímavé a užitečné je zadání, tj. jak dobře je připraveno; nízké hodnocení je za generické zadání typu „rozhraní k databázi", bez nějakého vlastního nápadu).
- **Komplexnost aplikace** – 0–5 bodů (zhodnoťte a ve 2. prezentaci a v dokumentaci diskutujte, jak náročná práce byla, kolik reálně zabrala času či jaké znalosti byly potřeba k jejímu vytvoření; sledujte návrhy a prezentace Vašich kolegů, ať můžete posoudit náročnost své aplikace vůči ostatním SP).
- **Kvalita designu aplikace** – 0–5 bodů (dodržené vrstvení/rozdělení aplikace do modulů; správně udělaný návrh datového modelu; komunikace mezi moduly jen v definovaných bodech; celá aplikace v jedné třídě s jednou dlouhou metodou řešící všechno, není kvalitní design).
- **Fungování aplikace** – 0–5 bodů (body za plně funkční aplikaci – data lze ukládat a načítat z disku, všechny funkce jsou implementovány a nejde jen o demo).
- **Komplexní GUI** – 0–5 bodů (dvě okna mezi sebou komunikují – změny v jednom se automaticky projevují v nějakém dalším; body přiznány jen pokud to dává smysl pro úkol, který aplikace řeší, nevytvářejte uměle nepotřebná okna).
- **User experience** – 0–10 bodů (subjektivní hodnocení cvičícího; hodnotí jak dobře se mu program používal pro deklarovaný účel, jestli byly ovládací prvky na místech, kde je čekal, jestli aplikace patřičně reagovala na vstup, jestli se prvky neskrývaly v neviditelné části okna atd.).
- **Kontrola vstupů** – 0–5 bodů (do formulářových polí nejdou zadat nesmysly; uživatel je informován o tom, v čem je problém; pokud jde zadat neplatný vstup a aplikace kvůli němu spadne nebo se zachová nesmyslně, bude vrácena).
- **Reakce na testy** – 0–5 bodů (odpověď na odhalené chyby testerů, jejich oprava).
- **Čitelnost a srozumitelnost dokumentace** – 0–5 bodů (neobsahuje příliš překlepů; obsahuje všechny informace potřebné pro pochopení řešeného problému a pro její hodnocení).

---

- **Lambda výrazy k obsluhám** – 1 bod (správně použité, bez zbytečně rozsáhlého kódu).
- **Vlastní buňky v tabulkách, stromech** – 1–4 body (podle složitosti – kontrola vstupu, vykreslení vlastní komponenty).
- **Grafy** – 2–3 body (pokud mají smysl; bod navíc za další datové řady).
- **Využití tabulky** – 1–4 body (více bodů za tabulku, která neobsahuje jen String; plný počet pokud i přijímá vstupy; použití tabulky musí dávat vzhledem k úloze smysl).
- **Využití stromu** – 1–4 body (více bodů za strom, který neobsahuje jen String, plný počet pokud i přijímá vstup; použití stromu musí dávat vzhledem k úloze smysl).
- **Responzivita aplikace** – 3 body (jde měnit velikost okna nebo měnit okno a fullscreen, přičemž layout zůstává smysluplný).
- **Využití komponent nebo enginů třetích stran** – 1–4 body (podle složitosti použité technologie – např. herní engine, komponenta pro zobrazení grafu aj.)
- **Využití databáze pro backend** – 1–3 body (dle rozsahu využití – jedna tabulka s jedním sloupcem vs. komplexní model).
- **Vícejazyčnost aplikace** – 1–4 body (podle rozsahu překládaného obsahu a internacionalizace vstupů a výstupů).
- **Síťová komunikace** – 2 body
- **Ukládání stavu** – 1–5 bodů (podle složitosti stavu; uživatel může uložit rozpracovanou práci a pokračovat v ní po novém spuštění).
- **Využití CSS** – 2 body (vzhled aplikace v odděleném CSS souboru).
- **Aplikace Observable-Observer** – 2 body (View skutečně pozoruje datový model).
- **Využití bindingu** – 1–3 body (více bodů za netriviální binding – číslo v textové komponentě s ošetřením vstupu).
- **Spolupráce více zařízení** – 1–5 bodů (Desktop, chytré hodinky, telefon, server apod.).
- **Vlastní vykreslovaná komponenta** – 1–5 bodů (podle komplexity – nové tlačítko s jinou barvou je méně náročné než vlastní panel, do kterého jde kreslit myší).
- … (další komponenty a technologie podle uvážení)

---

> Naopak lze získat **záporné body** za prohřešky proti použitelnosti výsledného GUI (použití komponent na místech, kde se nehodí, použití nevhodných komponent pro zvolená data, nutnost zbytečných úkonů, nedostatečné kontroly vstupních dat vedoucí k problémům, nedostatek informací apod.)

---

Semestrální práci je nutné odevzdat do konce května (pokud jste se s vyučujícím nedohodli jinak).

**Pozdní odevzdání je penalizováno –5 body a následně –1 bodem za každý den prodlení.**
