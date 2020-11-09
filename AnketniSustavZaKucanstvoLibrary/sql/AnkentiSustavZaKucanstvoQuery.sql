SELECT k.Sifra AS SifraKucanstva, vk.Ime + ' ' + vk.Prezime AS ImePrezimeVlasnika, vk.Ulica + ' ' + vk.KucniBroj AS Adresa, g.Naziv AS Grad, ak.IznosHraneZaProsliMjesec, ak.IznosRacunaZaProsliMjesec, ak.IznosZabaveZaProsliMjesec, ak.IznosOstalihIzdatakaZaProsliMjesec
FROM Kucanstvo AS K
INNER JOIN AnketaKucanstvo AS ak
ON k.IDKucanstvo = ak.KucanstvoID
INNER JOIN VlasnikKucanstva AS vk
ON vk.IDVlasnikKucanstva = k.VlasnikKucanstvaID
INNER JOIN Grad AS g
ON g.IDGrad = vk.GradID