
// Version 1.13.0 - Full Translations Update
export const translations = {
  es: {
    sidebar: {
      dashboard: 'Resumen',
      agenda: 'Agenda',
      sacraments: 'Sacramentos',
      documents: 'Documentos',
      messages: 'Mensajes',
      finances: 'Finanzas',
      community: 'Comunidad',
      settings: 'Configuración',
      users: 'Usuarios',
      support: 'Soporte',
      logout: 'Cerrar Sesión',
      role: 'Secretaria',
      parish: 'Gestión Parroquial'
    },
    tour: {
        start_btn: 'Iniciar Recorrido',
        next: 'Siguiente',
        prev: 'Anterior',
        finish: 'Finalizar',
        skip: 'Saltar',
        steps: {
            dashboard: {
                title: 'Bienvenido a Emaús',
                desc: 'Este es tu centro de actividad. Aquí verás un resumen de la vida comunitaria, los próximos eventos y accesos directos a las funciones principales.'
            },
            agenda: {
                title: 'Agenda Pastoral',
                desc: 'Coordina misas, bautizos, bodas y reuniones. Todo sincronizado en tiempo real para evitar topes de horario.'
            },
            sacraments: {
                title: 'Archivo Sacramental',
                desc: 'El corazón de la administración. Digitaliza, busca y gestiona partidas de Bautismo, Confirmación y Matrimonio de forma segura.'
            },
            documents: {
                title: 'Certificados y Cartas',
                desc: 'Genera documentos oficiales con un clic. Utiliza plantillas eclesiales predefinidas para ahorrar tiempo.'
            },
            community: {
                title: 'Vida de Comunidad',
                desc: 'Un espacio social seguro para compartir noticias, fotos y reflexiones con tu parroquia y otras comunidades conectadas.'
            },
            messages: {
                title: 'Red Interparroquial',
                desc: 'Comunícate directamente con otras secretarías para solicitar traslados de partidas o resolver dudas pastorales.'
            },
            finances: {
                title: 'Transparencia Económica',
                desc: 'Lleva el control simple de ingresos por estipendios, colectas y gastos operativos de la parroquia.'
            },
            support: {
                title: 'Estamos para Servirte',
                desc: '¿Dudas o problemas técnicos? Contacta a nuestro equipo de soporte directamente desde aquí.'
            }
        }
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
      welcome: 'Bienvenido,',
      welcome_subtitle: 'Que la paz esté con esta casa. Aquí tienes un resumen de la actividad reciente.',
      tour_card: {
        title: '¿Nuevo en Emaús?',
        subtitle: 'Realiza un recorrido rápido para conocer todas las herramientas pastorales.',
        btn: 'Comenzar Tour'
      },
      stats: {
        baptisms: 'Bautizos',
        marriages: 'Matrimonios',
        certificates: 'Confirmaciones',
        parishioners: 'Feligreses Activos',
        vs_prev: 'vs mes anterior'
      },
      sacramental_activity: 'Actividad Sacramental',
      community_highlight: 'Último en Comunidad',
      view_community: 'Ir a Comunidad',
      no_posts: 'Aún no hay actividad social reciente.',
      upcoming_events: 'Próximos Eventos',
      no_events: 'No hay eventos programados próximamente.',
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
      print: 'Imprimir',
      upsell: {
        title: 'Funcionalidad Premium',
        desc: 'El editor de documentos tipo Word está reservado para planes avanzados.',
        benefit1: 'Editor completo sin Office',
        benefit2: 'Plantillas eclesiales oficiales',
        cta: 'Conocer Planes'
      }
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
    finances: {
      title: 'Finanzas Parroquiales',
      subtitle: 'Control de ingresos, egresos y balance mensual.',
      income: 'Ingresos',
      expense: 'Egresos',
      balance: 'Balance',
      new_transaction: 'Nueva Transacción',
      no_transactions: 'No hay transacciones registradas.',
      search: 'Buscar movimiento...',
      calculator: 'Calculadora Rápida',
      upsell: {
        title: 'Funcionalidad Premium',
        desc: 'El módulo de Contabilidad y Finanzas está reservado para planes avanzados.',
        benefit1: 'Control de caja e ingresos',
        benefit2: 'Reportes financieros automáticos',
        cta: 'Conocer Planes'
      },
      table: {
        date: 'Fecha',
        type: 'Tipo',
        category: 'Categoría',
        description: 'Descripción',
        amount: 'Monto',
        actions: 'Acciones'
      },
      modal: {
        title: 'Registrar Movimiento',
        type: 'Tipo de Movimiento',
        amount: 'Monto',
        date: 'Fecha',
        category: 'Categoría',
        desc: 'Descripción',
        method: 'Método de Pago',
        cancel: 'Cancelar',
        save: 'Guardar'
      },
      categories: {
        stipends: 'Estipendios',
        collection: 'Colecta',
        donations: 'Donaciones',
        services: 'Servicios Básicos',
        maintenance: 'Mantenimiento',
        supplies: 'Insumos',
        personnel: 'Personal',
        other: 'Otro'
      }
    },
    community: {
      title: 'Comunidad Emaús',
      subtitle: 'Espacio de encuentro y vida eclesial',
      new_post_placeholder: '¿Qué está pasando en tu parroquia? Comparte novedades, eventos o reflexiones...',
      publish: 'Publicar',
      upload_photo: 'Subir Foto',
      likes: 'Me gusta',
      comment: 'Comentar',
      no_posts: 'Aún no hay publicaciones. ¡Sé el primero en compartir algo!',
      posting: 'Publicando...',
      suggested_parishes: 'Parroquias Sugeridas',
      visit_profile: 'Ver Perfil',
      comments: 'Comentarios',
      write_comment: 'Escribe un comentario...',
      send: 'Enviar',
      back_to_feed: 'Volver al Muro'
    },
    settings: {
        identity: 'Identidad Visual',
        avatar_desc: 'Personalice el ícono y color que representará a su parroquia en la comunidad.',
        cover_image: 'Foto de Portada',
        cover_desc: 'Imagen principal para su página de perfil pública.',
        upload_cover: 'Subir Portada'
    },
    support: {
      title: 'Centro de Soporte',
      subtitle: '¿En qué podemos ayudarte hoy?',
      create_ticket: 'Crear Ticket',
      my_tickets: 'Mis Tickets',
      admin_dashboard: 'Panel de Soporte',
      status: {
        open: 'Abierto',
        in_progress: 'En Progreso',
        resolved: 'Resuelto',
        closed: 'Cerrado'
      },
      priority: {
        low: 'Baja',
        medium: 'Media',
        high: 'Alta',
        critical: 'Crítica'
      },
      form: {
        subject: 'Asunto',
        subject_ph: 'Breve resumen del problema...',
        desc: 'Descripción',
        desc_ph: 'Detalla lo que sucede...',
        priority: 'Nivel de Prioridad',
        cancel: 'Cancelar',
        submit: 'Enviar Ticket',
        attach: 'Adjuntar Imagen/PDF',
        max_size: 'Máx 5MB (jpg, png, pdf)'
      },
      chat: {
        placeholder: 'Escribe una respuesta...',
        send: 'Enviar',
        history: 'Historial del Ticket'
      },
      columns: {
        pending: 'Pendientes',
        in_progress: 'En Proceso',
        resolved: 'Resueltos'
      },
      empty: 'No hay tickets en esta categoría.'
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
        network: 'Chat Interparroquial',
        network_desc: 'Conecte directamente con otras secretarías para solicitar traslados y resolver dudas mediante un chat seguro.',
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
          desc: 'Para parroquias pequeñas o capelas.',
          items: ['Parish Calendar', 'Sacrament Registry', 'Automatic Certificates', 'Inter-parish Chat (New)'],
          btn: 'Comenzar'
        },
        advanced: {
          tag: 'Recomendado',
          name: 'Plan Avanzado',
          desc: 'Gestión integral sin límites.',
          items: {
            basic_features: 'Todo lo del Plan Básico',
            word_editor: 'Editor de Documentos tipo Word',
            finance: 'Módulo de Finanzas y Caja',
            chat: 'Chat y Directorio Ilimitado',
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
        finances: 'Finances',
        community: 'Emaús Community',
        settings: 'Settings',
        users: 'Users',
        support: 'Support',
        logout: 'Log Out',
        role: 'Secretary',
        parish: 'Parish Management'
    },
    tour: {
        start_btn: 'Start Tour',
        next: 'Next',
        prev: 'Previous',
        finish: 'Finish',
        skip: 'Skip',
        steps: {
            dashboard: { title: 'Welcome', desc: 'Your command center.' },
            agenda: { title: 'Agenda', desc: 'Manage events.' },
            sacraments: { title: 'Sacraments', desc: 'Digital registry.' },
            documents: { title: 'Documents', desc: 'Certificates generator.' },
            community: { title: 'Community', desc: 'Social life.' },
            messages: { title: 'Network', desc: 'Inter-parish chat.' },
            finances: { title: 'Finances', desc: 'Income and expenses.' },
            support: { title: 'Support', desc: 'We are here to help.' }
        }
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
            email: 'Email',
            password: 'Password',
            plan: 'Assigned Plan',
            cancel: 'Cancel',
            create: 'Create User',
            save: 'Save Changes'
        }
    },
    dashboard: {
        welcome: 'Welcome,',
        welcome_subtitle: 'Peace be with this house. Here is a summary of recent activity.',
        tour_card: {
            title: 'New to Emaús?',
            subtitle: 'Take a quick tour to learn about all pastoral tools.',
            btn: 'Start Tour'
        },
        stats: {
            baptisms: 'Baptisms',
            marriages: 'Marriages',
            certificates: 'Confirmations',
            parishioners: 'Active Parishioners',
            vs_prev: 'vs prev month'
        },
        sacramental_activity: 'Sacramental Activity',
        community_highlight: 'Latest in Community',
        view_community: 'Go to Community',
        no_posts: 'No recent social activity yet.',
        upcoming_events: 'Upcoming Events',
        no_events: 'No upcoming events scheduled.',
        view_full_agenda: 'View full calendar',
        time_ranges: { last_6_months: 'Last 6 months', this_year: 'This year' }
    },
    sacraments: {
        title: 'Sacramental Registers',
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
            view_details: 'View Card',
            no_records: 'No records found.'
        },
        detail: {
            record_card: 'Record Card',
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
        title: 'Parish Agenda',
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
                'Primera Comunión': '1st Communion',
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
        untitled: 'Untitled document',
        print: 'Print',
        upsell: {
            title: 'Premium Feature',
            desc: 'The Word-like document editor is reserved for advanced plans.',
            benefit1: 'Full editor without Office',
            benefit2: 'Official ecclesial templates',
            cta: 'View Plans'
        }
    },
    messages: {
        title: 'Messages',
        subtitle: 'Parish Community',
        search_placeholder: 'Search chat...',
        type_message: 'Type a message...',
        no_chat_selected: 'Select a chat to start',
        start_chat: 'Start new chat',
        empty_state: 'You have no messages yet.',
        new_chat_modal: 'New Chat',
        email_placeholder: 'Parish email',
        create_chat: 'Create Chat',
        support: 'Emaús Support',
        directory: {
            title: 'Parish Directory',
            subtitle: 'Connect with other parishes in the Emaús network.',
            search: 'Search parish or city...',
            start_conversation: 'Chat',
            unavailable_basic: 'Not available (Basic Plan)'
        },
        upsell: {
            title: 'Premium Feature',
            desc: 'Inter-parish messaging is reserved exclusively for advanced plans.',
            benefit1: 'Direct chat with other parishes',
            benefit2: 'National contact directory',
            cta: 'View Plans'
        }
    },
    finances: {
        title: 'Parish Finances',
        subtitle: 'Control income, expenses and monthly balance.',
        income: 'Income',
        expense: 'Expenses',
        balance: 'Balance',
        new_transaction: 'New Transaction',
        no_transactions: 'No transactions recorded.',
        search: 'Search transaction...',
        calculator: 'Quick Calculator',
        upsell: {
            title: 'Premium Feature',
            desc: 'The Finance and Cash module is reserved for advanced plans.',
            benefit1: 'Cash and income control',
            benefit2: 'Automatic financial reports',
            cta: 'View Plans'
        },
        table: {
            date: 'Date',
            type: 'Type',
            category: 'Category',
            description: 'Description',
            amount: 'Amount',
            actions: 'Actions'
        },
        modal: {
            title: 'Register Transaction',
            type: 'Transaction Type',
            amount: 'Amount',
            date: 'Date',
            category: 'Category',
            desc: 'Description',
            method: 'Payment Method',
            cancel: 'Cancel',
            save: 'Save'
        },
        categories: {
            stipends: 'Stipends',
            collection: 'Collection',
            donations: 'Donations',
            services: 'Utilities',
            maintenance: 'Maintenance',
            supplies: 'Supplies',
            personnel: 'Personnel',
            other: 'Other'
        }
    },
    community: {
        title: 'Emaús Community',
        subtitle: 'Space for meeting and ecclesial life',
        new_post_placeholder: 'What is happening in your parish? Share news, events or reflections...',
        publish: 'Post',
        upload_photo: 'Upload Photo',
        likes: 'Likes',
        comment: 'Comment',
        no_posts: 'No posts yet. Be the first to share something!',
        posting: 'Posting...',
        suggested_parishes: 'Suggested Parishes',
        visit_profile: 'Visit Profile',
        comments: 'Comments',
        write_comment: 'Write a comment...',
        send: 'Send',
        back_to_feed: 'Back to Feed'
    },
    settings: {
        identity: 'Visual Identity',
        avatar_desc: 'Customize the icon and color representing your parish.',
        cover_image: 'Cover Photo',
        cover_desc: 'Main image for your public profile page.',
        upload_cover: 'Upload Cover'
    },
    support: {
        title: 'Support Center',
        subtitle: 'How can we help you today?',
        create_ticket: 'Create Ticket',
        my_tickets: 'My Tickets',
        admin_dashboard: 'Support Dashboard',
        status: {
            open: 'Open',
            in_progress: 'In Progress',
            resolved: 'Resolved',
            closed: 'Closed'
        },
        priority: {
            low: 'Low',
            medium: 'Medium',
            high: 'High',
            critical: 'Critical'
        },
        form: {
            subject: 'Subject',
            subject_ph: 'Brief summary of the issue...',
            desc: 'Description',
            desc_ph: 'Details about what is happening...',
            priority: 'Priority Level',
            cancel: 'Cancel',
            submit: 'Submit Ticket',
            attach: 'Attach Image/PDF',
            max_size: 'Max 5MB (jpg, png, pdf)'
        },
        chat: {
            placeholder: 'Type a reply...',
            send: 'Send',
            history: 'Ticket History'
        },
        columns: {
            pending: 'Pending',
            in_progress: 'In Progress',
            resolved: 'Resolved'
        },
        empty: 'No tickets in this category.'
    },
    landing: { /* ... existing ... */ }
  },
  pt: {
    sidebar: {
        dashboard: 'Resumo',
        agenda: 'Agenda',
        sacraments: 'Sacramentos',
        documents: 'Documentos',
        messages: 'Mensagens',
        finances: 'Finanças',
        community: 'Comunidade Emaús',
        settings: 'Configurações',
        users: 'Usuários',
        support: 'Suporte',
        logout: 'Sair',
        role: 'Secretaria',
        parish: 'Gestão Paroquial'
    },
    tour: {
        start_btn: 'Iniciar Tour',
        next: 'Próximo',
        prev: 'Anterior',
        finish: 'Finalizar',
        skip: 'Pular',
        steps: {
            dashboard: { title: 'Bem-vindo', desc: 'Seu centro de comando.' },
            agenda: { title: 'Agenda', desc: 'Gerenciar eventos.' },
            sacraments: { title: 'Sacramentos', desc: 'Registro digital.' },
            documents: { title: 'Documentos', desc: 'Gerador de certificados.' },
            community: { title: 'Comunidade', desc: 'Vida social.' },
            messages: { title: 'Rede', desc: 'Chat interparoquial.' },
            finances: { title: 'Finanças', desc: 'Receitas e despesas.' },
            support: { title: 'Suporte', desc: 'Estamos aqui para ajudar.' }
        }
    },
    users: {
        title: 'Gestão de Usuários',
        subtitle: 'Administração de contas e planos',
        create_user: 'Criar Usuário',
        search_placeholder: 'Buscar por email, paróquia ou cidade...',
        table: {
            email: 'Usuário / Email',
            parish: 'Paróquia',
            city: 'Cidade',
            plan: 'Plano',
            actions: 'Ações'
        },
        actions: {
            edit_plan: 'Editar Plano',
            reset_pass: 'Redefinir Senha',
            delete: 'Excluir'
        },
        modal: {
            create_title: 'Novo Usuário',
            edit_plan_title: 'Editar Plano',
            email: 'Email',
            password: 'Senha',
            plan: 'Plano Atribuído',
            cancel: 'Cancelar',
            create: 'Criar Usuário',
            save: 'Salvar Mudanças'
        }
    },
    dashboard: {
        welcome: 'Bem-vindo,',
        welcome_subtitle: 'A paz esteja nesta casa. Aqui está um resumo da atividade recente.',
        tour_card: {
            title: 'Novo no Emaús?',
            subtitle: 'Faça um tour rápido para conhecer todas as ferramentas pastorais.',
            btn: 'Iniciar Tour'
        },
        stats: {
            baptisms: 'Batismos',
            marriages: 'Matrimônios',
            certificates: 'Crismas',
            parishioners: 'Paroquianos Ativos',
            vs_prev: 'vs mês anterior'
        },
        sacramental_activity: 'Atividade Sacramental',
        community_highlight: 'Último na Comunidade',
        view_community: 'Ir para Comunidade',
        no_posts: 'Ainda não há atividade social recente.',
        upcoming_events: 'Próximos Eventos',
        no_events: 'Não há eventos agendados em breve.',
        view_full_agenda: 'Ver agenda completa',
        time_ranges: { last_6_months: 'Últimos 6 meses', this_year: 'Este ano' }
    },
    sacraments: {
        title: 'Livros Sacramentais',
        subtitle: 'Gerencie os registros oficiais da paróquia',
        search_placeholder: 'Buscar por nome, celebrante ou data...',
        new_record: 'Novo Registro',
        export: 'Exportar',
        types: {
            Bautizo: 'Batismo',
            Confirmación: 'Crisma',
            Matrimonio: 'Matrimônio',
            Defunción: 'Falecimento',
            'Primera Comunión': 'Primeira Eucaristia'
        },
        table: {
            name: 'Nome',
            date: 'Data',
            celebrant: 'Celebrante',
            book_page: 'Livro / Pág',
            actions: 'Ações',
            view_details: 'Ver Ficha',
            no_records: 'Nenhum registro encontrado.'
        },
        detail: {
            record_card: 'Ficha de',
            editing: 'Editando Registro',
            record_id: 'ID do Registro',
            edit: 'Editar Dados',
            cancel: 'Cancelar',
            save: 'Salvar Alterações',
            parents: 'Pais',
            godparents: 'Padrinhos / Testemunhas',
            observations: 'Observações',
            book_data: 'Dados do Registro',
            book: 'Livro',
            page: 'Página',
            parish: 'Paróquia / Lugar'
        }
    },
    agenda: {
        title: 'Agenda Paroquial',
        new_event: 'Novo Evento',
        upcoming: 'Próximos Eventos',
        no_events: 'Não há eventos próximos.',
        modal: {
            title: 'Novo Evento',
            event_title: 'Título do Evento',
            date: 'Data',
            time: 'Hora',
            type: 'Tipo',
            location: 'Local',
            cancel: 'Cancelar',
            save: 'Salvar Evento',
            types: {
                Misa: 'Missa',
                Bautizo: 'Batismo',
                Matrimonio: 'Matrimônio',
                Confirmación: 'Crisma',
                'Primera Comunión': '1ª Eucaristia',
                Reunión: 'Reunião',
                Otro: 'Outro'
            }
        }
    },
    documents: {
        title: 'Meus Documentos',
        new_document: 'Novo Documento',
        search: 'Buscar...',
        items: 'itens',
        empty_folder: 'Pasta vazia',
        create_title: 'Criar Novo Documento',
        create_subtitle: 'Selecione um modelo base ou comece do zero.',
        blank_doc: 'Documento em Branco',
        start_scratch: 'Começar do zero',
        use_template: 'Usar Modelo',
        cancel_back: 'Cancelar e voltar',
        save: 'Salvar',
        close: 'Fechar',
        untitled: 'Documento sem título',
        print: 'Imprimir',
        upsell: {
            title: 'Recurso Premium',
            desc: 'O editor de documentos tipo Word é reservado para planos avançados.',
            benefit1: 'Editor completo sem Office',
            benefit2: 'Modelos eclesiais oficiais',
            cta: 'Ver Planos'
        }
    },
    messages: {
        title: 'Mensagens',
        subtitle: 'Comunidade Paroquial',
        search_placeholder: 'Buscar chat...',
        type_message: 'Digite uma mensagem...',
        no_chat_selected: 'Selecione um chat para começar',
        start_chat: 'Iniciar novo chat',
        empty_state: 'Você ainda não tem mensagens.',
        new_chat_modal: 'Novo Chat',
        email_placeholder: 'Email da paróquia',
        create_chat: 'Criar Chat',
        support: 'Suporte Emaús',
        directory: {
            title: 'Diretório de Paróquias',
            subtitle: 'Conecte-se com outras paróquias da rede Emaús.',
            search: 'Buscar paróquia ou cidade...',
            start_conversation: 'Conversar',
            unavailable_basic: 'Não disponível (Plano Básico)'
        },
        upsell: {
            title: 'Recurso Premium',
            desc: 'A troca de mensagens interparoquiais é exclusiva para planos avançados.',
            benefit1: 'Chat direto com outras paróquias',
            benefit2: 'Diretório nacional de contatos',
            cta: 'Ver Planos'
        }
    },
    finances: {
        title: 'Finanças Paroquiais',
        subtitle: 'Controle de receitas, despesas e balanço mensal.',
        income: 'Receitas',
        expense: 'Despesas',
        balance: 'Balanço',
        new_transaction: 'Nova Transação',
        no_transactions: 'Nenhuma transação registrada.',
        search: 'Buscar movimento...',
        calculator: 'Calculadora Rápida',
        upsell: {
            title: 'Recurso Premium',
            desc: 'O módulo de Finanças e Caixa é reservado para planos avançados.',
            benefit1: 'Controle de caixa e receitas',
            benefit2: 'Relatórios financeiros automáticos',
            cta: 'Ver Planos'
        },
        table: {
            date: 'Data',
            type: 'Tipo',
            category: 'Categoria',
            description: 'Descrição',
            amount: 'Valor',
            actions: 'Ações'
        },
        modal: {
            title: 'Registrar Movimento',
            type: 'Tipo de Movimento',
            amount: 'Valor',
            date: 'Data',
            category: 'Categoria',
            desc: 'Descrição',
            method: 'Método de Pagamento',
            cancel: 'Cancelar',
            save: 'Salvar'
        },
        categories: {
            stipends: 'Estipêndios',
            collection: 'Coleta',
            donations: 'Doações',
            services: 'Serviços Básicos',
            maintenance: 'Manutenção',
            supplies: 'Insumos',
            personnel: 'Pessoal',
            other: 'Outro'
        }
    },
    community: {
        title: 'Comunidade Emaús',
        subtitle: 'Espaço de encontro e vida eclesial',
        new_post_placeholder: 'O que está acontecendo na sua paróquia? Compartilhe novidades, eventos ou reflexões...',
        publish: 'Publicar',
        upload_photo: 'Subir Foto',
        likes: 'Curtidas',
        comment: 'Comentar',
        no_posts: 'Ainda não há publicações. Seja o primeiro a compartilhar algo!',
        posting: 'Publicando...',
        suggested_parishes: 'Paróquias Sugeridas',
        visit_profile: 'Ver Perfil',
        comments: 'Comentários',
        write_comment: 'Escreva um comentário...',
        send: 'Enviar',
        back_to_feed: 'Voltar ao Feed'
    },
    settings: {
        identity: 'Identidade Visual',
        avatar_desc: 'Personalize o ícone e a cor que representarão sua paróquia na comunidade.',
        cover_image: 'Foto de Capa',
        cover_desc: 'Imagem principal para sua página de perfil pública.',
        upload_cover: 'Subir Capa'
    },
    support: {
        title: 'Centro de Suporte',
        subtitle: 'Como podemos ajudar você hoje?',
        create_ticket: 'Criar Ticket',
        my_tickets: 'Meus Tickets',
        admin_dashboard: 'Painel de Suporte',
        status: {
            open: 'Aberto',
            in_progress: 'Em Progresso',
            resolved: 'Resolvido',
            closed: 'Fechado'
        },
        priority: {
            low: 'Baixa',
            medium: 'Média',
            high: 'Alta',
            critical: 'Crítica'
        },
        form: {
            subject: 'Assunto',
            subject_ph: 'Breve resumo do problema...',
            desc: 'Descrição',
            desc_ph: 'Detalhes sobre o que está acontecendo...',
            priority: 'Nível de Prioridade',
            cancel: 'Cancelar',
            submit: 'Enviar Ticket',
            attach: 'Anexar Imagem/PDF',
            max_size: 'Máx 5MB (jpg, png, pdf)'
        },
        chat: {
            placeholder: 'Escreva uma resposta...',
            send: 'Enviar',
            history: 'Histórico do Ticket'
        },
        columns: {
            pending: 'Pendentes',
            in_progress: 'Em Processo',
            resolved: 'Resolvidos'
        },
        empty: 'Não há tickets nesta categoria.'
    },
    landing: { /* ... existing ... */ }
  }
};
