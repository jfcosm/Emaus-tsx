
export const translations = {
  es: {
    sidebar: {
      dashboard: 'Resumen',
      agenda: 'Agenda',
      sacraments: 'Sacramentos',
      documents: 'Documentos',
      settings: 'Configuración',
      logout: 'Cerrar Sesión',
      role: 'Secretaria',
      parish: 'Gestión Parroquial'
    },
    dashboard: {
      stats: {
        baptisms: 'Total Bautizos',
        marriages: 'Matrimonios',
        certificates: 'Certificados Emitidos',
        parishioners: 'Feligreses Activos',
        vs_prev: 'vs mes anterior'
      },
      sacramental_activity: 'Actividad Sacramental',
      upcoming_events: 'Próximos Eventos',
      view_full_agenda: 'Ver agenda completa',
      time_ranges: {
        last_6_months: 'Últimos 6 meses',
        this_year: 'Este año'
      }
    },
    sacraments: {
      title: 'Libros Sacramentales',
      subtitle: 'Gestione los registros oficiales de la parroquia',
      search_placeholder: 'Buscar por nombre, celebrante o fecha...',
      new_record: 'Nuevo Registro',
      export: 'Exportar',
      types: {
        Bautizo: 'Bautizo',
        Confirmación: 'Confirmación',
        Matrimonio: 'Matrimonio',
        Defunción: 'Defunción',
        'Primera Comunión': 'Primera Comunión'
      },
      table: {
        name: 'Nombre',
        date: 'Fecha',
        celebrant: 'Celebrante',
        book_page: 'Libro / Pág',
        actions: 'Acciones',
        view_details: 'Ver Ficha',
        no_records: 'No se encontraron registros.'
      },
      detail: {
        editing: 'Editando Registro',
        record_id: 'Registro ID',
        edit: 'Editar Datos',
        cancel: 'Cancelar',
        save: 'Guardar Cambios',
        parents: 'Padres',
        godparents: 'Padrinos / Testigos',
        observations: 'Observaciones',
        book_data: 'Datos del Registro',
        book: 'Libro',
        page: 'Página',
        parish: 'Parroquia / Lugar'
      }
    },
    agenda: {
      title: 'Agenda Parroquial',
      new_event: 'Nuevo Evento',
      upcoming: 'Próximos Eventos',
      no_events: 'No hay eventos próximos.',
      modal: {
        title: 'Nuevo Evento',
        event_title: 'Título del Evento',
        date: 'Fecha',
        time: 'Hora',
        type: 'Tipo',
        location: 'Lugar',
        cancel: 'Cancelar',
        save: 'Guardar Evento',
        types: {
          Misa: 'Misa',
          Sacramento: 'Sacramento',
          Reunión: 'Reunión',
          Otro: 'Otro'
        }
      }
    },
    documents: {
      title: 'Mis Documentos',
      new_document: 'Nuevo Documento',
      search: 'Buscar...',
      items: 'elementos',
      empty_folder: 'Carpeta vacía',
      create_title: 'Crear Nuevo Documento',
      create_subtitle: 'Seleccione una plantilla base o comience desde cero.',
      blank_doc: 'Documento en Blanco',
      start_scratch: 'Comenzar desde cero',
      use_template: 'Usar Plantilla',
      cancel_back: 'Cancelar y volver',
      save: 'Guardar',
      close: 'Cerrar',
      untitled: 'Documento sin título'
    },
    landing: {
      nav: {
        features: 'Características',
        benefits: 'Beneficios',
        plans: 'Planes',
        demo: 'Ver Demo',
        login: 'Iniciar Sesión',
        client_access: 'Acceso Clientes',
        demo_quick: 'Ver Demo (Acceso Rápido)'
      },
      hero: {
        badge: 'Gestión Parroquial 2.0',
        title_start: 'Digitalice la misión de su',
        title_highlight: 'Parroquia',
        subtitle: 'Emaús ordena el caos administrativo, protege la historia sacramental y libera tiempo para lo verdaderamente importante: la pastoral.',
        cta_access: 'Acceder a la Plataforma',
        cta_plans: 'Ver Planes'
      },
      mockup: {
        sacrament: 'Sacramento',
        baptism_card: 'Ficha de Bautismo',
        verified: 'VERIFICADO',
        name_label: 'Nombre del Bautizado',
        date_label: 'Fecha',
        book_label: 'Libro / Pág',
        parents_label: 'Padres',
        generate_btn: 'Generar Certificado Oficial',
        popup_db: 'Base de Datos',
        popup_db_sub: 'Registro Digitalizado',
        popup_search: 'Búsqueda',
        popup_search_sub: 'Ficha Encontrada',
        popup_docs: 'Documentos',
        popup_docs_sub: 'Certificado Generado',
        popup_peace: 'Gestión ágil y paz mental',
        popup_peace_sub: 'Para toda la parroquia'
      },
      features: {
        title: 'Todo lo que su secretaría necesita',
        subtitle: 'Emaús reemplaza múltiples herramientas desconectadas por una plataforma unificada diseñada específicamente para la Iglesia.',
        digital_sacraments: 'Sacramentos Digitales',
        digital_sacraments_desc: 'Digitalice Bautizos, Matrimonios y Confirmaciones. Búsquedas instantáneas por nombre o fecha.',
        certs: 'Certificados en 1 Clic',
        certs_desc: 'Generación automática de certificados oficiales listos para imprimir.',
        agenda: 'Agenda Pastoral',
        agenda_desc: 'Coordine misas, confesiones y reuniones parroquiales en un calendario centralizado.',
        btn_more: 'Conocer más características'
      },
      plans: {
        title: 'Planes diseñados para cada comunidad',
        subtitle: 'Elija la opción que mejor se adapte al tamaño y necesidades de su parroquia.',
        basic: {
          name: 'Plan Básico',
          desc: 'Para parroquias pequeñas o capillas.',
          items: ['Agenda Parroquial', 'Registro de Sacramentos', 'Certificados Automáticos'],
          btn: 'Comenzar'
        },
        advanced: {
          tag: 'Recomendado',
          name: 'Plan Avanzado',
          desc: 'Gestión integral sin límites.',
          items: ['Todo lo del Plan Básico', 'Editor de Documentos (WYSIWYG)', 'Generador de Afiches', 'Reportes y Estadísticas', 'Soporte Prioritario'],
          btn: 'Obtener Plan Completo'
        }
      },
      testimonials: {
        quote: '"Emaús ha transformado nuestra oficina parroquial"',
        text: 'Antes pasábamos horas buscando partidas de bautismo en libros antiguos. Ahora, con Emaús, entregamos certificados en segundos.',
        author_role: 'Párroco',
        stat_time: 'Menos tiempo en trámites',
        stat_backup: 'Registros respaldados en la nube',
        privacy: 'Privacidad Total',
        privacy_desc: 'Acceso restringido por usuario y encriptación de grado bancario.'
      },
      footer: {
        designed: 'Diseñado para servir a la Iglesia.',
        developed: 'Emaús es una app desarrollada por'
      },
      login: {
        welcome: 'Bienvenido a Emaús',
        subtitle: 'Ingrese sus credenciales para acceder a la plataforma.',
        user: 'Usuario (Email)',
        pass: 'Contraseña',
        btn: 'Ingresar',
        verifying: 'Verificando...',
        forgot: '¿Olvidó su contraseña?',
        contact: 'Contacte a Soporte',
        secure: 'Acceso seguro encriptado SSL 256-bit'
      }
    }
  },
  en: {
    sidebar: {
      dashboard: 'Dashboard',
      agenda: 'Calendar',
      sacraments: 'Sacraments',
      documents: 'Documents',
      settings: 'Settings',
      logout: 'Log Out',
      role: 'Secretary',
      parish: 'Parish Management'
    },
    dashboard: {
      stats: {
        baptisms: 'Total Baptisms',
        marriages: 'Marriages',
        certificates: 'Certificates Issued',
        parishioners: 'Active Parishioners',
        vs_prev: 'vs prev month'
      },
      sacramental_activity: 'Sacramental Activity',
      upcoming_events: 'Upcoming Events',
      view_full_agenda: 'View full calendar',
      time_ranges: {
        last_6_months: 'Last 6 months',
        this_year: 'This year'
      }
    },
    sacraments: {
      title: 'Sacramental Books',
      subtitle: 'Manage official parish records',
      search_placeholder: 'Search by name, celebrant or date...',
      new_record: 'New Record',
      export: 'Export',
      types: {
        Bautizo: 'Baptism',
        Confirmación: 'Confirmation',
        Matrimonio: 'Marriage',
        Defunción: 'Death',
        'Primera Comunión': 'First Communion'
      },
      table: {
        name: 'Name',
        date: 'Date',
        celebrant: 'Celebrant',
        book_page: 'Book / Page',
        actions: 'Actions',
        view_details: 'View Details',
        no_records: 'No records found.'
      },
      detail: {
        editing: 'Editing Record',
        record_id: 'Record ID',
        edit: 'Edit Data',
        cancel: 'Cancel',
        save: 'Save Changes',
        parents: 'Parents',
        godparents: 'Godparents / Witnesses',
        observations: 'Observations',
        book_data: 'Registry Data',
        book: 'Book',
        page: 'Page',
        parish: 'Parish / Place'
      }
    },
    agenda: {
      title: 'Parish Calendar',
      new_event: 'New Event',
      upcoming: 'Upcoming Events',
      no_events: 'No upcoming events.',
      modal: {
        title: 'New Event',
        event_title: 'Event Title',
        date: 'Date',
        time: 'Time',
        type: 'Type',
        location: 'Location',
        cancel: 'Cancel',
        save: 'Save Event',
        types: {
          Misa: 'Mass',
          Sacramento: 'Sacrament',
          Reunión: 'Meeting',
          Otro: 'Other'
        }
      }
    },
    documents: {
      title: 'My Documents',
      new_document: 'New Document',
      search: 'Search...',
      items: 'items',
      empty_folder: 'Empty folder',
      create_title: 'Create New Document',
      create_subtitle: 'Select a base template or start from scratch.',
      blank_doc: 'Blank Document',
      start_scratch: 'Start from scratch',
      use_template: 'Use Template',
      cancel_back: 'Cancel and return',
      save: 'Save',
      close: 'Close',
      untitled: 'Untitled Document'
    },
    landing: {
      nav: {
        features: 'Features',
        benefits: 'Benefits',
        plans: 'Plans',
        demo: 'View Demo',
        login: 'Login',
        client_access: 'Client Access',
        demo_quick: 'View Demo (Quick Access)'
      },
      hero: {
        badge: 'Parish Management 2.0',
        title_start: 'Digitalize the mission of your',
        title_highlight: 'Parish',
        subtitle: 'Emaús organizes administrative chaos, protects sacramental history, and frees up time for what truly matters: pastoral care.',
        cta_access: 'Access Platform',
        cta_plans: 'View Plans'
      },
      mockup: {
        sacrament: 'Sacrament',
        baptism_card: 'Baptism Record',
        verified: 'VERIFIED',
        name_label: 'Baptized Name',
        date_label: 'Date',
        book_label: 'Book / Page',
        parents_label: 'Parents',
        generate_btn: 'Generate Official Certificate',
        popup_db: 'Database',
        popup_db_sub: 'Digitized Record',
        popup_search: 'Search',
        popup_search_sub: 'Record Found',
        popup_docs: 'Documents',
        popup_docs_sub: 'Certificate Generated',
        popup_peace: 'Agile management & peace of mind',
        popup_peace_sub: 'For the whole parish'
      },
      features: {
        title: 'Everything your office needs',
        subtitle: 'Emaús replaces multiple disconnected tools with a unified platform designed specifically for the Church.',
        digital_sacraments: 'Digital Sacraments',
        digital_sacraments_desc: 'Digitize Baptisms, Marriages, and Confirmations. Instant searches by name or date.',
        certs: '1-Click Certificates',
        certs_desc: 'Automatic generation of official certificates ready to print.',
        agenda: 'Pastoral Calendar',
        agenda_desc: 'Coordinate masses, confessions, and parish meetings in a centralized calendar.',
        btn_more: 'Learn more features'
      },
      plans: {
        title: 'Plans designed for every community',
        subtitle: 'Choose the option that best fits the size and needs of your parish.',
        basic: {
          name: 'Basic Plan',
          desc: 'For small parishes or chapels.',
          items: ['Parish Calendar', 'Sacrament Registry', 'Automatic Certificates'],
          btn: 'Get Started'
        },
        advanced: {
          tag: 'Recommended',
          name: 'Advanced Plan',
          desc: 'Unlimited comprehensive management.',
          items: ['Everything in Basic', 'Document Editor (WYSIWYG)', 'Poster Generator', 'Reports & Analytics', 'Priority Support'],
          btn: 'Get Full Plan'
        }
      },
      testimonials: {
        quote: '"Emaús has transformed our parish office"',
        text: 'We used to spend hours searching for baptism records in old books. Now, with Emaús, we issue certificates in seconds.',
        author_role: 'Parish Priest',
        stat_time: 'Less time on paperwork',
        stat_backup: 'Records backed up in cloud',
        privacy: 'Total Privacy',
        privacy_desc: 'Restricted access per user and bank-grade encryption.'
      },
      footer: {
        designed: 'Designed to serve the Church.',
        developed: 'Emaús is an app developed by'
      },
      login: {
        welcome: 'Welcome to Emaús',
        subtitle: 'Enter your credentials to access the platform.',
        user: 'User (Email)',
        pass: 'Password',
        btn: 'Login',
        verifying: 'Verifying...',
        forgot: 'Forgot password?',
        contact: 'Contact Support',
        secure: 'Secure SSL 256-bit encryption'
      }
    }
  },
  it: {
    sidebar: {
      dashboard: 'Riepilogo',
      agenda: 'Agenda',
      sacraments: 'Sacramenti',
      documents: 'Documenti',
      settings: 'Impostazioni',
      logout: 'Esci',
      role: 'Segretaria',
      parish: 'Gestione Parrocchiale'
    },
    dashboard: {
      stats: {
        baptisms: 'Totale Battesimi',
        marriages: 'Matrimoni',
        certificates: 'Certificati Emessi',
        parishioners: 'Fedeli Attivi',
        vs_prev: 'rispetto al mese prec.'
      },
      sacramental_activity: 'Attività Sacramentale',
      upcoming_events: 'Prossimi Eventi',
      view_full_agenda: 'Vedi agenda completa',
      time_ranges: {
        last_6_months: 'Ultimi 6 mesi',
        this_year: 'Quest\'anno'
      }
    },
    sacraments: {
      title: 'Libri Sacramentali',
      subtitle: 'Gestisci i registri ufficiali della parrocchia',
      search_placeholder: 'Cerca per nome, celebrante o data...',
      new_record: 'Nuovo Registro',
      export: 'Esporta',
      types: {
        Bautizo: 'Battesimo',
        Confirmación: 'Cresima',
        Matrimonio: 'Matrimonio',
        Defunción: 'Defunto',
        'Primera Comunión': 'Prima Comunione'
      },
      table: {
        name: 'Nome',
        date: 'Data',
        celebrant: 'Celebrante',
        book_page: 'Libro / Pag',
        actions: 'Azioni',
        view_details: 'Vedi Scheda',
        no_records: 'Nessun registro trovato.'
      },
      detail: {
        editing: 'Modifica Registro',
        record_id: 'ID Registro',
        edit: 'Modifica Dati',
        cancel: 'Annulla',
        save: 'Salva Modifiche',
        parents: 'Genitori',
        godparents: 'Padrini / Testimoni',
        observations: 'Osservazioni',
        book_data: 'Dati del Registro',
        book: 'Libro',
        page: 'Pagina',
        parish: 'Parrocchia / Luogo'
      }
    },
    agenda: {
      title: 'Agenda Parrocchiale',
      new_event: 'Nuovo Evento',
      upcoming: 'Prossimi Eventi',
      no_events: 'Nessun evento imminente.',
      modal: {
        title: 'Nuovo Evento',
        event_title: 'Titolo Evento',
        date: 'Data',
        time: 'Ora',
        type: 'Tipo',
        location: 'Luogo',
        cancel: 'Annulla',
        save: 'Salva Evento',
        types: {
          Misa: 'Messa',
          Sacramento: 'Sacramento',
          Reunión: 'Riunione',
          Otro: 'Altro'
        }
      }
    },
    documents: {
      title: 'I Miei Documenti',
      new_document: 'Nuovo Documento',
      search: 'Cerca...',
      items: 'elementi',
      empty_folder: 'Cartella vuota',
      create_title: 'Crea Nuovo Documento',
      create_subtitle: 'Seleziona un modello o inizia da zero.',
      blank_doc: 'Documento Vuoto',
      start_scratch: 'Inizia da zero',
      use_template: 'Usa Modello',
      cancel_back: 'Annulla e torna',
      save: 'Salva',
      close: 'Chiudi',
      untitled: 'Documento senza titolo'
    },
    landing: {
      nav: {
        features: 'Funzionalità',
        benefits: 'Benefici',
        plans: 'Piani',
        demo: 'Vedi Demo',
        login: 'Accedi',
        client_access: 'Area Clienti',
        demo_quick: 'Vedi Demo (Accesso Rapido)'
      },
      hero: {
        badge: 'Gestione Parrocchiale 2.0',
        title_start: 'Digitalizza la missione della tua',
        title_highlight: 'Parrocchia',
        subtitle: 'Emaús ordina il caos amministrativo, protegge la storia sacramentale e libera tempo per ciò che conta davvero: la pastorale.',
        cta_access: 'Accedi alla Piattaforma',
        cta_plans: 'Vedi Piani'
      },
      mockup: {
        sacrament: 'Sacramento',
        baptism_card: 'Scheda di Battesimo',
        verified: 'VERIFICATO',
        name_label: 'Nome del Battezzato',
        date_label: 'Data',
        book_label: 'Libro / Pag',
        parents_label: 'Genitori',
        generate_btn: 'Genera Certificato Ufficiale',
        popup_db: 'Database',
        popup_db_sub: 'Registro Digitalizzato',
        popup_search: 'Ricerca',
        popup_search_sub: 'Scheda Trovata',
        popup_docs: 'Documenti',
        popup_docs_sub: 'Certificato Generato',
        popup_peace: 'Gestione agile e serenità',
        popup_peace_sub: 'Per tutta la parrocchia'
      },
      features: {
        title: 'Tutto ciò di cui il tuo ufficio ha bisogno',
        subtitle: 'Emaús sostituisce molteplici strumenti scollegati con una piattaforma unificata progettata specificamente per la Chiesa.',
        digital_sacraments: 'Sacramenti Digitali',
        digital_sacraments_desc: 'Digitalizza Battesimi, Matrimoni e Cresime. Ricerche istantanee per nome o data.',
        certs: 'Certificati in 1 Click',
        certs_desc: 'Generazione automatica di certificati ufficiali pronti per la stampa.',
        agenda: 'Agenda Pastorale',
        agenda_desc: 'Coordina messe, confessioni e riunioni parrocchiali in un calendario centralizzato.',
        btn_more: 'Scopri altre funzionalità'
      },
      plans: {
        title: 'Piani progettati per ogni comunità',
        subtitle: 'Scegli l\'opzione che meglio si adatta alle dimensioni e alle esigenze della tua parrocchia.',
        basic: {
          name: 'Piano Base',
          desc: 'Per piccole parrocchie o cappelle.',
          items: ['Agenda Parrocchiale', 'Registro Sacramenti', 'Certificati Automatici'],
          btn: 'Inizia'
        },
        advanced: {
          tag: 'Raccomandato',
          name: 'Piano Avanzato',
          desc: 'Gestione integrale senza limiti.',
          items: ['Tutto del Piano Base', 'Editor Documenti (WYSIWYG)', 'Generatore Locandine', 'Report e Statistiche', 'Supporto Prioritario'],
          btn: 'Ottieni Piano Completo'
        }
      },
      testimonials: {
        quote: '"Emaús ha trasformato il nostro ufficio parrocchiale"',
        text: 'Prima passavamo ore a cercare certificati di battesimo in vecchi libri. Ora, con Emaús, emettiamo certificati in pochi secondi.',
        author_role: 'Parroco',
        stat_time: 'Meno tempo in burocrazia',
        stat_backup: 'Registri salvati nel cloud',
        privacy: 'Privacy Totale',
        privacy_desc: 'Accesso limitato per utente e crittografia di livello bancario.'
      },
      footer: {
        designed: 'Progettato per servire la Chiesa.',
        developed: 'Emaús è un\'app sviluppata da'
      },
      login: {
        welcome: 'Benvenuto in Emaús',
        subtitle: 'Inserisci le tue credenziali per accedere alla piattaforma.',
        user: 'Utente (Email)',
        pass: 'Password',
        btn: 'Accedi',
        verifying: 'Verifica in corso...',
        forgot: 'Password dimenticata?',
        contact: 'Contatta il Supporto',
        secure: 'Accesso sicuro crittografato SSL 256-bit'
      }
    }
  },
  fr: {
    sidebar: {
      dashboard: 'Tableau de bord',
      agenda: 'Agenda',
      sacraments: 'Sacrements',
      documents: 'Documents',
      settings: 'Paramètres',
      logout: 'Déconnexion',
      role: 'Secrétaire',
      parish: 'Gestion Paroissiale'
    },
    dashboard: {
      stats: {
        baptisms: 'Total Baptêmes',
        marriages: 'Mariages',
        certificates: 'Certificats Émis',
        parishioners: 'Paroissiens Actifs',
        vs_prev: 'vs mois préc.'
      },
      sacramental_activity: 'Activité Sacramentelle',
      upcoming_events: 'Événements à venir',
      view_full_agenda: 'Voir agenda complet',
      time_ranges: {
        last_6_months: '6 derniers mois',
        this_year: 'Cette année'
      }
    },
    sacraments: {
      title: 'Registres Sacramentels',
      subtitle: 'Gérer les registres officiels de la paroisse',
      search_placeholder: 'Rechercher par nom, célébrant ou date...',
      new_record: 'Nouveau Registre',
      export: 'Exporter',
      types: {
        Bautizo: 'Baptême',
        Confirmación: 'Confirmation',
        Matrimonio: 'Mariage',
        Defunción: 'Décès',
        'Primera Comunión': 'Première Communion'
      },
      table: {
        name: 'Nom',
        date: 'Date',
        celebrant: 'Célébrant',
        book_page: 'Livre / Page',
        actions: 'Actions',
        view_details: 'Voir Fiche',
        no_records: 'Aucun enregistrement trouvé.'
      },
      detail: {
        editing: 'Modification du registre',
        record_id: 'ID Registre',
        edit: 'Modifier',
        cancel: 'Annuler',
        save: 'Enregistrer',
        parents: 'Parents',
        godparents: 'Parrains / Témoins',
        observations: 'Observations',
        book_data: 'Données du Registre',
        book: 'Livre',
        page: 'Page',
        parish: 'Paroisse / Lieu'
      }
    },
    agenda: {
      title: 'Agenda Paroissial',
      new_event: 'Nouvel Événement',
      upcoming: 'Événements à venir',
      no_events: 'Aucun événement à venir.',
      modal: {
        title: 'Nouvel Événement',
        event_title: 'Titre de l\'événement',
        date: 'Date',
        time: 'Heure',
        type: 'Type',
        location: 'Lieu',
        cancel: 'Annuler',
        save: 'Enregistrer',
        types: {
          Misa: 'Messe',
          Sacramento: 'Sacrement',
          Reunión: 'Réunion',
          Otro: 'Autre'
        }
      }
    },
    documents: {
      title: 'Mes Documents',
      new_document: 'Nouveau Document',
      search: 'Rechercher...',
      items: 'éléments',
      empty_folder: 'Dossier vide',
      create_title: 'Créer Nouveau Document',
      create_subtitle: 'Sélectionnez un modèle ou commencez à zéro.',
      blank_doc: 'Document Vierge',
      start_scratch: 'Commencer à zéro',
      use_template: 'Utiliser le modèle',
      cancel_back: 'Annuler et retourner',
      save: 'Enregistrer',
      close: 'Fermer',
      untitled: 'Document sans titre'
    },
    landing: {
      nav: {
        features: 'Fonctionnalités',
        benefits: 'Avantages',
        plans: 'Tarifs',
        demo: 'Voir Démo',
        login: 'Connexion',
        client_access: 'Accès Client',
        demo_quick: 'Démo Rapide'
      },
      hero: {
        badge: 'Gestion Paroissiale 2.0',
        title_start: 'Digitalisez la mission de votre',
        title_highlight: 'Paroisse',
        subtitle: 'Emaús organise le chaos administratif, protège l\'histoire sacramentelle et libère du temps pour ce qui compte vraiment : la pastorale.',
        cta_access: 'Accéder à la Plateforme',
        cta_plans: 'Voir Tarifs'
      },
      mockup: {
        sacrament: 'Sacrement',
        baptism_card: 'Fiche de Baptême',
        verified: 'VÉRIFIÉ',
        name_label: 'Nom du Baptisé',
        date_label: 'Date',
        book_label: 'Livre / Page',
        parents_label: 'Parents',
        generate_btn: 'Générer Certificat Officiel',
        popup_db: 'Base de Données',
        popup_db_sub: 'Registre Numérisé',
        popup_search: 'Recherche',
        popup_search_sub: 'Fiche Trouvée',
        popup_docs: 'Documents',
        popup_docs_sub: 'Certificat Généré',
        popup_peace: 'Gestion agile et sérénité',
        popup_peace_sub: 'Pour toute la paroisse'
      },
      features: {
        title: 'Tout ce dont votre secrétariat a besoin',
        subtitle: 'Emaús remplace plusieurs outils déconnectés par une plateforme unifiée conçue spécifiquement pour l\'Église.',
        digital_sacraments: 'Sacrements Numériques',
        digital_sacraments_desc: 'Numérisez Baptêmes, Mariages et Confirmations. Recherches instantanées par nom ou date.',
        certs: 'Certificats en 1 Clic',
        certs_desc: 'Génération automatique de certificats officiels prêts à imprimer.',
        agenda: 'Agenda Pastoral',
        agenda_desc: 'Coordonnez messes, confessions et réunions paroissiales dans un calendrier centralisé.',
        btn_more: 'Voir plus de fonctionnalités'
      },
      plans: {
        title: 'Plans conçus pour chaque communauté',
        subtitle: 'Choisissez l\'option qui correspond le mieux à la taille et aux besoins de votre paroisse.',
        basic: {
          name: 'Plan Basique',
          desc: 'Pour petites paroisses ou chapelles.',
          items: ['Agenda Paroissial', 'Registre Sacrements', 'Certificats Automatiques'],
          btn: 'Commencer'
        },
        advanced: {
          tag: 'Recommandé',
          name: 'Plan Avancé',
          desc: 'Gestion intégrale sans limites.',
          items: ['Tout le Plan Basique', 'Éditeur Documents (WYSIWYG)', 'Générateur Affiches', 'Rapports et Statistiques', 'Support Prioritaire'],
          btn: 'Obtenir Plan Complet'
        }
      },
      testimonials: {
        quote: '"Emaús a transformé notre bureau paroissial"',
        text: 'Nous passions des heures à chercher des actes de baptême dans de vieux livres. Maintenant, avec Emaús, nous émettons des certificats en quelques secondes.',
        author_role: 'Curé',
        stat_time: 'Moins de temps administratif',
        stat_backup: 'Registres sauvegardés',
        privacy: 'Confidentialité Totale',
        privacy_desc: 'Accès restreint par utilisateur et cryptage de niveau bancaire.'
      },
      footer: {
        designed: 'Conçu pour servir l\'Église.',
        developed: 'Emaús est une app développée par'
      },
      login: {
        welcome: 'Bienvenue sur Emaús',
        subtitle: 'Entrez vos identifiants pour accéder à la plateforme.',
        user: 'Utilisateur (Email)',
        pass: 'Mot de passe',
        btn: 'Connexion',
        verifying: 'Vérification...',
        forgot: 'Mot de passe oublié ?',
        contact: 'Contacter le Support',
        secure: 'Accès sécurisé crypté SSL 256-bit'
      }
    }
  }
};