# ELEVATOR PITCH
## Problema:
Il problema che vorremmo cercare di mitigare, più che risolvere perchè sarebbe utopistico, è quello degli incidenti stradali dovuti alle disattenzioni dei conducenti. Ci siamo resi conto che è molto facile distrarsi mentre si è alla guida per cui vorremmo cercare di aiutare i guidatori a prestare maggiore attenzione ai pericoli che 	li circonda.

## Soluzione:
La soluzione che abbiamo trovato è quella di creare un assistente alla guida facilmente installabile e utilizzabile da tutti gli utenti. La nostra soluzione utilizzerà dei sensori ad ultrasuoni e delle telecamere per individuare i pericoli. L'utente potrà interagire con l'assistente tramite uno schermo.
La nostra soluzione avtà integrata la possibilità di fare segnalazioni ai gestori delle infrastrutture stradali sulle condizioni delle strade oppure segnalare gli 	   incidenti.
## Team:
Il team è composto da:
- Bianchi Davide -> Capogruppo / Sviluppatore
- Ginisi Gabriele -> Sviluppatore
- Paci Emanuele -> Sviluppatore
## Roadmap:
Siamo partiti con l'idea di realizzare la nostra soluzione tramite un'applicazione per smartphone, facilmente installabile e utilizzabile dagli utenti. Questa 	applicazione avrebbe dovuto utilizzare le telecamere e i sensori del cellulare per trovare gli eventuali pericoli. Ci siamo, però, resi conto che questa soluzione non è realizzabile nel breve termine dato che sarebbe stato necessario spendere una cifra notevole per la libreria per utilizzare OpenCv su smartphone. A questo punto siamo passati a realizzare la nostra applicazione attraverso la libreria EEL per Python che permette di realizzare applicazioni in Python con GUI come se fosse una pagina web. Abbiamo collegato i sensori ad ultrasuoni tramite un Arduino e il GPS tramite porta seriale (è stato utilizzato un adattore USB-seriale). 
Siamo quindi passati alla realizzazione di un server che permetta la registrazione e il salvataggio delle segnalazioni che vengono fatte dagli utenti; questo server è stato scritto in PHP e comunica con un database a cui ci si interfaccia con il linguaggio SQL.
Infine, oltre a rilevare gli ostacoli attraverso l'utilizzo di sensori ad ultrasuoni, vorremo anche cercare di distiguere di che tipo di ostacolo si tratta (persona, macchina, moto...) attraverso l'utilizzo di alcune telecamere
