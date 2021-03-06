SELECT
	a.IDAnketa,
	k.IDKucanstvo,
	k.Sifra AS SifraKucanstva,
	vk.Ime + ' ' + vk.Prezime AS ImePrezimeVlasnika,
	vk.Ulica + ' ' + vk.KucniBroj AS Adresa,
	g.Naziv AS Grad,
	a.IznosHraneZaProsliMjesec,
	a.IznosRacunaZaProsliMjesec,
	a.IznosZabaveZaProsliMjesec,
	a.IznosOstalihIzdatakaZaProsliMjesec,
	v.Naziv AS Valuta
FROM Kucanstvo AS k
INNER JOIN Anketa AS a
ON k.IDKucanstvo = a.KucanstvoID
INNER JOIN VlasnikKucanstva AS vk
ON vk.IDVlasnikKucanstva = k.VlasnikKucanstvaID
INNER JOIN Grad AS g
ON g.IDGrad = vk.GradID
INNER JOIN Valuta AS v
ON v.IDValuta = a.ValutaID