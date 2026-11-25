export const SECTIONS = {
  about: {
    kicker: '',
    title: 'Sobre mí',
    html: `
      <div class="about-avatar">
        <img src="perfil.jpeg" alt="Foto de perfil de Cleidy Pérez" class="profile-img" />
      </div>
      <p class="about-lead">
        Apasionada por la tecnología y las soluciones digitales que puedo encontrar a los problemas o
        incertidumbre de un código. Cuento con experiencia práctica en Campus Lands, donde he
        diseñado arquitectura backend, implementado interfaces frontend y gestionado la seguridad y
        funcionalidad de aplicaciones web. Más allá de las líneas de código, me defino como una
        persona alegre, sociable, amable y profundamente empática. Creo firmemente que el mejor
        software nace de la escucha activa, el trabajo en equipo y una comunicación abierta. Mi actitud
        positiva, creatividad y dedicación al trabajo me permiten transformar retos complejos en
        experiencias fluidas, funcionales y centradas en el usuario.
      </p>
      <div class="about-highlights grid-cards">
        <div class="look-card">
          <span class="badge">Perfil</span>
          <h3>Campus Lands</h3>
          <p>Arquitectura backend · Interfaces frontend · Seguridad y funcionalidad web</p>
        </div>
        <div class="look-card">
          <span class="badge">Valores</span>
          <h3>Empatía y Comunicación</h3>
          <p>Escucha activa, trabajo en equipo y comunicación abierta como base del mejor software</p>
        </div>
        <div class="look-card">
          <span class="badge">Actitud</span>
          <h3>Creatividad y Dedicación</h3>
          <p>Transformo retos complejos en experiencias fluidas, funcionales y centradas en el usuario</p>
        </div>
      </div>
    `
  },
  skills: {
    kicker: '',
    title: 'Patrones y Herramientas del Oficio',
    html: `
      <p class="skills-intro">Haz clic o pasa el cursor sobre cada tarjeta para escuchar su nota asociada en el jardín.</p>
      <div class="grid-cards">
        <div class="look-card skill-card">
            <span class="badge badge-tech">Lenguaje</span>
            <h3>JavaScript</h3>
            <p>Lo aplico para dar vida a las interfaces, creando funcionalidades dinámicas e interacciones fluidas que mejoran la experiencia del usuario.</p>
          </div>
        <div class="look-card skill-card">
            <span class="badge badge-tech">Backend</span>
            <h3>Node.js</h3>
            <p>Lo utilizo para construir la lógica del servidor y la arquitectura backend, garantizando que la aplicación sea segura, rápida y escalable.</p>
          </div>
        <div class="look-card skill-card">
            <span class="badge badge-tech">Estructura</span>
            <h3>HTML5</h3>
            <p>Lo aplico estructurando el contenido de forma semántica y limpia, asegurando que el sitio sea accesible y fácil de navegar.</p>
          </div>
          <div class="look-card skill-card">
            <span class="badge badge-tech">Diseño</span>
            <h3>CSS3</h3>
            <p>Lo utilizo para diseñar interfaces atractivas y adaptables (responsive), cuidando los detalles visuales en cualquier tipo de pantalla.</p>
          </div>
          <div class="look-card skill-card">
            <span class="badge badge-tech">Base de datos</span>
            <h3>MySQL</h3>
            <p>Lo aplico en el diseño y gestión de bases de datos relacionales, estructurando la información para realizar consultas rápidas y eficientes.</p>
          </div>
          <div class="look-card skill-card">
            <span class="badge badge-tech">Base de datos</span>
            <h3>PostgreSQL</h3>
            <p>Administración de datos más complejos, garantizando la seguridad, integridad y estabilidad del sistema.</p>
          </div>
        </div>
      </div>
      <div class="skills-group">
        <h3 class="group-title">Blandas</h3>
        <div class="grid-cards">
          <div class="look-card skill-card soft">
            <span class="badge badge-soft">Interpersonal</span>
            <h3>Trabajo en equipo</h3>
            <p>Colaboración de forma abierta y empática con mis compañeros, facilitando la comunicación para que los sprints fluyan mejor.</p>
          </div>
          <div class="look-card skill-card soft">
            <span class="badge badge-soft">Cognitiva</span>
            <h3>Resolución de problemas</h3>
            <p>Análisis de los bloqueos técnicos o de diseño desde un enfoque creativo para encontrar soluciones prácticas y efectivas.</p>
          </div>
          <div class="look-card skill-card soft">
            <span class="badge badge-soft">Gestión</span>
            <h3>Capacidad multitarea</h3>
            <p>Priorización de tareas y mantenimiento del orden para avanzar en el frontend y backend sin perder calidad ni tiempo.</p>
          </div>
          <div class="look-card skill-card soft">
            <span class="badge badge-soft">Actitud</span>
            <h3>Proactividad y dinamismo</h3>
            <p>Propuesta de mejoras en los procesos del proyecto y manteniendo una actitud positiva que motiva al equipo.</p>
          </div>
          <div class="look-card skill-card soft">
            <span class="badge badge-soft">Comunicación</span>
            <h3>Mecanografía fluida</h3>
            <p>Agilidad para redactar código limpio, tomar notas de reuniones y documentar procesos de forma rápida.</p>
          </div>
          <div class="look-card skill-card soft">
            <span class="badge badge-soft">Idioma</span>
            <h3>Bilingüe</h3>
            <p>Comunicación con fluidez en entornos que requieren documentación, leer recursos técnicos o interactuar en inglés.</p>
          </div>
        </div>
      </div>
    `
  },
  projects: {
    kicker: '',
    title: 'Proyectos Destacados',
    html: `
      <p>Selección de proyectos desarrollados en HTML5, CSS3, JavaScript, Node.js, MySQL y PostgreSQL.</p>
      <div class="grid-cards">
        <div class="look-card">
          <span class="badge">JavaScript</span>
          <h3>karen-flix</h3>
          <p>Plataforma de películas y streaming desarrollada con JavaScript.</p>
        </div>
        <div class="look-card">
          <span class="badge">JavaScript</span>
          <h3>greekrank</h3>
          <p>Aplicación web desarrollada con JavaScript.</p>
        </div>
        <div class="look-card">
          <span class="badge">JavaScript</span>
          <h3>gestion-gimnasio-cli</h3>
          <p>Sistema de gestión de gimnasio por línea de comandos desarrollado con JavaScript.</p>
        </div>
        <div class="look-card">
          <span class="badge">CSS</span>
          <h3>portafolio</h3>
          <p>Portafolio web desarrollado con CSS.</p>
        </div>
        <div class="look-card">
          <span class="badge">JavaScript</span>
          <h3>campus_library</h3>
          <p>Sistema de biblioteca digital desarrollado con JavaScript.</p>
        </div>
      </div>
    `
  },
  apps: {
    kicker: '',
    title: 'Aplicaciones Destacadas',
    html: `
      <p>Herramientas y aplicaciones desarrolladas con Node.js, Express, SQL, PostgreSQL, Docker y n8n.</p>
      <div class="grid-cards">
        <div class="look-card">
          <span class="badge">Node.js · Express</span>
          <h3>campuslands-dev-nodejs-express</h3>
          <p>Ejercicios de Node.js y Express para estudiantes de Campuslands, desde cero hasta nivel avanzado.</p>
        </div>
        <div class="look-card">
          <span class="badge">SQL</span>
          <h3>campuslands-dev-sql-cleidy</h3>
          <p>Ejercicios SQL para practicar diseño, creación, inserción y consulta de bases de datos relacionales.</p>
        </div>
        <div class="look-card">
          <span class="badge">PostgreSQL</span>
          <h3>review-postgres</h3>
          <p>Administración y consultas de datos complejos con PostgreSQL, garantizando seguridad e integridad.</p>
        </div>
        <div class="look-card">
          <span class="badge">Docker · n8n</span>
          <h3>n8n-base-config-alcore-cleidy</h3>
          <p>Base local con Docker Compose para n8n, PostgreSQL, Node.js y ngrok. Automatización de flujos de trabajo.</p>
        </div>
      </div>
    `
  },
  contact: {
    kicker: '',
    title: 'Contacto',
    html: `
      <div class="about-avatar">
        <img src="perfil.jpeg" alt="Foto de perfil de Cleidy Pérez" class="profile-img" />
      </div>
      <p class="about-lead">
        Cleidy Pérez · Full-Stack | Base de datos<br>
        Apasionada por el desarrollo web frontend, backend y el diseño de bases de datos.<br>
        Disponible para proyectos de desarrollo web, automatización con n8n y trabajo en equipo.
      </p>
      <div class="contact-info grid-cards">
        <div class="look-card">
          <span class="badge">Email</span>
          <h3>perezcleidy069@gmail.com</h3>
          <p>Escríbeme para consultas de proyectos o colaboraciones.</p>
        </div>
        <div class="look-card">
          <span class="badge">LinkedIn</span>
          <h3>Cleidy Pérez</h3>
          <p>Conéctate conmigo en https://www.linkedin.com/feed/</p>
        </div>
      </div>
      <form class="contact-form" id="garden-contact-form">
        <input type="text" name="name" placeholder="Tu nombre o estudio" required />
        <input type="email" name="email" placeholder="tu@correo.com" required />
        <textarea name="message" rows="3" placeholder="Cuéntame sobre tu idea, proyecto o colaboración..." required></textarea>
        <button type="submit" class="btn-enter" style="justify-self: start;">Enviar Mensaje</button>
        <div class="form-status" id="form-status"></div>
      </form>
    `
  }
};