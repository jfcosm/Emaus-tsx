// Version 1.17.0 - Full Audit Production Dictionary with 13 Languages and 100% Coverage
export const translations: any = {
  es: {
    sidebar: { dashboard: 'Resumen', agenda: 'Agenda', sacraments: 'Sacramentos', documents: 'Documentos', messages: 'Mensajes', finances: 'Finanzas', community: 'Comunidad', settings: 'Configuración', users: 'Usuarios y Planes', support: 'Soporte', leads: 'Solicitudes', logout: 'Cerrar Sesión', role: 'Secretaria', parish: 'Gestión Parroquial' },
    landing: {
      nav: { features: 'Características', benefits: 'Beneficios', plans: 'Planes', login: 'Iniciar Sesión' },
      hero: { badge: 'GESTIÓN PARROQUIAL 2.0', title_start: 'DIGITALICE LA MISIÓN DE SU', title_highlight: 'PARROQUIA', subtitle: 'Emaús ordena el caos administrative, protege la historia sacramental y libera tiempo para lo verdaderamente importante: la pastoral.', cta_access: 'Acceder a la Plataforma', cta_plans: 'Ver Planes' },
      mockup: { sacrament: 'SACRAMENTO', record_type: 'Ficha de Bautismo', label_name: 'NOMBRE DEL BAUTIZADO', label_date: 'FECHA', label_book: 'LIBRO / PÁG', label_parents: 'PADRES', badge_db: 'BASE DE DATOS', status_db: 'Registro Digitalizado', badge_search: 'BÚSQUEDA', status_search: 'Ficha Encontrada', badge_docs: 'DOCUMENTOS', status_docs: 'Certificado Generado', chat_name: 'Hna. María', chat_msg: 'Partida enviada' },
      features: { title: 'Todo lo que su secretaría necesita', subtitle: 'Emaús reemplaza múltiples herramientas desconectadas por una plataforma unificada diseñada específicamente para la Iglesia.', sacraments_title: 'Sacramentos Digitales', sacraments_desc: 'Digitalice Bautizos, Matrimonios y Confirmaciones.', docs_title: 'Certificados en 1 Clic', docs_desc: 'Generación automática de certificados oficiales.', agenda_title: 'Agenda Pastoral', agenda_desc: 'Coordine misas y reuniones en un calendario centralizado.', chat_title: 'Chat Interparroquial', chat_desc: 'Conecte directamente con otras secretarías.', btn_more: 'Conocer más características' },
      plans: { title: 'Planes diseñados para cada comunidad', subtitle: 'Elija la opción que mejor se adapte a su parroquia.', basic_title: 'Plan Básico', basic_desc: 'Para parroquias pequeñas.', adv_title: 'Plan Avanzado', adv_desc: 'Gestión integral sin límites.', forever: 'mes', popular: 'RECOMENDADO', cta: 'Solicitar Demo', feature_agenda: 'Agenda Parroquial', feature_sacraments: 'Registro de Sacramentos', feature_certs: 'Certificados Automáticos', feature_chat: 'Chat Interparroquial', feature_editor: 'Editor de Documentos tipo Word', feature_finances: 'Módulo de Finanzas', feature_basic_all: 'Todo lo del Plan Básico', feature_reports: 'Reportes y Estadísticas', feature_support: 'Soporte Prioritario', feature_unlimited: 'Chat y Directorio Ilimitado' },
      community: { title: 'Nunca más trabaje en solitario', subtitle: 'Únase al directorio nacional de parroquias.', card1_title: 'Comunidad Emaús', card1_desc: 'Cientos de secretarias conectadas', card2_title: 'Comunicación Instantánea', card2_desc: 'Chat exclusivo entre parroquias', card3_title: 'Documentación Ágil', card3_desc: 'Comparta archivos al instante' },
      testimonials: { title: '"Emaús ha transformado nuestra oficina parroquial"', subtitle: 'Antes pasábamos horas buscando partidas. Ahora entregamos certificados en segundos.', t1_name: 'Hna. Lucía', t1_role: 'Secretaria, Valparaíso', t1_text: '"Es increíble lo fácil que es contactar con otras parroquias."', t2_name: 'P. Andrés', t2_role: 'Párroco, Santiago', t2_text: '"El orden en la agenda de matrimonios es impagable."', t3_name: 'Diác. Carlos', t3_role: 'Diácono, Concepción', t3_text: '"Puedo revisar datos de un bautizo desde mi celular. Muy práctico."' },
      footer: { tagline: 'Diseñado para servir a la Iglesia.', dev: 'Emaús es una app desarrollada por' },
      login: { title: 'INGRESO A EMAÚS', subtitle: 'Bienvenido de vuelta.', email: 'Correo electrónico', password: 'Contraseña', btn: 'Iniciar Sesión', error: 'Credenciales incorrectas.' },
      demo: { title: 'SOLICITAR DEMO', subtitle: 'Conozca cómo Emaús puede transformar su parroquia.', name: 'NOMBRE', role: 'CARGO', parish: 'PARROQUIA', submit: 'Enviar Solicitud', captcha_error: 'Captcha incorrecto', success_title: '¡Enviado!', success_msg: 'Nos contactaremos pronto.', close: 'Cerrar' }
    },
    dashboard: {
      welcome: 'Bienvenido,',
      welcome_subtitle: 'Aquí tienes un resumen del estado de tu parroquia para el día de hoy.',
      tour_card: {
        title: 'Guía de Inicio Rápido',
        subtitle: 'Aprende a digitalizar actas de sacramentos, emitir certificados oficiales y configurar tu firma digital en menos de 5 minutos.',
        btn: 'Comenzar Recorrido'
      },
      stats: {
        baptisms: 'Bautizos',
        marriages: 'Matrimonios'
      },
      community_highlight: 'Comunidad y Novedades',
      no_posts: 'No hay publicaciones recientes de la comunidad.',
      upcoming_events: 'Próximos Eventos de la Agenda',
      no_events: 'No hay eventos programados para los próximos días.',
      view_full_agenda: 'Ver Agenda Completa'
    },
    agenda: {
      title: 'Agenda Parroquial',
      new_event: 'Nuevo Evento',
      upcoming: 'Próximos Eventos',
      no_events: 'No hay eventos programados.',
      modal: {
        title: 'Programar Evento Parroquial',
        event_title: 'Título del Evento',
        date: 'Fecha',
        time: 'Hora',
        type: 'Tipo de Actividad',
        location: 'Ubicación / Lugar',
        cancel: 'Cancelar',
        save: 'Guardar Evento'
      }
    },
    sacraments: {
      title: 'Registro de Sacramentos',
      subtitle: 'Busca, edita y registra las actas digitalizadas de los sacramentos de tu parroquia.',
      new_record: 'Nuevo Registro',
      search_placeholder: 'Buscar por nombre del feligrés o rut...',
      detail: {
        editing: 'Editando Registro',
        record_card: 'Ficha de',
        edit: 'Editar',
        cancel: 'Cancelar',
        save: 'Guardar',
        observations: 'Observaciones',
        book_data: 'Datos de Libro Parroquial',
        book: 'Libro',
        page: 'Página',
        parish: 'Parroquia'
      },
      table: {
        name: 'Nombre Feligrés',
        date: 'Fecha',
        celebrant: 'Celebrante',
        book_page: 'Libro / Pág',
        actions: 'Acciones',
        view_details: 'Ver Ficha',
        no_records: 'No se encontraron registros de sacramentos.'
      },
      types: {
        Bautizo: 'Bautizo',
        Confirmación: 'Confirmación',
        Matrimonio: 'Matrimonio',
        Defunción: 'Defunción',
        'Primera Comunión': 'Primera Comunión'
      }
    },
    documents: {
      title: 'Editor de Documentos',
      new_document: 'Nuevo Documento',
      items: 'documento(s)',
      empty_folder: 'Esta carpeta está vacía.',
      cancel_back: 'Cancelar y volver',
      create_title: 'Crear Nuevo Documento',
      create_subtitle: 'Seleccione una plantilla oficial o inicie un diseño en blanco.',
      blank_doc: 'Documento en Blanco',
      start_scratch: 'Iniciar desde cero sin plantilla',
      use_template: 'Usar Plantilla',
      close: 'Cerrar',
      print: 'Imprimir / Exportar',
      save: 'Guardar Documento',
      untitled: 'Documento sin título',
      upsell: {
        title: 'Editor de Certificados Avanzado',
        desc: 'El Plan Avanzado te permite crear y editar actas, certificados de bautismo y matrimonio con un procesador de texto tipo Word.',
        benefit1: 'Generación automática de PDF oficiales',
        benefit2: 'Firma digital y sello de agua parroquial',
        cta: 'Mejorar a Plan Avanzado'
      }
    },
    messages: {
      support: 'Soporte Emaús',
      title: 'Mensajería Parroquial',
      search_placeholder: 'Buscar chats...',
      empty_state: 'No se encontraron conversaciones.',
      type_message: 'Escribe un mensaje...',
      no_chat_selected: 'Selecciona una conversación',
      subtitle: 'Inicia un chat con otras secretarías parroquiales o escribe a soporte técnico.',
      start_chat: 'Iniciar Nuevo Chat',
      directory: {
        title: 'Directorio de Parroquias',
        subtitle: 'Busca otras parroquias registradas y comienza una conversación.',
        search: 'Buscar por parroquia o ciudad...',
        start_conversation: 'Conversar'
      }
    },
    finances: {
      title: 'Módulo Financiero',
      subtitle: 'Controla los ingresos, egresos y estipendios de tu parroquia de manera ordenada.',
      stats: {
        balance: 'Balance Neto',
        income: 'Ingresos Mensuales',
        expenses: 'Egresos Mensuales',
        savings_rate: 'Tasa de Ahorro'
      },
      table: {
        header_date: 'Fecha',
        header_desc: 'Descripción',
        header_cat: 'Categoría',
        header_method: 'Medio de Pago',
        header_amount: 'Monto',
        header_actions: 'Acciones',
        income: 'Ingreso',
        expense: 'Egreso'
      },
      search_placeholder: 'Buscar por descripción...',
      filter: {
        all: 'Todos',
        income: 'Ingresos',
        expense: 'Egresos'
      },
      btn_add: 'Nueva Transacción',
      chart_title: 'Evolución Financiera',
      chart_income: 'Ingresos',
      chart_expenses: 'Egresos',
      modal: {
        title_add: 'Registrar Transacción',
        date: 'Fecha',
        type: 'Tipo',
        type_income: 'Ingreso',
        type_expense: 'Egreso',
        category: 'Categoría',
        amount: 'Monto',
        description: 'Descripción',
        payment_method: 'Medio de Pago',
        cancel: 'Cancelar',
        save: 'Guardar Transacción'
      },
      calculator: {
        title: 'Calculadora de Caja',
        clear: 'Borrar',
        use_amount: 'Usar Monto'
      },
      upsell: {
        title: 'Módulo de Finanzas',
        desc: 'El Plan Avanzado incluye herramientas de contabilidad parroquial, cálculo de ingresos por estipendios y gráficos comparativos.',
        benefit1: 'Estadísticas y tasa de ahorro mensual',
        benefit2: 'Libro auxiliar de caja digitalizado',
        cta: 'Mejorar a Plan Avanzado'
      }
    },
    leads: {
      title: 'Solicitudes de Demostración',
      subtitle: 'Administra los leads y parroquias interesadas en sumarse a Emaús.',
      table: {
        name: 'Contacto / Cargo',
        parish: 'Parroquia / Diócesis',
        status: 'Estado',
        date: 'Fecha Registro',
        actions: 'Acciones'
      },
      status: {
        new: 'Nuevo',
        contacted: 'Contactado',
        demo_scheduled: 'Demo Programada',
        closed: 'Ganado / Cerrado',
        lost: 'Perdido'
      }
    },
    users: {
      title: 'Administración de Usuarios',
      subtitle: 'Gestiona las credenciales, roles y planes activos de las parroquias registradas.',
      create_user: 'Crear Parroquia',
      search_placeholder: 'Buscar parroquia por correo...',
      table: {
        email: 'Correo de Acceso',
        parish: 'Nombre Parroquia',
        city: 'Ciudad / Diócesis',
        plan: 'Plan Activo',
        actions: 'Acciones'
      },
      actions: {
        edit_plan: 'Cambiar Suscripción',
        reset_pass: 'Enviar link de contraseña'
      },
      modal: {
        create_title: 'Registrar Nueva Parroquia',
        email: 'Correo Electrónico',
        password: 'Contraseña Temporal',
        plan: 'Plan Inicial',
        create: 'Crear Parroquia',
        edit_plan_title: 'Editar Plan de Suscripción',
        save: 'Guardar Cambios'
      }
    },
    support: {
      title: 'Soporte Técnico',
      subtitle: 'Envía tus consultas y reportes de incidencias directamente al equipo de Emaús.',
      status: {
        open: 'Abierto',
        in_progress: 'En Proceso',
        resolved: 'Resuelto',
        closed: 'Cerrado'
      },
      admin_dashboard: 'Panel de Soporte Técnico',
      create_ticket: 'Nuevo Ticket',
      chat: {
        placeholder: 'Escribe un mensaje de respuesta...'
      },
      form: {
        subject: 'Asunto',
        subject_ph: 'Ej: Error al imprimir certificado',
        priority: 'Prioridad',
        desc: 'Descripción de la incidencia',
        desc_ph: 'Detalla el problema que estás experimentando...',
        attach: 'Adjuntar archivo o captura',
        max_size: 'Tamaño máximo: 5MB',
        cancel: 'Cancelar',
        submit: 'Crear Ticket'
      }
    },
    community: {
      comments: 'Comentarios',
      write_comment: 'Escribe un comentario...',
      back_to_feed: 'Volver al Feed',
      title: 'Vida Eclesial',
      subtitle: 'Comparte novedades, publicaciones y conecta con otras secretarías del país.',
      new_post_placeholder: '¿Qué hay de nuevo en tu parroquia hoy?',
      upload_photo: 'Subir Foto',
      posting: 'Publicando...',
      publish: 'Publicar',
      no_posts: 'No hay publicaciones en este momento.',
      suggested_parishes: 'Parroquias Sugeridas',
      visit_profile: 'Visitar Perfil'
    },
    settings: {
      identity: 'Identidad Visual',
      avatar_desc: 'Icono del perfil',
      cover_desc: 'Imagen de portada',
      cover_image: 'Imagen de Portada',
      upload_cover: 'Subir Portada'
    },
    tour: {
      prev: 'Anterior',
      next: 'Siguiente',
      finish: 'Finalizar',
      steps: {
        dashboard: { title: 'Resumen General', desc: 'Una vista rápida del estado diario de tu parroquia, eventos de la agenda y novedades de la comunidad.' },
        agenda: { title: 'Calendario y Actividades', desc: 'Programa y administra misas, reuniones pastorales y eventos parroquiales de forma centralizada.' },
        sacraments: { title: 'Registro de Sacramentos', desc: 'Digitaliza, edita y busca actas oficiales de bautizos, matrimonios y confirmaciones en segundos.' },
        documents: { title: 'Editor de Certificados', desc: 'Genera certificados oficiales en PDF usando plantillas parroquiales preconfiguradas.' },
        community: { title: 'Comunidad y Feed', desc: 'Conecta con otras parroquias del país, comparte avisos y entérate de las novedades.' },
        messages: { title: 'Mensajería Directa', desc: 'Escribe directamente a otras secretarías parroquiales o chatea con el soporte de Emaús.' },
        finances: { title: 'Módulo Contable', desc: 'Lleva el control de ingresos, gastos y estipendios de tu parroquia con gráficos interactivos.' },
        support: { title: 'Ayuda y Soporte', desc: 'Genera tickets de soporte y habla con nuestro equipo técnico para resolver dudas.' }
      }
    }
  },
  en: {
    sidebar: { dashboard: 'Summary', agenda: 'Agenda', sacraments: 'Sacraments', documents: 'Documents', messages: 'Messages', finances: 'Finances', community: 'Community', settings: 'Settings', users: 'Users & Plans', support: 'Support', leads: 'Requests', logout: 'Log Out', role: 'Secretary', parish: 'Parish Management' },
    landing: {
      nav: { features: 'Features', benefits: 'Benefits', plans: 'Plans', login: 'Log In' },
      hero: { badge: 'PARISH MANAGEMENT 2.0', title_start: 'DIGITIZE YOUR', title_highlight: 'PARISH MISSION', subtitle: 'Emaús organizes administrative chaos, protects sacramental history, and frees up time for pastoral care.', cta_access: 'Access Platform', cta_plans: 'View Plans' },
      mockup: { sacrament: 'SACRAMENT', record_type: 'Baptism Record', label_name: 'NAME OF THE BAPTIZED', label_date: 'DATE', label_book: 'BOOK / PAGE', label_parents: 'PARENTS', badge_db: 'DATABASE', status_db: 'Digitized Record', badge_search: 'SEARCH', status_search: 'Record Found', badge_docs: 'DOCUMENTS', status_docs: 'Certificate Generated', chat_name: 'Sr. Maria', chat_msg: 'Record sent' },
      features: { title: 'Everything your office needs', subtitle: 'Emaús replaces multiple tools with a unified platform for the Church.', sacraments_title: 'Digital Sacraments', sacraments_desc: 'Digitize baptisms and marriages.', docs_title: '1-Click Certificates', docs_desc: 'Auto-generation of official certificates.', agenda_title: 'Pastoral Agenda', agenda_desc: 'Coordinate masses and meetings.', chat_title: 'Inter-Parish Chat', chat_desc: 'Connect with other secretaries securely.', btn_more: 'Discover more features' },
      plans: { title: 'Plans for every community', subtitle: 'Choose the best option for your parish.', basic_title: 'Basic Plan', basic_desc: 'For small parishes.', adv_title: 'Advanced Plan', adv_desc: 'Unlimited management.', forever: 'month', popular: 'RECOMMENDED', cta: 'Request Demo', feature_agenda: 'Parish Agenda', feature_sacraments: 'Sacramental Records', feature_certs: 'Automatic Certificates', feature_chat: 'Inter-Parish Chat', feature_editor: 'Word-type Editor', feature_finances: 'Finance Module', feature_basic_all: 'Everything in Basic', feature_reports: 'Reports & Stats', feature_support: 'Priority Support', feature_unlimited: 'Unlimited Chat' },
      community: { title: 'Never work alone again', card1_title: 'Emaús Community', card1_desc: 'Connected secretaries', card2_title: 'Instant Chat', card2_desc: 'Parish-to-parish communication', card3_title: 'Agile Docs', card3_desc: 'Share files instantly' },
      testimonials: { title: '"Emaús transformed our office"', subtitle: 'Before we spent hours searching books. Now we deliver in seconds.', t1_name: 'Sr. Lucia', t1_role: 'Secretary, Valparaiso', t1_text: '"It\'s so easy to contact other parishes."', t2_name: 'Fr. Andrew', t2_role: 'Pastor, Santiago', t2_text: '"The agenda order is priceless."', t3_name: 'Dcn. Carlos', t3_role: 'Deacon, Concepcion', t3_text: '"I can check data on my phone."' },
      footer: { tagline: 'Designed to serve the Church.', dev: 'Emaús is an app developed by' },
      login: { title: 'LOG IN TO EMAÚS', subtitle: 'Welcome back.', email: 'Email address', password: 'Password', btn: 'Log In', error: 'Incorrect credentials.' },
      demo: { title: 'REQUEST DEMO', subtitle: 'Discover how Emaús can transform your parish.', name: 'NAME', role: 'ROLE', parish: 'PARISH', submit: 'Send Request', captcha_error: 'Incorrect captcha', success_title: 'Sent!', success_msg: 'We will contact you shortly.', close: 'Close' }
    },
    dashboard: {
      welcome: 'Welcome,',
      welcome_subtitle: 'Here is a summary of your parish status for today.',
      tour_card: { title: 'Quick Start Guide', subtitle: 'Learn how to digitize sacrament records, issue official certificates, and set up your digital signature in less than 5 minutes.', btn: 'Start Tour' },
      stats: { baptisms: 'Baptisms', marriages: 'Marriages' },
      community_highlight: 'Community and News',
      no_posts: 'No recent community posts.',
      upcoming_events: 'Upcoming Agenda Events',
      no_events: 'No events scheduled for the next few days.',
      view_full_agenda: 'View Full Agenda'
    },
    agenda: {
      title: 'Parish Agenda',
      new_event: 'New Event',
      upcoming: 'Upcoming Events',
      no_events: 'No events scheduled.',
      modal: { title: 'Schedule Parish Event', event_title: 'Event Title', date: 'Date', time: 'Time', type: 'Activity Type', location: 'Location / Place', cancel: 'Cancel', save: 'Save Event' }
    },
    sacraments: {
      title: 'Sacraments Records',
      subtitle: 'Search, edit, and record digitized sacrament records for your parish.',
      new_record: 'New Record',
      search_placeholder: 'Search by parishioner name or ID...',
      detail: { editing: 'Editing Record', record_card: 'Record of', edit: 'Edit', cancel: 'Cancel', save: 'Save', observations: 'Observations', book_data: 'Parish Book Data', book: 'Book', page: 'Page', parish: 'Parish' },
      table: { name: 'Parishioner Name', date: 'Date', celebrant: 'Celebrant', book_page: 'Book / Page', actions: 'Actions', view_details: 'View Record', no_records: 'No sacrament records found.' },
      types: { Bautizo: 'Baptism', Confirmación: 'Confirmation', Matrimonio: 'Marriage', Defunción: 'Death', 'Primera Comunión': 'First Communion' }
    },
    documents: {
      title: 'Document Editor',
      new_document: 'New Document',
      items: 'document(s)',
      empty_folder: 'This folder is empty.',
      cancel_back: 'Cancel and go back',
      create_title: 'Create New Document',
      create_subtitle: 'Select an official template or start a blank design.',
      blank_doc: 'Blank Document',
      start_scratch: 'Start from scratch without template',
      use_template: 'Use Template',
      close: 'Close',
      print: 'Print / Export',
      save: 'Save Document',
      untitled: 'Untitled Document',
      upsell: { title: 'Advanced Certificate Editor', desc: 'The Advanced Plan allows you to create and edit records, baptism and marriage certificates with a Word-type editor.', benefit1: 'Automatic generation of official PDFs', benefit2: 'Digital signature and watermark', cta: 'Upgrade to Advanced' }
    },
    messages: {
      support: 'Emaús Support',
      title: 'Parish Messaging',
      search_placeholder: 'Search chats...',
      empty_state: 'No conversations found.',
      type_message: 'Type a message...',
      no_chat_selected: 'Select a conversation',
      subtitle: 'Start a chat with other parish offices or contact technical support.',
      start_chat: 'Start New Chat',
      directory: { title: 'Parish Directory', subtitle: 'Search for other registered parishes and start a conversation.', search: 'Search by parish or city...', start_conversation: 'Chat' }
    },
    finances: {
      title: 'Financial Module',
      subtitle: 'Manage income, expenses, and stipends for your parish in an organized manner.',
      stats: { balance: 'Net Balance', income: 'Monthly Income', expenses: 'Monthly Expenses', savings_rate: 'Savings Rate' },
      table: { header_date: 'Date', header_desc: 'Description', header_cat: 'Category', header_method: 'Payment Method', header_amount: 'Amount', header_actions: 'Actions', income: 'Income', expense: 'Expense' },
      search_placeholder: 'Search by description...',
      filter: { all: 'All', income: 'Income', expense: 'Expenses' },
      btn_add: 'New Transaction',
      chart_title: 'Financial Evolution',
      chart_income: 'Income',
      chart_expenses: 'Expenses',
      modal: { title_add: 'Record Transaction', date: 'Date', type: 'Type', type_income: 'Income', type_expense: 'Expense', category: 'Category', amount: 'Amount', description: 'Description', payment_method: 'Payment Method', cancel: 'Cancel', save: 'Save Transaction' },
      calculator: { title: 'Register Calculator', clear: 'Clear', use_amount: 'Use Amount' },
      upsell: { title: 'Finances Module', desc: 'The Advanced Plan includes parish accounting tools, income calculation from stipends, and comparative charts.', benefit1: 'Statistics and monthly savings rate', benefit2: 'Digitized auxiliary cash book', cta: 'Upgrade to Advanced' }
    },
    leads: {
      title: 'Demo Requests',
      subtitle: 'Manage leads and parishes interested in joining Emaús.',
      table: { name: 'Contact / Role', parish: 'Parish / Diocese', status: 'Status', date: 'Registration Date', actions: 'Actions' },
      status: { new: 'New', contacted: 'Contacted', demo_scheduled: 'Demo Scheduled', closed: 'Won / Closed', lost: 'Lost' }
    },
    users: {
      title: 'User Management',
      subtitle: 'Manage credentials, roles, and active plans of registered parishes.',
      create_user: 'Create Parish',
      search_placeholder: 'Search parish by email...',
      table: { email: 'Access Email', parish: 'Parish Name', city: 'City / Diocese', plan: 'Active Plan', actions: 'Actions' },
      actions: { edit_plan: 'Change Subscription', reset_pass: 'Send password reset link' },
      modal: { create_title: 'Register New Parish', email: 'Email Address', password: 'Temporary Password', plan: 'Initial Plan', create: 'Create Parish', edit_plan_title: 'Edit Subscription Plan', save: 'Save Changes' }
    },
    support: {
      title: 'Technical Support',
      subtitle: 'Send your queries and issue reports directly to the Emaús team.',
      status: { open: 'Open', in_progress: 'In Progress', resolved: 'Resolved', closed: 'Closed' },
      admin_dashboard: 'Support Dashboard',
      create_ticket: 'New Ticket',
      chat: { placeholder: 'Type a reply...' },
      form: { subject: 'Subject', subject_ph: 'e.g., Error printing certificate', priority: 'Priority', desc: 'Description of the issue', desc_ph: 'Detail the problem you are experiencing...', attach: 'Attach file or screenshot', max_size: 'Max size: 5MB', cancel: 'Cancel', submit: 'Create Ticket' }
    },
    community: {
      comments: 'Comments',
      write_comment: 'Write a comment...',
      back_to_feed: 'Back to Feed',
      title: 'Church Life',
      subtitle: 'Share updates, posts, and connect with other offices across the country.',
      new_post_placeholder: "What's new in your parish today?",
      upload_photo: 'Upload Photo',
      posting: 'Posting...',
      publish: 'Publish',
      no_posts: 'No posts at this moment.',
      suggested_parishes: 'Suggested Parishes',
      visit_profile: 'Visit Profile'
    },
    settings: { identity: 'Visual Identity', avatar_desc: 'Profile icon', cover_desc: 'Cover image', cover_image: 'Cover Image', upload_cover: 'Upload Cover' },
    tour: {
      prev: 'Previous',
      next: 'Next',
      finish: 'Finish',
      steps: {
        dashboard: { title: 'General Summary', desc: 'A quick view of your parish\'s daily status, agenda events, and community updates.' },
        agenda: { title: 'Calendar & Activities', desc: 'Schedule and manage masses, pastoral meetings, and parish events centrally.' },
        sacraments: { title: 'Sacramental Registry', desc: 'Digitize, edit, and search official records of baptisms, marriages, and confirmations in seconds.' },
        documents: { title: 'Certificate Editor', desc: 'Generate official PDF certificates using pre-configured parish templates.' },
        community: { title: 'Community & Feed', desc: 'Connect with other parishes in the country, share notices, and find out about updates.' },
        messages: { title: 'Direct Messaging', desc: 'Write directly to other parish offices or chat with Emaús support.' },
        finances: { title: 'Accounting Module', desc: 'Keep track of income, expenses, and stipends of your parish with interactive charts.' },
        support: { title: 'Help & Support', desc: 'Create support tickets and speak with our technical team to resolve questions.' }
      }
    }
  },
  pt: {
    sidebar: { dashboard: 'Resumo', agenda: 'Agenda', sacraments: 'Sacramentos', documents: 'Documentos', messages: 'Mensagens', finances: 'Finanças', community: 'Comunidade', settings: 'Configurações', users: 'Usuários e Planos', support: 'Suporte', leads: 'Solicitações', logout: 'Sair', role: 'Secretária', parish: 'Gestão Paroquial' },
    landing: {
      nav: { features: 'Recursos', benefits: 'Benefícios', plans: 'Planos', login: 'Iniciar Sessão' },
      hero: { badge: 'GESTÃO PAROQUIAL 2.0', title_start: 'DIGITALIZE A MISSÃO DA SUA', title_highlight: 'PARÓQUIA', subtitle: 'Emaús organiza o caos administrativo, protege a história sacramental e libera tempo para a pastoral.', cta_access: 'Acessar a Plataforma', cta_plans: 'Ver Planos' },
      mockup: { sacrament: 'SACRAMENTO', record_type: 'Ficha de Batismo', label_name: 'NOME DO BATIZADO', label_date: 'DATA', label_book: 'LIVRO / PÁG', label_parents: 'PAIS', badge_db: 'BASE DE DADOS', status_db: 'Registro Digitalizado', badge_search: 'BUSCA', status_search: 'Ficha Encontrada', badge_docs: 'DOCUMENTOS', status_docs: 'Certificado Gerado', chat_name: 'Ir. Maria', chat_msg: 'Partida enviada' },
      features: { title: 'Tudo o que sua secretaria precisa', subtitle: 'Emaús substitui várias ferramentas desconectadas por uma plataforma unificada projetada para a Igreja.', sacraments_title: 'Sacramentos Digitais', sacraments_desc: 'Digitalize Batizados e Casamentos.', docs_title: 'Certificados em 1 Clique', docs_desc: 'Geração automática de certificados oficiais.', agenda_title: 'Agenda Pastoral', agenda_desc: 'Coordene missas e reuniões em um calendário centralizado.', chat_title: 'Chat Interparoquial', chat_desc: 'Conecte-se com outras secretarias de forma segura.', btn_more: 'Conhecer mais recursos' },
      plans: { title: 'Planos desenhados para cada comunidade', subtitle: 'Escolha a melhor opção para a sua paróquia.', basic_title: 'Plano Básico', basic_desc: 'Para paróquias pequenas.', adv_title: 'Plano Avançado', adv_desc: 'Gestão integral sem limites.', forever: 'mês', popular: 'RECOMENDADO', cta: 'Solicitar Demo', feature_agenda: 'Agenda Paroquial', feature_sacraments: 'Registro de Sacramentos', feature_certs: 'Certificados Automáticos', feature_chat: 'Chat Interparoquial', feature_editor: 'Editor de Documentos tipo Word', feature_finances: 'Módulo de Finanças', feature_basic_all: 'Tudo do Plano Básico', feature_reports: 'Relatórios e Estatísticas', feature_support: 'Suporte Prioritário', feature_unlimited: 'Chat Ilimitado' },
      community: { title: 'Nunca mais trabalhe sozinho', card1_title: 'Comunidade Emaús', card1_desc: 'Secretárias conectadas', card2_title: 'Comunicação Instantânea', card2_desc: 'Chat exclusivo entre paróquias', card3_title: 'Documentação Ágil', card3_desc: 'Compartilhe arquivos instantaneamente' },
      testimonials: { title: '"Emaús transformou nossa secretaria"', subtitle: 'Antes passávamos horas procurando registros. Agora entregamos em segundos.', t1_name: 'Ir. Lúcia', t1_role: 'Secretária, Valparaíso', t1_text: '"É muito fácil contatar outras paróquias."', t2_name: 'Pe. André', t2_role: 'Pároco, Santiago', t2_text: '"A organização dos casamentos não tem preço."', t3_name: 'Diác. Carlos', t3_role: 'Diácono, Concepción', t3_text: '"Posso verificar dados do meu celular. Muito prático."' },
      footer: { tagline: 'Projetado para servir a Igreja.', dev: 'Emaús é um aplicativo desenvolvido por' },
      login: { title: 'ACESSO AO EMAÚS', subtitle: 'Bem-vindo de volta.', email: 'E-mail de acesso', password: 'Senha', btn: 'Iniciar Sessão', error: 'Credenciais incorretas.' },
      demo: { title: 'SOLICITAR DEMO', subtitle: 'Conheça como Emaús pode transformar sua paróquia.', name: 'NOME', role: 'CARGO', parish: 'PARÓQUIA', submit: 'Enviar Solicitação', captcha_error: 'Captcha incorreto', success_title: 'Enviado!', success_msg: 'Entraremos em contato em breve.', close: 'Fechar' }
    },
    dashboard: {
      welcome: 'Bem-vindo,',
      welcome_subtitle: 'Aqui está um resumo do estado da sua paróquia para o dia de hoje.',
      tour_card: { title: 'Guia de Início Rápido', subtitle: 'Aprenda a digitalizar atas de sacramentos, emitir certificados oficiais e configurar sua assinatura digital em menos de 5 minutos.', btn: 'Começar Roteiro' },
      stats: { baptisms: 'Batizados', marriages: 'Casamentos' },
      community_highlight: 'Comunidade e Novidades',
      no_posts: 'Não há publicações recentes da comunidade.',
      upcoming_events: 'Próximos Eventos da Agenda',
      no_events: 'Não há eventos agendados para os próximos dias.',
      view_full_agenda: 'Ver Agenda Completa'
    },
    agenda: {
      title: 'Agenda Paroquial',
      new_event: 'Novo Evento',
      upcoming: 'Próximos Eventos',
      no_events: 'Não há eventos agendados.',
      modal: { title: 'Programar Evento Paroquial', event_title: 'Título do Evento', date: 'Data', time: 'Hora', type: 'Tipo de Atividade', location: 'Localização / Lugar', cancel: 'Cancelar', save: 'Salvar Evento' }
    },
    sacraments: {
      title: 'Registro de Sacramentos',
      subtitle: 'Busque, edite e registre as atas digitalizadas dos sacramentos da sua paróquia.',
      new_record: 'Novo Registro',
      search_placeholder: 'Buscar por nome do fiel ou ID...',
      detail: { editing: 'Editando Registro', record_card: 'Ficha de', edit: 'Editar', cancel: 'Cancelar', save: 'Salvar', observations: 'Observações', book_data: 'Dados do Livro Paroquial', book: 'Livro', page: 'Página', parish: 'Paróquia' },
      table: { name: 'Nome do Fiel', date: 'Data', celebrant: 'Celebrante', book_page: 'Livro / Pág', actions: 'Ações', view_details: 'Ver Ficha', no_records: 'Nenhum registro de sacramento encontrado.' },
      types: { Bautizo: 'Batismo', Confirmación: 'Crisma', Matrimonio: 'Matrimônio', Defunción: 'Óbito', 'Primera Comunión': 'Primeira Comunhão' }
    },
    documents: {
      title: 'Editor de Documentos',
      new_document: 'Novo Documento',
      items: 'documento(s)',
      empty_folder: 'Esta pasta está vazia.',
      cancel_back: 'Cancelar e voltar',
      create_title: 'Criar Novo Documento',
      create_subtitle: 'Selecione um modelo oficial ou inicie um design em branco.',
      blank_doc: 'Documento em Branco',
      start_scratch: 'Iniciar do zero sem modelo',
      use_template: 'Usar Modelo',
      close: 'Fechar',
      print: 'Imprimir / Exportar',
      save: 'Salvar Documento',
      untitled: 'Documento sem título',
      upsell: { title: 'Editor de Certificados Avançado', desc: 'O Plano Avançado permite criar e editar atas, certificados de batismo e casamento com um processador de texto tipo Word.', benefit1: 'Geração automática de PDF oficiais', benefit2: 'Assinatura digital e marca d\'água', cta: 'Melhorar para Plano Avançado' }
    },
    messages: {
      support: 'Suporte Emaús',
      title: 'Mensagens Paroquiais',
      search_placeholder: 'Buscar conversas...',
      empty_state: 'Nenhuma conversa encontrada.',
      type_message: 'Escreva uma mensagem...',
      no_chat_selected: 'Selecione uma conversa',
      subtitle: 'Inicie uma conversa com outras secretarias paroquiais ou escreva para o suporte técnico.',
      start_chat: 'Iniciar Nova Conversa',
      directory: { title: 'Diretório de Paróquias', subtitle: 'Busque outras paróquias registradas e comece uma conversa.', search: 'Buscar por paróquia ou cidade...', start_conversation: 'Conversar' }
    },
    finances: {
      title: 'Módulo Financeiro',
      subtitle: 'Controle as receitas, despesas e estipêndios da sua paróquia de forma organizada.',
      stats: { balance: 'Saldo Líquido', income: 'Receitas Mensais', expenses: 'Despesas Mensais', savings_rate: 'Taxa de Poupança' },
      table: { header_date: 'Data', header_desc: 'Descrição', header_cat: 'Categoria', header_method: 'Meio de Pagamento', header_amount: 'Valor', header_actions: 'Ações', income: 'Receita', expense: 'Despesa' },
      search_placeholder: 'Buscar por descrição...',
      filter: { all: 'Todos', income: 'Receitas', expense: 'Despesas' },
      btn_add: 'Nova Transação',
      chart_title: 'Evolução Financeira',
      chart_income: 'Receitas',
      chart_expenses: 'Despesas',
      modal: { title_add: 'Registrar Transação', date: 'Data', type: 'Tipo', type_income: 'Receita', type_expense: 'Despesa', category: 'Categoria', amount: 'Valor', description: 'Descrição', payment_method: 'Meio de Pagamento', cancel: 'Cancelar', save: 'Salvar Transação' },
      calculator: { title: 'Calculadora de Caixa', clear: 'Limpar', use_amount: 'Usar Valor' },
      upsell: { title: 'Módulo de Finanças', desc: 'O Plano Avançado inclui ferramentas de contabilidade paroquial, cálculo de receitas por estipêndios e gráficos comparativos.', benefit1: 'Estatísticas e taxa de poupança mensal', benefit2: 'Livro caixa auxiliar digitalizado', cta: 'Melhorar para Plano Avançado' }
    },
    leads: {
      title: 'Solicitações de Demonstração',
      subtitle: 'Gerencie leads e paróquias interessadas em ingressar no Emaús.',
      table: { name: 'Contato / Cargo', parish: 'Paróquia / Diocese', status: 'Estado', date: 'Data de Registro', actions: 'Ações' },
      status: { new: 'Novo', contacted: 'Contatado', demo_scheduled: 'Demo Agendada', closed: 'Ganho / Fechado', lost: 'Perdido' }
    },
    users: {
      title: 'Gerenciamento de Usuários',
      subtitle: 'Gerencie credenciais, funções e planos ativos de paróquias registradas.',
      create_user: 'Criar Paróquia',
      search_placeholder: 'Buscar paróquia por e-mail...',
      table: { email: 'E-mail de Acesso', parish: 'Nome da Paróquia', city: 'Cidade / Diocese', plan: 'Plano Ativo', actions: 'Ações' },
      actions: { edit_plan: 'Alterar Assinatura', reset_pass: 'Enviar link de redefinição de senha' },
      modal: { create_title: 'Registrar Nova Paróquia', email: 'Endereço de E-mail', password: 'Senha Temporária', plan: 'Plano Inicial', create: 'Criar Paróquia', edit_plan_title: 'Editar Plano de Assinatura', save: 'Salvar Alterações' }
    },
    support: {
      title: 'Suporte Técnico',
      subtitle: 'Envie suas dúvidas e relatórios de problemas diretamente para a equipe do Emaús.',
      status: { open: 'Aberto', in_progress: 'Em Progresso', resolved: 'Resolvido', closed: 'Fechado' },
      admin_dashboard: 'Painel de Suporte',
      create_ticket: 'Novo Ticket',
      chat: { placeholder: 'Digite uma resposta...' },
      form: { subject: 'Assunto', subject_ph: 'Ex: Erro ao imprimir certificado', priority: 'Prioridade', desc: 'Descrição do problema', desc_ph: 'Detalhe o problema que está enfrentando...', attach: 'Anexar arquivo ou captura de tela', max_size: 'Tamanho máximo: 5MB', cancel: 'Cancelar', submit: 'Criar Ticket' }
    },
    community: {
      comments: 'Comentários',
      write_comment: 'Escreva um comentário...',
      back_to_feed: 'Voltar ao Feed',
      title: 'Vida Eclesial',
      subtitle: 'Compartilhe novidades, publicações e conecte-se com outras secretarias do país.',
      new_post_placeholder: 'O que há de novo na sua paróquia hoje?',
      upload_photo: 'Enviar Foto',
      posting: 'Publicando...',
      publish: 'Publicar',
      no_posts: 'Não há publicações no momento.',
      suggested_parishes: 'Paróquias Sugeridas',
      visit_profile: 'Visitar Perfil'
    },
    settings: { identity: 'Identidade Visual', avatar_desc: 'Ícone de perfil', cover_desc: 'Imagem de capa', cover_image: 'Imagem de Capa', upload_cover: 'Enviar Capa' },
    tour: {
      prev: 'Anterior',
      next: 'Próximo',
      finish: 'Finalizar',
      steps: {
        dashboard: { title: 'Resumo Geral', desc: 'Uma visão rápida do estado diário da sua paróquia, eventos da agenda e novidades da comunidade.' },
        agenda: { title: 'Calendário e Atividades', desc: 'Agende e gerencie missas, reuniões pastorais e eventos paroquiais de forma centralizada.' },
        sacraments: { title: 'Registro de Sacramentos', desc: 'Digitalize, edite e busque atas oficiais de batizados, casamentos e crismas em segundos.' },
        documents: { title: 'Editor de Certificados', desc: 'Gere certificados oficiais em PDF usando modelos paroquiais pré-configurados.' },
        community: { title: 'Comunidade e Feed', desc: 'Conecte-se com outras paróquias do país, compartilhe avisos e saiba das novidades.' },
        messages: { title: 'Mensagens Diretas', desc: 'Escreva diretamente para outras secretarias paroquiais ou converse com o suporte do Emaús.' },
        finances: { title: 'Módulo Contábil', desc: 'Controle as receitas, despesas e estipêndios da sua paróquia com gráficos interativos.' },
        support: { title: 'Ajuda e Suporte', desc: 'Crie tíquetes de suporte e fale com nossa equipe técnica para tirar dúvidas.' }
      }
    }
  },
  fr: {
    sidebar: { dashboard: 'Résumé', agenda: 'Agenda', sacraments: 'Sacrements', documents: 'Documents', messages: 'Messages', finances: 'Finances', community: 'Communauté', settings: 'Paramètres', users: 'Utilisateurs et Plans', support: 'Support', leads: 'Demandes', logout: 'Déconnexion', role: 'Secrétaire', parish: 'Gestion Paroissiale' },
    landing: {
      nav: { features: 'Fonctionnalités', benefits: 'Avantages', plans: 'Tarifs', login: 'Connexion' },
      hero: { badge: 'GESTION PAROISSIALE 2.0', title_start: 'NUMÉRISEZ LA MISSION DE VOTRE', title_highlight: 'PAROISSE', subtitle: 'Emaús organise le chaos administratif, protège l\'histoire sacramentelle et libère du temps pour la pastorale.', cta_access: 'Accéder à la Plateforme', cta_plans: 'Voir les Tarifs' },
      mockup: { sacrament: 'SACREMENT', record_type: 'Fiche de Baptême', label_name: 'NOM DU BAPTISÉ', label_date: 'DATE', label_book: 'LIVRE / PAGE', label_parents: 'PARENTS', badge_db: 'BASE DE DONNÉES', status_db: 'Registre Numérisé', badge_search: 'RECHERCHE', status_search: 'Fiche Trouvée', badge_docs: 'DOCUMENTS', status_docs: 'Certificat Généré', chat_name: 'Sr. Marie', chat_msg: 'Copie envoyée' },
      features: { title: 'Tout ce dont votre secrétariat a besoin', subtitle: 'Emaús remplace plusieurs outils par une plateforme unique conçue pour l\'Église.', sacraments_title: 'Sacrements Numériques', sacraments_desc: 'Numérisez les baptêmes et les mariages.', docs_title: 'Certificats en 1 Clic', docs_desc: 'Génération automatique de certificats officiels.', agenda_title: 'Agenda Pastoral', agenda_desc: 'Coordonnez les messes et les réunions dans un calendrier centralisé.', chat_title: 'Chat Interparoissial', chat_desc: 'Connectez-vous en toute sécurité avec d\'autres secrétariats.', btn_more: 'Découvrir plus de fonctionnalités' },
      plans: { title: 'Des plans conçus pour chaque communauté', subtitle: 'Choisissez la meilleure option pour votre paroisse.', basic_title: 'Plan Basique', basic_desc: 'Pour les petites paroisses.', adv_title: 'Plan Avancé', adv_desc: 'Gestion intégrale sans limites.', forever: 'mois', popular: 'RECOMMANDÉ', cta: 'Demander une Démo', feature_agenda: 'Agenda Paroissial', feature_sacraments: 'Registre des Sacrements', feature_certs: 'Certificats Automatiques', feature_chat: 'Chat Interparoissial', feature_editor: 'Éditeur de Documents type Word', feature_finances: 'Module de Finances', feature_basic_all: 'Tout du Plan Basique', feature_reports: 'Rapports et Statistiques', feature_support: 'Support Prioritaire', feature_unlimited: 'Chat et Répertoire Illimité' },
      community: { title: 'Ne travaillez plus jamais seul', card1_title: 'Communauté Emaús', card1_desc: 'Secrétaires connectées', card2_title: 'Communication Instantanée', card2_desc: 'Chat exclusif entre paroisses', card3_title: 'Documentation Agile', card3_desc: 'Partagez des fichiers instantanément' },
      testimonials: { title: '"Emaús a transformé notre bureau"', subtitle: 'Avant nous cherchions des heures. Maintenant nous délivrons en quelques secondes.', t1_name: 'Sr. Lucie', t1_role: 'Secrétaire, Valparaiso', t1_text: '"C\'est si facile de contacter les autres paroisses."', t2_name: 'P. André', t2_role: 'Curé, Santiago', t2_text: '"L\'organisation des mariages est inestimable."', t3_name: 'Diacre Carlos', t3_role: 'Diacre, Concepción', t3_text: '"Je peux vérifier les données depuis mon mobile. Très pratique."' },
      footer: { tagline: 'Conçu pour servir l\'Église.', dev: 'Emaús est une application développée par' },
      login: { title: 'CONNEXION À EMAÚS', subtitle: 'Bon retour.', email: 'Adresse e-mail', password: 'Mot de passe', btn: 'Se Connecter', error: 'Identifiants incorrects.' },
      demo: { title: 'DEMANDER UNE DÉMO', subtitle: 'Découvrez comment Emaús peut transformer votre paroisse.', name: 'NOM', role: 'POSTE', parish: 'PAROISSE', submit: 'Envoyer la Demande', captcha_error: 'Captcha incorrect', success_title: 'Envoyé!', success_msg: 'Nous vous contacterons bientôt.', close: 'Fermer' }
    },
    dashboard: {
      welcome: 'Bienvenue,',
      welcome_subtitle: 'Voici un résumé de l\'état de votre paroisse pour aujourd\'hui.',
      tour_card: { title: 'Guide de Démarrage Rapide', subtitle: 'Apprenez à numériser des actes, émettre des certificats officiels et configurer votre signature numérique en moins de 5 minutes.', btn: 'Commencer la Visite' },
      stats: { baptisms: 'Baptêmes', marriages: 'Mariages' },
      community_highlight: 'Communauté et Nouveautés',
      no_posts: 'Aucune publication récente de la communauté.',
      upcoming_events: 'Événements à Venir',
      no_events: 'Aucun événement prévu pour les prochains jours.',
      view_full_agenda: 'Voir l\'Agenda Complet'
    },
    agenda: {
      title: 'Agenda Paroissial',
      new_event: 'Nouvel Événement',
      upcoming: 'Événements à Venir',
      no_events: 'Aucun événement programmé.',
      modal: { title: 'Programmer un Événement Paroissial', event_title: 'Titre de l\'Événement', date: 'Date', time: 'Heure', type: 'Type d\'Activité', location: 'Lieu / Emplacement', cancel: 'Annuler', save: 'Enregistrer l\'Événement' }
    },
    sacraments: {
      title: 'Registre des Sacrements',
      subtitle: 'Recherchez, modifiez et enregistrez les actes numérisés des sacrements de votre paroisse.',
      new_record: 'Nouveau Registre',
      search_placeholder: 'Rechercher par nom de fidèle ou ID...',
      detail: { editing: 'Modification du Registre', record_card: 'Fiche de', edit: 'Modifier', cancel: 'Annuler', save: 'Enregistrer', observations: 'Observations', book_data: 'Données du Registre Paroissial', book: 'Livre', page: 'Page', parish: 'Paroisse' },
      table: { name: 'Nom du Fidèle', date: 'Date', celebrant: 'Célébrant', book_page: 'Livre / Page', actions: 'Actions', view_details: 'Voir la Fiche', no_records: 'Aucun registre de sacrement trouvé.' },
      types: { Bautizo: 'Baptême', Confirmación: 'Confirmation', Matrimonio: 'Mariage', Defunción: 'Décès', 'Primera Comunión': 'Première Communion' }
    },
    documents: {
      title: 'Éditeur de Documents',
      new_document: 'Nouveau Document',
      items: 'document(s)',
      empty_folder: 'Ce dossier est vide.',
      cancel_back: 'Annuler et revenir',
      create_title: 'Créer un Nouveau Document',
      create_subtitle: 'Sélectionnez un modèle officiel ou commencez un modèle vierge.',
      blank_doc: 'Document Vierge',
      start_scratch: 'Partir de zéro sans modèle',
      use_template: 'Utiliser le Modèle',
      close: 'Fermer',
      print: 'Imprimer / Exporter',
      save: 'Enregistrer le Document',
      untitled: 'Document sans titre',
      upsell: { title: 'Éditeur de Certificats Avancé', desc: 'Le Plan Avancé vous permet de créer et modifier des actes, certificats de baptême et mariage avec un éditeur de texte type Word.', benefit1: 'Génération automatique de PDF officiels', benefit2: 'Signature numérique et filigrane', cta: 'Passer au Plan Avancé' }
    },
    messages: {
      support: 'Support Emaús',
      title: 'Messagerie Paroissiale',
      search_placeholder: 'Rechercher des discussions...',
      empty_state: 'Aucune conversation trouvée.',
      type_message: 'Écrivez un message...',
      no_chat_selected: 'Sélectionnez une discussion',
      subtitle: 'Démarrez une discussion avec d\'autres secrétariats ou contactez le support technique.',
      start_chat: 'Nouvelle Discussion',
      directory: { title: 'Répertoire des Paroisses', subtitle: 'Recherchez d\'autres paroisses enregistrées et démarrez une discussion.', search: 'Rechercher par paroisse ou ville...', start_conversation: 'Discuter' }
    },
    finances: {
      title: 'Module Financier',
      subtitle: 'Gérez de façon organisée les revenus, dépenses et offrandes de votre paroisse.',
      stats: { balance: 'Solde Net', income: 'Revenus Mensuels', expenses: 'Dépenses Mensuelles', savings_rate: 'Taux d\'Épargne' },
      table: { header_date: 'Date', header_desc: 'Description', header_cat: 'Catégorie', header_method: 'Mode de Paiement', header_amount: 'Montant', header_actions: 'Actions', income: 'Revenu', expense: 'Dépense' },
      search_placeholder: 'Rechercher par description...',
      filter: { all: 'Tous', income: 'Revenus', expense: 'Dépenses' },
      btn_add: 'Nouvelle Transaction',
      chart_title: 'Évolution Financière',
      chart_income: 'Revenus',
      chart_expenses: 'Dépenses',
      modal: { title_add: 'Enregistrer une Transaction', date: 'Date', type: 'Type', type_income: 'Revenu', type_expense: 'Dépense', category: 'Catégorie', amount: 'Montant', description: 'Description', payment_method: 'Mode de Paiement', cancel: 'Annuler', save: 'Enregistrer la Transaction' },
      calculator: { title: 'Calculatrice de Caisse', clear: 'Effacer', use_amount: 'Utiliser' },
      upsell: { title: 'Module de Finances', desc: 'Le Plan Avancé inclut des outils de comptabilité paroissiale, calcul des offrandes et graphiques comparatifs.', benefit1: 'Statistiques et taux d\'épargne mensuel', benefit2: 'Livre de caisse auxiliaire numérisé', cta: 'Passer au Plan Avancé' }
    },
    leads: {
      title: 'Demandes de Démo',
      subtitle: 'Gérez les prospects et paroisses intéressés à rejoindre Emaús.',
      table: { name: 'Contact / Poste', parish: 'Paroisse / Diocèse', status: 'Statut', date: 'Date d\'Inscription', actions: 'Actions' },
      status: { new: 'Nouveau', contacted: 'Contacté', demo_scheduled: 'Démo Programmée', closed: 'Gagné / Fermé', lost: 'Perdu' }
    },
    users: {
      title: 'Gestion des Utilisateurs',
      subtitle: 'Gérez les identifiants, rôles et plans actifs des paroisses enregistrées.',
      create_user: 'Créer une Paroisse',
      search_placeholder: 'Rechercher par e-mail...',
      table: { email: 'E-mail d\'Accès', parish: 'Nom Paroisse', city: 'Ville / Diocèse', plan: 'Plan Actif', actions: 'Actions' },
      actions: { edit_plan: 'Modifier l\'Abonnement', reset_pass: 'Envoyer lien de mot de passe' },
      modal: { create_title: 'Enregistrer une Paroisse', email: 'Adresse e-mail', password: 'Mot de passe temporaire', plan: 'Plan Initial', create: 'Créer Paroisse', edit_plan_title: 'Modifier le Plan', save: 'Enregistrer les Changements' }
    },
    support: {
      title: 'Support Technique',
      subtitle: 'Envoyez vos questions et rapports d\'incidents directement à l\'équipe d\'Emaús.',
      status: { open: 'Ouvert', in_progress: 'En Cours', resolved: 'Résolu', closed: 'Fermé' },
      admin_dashboard: 'Tableau de Bord Support',
      create_ticket: 'Nouveau Ticket',
      chat: { placeholder: 'Écrivez une réponse...' },
      form: { subject: 'Sujet', subject_ph: 'Ex: Erreur lors de l\'impression du certificat', priority: 'Priorité', desc: 'Description du problème', desc_ph: 'Décrivez le problème que vous rencontrez...', attach: 'Joindre un fichier ou une capture d\'écran', max_size: 'Taille max: 5Mo', cancel: 'Annuler', submit: 'Créer le Ticket' }
    },
    community: {
      comments: 'Commentaires',
      write_comment: 'Écrire un commentaire...',
      back_to_feed: 'Retour au Feed',
      title: 'Vie de l\'Église',
      subtitle: 'Partagez des nouvelles, publications et connectez-vous avec d\'autres secrétariats.',
      new_post_placeholder: 'Quoi de neuf dans votre paroisse aujourd\'hui?',
      upload_photo: 'Ajouter Photo',
      posting: 'Publication...',
      publish: 'Publier',
      no_posts: 'Aucune publication pour le moment.',
      suggested_parishes: 'Paroisses Suggérées',
      visit_profile: 'Voir le Profil'
    },
    settings: { identity: 'Identité Visuelle', avatar_desc: 'Icône de profil', cover_desc: 'Image de couverture', cover_image: 'Image de Couverture', upload_cover: 'Télécharger Couverture' },
    tour: {
      prev: 'Précédent',
      next: 'Suivant',
      finish: 'Terminer',
      steps: {
        dashboard: { title: 'Résumé Général', desc: 'Un aperçu rapide de l\'état quotidien de votre paroisse, des événements de l\'agenda et des nouveautés de la communauté.' },
        agenda: { title: 'Calendrier et Activités', desc: 'Planifiez et gérez les messes, les réunions pastorales et les événements paroissiaux de manière centralisée.' },
        sacraments: { title: 'Registre des Sacrements', desc: 'Numérisez, modifiez et recherchez des actes officiels de baptêmes, mariages et confirmations en quelques secondes.' },
        documents: { title: 'Éditeur de Certificats', desc: 'Générez des certificats officiels en PDF à l\'aide de modèles paroissiaux préconfigurés.' },
        community: { title: 'Communauté et Fil d\'actualité', desc: 'Connectez-vous avec d\'autres paroisses du pays, partagez des avis et tenez-vous informé des nouveautés.' },
        messages: { title: 'Messagerie Directe', desc: 'Écrivez directement à d\'autres secrétariats paroissiaux ou discutez avec le support d\'Emaús.' },
        finances: { title: 'Module Comptable', desc: 'Suivez les revenus, les dépenses et les offrandes de votre paroisse grâce à des graphiques interactifs.' },
        support: { title: 'Aide et Support', desc: 'Créez des tickets de support et discutez avec notre équipe technique pour résoudre vos questions.' }
      }
    }
  },
  it: {
    sidebar: { dashboard: 'Riepilogo', agenda: 'Agenda', sacraments: 'Sacramenti', documents: 'Documenti', messages: 'Messaggi', finances: 'Finanze', community: 'Comunità', settings: 'Impostazioni', users: 'Utenti e Piani', support: 'Supporto', leads: 'Richieste', logout: 'Esci', role: 'Segretaria', parish: 'Gestione Parrocchiale' },
    landing: {
      nav: { features: 'Funzionalità', benefits: 'Vantaggi', plans: 'Piani', login: 'Accedi' },
      hero: { badge: 'GESTIONE PARROCCHIALE 2.0', title_start: 'DIGITALIZZA LA MISSIONE DELLA TUA', title_highlight: 'PARROCCHIA', subtitle: 'Emaús ordina il caos amministrativo, protegge la storia sacramentale e libera tempo per la pastorale.', cta_access: 'Accedi alla Piattaforma', cta_plans: 'Vedi i Piani' },
      mockup: { sacrament: 'SACRAMENTO', record_type: 'Scheda di Battesimo', label_name: 'NOME DEL BATTEZZATO', label_date: 'DATA', label_book: 'LIBRO / PAG', label_parents: 'GENITORI', badge_db: 'DATABASE', status_db: 'Registro Digitalizzato', badge_search: 'RICERCA', status_search: 'Scheda Trovata', badge_docs: 'DOCUMENTI', status_docs: 'Certificato Generato', chat_name: 'Suor Maria', chat_msg: 'Certificato inviato' },
      features: { title: 'Tutto ciò di cui la tua segreteria ha bisogno', subtitle: 'Emaús sostituisce molteplici strumenti scollegati con una piattaforma unificata progettata per la Chiesa.', sacraments_title: 'Sacramenti Digitali', sacraments_desc: 'Digitalizza Battesimi e Matrimoni.', docs_title: 'Certificati in 1 Clic', docs_desc: 'Generazione automatica di certificati ufficial.', agenda_title: 'Agenda Pastorale', agenda_desc: 'Coordina messe e riunioni in un calendario centralizzato.', chat_title: 'Chat Interparrocchiale', chat_desc: 'Connettiti in modo sicuro con altre segreterie.', btn_more: 'Scopri altre funzionalità' },
      plans: { title: 'Piani progettati per ogni comunità', subtitle: 'Scegli l\'opzione migliore per la tua parrocchia.', basic_title: 'Piano Base', basic_desc: 'Per piccole parrocchie.', adv_title: 'Piano Avanzato', adv_desc: 'Gestione completa senza limiti.', forever: 'mese', popular: 'RACCOMANDATO', cta: 'Richiedi Demo', feature_agenda: 'Agenda Parrocchiale', feature_sacraments: 'Registro dei Sacramenti', feature_certs: 'Certificati Automatici', feature_chat: 'Chat Interparrocchiale', feature_editor: 'Editor di Documenti tipo Word', feature_finances: 'Modulo Finanze', feature_basic_all: 'Tutto del Piano Base', feature_reports: 'Report e Statistiche', feature_support: 'Supporto Prioritario', feature_unlimited: 'Chat e Rubrica Illimitata' },
      community: { title: 'Non lavorare mai più da solo', card1_title: 'Comunità Emaús', card1_desc: 'Segretarie connesse', card2_title: 'Comunicazione Istantanea', card2_desc: 'Chat esclusiva tra parrocchie', card3_title: 'Documentazione Agile', card3_desc: 'Condividi file all\'istante' },
      testimonials: { title: '"Emaús ha trasformato la nostra segreteria"', subtitle: 'Prima cercavamo per ore. Ora consegniamo in pochi secondi.', t1_name: 'Suor Lucia', t1_role: 'Segretaria, Valparaiso', t1_text: '"È semplicissimo contattare le altre parrocchie."', t2_name: 'Don Andrea', t2_role: 'Parroco, Santiago', t2_text: '"L\'ordine nell\'agenda dei matrimoni è impagabile."', t3_name: 'Diac. Carlos', t3_role: 'Diacono, Concepción', t3_text: '"Posso controllare i dati dal cellulare. Molto pratico."' },
      footer: { tagline: 'Progettato per servire la Chiesa.', dev: 'Emaús è un\'applicazione sviluppata da' },
      login: { title: 'ACCESSO A EMAÚS', subtitle: 'Bentornato.', email: 'Indirizzo e-mail', password: 'Password', btn: 'Accedi', error: 'Credenziali non corrette.' },
      demo: { title: 'RICHIEDI DEMO', subtitle: 'Scopri come Emaús può trasformare la tua parrocchia.', name: 'NOME', role: 'RUOLO', parish: 'PARROCCHIA', submit: 'Invia Richiesta', captcha_error: 'Captcha errato', success_title: 'Inviato!', success_msg: 'Ti contatteremo al più presto.', close: 'Chiudi' }
    },
    dashboard: {
      welcome: 'Benvenuto,',
      welcome_subtitle: 'Ecco un riepilogo dello stato della tua parrocchia per oggi.',
      tour_card: { title: 'Guida di Avvio Rapido', subtitle: 'Impara a digitalizzare atti dei sacramenti, emettere certificati e configurare la firma digitale in meno di 5 minuti.', btn: 'Inizia il Tour' },
      stats: { baptisms: 'Battesimi', marriages: 'Matrimoni' },
      community_highlight: 'Comunità e Novità',
      no_posts: 'Nessun post recente dalla comunità.',
      upcoming_events: 'Prossimi Eventi in Agenda',
      no_events: 'Nessun evento in programma nei prossimi giorni.',
      view_full_agenda: 'Vedi Agenda Completa'
    },
    agenda: {
      title: 'Agenda Parrocchiale',
      new_event: 'Nuovo Evento',
      upcoming: 'Prossimi Eventi',
      no_events: 'Nessun evento programmato.',
      modal: { title: 'Programma Evento Parrocchiale', event_title: 'Titolo dell\'Evento', date: 'Data', time: 'Ora', type: 'Tipo di Attività', location: 'Luogo / Posizione', cancel: 'Annulla', save: 'Salva Evento' }
    },
    sacraments: {
      title: 'Registro dei Sacramenti',
      subtitle: 'Cerca, modifica e registra gli atti digitalizzati dei sacramenti della tua parrocchia.',
      new_record: 'Nuovo Registro',
      search_placeholder: 'Cerca per nome del fedele o ID...',
      detail: { editing: 'Modifica del Registro', record_card: 'Scheda di', edit: 'Modifica', cancel: 'Annulla', save: 'Salva', observations: 'Osservazioni', book_data: 'Dati del Registro Parrocchiale', book: 'Libro', page: 'Pagina', parish: 'Parrocchia' },
      table: { name: 'Nome del Fedele', date: 'Data', celebrant: 'Celebrante', book_page: 'Libro / Pag', actions: 'Azioni', view_details: 'Vedi Scheda', no_records: 'Nessun registro di sacramento trovato.' },
      types: { Bautizo: 'Battesimo', Confirmación: 'Cresima', Matrimonio: 'Matrimonio', Defunción: 'Decesso', 'Primera Comunión': 'Prima Comunione' }
    },
    documents: {
      title: 'Editor di Documenti',
      new_document: 'Nuovo Documento',
      items: 'documento(i)',
      empty_folder: 'Questa cartella è vuota.',
      cancel_back: 'Annulla e torna indietro',
      create_title: 'Crea Nuovo Documento',
      create_subtitle: 'Seleziona un modello ufficiale o inizia un documento vuoto.',
      blank_doc: 'Documento Vuoto',
      start_scratch: 'Inizia da zero senza modello',
      use_template: 'Usa Modello',
      close: 'Chiudi',
      print: 'Stampa / Esporta',
      save: 'Salva Documento',
      untitled: 'Documento senza titolo',
      upsell: { title: 'Editor Certificati Avanzato', desc: 'Il Piano Avanzato consente di creare e modificare atti, certificati di battesimo e matrimonio con un editor di testo tipo Word.', benefit1: 'Generazione automatica di PDF ufficiali', benefit2: 'Firma digitale e filigrana parrocchiale', cta: 'Passa al Piano Avanzato' }
    },
    messages: {
      support: 'Supporto Emaús',
      title: 'Messaggistica Parrocchiale',
      search_placeholder: 'Cerca conversazioni...',
      empty_state: 'Nessuna conversazione trovata.',
      type_message: 'Scrivi un messaggio...',
      no_chat_selected: 'Seleziona una conversazione',
      subtitle: 'Inizia una chat con altre segreterie o contatta il supporto tecnico.',
      start_chat: 'Nuova Conversazione',
      directory: { title: 'Rubrica Parrocchiale', subtitle: 'Cerca altre parrocchie registrate e avvia una chat.', search: 'Cerca per parrocchia o città...', start_conversation: 'Chatta' }
    },
    finances: {
      title: 'Modulo Finanziario',
      subtitle: 'Gestisci le entrate, le uscite e le offerte della tua parrocchia in modo organizzato.',
      stats: { balance: 'Saldo Netto', income: 'Entrate Mensili', expenses: 'Uscite Mensili', savings_rate: 'Tasso di Risparmio' },
      table: { header_date: 'Data', header_desc: 'Descrizione', header_cat: 'Categoria', header_method: 'Metodo di Pagamento', header_amount: 'Importo', header_actions: 'Azioni', income: 'Entrata', expense: 'Uscita' },
      search_placeholder: 'Cerca per descrizione...',
      filter: { all: 'Tutti', income: 'Entrate', expense: 'Uscite' },
      btn_add: 'Nuova Transazione',
      chart_title: 'Andamento Finanziario',
      chart_income: 'Entrate',
      chart_expenses: 'Uscite',
      modal: { title_add: 'Registra Transazione', date: 'Data', type: 'Tipo', type_income: 'Entrata', type_expense: 'Uscita', category: 'Categoria', amount: 'Importo', description: 'Descrizione', payment_method: 'Metodo di Pagamento', cancel: 'Annulla', save: 'Salva Transazione' },
      calculator: { title: 'Calcolatrice Cassa', clear: 'Cancella', use_amount: 'Usa Importo' },
      upsell: { title: 'Modulo di Finanze', desc: 'Il Piano Avanzato include strumenti di contabilità parrocchiale, calcolo delle offerte e grafici comparativi.', benefit1: 'Statistiche e tasso di risparmio mensile', benefit2: 'Libro cassa ausiliario digitalizzato', cta: 'Passa al Piano Avanzato' }
    },
    leads: {
      title: 'Richieste di Demo',
      subtitle: 'Gestisci i contatti e le parrocchie interessate ad unirsi a Emaús.',
      table: { name: 'Contatto / Ruolo', parish: 'Parrocchia / Diocesi', status: 'Stato', date: 'Data Registrazione', actions: 'Azioni' },
      status: { new: 'Nuovo', contacted: 'Contattato', demo_scheduled: 'Demo Programmata', closed: 'Vinto / Chiuso', lost: 'Perso' }
    },
    users: {
      title: 'Gestione Utenti',
      subtitle: 'Gestisci credenziali, ruoli e piani attivi delle parrocchie registrate.',
      create_user: 'Crea Parrocchia',
      search_placeholder: 'Cerca parrocchia per e-mail...',
      table: { email: 'E-mail di Accesso', parish: 'Nome Parrocchia', city: 'Città / Diocesi', plan: 'Piano Attivo', actions: 'Azioni' },
      actions: { edit_plan: 'Modifica Abbonamento', reset_pass: 'Invia link reimpostazione password' },
      modal: { create_title: 'Registra Nuova Parrocchia', email: 'Indirizzo e-mail', password: 'Password temporanea', plan: 'Piano Iniziale', create: 'Crea Parrocchia', edit_plan_title: 'Modifica il Piano', save: 'Salva Modifiche' }
    },
    support: {
      title: 'Supporto Tecnico',
      subtitle: 'Invia le tue domande e segnalazioni di problemi direttamente al team di Emaús.',
      status: { open: 'Aperto', in_progress: 'In Corso', resolved: 'Risolto', closed: 'Chiuso' },
      admin_dashboard: 'Dashboard di Supporto',
      create_ticket: 'Nuovo Ticket',
      chat: { placeholder: 'Scrivi una risposta...' },
      form: { subject: 'Oggetto', subject_ph: 'Es: Errore durante la stampa del certificato', priority: 'Priorità', desc: 'Descrizione del problema', desc_ph: 'Descrivi il problema riscontrato...', attach: 'Allega file o screenshot', max_size: 'Dimensione max: 5MB', cancel: 'Annulla', submit: 'Crea Ticket' }
    },
    community: {
      comments: 'Commenti',
      write_comment: 'Scrivi un commento...',
      back_to_feed: 'Torna al Feed',
      title: 'Vita Ecclesiale',
      subtitle: 'Condividi novità, post e connettiti con le altre segreterie del paese.',
      new_post_placeholder: 'Cosa c\'è di nuovo nella tua parrocchia oggi?',
      upload_photo: 'Carica Foto',
      posting: 'Pubblicazione...',
      publish: 'Pubblica',
      no_posts: 'Nessun post disponibile al momento.',
      suggested_parishes: 'Parrocchie Suggerite',
      visit_profile: 'Visita Profilo'
    },
    settings: { identity: 'Identità Visuale', avatar_desc: 'Icona profilo', cover_desc: 'Immagine copertina', cover_image: 'Immagine Copertina', upload_cover: 'Carica Copertina' },
    tour: {
      prev: 'Precedente',
      next: 'Successivo',
      finish: 'Termina',
      steps: {
        dashboard: { title: 'Riepilogo Generale', desc: 'Una panoramica rapida dello stato quotidiano della parrocchia, degli eventi in agenda e delle novità della comunità.' },
        agenda: { title: 'Calendario e Attività', desc: 'Pianifica e gestisci messe, incontri pastorali ed eventi parrocchiali in modo centralizzato.' },
        sacraments: { title: 'Registro dei Sacramenti', desc: 'Digitalizza, modifica e cerca atti ufficiali di battesimi, matrimoni e cresime in pochi secondi.' },
        documents: { title: 'Editor di Certificati', desc: 'Genera certificati ufficiali in PDF utilizzando modelli parrocchiali preconfigurati.' },
        community: { title: 'Comunità e Feed', desc: 'Connettiti con altre parrocchie del paese, condividi avvisi e scopri le novità.' },
        messages: { title: 'Messaggistica Diretta', desc: 'Scrivi direttamente ad altre segreterie parrocchiali o chatta con il supporto di Emaús.' },
        finances: { title: 'Modulo Contabile', desc: 'Tieni sotto controllo entrate, uscite e offerte della parrocchia con grafici interattivi.' },
        support: { title: 'Aiuto e Supporto', desc: 'Apri ticket di supporto e parla con il nostro team tecnico per risolvere qualsiasi dubbio.' }
      }
    }
  },
  de: {
    sidebar: { dashboard: 'Übersicht', agenda: 'Agenda', sacraments: 'Sakramente', documents: 'Dokumente', messages: 'Nachrichten', finances: 'Finanzen', community: 'Gemeinschaft', settings: 'Einstellungen', users: 'Benutzer & Pläne', support: 'Support', leads: 'Anfragen', logout: 'Abmelden', role: 'Sekretärin', parish: 'Pfarrverwaltung' },
    landing: {
      nav: { features: 'Funktionen', benefits: 'Vorteile', plans: 'Preise', login: 'Anmelden' },
      hero: { badge: 'PFARRVERWALTUNG 2.0', title_start: 'DIGITALISIEREN SIE DIE MISSION IHRER', title_highlight: 'PFARREI', subtitle: 'Emaús ordnet das administrative Chaos, schützt die sakramentale Geschichte und schafft Zeit für die Seelsorge.', cta_access: 'Zur Plattform', cta_plans: 'Preise ansehen' },
      mockup: { sacrament: 'SAKRAMENT', record_type: 'Taufeintrag', label_name: 'NAME DES GETAUFTEN', label_date: 'DATUM', label_book: 'BUCH / SEITE', label_parents: 'ELTERN', badge_db: 'DATENBANK', status_db: 'Digitalisierter Eintrag', badge_search: 'SUCHE', status_search: 'Eintrag gefunden', badge_docs: 'DOKUMENTE', status_docs: 'Zertifikat generiert', chat_name: 'Schw. Maria', chat_msg: 'Kopie gesendet' },
      features: { title: 'Alles, was Ihr Pfarrbüro braucht', subtitle: 'Emaús ersetzt mehrere Einzellösungen durch eine einheitliche, speziell für die Kirche entwickelte Plattform.', sacraments_title: 'Digitale Sakramente', sacraments_desc: 'Digitalisieren Sie Taufen und Eheschließungen.', docs_title: 'Zertifikate mit 1 Klick', docs_desc: 'Automatische Erstellung offizieller Zertifikate.', agenda_title: 'Seelsorge-Agenda', agenda_desc: 'Koordinieren Sie Messen und Treffen in einem zentralen Kalender.', chat_title: 'Chat zwischen Pfarreien', chat_desc: 'Verbinden Sie sich sicher mit anderen Pfarrbüros.', btn_more: 'Weitere Funktionen entdecken' },
      plans: { title: 'Tarife für jede Gemeinschaft', subtitle: 'Wählen Sie die beste Option für Ihre Pfarrei.', basic_title: 'Basis-Tarif', basic_desc: 'Für kleine Pfarreien.', adv_title: 'Premium-Tarif', adv_desc: 'Umfassendes Management ohne Limits.', forever: 'Monat', popular: 'EMPFEHLUNG', cta: 'Demo anfordern', feature_agenda: 'Pfarr-Agenda', feature_sacraments: 'Sakramentenregistrierung', feature_certs: 'Automatische Zertifikate', feature_chat: 'Chat zwischen Pfarreien', feature_editor: 'Dokumenten-Editor im Word-Stil', feature_finances: 'Finanzmodul', feature_basic_all: 'Alles aus dem Basis-Tarif', feature_reports: 'Berichte & Statistiken', feature_support: 'Priorisierter Support', feature_unlimited: 'Unbegrenzter Chat' },
      community: { title: 'Nie wieder alleine arbeiten', card1_title: 'Emaús Gemeinschaft', card1_desc: 'Vernetzte Pfarrbüros', card2_title: 'Sofortige Kommunikation', card2_desc: 'Exklusiver Chat zwischen Pfarreien', card3_title: 'Schneller Dokumentenaustausch', card3_desc: 'Dateien sofort teilen' },
      testimonials: { title: '"Emaús hat unser Büro transformiert"', subtitle: 'Früher suchten wir stundenlang. Heute liefern wir in Sekunden.', t1_name: 'Schw. Lucia', t1_role: 'Sekretärin, Valparaiso', t1_text: '"Es ist so einfach, andere Pfarreien zu kontaktieren."', t2_name: 'Pfarrer Andreas', t2_role: 'Pfarrer, Santiago', t2_text: '"Die Ordnung im Hochzeitskalender ist unbezahlbar."', t3_name: 'Diakon Carlos', t3_role: 'Diakon, Concepción', t3_text: '"Ich kann die Daten von meinem Handy aus überprüfen. Sehr praktisch."' },
      footer: { tagline: 'Entwickelt, um der Kirche zu dienen.', dev: 'Emaús ist eine App entwickelt von' },
      login: { title: 'LOGIN ZU EMAÚS', subtitle: 'Willkommen zurück.', email: 'E-Mail-Adresse', password: 'Passwort', btn: 'Anmelden', error: 'Falsche Zugangsdaten.' },
      demo: { title: 'DEMO ANFORDERN', subtitle: 'Erfahren Sie, wie Emaús Ihre Pfarrei transformieren kann.', name: 'NAME', role: 'FUNKTION', parish: 'PFARREI', submit: 'Anfrage senden', captcha_error: 'Ungültiges Captcha', success_title: 'Gesendet!', success_msg: 'Wir werden uns in Kürze mit Ihnen in Verbindung setzen.', close: 'Schließen' }
    },
    dashboard: {
      welcome: 'Willkommen,',
      welcome_subtitle: 'Hier ist eine Übersicht über den Status Ihrer Pfarrei für heute.',
      tour_card: { title: 'Schnellstartanleitung', subtitle: 'Lernen Sie in weniger als 5 Minuten, Sakramentsakten zu digitalisieren, offizielle Dokumente zu erstellen und Ihre digitale Unterschrift einzurichten.', btn: 'Tour starten' },
      stats: { baptisms: 'Taufen', marriages: 'Trauungen' },
      community_highlight: 'Gemeinschaft und Neuigkeiten',
      no_posts: 'Keine neuen Beiträge aus der Gemeinschaft.',
      upcoming_events: 'Nächste Termine der Agenda',
      no_events: 'Keine Termine für die nächsten Tage geplant.',
      view_full_agenda: 'Vollständige Agenda anzeigen'
    },
    agenda: {
      title: 'Pfarr-Agenda',
      new_event: 'Neuer Termin',
      upcoming: 'Nächste Termine',
      no_events: 'Keine Termine geplant.',
      modal: { title: 'Pfarrtermin planen', event_title: 'Titel des Termins', date: 'Datum', time: 'Uhrzeit', type: 'Aktivitätstyp', location: 'Ort / Treffpunkt', cancel: 'Abbrechen', save: 'Termin speichern' }
    },
    sacraments: {
      title: 'Sakramentsregister',
      subtitle: 'Suchen, bearbeiten und registrieren Sie die digitalisierten Akten der Sakramente Ihrer Pfarrei.',
      new_record: 'Neuer Eintrag',
      search_placeholder: 'Suchen nach Name des Gläubigen oder ID...',
      detail: { editing: 'Eintrag bearbeiten', record_card: 'Karte von', edit: 'Bearbeiten', cancel: 'Abbrechen', save: 'Speichern', observations: 'Bemerkungen', book_data: 'Kirchenbuchdaten', book: 'Buch', page: 'Seite', parish: 'Pfarrei' },
      table: { name: 'Name des Gläubigen', date: 'Datum', celebrant: 'Zelebrant', book_page: 'Buch / Seite', actions: 'Aktionen', view_details: 'Karte anzeigen', no_records: 'Keine Sakramentseinträge gefunden.' },
      types: { Bautizo: 'Taufe', Confirmación: 'Firmung', Matrimonio: 'Trauung', Defunción: 'Sterbefall', 'Primera Comunión': 'Erstkommunion' }
    },
    documents: {
      title: 'Dokumenten-Editor',
      new_document: 'Neues Dokument',
      items: 'Dokument(e)',
      empty_folder: 'Dieser Ordner ist leer.',
      cancel_back: 'Abbrechen und zurück',
      create_title: 'Neues Dokument erstellen',
      create_subtitle: 'Wählen Sie eine offizielle Vorlage oder beginnen Sie mit einem leeren Entwurf.',
      blank_doc: 'Leeres Dokument',
      start_scratch: 'Ohne Vorlage von Grund auf neu beginnen',
      use_template: 'Vorlage verwenden',
      close: 'Schließen',
      print: 'Drucken / Exportieren',
      save: 'Dokument speichern',
      untitled: 'Unbenanntes Dokument',
      upsell: { title: 'Erweiterter Dokumenten-Editor', desc: 'Der Premium-Tarif ermöglicht es Ihnen, Tauf- und Eheurkunden mit einem Editor im Word-Stil zu erstellen und zu bearbeiten.', benefit1: 'Automatische Erstellung offizieller PDFs', benefit2: 'Digitale Unterschrift und Wasserzeichen', cta: 'Auf Premium-Tarif upgraden' }
    },
    messages: {
      support: 'Emaús Support',
      title: 'Nachrichten der Pfarrei',
      search_placeholder: 'Chats durchsuchen...',
      empty_state: 'Keine Unterhaltungen gefunden.',
      type_message: 'Nachricht schreiben...',
      no_chat_selected: 'Unterhaltung auswählen',
      subtitle: 'Starten Sie einen Chat mit anderen Pfarrbüros oder kontaktieren Sie den technischen Support.',
      start_chat: 'Neuer Chat',
      directory: { title: 'Verzeichnis der Pfarreien', subtitle: 'Suchen Sie nach anderen registrierten Pfarreien und starten Sie einen Chat.', search: 'Suche nach Pfarrei oder Stadt...', start_conversation: 'Chatten' }
    },
    finances: {
      title: 'Finanzmodul',
      subtitle: 'Verwalten Sie die Einnahmen, Ausgaben und Spenden Ihrer Pfarrei übersichtlich.',
      stats: { balance: 'Netto-Saldo', income: 'Monatliche Einnahmen', expenses: 'Monatliche Ausgaben', savings_rate: 'Sparquote' },
      table: { header_date: 'Datum', header_desc: 'Beschreibung', header_cat: 'Kategorie', header_method: 'Zahlungsart', header_amount: 'Betrag', header_actions: 'Aktionen', income: 'Einnahme', expense: 'Ausgabe' },
      search_placeholder: 'Suche nach Beschreibung...',
      filter: { all: 'Alle', income: 'Einnahmen', expense: 'Ausgaben' },
      btn_add: 'Neue Transaktion',
      chart_title: 'Finanzielle Entwicklung',
      chart_income: 'Einnahmen',
      chart_expenses: 'Ausgaben',
      modal: { title_add: 'Transaktion registrieren', date: 'Datum', type: 'Typ', type_income: 'Einnahme', type_expense: 'Ausgabe', category: 'Kategorie', amount: 'Betrag', description: 'Beschreibung', payment_method: 'Zahlungsart', cancel: 'Abbrechen', save: 'Transaktion speichern' },
      calculator: { title: 'Registrierkasse', clear: 'Löschen', use_amount: 'Betrag übernehmen' },
      upsell: { title: 'Finanzmodul', desc: 'Der Premium-Tarif enthält Werkzeuge für die kirchliche Buchführung, Berechnung von Stolgebühren und Vergleichsdiagramme.', benefit1: 'Statistiken und monatliche Sparquote', benefit2: 'Digitalisiertes Kassenbuch', cta: 'Auf Premium-Tarif upgraden' }
    },
    leads: {
      title: 'Demo-Anfragen',
      subtitle: 'Verwalten Sie die Leads und Pfarreien, die an Emaús interessiert sind.',
      table: { name: 'Kontakt / Funktion', parish: 'Pfarrei / Diözese', status: 'Status', date: 'Registrierungsdatum', actions: 'Aktionen' },
      status: { new: 'Neu', contacted: 'Kontaktiert', demo_scheduled: 'Demo geplant', closed: 'Gewonnen / Geschlossen', lost: 'Verloren' }
    },
    users: {
      title: 'Benutzerverwaltung',
      subtitle: 'Verwalten Sie Zugangsdaten, Rollen und aktive Tarife der registrierten Pfarreien.',
      create_user: 'Pfarrei anlegen',
      search_placeholder: 'Pfarrei nach E-Mail suchen...',
      table: { email: 'Zugangs-E-Mail', parish: 'Name der Pfarrei', city: 'Stadt / Diözese', plan: 'Aktiver Tarif', actions: 'Aktionen' },
      actions: { edit_plan: 'Tarif ändern', reset_pass: 'Passwort-Link senden' },
      modal: { create_title: 'Neue Pfarrei registrieren', email: 'E-Mail-Adresse', password: 'Temporäres Passwort', plan: 'Anfangstarif', create: 'Pfarrei anlegen', edit_plan_title: 'Abonnement bearbeiten', save: 'Änderungen speichern' }
    },
    support: {
      title: 'Technischer Support',
      subtitle: 'Senden Sie Ihre Fragen und Fehlermeldungen direkt an das Emaús-Team.',
      status: { open: 'Offen', in_progress: 'In Bearbeitung', resolved: 'Gelöst', closed: 'Geschlossen' },
      admin_dashboard: 'Support-Dashboard',
      create_ticket: 'Neues Ticket',
      chat: { placeholder: 'Antwort schreiben...' },
      form: { subject: 'Betreff', subject_ph: 'Z.B.: Fehler beim Drucken des Zertifikats', priority: 'Priorität', desc: 'Beschreibung des Problems', desc_ph: 'Beschreiben Sie das aufgetretene Problem...', attach: 'Datei oder Screenshot anhängen', max_size: 'Maximale Größe: 5MB', cancel: 'Abbrechen', submit: 'Ticket erstellen' }
    },
    community: {
      comments: 'Kommentare',
      write_comment: 'Einen Kommentar schreiben...',
      back_to_feed: 'Zurück zum Feed',
      title: 'Kirchliches Leben',
      subtitle: 'Teilen Sie Neuigkeiten, Beiträge und verbinden Sie sich mit anderen Pfarrbüros.',
      new_post_placeholder: 'Was gibt es heute Neues in Ihrer Pfarrei?',
      upload_photo: 'Foto hochladen',
      posting: 'Veröffentlichung...',
      publish: 'Veröffentlichen',
      no_posts: 'Aktuell keine Beiträge vorhanden.',
      suggested_parishes: 'Empfohlene Pfarreien',
      visit_profile: 'Profil anzeigen'
    },
    settings: { identity: 'Visuelle Identität', avatar_desc: 'Profilbild-Icon', cover_desc: 'Titelbild', cover_image: 'Titelbild', upload_cover: 'Titelbild hochladen' },
    tour: {
      prev: 'Zurück',
      next: 'Weiter',
      finish: 'Beenden',
      steps: {
        dashboard: { title: 'Allgemeine Übersicht', desc: 'Eine schnelle Übersicht über den täglichen Status Ihrer Pfarrei, Termine und Neuigkeiten aus der Gemeinschaft.' },
        agenda: { title: 'Kalender & Aktivitäten', desc: 'Planen und verwalten Sie Messen, pastorale Treffen und pfarreiliche Termine zentral.' },
        sacraments: { title: 'Sakramentsregister', desc: 'Digitalisieren, bearbeiten und durchsuchen Sie offizielle Akten von Taufen, Trauungen und Firmungen in Sekundenschnelle.' },
        documents: { title: 'Zertifikats-Editor', desc: 'Erstellen Sie offizielle PDF-Urkunden mithilfe vorkonfigurierter Pfarreivorlagen.' },
        community: { title: 'Gemeinschaft & Feed', desc: 'Vernetzen Sie sich mit anderen Pfarreien des Landes, teilen Sie Ankündigungen und erfahren Sie Neuigkeiten.' },
        messages: { title: 'Direktnachrichten', desc: 'Schreiben Sie direkt an andere Pfarrbüros oder chatten Sie mit dem Emaús-Support.' },
        finances: { title: 'Finanzmodul', desc: 'Behalten Sie Einnahmen, Ausgaben und Spenden Ihrer Pfarrei mit interaktiven Diagrammen im Blick.' },
        support: { title: 'Hilfe & Support', desc: 'Erstellen Sie Support-Tickets und sprechen Sie mit unserem technischen Team, um Fragen zu klären.' }
      }
    }
  },
  pl: {
    sidebar: { dashboard: 'Podsumowanie', agenda: 'Agenda', sacraments: 'Sakramenty', documents: 'Dokumenty', messages: 'Wiadomości', finances: 'Finanse', community: 'Wspólnota', settings: 'Ustawienia', users: 'Użytkownicy i Plany', support: 'Wsparcie', leads: 'Zgłoszenia', logout: 'Wyloguj', role: 'Sekretarka', parish: 'Zarządzanie Parafią' },
    landing: {
      nav: { features: 'Funkcje', benefits: 'Korzyści', plans: 'Plany', login: 'Zaloguj się' },
      hero: { badge: 'ZARZĄDZANIE PARAFIĄ 2.0', title_start: 'ZDIGITALIZUJ MISJĘ SWOJEJ', title_highlight: 'PARAFII', subtitle: 'Emaús porządkuje chaos administracyjny, chroni historię sakramentalną i uwalnia czas na duszpasterstwo.', cta_access: 'Dostęp do platformy', cta_plans: 'Zobacz plany' },
      mockup: { sacrament: 'SAKRAMENT', record_type: 'Karta Chrztu', label_name: 'IMIĘ I NAZWISKO', label_date: 'DATA', label_book: 'KSIĘGA / STR.', label_parents: 'RODZICE', badge_db: 'BAZA DANYCH', status_db: 'Zdigitalizowany wpis', badge_search: 'WYSZUKIWANIE', status_search: 'Znaleziono rekord', badge_docs: 'DOKUMENTY', status_docs: 'Wygenerowano certyfikat', chat_name: 'S. Maria', chat_msg: 'Wysłano odpis' },
      features: { title: 'Wszystko, czego potrzebuje Twoja kancelaria', subtitle: 'Emaús zastępuje wiele odrębnych narzędzi jedną zintegrowaną platformą stworzoną dla Kościoła.', sacraments_title: 'Cyfrowe Sakramenty', sacraments_desc: 'Zdigitalizuj chrzty i małżeństwa.', docs_title: 'Certyfikaty 1-Kliknięciem', docs_desc: 'Automatyczne generowanie oficjalnych certyfikatów.', agenda_title: 'Agenda Duszpasterska', agenda_desc: 'Koordynuj msze i spotkania w centralnym kalendarzu.', chat_title: 'Czat Międzyparafialny', chat_desc: 'Łącz się bezpiecznie z innymi kancelariami.', btn_more: 'Poznaj więcej funkcji' },
      plans: { title: 'Plany dla każdej wspólnoty', subtitle: 'Wybierz najlepszą opcję dla swojej parafii.', basic_title: 'Plan Podstawowy', basic_desc: 'Dla małych parafii.', adv_title: 'Plan Zaawansowany', adv_desc: 'Zarządzanie bez limitów.', forever: 'miesiąc', popular: 'POLECANY', cta: 'Poproś o demo', feature_agenda: 'Kalendarz Parafialny', feature_sacraments: 'Rejestracja Sakramentów', feature_certs: 'Automatyczne Certyfikaty', feature_chat: 'Czat Międzyparafialny', feature_editor: 'Edytor dokumentów w stylu Word', feature_finances: 'Moduł Finansowy', feature_basic_all: 'Wszystko z planu podstawowego', feature_reports: 'Raporty i Statystyki', feature_support: 'Wsparcie Priorytetowe', feature_unlimited: 'Nielimitowany czat' },
      community: { title: 'Nigdy więcej nie pracuj sam', card1_title: 'Wspólnota Emaús', card1_desc: 'Połączone sekretarki', card2_title: 'Natychmiastowa komunikacja', card2_desc: 'Ekskluzywny czat między parafiami', card3_title: 'Sprawna dokumentacja', card3_desc: 'Błyskawicznie dziel się plikami' },
      testimonials: { title: '"Emaús odmienił naszą kancelarię parafialną"', subtitle: 'Kiedyś spędzaliśmy godziny na szukaniu metryk. Teraz wydajemy certyfikaty w kilka sekund.', t1_name: 'S. Łucja', t1_role: 'Sekretarka, Valparaíso', t1_text: '"To niesamowite, jak łatwo skontaktować się z innymi parafiami."', t2_name: 'Ks. Andrzej', t2_role: 'Proboszcz, Santiago', t2_text: '"Porządek w terminarzu ślubów jest bezcenny."', t3_name: 'Diak. Karol', t3_role: 'Diakon, Concepción', t3_text: '"Mogę sprawdzić dane w telefonie. Bardzo praktyczne."' },
      footer: { tagline: 'Zaprojektowane dla służby Kościołowi.', dev: 'Emaús to aplikacja stworzona przez' },
      login: { title: 'ZALOGUJ SIĘ DO EMAÚS', subtitle: 'Witaj z powrotem.', email: 'Adres e-mail', password: 'Hasło', btn: 'Zaloguj się', error: 'Nieprawidłowe dane logowania.' },
      demo: { title: 'ZAMÓW DEMO', subtitle: 'Dowiedz się, jak Emaús może odmienić Twoją parafię.', name: 'IMIĘ', role: 'STANOWISKO', parish: 'PARAFIA', submit: 'Wyślij Zgłoszenie', captcha_error: 'Błędny kod captcha', success_title: 'Wysłano!', success_msg: 'Skontaktujemy się z Tobą wkrótce.', close: 'Zamknij' }
    },
    dashboard: {
      welcome: 'Witaj,',
      welcome_subtitle: 'Oto podsumowanie stanu Twojej parafii na dzień dzisiejszy.',
      tour_card: { title: 'Szybki przewodnik', subtitle: 'Dowiedz się, jak w niecałe 5 minut zdigitalizować akta sakramentów, wydawać oficjalne certyfikaty i skonfigurować podpis cyfrowy.', btn: 'Rozpocznij Przewodnik' },
      stats: { baptisms: 'Chrzty', marriages: 'Śluby' },
      community_highlight: 'Wspólnota i Nowości',
      no_posts: 'Brak nowych postów od wspólnoty.',
      upcoming_events: 'Nadchodzące wydarzenia w kalendarzu',
      no_events: 'Brak zaplanowanych wydarzeń na najbliższe dni.',
      view_full_agenda: 'Zobacz całą agendę'
    },
    agenda: {
      title: 'Kalendarz Parafialny',
      new_event: 'Nowe Wydarzenie',
      upcoming: 'Nadchodzące Wydarzenia',
      no_events: 'Brak zaplanowanych wydarzeń.',
      modal: { title: 'Zaplanuj Wydarzenie Parafialne', event_title: 'Tytuł Wydarzenia', date: 'Data', time: 'Godzina', type: 'Typ Aktywności', location: 'Lokalizacja / Miejsce', cancel: 'Anuluj', save: 'Zapisz Wydarzenie' }
    },
    sacraments: {
      title: 'Księgi Sakramentów',
      subtitle: 'Wyszukuj, edytuj i zapisuj zdigitalizowane akta sakramentów Twojej parafii.',
      new_record: 'Nowy Wpis',
      search_placeholder: 'Szukaj po nazwisku wiernego lub ID...',
      detail: { editing: 'Edycja Wpisu', record_card: 'Karta', edit: 'Edytuj', cancel: 'Anuluj', save: 'Zapisz', observations: 'Uwagi', book_data: 'Dane z Księgi Parafialnej', book: 'Księga', page: 'Strona', parish: 'Parafia' },
      table: { name: 'Nazwisko Wiernego', date: 'Data', celebrant: 'Szafarz', book_page: 'Księga / Str.', actions: 'Opcje', view_details: 'Zobacz Kartę', no_records: 'Nie znaleziono zapisów sakramentów.' },
      types: { Bautizo: 'Chrzest', Confirmación: 'Bierzmowanie', Matrimonio: 'Małżeństwo', Defunción: 'Zgon', 'Primera Comunión': 'Pierwsza Komunia' }
    },
    documents: {
      title: 'Edytor Dokumentów',
      new_document: 'Nowy Dokument',
      items: 'dokument(y)',
      empty_folder: 'Ten folder jest pusty.',
      cancel_back: 'Anuluj i wróć',
      create_title: 'Stwórz Nowy Dokument',
      create_subtitle: 'Wybierz oficjalny szablon lub rozpocznij od pustego projektu.',
      blank_doc: 'Pusty Dokument',
      start_scratch: 'Rozpocznij od zera bez szablonu',
      use_template: 'Użyj Szablonu',
      close: 'Zamknij',
      print: 'Drukuj / Eksportuj',
      save: 'Zapisz Dokument',
      untitled: 'Dokument bez tytułu',
      upsell: { title: 'Zaawansowany Edytor Certyfikatów', desc: 'Plan Zaawansowany pozwala na tworzenie i edycję akt oraz certyfikatów chrztu i małżeństwa w edytorze tekstu typu Word.', benefit1: 'Automatyczne generowanie oficjalnych plików PDF', benefit2: 'Cyfrowy podpis i znak wodny parafii', cta: 'Ulepsz do Planu Zaawansowanego' }
    },
    messages: {
      support: 'Wsparcie Emaús',
      title: 'Wiadomości Parafialne',
      search_placeholder: 'Szukaj rozmów...',
      empty_state: 'Brak rozmów.',
      type_message: 'Napisz wiadomość...',
      no_chat_selected: 'Wybierz rozmowę',
      subtitle: 'Rozpocznij czat z innymi kancelariami lub napisz do wsparcia technicznego.',
      start_chat: 'Rozpocznij Nowy Czat',
      directory: { title: 'Katalog Parafii', subtitle: 'Szukaj innych zarejestrowanych parafii i rozpocznij czat.', search: 'Szukaj po parafii lub mieście...', start_conversation: 'Rozmawiaj' }
    },
    finances: {
      title: 'Moduł Finansowy',
      subtitle: 'Kontroluj przychody, wydatki i ofiary w swojej parafii w uporządkowany sposób.',
      stats: { balance: 'Saldo Netto', income: 'Miesięczne Przychody', expenses: 'Miesięczne Wydatki', savings_rate: 'Wskaźnik Oszczędności' },
      table: { header_date: 'Data', header_desc: 'Opis', header_cat: 'Kategoria', header_method: 'Forma Płatności', header_amount: 'Kwota', header_actions: 'Opcje', income: 'Przychód', expense: 'Wydatek' },
      search_placeholder: 'Szukaj po opisie...',
      filter: { all: 'Wszystkie', income: 'Przychody', expense: 'Wydatki' },
      btn_add: 'Nowa Transakcja',
      chart_title: 'Ewolucja Finansowa',
      chart_income: 'Przychody',
      chart_expenses: 'Wydatki',
      modal: { title_add: 'Zarejestruj Transakcję', date: 'Data', type: 'Typ', type_income: 'Przychód', type_expense: 'Wydatek', category: 'Kategoria', amount: 'Kwota', description: 'Opis', payment_method: 'Forma Płatności', cancel: 'Anuluj', save: 'Zapisz Transakcję' },
      calculator: { title: 'Kasa fiskalna', clear: 'Wyczyść', use_amount: 'Użyj Kwoty' },
      upsell: { title: 'Moduł Finansowy', desc: 'Plan Zaawansowany zawiera narzędzia do księgowości parafialnej, obliczania wpływów z ofiar i wykresy porównawcze.', benefit1: 'Statystyki i miesięczny wskaźnik oszczędności', benefit2: 'Zdigitalizowana pomocnicza księga kasowa', cta: 'Ulepsz do Planu Zaawansowanego' }
    },
    leads: {
      title: 'Zgłoszenia Demo',
      subtitle: 'Zarządzaj prospektami i parafiami zainteresowanymi dołączeniem do Emaús.',
      table: { name: 'Kontakt / Stanowisko', parish: 'Parafia / Diecezja', status: 'Status', date: 'Data Rejestracji', actions: 'Opcje' },
      status: { new: 'Nowy', contacted: 'W kontakcie', demo_scheduled: 'Demo umówione', closed: 'Pozyskany / Zamknięty', lost: 'Utracony' }
    },
    users: {
      title: 'Zarządzanie Użytkownikami',
      subtitle: 'Zarządzaj dostępami, rolami i aktywnymi planami zarejestrowanych parafii.',
      create_user: 'Stwórz Parafię',
      search_placeholder: 'Szukaj parafii po e-mailu...',
      table: { email: 'E-mail Dostępowy', parish: 'Nazwa Parafii', city: 'Miasto / Diecezja', plan: 'Aktywny Plan', actions: 'Opcje' },
      actions: { edit_plan: 'Zmień subskrypcję', reset_pass: 'Wyślij link do hasła' },
      modal: { create_title: 'Zarejestruj Nową Parafię', email: 'Adres E-mail', password: 'Tymczasowe Hasło', plan: 'Plan Początkowy', create: 'Stwórz Parafię', edit_plan_title: 'Edytuj Plan Subskrypcji', save: 'Zapisz Zmiany' }
    },
    support: {
      title: 'Wsparcie Techniczne',
      subtitle: 'Wysyłaj swoje zapytania i zgłoszenia błędów bezpośrednio do zespołu Emaús.',
      status: { open: 'Otwarte', in_progress: 'W toku', resolved: 'Rozwiązane', closed: 'Zamknięte' },
      admin_dashboard: 'Panel Wsparcia Technicznego',
      create_ticket: 'Nowy Ticket',
      chat: { placeholder: 'Napisz odpowiedź...' },
      form: { subject: 'Temat', subject_ph: 'Np.: Błąd przy drukowaniu certyfikatu', priority: 'Priorytet', desc: 'Opis zgłoszenia', desc_ph: 'Opisz problem, którego doświadczasz...', attach: 'Załącz plik lub zrzut ekranu', max_size: 'Maksymalny rozmiar: 5MB', cancel: 'Anuluj', submit: 'Stwórz Ticket' }
    },
    community: {
      comments: 'Komentarze',
      write_comment: 'Napisz komentarz...',
      back_to_feed: 'Wróć do Feedu',
      title: 'Życie Kościoła',
      subtitle: 'Dziel się aktualnościami, postami i łącz z innymi kancelariami w kraju.',
      new_post_placeholder: 'Co nowego dziś w Twojej parafii?',
      upload_photo: 'Dodaj Zdjęcie',
      posting: 'Publikowanie...',
      publish: 'Opublikuj',
      no_posts: 'Brak postów w tej chwili.',
      suggested_parishes: 'Sugerowane Parafie',
      visit_profile: 'Odwiedź Profil'
    },
    settings: { identity: 'Tożsamość Wizualna', avatar_desc: 'Ikona profilu', cover_desc: 'Zdjęcie w tle', cover_image: 'Zdjęcie w tle', upload_cover: 'Prześlij zdjęcie w tle' },
    tour: {
      prev: 'Poprzedni',
      next: 'Dalej',
      finish: 'Zakończ',
      steps: {
        dashboard: { title: 'Ogólne podsumowanie', desc: 'Szybki podgląd codziennego stanu Twojej parafii, nadchodzących wydarzeń i nowości ze wspólnoty.' },
        agenda: { title: 'Kalendarz i aktywności', desc: 'Planuj i zarządzaj mszami, spotkaniami duszpasterskimi i wydarzeniami parafialnymi w jednym miejscu.' },
        sacraments: { title: 'Księgi Sakramentów', desc: 'Digitalizuj, edytuj i przeszukuj oficjalne akta chrztów, małżeństw i bierzmowań w kilka sekund.' },
        documents: { title: 'Edytor certyfikatów', desc: 'Generuj oficjalne certyfikaty PDF, korzystając ze wstępnie skonfigurowanych szablonów parafialnych.' },
        community: { title: 'Wspólnota i tablica', desc: 'Połącz się z innymi parafiami w kraju, udostępniaj ogłoszenia i śledź aktualności.' },
        messages: { title: 'Bezpośrednie wiadomości', desc: 'Pisz bezpośrednio do innych kancelarii parafialnych lub czatuj ze wsparciem Emaús.' },
        finances: { title: 'Moduł księgowy', desc: 'Kontroluj przychody, wydatki i ofiary w swojej parafii za pomocą interaktywnych wykresów.' },
        support: { title: 'Pomoc i wsparcie', desc: 'Twórz zgłoszenia wsparcia i rozmawiaj z naszym zespołem technicznym, aby wyjaśnić wątpliwości.' }
      }
    }
  },
  el: {
    sidebar: { dashboard: 'Σύνοψη', agenda: 'Ατζέντα', sacraments: 'Μυστήρια', documents: 'Έγγραφα', messages: 'Μηνύματα', finances: 'Οικονομικά', community: 'Κοινότητα', settings: 'Ρυθμίσεις', users: 'Χρήστες & Σχέδια', support: 'Υποστήριξη', leads: 'Αιτήματα', logout: 'Αποσύνδεση', role: 'Γραμματέας', parish: 'Διαχείριση Ενορίας' },
    landing: {
      nav: { features: 'Χαρακτηριστικά', benefits: 'Οφέλη', plans: 'Προγράμματα', login: 'Σύνδεση' },
      hero: { badge: 'ΔΙΑΧΕΙΡΙΣΗ ΕΝΟΡΙΑΣ 2.0', title_start: 'ΨΗΦΙΟΠΟΙΗΣΤΕ ΤΗΝ ΑΠΟΣΤΟΛΗ ΤΗΣ', title_highlight: 'ΕΝΟΡΙΑΣ ΣΑΣ', subtitle: 'Το Emaús οργανώνει το διοικητικό χάος και προστατεύει τη μυστηριακή ιστορία.', cta_access: 'Είσοδος', cta_plans: 'Προγράμματα' },
      mockup: { sacrament: 'ΜΥΣΤΗΡΙΟ', record_type: 'Φύλλο Βάπτισης', label_name: 'ΟΝΟΜΑ', label_date: 'ΔΗΜΙΟΥΡΓΗΘΗΚΕ', label_book: 'ΒΙΒΛΙΟ / ΣΕΛ', label_parents: 'ΓΟΝΕΙΣ', badge_db: 'ΒΑΣΗ ΔΕΔΟΜΕΝΩΝ', status_db: 'Ψηφιοποιημένο', badge_search: 'ΑΝΑΖΗΤΗΣΗ', status_search: 'Βρέθηκε', badge_docs: 'ΕΓΓΡΑΦΑ', status_docs: 'Εκδόθηκε', chat_name: 'Αδ. Μαρία', chat_msg: 'Εστάλη' },
      features: { title: 'Όλα όσα χρειάζεται η γραμματεία σας', subtitle: 'Το Emaús αντικαθιστά πολλαπλά ασύνδετα εργαλεία με μια ενιαία πλατφόρμα σχεδιασμένη για την Εκκλησία.', sacraments_title: 'Ψηφιακά Μυστήρια', sacraments_desc: 'Ψηφιοποιήστε βαπτίσεις και γάμους.', docs_title: 'Πιστοποιητικά σε 1 κλικ', docs_desc: 'Αυτόματη έκδοση επίσημων πιστοποιητικών.', agenda_title: 'Ποιμαντική Ατζέντα', agenda_desc: 'Συντονίστε λειτουργίες και συναντήσεις σε ένα κεντρικό ημερολόγιο.', chat_title: 'Συνομιλία Ενοριών', chat_desc: 'Συνδεθείτε με ασφάλεια με άλλα γραφεία ενοριών.', btn_more: 'Περισσότερα' },
      plans: { title: 'Προγράμματα για κάθε κοινότητα', subtitle: 'Επιλέξτε την καλύτερη επιλογή για την ενορία σας.', basic_title: 'Βασικό Πρόγραμμα', basic_desc: 'Για μικρές ενορίες.', adv_title: 'Προχωρημένο', adv_desc: 'Ολοκληρωμένη διαχείριση χωρίς όρια.', forever: 'μήνα', popular: 'ΠΡΟΤΕΙΝΟΜΕΝΟ', cta: 'Demo', feature_agenda: 'Ενοριακή Ατζέντα', feature_sacraments: 'Καταγραφή Μυστηρίων', feature_certs: 'Αυτόματα Πιστοποιητικά', feature_chat: 'Συνομιλία Ενοριών', feature_editor: 'Επεξεργαστής Εγγράφων τύπου Word', feature_finances: 'Ενότητα Οικονομικών', feature_basic_all: 'Όλα του Βασικού Προγράμματος', feature_reports: 'Αναφορές & Στατιστικά', feature_support: 'Υποστήριξη Προτεραιότητας', feature_unlimited: 'Απεριόριστη συνομιλία' },
      community: { title: 'Ποτέ ξανά εργασία μόνοι', card1_title: 'Κοινότητα Emaús', card1_desc: 'Συνδεδεμένοι γραμματείς', card2_title: 'Άμεση Επικοινωνία', card2_desc: 'Αποκλειστική συνομιλία μεταξύ ενοριών', card3_title: 'Ευέλικτη Τεκμηρίωση', card3_desc: 'Μοιραστείτε αρχεία αμέσως' },
      testimonials: { title: '"Το Emaús μεταμόρφωσε το ενοριακό μας γραφείο"', subtitle: 'Τώρα εκδίδουμε πιστοποιητικά σε δευτερόλεπτα.', t1_name: 'Αδ. Λουκία', t1_role: 'Γραμματέας, Valparaiso', t1_text: '"Είναι απίστευτο πόσο εύκολη είναι η επικοινωνία."', t2_name: 'Π. Ανδρέας', t2_role: 'Εφημέριος, Santiago', t2_text: '"Η τάξη στην ατζέντα είναι ανεκτίμητη."', t3_name: 'Διακ. Κάρολος', t3_role: 'Διάκονος, Concepción', t3_text: '"Μπορώ να δω τα δεδομένα από το κινητό μου. Πολύ πρακτικό."' },
      footer: { tagline: 'Σχεδιασμένο για την Εκκλησία.', dev: 'Το Emaús είναι μια εφαρμογή που αναπτύχθηκε από' },
      login: { title: 'ΕΙΣΟΔΟΣ ΣΤΟ EMAÚS', subtitle: 'Καλώς ορίσατε ξανά.', email: 'Ηλεκτρονικό ταχυδρομείο', password: 'Κωδικός πρόσβασης', btn: 'Σύνδεση', error: 'Λανθασμένα διαπιστευτήρια.' },
      demo: { title: 'ΑΙΤΗΣΗ DEMO', subtitle: 'Μάθετε πώς το Emaús μπορεί να μεταμορφώσει την ενορία σας.', name: 'ΟΝΟΜΑ', role: 'ΘΕΣΗ', parish: 'ΕΝΟΡΙΑ', submit: 'Υποβολή Αιτήματος', captcha_error: 'Λάθος captcha', success_title: 'Εστάλη!', success_msg: 'Θα επικοινωνήσουμε μαζί σας σύντομα.', close: 'Κλείσιμο' }
    },
    dashboard: {
      welcome: 'Καλώς ορίσατε,',
      welcome_subtitle: 'Εδώ είναι μια σύνοψη της κατάστασης της ενορίας σας για σήμερα.',
      tour_card: { title: 'Οδηγός Γρήγορης Εκκίνησης', subtitle: 'Μάθετε πώς να ψηφιοποιείτε μυστήρια, να εκδίδετε πιστοποιητικά και να ρυθμίζετε την ψηφιακή υπογραφή σας σε λιγότερο από 5 λεπτά.', btn: 'Έναρξη Οδηγού' },
      stats: { baptisms: 'Βαπτίσεις', marriages: 'Γάμοι' },
      community_highlight: 'Κοινότητα και Νέα',
      no_posts: 'Δεν υπάρχουν πρόσφατες αναρτήσεις.',
      upcoming_events: 'Επόμενα Συμβάντα στην Ατζέντα',
      no_events: 'Δεν υπάρχουν προγραμματισμένα συμβάντα.',
      view_full_agenda: 'Προβολή Ατζέντας'
    },
    agenda: {
      title: 'Ενοριακή Ατζέντα',
      new_event: 'Νέο Συμβάν',
      upcoming: 'Επόμενα Συμβάντα',
      no_events: 'Δεν υπάρχουν συμβάντα.',
      modal: { title: 'Προγραμματισμός Συμβάντος', event_title: 'Τίτλος Συμβάντος', date: 'Ημερομηνία', time: 'Ώρα', type: 'Τύπος Δραστηριότητας', location: 'Τοποθεσία / Χώρος', cancel: 'Ακύρωση', save: 'Αποθήκευση' }
    },
    sacraments: {
      title: 'Μητρώο Μυστηρίων',
      subtitle: 'Αναζητήστε, επεξεργαστείτε και καταγράψτε τα ψηφιοποιημένα αρχεία μυστηρίων.',
      new_record: 'Νέα Καταγραφή',
      search_placeholder: 'Αναζήτηση με όνομα ή ID...',
      detail: { editing: 'Επεξεργασία Καταγραφής', record_card: 'Καρτέλα', edit: 'Επεξεργασία', cancel: 'Ακύρωση', save: 'Αποθήκευση', observations: 'Παρατηρήσεις', book_data: 'Στοιχεία Βιβλίου Ενορίας', book: 'Βιβλίο', page: 'Σελίδα', parish: 'Ενορία' },
      table: { name: 'Όνομα Πιστού', date: 'Ημερομηνία', celebrant: 'Λειτουργός', book_page: 'Βιβλίο / Σελ.', actions: 'Ενέργειες', view_details: 'Προβολή Καρτέλας', no_records: 'Δεν βρέθηκαν αρχεία μυστηρίων.' },
      types: { Bautizo: 'Βάπτιση', Confirmación: 'Χρίσμα', Matrimonio: 'Γάμος', Defunción: 'Κηδεία', 'Primera Comunión': 'Πρώτη Κοινωνία' }
    },
    documents: {
      title: 'Επεξεργαστής Εγγράφων',
      new_document: 'Νέο Έγγραφο',
      items: 'έγγραφα',
      empty_folder: 'Αυτός ο φάκελος είναι άδειος.',
      cancel_back: 'Ακύρωση και επιστροφή',
      create_title: 'Δημιουργία Νέου Εγγράφου',
      create_subtitle: 'Επιλέξτε ένα επίσημο πρότυπο ή ξεκινήστε από το μηδέν.',
      blank_doc: 'Κενό Έγγραφο',
      start_scratch: 'Ξεκινήστε χωρίς πρότυπο',
      use_template: 'Χρήση Προτύπου',
      close: 'Κλείσιμο',
      print: 'Εκτύπωση / Εξαγωγή',
      save: 'Αποθήκευση Εγγράφου',
      untitled: 'Έγγραφο χωρίς τίτλο',
      upsell: { title: 'Προηγμένος Επεξεργαστής Πιστοποιητικών', desc: 'Το Προχωρημένο Πρόγραμμα σάς επιτρέπει να επεξεργάζεστε πιστοποιητικά με επεξεργαστή Word.', benefit1: 'Αυτόματη δημιουργία επίσημων PDF', benefit2: 'Ψηφιακή υπογραφή και υδατογράφημα ενορίας', cta: 'Αναβάθμιση σε Προχωρημένο' }
    },
    messages: {
      support: 'Υποστήριξη Emaús',
      title: 'Μηνύματα Ενορίας',
      search_placeholder: 'Αναζήτηση συνομιλιών...',
      empty_state: 'Δεν βρέθηκαν συνομιλίες.',
      type_message: 'Πληκτρολογήστε ένα μήνυμα...',
      no_chat_selected: 'Επιλέξτε μια συνομιλία',
      subtitle: 'Ξεκινήστε μια συνομιλία με άλλα γραφεία ή επικοινωνήστε με την τεχνική υποστήριξη.',
      start_chat: 'Νέα Συνομιλία',
      directory: { title: 'Κατάλογος Ενοριών', subtitle: 'Αναζητήστε άλλες εγγεγραμμένες ενορίες και ξεκινήστε συνομιλία.', search: 'Αναζήτηση με ενορία ή πόλη...', start_conversation: 'Συνομιλία' }
    },
    finances: {
      title: 'Ενότητα Οικονομικών',
      subtitle: 'Διαχειριστείτε τα έσοδα, τα έξοδα και τις προσφορές της ενορίας σας οργανωμένα.',
      stats: { balance: 'Καθαρό Υπόλοιπο', income: 'Μηνιαία Έσοδα', expenses: 'Μηνιαία Έξοδα', savings_rate: 'Ποσοστό Αποταμίευσης' },
      table: { header_date: 'Ημερομηνία', header_desc: 'Περιγραφή', header_cat: 'Κατηγορία', header_method: 'Τρόπος Πληρωμής', header_amount: 'Ποσό', header_actions: 'Ενέργειες', income: 'Έσοδο', expense: 'Έξοδο' },
      search_placeholder: 'Αναζήτηση με περιγραφή...',
      filter: { all: 'Όλα', income: 'Έσοδα', expense: 'Έξοδα' },
      btn_add: 'Νέα Συναλλαγή',
      chart_title: 'Οικονομική Πορεία',
      chart_income: 'Έσοδα',
      chart_expenses: 'Έξοδα',
      modal: { title_add: 'Καταγραφή Συναλλαγής', date: 'Ημερομηνία', type: 'Τύπος', type_income: 'Έσοδο', type_expense: 'Έξοδο', category: 'Κατηγορία', amount: 'Ποσό', description: 'Περιγραφή', payment_method: 'Τρόπος Πληρωμής', cancel: 'Ακύρωση', save: 'Αποθήκευση Συναλλαγής' },
      calculator: { title: 'Αριθμομηχανή Ταμείου', clear: 'Καθαρισμός', use_amount: 'Χρήση Ποσού' },
      upsell: { title: 'Ενότητα Οικονομικών', desc: 'Το Προχωρημένο Πρόγραμμα περιλαμβάνει λογιστικά εργαλεία ενορίας και συγκριτικά γραφήματα.', benefit1: 'Στατιστικά και μηνιαία αποταμίευση', benefit2: 'Ψηφιοποιημένο βιβλίο ταμείου', cta: 'Αναβάθμιση σε Προχωρημένο' }
    },
    leads: {
      title: 'Αιτήματα Demo',
      subtitle: 'Διαχειριστείτε τους ενδιαφερόμενους για το Emaús.',
      table: { name: 'Επαφή / Ρόλος', parish: 'Ενορία / Μητρόπολη', status: 'Κατάσταση', date: 'Ημερομηνία Εγγραφής', actions: 'Ενέργειες' },
      status: { new: 'Νέο', contacted: 'Σε Επικοινωνία', demo_scheduled: 'Προγραμματισμένο Demo', closed: 'Ολοκληρώθηκε', lost: 'Χάθηκε' }
    },
    users: {
      title: 'Διαχείριση Χρηστών',
      subtitle: 'Διαχειριστείτε διαπιστευτήρια, ρόλους και ενεργά προγράμματα.',
      create_user: 'Δημιουργία Ενορίας',
      search_placeholder: 'Αναζήτηση ενορίας με email...',
      table: { email: 'Email Πρόσβασης', parish: 'Όνομα Ενορίας', city: 'Πόλη / Μητρόπολη', plan: 'Ενεργό Πρόγραμμα', actions: 'Ενέργειες' },
      actions: { edit_plan: 'Αλλαγή Συνδρομής', reset_pass: 'Αποστολή συνδέσμου κωδικού' },
      modal: { create_title: 'Εγγραφή Νέας Ενορίας', email: 'Διεύθυνση Email', password: 'Προσωρινός Κωδικός', plan: 'Αρχικό Πρόγραμμα', create: 'Δημιουργία Ενορίας', edit_plan_title: 'Επεξεργασία Συνδρομής', save: 'Αποθήκευση Αλλαγών' }
    },
    support: {
      title: 'Τεχνική Υποστήριξη',
      subtitle: 'Στείλτε τις ερωτήσεις σας απευθείας στην ομάδα του Emaús.',
      status: { open: 'Ανοιχτό', in_progress: 'Σε εξέλιξη', resolved: 'Επιλύθηκε', closed: 'Κλειστό' },
      admin_dashboard: 'Ταμπλό Υποστήριξης',
      create_ticket: 'Νέο Ticket',
      chat: { placeholder: 'Πληκτρολογήστε μια απάντηση...' },
      form: { subject: 'Θέμα', subject_ph: 'Π.χ. Σφάλμα κατά την εκτύπωση πιστοποιητικού', priority: 'Προτεραιότητα', desc: 'Περιγραφή του προβλήματος', desc_ph: 'Περιγράψτε το πρόβλημα που αντιμετωπίζετε...', attach: 'Επισύναψη αρχείου ή screenshot', max_size: 'Μέγιστο μέγεθος: 5MB', cancel: 'Ακύρωση', submit: 'Δημιουργία Ticket' }
    },
    community: {
      comments: 'Σχόλια',
      write_comment: 'Γράψτε ένα σχόλιο...',
      back_to_feed: 'Επιστροφή στο Feed',
      title: 'Εκκλησιαστική Ζωή',
      subtitle: 'Μοιραστείτε νέα, αναρτήσεις και συνδεθείτε με άλλα γραφεία.',
      new_post_placeholder: 'Τι νέο υπάρχει στην ενορία σας σήμερα;',
      upload_photo: 'Μεταφόρτωση Φωτογραφίας',
      posting: 'Δημοσίευση...',
      publish: 'Δημοσίευση',
      no_posts: 'Δεν υπάρχουν αναρτήσεις αυτή τη στιγμή.',
      suggested_parishes: 'Προτεινόμενες Ενορίες',
      visit_profile: 'Επίσκεψη Προφίλ'
    },
    settings: { identity: 'Οπτική Ταυτότητα', avatar_desc: 'Εικονίδιο προφίλ', cover_desc: 'Εικόνα εξωφύλλου', cover_image: 'Εικόνα Εξωφύλλου', upload_cover: 'Μεταφόρτωση Εξωφύλλου' },
    tour: {
      prev: 'Προηγούμενο',
      next: 'Επόμενο',
      finish: 'Τέλος',
      steps: {
        dashboard: { title: 'Γενική Σύνοψη', desc: 'Μια γρήγορη ματιά στην καθημερινή κατάσταση της ενορίας σας, τα συμβάντα της ατζέντας και τα νέα της κοινότητας.' },
        agenda: { title: 'Ημερολόγιο & Δραστηριότητες', desc: 'Προγραμματίστε και διαχειριστείτε λειτουργίες, ποιμαντικές συναντήσεις και ενοριακά συμβάντα κεντρικά.' },
        sacraments: { title: 'Μητρώο Μυστηρίων', desc: 'Ψηφιοποιήστε, επεξεργαστείτε και αναζητήστε επίσημα αρχεία βαπτίσεων, γάμων και χρισμάτων σε δευτερόλεπτα.' },
        documents: { title: 'Επεξεργαστής Πιστοποιητικών', desc: 'Δημιουργήστε επίσημα πιστοποιητικά PDF χρησιμοποιώντας προδιαμορφωμένα ενοριακά πρότυπα.' },
        community: { title: 'Κοινότητα & Ροή', desc: 'Συνδεθείτε με άλλες ενορίες της χώρας, μοιραστείτε ανακοινώσεις και μάθετε τα νέα.' },
        messages: { title: 'Άμεσα Μηνύματα', desc: 'Γράψτε απευθείας σε άλλα ενοριακά γραφεία ή συνομιλήστε με την υποστήριξη του Emaús.' },
        finances: { title: 'Οικονομική Ενότητα', desc: 'Παρακολουθήστε τα έσοδα, τα έξοδα και τις προσφορές της ενορίας σας με διαδραστικά γραφήματα.' },
        support: { title: 'Βοήθεια & Υποστήριξη', desc: 'Δημιουργήστε αιτήματα υποστήριξης και μιλήστε με την τεχνική ομάδα μας για να επιλύσετε απορίες.' }
      }
    }
  },
  ru: {
    sidebar: { dashboard: 'Обзор', agenda: 'Повестка', sacraments: 'Таинства', documents: 'Документы', messages: 'Сообщения', finances: 'Финансы', community: 'Сообщество', settings: 'Настройки', users: 'Пользователи и Тарифы', support: 'Поддержка', leads: 'Запросы', logout: 'Выйти', role: 'Секретарь', parish: 'Управление приходом' },
    landing: {
      nav: { features: 'Функции', benefits: 'Преимущества', plans: 'Тарифы', login: 'Войти' },
      hero: { badge: 'УПРАВЛЕНИЕ ПРИХОДОМ 2.0', title_start: 'ЦИФРОВИЗИРУЙТЕ МИССИЮ ВАШЕГО', title_highlight: 'ПРИХОДА', subtitle: 'Emaús упорядочивает административный хаос, защищает историю таинств и экономит время для пастырской работы.', cta_access: 'Войти на платформу', cta_plans: 'Тарифы' },
      mockup: { sacrament: 'ТАИНСТВО', record_type: 'Запись о крещении', label_name: 'ИМЯ КРЕЩАЕМОГО', label_date: 'ДАТА', label_book: 'КНИГА / СТР', label_parents: 'РОДИТЕЛИ', badge_db: 'БАЗА ДАННЫХ', status_db: 'Оцифровано', badge_search: 'ПОИСК', status_search: 'Найдено', badge_docs: 'ДОКУМЕНТЫ', status_docs: 'Готово', chat_name: 'Стр. Мария', chat_msg: 'Отправлено' },
      features: { title: 'Все, что нужно вашему приходскому офису', subtitle: 'Emaús заменяет разрозненные инструменты единой платформой, созданной для Церкви.', sacraments_title: 'Цифровые таинства', sacraments_desc: 'Оцифруйте записи о крещениях и браках.', docs_title: 'Справки в 1 клик', docs_desc: 'Автоматическая генерация официальных справок и выписок.', agenda_title: 'Пастырский календарь', agenda_desc: 'Координируйте мессы и встречи в едином календаре.', chat_title: 'Межприходской чат', chat_desc: 'Безопасно общайтесь с секретарями других приходов.', btn_more: 'Больше функций' },
      plans: { title: 'Тарифы для каждого прихода', subtitle: 'Выберите вариант, оптимальный для вашей общины.', basic_title: 'Базовый тариф', basic_desc: 'Для небольших приходов.', adv_title: 'Продвинутый тариф', adv_desc: 'Управление без ограничений.', forever: 'месяц', popular: 'РЕКОМЕНДУЕМЫЙ', cta: 'Демо', feature_agenda: 'Пастырский календарь', feature_sacraments: 'Регистрация таинств', feature_certs: 'Автоматические справки', feature_chat: 'Межприходской чат', feature_editor: 'Редактор документов в стиле Word', feature_finances: 'Финансовый модуль', feature_basic_all: 'Всё из базового тарифа', feature_reports: 'Отчеты и статистика', feature_support: 'Приоритетная поддержка', feature_unlimited: 'Безлимитный чат' },
      community: { title: 'Никогда больше не работайте в одиночку', card1_title: 'Сообщество Emaús', card1_desc: 'Связь между секретарями', card2_title: 'Быстрая связь', card2_desc: 'Эксклюзивный чат между приходами', card3_title: 'Обмен файлами', card3_desc: 'Мгновенно делитесь документами' },
      testimonials: { title: '"Emaús изменил наш приходской офис"', subtitle: 'Раньше мы искали записи часами. Теперь выдаем справки за секунды.', t1_name: 'Стр. Лусия', t1_role: 'Секретарь, Вальпараисо', t1_text: '"Невероятно легко связаться с другими приходами."', t2_name: 'О. Андрей', t2_role: 'Настоятель, Сантьяго', t2_text: '"Порядок в календаре венчаний бесценен."', t3_name: 'Диак. Карлос', t3_role: 'Диакон, Консепсьон', t3_text: '"Я вижу данные прямо в телефоне. Очень удобно."' },
      footer: { tagline: 'Создано для служения Церкви.', dev: 'Приложение разработано' },
      login: { title: 'ВХОД В EMAÚS', subtitle: 'С возвращением.', email: 'Электронная почта', password: 'Пароль', btn: 'Войти', error: 'Неверные учетные данные.' },
      demo: { title: 'ЗАПРОС ДЕМО-ДОСТУПА', subtitle: 'Узнайте, как Emaús может преобразить ваш приход.', name: 'ИМЯ', role: 'ДОЛЖНОСТЬ', parish: 'ПРИХОД', submit: 'Отправить запрос', captcha_error: 'Неверная капча', success_title: 'Отправлено!', success_msg: 'Мы свяжемся с вами в ближайшее время.', close: 'Закрыть' }
    },
    dashboard: {
      welcome: 'Добро пожаловать,',
      welcome_subtitle: 'Вот сводка состояния вашего прихода на сегодня.',
      tour_card: { title: 'Руководство по началу работы', subtitle: 'Узнайте, как оцифровать акты таинств, выдать справки и настроить цифровую подпись менее чем за 5 минут.', btn: 'Начать тур' },
      stats: { baptisms: 'Крещения', marriages: 'Венчания' },
      community_highlight: 'Сообщество и новости',
      no_posts: 'Нет новых публикаций.',
      upcoming_events: 'Ближайшие события',
      no_events: 'Нет запланированных событий на ближайшие дни.',
      view_full_agenda: 'Открыть весь календарь'
    },
    agenda: {
      title: 'Пастырский календарь',
      new_event: 'Новое событие',
      upcoming: 'Ближайшие события',
      no_events: 'Нет запланированных событий.',
      modal: { title: 'Запланировать событие', event_title: 'Название события', date: 'Дата', time: 'Время', type: 'Тип активности', location: 'Место проведения', cancel: 'Отмена', save: 'Сохранить' }
    },
    sacraments: {
      title: 'Реестр таинств',
      subtitle: 'Ищите, редактируйте и регистрируйте оцифрованные акты приходских таинств.',
      new_record: 'Новая запись',
      search_placeholder: 'Поиск по имени или личному номеру...',
      detail: { editing: 'Редактирование записи', record_card: 'Карточка', edit: 'Редактировать', cancel: 'Отмена', save: 'Сохранить', observations: 'Примечания', book_data: 'Данные церковной книги', book: 'Книга', page: 'Страница', parish: 'Приход' },
      table: { name: 'Имя верующего', date: 'Дата', celebrant: 'Священнослужитель', book_page: 'Книга / Стр.', actions: 'Действия', view_details: 'Открыть карточку', no_records: 'Записи о таинствах не найдены.' },
      types: { Bautizo: 'Крещение', Confirmación: 'Миропомазание', Matrimonio: 'Венчание', Defunción: 'Отпевание', 'Primera Comunión': 'Первое Причастие' }
    },
    documents: {
      title: 'Редактор документов',
      new_document: 'Новый документ',
      items: 'документ(ов)',
      empty_folder: 'Папка пуста.',
      cancel_back: 'Отменить и вернуться',
      create_title: 'Создать документ',
      create_subtitle: 'Выберите шаблон или начните с чистого листа.',
      blank_doc: 'Пустой документ',
      start_scratch: 'Начать с нуля без шаблона',
      use_template: 'Использовать шаблон',
      close: 'Закрыть',
      print: 'Печать / Экспорт',
      save: 'Сохранить документ',
      untitled: 'Документ без названия',
      upsell: { title: 'Продвинутый редактор справок', desc: 'Продвинутый тариф позволяет создавать и редактировать свидетельства о крещении и венчании в редакторе в стиле Word.', benefit1: 'Автоматическая генерация официальных PDF', benefit2: 'Цифровая подпись и водяной знак', cta: 'Перейти на Продвинутый' }
    },
    messages: {
      support: 'Поддержка Emaús',
      title: 'Сообщения прихода',
      search_placeholder: 'Поиск чатов...',
      empty_state: 'Чаты не найдены.',
      type_message: 'Напишите сообщение...',
      no_chat_selected: 'Выберите беседу',
      subtitle: 'Начните чат с секретарями других приходов или напишите в техподдержку.',
      start_chat: 'Начать чат',
      directory: { title: 'Справочник приходов', subtitle: 'Ищите другие приходы на платформе и общайтесь с ними.', search: 'Поиск по приходу или городу...', start_conversation: 'Написать' }
    },
    finances: {
      title: 'Финансовый модуль',
      subtitle: 'Управляйте доходами, расходами и пожертвованиями вашего прихода организованно.',
      stats: { balance: 'Чистый баланс', income: 'Ежемесячный доход', expenses: 'Ежемесячный расход', savings_rate: 'Уровень сбережений' },
      table: { header_date: 'Дата', header_desc: 'Описание', header_cat: 'Категория', header_method: 'Способ оплаты', header_amount: 'Сумма', header_actions: 'Действия', income: 'Доход', expense: 'Расход' },
      search_placeholder: 'Поиск по описанию...',
      filter: { all: 'Все', income: 'Доходы', expense: 'Расходы' },
      btn_add: 'Новая транзакция',
      chart_title: 'Финансовая динамика',
      chart_income: 'Доходы',
      chart_expenses: 'Расходы',
      modal: { title_add: 'Зарегистрировать транзакцию', date: 'Дата', type: 'Тип', type_income: 'Доход', type_expense: 'Расход', category: 'Категория', amount: 'Сумма', description: 'Описание', payment_method: 'Способ оплаты', cancel: 'Отмена', save: 'Сохранить транзакцию' },
      calculator: { title: 'Кассовый калькулятор', clear: 'Сбросить', use_amount: 'Использовать сумму' },
      upsell: { title: 'Финансовый модуль', desc: 'Продвинутый тариф содержит инструменты для церковного учета, расчета пошлин и графики сравнения.', benefit1: 'Статистика и ежемесячные сбережения', benefit2: 'Цифровая кассовая книга', cta: 'Перейти на Продвинутый' }
    },
    leads: {
      title: 'Запросы демо-версии',
      subtitle: 'Управляйте заявками от приходов, желающих подключиться к Emaús.',
      table: { name: 'Контакт / Должность', parish: 'Приход / Епархия', status: 'Статус', date: 'Дата регистрации', actions: 'Действия' },
      status: { new: 'Новый', contacted: 'Связались', demo_scheduled: 'Демо запланировано', closed: 'Подключен / Закрыт', lost: 'Утерян' }
    },
    users: {
      title: 'Управление пользователями',
      subtitle: 'Управляйте учетными записями, ролями и активными тарифами.',
      create_user: 'Создать приход',
      search_placeholder: 'Поиск прихода по e-mail...',
      table: { email: 'E-mail для входа', parish: 'Название прихода', city: 'Город / Епархия', plan: 'Активный тариф', actions: 'Действия' },
      actions: { edit_plan: 'Изменить тариф', reset_pass: 'Отправить ссылку для сброса пароля' },
      modal: { create_title: 'Зарегистрировать новый приход', email: 'Адрес e-mail', password: 'Временный пароль', plan: 'Начальный тариф', create: 'Создать приход', edit_plan_title: 'Редактировать тариф', save: 'Сохранить изменения' }
    },
    support: {
      title: 'Техническая поддержка',
      subtitle: 'Отправляйте свои вопросы и сообщения об ошибках приходского софта напрямую в поддержку Emaús.',
      status: { open: 'Открыт', in_progress: 'В работе', resolved: 'Решен', closed: 'Закрыт' },
      admin_dashboard: 'Панель поддержки',
      create_ticket: 'Новый тикет',
      chat: { placeholder: 'Введите ответ...' },
      form: { subject: 'Тема', subject_ph: 'Пример: Ошибка печати свидетельства', priority: 'Приоритет', desc: 'Описание проблемы', desc_ph: 'Подробно опишите проблему, с которой вы столкнулись...', attach: 'Прикрепить файл или скриншот', max_size: 'Макс. размер: 5МБ', cancel: 'Отмена', submit: 'Создать тикет' }
    },
    community: {
      comments: 'Комментарии',
      write_comment: 'Написать комментарий...',
      back_to_feed: 'Назад в ленту',
      title: 'Приходская жизнь',
      subtitle: 'Делитесь новостями, публикациями и общайтесь с другими приходами.',
      new_post_placeholder: 'Что нового сегодня в вашем приходе?',
      upload_photo: 'Добавить фото',
      posting: 'Публикация...',
      publish: 'Опубликовать',
      no_posts: 'В данный момент публикаций нет.',
      suggested_parishes: 'Рекомендуемые приходы',
      visit_profile: 'Открыть профиль'
    },
    settings: { identity: 'Визуальный стиль', avatar_desc: 'Иконка профиля', cover_desc: 'Обложка профиля', cover_image: 'Обложка', upload_cover: 'Загрузить обложку' },
    tour: {
      prev: 'Назад',
      next: 'Далее',
      finish: 'Завершить',
      steps: {
        dashboard: { title: 'Общий обзор', desc: 'Быстрый просмотр ежедневного состояния вашего прихода, событий календаря и новостей сообщества.' },
        agenda: { title: 'Календарь и события', desc: 'Планируйте и координируйте мессы, пастырские встречи и приходские мероприятия централизованно.' },
        sacraments: { title: 'Реестр таинств', desc: 'Оцифровывайте, редактируйте и ищите официальные акты крещений, венчаний и миропомазаний за секунды.' },
        documents: { title: 'Редактор справок', desc: 'Генерируйте официальные справки в формате PDF, используя предварительно настроенные шаблоны.' },
        community: { title: 'Сообщество и лента', desc: 'Общайтесь с другими приходами страны, делитесь объявлениями и узнавайте новости.' },
        messages: { title: 'Прямые сообщения', desc: 'Пишите напрямую секретарям других приходов или общайтесь с техподдержкой Emaús.' },
        finances: { title: 'Бухгалтерский модуль', desc: 'Контролируйте доходы, расходы и пожертвования вашего прихода с помощью интерактивных графиков.' },
        support: { title: 'Помощь и поддержка', desc: 'Создавайте тикеты поддержки и общайтесь с нашей технической командой по любым вопросам.' }
      }
    }
  },
  ja: {
    sidebar: { dashboard: '概要', agenda: '予定表', sacraments: '秘跡', documents: '書類', messages: 'メッセージ', finances: '財務', community: 'コミュニティ', settings: '設定', users: 'ユーザーとプラン', support: 'サポート', leads: 'リクエスト', logout: 'ログアウト', role: '秘書', parish: '教区管理' },
    landing: {
      nav: { features: '機能', benefits: 'メリット', plans: 'プラン', login: 'ログイン' },
      hero: { badge: '教区管理 2.0', title_start: 'あなたの', title_highlight: '教区使命をデジタル化', subtitle: 'Emaúsは事務的な混乱を整理し、秘跡の歴史を守り、より多くの時間を司牧ケアに充てられます。', cta_access: 'アクセス', cta_plans: 'プランを見る' },
      mockup: { sacrament: '秘跡', record_type: '洗礼記録', label_name: '氏名', label_date: '日付', label_book: '巻 / ページ', label_parents: '保護者', badge_db: 'データベース', status_db: 'デジタル化完了', badge_search: '検索', status_search: '発見', badge_docs: '書類', status_docs: '発行完了', chat_name: 'シスター・マリア', chat_msg: '送信完了' },
      features: { title: '教区事務所に必要なすべてのツール', subtitle: 'Emaúsは、教会専用に設計された統一されたプラットフォームで、複数の切断されたツールを置き換えます。', sacraments_title: 'デジタル秘跡', sacraments_desc: '洗礼と婚礼のデジタル保存。', docs_title: '1クリック証明書', docs_desc: '公式な証明書の自動発行。', agenda_title: '司牧予定表', agenda_desc: '共有予定表でミサや会議を管理。', chat_title: '教区間チャット', chat_desc: '安全に他教区の事務室と接続。', btn_more: '他の機能を見る' },
      plans: { title: 'すべてのコミュニティのためのプラン', subtitle: 'あなたの教区に最適なプランをお選びください。', basic_title: 'ベーシックプラン', basic_desc: '小規模の教区向け。', adv_title: 'アドバンスプラン', adv_desc: '制限なしの包括的な管理。', forever: '月', popular: 'おすすめ', cta: 'デモ依頼', feature_agenda: '教区予定表', feature_sacraments: '秘跡記録の管理', feature_certs: '自動証明書発行', feature_chat: '教区間チャット', feature_editor: 'Word形式エディタ', feature_finances: '財務管理モジュール', feature_basic_all: 'ベーシックプランの全機能', feature_reports: '報告書と統計分析', feature_support: '優先サポート', feature_unlimited: '無制限のチャット' },
      community: { title: 'もう一人で悩まない', card1_title: 'Emaúsコミュニティ', card1_desc: 'つながる教区オフィス', card2_title: '瞬時のコミュニケーション', card2_desc: '教区間専用チャット', card3_title: '書類の共有', card3_desc: '瞬時にファイルを送受信' },
      testimonials: { title: '「Emaúsで教区事務所が変わりました」', subtitle: '以前は探すのに何時間もかかりました。今は数秒で発行できます。', t1_name: 'シスター・ルシア', t1_role: '秘書, バルパライソ', t1_text: '「他教区への連絡が驚くほど簡単です。」', t2_name: 'アンドレ神父', t2_role: '主任司祭, サンティアゴ', t2_text: '「挙式予定表の整理には計り知れない価値があります。」', t3_name: 'カルロス執事', t3_role: '助祭, コンセプシオン', t3_text: '「スマホから情報を確認できて非常に実用的です。」' },
      footer: { tagline: '教会に仕えるために設計。', dev: '開発元' },
      login: { title: 'EMAÚS ログイン', subtitle: 'おかえりなさい。', email: 'メールアドレス', password: 'パスワード', btn: 'ログイン', error: 'ログイン情報が間違っています。' },
      demo: { title: 'デモの依頼', subtitle: 'Emaúsが教区事務をどのように変革できるかご覧ください。', name: 'お名前', role: '役職', parish: '教区/教会', submit: 'リクエスト送信', captcha_error: 'Captchaが一致しません', success_title: '送信完了', success_msg: '間もなく担当者よりご連絡いたします。', close: '閉じる' }
    },
    dashboard: {
      welcome: 'ようこそ、',
      welcome_subtitle: '本日の教区の活動状況の要約です。',
      tour_card: { title: 'クイックスタートガイド', subtitle: '5分以内で秘跡記録をデジタル化し、証明書を発行し、デジタル署名を設定する方法を説明します。', btn: 'ツアーを開始' },
      stats: { baptisms: '洗礼', marriages: '婚礼' },
      community_highlight: 'コミュニティと最新情報',
      no_posts: 'コミュニティの最新の投稿はありません。',
      upcoming_events: '直近の予定',
      no_events: '数日間に予定されているイベントはありません。',
      view_full_agenda: '予定表を開く'
    },
    agenda: {
      title: '教区予定表',
      new_event: '新しい予定',
      upcoming: '今後の予定',
      no_events: '予定はありません。',
      modal: { title: '予定の作成', event_title: '予定タイトル', date: '日付', time: '時刻', type: '活動タイプ', location: '場所', cancel: 'キャンセル', save: '保存する' }
    },
    sacraments: {
      title: '秘跡大帳',
      subtitle: 'デジタル化された洗礼、婚礼、その他の秘跡大帳を検索・管理します。',
      new_record: '新しい記録',
      search_placeholder: '信徒名またはIDで検索...',
      detail: { editing: '記録の編集中', record_card: '記録カード', edit: '編集', cancel: 'キャンセル', save: '保存', observations: '備考', book_data: '台帳番号データ', book: '台帳', page: 'ページ', parish: '教区' },
      table: { name: '信徒名', date: '日付', celebrant: '司式者', book_page: '台帳/ページ', actions: '操作', view_details: '詳細表示', no_records: '秘跡の記録が見つかりません。' },
      types: { Bautizo: '洗礼', Confirmación: '堅信', Matrimonio: '婚礼', Defunción: '葬儀', 'Primera Comunión': '初聖体' }
    },
    documents: {
      title: '書類作成',
      new_document: '新規書類',
      items: 'ファイル',
      empty_folder: 'このフォルダーは空です。',
      cancel_back: 'キャンセルして戻る',
      create_title: '書類の新規作成',
      create_subtitle: '公式テンプレートを選択するか、白紙から開始してください。',
      blank_doc: '白紙ドキュメント',
      start_scratch: 'テンプレートなしで開始',
      use_template: 'このテンプレートを使用',
      close: '閉じる',
      print: '印刷 / エクスポート',
      save: '書類を保存',
      untitled: '無題のドキュメント',
      upsell: { title: '高度な証明書エディタ', desc: 'アドバンスプランでは、Wordスタイルのエディタで洗礼証明書や婚姻証明書を作成・編集できます。', benefit1: '公式PDFの自動生成機能', benefit2: '電子署名とウォーターマーク', cta: 'アドバンスプランにアップグレード' }
    },
    messages: {
      support: 'Emaúsサポート',
      title: '教区間メッセージ',
      search_placeholder: 'チャットを検索...',
      empty_state: '会話は見つかりませんでした。',
      type_message: 'メッセージを入力してください...',
      no_chat_selected: 'チャットを選択してください',
      subtitle: '他の教区事務所とチャットを開始するか、サポートにメッセージを送信してください。',
      start_chat: 'チャットを開始',
      directory: { title: '教区名簿', subtitle: '登録されている他の教会を検索してメッセージを送信します。', search: '教会名や都市で検索...', start_conversation: 'メッセージを送る' }
    },
    finances: {
      title: '会計モジュール',
      subtitle: '教区の収入、支出、献金を整理して管理します。',
      stats: { balance: '純収支', income: '月間収入', expenses: '月間支出', savings_rate: '貯蓄率' },
      table: { header_date: '日付', header_desc: '説明', header_cat: 'カテゴリー', header_method: '支払方法', header_amount: '金額', header_actions: '操作', income: '収入', expense: '支出' },
      search_placeholder: '説明で検索...',
      filter: { all: 'すべて', income: '収入', expense: '支出' },
      btn_add: '取引を記録',
      chart_title: '財務推移',
      chart_income: '収入',
      chart_expenses: '支出',
      modal: { title_add: '取引の記録', date: '日付', type: '種別', type_income: '収入', type_expense: '支出', category: 'カテゴリー', amount: '金額', description: '説明', payment_method: '支払方法', cancel: 'キャンセル', save: '保存する' },
      calculator: { title: 'レジ計算機', clear: 'クリア', use_amount: '金額を挿入' },
      upsell: { title: '財務管理モジュール', desc: 'アドバンスプランには、教区向け簿記ツール、献金計算、比較グラフが含まれています。', benefit1: '財務統計と月間貯蓄率', benefit2: 'デジタル補助キャッシュブック', cta: 'アドバンスプランにアップグレード' }
    },
    leads: {
      title: 'デモ要求',
      subtitle: 'Emaúsの導入に関心のある教会からのリードを管理します。',
      table: { name: '担当者 / 役職', parish: '教区 / 教会', status: 'ステータス', date: '登録日', actions: '操作' },
      status: { new: '新規', contacted: '連絡済', demo_scheduled: 'デモ予定', closed: '成約', lost: '失注' }
    },
    users: {
      title: 'ユーザー管理',
      subtitle: '登録されている教会の認証情報、ロール、契約プランを管理します。',
      create_user: 'アカウント作成',
      search_placeholder: 'メールアドレスで検索...',
      table: { email: 'ログイン用Eメール', parish: '教会名', city: '都市 / 教区', plan: '契約プラン', actions: '操作' },
      actions: { edit_plan: '契約プラン変更', reset_pass: 'パスワード設定メール送信' },
      modal: { create_title: '新規教区の登録', email: 'メールアドレス', password: '一時パスワード', plan: '初期プラン', create: '教区を作成', edit_plan_title: 'プラン設定の編集', save: '変更を保存' }
    },
    support: {
      title: '技術サポート',
      subtitle: 'ご質問やシステムエラーのご報告を直接Emaúsサポートチームにお送りいただけます。',
      status: { open: 'オープン', in_progress: '対応中', resolved: '解決済', closed: 'クローズ' },
      admin_dashboard: 'サポートダッシュボード',
      create_ticket: '新規チケット',
      chat: { placeholder: '返信を入力してください...' },
      form: { subject: '件名', subject_ph: '例：証明書の印刷エラー', priority: '優先度', desc: '問題の詳細', desc_ph: '発生している問題についてご記入ください...', attach: 'ファイルを添付またはスクショ', max_size: '上限サイズ: 5MB', cancel: 'キャンセル', submit: 'チケットを作成' }
    },
    community: {
      comments: 'コメント',
      write_comment: 'コメントを書く...',
      back_to_feed: 'フィードに戻る',
      title: '教会の歩み',
      subtitle: 'ニュースを共有し、全国の教会オフィスとつながります。',
      new_post_placeholder: '教会での今日のニュースを共有しましょう。',
      upload_photo: '写真を投稿',
      posting: '送信中...',
      publish: '投稿する',
      no_posts: '現在投稿はありません。',
      suggested_parishes: 'おすすめの教会',
      visit_profile: 'プロフィールを表示'
    },
    settings: { identity: 'ビジュアルアイデンティティ', avatar_desc: 'アバターアイコン', cover_desc: 'カバー画像', cover_image: 'カバー画像', upload_cover: 'カバー画像をアップロード' },
    tour: {
      prev: '前へ',
      next: '次へ',
      finish: '終了',
      steps: {
        dashboard: { title: '全体概要', desc: '教区の日常の活動状況、予定表のイベント、コミュニティの最新情報をすばやく確認できます。' },
        agenda: { title: '予定表と活動', desc: 'ミサ、司牧ミーティング、教区のイベントを中央のカレンダーで計画・管理します。' },
        sacraments: { title: '秘跡記録', desc: '洗礼、婚礼、堅信の公式記録を数秒でデジタル化、編集、検索できます。' },
        documents: { title: '証明書エディタ', desc: '事前設定された教区テンプレートを使用して、公式なPDF証明书を生成します。' },
        community: { title: 'コミュニティとフィード', desc: '全国の他の教区とつながり、お知らせを共有し、最新情報を入手できます。' },
        messages: { title: 'ダイレクトメッセージ', desc: '他の教区事務所に直接メッセージを送るか、Emaúsサポートとチャットできます。' },
        finances: { title: '会計モジュール', desc: 'インタラクティブなグラフで教区の収入、支出、献金を追跡・管理します。' },
        support: { title: 'ヘルプとサポート', desc: 'サポートチケットを作成し、技術チームに質問して疑問を解決できます。' }
      }
    }
  },
  ko: {
    sidebar: { dashboard: '개요', agenda: '일정', sacraments: '성사', documents: '문서', messages: '메시지', finances: '재정', community: '커뮤니티', settings: '설정', users: '사용자 및 요금제', support: '지원', leads: '요청', logout: '로그아웃', role: '사무장', parish: '본당 관리' },
    landing: {
      nav: { features: '기능', benefits: '혜택', plans: '요금제', login: '로그인' },
      hero: { badge: '본당 관리 2.0', title_start: '본당의 사명을', title_highlight: '디지털화하세요', subtitle: 'Emaús는 행정적 혼란을 정리하고 성사 기록을 안전하게 보호하여 더 많은 시간 동안 사목 활동에 집중할 수 있도록 돕습니다.', cta_access: '접속', cta_plans: '요금제 보기' },
      mockup: { sacrament: '성사', record_type: '세례 대장', label_name: '성명', label_date: '일자', label_book: '권 / 페이지', label_parents: '부모', badge_db: '데이터베이스', status_db: '디지털화 완료', badge_search: '검색', status_search: '확인됨', badge_docs: '문서', status_docs: '발행 완료', chat_name: '마리아 수녀', chat_msg: '전송 완료' },
      features: { title: '본당 사무실의 모든 필수 도구', subtitle: 'Emaús는 교회 전용으로 설계된 통합 플랫폼으로 기존의 다양한 도구들을 하나로 대체합니다.', sacraments_title: '디지털 성사', sacraments_desc: '세례 및 혼인 대장의 디지털 보존.', docs_title: '1클릭 증명서', docs_desc: '공식 증명서의 자동 발행.', agenda_title: '사목 일정', agenda_desc: '캘린더에서 미사 및 본당 일정을 한눈에 공유.', chat_title: '본당 간 채팅', chat_desc: '다른 본당의 사무실과 안전하게 실시간 메시지 전달.', btn_more: '더 많은 기능 보기' },
      plans: { title: '모든 공동체를 위한 요금제', subtitle: '당신의 본당에 가장 적합한 옵션을 선택하세요.', basic_title: '기본 요금제', basic_desc: '소규모 본당용.', adv_title: '고급 요금제', adv_desc: '제한 없는 포괄적 본당 관리.', forever: '월', popular: '추천', cta: '데모 요청', feature_agenda: '본당 캘린더', feature_sacraments: '성사 기록 관리', feature_certs: '자동 증명서 발행', feature_chat: '본당 간 실시간 채팅', feature_editor: 'Word 형식 문서 에디터', feature_finances: '재정 관리 모듈', feature_basic_all: '기본 요금제의 전 기능 포함', feature_reports: '보고서 및 통계 자료', feature_support: '우선 기술 지원', feature_unlimited: '무제한 대화' },
      community: { title: '더 이상 혼자가 아닙니다', card1_title: 'Emaús 커뮤니티', card1_desc: '연결된 사무장들', card2_title: '실시간 소통', card2_desc: '본당 간의 전용 실시간 채팅', card3_title: '문서의 빠른 공유', card3_desc: '언제 어디서든 파일을 즉시 전송' },
      testimonials: { title: '「Emaús가 사무실을 바꿨습니다」', subtitle: '이전에는 기록을 찾느라 많은 시간을 소모했지만, 이제는 몇 초 만에 발급합니다.', t1_name: '루시아 수녀', t1_role: '사무장, 발파라이소', t1_text: '「다른 본당과 연락하는 것이 정말 간단합니다.」', t2_name: '안드레아 신부', t2_role: '주임 신부, 산티아고', t2_text: '「혼인 일정이 잘 정돈되는 것은 큰 가치입니다.」', t3_name: '카를로스 부제', t3_role: '부제, 콘셉시온', t3_text: '「휴대폰으로 바로 정보를 확인할 수 있어 실용적입니다.」' },
      footer: { tagline: '교회를 섬기기 위해 설계되었습니다.', dev: '개발사' },
      login: { title: 'EMAÚS 로그인', subtitle: '어서오세요.', email: '이메일 주소', password: '비밀번호', btn: '로그인', error: '로그인 정보가 유효하지 않습니다.' },
      demo: { title: '데모 신청', subtitle: 'Emaús를 활용하여 본당 행정을 혁신하는 방법을 확인하세요.', name: '성함', role: '직책', parish: '본당/성당', submit: '신청하기', captcha_error: '보안 문자가 일치하지 않습니다.', success_title: '신청 완료', success_msg: '담당자가 신속하게 연락을 드릴 예정입니다.', close: '닫기' }
    },
    dashboard: {
      welcome: '환영합니다,',
      welcome_subtitle: '오늘 본당의 활동 요약 정보입니다.',
      tour_card: { title: '빠른 시작 가이드', subtitle: '5분 이내로 성사 기록을 디지털 대장에 보존하고, 증명서를 발행하며 디지털 서명을 세팅하는 방법을 알아보세요.', btn: '가이드 시작' },
      stats: { baptisms: '세례', marriages: '혼인' },
      community_highlight: '커뮤니티 소식',
      no_posts: '커뮤니티의 최근 게시글이 없습니다.',
      upcoming_events: '직근 다가오는 일정',
      no_events: '다가오는 며칠 동안 예정된 일정이 없습니다.',
      view_full_agenda: '전체 일정 열기'
    },
    agenda: {
      title: '본당 일정',
      new_event: '새 일정 추가',
      upcoming: '다가오는 일정',
      no_events: '등록된 일정이 없습니다.',
      modal: { title: '일정 만들기', event_title: '일정 제목', date: '날짜', time: '시간', type: '활동 구분', location: '장소', cancel: '취소', save: '저장하기' }
    },
    sacraments: {
      title: '성사 대장',
      subtitle: '디지털화된 세례, 혼인 등의 기록들을 검색하고 관리할 수 있습니다.',
      new_record: '새 기록',
      search_placeholder: '신자 이름 또는 신분 번호로 검색...',
      detail: { editing: '기록 편집 중', record_card: '신자 성사 카드', edit: '편집', cancel: '취소', save: '저장', observations: '관련 정보', book_data: '대장 장부 데이터', book: '대장 번호', page: '페이지', parish: '소속 본당' },
      table: { name: '신자 성명', date: '일자', celebrant: '주례', book_page: '대장/쪽수', actions: '기능', view_details: '자세히 보기', no_records: '해당하는 성사 기록이 없습니다.' },
      types: { Bautizo: '세례', Confirmación: '견신', Matrimonio: '혼인', Defunción: '장례', 'Primera Comunión': '첫영성체' }
    },
    documents: {
      title: '문서 생성기',
      new_document: '새 문서',
      items: '개 파일',
      empty_folder: '폴더가 비어 있습니다.',
      cancel_back: '취소하고 뒤로 가기',
      create_title: '새 문서 만들기',
      create_subtitle: '공식 템플릿을 선택하거나 빈 양식으로 시작하세요.',
      blank_doc: '빈 문서 양식',
      start_scratch: '템플릿 없이 직접 작성',
      use_template: '이 템플릿 사용하기',
      close: '닫기',
      print: '인쇄 / 내보내기',
      save: '문서 저장',
      untitled: '제목 없는 문서',
      upsell: { title: '고급 문서 에디터 기능', desc: '고급 요금제에서는 세례나 혼인 증명서를 Word 스타일의 에디터로 직접 작성 및 편집할 수 있습니다.', benefit1: '공식 PDF 문서 자동 생성', benefit2: '디지털 본당 서명 및 워터마크 세팅', cta: '고급 요금제로 업그레이드' }
    },
    messages: {
      support: 'Emaús 기술 지원',
      title: '본당 간 메시지',
      search_placeholder: '메시지 검색...',
      empty_state: '대화 기록이 존재하지 않습니다.',
      type_message: '메시지를 입력하세요...',
      no_chat_selected: '대화방을 선택하세요',
      subtitle: '전국의 본당 사무실과 실시간 채팅을 시작하거나 기술 지원 부서로 문의를 보내세요.',
      start_chat: '대화 시작하기',
      directory: { title: '본당 주소록', subtitle: '플랫폼에 등록된 다른 성당을 검색하고 메시지를 전달해보세요.', search: '성당명 혹은 도시로 검색...', start_conversation: '대화하기' }
    },
    finances: {
      title: '재정 관리 모듈',
      subtitle: '본당의 수입, 지출 및 헌금을 체계적으로 정리하고 통계를 파악합니다.',
      stats: { balance: '순잔액', income: '이달의 수입', expenses: '이달의 지출', savings_rate: '저축률' },
      table: { header_date: '날짜', header_desc: '적요', header_cat: '계정과목', header_method: '결제 수단', header_amount: '금액', header_actions: '관리', income: '수입', expense: '지출' },
      search_placeholder: '적요로 검색...',
      filter: { all: '전체', income: '수입', expense: '지출' },
      btn_add: '거래 기록 추가',
      chart_title: '재정 지표 추이',
      chart_income: '수입',
      chart_expenses: '지출',
      modal: { title_add: '거래 내용 저장', date: '날짜', type: '구분', type_income: '수입', type_expense: '지출', category: '계정과목', amount: '금액', description: '적요', payment_method: '결제 수단', cancel: '취소', save: '저장하기' },
      calculator: { title: '금고 계산기', clear: '초기화', use_amount: '금액 반영' },
      upsell: { title: '재정 관리 기능 안내', desc: '고급 요금제는 본당 전용 회계 관리 툴과 헌금 통계 비교 그래프를 제공합니다.', benefit1: '상세 재정 통계 데이터 분석', benefit2: '디지털 보조 현금 시재 대장', cta: '고급 요금제로 업그레이드' }
    },
    leads: {
      title: '데모 요청 목록',
      subtitle: 'Emaús 도입을 고려하는 교회 측의 리드를 관리합니다.',
      table: { name: '신청인 / 직책', parish: '본당 / 교구', status: '상태', date: '신청일자', actions: '관리' },
      status: { new: '신규', contacted: '연락함', demo_scheduled: '일정 확인됨', closed: '성공', lost: '실패' }
    },
    users: {
      title: '사용자 및 본당 관리',
      subtitle: '가입된 본당의 이메일 계정, 역할 및 활성 요금제를 관리합니다.',
      create_user: '새 본당 계정 만들기',
      search_placeholder: '이메일 주소로 검색...',
      table: { email: '로그인용 이메일', parish: '본당명', city: '소속 도시/교구', plan: '이용 요금제', actions: '관리' },
      actions: { edit_plan: '요금제 변경', reset_pass: '비밀번호 재설정 메일 발송' },
      modal: { create_title: '새 본당 등록', email: '이메일 주소', password: '임시 비밀번호', plan: '이용 플랜', create: '본당 등록', edit_plan_title: '이용 플랜 편집', save: '저장하기' }
    },
    support: {
      title: '기술 지원 문의',
      subtitle: '프로그램 오류 및 건의사항을 Emaús 지원 부서에 접수할 수 있습니다.',
      status: { open: '오픈', in_progress: '처리 중', resolved: '해결 완료', closed: '종료' },
      admin_dashboard: '관리자 지원 패널',
      create_ticket: '새 문의 접수',
      chat: { placeholder: '답변을 입력하세요...' },
      form: { subject: '제목', subject_ph: '예: 증명서 인쇄 시 발생 오류', priority: '우선순위', desc: '문의 내용', desc_ph: '겪고 계신 장애 증상을 구체적으로 기술해 주세요...', attach: '파일 또는 캡처 사진 첨부', max_size: '최대 크기: 5MB', cancel: '취소', submit: '접수하기' }
    },
    community: {
      comments: '댓글',
      write_comment: '댓글 작성...',
      back_to_feed: '피드로 이동',
      title: '신앙 생활',
      subtitle: '공동체 소식과 의견을 전국의 본당 사무실과 공유합니다.',
      new_post_placeholder: '오늘 본당에 어떤 기쁜 소식이 있었나요?',
      upload_photo: '사진 올리기',
      posting: '작성 중...',
      publish: '등록하기',
      no_posts: '현재 등록된 소식이 없습니다.',
      suggested_parishes: '추천 성당',
      visit_profile: '프로필 보기'
    },
    settings: { identity: '비주얼 설정', avatar_desc: '프로필 아이콘', cover_desc: '배경 이미지', cover_image: '배경 이미지', upload_cover: '배경 업로드' },
    tour: {
      prev: '이전',
      next: '다음',
      finish: '완료',
      steps: {
        dashboard: { title: '종합 개요', desc: '본당의 일일 상태, 일정표 이벤트 및 커뮤니티의 최신 소식을 빠르게 확인합니다.' },
        agenda: { title: '일정 및 사목 활동', desc: '미사, 사목 회의 및 본당 행사를 공유 캘린더에서 통합하여 계획하고 관리합니다.' },
        sacraments: { title: '성사 대장 관리', desc: '세례, 혼인, 견신 성사의 공식 대장을 수초 만에 디지털화하고 편집 및 검색합니다.' },
        documents: { title: '증명서 에디터', desc: '사전에 구성된 본당 템플릿을 사용하여 공식 PDF 증명서를 발급합니다.' },
        community: { title: '공동체 소식 피드', desc: '전국의 다른 본당과 소통하고 공지사항을 공유하며 최신 소식을 접합니다.' },
        messages: { title: '실시간 메시지', desc: '다른 본당 사무실과 실시간으로 메시지를 주고받거나 Emaús 기술 지원 부서와 문의를 주고받습니다.' },
        finances: { title: '회계 재정 모듈', desc: '수입, 지출 및 헌금 내역을 직관적인 차트와 함께 편리하게 기록하고 관리합니다.' },
        support: { title: '도움말 및 기술 지원', desc: '지원 티켓을 접수하고 기술 부서와 소통하여 문제나 궁금증을 신속히 해결합니다.' }
      }
    }
  },
  zh: {
    sidebar: { dashboard: '概览', agenda: '日程', sacraments: '圣事', documents: '文档', messages: '消息', finances: '财务', community: '社区', settings: '设置', users: '用户与方案', support: '支持', leads: '申请', logout: '登出', role: '秘书', parish: '堂区管理' },
    landing: {
      nav: { features: '功能', benefits: '优势', plans: '方案', login: '登录' },
      hero: { badge: '堂区管理 2.0', title_start: '数字化您的', title_highlight: '堂区使命', subtitle: 'Emaús 整理行政混乱，保护圣事历史记录，为您节省更多的时间用于牧灵关怀。', cta_access: '访问系统', cta_plans: '查看方案' },
      mockup: { sacrament: '圣事', record_type: '洗礼登记', label_name: '姓名', label_date: '日期', label_book: '册数 / 页码', label_parents: '父母', badge_db: '数据库', status_db: '数字化记录已保存', badge_search: '搜索', status_search: '已找到记录', badge_docs: '文档', status_docs: '证书已生成', chat_name: '玛丽亚修女', chat_msg: '资料已发' },
      features: { title: '堂区秘书所需的一切功能', subtitle: 'Emaús 用专门为教会设计的统一平台，取代多套零散未联通的办公工具。', sacraments_title: '数字圣事', sacraments_desc: '洗礼、婚姻和坚振圣事历史档案的数字化保存。', docs_title: '一键办证', docs_desc: '自动排版并生成官方盖章证明书。', agenda_title: '牧灵日程', agenda_desc: '在共享日历中统一安排和管理弥撒及会议。', chat_title: '堂区聊天', chat_desc: '与其他堂区的秘书安全地在线沟通及文件共享。', btn_more: '查看更多功能' },
      plans: { title: '专为不同堂区量身打造的方案', subtitle: '选择最适合您堂区的订阅方案。', basic_title: '基础方案', basic_desc: '适合小规模堂区。', adv_title: '高级方案', adv_desc: '无限制的全面数字化堂区管理。', forever: '月', popular: '推荐', cta: '申请演示', feature_agenda: '堂区日程日历', feature_sacraments: '圣事档案管理', feature_certs: '一键导出证明书', feature_chat: '跨堂区在线聊天', feature_editor: 'Word样式排版编辑器', feature_finances: '堂区财务记账模块', feature_basic_all: '包含基础方案全部功能', feature_reports: '多维财务数据报表', feature_support: '高级客服优先支持', feature_unlimited: '无限制会话' },
      community: { title: '不再孤军奋战', card1_title: 'Emaús 社区', card1_desc: '互联的堂区秘书', card2_title: '即时在线沟通', card2_desc: '堂区与堂区之间的专属聊天通道', card3_title: '高效共享文档', card3_desc: '随时随地一键上传并共享工作档案' },
      testimonials: { title: '“Emaús 改变了我们的堂区办公室”', subtitle: '以前查找老账本要花几个小时，现在几秒钟就能把洗礼证明书开好。', t1_name: '露西亚修女', t1_role: '堂区秘书, 瓦尔帕莱索', t1_text: '“与其他堂区保持联系变得异常方便和简单。”', t2_name: '安德烈神父', t2_role: '堂区主任司铎, 圣地亚哥', t2_text: '“婚礼和弥撒日程变得井井有条，太让人省心了。”', t3_name: '卡洛斯执事', t3_role: '终身执事, 康塞普西翁', t3_text: '“可以在手机上随时随地查看堂区数据，非常方便实用。”' },
      footer: { tagline: '用心服务于教会而设计。', dev: '开发商' },
      login: { title: '登录到 EMAÚS', subtitle: '欢迎回来。', email: '电子邮箱地址', password: '密码', btn: '登录', error: '邮箱或密码不正确。' },
      demo: { title: '申请系统演示', subtitle: '了解 Emaús 如何帮您堂区实现数字化升级。', name: '您的姓名', role: '职务', parish: '所属堂区', submit: '提交申请', captcha_error: '验证码输入错误', success_title: '申请已提交！', success_msg: '我们的工作人员会尽快联系您。', close: '关闭' }
    },
    dashboard: {
      welcome: '欢迎回来，',
      welcome_subtitle: '以下是您堂区今天的活动简报。',
      tour_card: { title: '快速入门指南', subtitle: '了解如何在5分钟内数字化您的圣事台账，导出盖章证书，并配置您的电子签名。', btn: '开始指引' },
      stats: { baptisms: '洗礼登记', marriages: '婚姻登记' },
      community_highlight: '社区新鲜事',
      no_posts: '当前暂无新的社区动态。',
      upcoming_events: '日程日历近况',
      no_events: '未来几天暂无安排好的日程活动。',
      view_full_agenda: '查看完整日程表'
    },
    agenda: {
      title: '堂区日程日历',
      new_event: '新建活动',
      upcoming: '近况日程',
      no_events: '暂无安排好的日程。',
      modal: { title: '新建日程安排', event_title: '日程标题', date: '日期', time: '时间', type: '活动类别', location: '地点', cancel: '取消', save: '保存日程' }
    },
    sacraments: {
      title: '圣事台大账',
      subtitle: '搜索、修改和登记您堂区数字化圣事历史案卷。',
      new_record: '新建登记',
      search_placeholder: '按教友姓名或身份ID搜索...',
      detail: { editing: '正在编辑记录', record_card: '教友登记卡', edit: '编辑', cancel: '取消', save: '保存', observations: '备注信息', book_data: '大账册数位置', book: '册数', page: '页码', parish: '所属堂区' },
      table: { name: '教友姓名', date: '日期', celebrant: '主礼', book_page: '册数/页码', actions: '操作', view_details: '查看登记卡', no_records: '未找到符合条件的圣事登记记录。' },
      types: { Bautizo: '洗礼', Confirmación: '坚振', Matrimonio: '婚姻', Defunción: '殡葬', 'Primera Comunión': '初领圣体' }
    },
    documents: {
      title: '文档排版中心',
      new_document: '新建文档',
      items: '个文档',
      empty_folder: '此文件夹为空。',
      cancel_back: '取消并返回',
      create_title: '新建办公文档',
      create_subtitle: '选择系统提供的官方格式模板或新建一个空白稿件。',
      blank_doc: '空白文档',
      start_scratch: '不使用模板全新创作',
      use_template: '使用此格式模板',
      close: '关闭',
      print: '打印并导出 PDF',
      save: '保存文档',
      untitled: '未命名文档',
      upsell: { title: '高级电子证明书排版系统', desc: '高级订阅方案允许您在 Word 样式的强大编辑器中直接起草、修改和打印洗礼与婚姻证明书。', benefit1: '支持一键生成和输出官方规格 PDF', benefit2: '配置专属电子印章和防伪水印', cta: '升级至高级订阅方案' }
    },
    messages: {
      support: 'Emaús 技术客服',
      title: '堂区即时消息',
      search_placeholder: '搜索消息记录...',
      empty_state: '暂无聊天会话。',
      type_message: '输入消息...',
      no_chat_selected: '请选择一个会话',
      subtitle: '与其他堂区的办事处开始在线会话，或直接与我们的售后技术客服保持联系。',
      start_chat: '发起新聊天',
      directory: { title: '堂区名录', subtitle: '搜索平台上已注册的其他堂区并直接与其取得联系。', search: '按堂区名或城市搜索...', start_conversation: '发起聊天' }
    },
    finances: {
      title: '堂区财务记账',
      subtitle: '清晰直观地管理您堂区的日常收入、开支及各类捐献账目。',
      stats: { balance: '净结余', income: '本月收入', expenses: '本月支出', savings_rate: '盈余储蓄率' },
      table: { header_date: '账目日期', header_desc: '摘要说明', header_cat: '会计科目', header_method: '支付手段', header_amount: '金额', header_actions: '管理', income: '收入', expense: '支出' },
      search_placeholder: '按账目摘要搜索...',
      filter: { all: '全部账目', income: '仅看收入', expense: '仅看支出' },
      btn_add: '添加一笔账目',
      chart_title: '财务收支趋势图',
      chart_income: '总收入',
      chart_expenses: '总支出',
      modal: { title_add: '登记一笔财务明细', date: '账目日期', type: '账目类别', type_income: '收入明细', type_expense: '支出明细', category: '会计科目', amount: '金额', description: '摘要说明', payment_method: '支付手段', cancel: '取消', save: '保存收支' },
      calculator: { title: '零钱柜计算器', clear: '清空', use_amount: '代入计算金额' },
      upsell: { title: '财务核算记账系统', desc: '高级订阅方案包含了专为教会设计的记账账本、捐献自动归纳统计以及收支对比图表。', benefit1: '收支动态趋势对比分析', benefit2: '数字化辅助零钱日记账', cta: '升级至高级订阅方案' }
    },
    leads: {
      title: '销售线索与演示申请',
      subtitle: '管理申请加入并试用 Emaús 系统的堂区和线索。',
      table: { name: '联系人 / 职务', parish: '堂区 / 教区', status: '跟进状态', date: '申请时间', actions: '操作' },
      status: { new: '全新线索', contacted: '已联系跟进', demo_scheduled: '已预订系统演示', closed: '成功签约', lost: '丢单' }
    },
    users: {
      title: '堂区系统用户管理',
      subtitle: '为已加入本平台的堂区开通、管理邮箱账号、角色及订阅方案。',
      create_user: '新建堂区账号',
      search_placeholder: '按注册邮箱搜索堂区...',
      table: { email: '注册用邮箱', parish: '堂区名称', city: '城市 / 教区', plan: '当前订阅方案', actions: '操作' },
      actions: { edit_plan: '调整订阅方案', reset_pass: '向其邮箱发送重置密码邮件' },
      modal: { create_title: '登记并开通新堂区', email: '电子邮箱地址', password: '账号临时密码', plan: '初始订阅方案', create: '创建并开通', edit_plan_title: '修改堂区订阅方案', save: '保存设置' }
    },
    support: {
      title: '技术服务工单',
      subtitle: '在使用系统过程中遇到任何故障或有改进建议，均可直接向 Emaús 售后团队提交工单。',
      status: { open: '已受理待跟进', in_progress: '正在处理排查', resolved: '故障已排除', closed: '工单已归档关闭' },
      admin_dashboard: '技术服务控制台',
      create_ticket: '新建故障工单',
      chat: { placeholder: '输入跟进回复...' },
      form: { subject: '工单主题', subject_ph: '例如：连接打印机输出异常', priority: '优先级', desc: '故障现象具体描述', desc_ph: '请提供尽可能详细的故障复现过程以帮我们排查...', attach: '上传相关附件或报错截图', max_size: '大小限制: 5MB', cancel: '取消', submit: '提交服务工单' }
    },
    community: {
      comments: '评论回复',
      write_comment: '输入评论...',
      back_to_feed: '返回动态流',
      title: '教会家园',
      subtitle: '分享教区和堂区动态，与全国各地的教友保持工作和信仰互联。',
      new_post_placeholder: '您堂区今天有什么新鲜喜讯要与大家分享？',
      upload_photo: '上传配图',
      posting: '正在发布...',
      publish: '发布动态',
      no_posts: '当前暂无教友圈动态。',
      suggested_parishes: '推荐的堂区',
      visit_profile: '查看堂区主页'
    },
    settings: { identity: '视觉样式设定', avatar_desc: '堂区头像图标', cover_desc: '主页顶部横幅', cover_image: '顶部横幅图片', upload_cover: '上传新横幅' },
    tour: {
      prev: '上一步',
      next: '下一步',
      finish: '完成',
      steps: {
        dashboard: { title: '总览面板', desc: '快速查看您堂区的每日状态简报、日程表安排和教会社区动态。' },
        agenda: { title: '日程表与牧灵活动', desc: '在一个集中的日历中统一安排 and 管理弥撒、牧灵会议及堂区活动。' },
        sacraments: { title: '圣事历史档案', desc: '数秒内数字化登记、编辑和搜索洗礼、婚姻及坚振圣事的官方历史台账。' },
        documents: { title: '开证排版中心', desc: '使用预配置的堂区公文模板，一键生成并导出官方 PDF 证明书。' },
        community: { title: '教会家圈动态', desc: '与全国其他注册堂区保持互联，分享堂区通知并获取最新的教会消息。' },
        messages: { title: '即时会话消息', desc: '直接与其他堂区秘书发起在线对话，或与 Emaús 的售后技术客服人员沟通。' },
        finances: { title: '堂区财务收支', desc: '通过直观且可交互的图表，清晰记录和掌控您堂区的收入、支出及捐献。' },
        support: { title: '技术服务工单', desc: '在线新建售后服务工单，直接与我们的技术支持团队对话解决问题。' }
      }
    }
  },
  hi: {
    sidebar: { dashboard: 'सारांश', agenda: 'कार्यसूची', sacraments: 'संस्कार', documents: 'दस्तावेज़', messages: 'संदेश', finances: 'वित्त', community: 'समुदाय', settings: 'सेटिंग्स', users: 'उपयोगकर्ता और योजनाएँ', support: 'सहायता', leads: 'अनुरोध', logout: 'लॉग आउट', role: 'सचिव', parish: 'पैरिश प्रबंधन' },
    landing: {
      nav: { features: 'विशेषताएं', benefits: 'लाभ', plans: 'योजनाएं', login: 'लॉग इन' },
      hero: { badge: 'पैरिश प्रबंधन 2.0', title_start: 'अपने पैरिश को', title_highlight: 'डिजिटल करें', subtitle: 'Emaús प्रशासनिक व्यवस्था सुधारता है, संस्कार इतिहास की रक्षा करता है और पैरिश सेवा के लिए समय बचाता है।', cta_access: 'प्लेटफ़ॉर्म में प्रवेश करें', cta_plans: 'योजनाएं देखें' },
      mockup: { sacrament: 'संस्कार', record_type: 'बपतिस्मा रिकॉर्ड', label_name: 'नाम', label_date: 'दिनांक', label_book: 'पुस्तक / पृष्ठ', label_parents: 'माता-पिता', badge_db: 'डेटाबेस', status_db: 'डिजिटल रिकॉर्ड सुरक्षित', badge_search: 'खोज', status_search: 'रिकॉर्ड मिला', badge_docs: 'दस्तावेज़', status_docs: 'तैयार', chat_name: 'सिस्टर मारिया', chat_msg: 'भेजा गया' },
      features: { title: 'कार्यालय की आवश्यकताएं', subtitle: 'Emaús चर्च के लिए एक एकीकृत प्लेटफ़ॉर्म के साथ पुराने टूल्स को बदल देता है।', sacraments_title: 'डिजिटल संस्कार', sacraments_desc: 'बपतिस्मा और विवाह का डिजिटल संरक्षण।', docs_title: '1-क्लिक प्रमाणपत्र', docs_desc: 'आधिकारिक प्रमाणपत्रों का स्वचालित सृजन।', agenda_title: 'पैरिश कार्यसूची', agenda_desc: 'साझा कैलेंडर में पैरिश कार्यक्रमों का समन्वय।', chat_title: 'पैरिश चैट', chat_desc: 'चर्च के कार्यालयों के बीच सुरक्षित संवाद।', btn_more: 'अधिक विशेषताएं' },
      plans: { title: 'चर्चों के लिए योजनाएं', subtitle: 'अपने पैरिश के लिए सबसे उपयुक्त विकल्प चुनें।', basic_title: 'बेसिक प्लान', basic_desc: 'छोटे पैरिश के लिए।', adv_title: 'एडवांस्ड प्लान', adv_desc: 'असीमित पैरिश प्रबंधन।', forever: 'महीना', popular: 'अनुशंसित', cta: 'डेमो', feature_agenda: 'पैरिश कैलेंडर', feature_sacraments: 'संस्कार रिकॉर्ड प्रबंधन', feature_certs: 'प्रमाणपत्र जनरेशन', feature_chat: 'पैरिश चैट', feature_editor: 'वर्ड स्टाइल दस्तावेज़ संपादक', feature_finances: 'वित्त मॉड्यूल', feature_basic_all: 'बेसिक योजना की सभी विशेषताएं', feature_reports: 'वित्तीय आंकड़े', feature_support: 'प्राथमिकता सहायता', feature_unlimited: 'असीमित बातचीत' },
      community: { title: 'कभी अकेले काम न करें', card1_title: 'Emaús समुदाय', card1_desc: 'जुड़े हुए सचिव', card2_title: 'त्वरित संवाद', card2_desc: 'पैरिश के बीच विशेष चैट', card3_title: 'दस्तावेज़ साझाकरण', card3_desc: 'फ़ाइलों को तुरंत साझा करें' },
      testimonials: { title: '"Emaús ने हमारे कार्यालय को बदल दिया है"', subtitle: 'अब हम सेकंडों में प्रमाणपत्र देते हैं।', t1_name: 'सिस्टर लूसिया', t1_role: 'सचिव, वालपाराइसो', t1_text: '"अन्य पैरिशों से संपर्क करना आसान है।"', t2_name: 'फादर एंड्रयू', t2_role: 'पास्टर, सैंटियागो', t2_text: '"शादी कैलेंडर बहुत व्यवस्थित रहता है।"', t3_name: 'डीकन कार्लोस', t3_role: 'डीकन, कोन्सेप्सिओन', t3_text: '"मैं फोन पर जानकारी देख सकता हूँ। बहुत व्यावहारिक है।"' },
      footer: { tagline: 'चर्च की सेवा के लिए निर्मित।', dev: 'विकासक' },
      login: { title: 'EMAÚS लॉगिन', subtitle: 'आपका स्वागत है।', email: 'ईमेल पता', password: 'पासवर्ड', btn: 'लॉग इन', error: 'गलत ईमेल या पासवर्ड।' },
      demo: { title: 'डेमो अनुरोध', subtitle: 'जानें कि Emaús पैरिश को कैसे डिजिटल बना सकता है।', name: 'आपका नाम', role: 'पद', parish: 'पैरिश/चर्च', submit: 'अनुरोध भेजें', captcha_error: 'गलत कैप्चा', success_title: 'अनुरोध भेजा गया!', success_msg: 'हम जल्द ही आपसे संपर्क करेंगे।', close: 'बंद करें' }
    },
    dashboard: {
      welcome: 'स्वागत है,',
      welcome_subtitle: 'आपके पैरिश की आज की गतिविधियों का सारांश।',
      tour_card: { title: 'त्वरित गाइड', subtitle: '5 मिनट से कम समय में संस्कार रिकॉर्ड डिजिटल करने और डिजिटल हस्ताक्षर सेट करने का तरीका जानें।', btn: 'गाइड शुरू करें' },
      stats: { baptisms: 'बपतिस्मा', marriages: 'विवाह' },
      community_highlight: 'समुदाय की खबरें',
      no_posts: 'समुदाय का कोई नया संदेश नहीं है।',
      upcoming_events: 'कार्यसूची कार्यक्रम',
      no_events: 'आने वाले दिनों में कोई कार्यक्रम निर्धारित नहीं है।',
      view_full_agenda: 'पूरी कार्यसूची देखें'
    },
    agenda: {
      title: 'पैरिश कार्यसूची',
      new_event: 'नया कार्यक्रम',
      upcoming: 'आगामी कार्यक्रम',
      no_events: 'कोई कार्यक्रम निर्धारित नहीं है।',
      modal: { title: 'कार्यक्रम निर्धारित करें', event_title: 'कार्यक्रम का नाम', date: 'दिनांक', time: 'समय', type: 'गतिविधि प्रकार', location: 'स्थान', cancel: 'रद्द करें', save: 'सुरक्षित करें' }
    },
    sacraments: {
      title: 'संस्कार रिकॉर्ड',
      subtitle: 'डिजिटल संस्कार रिकॉर्ड को खोजें और प्रबंधित करें।',
      new_record: 'नया रिकॉर्ड',
      search_placeholder: 'नाम या आईडी से खोजें...',
      detail: { editing: 'रिकॉर्ड संपादित करें', record_card: 'पैरिश कार्ड', edit: 'संपादित करें', cancel: 'रद्द करें', save: 'सुरक्षित करें', observations: 'टिप्पणियाँ', book_data: 'बही स्थान डेटा', book: 'पुस्तक क्रमांक', page: 'पृष्ठ क्रमांक', parish: 'संबद्ध पैरिश' },
      table: { name: 'नाम', date: 'दिनांक', celebrant: 'पुरोहित', book_page: 'पुस्तक / पृष्ठ', actions: 'कार्रवाई', view_details: 'कार्ड विवरण', no_records: 'संस्कार के रिकॉर्ड नहीं मिले।' },
      types: { Bautizo: 'बपतिस्मा', Confirmación: 'दृढ़ीकरण', Matrimonio: 'विवाह', Defunción: 'अंतिम संस्कार', 'Primera Comunión': 'प्रथम परमप्रसाद' }
    },
    documents: {
      title: 'दस्तावेज़ संपादक',
      new_document: 'नया दस्तावेज़',
      items: 'दस्तावेज़',
      empty_folder: 'यह फ़ोल्डर खाली है।',
      cancel_back: 'रद्द करें और वापस जाएं',
      create_title: 'नया दस्तावेज़ बनाएं',
      create_subtitle: 'आधिकारिक प्रारूप चुनें या रिक्त फ़ाइल से शुरू करें।',
      blank_doc: 'रिक्त दस्तावेज़',
      start_scratch: 'बिना प्रारूप के शुरू करें',
      use_template: 'प्रारूप का प्रयोग करें',
      close: 'बंद करें',
      print: 'प्रिंट / पीडीएफ निर्यात',
      save: 'दस्तावेज़ सुरक्षित करें',
      untitled: 'अनाम दस्तावेज़',
      upsell: { title: 'उन्नत प्रमाणपत्र संपादक', desc: 'एडवांस्ड प्लान बपतिस्मा और विवाह प्रमाणपत्रों को वर्ड स्टाइल एडिटर में एडिट करने की अनुमति देता है।', benefit1: 'आधिकारिक पीडीएफ का स्वचालित निर्माण', benefit2: 'डिजिटल हस्ताक्षर और वॉटरमार्क', cta: 'एडवांस्ड प्लान में अपग्रेड करें' }
    },
    messages: {
      support: 'Emaús तकनीकी सहायता',
      title: 'पैरिश त्वरित संदेश',
      search_placeholder: 'चैट खोजें...',
      empty_state: 'कोई चैट नहीं मिला।',
      type_message: 'संदेश टाइप करें...',
      no_chat_selected: 'एक चैट का चयन करें',
      subtitle: 'अन्य पैरिश कार्यालयों से चैट शुरू करें या तकनीकी सहायता टीम से संपर्क करें।',
      start_chat: 'नया चैट शुरू करें',
      directory: { title: 'पैरिश निर्देशिका', subtitle: 'पंजीकृत चर्चों को खोजें और उनसे संपर्क करें।', search: 'चर्च या शहर से खोजें...', start_conversation: 'संदेश भेजें' }
    },
    finances: {
      title: 'वित्तीय मॉड्यूल',
      subtitle: 'पैरिश की आय, व्यय और दान को व्यवस्थित तरीके से प्रबंधित करें।',
      stats: { balance: 'कुल शेष', income: 'मासिक आय', expenses: 'मासिक व्यय', savings_rate: 'बचत दर' },
      table: { header_date: 'दिनांक', header_desc: 'विवरण', header_cat: 'खाता श्रेणी', header_method: 'भुगतान विधि', header_amount: 'राशि', header_actions: 'कार्रवाई', income: 'आय', expense: 'व्यय' },
      search_placeholder: 'विवरण द्वारा खोजें...',
      filter: { all: 'सभी लेन-देन', income: 'आय', expense: 'व्यय' },
      btn_add: 'नया लेनदेन दर्ज करें',
      chart_title: 'वित्तीय प्रवृत्ति',
      chart_income: 'आय',
      chart_expenses: 'व्यय',
      modal: { title_add: 'लेनदेन पंजीकृत करें', date: 'दिनांक', type: 'प्रकार', type_income: 'आय', type_expense: 'व्यय', category: 'खाता श्रेणी', amount: 'राशि', description: 'विवरण', payment_method: 'भुगतान विधि', cancel: 'रद्द करें', save: 'सुरक्षित करें' },
      calculator: { title: 'पंजीकृत कैलकुलेटर', clear: 'साफ़ करें', use_amount: 'राशि डालें' },
      upsell: { title: 'वित्तीय लेखांकन प्रणाली', desc: 'एडवांस्ड प्लान में पैरिश बहीखाता टूल्स और收支 तुलनात्मक चार्ट शामिल हैं।', benefit1: 'मासिक आय-व्यय तुलना चार्ट', benefit2: 'डिजिटल सहायक रोकड़ बही', cta: 'एडवांस्ड प्लान में अपग्रेड करें' }
    },
    leads: {
      title: 'डेमो अनुरोध',
      subtitle: 'सिस्टम में शामिल होने के इच्छुक चर्चों के अनुरोध प्रबंधित करें।',
      table: { name: 'संपर्क / भूमिका', parish: 'पैरिश / सूबा', status: 'स्थिति', date: 'पंजीकरण दिनांक', actions: 'कार्रवाई' },
      status: { new: 'नया', contacted: 'संपर्क किया गया', demo_scheduled: 'डेमो निर्धारित', closed: 'सफल', lost: 'असफल' }
    },
    users: {
      title: 'उपयोगकर्ता प्रबंधन',
      subtitle: 'पंजीकृत चर्चों के लॉगिन ईमेल और प्लान प्रबंधित करें।',
      create_user: 'पैरिश खाता बनाएं',
      search_placeholder: 'ईमेल से खोजें...',
      table: { email: 'लॉगिन ईमेल', parish: 'पैरिश का नाम', city: 'शहर / सूबा', plan: 'सक्रिय प्लान', actions: 'कार्रवाई' },
      actions: { edit_plan: 'प्लान बदलें', reset_pass: 'पासवर्ड रीसेट लिंक भेजें' },
      modal: { create_title: 'नया पैरिश पंजीकृत करें', email: 'ईमेल पता', password: 'अस्थायी पासवर्ड', plan: 'प्रारंभिक प्लान', create: 'खाता बनाएं', edit_plan_title: 'प्लान संपादित करें', save: 'सुरक्षित करें' }
    },
    support: {
      title: 'तकनीकी सहायता',
      subtitle: 'सिस्टम में त्रुटियों की रिपोर्ट सीधे Emaús सहायता टीम को भेजें।',
      status: { open: 'खुला', in_progress: 'कार्य जारी', resolved: 'समाधान किया गया', closed: 'बंद' },
      admin_dashboard: 'सहायता कंसोल',
      create_ticket: 'नया टिकट बनाएं',
      chat: { placeholder: 'उत्तर लिखें...' },
      form: { subject: 'विषय', subject_ph: 'जैसे: प्रमाणपत्र प्रिंटिंग समस्या', priority: 'प्राथमिकता', desc: 'समस्या का विवरण', desc_ph: 'अनुभव की जा रही समस्या का विवरण दें...', attach: 'अनुलग्नक या स्क्रीनशॉट जोड़ें', max_size: 'अधिकतम आकार: 5MB', cancel: 'रद्द करें', submit: 'टिकट बनाएं' }
    },
    community: {
      comments: 'टिप्पणियाँ',
      write_comment: 'एक टिप्पणी लिखें...',
      back_to_feed: 'फ़ीड पर वापस जाएं',
      title: 'चर्च जीवन',
      subtitle: 'खबरें साझा करें और देश भर के अन्य सचिवों से जुड़ें।',
      new_post_placeholder: 'आज पैरिश में क्या नई खबर है?',
      upload_photo: 'फोटो अपलोड करें',
      posting: 'पोस्ट कर रहा है...',
      publish: 'प्रकाशित करें',
      no_posts: 'इस समय कोई संदेश नहीं है।',
      suggested_parishes: 'अनुशंसित पैरिश',
      visit_profile: 'प्रोफ़ाइल देखें'
    },
    settings: { identity: 'दृश्य पहचान', avatar_desc: 'प्रोफ़ाइल आइकन', cover_desc: 'कवर छवि', cover_image: 'कवर छवि', upload_cover: 'कवर छवि अपलोड करें' },
    tour: {
      prev: 'पिछला',
      next: 'अगला',
      finish: 'समाप्त',
      steps: {
        dashboard: { title: 'सामान्य सारांश', desc: 'आपके पैरिश की दैनिक स्थिति, कैलेंडर कार्यक्रमों और समुदाय के समाचारों का त्वरित विवरण।' },
        agenda: { title: 'कैलेंडर और गतिविधियां', desc: 'साझा कैलेंडर में पैरिश मिसा, बैठकों और कार्यक्रमों को केंद्रीय रूप से निर्धारित और प्रबंधित करें।' },
        sacraments: { title: 'संस्कार रिकॉर्ड', desc: 'बपतिस्मा, विवाह और दृढ़ीकरण के आधिकारिक रिकॉर्डों को कुछ ही सेकंड में डिजिटल, संपादित और खोजें।' },
        documents: { title: 'प्रमाणपत्र संपादक', desc: 'पूर्व-कॉन्फ़िगर की गई पैरिश शैली का उपयोग करके आधिकारिक पीडीएफ प्रमाणपत्र जनरेट करें।' },
        community: { title: 'समुदाय और फीड', desc: 'देश भर के अन्य पैरिश कार्यालयों से जुड़ें, सूचनाएं साझा करें और समाचार जानें।' },
        messages: { title: 'त्वरित संदेश', desc: 'अन्य पैरिशों से सीधे संपर्क करें या Emaús तकनीकी सहायता टीम से चैट करें।' },
        finances: { title: 'वित्तीय मॉड्यूल', desc: 'इंटरैक्टिव चार्ट की मदद से पैरिश की आय, व्यय और दान को व्यवस्थित रूप से प्रबंधित करें।' },
        support: { title: 'तकनीकी सहायता', desc: 'समर्थन टिकट बनाएं और प्रश्नों को हल करने के लिए हमारी तकनीकी टीम से संपर्क करें।' }
      }
    }
  }
};
