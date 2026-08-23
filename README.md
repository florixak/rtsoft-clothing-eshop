# Clothing Eshop

> E-commerce aplikace pro prodej oblečení s moderním uživatelským rozhraním

## O aplikaci

**Clothing Eshop** je plnohodnotná e-commerce aplikace zaměřená na prodej oblečení a módních doplňků. Aplikace poskytuje kompletní nákupní zážitek pro zákazníky i uživatelský panel pro správce prodejny.

### Klíčové vlastnosti

- 🛍️ **Katalog produktů** - Procházejte a filtrujte oblečení podle kategorií, ceny, velikosti a barvy
- 🛒 **Nákupní košík** - Spravujte své položky s možností úpravy quantidade
- 💳 **Bezpečný checkout** - Vícekrokový proces objednávky s ověřením údajů
- 🌍 **Vícejazyčnost** - Podpora pro češtinu a angličtinu
- 👤 **Účty uživatelů** - Přihlášení připravenými uživateli a správa objednávek
- 📊 **Administrační panel** - Dashboard pro správu objednávek, produktů a statistik
- 📱 **Responzivní design** - Funguje na desktopech, tabletech i mobilních zařízeních
- 🔍 **Vyhledávání a filtrování** - Pokročilé možnosti pro snadné vyhledání produktů
- 📈 **Analytika a grafy** - Přehledy tržeb a nejprodávanějších produktů

### Informace o autorovi

- **Autor**: Ondřej Pták
- **Škola**: Západočeská univerzita v Plzni
- **Předmět**: KIV/UUR - Návrh uživatelských rozhraní

---

## Obsah

- [O aplikaci](#o-aplikaci)
- [Přihlášení](#přihlášení)
- [Požadavky](#požadavky)
- [Instalace](#instalace)
- [Spuštění aplikace](#spuštění-aplikace)
- [Dostupné skripty](#dostupné-skripty)
- [Struktura projektu](#struktura-projektu)
- [Konfigurace prostředí](#konfigurace-prostředí)
- [Typické pracovní postupy](#typické-pracovní-postupy)
- [Technologický stack](#technologický-stack)
- [Řešení problémů](#řešení-problémů)
- [Nasazení do produkce](#nasazení-do-produkce)
- [Kontakt a podpora](#kontakt-a-podpora)

---

## 🚀 Rychlý start

Máte Node.js a pnpm nainstalované? Pak jde to jednoduše:

```bash
# 1. Klonujte projekt
git clone https://github.com/florixak/rtsoft-clothing-eshop.git
cd rtsoft-clothing-eshop

# 2. Instalujte závislosti
pnpm install

# 3. Spusťte aplikaci
pnpm dev

# 4. Otevřete prohlížeč
# Aplikace je dostupná na: http://localhost:5173
```

**Hotovo!** 🎉 Aplikace je spuštěná. Teď můžete začít vyvíjet!

---

## Přihlášení

Registrace v aplikaci zatím není. Na přihlašovací stránce jsou dva připravení uživatelé (klepnutí vyplní formulář):

| Uživatel | E-mail | Heslo | Co odemkne |
|---|---|---|---|
| Anna Novak | `customer@example.com` | `password123` | Wishlisty a objednávky |
| Admin User | `admin@example.com` | `admin123` | Admin |

---

## Požadavky

Před spuštěním aplikace se ujistěte, že máte nainstalováno:

- **Node.js** verze 18.0.0 nebo vyšší
  - Stažení: https://nodejs.org/
  - Ověření: `node --version`

- **pnpm** (doporučený správce balíčků)
  - Instalace: `npm install -g pnpm`
  - Ověření: `pnpm --version`
  - Alternativa: Lze použít také `npm` nebo `yarn`

- **Git** (pro klonování projektu)

---

## Instalace

### 1. Klonování projektu

```bash
git clone https://github.com/florixak/rtsoft-clothing-eshop.git
cd rtsoft-clothing-eshop
```

### 2. Instalace závislostí

Pomocí **pnpm** (doporučeno):

```bash
pnpm install
```

Nebo pomocí **npm**:

```bash
npm install
```

Nebo pomocí **yarn**:

```bash
yarn install
```

### 3. Ověření instalace

Zkontrolujte, že instalace proběhla bez chyb. Měl by existovat adresář `node_modules/` a soubor `pnpm-lock.yaml` (nebo `package-lock.json` / `yarn.lock`).

---

## Spuštění aplikace

### Vývojový režim (Development Server)

Spusťte místní vývojový server s hot-reload (změny se projeví okamžitě):

```bash
pnpm dev
```

Aplikace bude dostupná na: **http://localhost:5173**

Alternativa s npm:
```bash
npm run dev
```

### Produkční build

Vytvoří optimalizovanou verzi aplikace pro produkci:

```bash
pnpm build
```

Alternativa s npm:
```bash
npm run build
```

Výstup se uloží do adresáře `dist/`.

### Náhled produkčního buildu

Pokud chcete místně vidět, jak bude aplikace vypadat v produkci:

```bash
pnpm preview
```

Aplikace bude dostupná na: **http://localhost:5173**

---

## Dostupné skripty

| Příkaz | Popis |
|--------|-------|
| `pnpm dev` | Spustí vývojový server s hot-reload |
| `pnpm build` | Vytvoří optimalizovaný produkční build |
| `pnpm lint` | Spustí linter (ESLint) pro kontrolu kódu |
| `pnpm preview` | Zobrazí náhled produkčního buildu |

### Detaily skriptů

#### `pnpm dev`
- Spustí Vite vývojový server
- Umožňuje hot-reload (HMR - Hot Module Replacement)
- Ideální pro vývoj a ladění
- Server běží na portu 5173

#### `pnpm build`
- Zkompiluje TypeScript (`tsc -b`)
- Vytvoří produkční build pomocí Vite
- Optimalizuje kód a vytváří minifikované soubory
- Výstup je v adresáři `dist/`

#### `pnpm lint`
- Spustí ESLint pro kontrolu kódu
- Hledá chyby, varování a porušení konvencí
- Lze kombinovat s parametrem `--fix` pro automatické opravy

#### `pnpm preview`
- Spustí lokální server, který servuje produkční build
- Umožňuje vyzkoušet, jak aplikace funguje v produkci
- Vhodné pro testování před nasazením

---

## Struktura projektu

```
rtsoft-clothing-eshop/
├── src/
│   ├── components/          # React komponenty
│   │   ├── admin/          # Správcovské komponenty
│   │   ├── auth/           # Autentizační komponenty
│   │   ├── cart/           # Komponenty nákupního košíku
│   │   ├── catalog/        # Komponenty katalogu produktů
│   │   ├── checkout/       # Komponenty checkoutu
│   │   ├── layout/         # Layoutové komponenty (hlavička, patička, apod.)
│   │   ├── product/        # Komponenty detailu produktu
│   │   ├── ui/             # Základní UI komponenty
│   │   └── user/           # Komponenty uživatelského profilu
│   ├── hooks/              # Custom React hoky
│   ├── lib/                # Pomocné funkce a utilitky
│   ├── routes/             # Definice cest (TanStack Router)
│   ├── stores/             # State management (Zustand)
│   ├── types/              # TypeScript typy
│   ├── locales/            # Jazykové soubory (i18n)
│   ├── styles.css          # Globální CSS
│   └── main.tsx            # Vstupní bod aplikace
├── public/                 # Statické soubory
├── dist/                   # Produkční build (vytvořený po `pnpm build`)
├── package.json            # Specifikace projektu a závislostí
├── tsconfig.json           # Konfigurace TypeScriptu
├── vite.config.ts          # Konfigurace Vite
├── eslint.config.js        # Konfigurace ESLintu
└── README.md               # Zadání semestrální práce
```

---

## Konfigurace prostředí

### Vývojové prostředí (.env.local)

Projekt používá lokální soubor `.env.local` pro proměnné prostředí. Pokud potřebujete nastavit specifické proměnné:

1. Vytvořte soubor `.env.local` v kořenovém adresáři
2. Přidejte potřebné proměnné

```bash
# URL aplikace (pro vývoj)
VITE_APP_URL=http://localhost:5173

# Informace o studentovi (zobrazuje se v aplikaci)
VITE_STUDENT_NAME=Jméno
VITE_STUDENT_ID=Studentské Číslo
```

### Příprava na produkci

1. Zkompilujte a vytvořte build:
   ```bash
   pnpm build
   ```

2. Ověřte build lokálně:
   ```bash
   pnpm preview
   ```
   
   Aplikace bude dostupná na http://localhost:5173

3. Pokud vše funguje správně, můžete nasadit obsah `dist/` na produkční server

### Kontrola kódu

1. Spusťte linter pro zjištění problémů:
   ```bash
   pnpm lint
   ```

2. Pro automatické opravy některých problémů:
   ```bash
   pnpm lint -- --fix
   ```

---

## Technologický stack

Aplikace je vytvořena s následujícími technologiemi:

- **React 19** - Framework pro UI
- **TypeScript** - Typovaný JavaScript
- **Vite** - Build tool a vývojový server
- **TanStack Router** - Routing
- **TanStack React Query** - State management pro data
- **TanStack React Table** - Tabulkové komponenty
- **Tailwind CSS** - CSS framework
- **shadcn** - Předpřipravené UI komponenty
- **i18next** - Internacionalizace (čeština, angličtina)
- **Zustand** - Lightweight state management
- **ESLint** - Code linting

---

## Řešení problémů

### Problém: Příkaz `pnpm` není nalezen

**Řešení:**
```bash
# Instalace pnpm globálně
npm install -g pnpm

# Ověřte instalaci
pnpm --version
```

### Problém: Port 5173 je již využíván

**Řešení:**
```bash
# Vite automaticky použije další dostupný port
pnpm dev

# Nebo manuálně zadejte jiný port
pnpm dev -- --port 3000
```

### Problém: Chyby při instalaci závislostí

**Řešení:**
```bash
# Smažte cache
pnpm store prune
rm -rf node_modules pnpm-lock.yaml

# Nainstalujem znovu
pnpm install
```

### Problém: Aplikace se nezačne načítat

**Řešení:**
1. Otevřete konzolu prohlížeče (F12)
2. Zkontrolujte chyby v konzoli
3. Zkontrolujte terminál, kde běží `pnpm dev`
4. Vymažte cache prohlížeče (Ctrl+Shift+Delete nebo Cmd+Shift+Delete)
5. Obnovte stránku (F5 nebo Ctrl+R)

### Problém: CSS se neaplikuje správně

**Řešení:**
```bash
# Restartujte dev server
pnpm dev

# Pokud problém trvá, vymažte build cache
rm -rf dist
pnpm build
```

### Problém: TypeScript chyby

**Řešení:**
```bash
# Zkontrolujte typ chyb
pnpm build

# Opravte chyby v src/ nebo vymažte cache
pnpm lint -- --fix
```

---

### Lokální produkční server

Pro testování produkčního buildu lokálně:

```bash
pnpm build
pnpm preview
```

---

### Užitečné zdroje

- [React dokumentace](https://react.dev)
- [Vite dokumentace](https://vitejs.dev)
- [TanStack Router](https://tanstack.com/router/latest)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Poslední aktualizace:** 16. května 2026
