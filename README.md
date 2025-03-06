# Praca Inżynierska - Implementacja Gry Planszowej w Postaci Aplikacji


- **Imię i Nazwisko**: Konrad Czaczkowski
- **Promotor**: dr. inż. Tomasz Grześ
- **Kierunek**: Informatyka Stosowana
- **Uczelnia**: Wyższa Szkoła Ekonomiczna w Białymstoku
- **Rok akademicki**: 2024/2025

## Opis projektu
Projekt polega na implementacji gry planszowej w postaci aplikacji webowej, umożliwiającej rozgrywkę wieloosobową przez Internet. Gra została zrealizowana z wykorzystaniem nowoczesnych technologii, takich jak **React**, **Next.js**, **Node.js**, **TypeScript** oraz **Socket.io**.


## Struktura projektu
Projekt składa się z dwóch głównych modułów:
1. **Klient**: Aplikacja kliencka znajdująca się w folderze `client`.
2. **Serwer**: Aplikacja serwerowa znajdująca się w folderze `server`.

## Wymagania systemowe
Aby uruchomić projekt, wymagane są następujące narzędzia i usługi:
1. **Node.js** (wersja 20.17.0 lub wyższa)
2. **MongoDB** (lokalna instalacja lub zdalne repozytorium, np. MongoDB Atlas)
3. **Skrzynka pocztowa e-mail** (np. Gmail) do wysyłania powiadomień i wiadomości

## Instrukcja uruchomienia
Aby uruchomić projekt, wykonaj następujące kroki:

### 1. Skonfiguruj pliki `.env`
- W folderze "client" i "server" utwórz pliki `.env` na podstawie znajdujących się tam plików `.env.example`.  
- Wypełnij wymagane zmienne środowiskowe.  

Do lokalnego uruchomienia projektu wymagana jest tylko konfiguracja poniższych zmiennych środowiskowych:
- **MONGODB_URI**: Connection string do bazy danych MongoDB.  
- **EMAIL_SERVICE**: Nazwa usługi e-mail (np. gmail).  
- **EMAIL_USER**: Adres e-mail do wysyłania wiadomości.  
- **EMAIL_PASSWORD**: Hasło aplikacji e-mail.  
- **EMAIL_FROM**: Adres e-mail nadawcy.

Aby umożliwić botowi wysyłanie wiadomości e-mail, należy skonfigurować konto e-mail (np. Gmail) i wygenerować hasło aplikacji, które zostanie użyte w zmiennej środowiskowej EMAIL_PASSWORD. W przypadku Gmaila, hasło aplikacji można wygenerować w ustawieniach konta, w sekcji Bezpieczeństwo > Dostęp do aplikacji.

### 2. Zainstaluj zależności
- W folderze `client` i `server` uruchom polecenie:
  ```bash
  npm install 
- W przypadku gdy nie uda się zainstalować zależności użyj flagi --force:
  ```bash 
  npm install --force

### 3. Skompiluj pliki źródłowe
- W folderze 'client' i 'server' wpisz polecenie 
  ```bash
  npm build
### 4. Uruchom projekt
- W folderze 'client' i 'server' wpisz polecenie
  ```bash
  npm run
- Uruchom przeglądarkę i w pasku adresu wpisz: 
  ```bash 
  http://localhost:3000
W przypadku innej konfiguracji zastąp 3000 skonfigurowanym portem.