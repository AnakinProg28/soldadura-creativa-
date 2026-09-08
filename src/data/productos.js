// ========================================================
// CATÁLOGO DE PRODUCTOS - SOLDADURA CREATIVA
// 5 Categorías, 8 Productos de Soldadura Artística en cada una
// ========================================================

export const CATEGORIAS = [
  {
    id: 'enamorados',
    slug: 'enamorados',
    nombre: 'Enamorados',
    icono: '❤️',
    subtitulo: 'Regalos y detalles eternos forjados en metal',
    descripcion: 'Piezas artesanales creadas para simbolizar un amor inquebrantable. Forjadas a fuego lento con detalles florales, corazones entrelazados y acabados brillantes protegidos contra la corrosión.',
    imagen: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=800&fit=crop&q=80'
  },
  {
    id: 'cumpleanos',
    slug: 'cumpleanos',
    nombre: 'Cumpleaños',
    icono: '🎉',
    subtitulo: 'Celebraciones y homenajes únicos en acero',
    descripcion: 'Sorprende con obsequios divertidos, esculturas temáticas de pasatiempos, porta botellas y trofeos forjados a mano con tuercas, tornillos y soldadura de precisión.',
    imagen: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=800&fit=crop&q=80'
  },
  {
    id: 'decorativo',
    slug: 'decorativo',
    nombre: 'Decorativo',
    icono: '🏠',
    subtitulo: 'Diseño industrial y calidez para tus espacios',
    descripcion: 'Lámparas vintage estilo Edison, relojes murales esqueleto, centros de mesa y repisas geométricas diseñadas para transformar salas, comedores y oficinas con estilo industrial contemporáneo.',
    imagen: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop&q=80'
  },
  {
    id: 'artistico',
    slug: 'artistico',
    nombre: 'Artístico',
    icono: '⚡',
    subtitulo: 'Esculturas y piezas abstractas al calor del arco',
    descripcion: 'Obras de arte exclusivas que exploran las formas orgánicas, figuras míticas y el poder del metal fusionado. Piezas tridimensionales pulidas con acabados térmicos irisados únicos.',
    imagen: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&h=800&fit=crop&q=80'
  },
  {
    id: 'personalizados',
    slug: 'personalizados',
    nombre: 'Personalizados',
    icono: '🛠️',
    subtitulo: 'Tu visión forjada a medida con maestría',
    descripcion: 'Diseñamos y fabricamos exactamente lo que imaginas: letreros calados con nombres o logos comerciales, siluetas de mascotas, bases de mesas y placas decorativas a medida.',
    imagen: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=800&fit=crop&q=80'
  }
]

export const PRODUCTOS_POR_CATEGORIA = {
  enamorados: [
    {
      id: 'enam-1',
      nombre: 'Rosa Forjada "Amor Eterno"',
      precio: 38.00,
      imagen: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800&h=800&fit=crop&q=80',
      descripcion: 'Rosa esculpida y forjada 100% a mano en chapa de acero de calibre pesado. Pétalos moldeados individualmente a fuego con tallo espinado y acabado en cobre pulido con laca anticorrosiva transparente. Un regalo que nunca se marchita.',
      detalles: 'Material: Acero al carbón y baño de cobre | Altura: 32 cm | Peso: 480 g'
    },
    {
      id: 'enam-2',
      nombre: 'Corazones Entrelazados en Acero',
      precio: 34.50,
      imagen: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=800&fit=crop&q=80',
      descripcion: 'Dos corazones en varilla lisa forjados y fusionados con soldadura TIG dorada. Montados sobre una base de madera maciza tratada con acabado rústico. Representa la unión y fortaleza de una pareja.',
      detalles: 'Material: Varilla de hierro pulido y madera de pino curada | Dimensiones: 22 x 18 cm'
    },
    {
      id: 'enam-3',
      nombre: 'Escultura Pareja en Silueta',
      precio: 49.00,
      imagen: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=800&fit=crop&q=80',
      descripcion: 'Elegante figura abstracta de dos personas abrazadas, forjada a partir de pletinas de hierro torsionadas a mano. Un diseño minimalista y sumamente emotivo ideal para repisas y mesas de noche.',
      detalles: 'Material: Pletina forjada con acabado negro mate y barniz satinado | Altura: 26 cm'
    },
    {
      id: 'enam-4',
      nombre: 'Cuadro Calado "Infinito Amor"',
      precio: 42.00,
      imagen: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&h=800&fit=crop&q=80',
      descripcion: 'Panel de pared en chapa de acero con símbolo del infinito entrelazado con corazones y flores en corte de precisión con arco de plasma. Incluye separadores traseros para generar sombra tridimensional.',
      detalles: 'Material: Placa de acero de 2 mm | Medidas: 45 x 25 cm | Listo para colgar'
    },
    {
      id: 'enam-5',
      nombre: 'Ramo de 3 Rosas Forjadas',
      precio: 89.00,
      imagen: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=800&fit=crop&q=80',
      descripcion: 'Trío de rosas en diferentes etapas de floración (botón, semi-abierta y abierta). Hojas texturizadas con cincel y unidas con cordón de soldadura invisible en base de hierro forjado con forma de cinta metálica.',
      detalles: 'Material: Acero dulce y toques dorados al calor | Altura: 35 cm | Base incluida'
    },
    {
      id: 'enam-6',
      nombre: 'Llaveros Dúo de Engranajes',
      precio: 18.00,
      imagen: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop&q=80',
      descripcion: 'Juego de dos llaveros con engranajes artesanales que encajan perfectamente el uno en el otro. Pulidos a espejo con eslabón de acero inoxidable de alta durabilidad.',
      detalles: 'Material: Acero templado pulido y aros de alta resistencia | Medidas: 4 x 3 cm c/u'
    },
    {
      id: 'enam-7',
      nombre: 'Porta Velas Corazón de Hierro',
      precio: 28.50,
      imagen: 'https://images.unsplash.com/photo-1588195538326-c5b1e6f3d4d2?w=800&h=800&fit=crop&q=80',
      descripcion: 'Candelabro en forma de corazón con soporte para vela aromática o veladora. La llama de la vela proyecta una cálida silueta romántica sobre la pared gracias a su diseño curvado.',
      detalles: 'Material: Varilla redonda forjada | Altura: 20 cm | Apto para velas estándar'
    },
    {
      id: 'enam-8',
      nombre: 'Placa Conmemorativa Aniversario',
      precio: 52.00,
      imagen: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=800&h=800&fit=crop&q=80',
      descripcion: 'Placa conmemorativa de mesa o pared con fecha y nombres calados o grabados con cordón de soldadura decorativo en los bordes. Perfecta para celebrar aniversarios de plata, bodas o noviazgos.',
      detalles: 'Material: Acero inoxidable y base de hierro negro | Medidas: 25 x 15 cm'
    }
  ],

  cumpleanos: [
    {
      id: 'cump-1',
      nombre: 'Porta Botellas Herrero',
      precio: 45.00,
      imagen: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=800&fit=crop&q=80',
      descripcion: 'Escultura funcional que representa a un artesano soldador sosteniendo con orgullo tu botella favorita de vino, licor o mezcal. Fabricado con tuercas, tornillos y varillas unidas con soldadura MIG.',
      detalles: 'Material: Piezas de acero reciclado y tuercas | Capacidad: Botella estándar de 750 ml'
    },
    {
      id: 'cump-2',
      nombre: 'Figura Músico / Guitarrista',
      precio: 39.00,
      imagen: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=800&fit=crop&q=80',
      descripcion: 'Figura artística en metal de un guitarrista en pleno concierto. Cuerpo construido con rodamientos y bujías, sosteniendo una mini guitarra soldada con cuerdas de alambre acerado.',
      detalles: 'Material: Tuercas, bujías y alambre de acero | Altura: 21 cm | Acabado brillante'
    },
    {
      id: 'cump-3',
      nombre: 'Trofeo Copa de Metal Forjado',
      precio: 55.00,
      imagen: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&h=800&fit=crop&q=80',
      descripcion: 'Copa trofeo de aniversario y celebración de cumpleaños forjada en chapa con asas retorcidas. Permite colocar una placa frontal personalizada para homenajear al festejado.',
      detalles: 'Material: Acero laminado y base de hierro fundido | Altura: 28 cm'
    },
    {
      id: 'cump-4',
      nombre: 'Motocicleta Chopper en Tuercas',
      precio: 48.00,
      imagen: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=800&fit=crop&q=80',
      descripcion: 'Increíble maqueta coleccionable de motocicleta tipo chopper fabricada meticulosamente con rodamientos para las ruedas, bujías de motor, cadenas de transmisión y tuercas hexagonales.',
      detalles: 'Material: 100% piezas mecánicas de acero soldadas | Largo: 24 cm | Peso: 750 g'
    },
    {
      id: 'cump-5',
      nombre: 'Juego de Porta Vasos Geométricos',
      precio: 32.00,
      imagen: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&h=800&fit=crop&q=80',
      descripcion: 'Set de 4 portavasos circulares en chapa de acero con calados geométricos y base protectora de corcho para no rayar superficies. Incluye soporte organizador en varilla soldada.',
      detalles: 'Material: Acero y corcho natural | Diámetro: 10 cm | Set de 4 piezas con soporte'
    },
    {
      id: 'cump-6',
      nombre: 'Escultura Ciclista en Cadena',
      precio: 38.00,
      imagen: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=800&fit=crop&q=80',
      descripcion: 'Divertida y detallada escultura de un ciclista en ruta elaborada con eslabones de cadena de bicicleta, tuercas y varilla delgada. El regalo soñado para amantes del deporte y ciclismo.',
      detalles: 'Material: Cadena de acero y tornillería | Dimensiones: 19 x 14 cm'
    },
    {
      id: 'cump-7',
      nombre: 'Destapador Herrado a Mano',
      precio: 22.00,
      imagen: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=800&h=800&fit=crop&q=80',
      descripcion: 'Destapador rústico pesado forjado al yunque con punta templada para apertura instantánea de botellas. Mango con torsión artesanal y orificio para colgar en barras o cocinas.',
      detalles: 'Material: Hierro macizo forjado a golpe de martillo | Largo: 16 cm | Irrompible'
    },
    {
      id: 'cump-8',
      nombre: 'Soporte Botanas y Dulces Industrial',
      precio: 46.00,
      imagen: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=800&fit=crop&q=80',
      descripcion: 'Centro de mesa organizador de 3 niveles con aros de acero soldado para cuencos de snacks y aperitivos. Ideal para fiestas, parrilladas y reuniones con amigos.',
      detalles: 'Material: Varilla de 6 mm con recubrimiento de pintura electrostática | Altura: 30 cm'
    }
  ],

  decorativo: [
    {
      id: 'deco-1',
      nombre: 'Lámpara Geométrica Industrial',
      precio: 58.00,
      imagen: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop&q=80',
      descripcion: 'Lámpara de mesa con estructura icosaédrica en varilla de hierro pulido. Incluye socket vintage de latón envejecido, cable textil trenzado café y foco Edison ámbar de filamento expuesto.',
      detalles: 'Material: Hierro, latón y socket E27 | Foco Edison incluido | Medidas: 24 x 24 cm'
    },
    {
      id: 'deco-2',
      nombre: 'Reloj Mural Esqueleto de Acero',
      precio: 72.00,
      imagen: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&h=800&fit=crop&q=80',
      descripcion: 'Reloj de pared monumental de 50 cm de diámetro con aro de hierro forjado y números romanos cortados y soldados con suma precisión. Maquinaria de cuarzo alemana silenciosa (sin tic-tac).',
      detalles: 'Material: Aro de acero macizo y manecillas metálicas | Diámetro: 50 cm | Silencioso'
    },
    {
      id: 'deco-3',
      nombre: 'Estante Flotante Piramidal',
      precio: 64.00,
      imagen: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop&q=80',
      descripcion: 'Repisa decorativa de pared con estructura piramidal en ángulo de acero negro y 2 niveles de madera maciza barnizada. Perfecta para plantas suculentas, libros y figuras decorativas.',
      detalles: 'Material: Ángulo de hierro soldado y madera de pino | Medidas: 55 x 45 x 15 cm'
    },
    {
      id: 'deco-4',
      nombre: 'Espejo Circular con Marco Forjado',
      precio: 85.00,
      imagen: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=800&fit=crop&q=80',
      descripcion: 'Espejo redondo con marco perimetral de chapa gruesa martillada en los bordes y soldada con detalles de remaches industriales expuestos. Una pieza protagónica para entradas o baños.',
      detalles: 'Material: Marco de acero texturizado y cristal de 4 mm | Diámetro exterior: 60 cm'
    },
    {
      id: 'deco-5',
      nombre: 'Centro de Mesa Hoja de Metal',
      precio: 39.50,
      imagen: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=800&h=800&fit=crop&q=80',
      descripcion: 'Bandeja decorativa en forma de hoja de monstera o palma calada en placa de acero y moldeada con curvatura suave para contener frutas, llaves o elementos secos aromáticos.',
      detalles: 'Material: Chapa de acero con acabado bronce antiguo | Medidas: 42 x 22 cm'
    },
    {
      id: 'deco-6',
      nombre: 'Perchero con Llaves Vintage',
      precio: 35.00,
      imagen: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=800&h=800&fit=crop&q=80',
      descripcion: 'Perchero de pared estilo taller mecánico con 5 ganchos fabricados doblando llaves españolas e inglesas antiguas soldadas sobre riel de acero con acabado pavonado.',
      detalles: 'Material: Llaves mecánicas de cromo-vanadio y pletina | Largo: 50 cm | 5 ganchos'
    },
    {
      id: 'deco-7',
      nombre: 'Macetero Colgante Hexagonal',
      precio: 29.00,
      imagen: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=800&fit=crop&q=80',
      descripcion: 'Estructura geométrica hexagonal en varilla de 4 mm soldada para colgar del techo o repisas. Permite insertar macetas pequeñas para helechos o enredaderas.',
      detalles: 'Material: Varilla de acero electrosoldada y cadena de eslabones | Altura: 38 cm'
    },
    {
      id: 'deco-8',
      nombre: 'Escultura Árbol de la Vida',
      precio: 78.00,
      imagen: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=800&fit=crop&q=80',
      descripcion: 'Cuadro mural redondo con la silueta del árbol de la vida forjado en alambres de hierro torsionados para formar el tronco, raíces y ramas con hojas en relieve tridimensional.',
      detalles: 'Material: Alambre acerado, chapa y aro exterior | Diámetro: 48 cm | Acabado óxido sellado'
    }
  ],

  artistico: [
    {
      id: 'art-1',
      nombre: 'Escultura "Espíritu de Fuego"',
      precio: 95.00,
      imagen: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&h=800&fit=crop&q=80',
      descripcion: 'Obra abstracta que evoca la llamarada y la fuerza de la creación. Láminas de acero moldeadas en espiral ascendente con gradientes térmicos en azul, ámbar y púrpura generados con soplete.',
      detalles: 'Material: Acero al carbón con coloración térmica natural y laca brillante | Altura: 45 cm'
    },
    {
      id: 'art-2',
      nombre: 'Ave Fénix en Chapa Soldada',
      precio: 120.00,
      imagen: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=800&fit=crop&q=80',
      descripcion: 'Escultura monumental de un fénix alzando el vuelo. Alas construidas con más de 80 plumas de acero recortadas y soldadas capa por capa sobre base de piedra volcánica.',
      detalles: 'Material: Acero templado y base de piedra volcánica | Envergadura: 52 cm | Peso: 3.2 kg'
    },
    {
      id: 'art-3',
      nombre: 'Águila en Acero Inoxidable',
      precio: 135.00,
      imagen: 'https://images.unsplash.com/photo-1548637528-0debfe64a894?w=800&h=800&fit=crop&q=80',
      descripcion: 'Cabeza de águila de diseño poligonal faceteado en acero inoxidable 304 pulido a espejo. Los reflejos geométricos crean un impacto visual asombroso bajo cualquier iluminación.',
      detalles: 'Material: Acero inoxidable 304 de 1.5 mm | Dimensiones: 34 x 28 x 25 cm'
    },
    {
      id: 'art-4',
      nombre: 'Panel Tridimensional "Olas de Acero"',
      precio: 88.00,
      imagen: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&h=800&fit=crop&q=80',
      descripcion: 'Mural de pared con cintas metálicas onduladas superpuestas que generan la ilusión de olas de agua o viento en movimiento constante. Acabado cepillado con reflejo direccional.',
      detalles: 'Material: Flejes de acero dulce y marco tubular | Medidas: 70 x 35 cm'
    },
    {
      id: 'art-5',
      nombre: 'Máscara Teatral Forjada al Fuego',
      precio: 68.00,
      imagen: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=800&h=800&fit=crop&q=80',
      descripcion: 'Máscara de expresión artística forjada a martillo al rojo vivo sobre yunque. La textura muestra el grano del impacto y el enfriamiento del metal, convirtiéndola en una pieza de galería.',
      detalles: 'Material: Chapa de 3 mm forjada a mano | Altura: 28 cm | Montada en pedestal de hierro'
    },
    {
      id: 'art-6',
      nombre: 'Mecanismo Cósmico de Engranajes',
      precio: 82.00,
      imagen: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=800&fit=crop&q=80',
      descripcion: 'Escultura steampunk cinética que ensambla piñones de cajas de cambios, cadenas de distribución y esferas de rodamientos en una estructura concéntrica que gira suavemente con la mano.',
      detalles: 'Material: Engranajes automotrices recuperados y pulidos | Diámetro: 30 cm'
    },
    {
      id: 'art-7',
      nombre: 'Escultura Toro Bravo en Varilla',
      precio: 110.00,
      imagen: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=800&fit=crop&q=80',
      descripcion: 'Figura dinámica de un toro en posición de embestida trazada mediante líneas de varilla corrugada y lisa entrelazadas. Capta toda la musculatura, tensión y energía del animal.',
      detalles: 'Material: Varilla texturizada soldada con TIG | Largo: 42 cm | Peso: 2.8 kg'
    },
    {
      id: 'art-8',
      nombre: 'Esfera Armilar Cósmica',
      precio: 75.00,
      imagen: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&h=800&fit=crop&q=80',
      descripcion: 'Esfera armilar astronómica decorativa con aros de acero concéntricos que pivotan sobre un eje central inclinado con flecha forjada a mano. Evoca la navegación clásica y la ciencia antigua.',
      detalles: 'Material: Aros de pletina de acero y bola central de bronce | Altura: 36 cm'
    }
  ],

  personalizados: [
    {
      id: 'pers-1',
      nombre: 'Letrero Calado de Apellido o Negocio',
      precio: 65.00,
      imagen: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=800&h=800&fit=crop&q=80',
      descripcion: 'Placa de acero cortada y soldada a medida con tu apellido familiar, monograma o nombre comercial. Acabado con pintura electrostática para exterior garantizada contra lluvia y sol.',
      detalles: 'Material: Chapa de 2.5 mm | Medidas estándar: 60 x 30 cm (personalizables) | Anclajes incluidos'
    },
    {
      id: 'pers-2',
      nombre: 'Soporte Celular / Tablet de Taller',
      precio: 29.50,
      imagen: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop&q=80',
      descripcion: 'Soporte de escritorio ultra resistente hecho con tuercas gigantes de maquinaria y varilla doblada a 60 grados. Con ranura para cable de carga y almohadillas de goma antideslizantes.',
      detalles: 'Material: Tuercas pesadas de 1 pulgada y acero | Apto para celulares y tablets de hasta 11"'
    },
    {
      id: 'pers-3',
      nombre: 'Silueta de Mascota Personalizada',
      precio: 45.00,
      imagen: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=800&fit=crop&q=80',
      descripcion: 'Fabricamos la silueta exacta de tu perro, gato u otra mascota a partir de una fotografía real que nos envíes. Base de apoyo de metal para escritorio o perforaciones para muro.',
      detalles: 'Material: Acero al carbono de 2 mm | Altura: 25 cm | Diseño 100% fiel a tu fotografía'
    },
    {
      id: 'pers-4',
      nombre: 'Logotipo Corporativo en Relieve',
      precio: 125.00,
      imagen: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=800&fit=crop&q=80',
      descripcion: 'Logotipo de tu empresa o marca en múltiples capas de acero para dar un efecto tridimensional premium. Ideal para recepciones, oficinas, estudios y talleres que buscan proyectar solidez.',
      detalles: 'Material: Multicapa de acero con acabados combinados | Medidas: 70 x 50 cm aprox.'
    },
    {
      id: 'pers-5',
      nombre: 'Rótulo con Luz LED Trasera',
      precio: 110.00,
      imagen: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop&q=80',
      descripcion: 'Placa de acero calada con caja trasera que aloja tira LED de luz cálida o multicolor. Al encenderse, la luz baña las letras y la pared generando un efecto visual impactante de noche.',
      detalles: 'Material: Acero calibre 18 y sistema LED de 12V con adaptador incluido | Medidas: 50 x 25 cm'
    },
    {
      id: 'pers-6',
      nombre: 'Porta Llaves de Pared con Nombre',
      precio: 36.00,
      imagen: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=800&h=800&fit=crop&q=80',
      descripcion: 'Organizador de llaves de entrada para el hogar con silueta de casa, árbol o auto y tu apellido grabado. Cuenta con 5 ganchos soldados resistentes para llaves y correas de mascotas.',
      detalles: 'Material: Acero al carbono con 5 ganchos soldados | Medidas: 32 x 18 cm'
    },
    {
      id: 'pers-7',
      nombre: 'Asador Plegable Portátil a Medida',
      precio: 145.00,
      imagen: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=800&fit=crop&q=80',
      descripcion: 'Parrilla asador desmontable tipo maletín fabricada en chapa de 3 mm reforzada con ángulo. Se arma y desarma en menos de 1 minuto sin tornillos, ideal para camping y días de campo.',
      detalles: 'Material: Acero negro resistente a altas temperaturas | Parrilla de 50 x 35 cm'
    },
    {
      id: 'pers-8',
      nombre: 'Base Geométrica para Mesa',
      precio: 160.00,
      imagen: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&h=800&fit=crop&q=80',
      descripcion: 'Estructura o patas de mesa en perfil cuadrado de acero soldado con geometría en cruz o trapezoidal. Lista con orificios avellanados para instalar cubiertas de madera o cristal.',
      detalles: 'Material: Perfil tubular estructural de 2 pulgadas | Medidas a petición del cliente'
    }
  ]
}
