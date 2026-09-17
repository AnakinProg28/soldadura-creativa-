import { useState, useEffect } from 'react'
import './App.css'
import { CATEGORIAS, PRODUCTOS_POR_CATEGORIA } from './data/productos'

const buildWhatsAppUrl = (text) => `https://wa.me/51960904365?text=${encodeURIComponent(text)}`

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

  const [rutaActual, setRutaActual] = useState(() => {
    const hash = window.location.hash
    if (hash.startsWith('#/categoria/')) {
      const slug = hash.replace('#/categoria/', '')
      if (PRODUCTOS_POR_CATEGORIA[slug]) return slug
    }
    return 'inicio'
  })

  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [cantidadModal, setCantidadModal] = useState(1)
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false)

  const [toastMessage, setToastMessage] = useState(null)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.categories-dropdown-container')) {
        setCategoriesDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

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

  useEffect(() => {
    try {
      localStorage.setItem('soldadura_carrito', JSON.stringify(carrito))
    } catch (e) {
      console.error(e)
    }
  }, [carrito])

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null)
      }, 3200)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

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

  const abrirProducto = (producto) => {
    setProductoSeleccionado(producto)
    setCantidadModal(1)
  }

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id)
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        )
      }
      return [...prev, { ...producto, cantidad }]
    })
    setToastMessage(`¡"${producto.nombre}" agregado al carrito! (${cantidad})`)
  }

  const cambiarCantidadCarrito = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nuevaCantidad = item.cantidad + delta
            return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  const vaciarCarrito = () => {
    if (window.confirm('¿Deseas vaciar todo el carrito?')) {
      setCarrito([])
    }
  }

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const handleCheckoutWhatsApp = () => {
    if (carrito.length === 0) return

    let mensaje = '👋 ¡Hola Soldadura Creativa! Deseo realizar el siguiente pedido:\n\n'
    carrito.forEach((item, index) => {
      mensaje += `${index + 1}. *${item.nombre}* x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}\n`
    })
    mensaje += `\n💰 *Total estimado:* $${subtotal.toFixed(2)}\n`
    mensaje += '\nQuedo atento/a para coordinar pago y entrega. ¡Muchas gracias!'

    const urlWhatsApp = buildWhatsAppUrl(mensaje)
    window.open(urlWhatsApp, '_blank', 'noopener,noreferrer')
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactSubmitted(true)
    setTimeout(() => setContactSubmitted(false), 5000)
    e.target.reset()
  }

  const categoriaActual = CATEGORIAS.find((c) => c.slug === rutaActual)
  const productosDeLaPagina = rutaActual !== 'inicio' ? PRODUCTOS_POR_CATEGORIA[rutaActual] || [] : []

  return (
    <div className="app-wrapper">
      {toastMessage && (
        <div className="toast-notification">
          <span className="toast-icon">⚡</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <header className="navbar">
        <div className="navbar-container">
          <div className="brand-logo" onClick={() => navegarA('inicio')} style={{ cursor: 'pointer' }}>
            <div className="brand-symbol">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-name">SOLDADURA</span>
              <span className="brand-accent">CREATIVA</span>
            </div>
          </div>

          <nav className={`nav-menu ${menuOpen ? 'nav-menu-open' : ''}`}>
            <ul className="nav-links">
              <li>
                <button className={`nav-link-btn ${rutaActual === 'inicio' ? 'active' : ''}`} onClick={() => navegarA('inicio')}>
                  Inicio
                </button>
              </li>

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
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                  <span className="dropdown-caret-arrow">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

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
                          {rutaActual === cat.slug && <span className="dropdown-cat-check">✓</span>}
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

          <div className="navbar-actions">
            <button className="cart-toggle-btn" onClick={() => setCartOpen(true)} aria-label="Abrir carrito de compras">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="cart-badge">{totalItems}</span>
            </button>

            <button className={`hamburger-btn ${menuOpen ? 'hamburger-active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {rutaActual === 'inicio' ? (
        <main className="main-content">
          <section id="inicio" className="hero-section">
            <div className="hero-backdrop" />
            <div className="hero-spark-glow" />
            <div className="container hero-container">
              <div className="hero-badge">
                <span className="spark-dot" />
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
                    <div className="category-card-overlay" />
                    <div className="category-corner-tag">
                      <span className="corner-icon">{cat.icono}</span>
                      <span className="corner-name">{cat.nombre}</span>
                    </div>

                    <div className="category-card-footer">
                      <p className="category-card-desc">{cat.subtitulo}</p>
                      <span className="category-card-action">Ver los 8 productos ➔</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="nosotros" className="about-section">
            <div className="container">
              <div className="about-card">
                <div className="about-grid">
                  <div className="about-content">
                    <span className="section-tag">Nuestra Pasión</span>
                    <h2 className="about-title">Sobre Soldadura Creativa</h2>
                    <div className="about-divider" />
                    <p className="about-text">
                      En <strong>Soldadura Creativa</strong> nacemos con la convicción de que el metal puede transmitir sentimientos duraderos.
                    </p>
                    <p className="about-text">
                      Cada una de nuestras piezas es fabricada con pasión artesanal en nuestro taller, cuidando cada cordón de soldadura, biselado y pulido.
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

                    <div className="social-connect-box">
                      <h4 className="social-heading">Conéctate y Cotiza con Nosotros:</h4>
                      <div className="social-buttons-grid">
                        <a
                          href={buildWhatsAppUrl('¡Hola Soldadura Creativa! Deseo cotizar un proyecto o regalo en metal.')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-btn social-whatsapp"
                          aria-label="Abrir WhatsApp de Soldadura Creativa"
                        >
                          <span className="social-icon">💬</span>
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
                          <span className="social-icon">🎵</span>
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
                          <span className="social-icon">f</span>
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
                      <textarea id="mensaje" rows="4" required placeholder="Describe medidas, texto a grabar o características..." />
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
        categoriaActual && (
          <main className="category-page">
            <div className="category-breadcrumb-bar">
              <div className="container breadcrumb-container">
                <button className="btn-back-home" onClick={() => navegarA('inicio')}>
                  Volver al Inicio
                </button>
                <div className="breadcrumbs">
                  <span onClick={() => navegarA('inicio')} className="crumb-link">Inicio</span>
                  <span className="crumb-separator">/</span>
                  <span className="crumb-current">{categoriaActual.nombre}</span>
                </div>
              </div>
            </div>

            <section className="category-header-banner">
              <div className="container category-banner-content">
                <div className="category-banner-badge">
                  <span className="category-banner-icon">{categoriaActual.icono}</span>
                  <span>Colección Oficial • 8 Piezas Artesanales</span>
                </div>
                <h1 className="category-banner-title">{categoriaActual.nombre}</h1>
                <p className="category-banner-desc">{categoriaActual.descripcion}</p>
                <div className="category-subtabs">
                  <span className="subtab-label">Otras Categorías:</span>
                  {CATEGORIAS.filter((c) => c.slug !== categoriaActual.slug).map((c) => (
                    <button key={c.slug} className="category-subtab-btn" onClick={() => navegarA(c.slug)}>
                      {c.icono} {c.nombre}
                    </button>
                  ))}
                </div>
              </div>
            </section>

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
                      <div className="product-square-overlay" />
                      <div className="product-corner-name">
                        <span>{prod.nombre}</span>
                      </div>
                      <div className="product-hover-badge">
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

      {productoSeleccionado && (
        <div className="product-modal-backdrop" onClick={() => setProductoSeleccionado(null)}>
          <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close-modal" onClick={() => setProductoSeleccionado(null)} aria-label="Cerrar vista de producto">
              ✕
            </button>

            <div className="product-modal-grid">
              <div className="product-modal-media">
                <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre} className="product-modal-img" />
                <div className="modal-img-badge">
                  <span>⚡ Forjado Artesanal</span>
                </div>
              </div>

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

                <div className="modal-divider" />

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
                  <div className="modal-quantity-wrapper">
                    <label htmlFor="modal-qty">Cantidad:</label>
                    <div className="modal-qty-control">
                      <button className="modal-qty-btn" onClick={() => setCantidadModal(Math.max(1, cantidadModal - 1))}>
                        -
                      </button>
                      <span className="modal-qty-val">{cantidadModal}</span>
                      <button className="modal-qty-btn" onClick={() => setCantidadModal(cantidadModal + 1)}>
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary btn-modal-cart"
                    onClick={() => {
                      agregarAlCarrito(productoSeleccionado, cantidadModal)
                      setProductoSeleccionado(null)
                      setCartOpen(true)
                    }}
                  >
                    Agregar al Carrito • ${(productoSeleccionado.precio * cantidadModal).toFixed(2)}
                  </button>

                  <a
                    href={buildWhatsAppUrl(
                      `¡Hola Soldadura Creativa! Me interesa la pieza "${productoSeleccionado.nombre}" por $${productoSeleccionado.precio.toFixed(2)}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-modal-whatsapp"
                  >
                    Preguntar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="cart-drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <div className="cart-title-box">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <h3>Tu Carrito ({totalItems})</h3>
              </div>
              <button className="btn-close-cart" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito">
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
                          <button className="qty-btn" onClick={() => cambiarCantidadCarrito(item.id, -1)} aria-label="Disminuir">
                            -
                          </button>
                          <span className="qty-number">{item.cantidad}</span>
                          <button className="qty-btn" onClick={() => cambiarCantidadCarrito(item.id, 1)} aria-label="Aumentar">
                            +
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-actions">
                        <span className="cart-item-subtotal">${(item.precio * item.cantidad).toFixed(2)}</span>
                        <button className="btn-remove-item" onClick={() => eliminarDelCarrito(item.id)} title="Eliminar" aria-label={`Eliminar ${item.nombre}`}>
                          🗑️
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

                <button className="btn btn-whatsapp-checkout" onClick={handleCheckoutWhatsApp}>
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

      <footer className="main-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="brand-logo" onClick={() => navegarA('inicio')} style={{ cursor: 'pointer' }}>
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
                <li>
                  <button className="footer-link-btn" onClick={() => navegarA('inicio')}>
                    Inicio
                  </button>
                </li>
                {CATEGORIAS.map((c) => (
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
                href={buildWhatsAppUrl('Hola Soldadura Creativa, quisiera cotizar un proyecto.')}
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

      <nav className="mobile-bottom-nav" aria-label="Navegación móvil">
        <button className={`mobile-bottom-btn ${rutaActual === 'inicio' ? 'active' : ''}`} onClick={() => navegarA('inicio')}>
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
          <span className="bottom-btn-label">Categorías</span>
        </button>

        <button className="mobile-bottom-btn" onClick={() => setCartOpen(true)}>
          <span className="bottom-btn-label">Carrito</span>
          {totalItems > 0 && <span className="mobile-cart-badge">{totalItems}</span>}
        </button>

        <a
          href={buildWhatsAppUrl('Hola Soldadura Creativa, quisiera cotizar un proyecto.')}
          target="_blank"
          rel="noreferrer"
          className="mobile-bottom-btn mobile-bottom-whatsapp"
        >
          <span className="bottom-btn-label">WhatsApp</span>
        </a>
      </nav>

      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
    </div>
  )
}

export default App
