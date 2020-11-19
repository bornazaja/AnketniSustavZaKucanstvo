# Anketni sustav za kućanstvo
Ovo je aplikacija koja se bavi anketiranjem kućanstava, odnosno prikupljanjem podataka o mjesečnoj potrošnji pojedinog kućanstva.

### Tehnologije
* C#
* Entity Framework
* ASP.NET MVC
* Bootstrap
* MS SQL Server
* Progressive web appliaction (PWA)

### Zahtjevi
* Instaliran Visual Studio
* Instaliran MS SQL Server Managament Studio

### Upute
* Preuzeti i *unzipati* projekt
* Pokrenuti SQL skriptu u MS SQL Server Managament Studiu koja se nalazi u mapi `AnketniSustavZaKucanstvo/AnketniSustavZaKucanstvoLibrary/sql/AnketniSutstavZaKucanstvoSkripta.sql`
* Po potrebi u projektu `AnketniSustavZaKucanstvoMVC` promijeniti *connection string* koji se nalazi u `Web.config` datoteci u *tagu* `<connectionStrings></connectionStrings>`
* Pokrenuti `AnketniSustavZaKucanstvoMVC` projekt u Visual Studiu

### Napomena
Preporuka je da se aplikacija isproba u Google Chromu za najbolje iskustvo.

### Testiranje "offline" *moda*
Za testiranje "offline" *moda*, potrebno je otići u opciju `More tools` -> `Developer tools` -> tab `Application` -> opcija u meniu `Service Workers` te označiti *checkbox* "offline".