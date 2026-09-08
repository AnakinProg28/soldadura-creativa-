import { useState, useEffect } from 'react'
import './App.css'
import { CATEGORIAS, PRODUCTOS_POR_CATEGORIA } from './data/productos'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [carrito, setCarrito] = useState(() => {
    try {
      const saved = localStorage.getItem('soldadura_carrito')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Ruta / Vista actual: 'inicio' o slug de categoría ('enamorados', 'cumpleanos', 'decorativo', 'artistico', 'personalizados')
  const [rutaActual, setRutaActual] = useState(() => {
    const hash = window.location.hash
    if (hash.startsWith('#/categoria/')) {
      const slug = hash.replace('#/categoria/', '')
      if (PRODUCTOS_POR_CATEGORIA[slug]) return slug
    }
    return 'inicio'
  })

  // Producto seleccionado para la vista ampliada (Modal / Lightbox)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [cantidadModal, setCantidadModal] = useState(1)
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false)

  const [toastMessage, setToastMessage] = useState(null)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  // Cerrar menú desplegable al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.categories-dropdown-container')) {
        setCategoriesDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Escuchar cambios de hash para navegación suave y botones atrás/adelante del navegador
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith('#/categoria/')) {
        const slug = hash.replace('#/categoria/', '')
        if (PRODUCTOS_POR_CATEGORIA[slug]) {
          setRutaActual(slug)
          window.scrollTo({ top: 0, behavior: 'smooth' })
          return
        }
      }
      setRutaActual('inicio')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Persistir carrito en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('soldadura_carrito', JSON.stringify(carrito))
    } catch (e) {
      console.error(e)
    }
  }, [carrito])

  // Temporizador para ocultar Toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null)
      }, 3200)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  // Cerrar modal o desplegables con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (productoSeleccionado) setProductoSeleccionado(null)
        if (cartOpen) setCartOpen(false)
        if (menuOpen) setMenuOpen(false)
        if (categoriesDropdownOpen) setCategoriesDropdownOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [productoSeleccionado, cartOpen, menuOpen, categoriesDropdownOpen])

  // Navegar a una categoría o al inicio
  const navegarA = (slug) => {
    setMenuOpen(false)
    setCategoriesDropdownOpen(false)
    if (slug === 'inicio') {
      window.location.hash = '#inicio'
      setRutaActual('inicio')
    } else {
      window.location.hash = `#/categoria/${slug}`
      setRutaActual(slug)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Abrir modal de producto
  const abrirProducto = (producto) => {
    setProductoSeleccionado(producto)
    setCantidadModal(1)
  }

  // Agregar al carrito (desde tarjeta o desde modal)
  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id)
      if (existe) {
        return prev.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        )
      }
      return [...prev, { ...producto, cantidad }]
    })
    setToastMessage(`¡"${producto.nombre}" agregado al carrito! (${cantidad})`)
  }

  // Modificar cantidad en el carrito
  const cambiarCantidadCarrito = (id, delta) => {
    setCarrito(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const nuevaCantidad = item.cantidad + delta
            return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null
          }
          return item
        })
        .filter(Boolean)
    })
  }

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id))
  }

  const vaciarCarrito = () => {
    if (window.confirm('¿Deseas vaciar todo el carrito?')) {
      setCarrito([])
    }
  }

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

  // Enviar pedido a WhatsApp
  const handleCheckoutWhatsApp = () => {
    if (carrito.length === 0) return

    let mensaje = `👋 ¡Hola Soldadura Creativa! Deseo realizar el siguiente pedido:%0A%0A`
    carrito.forEach((item, index) => {
      mensaje += `${index + 1}. *${item.nombre}* x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}%0A`
    })
    mensaje += `%0A💰 *Total estimado:* $${subtotal.toFixed(2)}%0A`
    mensaje += `%0AQuedo atento/a para coordinar pago y entrega. ¡Muchas gracias!`

    const urlWhatsApp = `https://wa.me/5215555555555?text=${mensaje}`
    window.open(urlWhatsApp, '_blank')
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactSubmitted(true)
    setTimeout(() => setContactSubmitted(false), 5000)
    e.target.reset()
  }

  // Categoría activa si estamos en página de categoría
  const categoriaActual = CATEGORIAS.find(c => c.slug === rutaActual)
  const productosDeLaPagina = rutaActual !== 'inicio' ? PRODUCTOS_POR_CATEGORIA[rutaActual] || [] : []

  return (
    <div className="app-wrapper">
      {/* Notificación Toast Flotante */}
      {toastMessage && (
        <div className="toast-notification">
          <span className="toast-icon">⚡</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-container">
          <div 
            className="brand-logo" 
            onClick={() => navegarA('inicio')} 
            style={{ cursor: 'pointer' }}
          >
            <div className="brand-symbol">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-name">SOLDADURA</span>
              <span className="brand-accent">CREATIVA</span>
            </div>
          </div>

          {/* Menú de Navegación */}
          <nav className={`nav-menu ${menuOpen ? 'nav-menu-open' : ''}`}>
            <ul className="nav-links">
              <li>
                <button
                  className={`nav-link-btn ${rutaActual === 'inicio' ? 'active' : ''}`}
                  onClick={() => navegarA('inicio')}
                >
                  Inicio
                </button>
              </li>

              {/* Botón desplegable de Categorías: Solo un Icono */}
              <li className="categories-dropdown-container">
                <button
                  className={`category-icon-dropdown-btn ${rutaActual !== 'inicio' ? 'active' : ''} ${categoriesDropdownOpen ? 'open' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCategoriesDropdownOpen(!categoriesDropdownOpen)
                  }}
                  aria-label="Ver menú de categorías"
                  title="Categorías"
                >
                  {/* Icono de cuadrícula de colecciones / categorías */}
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                    <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                    <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                    <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                  </svg>
                  <span className="dropdown-caret-arrow">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>

                {/* Menú Desplegable con las 5 categorías */}
                {categoriesDropdownOpen && (
                  <div className="category-dropdown-popup" onClick={(e) => e.stopPropagation()}>
                    <div className="dropdown-popup-header">
                      <span>Categorías de Soldadura</span>
                    </div>
                    <div className="dropdown-items-list">
                      {CATEGORIAS.map((cat) => (
                        <button
                          key={cat.slug}
                          className={`dropdown-cat-option ${rutaActual === cat.slug ? 'selected' : ''}`}
                          onClick={() => {
                            navegarA(cat.slug)
                            setCategoriesDropdownOpen(false)
                          }}
                        >
                          <span className="dropdown-cat-icon">{cat.icono}</span>
                          <div className="dropdown-cat-details">
                            <span className="dropdown-cat-title">{cat.nombre}</span>
                            <span className="dropdown-cat-count">8 piezas de forja</span>
                          </div>
                          {rutaActual === cat.slug && (
                            <span className="dropdown-cat-check">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              {rutaActual === 'inicio' && (
                <>
                  <li>
                    <a href="#nosotros" className="nav-link" onClick={() => setMenuOpen(false)}>
                      Sobre Nosotros
                    </a>
                  </li>
                  <li>
                    <a href="#contacto" className="nav-link" onClick={() => setMenuOpen(false)}>
                      Contacto
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Acciones del Navbar */}
          <div className="navbar-actions">
            <button
              className="cart-toggle-btn"
              onClick={() => setCartOpen(true)}
              aria-label="Abrir carrito de compras"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-badge">{totalItems}</span>
            </button>

            <button
              className={`hamburger-btn ${menuOpen ? 'hamburger-active' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          VISTA 1: PÁGINA DE INICIO
          ======================================================== */}
      {rutaActual === 'inicio' ? (
        <main className="main-content">
          {/* Hero Section */}
          <section id="inicio" className="hero-section">
            <div className="hero-backdrop"></div>
            <div className="hero-spark-glow"></div>
            <div className="container hero-container">
              <div className="hero-badge">
                <span className="spark-dot"></span>
                Taller Artesanal de Metal & Herrería Artística
              </div>
              <h1 className="hero-main-title">
                El Arte del Metal Hecho a Mano en <span className="text-gradient">Soldadura Creativa</span>
              </h1>
              <p className="hero-description">
                Transformamos el acero frío y el fuego en regalos eternos, esculturas artísticas y piezas decorativas personalizadas hechas 100% a mano.
              </p>
              <div className="hero-buttons">
                <a href="#categorias-home" className="btn btn-primary">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  Ver Categorías
                </a>
                <a href="#nosotros" className="btn btn-secondary">
                  Sobre Nosotros
                </a>
              </div>

              <div className="hero-stats">
                <div className="stat-card">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Hecho a Mano</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">40+</span>
                  <span className="stat-label">Modelos Exclusivos</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">Garantía</span>
                  <span className="stat-label">Acero Inoxidable & Forja</span>
                </div>
              </div>
            </div>
          </section>

          {/* Sección de Categorías en Cuadros (Acceso a las páginas dedicadas) */}
          <section id="categorias-home" className="categories-section">
            <div className="container">
              <div className="section-header">
                <span className="section-tag">Nuestras Colecciones</span>
                <h2 className="section-title">Explora por Categoría</h2>
                <p className="section-subtitle">
                  Haz clic en cualquiera de los cuadros para abrir su página exclusiva con los 8 productos especiales.
                </p>
              </div>

              <div className="categories-square-grid">
                {CATEGORIAS.map((cat) => (
                  <div
                    key={cat.slug}
                    className="category-square-card"
                    style={{ backgroundImage: `url(${cat.imagen})` }}
                    onClick={() => navegarA(cat.slug)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navegarA(cat.slug)}
                  >
                    <div className="category-card-overlay"></div>
                    
                    {/* Nombre en una esquina del cuadro */}
                    <div className="category-corner-tag">
                      <span className="corner-icon">{cat.icono}</span>
                      <span className="corner-name">{cat.nombre}</span>
                    </div>

                    <div className="category-card-footer">
                      <p className="category-card-desc">{cat.subtitulo}</p>
                      <span className="category-card-action">
                        Ver los 8 productos ➔
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sección Sobre Nosotros con Redes Sociales */}
          <section id="nosotros" className="about-section">
            <div className="container">
              <div className="about-card">
                <div className="about-grid">
                  <div className="about-content">
                    <span className="section-tag">Nuestra Pasión</span>
                    <h2 className="about-title">Sobre Soldadura Creativa</h2>
                    <div className="about-divider"></div>
                    <p className="about-text">
                      En <strong>Soldadura Creativa</strong> nacemos con la convicción de que el metal puede transmitir sentimientos duraderos. Diseñamos, forjamos y soldamos a mano regalos únicos, esculturas vanguardistas y proyectos decorativos personalizados.
                    </p>
                    <p className="about-text">
                      Cada una de nuestras piezas es fabricada con pasión artesanal en nuestro taller: cuidamos minuciosamente cada cordón de soldadura, biselado y pulido para garantizar acabados anticorrosivos eternos.
                    </p>

                    <div className="about-features">
                      <div className="feature-item">
                        <span className="feature-icon">🛡️</span>
                        <div>
                          <h4>Durabilidad de por Vida</h4>
                          <p>Hierro y acero de alta resistencia con protección anticorrosiva.</p>
                        </div>
                      </div>
                      <div className="feature-item">
                        <span className="feature-icon">🎁</span>
                        <div>
                          <h4>Regalos Inolvidables</h4>
                          <p>Detalles únicos con valor emocional para cualquier ocasión especial.</p>
                        </div>
                      </div>
                    </div>

                    {/* Botones de Redes Sociales: WhatsApp, TikTok y Facebook */}
                    <div className="social-connect-box">
                      <h4 className="social-heading">Conéctate y Cotiza con Nosotros:</h4>
                      <div className="social-buttons-grid">
                        <a
                          href="https://wa.me/5215555555555?text=¡Hola%20Soldadura%20Creativa!%20Deseo%20cotizar%20un%20proyecto%20o%20regalo%20en%20metal."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-btn social-whatsapp"
                          aria-label="Abrir WhatsApp de Soldadura Creativa"
                        >
                          <span className="social-icon">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.29-1.92 1.37-.5.08-1.15.11-3.69-.94-3.25-1.34-5.34-4.66-5.5-4.88-.16-.22-1.32-1.76-1.32-3.35 0-1.6 1.05-2.39 1.42-2.75.37-.36.81-.45 1.08-.45.27 0 .54 0 .78.01.25.01.59-.1.92.7.34.82 1.16 2.82 1.26 3.03.1.21.17.46.03.73-.14.27-.21.44-.42.68-.21.24-.44.54-.63.72-.21.2-.43.42-.19.83.24.41 1.07 1.76 2.3 2.86 1.58 1.41 2.91 1.85 3.32 2.05.41.2.65.17.89-.11.24-.28 1.03-1.2 1.31-1.61.27-.41.55-.34.92-.2.38.14 2.39 1.13 2.8 1.33.41.2.68.31.78.48.1.17.1.98-.14 1.66z"></path>
                            </svg>
                          </span>
                          <span className="social-text-wrapper">
                            <span className="social-tag">Chat Directo</span>
                            <span className="social-title">WhatsApp</span>
                          </span>
                        </a>

                        <a
                          href="https://www.tiktok.com/@soldaduracreativa"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-btn social-tiktok"
                          aria-label="Abrir TikTok de Soldadura Creativa"
                        >
                          <span className="social-icon">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                              <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path>
                            </svg>
                          </span>
                          <span className="social-text-wrapper">
                            <span className="social-tag">Videos de Forja</span>
                            <span className="social-title">TikTok</span>
                          </span>
                        </a>

                        <a
                          href="https://www.facebook.com/soldaduracreativa"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-btn social-facebook"
                          aria-label="Abrir Facebook de Soldadura Creativa"
                        >
                          <span className="social-icon">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                            </svg>
                          </span>
                          <span className="social-text-wrapper">
                            <span className="social-tag">Comunidad & Fotos</span>
                            <span className="social-title">Facebook</span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="about-visual">
                    <div className="visual-image-wrapper">
                      <img
                        src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=700&h=800&fit=crop&q=80"
                        alt="Taller de Soldadura Creativa"
                        loading="lazy"
                        className="visual-img"
                      />
                      <div className="visual-badge">
                        <span className="badge-flame">🔥</span>
                        <div>
                          <strong>Artesanía de Precisión</strong>
                          <p>Soldadura TIG y MIG certificada</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección de Cotizaciones */}
          <section id="contacto" className="contact-section">
            <div className="container">
              <div className="contact-box">
                <div className="section-header">
                  <span className="section-tag">¿Tienes una idea en mente?</span>
                  <h2 className="section-title">Cotiza tu Pieza a Medida</h2>
                  <p className="section-subtitle">
                    Cuéntanos lo que imaginas y nosotros lo forjamos en metal para ti.
                  </p>
                </div>

                {contactSubmitted ? (
                  <div className="contact-success-card">
                    <span className="success-icon">✓</span>
                    <h3>¡Mensaje recibido con éxito!</h3>
                    <p>Nos pondremos en contacto contigo a la brevedad para dar vida a tu diseño en metal.</p>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleContactSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="nombre">Tu Nombre</label>
                        <input type="text" id="nombre" required placeholder="Ej. Carlos Martínez" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="telefono">Teléfono / WhatsApp</label>
                        <input type="tel" id="telefono" required placeholder="Ej. +52 1 55 1234 5678" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="categoria-interes">Colección de Interés</label>
                      <select id="categoria-interes" defaultValue="enamorados">
                        <option value="enamorados">Enamorados (Rosas, Corazones)</option>
                        <option value="cumpleanos">Cumpleaños (Porta botellas, Figuras)</option>
                        <option value="decorativo">Decorativo (Lámparas, Relojes)</option>
                        <option value="artistico">Artístico (Esculturas al arco)</option>
                        <option value="personalizados">Personalizados (Letreros, Proyectos a medida)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="mensaje">Detalles de la Idea</label>
                      <textarea id="mensaje" rows="4" required placeholder="Describe medidas, texto a grabar o características..."></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Enviar Cotización
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </main>
      ) : (
        /* ========================================================
           VISTA 2: PÁGINA INDEPENDIENTE DE CATEGORÍA
           (8 Cuadros de Productos con Nombre en la Esquina)
           ======================================================== */
        categoriaActual && (
          <main className="category-page">
            {/* Barra de Navegación / Migas de Pan */}
            <div className="category-breadcrumb-bar">
              <div className="container breadcrumb-container">
                <button className="btn-back-home" onClick={() => navegarA('inicio')}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Volver al Inicio
                </button>
                <div className="breadcrumbs">
                  <span onClick={() => navegarA('inicio')} className="crumb-link">Inicio</span>
                  <span className="crumb-separator">/</span>
                  <span className="crumb-current">{categoriaActual.nombre}</span>
                </div>
              </div>
            </div>

            {/* Encabezado de la Categoría */}
            <section className="category-header-banner">
              <div className="container category-banner-content">
                <div className="category-banner-badge">
                  <span className="category-banner-icon">{categoriaActual.icono}</span>
                  <span>Colección Oficial • 8 Piezas Artesanales</span>
                </div>
                <h1 className="category-banner-title">
                  {categoriaActual.nombre}
                </h1>
                <p className="category-banner-desc">
                  {categoriaActual.descripcion}
                </p>
                <div className="category-subtabs">
                  <span className="subtab-label">Otras Categorías:</span>
                  {CATEGORIAS.filter(c => c.slug !== categoriaActual.slug).map(c => (
                    <button
                      key={c.slug}
                      className="category-subtab-btn"
                      onClick={() => navegarA(c.slug)}
                    >
                      {c.icono} {c.nombre}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Cuadrícula de los 8 Productos en Cuadros Minimalistas */}
            <section className="category-products-section">
              <div className="container">
                <div className="products-grid-info">
                  <p className="products-hint">
                    💡 Haz clic en cualquier cuadro para <strong>agrandarlo</strong> y ver los detalles, descripción completa y botón de compra.
                  </p>
                </div>

                <div className="products-square-grid">
                  {productosDeLaPagina.map((prod) => (
                    <div
                      key={prod.id}
                      className="product-square-card"
                      style={{ backgroundImage: `url(${prod.imagen})` }}
                      onClick={() => abrirProducto(prod)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && abrirProducto(prod)}
                      title={`Ver ${prod.nombre} en detalle`}
                    >
                      <div className="product-square-overlay"></div>
                      
                      {/* SOLO el nombre encima en una esquinita como solicitó el usuario */}
                      <div className="product-corner-name">
                        <span>{prod.nombre}</span>
                      </div>

                      {/* Icono discreto de expandir al pasar el ratón */}
                      <div className="product-hover-badge">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <polyline points="9 21 3 21 3 15"></polyline>
                          <line x1="21" y1="3" x2="14" y2="10"></line>
                          <line x1="3" y1="21" x2="10" y2="14"></line>
                        </svg>
                        <span>Agrandar</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        )
      )}

      {/* ========================================================
          MODAL / LIGHTBOX DE PRODUCTO AMPLIADO
          (Se hace grande para ver foto, nombre, descripción y carrito)
          ======================================================== */}
      {productoSeleccionado && (
        <div className="product-modal-backdrop" onClick={() => setProductoSeleccionado(null)}>
          <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-drag-handle" aria-hidden="true"></div>
            <button
              className="btn-close-modal"
              onClick={() => setProductoSeleccionado(null)}
              aria-label="Cerrar vista de producto"
            >
              ✕
            </button>

            <div className="product-modal-grid">
              {/* Foto Grande del Producto */}
              <div className="product-modal-media">
                <img
                  src={productoSeleccionado.imagen}
                  alt={productoSeleccionado.nombre}
                  className="product-modal-img"
                />
                <div className="modal-img-badge">
                  <span>⚡ Forjado Artesanal</span>
                </div>
              </div>

              {/* Información Completa del Producto */}
              <div className="product-modal-info">
                <div className="modal-category-tag">
                  {categoriaActual?.icono || '⚡'} {categoriaActual?.nombre || 'Soldadura Creativa'}
                </div>
                
                <h2 className="modal-product-title">{productoSeleccionado.nombre}</h2>
                
                <div className="modal-price-box">
                  <span className="modal-price-currency">$</span>
                  <span className="modal-price-val">{productoSeleccionado.precio.toFixed(2)}</span>
                  <span className="modal-tax-tag">IVA incluido</span>
                </div>

                <div className="modal-divider"></div>

                <div className="modal-description-box">
                  <h4 className="modal-desc-heading">Descripción de la Pieza:</h4>
                  <p className="modal-description-text">{productoSeleccionado.descripcion}</p>
                </div>

                {productoSeleccionado.detalles && (
                  <div className="modal-specs-box">
                    <span className="specs-icon">🛠️</span>
                    <p className="modal-specs-text">{productoSeleccionado.detalles}</p>
                  </div>
                )}

                <div className="modal-actions-box">
                  {/* Selector de cantidad */}
                  <div className="modal-quantity-wrapper">
                    <label htmlFor="modal-qty">Cantidad:</label>
                    <div className="modal-qty-control">
                      <button
                        className="modal-qty-btn"
                        onClick={() => setCantidadModal(Math.max(1, cantidadModal - 1))}
                      >
                        -
                      </button>
                      <span className="modal-qty-val">{cantidadModal}</span>
                      <button
                        className="modal-qty-btn"
                        onClick={() => setCantidadModal(cantidadModal + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Botón de Agregar al Carrito */}
                  <button
                    className="btn btn-primary btn-modal-cart"
                    onClick={() => {
                      agregarAlCarrito(productoSeleccionado, cantidadModal)
                      setProductoSeleccionado(null)
                      setCartOpen(true)
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Agregar al Carrito • ${(productoSeleccionado.precio * cantidadModal).toFixed(2)}
                  </button>

                  {/* Botón de Consulta Rápida a WhatsApp */}
                  <a
                    href={`https://wa.me/5215555555555?text=¡Hola%20Soldadura%20Creativa!%20Me%20interesa%20la%20pieza%20*${encodeURIComponent(productoSeleccionado.nombre)}*%20($${productoSeleccionado.precio.toFixed(2)}).%20¿Tienen%20disponibilidad%20inmediata?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-modal-whatsapp"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.29-1.92 1.37-.5.08-1.15.11-3.69-.94-3.25-1.34-5.34-4.66-5.5-4.88-.16-.22-1.32-1.76-1.32-3.35 0-1.6 1.05-2.39 1.42-2.75.37-.36.81-.45 1.08-.45.27 0 .54 0 .78.01.25.01.59-.1.92.7.34.82 1.16 2.82 1.26 3.03.1.21.17.46.03.73-.14.27-.21.44-.42.68-.21.24-.44.54-.63.72-.21.2-.43.42-.19.83.24.41 1.07 1.76 2.3 2.86 1.58 1.41 2.91 1.85 3.32 2.05.41.2.65.17.89-.11.24-.28 1.03-1.2 1.31-1.61.27-.41.55-.34.92-.2.38.14 2.39 1.13 2.8 1.33.41.2.68.31.78.48.1.17.1.98-.14 1.66z"></path>
                    </svg>
                    Preguntar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          DRAWER / PANEL DESLIZANTE DEL CARRITO
          ======================================================== */}
      {cartOpen && (
        <div className="cart-drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <div className="cart-title-box">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <h3>Tu Carrito ({totalItems})</h3>
              </div>
              <button
                className="btn-close-cart"
                onClick={() => setCartOpen(false)}
                aria-label="Cerrar carrito"
              >
                ✕
              </button>
            </div>

            <div className="cart-content">
              {carrito.length === 0 ? (
                <div className="cart-empty-state">
                  <div className="empty-cart-icon">🛒</div>
                  <h4>Tu carrito está vacío</h4>
                  <p>Explora nuestras categorías de soldadura y agrega piezas exclusivas.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setCartOpen(false)
                      navegarA('enamorados')
                    }}
                  >
                    Ver Catálogo
                  </button>
                </div>
              ) : (
                <div className="cart-items-list">
                  {carrito.map((item) => (
                    <div key={item.id} className="cart-item-card">
                      <img src={item.imagen} alt={item.nombre} className="cart-item-img" />
                      <div className="cart-item-info">
                        <h4 className="cart-item-title">{item.nombre}</h4>
                        <span className="cart-item-price">${item.precio.toFixed(2)} c/u</span>
                        
                        <div className="cart-qty-controls">
                          <button
                            className="qty-btn"
                            onClick={() => cambiarCantidadCarrito(item.id, -1)}
                            aria-label="Disminuir"
                          >
                            -
                          </button>
                          <span className="qty-number">{item.cantidad}</span>
                          <button
                            className="qty-btn"
                            onClick={() => cambiarCantidadCarrito(item.id, 1)}
                            aria-label="Aumentar"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-actions">
                        <span className="cart-item-subtotal">
                          ${(item.precio * item.cantidad).toFixed(2)}
                        </span>
                        <button
                          className="btn-remove-item"
                          onClick={() => eliminarDelCarrito(item.id)}
                          title="Eliminar"
                          aria-label={`Eliminar ${item.nombre}`}
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {carrito.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary-row">
                  <span>Subtotal:</span>
                  <span className="summary-val">${subtotal.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row total-row">
                  <span>Total a Pagar:</span>
                  <span className="summary-val total-val">${subtotal.toFixed(2)}</span>
                </div>

                <button
                  className="btn btn-whatsapp-checkout"
                  onClick={handleCheckoutWhatsApp}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.29-1.92 1.37-.5.08-1.15.11-3.69-.94-3.25-1.34-5.34-4.66-5.5-4.88-.16-.22-1.32-1.76-1.32-3.35 0-1.6 1.05-2.39 1.42-2.75.37-.36.81-.45 1.08-.45.27 0 .54 0 .78.01.25.01.59-.1.92.7.34.82 1.16 2.82 1.26 3.03.1.21.17.46.03.73-.14.27-.21.44-.42.68-.21.24-.44.54-.63.72-.21.2-.43.42-.19.83.24.41 1.07 1.76 2.3 2.86 1.58 1.41 2.91 1.85 3.32 2.05.41.2.65.17.89-.11.24-.28 1.03-1.2 1.31-1.61.27-.41.55-.34.92-.2.38.14 2.39 1.13 2.8 1.33.41.2.68.31.78.48.1.17.1.98-.14 1.66z"></path>
                  </svg>
                  Realizar Pedido por WhatsApp
                </button>

                <button className="btn-clear-cart" onClick={vaciarCarrito}>
                  Vaciar Carrito
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div 
                className="brand-logo" 
                onClick={() => navegarA('inicio')} 
                style={{ cursor: 'pointer' }}
              >
                <div className="brand-symbol">⚡</div>
                <div className="brand-text">
                  <span className="brand-name">SOLDADURA</span>
                  <span className="brand-accent">CREATIVA</span>
                </div>
              </div>
              <p className="footer-desc">
                Artesanía, forja y creatividad en hierro y acero para dar forma a regalos y recuerdos que duran para siempre.
              </p>
            </div>

            <div className="footer-col">
              <h4>Navegación</h4>
              <ul className="footer-links">
                <li><button className="footer-link-btn" onClick={() => navegarA('inicio')}>Inicio</button></li>
                {CATEGORIAS.map(c => (
                  <li key={c.slug}>
                    <button className="footer-link-btn" onClick={() => navegarA(c.slug)}>
                      {c.icono} {c.nombre}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contacto Directo</h4>
              <p className="footer-desc" style={{ marginBottom: '14px' }}>
                Atención personalizada para cotizaciones y pedidos especiales.
              </p>
              <a
                href="https://wa.me/5215555555555?text=Hola%20Soldadura%20Creativa,%20quisiera%20cotizar%20un%20proyecto."
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-block"
                style={{ justifyContent: 'center' }}
              >
                💬 WhatsApp Oficial
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Soldadura Creativa. Todos los derechos reservados.</p>
            <p className="footer-made">Hecho con fuego, acero y pasión artesanal ⚡</p>
          </div>
        </div>
      </footer>

      {/* BARRA DE NAVEGACIÓN INFERIOR PARA MÓVILES */}
      <nav className="mobile-bottom-nav" aria-label="Navegación móvil">
        <button
          className={`mobile-bottom-btn ${rutaActual === 'inicio' ? 'active' : ''}`}
          onClick={() => navegarA('inicio')}
        >
          <span className="bottom-btn-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </span>
          <span className="bottom-btn-label">Inicio</span>
        </button>

        <button
          className={`mobile-bottom-btn ${rutaActual !== 'inicio' ? 'active' : ''}`}
          onClick={() => {
            setCategoriesDropdownOpen(!categoriesDropdownOpen)
            if (rutaActual !== 'inicio') {
              navegarA('inicio')
            }
          }}
        >
          <span className="bottom-btn-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
            </svg>
          </span>
          <span className="bottom-btn-label">Categorías</span>
        </button>

        <button
          className="mobile-bottom-btn"
          onClick={() => setCartOpen(true)}
        >
          <span className="bottom-btn-icon" style={{ position: 'relative' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {totalItems > 0 && <span className="mobile-cart-badge">{totalItems}</span>}
          </span>
          <span className="bottom-btn-label">Carrito</span>
        </button>

        <a
          href="https://wa.me/5215555555555?text=Hola%20Soldadura%20Creativa,%20quisiera%20cotizar%20un%20proyecto."
          target="_blank"
          rel="noreferrer"
          className="mobile-bottom-btn mobile-bottom-whatsapp"
        >
          <span className="bottom-btn-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.29-1.92 1.37-.5.08-1.15.11-3.69-.94-3.25-1.34-5.34-4.66-5.5-4.88-.16-.22-1.32-1.76-1.32-3.35 0-1.6 1.05-2.39 1.42-2.75.37-.36.81-.45 1.08-.45.27 0 .54 0 .78.01.25.01.59-.1.92.7.34.82 1.16 2.82 1.26 3.03.1.21.17.46.03.73-.14.27-.21.44-.42.68-.21.24-.44.54-.63.72-.21.2-.43.42-.19.83.24.41 1.07 1.76 2.3 2.86 1.58 1.41 2.91 1.85 3.32 2.05.41.2.65.17.89-.11.24-.28 1.03-1.2 1.31-1.61.27-.41.55-.34.92-.2.38.14 2.39 1.13 2.8 1.33.41.2.68.31.78.48.1.17.1.98-.14 1.66z"></path>
            </svg>
          </span>
          <span className="bottom-btn-label">WhatsApp</span>
        </a>
      </nav>

      {/* Overlay para menú responsive */}
      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)}></div>}
    </div>
  )
}

export default App


