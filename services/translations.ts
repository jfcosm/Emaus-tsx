
export const translations = {
  es: {
    sidebar: {
      dashboard: 'Resumen',
      agenda: 'Agenda',
      sacraments: 'Sacramentos',
      documents: 'Documentos',
      messages: 'Mensajes',
      settings: 'Configuración',
      users: 'Usuarios',
      logout: 'Cerrar Sesión',
      role: 'Secretaria',
      parish: 'Gestión Parroquial'
    },
    users: {
      title: 'Gestión de Usuarios',
      subtitle: 'Administración de cuentas y planes de suscripción',
      create_user: 'Crear Usuario',
      search_placeholder: 'Buscar por email, parroquia o ciudad...',
      table: {
        email: 'Usuario / Email',
        parish: 'Parroquia',
        city: 'Ciudad',
        plan: 'Plan',
        actions: 'Acciones'
      },
      actions: {
        edit_plan: 'Editar Plan',
        reset_pass: 'Resetear Contraseña',
        delete: 'Eliminar'
      },
      modal: {
        create_title: 'Nuevo Usuario',
        edit_plan_title: 'Editar Plan',
        email: 'Correo Electrónico',
        password: 'Contraseña',
        plan: 'Plan Asignado',
        cancel: 'Cancelar',
        create: 'Crear Usuario',
        save: 'Guardar Cambios'
      }
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
        record_card: 'Ficha de',
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
          Bautizo: 'Bautizo',
          Matrimonio: 'Matrimonio',
          Confirmación: 'Confirmación',
          'Primera Comunión': '1° Comunión',
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
      untitled: 'Documento sin título',
      print: 'Imprimir'
    },
    messages: {
      title: 'Mensajes',
      subtitle: 'Comunidad Parroquial',
      search_placeholder: 'Buscar chat...',
      type_message: 'Escribe un mensaje...',
      no_chat_selected: 'Selecciona un chat para comenzar',
      start_chat: 'Iniciar nuevo chat',
      empty_state: 'No tienes mensajes aún.',
      new_chat_modal: 'Nuevo Chat',
      email_placeholder: 'Correo de la parroquia',
      create_chat: 'Crear Chat',
      support: 'Soporte Emaús',
      directory: {
        title: 'Directorio de Parroquias',
        subtitle: 'Conecta con otras parroquias de la red Emaús.',
        search: 'Buscar parroquia o ciudad...',
        start_conversation: 'Conversar',
        unavailable_basic: 'No disponible (Plan Básico)'
      },
      upsell: {
        title: 'Funcionalidad Premium',
        desc: 'La mensajería interparroquial está reservada exclusivamente para planes avanzados.',
        benefit1: 'Chat directo con otras parroquias',
        benefit2: 'Directorio nacional de contactos',
        cta: 'Conocer Planes'
      }
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
        popup_chat: 'Hna. María',
        popup_chat_sub: 'Partida enviada ✅'
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
        network: 'Red Interparroquial',
        network_desc: 'Conecte directamente con otras secretarías. Solicite traslados y resuelva dudas por chat seguro.',
        btn_more: 'Conocer más características'
      },
      community: {
        title: 'Nunca más trabaje en solitario',
        subtitle: 'Únase al directorio nacional de parroquias y agilice la burocracia eclesial con Emaús.',
        card_community: {
          title: 'Comunidad Emaús',
          desc: 'Cientos de secretarías conectadas'
        },
        card_chat: {
          title: 'Comunicación Instantánea',
          desc: 'Chat exclusivo entre parroquias'
        },
        card_docs: {
          title: 'Documentación Ágil',
          desc: 'Comparta archivos eclesiales al instante'
        }
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
          items: {
            basic_features: 'Todo lo del Plan Básico',
            word_editor: 'Editor de Documentos tipo Word',
            chat: 'Chat y Directorio Interparroquial',
            reports: 'Reportes y Estadísticas',
            support: 'Soporte Prioritario'
          },
          btn: 'Obtener Plan Completo'
        }
      },
      testimonials: {
        quote: '"Emaús ha transformado nuestra oficina parroquial"',
        text: 'Antes pasábamos horas buscando partidas de bautismo en libros antiguos. Ahora, con Emaús, entregamos certificados en segundos.',
        author_role: 'Párroco',
        carousel: {
          t1: {
            quote: "Es increíble lo fácil que es contactar con otras parroquias para pedir traslados.",
            author: "Hna. Lucía",
            role: "Secretaria, Valparaíso"
          },
          t2: {
            quote: "El orden que nos ha dado en la agenda de matrimonios es impagable. Se acabaron los topes.",
            author: "P. Andrés",
            role: "Párroco, Santiago"
          },
          t3: {
            quote: "Puedo revisar los datos de un bautizo desde mi celular antes de la misa. Muy práctico.",
            author: "Diác. Carlos",
            role: "Diácono, Concepción"
          },
          t4: {
            quote: "El soporte es excelente, siempre me ayudan cuando tengo dudas con algún certificado.",
            author: "Sra. Carmen",
            role: "Administradora, La Serena"
          }
        }
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
      messages: 'Messages',
      settings: 'Settings',
      users: 'Users',
      logout: 'Log Out',
      role: 'Secretary',
      parish: 'Parish Management'
    },
    users: {
      title: 'User Management',
      subtitle: 'Manage accounts and subscription plans',
      create_user: 'Create User',
      search_placeholder: 'Search by email, parish or city...',
      table: {
        email: 'User / Email',
        parish: 'Parish',
        city: 'City',
        plan: 'Plan',
        actions: 'Actions'
      },
      actions: {
        edit_plan: 'Edit Plan',
        reset_pass: 'Reset Password',
        delete: 'Delete'
      },
      modal: {
        create_title: 'New User',
        edit_plan_title: 'Edit Plan',
        email: 'Email Address',
        password: 'Password',
        plan: 'Assigned Plan',
        cancel: 'Cancel',
        create: 'Create User',
        save: 'Save Changes'
      }
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
        record_card: 'Record of',
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
          Bautizo: 'Baptism',
          Matrimonio: 'Marriage',
          Confirmación: 'Confirmation',
          'Primera Comunión': 'First Communion',
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
      untitled: 'Untitled Document',
      print: 'Print'
    },
    messages: {
      title: 'Messages',
      subtitle: 'Parish Community',
      search_placeholder: 'Search chat...',
      type_message: 'Type a message...',
      no_chat_selected: 'Select a chat to start',
      start_chat: 'Start new chat',
      empty_state: 'No messages yet.',
      new_chat_modal: 'New Chat',
      email_placeholder: 'Parish email',
      create_chat: 'Create Chat',
      support: 'Emaús Support',
      directory: {
        title: 'Parish Directory',
        subtitle: 'Connect with other parishes in the Emaús network.',
        search: 'Search parish or city...',
        start_conversation: 'Chat',
        unavailable_basic: 'Unavailable (Basic Plan)'
      },
      upsell: {
        title: 'Premium Feature',
        desc: 'Inter-parish messaging is reserved exclusively for advanced plans.',
        benefit1: 'Direct chat with other parishes',
        benefit2: 'National contact directory',
        cta: 'View Plans'
      }
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
        popup_chat: 'Sr. Mary',
        popup_chat_sub: 'Record sent ✅'
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
        network: 'Inter-parish Network',
        network_desc: 'Connect directly with other secretariats. Request transfers and resolve doubts via secure chat.',
        btn_more: 'Learn more features'
      },
      community: {
        title: 'Never work alone again',
        subtitle: 'Join the national parish directory and streamline ecclesiastical bureaucracy with Emaús.',
        card_community: {
          title: 'Emaús Community',
          desc: 'Hundreds of connected secretariats'
        },
        card_chat: {
          title: 'Instant Communication',
          desc: 'Exclusive chat between parishes'
        },
        card_docs: {
          title: 'Agile Documentation',
          desc: 'Share church files instantly'
        }
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
          items: {
            basic_features: 'Everything in Basic',
            word_editor: 'Word-like Document Editor',
            chat: 'Inter-parish Chat & Directory',
            reports: 'Reports & Analytics',
            support: 'Priority Support'
          },
          btn: 'Get Full Plan'
        }
      },
      testimonials: {
        quote: '"Emaús has transformed our parish office"',
        text: 'We used to spend hours searching for baptism records in old books. Now, with Emaús, we issue certificates in seconds.',
        author_role: 'Parish Priest',
        carousel: {
          t1: {
            quote: "It's amazing how easy it is to contact other parishes to request transfers.",
            author: "Sr. Lucia",
            role: "Secretary, Valparaíso"
          },
          t2: {
            quote: "The order it has given us in the marriage agenda is priceless. No more double bookings.",
            author: "Fr. Andres",
            role: "Parish Priest, Santiago"
          },
          t3: {
            quote: "I can check baptism data from my phone before mass. Very practical.",
            author: "Dcn. Carlos",
            role: "Deacon, Concepción"
          },
          t4: {
            quote: "Support is excellent, they always help me when I have doubts with any certificate.",
            author: "Mrs. Carmen",
            role: "Administrator, La Serena"
          }
        }
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
  }
};