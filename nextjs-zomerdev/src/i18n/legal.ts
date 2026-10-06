import type { Lang } from './translations'

/**
 * CONCEPTTEKSTEN — laat deze nakijken door een jurist of controleer ze grondig.
 * Velden tussen [[dubbele haken]] moeten door de eigenaar worden ingevuld; ze worden op de
 * pagina geel gemarkeerd. `npm run check:placeholders` faalt zolang er nog zo'n veld staat.
 */

export interface LegalBlock {
  heading: string
  paragraphs?: string[]
  items?: string[]
}

export interface LegalDoc {
  title: string
  description: string
  updated: string
  intro: string
  blocks: LegalBlock[]
}

export type LegalKey = 'privacy' | 'terms'

const privacyNl: LegalDoc = {
  title: 'Privacyverklaring',
  description: 'Hoe Zomer Development omgaat met persoonsgegevens: welke gegevens, waarom, met wie gedeeld en welke rechten je hebt.',
  updated: 'Laatst bijgewerkt: 6 oktober 2026',
  intro:
    'Zomer Development (KVK 98115561) respecteert je privacy. In deze verklaring lees je welke persoonsgegevens ik verwerk, waarom, met wie ik ze deel en welke rechten je hebt.',
  blocks: [
    {
      heading: 'Wie is verantwoordelijk?',
      paragraphs: [
        'Verwerkingsverantwoordelijke is Nick Zomer, handelend onder de naam Zomer Development, [[ADRES]], Wassenaar. KVK-nummer 98115561, btw-nummer [[BTW-NUMMER]].',
        'Vragen over privacy? Mail naar info@zomerdev.com.',
      ],
    },
    {
      heading: 'Welke gegevens verwerk ik en waarom?',
      items: [
        'Contactformulier: je naam, e-mailadres, het gekozen onderwerp en je bericht. Doel: je vraag beantwoorden en contact met je opnemen. Grondslag: gerechtvaardigd belang (je stelt zelf een vraag) en, als je klant wordt, uitvoering van de overeenkomst.',
        'E-mail en WhatsApp: als je mij mailt of appt, verwerk ik je e-mailadres of telefoonnummer en de inhoud van je berichten om te reageren. Grondslag: gerechtvaardigd belang.',
        'Klanten: contact- en factuurgegevens, afspraken en, bij remote IT-support, de technische gegevens die nodig zijn om mijn werk te doen. Doel: de opdracht uitvoeren en administratie voeren. Grondslag: uitvoering van de overeenkomst en wettelijke verplichting (fiscale bewaarplicht).',
        'Technische gegevens van de website: het IP-adres en gegevens over je verzoek (zoals tijdstip en pagina) worden door mijn hostingpartij verwerkt om de website te leveren en te beveiligen. Grondslag: gerechtvaardigd belang (veiligheid en beschikbaarheid).',
      ],
    },
    {
      heading: 'Cookies en lokale opslag',
      paragraphs: [
        'Deze website plaatst geen tracking- of marketingcookies en gebruikt geen analytics. In de lokale opslag van je browser onthoudt de site alleen je gekozen taal en je lichte/donkere weergave. Dat is functioneel, bevat geen persoonsgegevens en verlaat je apparaat niet. Daarom is er geen cookiebanner nodig.',
        'De lettertypen worden door de website zelf aangeboden; er worden geen gegevens naar Google Fonts gestuurd.',
      ],
    },
    {
      heading: 'Met wie deel ik gegevens (verwerkers)?',
      paragraphs: ['Ik deel gegevens alleen met partijen die ik nodig heb om mijn dienst te leveren:'],
      items: [
        'Cloudflare, Inc. (Verenigde Staten): hosting, CDN, DNS en beveiliging van deze website, en de serverfunctie die je contactformulier ontvangt. Cloudflare verwerkt technische verkeersgegevens zoals je IP-adres.',
        'Resend (Resend, Inc., Verenigde Staten): verstuurt de gegevens die je in het contactformulier invult als e-mail naar mijn mailbox.',
        '[[E-MAILPROVIDER van info@zomerdev.com — invullen of verwijderen]]: ontvangst en opslag van e-mail.',
        'WhatsApp (Meta Platforms Ireland Ltd.): alleen als je zelf via de WhatsApp-knop contact opneemt. Voor het berichtenverkeer gelden de voorwaarden en het privacybeleid van WhatsApp; ik zie je telefoonnummer en wat je stuurt.',
        'Met mijn verwerkers heb ik, waar vereist, een verwerkersovereenkomst of gelden de standaardvoorwaarden van de verwerker. Ik verkoop je gegevens nooit en gebruik ze niet voor reclame.',
      ],
    },
    {
      heading: 'Doorgifte buiten de EU',
      paragraphs: [
        'Cloudflare en Resend zijn gevestigd in de Verenigde Staten. Doorgifte gebeurt op basis van passende waarborgen, zoals het EU-U.S. Data Privacy Framework of standaardcontractbepalingen. [[CONTROLEER per verwerker welke waarborg geldt]]',
      ],
    },
    {
      heading: 'Hoe lang bewaar ik gegevens?',
      items: [
        'Berichten via het contactformulier, e-mail en WhatsApp: [[BEWAARTERMIJN, bijv. maximaal 12 maanden na afhandeling]].',
        'Administratie (facturen, overeenkomsten): 7 jaar, vanwege de fiscale bewaarplicht.',
        'Technische logs bij de hostingpartij: volgens hun standaard bewaartermijn, doorgaans kort.',
      ],
    },
    {
      heading: 'Beveiliging',
      paragraphs: [
        'Ik neem passende technische en organisatorische maatregelen: versleutelde verbindingen (HTTPS), toegangsbeveiliging (zoals sterke wachtwoorden en, waar mogelijk, tweestapsverificatie), en bij remote IT-support alleen toegang tot wat nodig is voor de opdracht.',
      ],
    },
    {
      heading: 'Jouw rechten',
      paragraphs: ['Je hebt het recht om:'],
      items: [
        'je gegevens in te zien en een kopie te vragen;',
        'onjuiste gegevens te laten corrigeren;',
        'je gegevens te laten verwijderen, of de verwerking te beperken;',
        'bezwaar te maken tegen de verwerking;',
        'je gegevens over te laten dragen (dataportabiliteit).',
      ],
    },
    {
      heading: 'Contact en klachten',
      paragraphs: [
        'Mail voor het uitoefenen van je rechten naar info@zomerdev.com; ik reageer binnen vier weken. Ben je het niet eens met hoe ik met je gegevens omga? Dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).',
        'Ik kan deze verklaring aanpassen. De meest recente versie staat altijd op deze pagina.',
      ],
    },
  ],
}

const privacyEn: LegalDoc = {
  title: 'Privacy statement',
  description: 'How Zomer Development handles personal data: which data, why, who it is shared with and what rights you have.',
  updated: 'Last updated: 6 October 2026',
  intro:
    'Zomer Development (Dutch Chamber of Commerce no. 98115561) respects your privacy. This statement explains which personal data I process, why, who I share it with and what rights you have.',
  blocks: [
    {
      heading: 'Who is responsible?',
      paragraphs: [
        'The data controller is Nick Zomer, trading as Zomer Development, [[ADDRESS]], Wassenaar, the Netherlands. Chamber of Commerce no. 98115561, VAT no. [[VAT NUMBER]].',
        'Questions about privacy? Email info@zomerdev.com.',
      ],
    },
    {
      heading: 'Which data do I process and why?',
      items: [
        'Contact form: your name, email address, the chosen subject and your message. Purpose: answering your question and getting in touch. Legal basis: legitimate interest (you ask the question yourself) and, if you become a client, performance of the contract.',
        'Email and WhatsApp: if you email or message me, I process your email address or phone number and the content of your messages in order to reply. Legal basis: legitimate interest.',
        'Clients: contact and invoice details, agreements and, for remote IT support, the technical data needed to do my work. Purpose: performing the assignment and keeping records. Legal basis: performance of the contract and legal obligation (tax retention).',
        'Technical website data: your IP address and details of your request (such as time and page) are processed by my hosting provider to deliver and secure the website. Legal basis: legitimate interest (security and availability).',
      ],
    },
    {
      heading: 'Cookies and local storage',
      paragraphs: [
        'This website does not set tracking or marketing cookies and does not use analytics. The site only stores your chosen language and light/dark display in your browser’s local storage. That is functional, contains no personal data and never leaves your device. A cookie banner is therefore not needed.',
        'Fonts are served by the website itself; no data is sent to Google Fonts.',
      ],
    },
    {
      heading: 'Who do I share data with (processors)?',
      paragraphs: ['I only share data with parties I need to deliver my service:'],
      items: [
        'Cloudflare, Inc. (United States): hosting, CDN, DNS and security of this website, and the server function that receives your contact form. Cloudflare processes technical traffic data such as your IP address.',
        'Resend (Resend, Inc., United States): sends the data you enter in the contact form as an email to my mailbox.',
        '[[EMAIL PROVIDER for info@zomerdev.com — fill in or remove]]: receiving and storing email.',
        'WhatsApp (Meta Platforms Ireland Ltd.): only if you contact me through the WhatsApp button. Messaging is governed by WhatsApp’s terms and privacy policy; I see your phone number and what you send.',
        'Where required I have a data processing agreement with my processors, or the processor’s standard terms apply. I never sell your data and do not use it for advertising.',
      ],
    },
    {
      heading: 'Transfers outside the EU',
      paragraphs: [
        'Cloudflare and Resend are based in the United States. Transfers rely on appropriate safeguards, such as the EU-U.S. Data Privacy Framework or standard contractual clauses. [[CHECK which safeguard applies per processor]]',
      ],
    },
    {
      heading: 'How long do I keep data?',
      items: [
        'Messages via the contact form, email and WhatsApp: [[RETENTION PERIOD, e.g. at most 12 months after the matter is closed]].',
        'Records (invoices, agreements): 7 years, due to Dutch tax retention rules.',
        'Technical logs at the hosting provider: according to their standard retention period, usually short.',
      ],
    },
    {
      heading: 'Security',
      paragraphs: [
        'I take appropriate technical and organisational measures: encrypted connections (HTTPS), access protection (such as strong passwords and, where possible, two-factor authentication), and, for remote IT support, access only to what the assignment requires.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: ['You have the right to:'],
      items: [
        'access your data and request a copy;',
        'have inaccurate data corrected;',
        'have your data deleted, or restrict its processing;',
        'object to the processing;',
        'data portability.',
      ],
    },
    {
      heading: 'Contact and complaints',
      paragraphs: [
        'To exercise your rights, email info@zomerdev.com; I will respond within four weeks. If you disagree with how I handle your data, you can file a complaint with the Dutch Data Protection Authority (autoriteitpersoonsgegevens.nl).',
        'I may update this statement. The latest version is always on this page.',
      ],
    },
  ],
}

const termsNl: LegalDoc = {
  title: 'Algemene voorwaarden',
  description: 'Algemene voorwaarden van Zomer Development voor web development en remote IT-support voor zakelijke opdrachtgevers.',
  updated: 'Laatst bijgewerkt: 6 oktober 2026',
  intro:
    'Deze voorwaarden gelden voor alle offertes, overeenkomsten en werkzaamheden van Zomer Development (KVK 98115561) en zijn bedoeld voor zakelijke opdrachtgevers.',
  blocks: [
    {
      heading: '1. Definities',
      items: [
        'Zomer Development: Nick Zomer, handelend onder de naam Zomer Development, gevestigd te Wassenaar, KVK 98115561.',
        'Opdrachtgever: de onderneming of rechtspersoon die met Zomer Development een overeenkomst sluit.',
        'Diensten: web development, remote IT-support en -beheer, advies en aanverwante werkzaamheden.',
      ],
    },
    {
      heading: '2. Toepasselijkheid',
      paragraphs: [
        'Deze voorwaarden zijn van toepassing op alle aanbiedingen en overeenkomsten. Afwijkingen gelden alleen als ze schriftelijk zijn overeengekomen. Voorwaarden van de opdrachtgever zijn niet van toepassing.',
      ],
    },
    {
      heading: '3. Offertes en totstandkoming',
      paragraphs: [
        'Offertes zijn vrijblijvend en geldig gedurende [[GELDIGHEID OFFERTE, bijv. 30 dagen]], tenzij anders vermeld. Een overeenkomst komt tot stand zodra de opdrachtgever de offerte schriftelijk (ook per e-mail) accepteert of Zomer Development met instemming van de opdrachtgever met de uitvoering begint. Prijzen zijn exclusief btw, tenzij anders vermeld. Vermelde "vanaf"-prijzen zijn indicatief; de definitieve prijs staat in de offerte.',
      ],
    },
    {
      heading: '4. Uitvoering en medewerking',
      paragraphs: [
        'Zomer Development voert de diensten uit naar beste inzicht en vermogen (inspanningsverplichting) en met de zorg van een goed vakman. Planningen en termijnen zijn indicatief, tenzij uitdrukkelijk als fatale termijn overeengekomen.',
        'De opdrachtgever zorgt tijdig voor alle informatie, content, toegang en medewerking die nodig zijn. Vertraging door het ontbreken daarvan komt voor rekening van de opdrachtgever.',
      ],
    },
    {
      heading: '5. Remote IT-support en beheer',
      items: [
        'De inhoud van een pakket (zoals Basis, Beheer of Op maat) en de bijbehorende reactietijden en werktijden staan in de offerte of het pakketoverzicht. Reactietijden zijn streefwaarden: [[REACTIETIJDEN en SERVICEUREN]].',
        'Voor werk op afstand geeft de opdrachtgever toegang tot systemen en accounts. Zomer Development gebruikt die toegang alleen voor de opdracht, gaat vertrouwelijk om met inloggegevens en geeft aan wanneer toegang niet meer nodig is.',
        'De opdrachtgever blijft verantwoordelijk voor eigen back-ups, tenzij back-upbeheer uitdrukkelijk onderdeel is van de overeenkomst. Wijzigingen aan systemen worden zo veel mogelijk vooraf afgestemd.',
        'Abonnementen en beheerovereenkomsten lopen [[DUUR, bijv. per maand]] en kunnen worden opgezegd met een opzegtermijn van [[OPZEGTERMIJN, bijv. 1 maand]].',
      ],
    },
    {
      heading: '6. Web development',
      items: [
        'Na oplevering heeft de opdrachtgever [[ACCEPTATIETERMIJN, bijv. 14 dagen]] om het werk te testen en gebreken te melden. Na die termijn geldt het werk als geaccepteerd. Gemelde gebreken worden binnen redelijke termijn hersteld.',
        'Wijzigingen buiten de afgesproken scope zijn meerwerk en worden na afstemming tegen het overeengekomen tarief in rekening gebracht.',
        'Hosting, domeinnamen en diensten van derden (zoals Cloudflare of een CMS) zijn onderworpen aan de voorwaarden van die partijen. Zomer Development is niet aansprakelijk voor hun tekortkomingen.',
      ],
    },
    {
      heading: '7. Tarieven en betaling',
      paragraphs: [
        'Facturen worden betaald binnen [[BETAALTERMIJN, bijv. 14 dagen]] na factuurdatum, zonder korting of verrekening. Bij te late betaling is de opdrachtgever van rechtswege in verzuim en is de wettelijke handelsrente verschuldigd, plus de redelijke kosten van invordering. Zomer Development mag de dienstverlening opschorten bij niet-tijdige betaling.',
        'Tarieven kunnen jaarlijks worden aangepast; bij lopende abonnementen wordt de opdrachtgever daarvan vooraf op de hoogte gesteld.',
      ],
    },
    {
      heading: '8. Intellectuele eigendom',
      paragraphs: [
        'Rechten van intellectuele eigendom op door Zomer Development ontwikkelde werken gaan over op de opdrachtgever, of worden aan de opdrachtgever in licentie gegeven, zoals in de offerte vermeld, zodra de volledige betaling is ontvangen. Zomer Development behoudt het recht om algemene kennis, componenten en onderliggende tools opnieuw te gebruiken en mag het werk, tenzij anders overeengekomen, als referentie in het portfolio tonen.',
      ],
    },
    {
      heading: '9. Geheimhouding en persoonsgegevens',
      paragraphs: [
        'Partijen houden vertrouwelijke informatie geheim. Verwerkt Zomer Development in opdracht persoonsgegevens, dan sluiten partijen op verzoek een verwerkersovereenkomst. Zie ook de privacyverklaring.',
      ],
    },
    {
      heading: '10. Aansprakelijkheid',
      paragraphs: [
        'Zomer Development is alleen aansprakelijk voor directe schade die het gevolg is van een toerekenbare tekortkoming. De aansprakelijkheid is beperkt tot [[AANSPRAKELIJKHEIDSBEPERKING, bijv. het factuurbedrag over de afgelopen 3 maanden, met een maximum van EUR ...]]. Aansprakelijkheid voor indirecte schade, zoals gederfde winst, gemiste besparingen, bedrijfsstagnatie en gegevensverlies, is uitgesloten. Deze beperkingen gelden niet bij opzet of bewuste roekeloosheid.',
        'Een claim vervalt als deze niet binnen [[KLACHTTERMIJN, bijv. 3 maanden]] nadat de opdrachtgever de schade ontdekte of redelijkerwijs had kunnen ontdekken, schriftelijk is gemeld.',
      ],
    },
    {
      heading: '11. Overmacht',
      paragraphs: [
        'Bij overmacht, waaronder storingen bij hosting- of netwerkpartijen, stroom- of internetuitval en cyberaanvallen buiten de invloedssfeer van Zomer Development, is Zomer Development niet gehouden tot nakoming en is geen schadevergoeding verschuldigd.',
      ],
    },
    {
      heading: '12. Beëindiging',
      paragraphs: [
        'Elke partij kan de overeenkomst met onmiddellijke ingang beëindigen bij een ernstige, niet binnen redelijke termijn hersteld tekortkoming van de andere partij, of bij faillissement of surseance van betaling. Reeds verrichte werkzaamheden worden betaald.',
      ],
    },
    {
      heading: '13. Klachten',
      paragraphs: [
        'Klachten meld je zo snel mogelijk, schriftelijk, via info@zomerdev.com. Ik reageer binnen 10 werkdagen en zoek samen met je naar een oplossing.',
      ],
    },
    {
      heading: '14. Toepasselijk recht en geschillen',
      paragraphs: [
        'Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in [[BEVOEGDE RECHTBANK, bijv. Rechtbank Den Haag]], tenzij de wet dwingend anders voorschrijft.',
      ],
    },
  ],
}

const termsEn: LegalDoc = {
  title: 'Terms and conditions',
  description: 'Terms and conditions of Zomer Development for web development and remote IT support for business clients.',
  updated: 'Last updated: 6 October 2026',
  intro:
    'These terms apply to all quotes, agreements and work of Zomer Development (Dutch Chamber of Commerce no. 98115561) and are intended for business clients.',
  blocks: [
    {
      heading: '1. Definitions',
      items: [
        'Zomer Development: Nick Zomer, trading as Zomer Development, based in Wassenaar, the Netherlands, Chamber of Commerce no. 98115561.',
        'Client: the business or legal entity that enters into an agreement with Zomer Development.',
        'Services: web development, remote IT support and management, advice and related work.',
      ],
    },
    {
      heading: '2. Applicability',
      paragraphs: [
        'These terms apply to all offers and agreements. Deviations only apply if agreed in writing. The client’s own terms do not apply.',
      ],
    },
    {
      heading: '3. Quotes and formation of the agreement',
      paragraphs: [
        'Quotes are non-binding and valid for [[QUOTE VALIDITY, e.g. 30 days]] unless stated otherwise. An agreement is formed when the client accepts the quote in writing (email included) or when Zomer Development starts work with the client’s consent. Prices exclude VAT unless stated otherwise. "From" prices are indicative; the final price is in the quote.',
      ],
    },
    {
      heading: '4. Performance and cooperation',
      paragraphs: [
        'Zomer Development performs the services to the best of its ability (best-efforts obligation) and with the care of a good professional. Schedules and deadlines are indicative unless expressly agreed as strict deadlines.',
        'The client provides all information, content, access and cooperation in good time. Delays caused by their absence are for the client’s account.',
      ],
    },
    {
      heading: '5. Remote IT support and management',
      items: [
        'The content of a package (such as Basic, Management or Custom) and the related response and service hours are set out in the quote or package overview. Response times are targets: [[RESPONSE TIMES and SERVICE HOURS]].',
        'For remote work the client grants access to systems and accounts. Zomer Development uses that access only for the assignment, treats credentials confidentially and indicates when access is no longer needed.',
        'The client remains responsible for its own backups unless backup management is expressly part of the agreement. Changes to systems are coordinated in advance wherever possible.',
        'Subscriptions and management agreements run [[TERM, e.g. monthly]] and can be terminated with a notice period of [[NOTICE PERIOD, e.g. 1 month]].',
      ],
    },
    {
      heading: '6. Web development',
      items: [
        'After delivery the client has [[ACCEPTANCE PERIOD, e.g. 14 days]] to test the work and report defects. After that period the work is deemed accepted. Reported defects are fixed within a reasonable time.',
        'Changes outside the agreed scope are additional work and are charged at the agreed rate after consultation.',
        'Hosting, domain names and third-party services (such as Cloudflare or a CMS) are subject to those parties’ terms. Zomer Development is not liable for their shortcomings.',
      ],
    },
    {
      heading: '7. Rates and payment',
      paragraphs: [
        'Invoices are payable within [[PAYMENT TERM, e.g. 14 days]] of the invoice date, without discount or set-off. In case of late payment the client is in default by operation of law and owes statutory commercial interest plus reasonable collection costs. Zomer Development may suspend services in case of late payment.',
        'Rates may be adjusted annually; for ongoing subscriptions the client will be notified in advance.',
      ],
    },
    {
      heading: '8. Intellectual property',
      paragraphs: [
        'Intellectual property rights in works developed by Zomer Development transfer to the client, or are licensed to the client, as stated in the quote, once full payment has been received. Zomer Development retains the right to reuse general knowledge, components and underlying tools and, unless agreed otherwise, may show the work in its portfolio as a reference.',
      ],
    },
    {
      heading: '9. Confidentiality and personal data',
      paragraphs: [
        'Parties keep confidential information secret. If Zomer Development processes personal data on behalf of the client, the parties will enter into a data processing agreement on request. See also the privacy statement.',
      ],
    },
    {
      heading: '10. Liability',
      paragraphs: [
        'Zomer Development is only liable for direct damage resulting from an attributable failure. Liability is limited to [[LIABILITY CAP, e.g. the invoiced amount over the past 3 months, up to a maximum of EUR ...]]. Liability for indirect damage, such as lost profit, missed savings, business interruption and data loss, is excluded. These limitations do not apply in case of intent or deliberate recklessness.',
        'A claim lapses if it has not been reported in writing within [[CLAIM PERIOD, e.g. 3 months]] after the client discovered, or reasonably could have discovered, the damage.',
      ],
    },
    {
      heading: '11. Force majeure',
      paragraphs: [
        'In case of force majeure, including outages at hosting or network providers, power or internet failure and cyberattacks outside Zomer Development’s control, Zomer Development is not obliged to perform and owes no compensation.',
      ],
    },
    {
      heading: '12. Termination',
      paragraphs: [
        'Either party may terminate the agreement with immediate effect in case of a serious breach by the other party that is not remedied within a reasonable time, or in case of bankruptcy or suspension of payments. Work already performed will be paid for.',
      ],
    },
    {
      heading: '13. Complaints',
      paragraphs: [
        'Please report complaints in writing as soon as possible at info@zomerdev.com. I respond within 10 working days and will look for a solution together with you.',
      ],
    },
    {
      heading: '14. Governing law and disputes',
      paragraphs: [
        'Dutch law applies to all agreements. Disputes are submitted to the competent court in [[COMPETENT COURT, e.g. The Hague District Court]], unless mandatory law provides otherwise.',
      ],
    },
  ],
}

export const legal: Record<LegalKey, Record<Lang, LegalDoc>> = {
  privacy: { nl: privacyNl, en: privacyEn },
  terms: { nl: termsNl, en: termsEn },
}
