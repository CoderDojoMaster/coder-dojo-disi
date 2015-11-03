conn = new Mongo();
db = conn.getDB("development");

db.counters.save(
    {
        _id: "faq",
        seq: 0
    }
);

db.counters.save(
    {
        _id:"events",
        seq:0
    }
);
db.counters.save(
    {
        _id:"mentors",
        seq:0
    }
);
db.counters.save(
    {
        _id:"courses",
        seq:0
    }
);
db.counters.save(
    {
        _id:"tutorials",
        seq:0
    }
);


function getNextSequence(name) {

    var ret = db.counters.findAndModify(
        {
            query: {_id: name},
            update: {$inc: {seq: 1}},
            new: true
        }
    );
    return ret.seq;
}

function addID(elem) {

    elem._id = getNextSequence(this.name);
}

var faqs = [
    {
        title:"Cos’è CoderDojo?",
        description:"CoderDojo è un movimento senza scopo di lucro che si occupa di organizzare incontri gratuiti per insegnare ai giovani a programmare. La parola nasce dall’unione di “coder”, una parola che in inglese indica colui che si occupa della programmazione e “dojo”, un termine giapponese che definisce il luogo di allenamento per le arti marziali. La filosofia è, quindi, quella di riunirsi insieme per imparare e/o consolidare le proprie conoscenze informatiche in diversi ambiti. I mentor sono i volontari che si mettono a disposizione per tenere gli incontri e affiancare i ragazzi nelle fase di apprendimento. CoderDojoDISI vuole riproporre questa realtà all’interno dell’Università degli studi di Trento, in particolare nel DISI, il Dipartimento di Ingegneria e Scienza dell’Informazione che si trova a Povo (TN). E’ rivolto in particolare a ragazze e ragazzi delle scuole superiori che hanno interesse ad approfondire uno o più degli argomenti fra un’introduzione alla programmazione (Python), l’area di game development e Web development."
    },
    {
        title: "A chi è rivolto CoderDojo?",
        description: "I destinatari sono ragazze e ragazzi delle scuole superiori interessati ad avventurarsi nel mondo della programmazione o ad approfondire le proprie conoscenze. Studenti universitari che non hanno occasione di incontrare la programmazione nel loro percorso di studi sono anch'essi benvenuti."
    },
    {
        title: "Che competenze sono necessarie per venire agli incontri?",
        description: "Il coderdojo è organizzato a sfide di diverso livello adatte a tutti, per cui se siete principanti potrete affrontare sfide che vi insegneranno le basi della programmazione, ma se siete già esperti ci sono sfide più avanzate che vi mostreranno concetti e tecnologie più complicate. Non è necessario essere geni per partecipare!"
    },
    {
        title:"E' necessario partecipare a tutti gli incontri?",
        description:"Assolutamente no! Il coderdojo non è una serie di lezioni, potete partecipare quando potete ed ad ogni incontro continuare il vostro percorso personale. Non ci sono problemi se saltate degli incontri o scoprite il coderdojo ad anno già iniziato."
    },
    {
        title:"Cosa dobbiamo portare agli incontri?",
        description:"La modalità è BYOD (porta il tuo device): portate il vostro portatile e poi ci pensiamo noi. Se volete risparmiare tempo potete installare in anticipo il software di riferimento delle attività che vi piacerebbe seguire.!"
    },
    {
        title:"Ho già partecipato/conosco il Coderdojo per i ragazzi più piccoli: quali sono le differenze?Che competenze sono necessarie per venire agli incontri?",
        description:"Ci sono differenze di contenuti (tecnologie più avanzate e meno didattiche) e di metodi didattici (meno improntata al seguire un tutorial e viene lasciata più liberta agli studenti), ma i principi sono gli stessi di tutti i Coderdojo: un ambiente libero ed amichevole per imparare i principi dell'informatica tutti insieme."
    }
];

var events = [
    {
        title:"Coding session",
        date:"2015-10-22T16:00:00.000Z",
        description:"Incontro organizzato da studenti di informatica per le ragazze ed i ragazzi delle scuole superiori interessati ad avventurarsi nel mondo della programmazione o ad approfondire le proprie conoscenze. Ci troviamo nell'aula Garda del Polo 1 (secondo piano, in ascensore tasto 1) al Polo Scientifico e Tecnologico Fabio Ferrari in via Sommarive 18, Povo (TN).",
        urls:{
            googleForm:"",
            facebook:"https://www.facebook.com/events/898277283585432/"
        }
    },
    {
        title:"CoderDojo Master",
        date:"2015-11-05T16:00:00.000Z",
        description:"Incontro organizzato da studenti di informatica per le ragazze ed i ragazzi delle scuole superiori interessati ad avventurarsi nel mondo della programmazione o ad approfondire le proprie conoscenze. Studenti universitari che non hanno occasione di incontrare la programmazione nel loro percorso di studi sono anch'essi benvenuti. Ci troviamo nell'aula Garda del Polo 1 (secondo piano, in ascensore tasto 1) al Polo Scientifico e Tecnologico Fabio Ferrari in via Sommarive 18, Povo (TN). Non è necessario aver partecipato agli incontri precedenti per partecipare a questo incontro! Ci saranno sia contenuti nuovi che la possibilità di partire con sfide introduttive. Se possibile vi chiediamo di registrarvi su facebook oppure attraverso il google form.",
        urls:{
            googleForm:"http://goo.gl/forms/tKlUvEv6Yi",
            facebook:"https://www.facebook.com/events/744668888996504/"
        }
    },
    {
        title:"CoderDojo Master",
        date:"2015-11-19T16:00:00.000Z",
        description:"",
        urls:{
            googleForm:"",
            facebook:""
        }
    },
];

var mentors = [
    {
        firstname:"Samuel",
        lastname:"Giacomelli",
        roles:["CoderDojo Mentor", "Website Guru"],
        imgUrl:"../static/img/Profile_pic/giacomelli_profile.jpg",
        description:"Sono uno studente di informatica, amante della montagna, degli sport di combattimento e della cucina. Fin da piccolo mi ha affascinato questo mondo e da quando ho iniziato a conoscerlo più approfonditamente il web developing è diventato la mia passione. Sono sempre stato un gran smanettone e quando non so come funziona qualcosa non me ne scollo finché non lo capisco. Per coderdojo sono il responsabile assieme a Michele del sito web."
    },
    {
        firstname:"Michele",
        lastname:"Romani",
        roles:["CoderDojo Mentor", "Website Guru"],
        imgUrl:"../static/img/Profile_pic/romani_profile.jpg",
        description:"Sono uno studente di Informatica ed appasionato di tecnologia,in particolare adoro il Web ed i videogames. Come mentor di Corderdojo mi occupo dei corsi di Game Development. Nel tempo libero porto avanti progetti personali di sviluppo software, per lo più siti web e Java, lavoro part-time quando capita e mi dedico ad attività sportive quali kick-boxe e scherma rinascimentale. Trovo ovviamente anche il tempo di uscire con gli amici e di dedicarmi ad attività ludiche, di leggere libri (molti) e di viaggiare. Sono fermamente convinto che il metodo migliore per imparare sia applicarsi con la pratica ed insegnare ad altri, per questo ho deciso di abbracciare la filosofia di knowledge-sharing che è il fondamento di CoderDojo. 'Tell me and I forget, teach me and I may remember, involve me and I learn.'"
    },
    {
        firstname:"Alessio",
        lastname:"Guerrieri",
        roles:["CoderDojo Master"],
        imgUrl:"../static/img/Profile_pic/guerrieri_profile.jpg",
        description:"Alessio ama la pallacanestro, la fantascienza, il fantasy, ed odia parlare in terza persona. Quando non è al computer (o con un buon libro), si diverte con giochi da tavolo in compagnia o con strane serie tv. Trova le astronavi più interessanti dei draghi, soprattutto quando senzienti. Nella vita vera ricerca metodi per utilizzare tanti computer in cluster per trovare connessioni fra persone."
    },
    {
        firstname:"Alessandro",
        lastname:"Bacchiega",
        roles:["CoderDojo Mentor"],
        imgUrl:"../static/img/Profile_pic/bacchiega_profile.jpg",
        description:"Sono uno studente di Infomatica del terzo anno. La scelta è stata dettata dalla volontà di conoscere un po' più in dettaglio il mondo dei computers e, più in generale, la tecnologia. All'apprendimento dei linguaggi di programmazione affianco l'interesse per argomenti strettamente correlati, come il funzionamento di Internet o il problem solving mediante la formulazione di algoritmi. Mi piace però anche stare all'aria aperta: corro, vado in mountain-bike, faccio Geocaching, etc... Nel poco tempo libero che mi rimane studio per mio conto pianoforte."
    },
    {
        firstname:"Alessia",
        lastname:"Tovo",
        roles:["CoderDojo Mentor"],
        imgUrl:"../static/img/Profile_pic/tovo_profile.jpg",
        description:"Sono una studentessa in Informatica in procinto di laurea. Definisco l'Informatica come la scelta più intelligentemente insensata che io abbia fatto in vita mia (fino ad ora). Ho varie conoscenze informatiche di base, con maggiore predisposizione per il front-end. Nel mio tempo libero mi piace correre, guardare film e leggere libri definiti “mattoni”. Ah, trovo anche il tempo di uscire con gli amici :-)"
    },
    {
        firstname:"Paolo",
        lastname:"Chistè",
        roles:["CoderDojo Mentor"],
        imgUrl:"../static/img/Profile_pic/chist%C3%A8_profile.jpg",
        description:"Sono uno studente di informatica, ho appena iniziato il terzo anno di università. Come Mentor mi occupo del corso di Game Development e Python. Oltre alla programmazione, sono appassionato di videogiochi e astronomia. Come sport pratico arrampicata sportiva, con modesti risultati."
    },
    {
        firstname:"Maria Pia",
        lastname:"Natale",
        roles:["CoderDojo Mentor"],
        imgUrl:"../static/img/Profile_pic/natale_profile.jpg",
        description:"Sono una studentessa di Informatica. Oltre ad essere il mio materiale di studio, l'informatica è la mia passione. Il mio scopo, come Mentor, è quello di provare a trasmettere questa passione anche ad altri ragazzi o ragazze che provano particolare interesse verso la programmazione e a persone che, come me, hanno iniziato il proprio percorso formativo in una scuola di stampo umanistico, come il liceo classico."
    },
    {
        firstname:"Umberto",
        lastname:"Peserico",
        roles:["CoderDojo Mentor"],
        imgUrl:"../static/img/Profile_pic/peserico_profile.jpg",
        description:"Sono uno studente di informatica del secondo anno. Ho cominciato a studiare e approfondire questa materia perché è una mia grande passione e credo che al giorno d'oggi debba essere parte della nostra vita. Per tale motivo penso sia necessario conoscerla a fondo. Sono appassionato di web development, system administration, database. Ho deciso di fare il mentor per trasmettere un po' delle mie conoscenze e passioni anche a persone che non hanno l'informatica come scienza preferita, ma comunque devono sapersi destreggiare con tali strumenti."
    },
    {
        firstname:"Michele 'Jazzinghen'",
        lastname:"Bianchi",
        roles:["CoderDojo External Collaborator"],
        imgUrl:"../static/img/Profile_pic/bianchi_profile.jpg",
        description:"Entrato in contatto con l'informatica da piccolissimo Michele è cresciuto assieme ai videogames. A 16 ha deciso che avrebbe creato una nazione per tutti gli appassionati per i videogame ed i computer abbandonati dalle proprie nazioni, sfruttati come mezzo per fare soldi e gli interessi di potenze grige. Dopotutto 'Cosa potrebbe mai andare storto?'. Dopo aver partecipato alle sue prime missioni a Trento, subito dopo le superiori, arriva a compiere lunghe missioni all'estero, tra cui Danimarca alla DTU e Giappone alla TokyoTech. Ha sempre aiutato gli altri invischiati nell" +"'"+" informatica, in quanto nessuno deve venir lasciato solo. Ora lavora per una forza multinazionale come agente specializzato in C++, GPU computing e GUI design. Porta ancora i segni del suo ultimo lavoro. Nel tempo libero si destreggia tra completare giochi senza uccidere nessuno, leggere 'The Edge', praticare Taiji Quan e, se il tempo permette, guardare Anime. Twitter: @Jazzinghen"
    },
    {
        firstname:"Giovanni",
        lastname:"De Toni",
        roles:["CoderDojo Mentor"],
        imgUrl:"../static/img/Profile_pic/detoni_profile.jpg",
        description:"Ho scoperto l'informatica alle superiori, grazie ad un altro gruppo di 'nerd' come me, e da allora non sono più riuscito a smettere.  Amo risolvere problemi e sperimentare nuove soluzioni e tecnologie. Durante il mio tempo libero leggo molto, sono un assiduo frequentatore di Wikipedia (a cui contribuisco leggermente) e, clima permettendo, mi diverto a fare trekking."
    },
    {
        firstname:"Fabio",
        lastname:"Da Rolt",
        roles:["CoderDojo Mentor"],
        imgUrl:"../static/img/Profile_pic/fabio_profile.jpg",
        description:"Ho cominciato a studiare informatica perchè sono sempre stato appassionato di videogiochi e volevo capire e comprendere come venissero sviluppati, capire cosa sta dietro l’utilizzo di un computer. Il CoderDojo è una grandissima occasione per insegnare alle persone che l’informatica non è qualcosa da subire e basta, ma è qualcosa su cui avere il controllo. Attraverso il CoderDojo cerco di promuovere valori come l’amicizia e l’aiuto reciproco, cercando di far capire che l’informatica dev’essere qualcosa di utile da poter sfruttare e non qualcosa che sostituisca le relazioni e le emozioni. Non conosco molti linguaggi, a livello base C++, Java e Phyton."
    },
    {
        firstname:"Elda",
        lastname:"Balliu",
        roles:["CoderDojo Mentor"],
        imgUrl:"../static/img/Profile_pic/balliu_profile.jpg",
        description:"Uno degli aspetti più importanti di informatica è risolvere i problemi. Ma quello che mi piace ancora di più sono le sfide continue che si incontrano durante il percorso. Io sono solo al secondo anno ma con tanta voglia di assimilare dal mondo di informatica e trovo molto affascinante l’idea di dare uno spunto ai giovani di conoscere e perchè no di diventare parte di questo mondo. Trovo abbastanza motivante il lavoro di gruppo e penso che i risultati migliori provengono dalla collaborazione. Being in a band is always a compromise. Provided that the balance is good, what you loss in compromise, you gain by collaboration.- M.Rutherford"
    },
    {
        firstname:"Giacomo",
        lastname:"Zara",
        roles:["CoderDojo Mentor"],
        imgUrl:"../static/img/Profile_pic/zara_profile.jpg",
        description:"Ho avuto il primo contatto con l’informatica alle superiori, attraverso alcuni cenni di programmazione nel corso di matematica ma soprattutto grazie all’amicizia che ancora mi lega con un compagno di classe che mi ha trasmesso personalmente una grande passione. Ora sono al secondo anno del corso di Informatica, e considero quella del CoderDojo un’opportunità importante per approfondire, e allo stesso tempo condividere, le mie conoscenze. Nel progetto mi occupo di Game Development, che è sicuramente uno dei rami della programmazione che più mi affascina."
    },
    {
        firstname:"Stefano",
        lastname:"Berlato",
        roles:["CoderDojo Mentor"],
        imgUrl:"../static/img/Profile_pic/berlato_profile.jpg",
        description:"Il primo approccio all’informatica l’ho avuto in terza superiore quando, di mia iniziativa, ho esordito nel mondo della programmazione con la creazione di una rudimentale versione di 'battaglia navale' nel linguaggio c++. Da allora mi sono sempre più interessato alla materia e adesso sono uno studente di informatica del secondo anno a Trento. Sono molto sportivo (gioco a calcio e alleno una squadra) e mi piacciono i videogame RPG. Come mentor di Corderdojo mi occupo dei corsi di Game Development."
    },
    {
        firstname:"“Perwise” Michael",
        lastname:"Aidoo",
        roles:["CoderDojo Mentor"],
        imgUrl:"../static/img/Profile_pic/aidoo_profile.JPG",
        description:"Sono uno studente di informatica, che pensa che l’informatica sia la nuova matematica, filosofia e letteratura di questa generazione. E tutto questo è per sottolineare l’importanza di questa nuova scienza, che sembra non aver limiti a livello di ricerca, scoperta e conoscenza. Come mentor di Coderdojo mi occupo dei corsi basi di web e programmi di base come [C++]. La mia vita non solo l’informatica, ma l’informatica è in tutto ciò che faccio; sono un musicista, suono la batteria e ho qualche nozione del basso elettrico. Mi piace leggere e dialogare con persone che non condannano la filosofia, ma che apprezzano anche la sua importanza a livello informatico. Ci sono diversi tipi di informatici e io sono quello che sostiene che l’informatica non è altro che la riflessione dell’essere attraverso la tecnologia. Do what you have to do, because more than thatyou can’t do. -"
    },
    {
        firstname:"'James' Luca",
        lastname:"Bosotti",
        roles:["CoderDojo Mentor"],
        imgUrl:"../static/img/Profile_pic/bosotti_profile.jpg",
        description:"Per me la tecnologia deve essere al servizio della creatività, trovo affascinante utilizzare l’informatica in ambiti in cui generalmente non è presente. Sono una persona curiosa e mi piace esplorare e scoprire cose nuove. Ho praticato moltisport in passato, quasi mai in maniera agonistica, passando dai classici come la pallavolo ad altri più curiosi come il golf fino al più recente: rievocazione del tiro con l’arco."
    },
    {
        firstname:"Sabina",
        lastname:"Lorenzi",
        roles:["CoderDojo Mentor"],
        imgUrl:"../static/img/Profile_pic/lorenzinew_profile.jpg",
        description:"Prima di dedicarmi all’informatica studiavo grafica e arte pubblicitaria. Ho cominciato ad interessarmi al soggetto alle superiori per pura curiosità e ora ne sono diventata dipendente. Adoro risolvere i suoi misteri ed i suoi enigmi logici. Proveniendo da un background così diverso, mi piace cercare di vedere il soggetto sotto un altro approccio e cercare di capire quando il mondo dell’arte e della computazione si sfiorano. Durante il tempo libero mi piace diversificare, leggere libri divulgativi e tenermi informata sul mondo dell’arte, e della tecnologia. “Computer programming is an art, because it applies accumulated knowledge to the world, because it requires skill and ingenuity, and especially because it produces objects of beauty.” Donald Knuth"
    },
    {
        firstname:"Sara",
        lastname:"Kalo",
        roles:["CoderDojo Mentor"],
        imgUrl:"../static/img/Profile_pic/kalonew_profile.jpg",
        description:"Ragazze e computer? L' informatica che inizialmente mi si è presentata come una sfida, è diventata sempre più una passione...curiosa e desiderosa di imparare spero di poter trasmettere ciò che imparo e che questa esperienza possa farmi crescere con voi. Come mentor mi occuperò della programmazione web. Conosci i tuoi limiti...oltrepassali!"
    }

];

var courses = [
    {
        title:"PYTHON",
        description:"Che le lingue siano importanti ai giorni d’oggi, questo è risaputo da tutti. Ma oltre all’inglese, al tedesco, al giapponese, all’arabo e alle altre lingue parlate in tutto il mondo, ci sono linguaggi che ci permettono di comunicare con i computers e sono davvero tantissimi! C, C++, Java, Ruby, ect, … Con Python vedrete dapprima la programmazione base partendo dall'utilizzo di variabili e strutture di controllo (if, for, while). In seguito si sperimenteranno tecniche più avanzate, utili anche negli altri percorsi come l'utilizzo di librerie, la programmazione ad oggetti e la programmazione multi-threaded.",
        type:"Development basis",
        imgUrl:"../static/img/python-logo-generic.svg"
    },
    {
        title:"HTML5, CSS3 E JAVASCRIPT",
        description:"In ogni istante vengono visualizzate nel mondo milioni di pagine Web. Ma la maggior parte delle persone che utilizzano Internet conosce davvero come sono realizzate? Qual è la struttura di base di un sito? Cosa c’è dietro ad un link, cosa si utilizza per rendere un sito accattivante? HTML, CSS e JS sono tre linguaggi che consentono di implementare una pagina Web. Con il primo si scrivono le istruzioni che compongono lo scheletro ed il contenuto di un sito, con il CSS è possibile definire a piacere l’aspetto, mentre JavaScript permette di gestire gli effetti dinamici interattivi.",
        type:"Web development",
        imgUrl:"../static/img/html5-css-javascript-logos.svg"
    },
    {
        title:"CONSTRUCT2 E UNITY",
        description:"Quante volte, giocando all'ultima versione del nostro videogame preferito, ci capita di pensare a quanto ci piacerebbe poter essere dalla parte di chi il gioco lo crea, piuttosto che di chi si limita a giocarci? Esistono moltissimi strumenti che permettono di vivere questa particolare esperienza, tra cui Unity e Construct. Construct e Unity sono due motori grafici, che ci forniscono strumenti di base per consentirci di sviluppare videogiochi in 2D e in 3D. Vedremo insieme come creare un progetto, gestire comportamenti e fisica di gioco, suono, grafica e tutti i componenti, tutto questo al fine di creare un semplice gioco.",
        type:"Game Development",
        imgUrl:"../static/img/construct2unity.svg"
    }
];

var tutorials = [
    {
        title:"",
        description:""
    }
];

faqs.forEach(addID, {name:"faq"});
events.forEach(addID, {name:"events"});
mentors.forEach(addID, {name:"mentors"});
courses.forEach(addID, {name:"courses"});
tutorials.forEach(addID, {name:"tutorials"});

db.faq.insert(faqs);
db.events.insert(events);
db.mentors.insert(mentors);
db.courses.insert(courses);
db.tutorials.insert(tutorials);