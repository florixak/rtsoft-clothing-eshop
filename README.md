# Průvodce nastavením a spuštěním aplikace

> Tento dokument popisuje, jak nastavit a spustit e-shop aplikaci **RTSoft Clothing Eshop**.

## Obsah

- [Požadavky](#požadavky)
- [Instalace](#instalace)
- [Spuštění aplikace](#spuštění-aplikace)
- [Dostupné skripty](#dostupné-skripty)
- [Struktura projektu](#struktura-projektu)

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

Aplikace bude dostupná na: **http://localhost:4173**

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

```
VITE_APP_URL=http://localhost:5173
VITE_STUDENT_NAME=
VITE_STUDENT_ID=
```

---

## Typické pracovní postupy

### Vývoj nové funkce

1. Spusťte vývojový server:
   ```bash
   pnpm dev
   ```

2. Otevřete aplikaci v prohlížeči na http://localhost:5173

3. Editujte soubory v `src/` - změny se projeví okamžitě

4. Spusťte linter, aby se ujistil korektnosti kódu:
   ```bash
   pnpm lint
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

3. Pokud vše funguje, můžete nasadit obsah `dist/` na produkční server

### Kontrola kódu

1. Spusťte linter:
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

## Kontakt a podpora

Pokud máte otázky nebo narazíte na problém:

1. Přečtěte si tuto příručku znovu
2. Zkontrolujte konzoli prohlížeče (F12 - Konzole)
3. Zkontrolujte terminál, kde běží `pnpm dev`
4. Kontaktujte vedoucího práce nebo cvičícího

---

**Poslední aktualizace:** 29. dubna 2026
