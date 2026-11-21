/**
 * AlgoSchool DSA - Script de Interacción
 * Curso: Taller de Programación Web
 *
 * Funcionalidades JavaScript implementadas:
 * 1. Modo Oscuro / Claro con persistencia en localStorage
 * 2. Barra de progreso de lectura con evento scroll
 * 3. Menú móvil interactivo (cierre al hacer clic)
 * 4. Botón flotante para volver arriba
 * 5. Buscador y filtros de temas en la Ruta de Aprendizaje
 * 6. Botón para copiar código al portapapeles
 * 7. Control de preguntas frecuentes FAQ (expandir / colapsar y buscar)
 * 8. Validación de formulario de sugerencias y contador de caracteres
 */

document.addEventListener('DOMContentLoaded', () => {
    inicializarModoOscuro();
    inicializarBarraProgreso();
    inicializarMenuMovil();
    inicializarBotonVolverArriba();
    inicializarFiltroRuta();
    inicializarCopiarCodigo();
    inicializarFAQ();
    inicializarFormulario();
    inicializarModales();
    inicializarMultimediaHub();

    // Funcionalidades interactivas
    inicializarDesafioDiario();
    inicializarTestDiagnostico();
    inicializarProgresoRuta();
    inicializarComparadorEstructuras();
    inicializarPestanasLenguaje();
    inicializarCheatSheetAcciones();
    inicializarComunidadRFC();
    inicializarGlosarioDSA();
});

/* ==========================================================================
   1. MODO OSCURO / MODO CLARO (LocalStorage)
   ========================================================================== */
function inicializarModoOscuro() {
    const botonTema = document.getElementById('boton-tema');
    if (!botonTema) return;

    const iconoTema = botonTema.querySelector('i');
    const temaGuardado = localStorage.getItem('algoschool_tema');

    // Si ya había un tema guardado, lo aplicamos
    if (temaGuardado === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (iconoTema) {
            iconoTema.classList.remove('fa-moon');
            iconoTema.classList.add('fa-sun');
        }
    }

    // Alternar tema al hacer clic
    botonTema.addEventListener('click', () => {
        const temaActual = document.documentElement.getAttribute('data-theme');
        let nuevoTema = 'dark';

        if (temaActual === 'dark') {
            nuevoTema = 'light';
            document.documentElement.setAttribute('data-theme', 'light');
            if (iconoTema) {
                iconoTema.classList.remove('fa-sun');
                iconoTema.classList.add('fa-moon');
            }
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (iconoTema) {
                iconoTema.classList.remove('fa-moon');
                iconoTema.classList.add('fa-sun');
            }
        }

        // Guardar la elección en el navegador
        localStorage.setItem('algoschool_tema', nuevoTema);
    });
}

/* ==========================================================================
   2. BARRA DE PROGRESO DE LECTURA (Scroll)
   ========================================================================== */
function inicializarBarraProgreso() {
    const barra = document.getElementById('barra-progreso-scroll');
    if (!barra) return;

    window.addEventListener('scroll', () => {
        const scrollActual = window.scrollY;
        const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;

        if (alturaTotal > 0) {
            const porcentaje = (scrollActual / alturaTotal) * 100;
            barra.style.width = porcentaje + '%';
        }
    });
}

/* ==========================================================================
   3. MENÚ MÓVIL (Apertura y Cierre con JavaScript)
   ========================================================================== */
function inicializarMenuMovil() {
    const botonMenu = document.getElementById('boton-menu-movil');
    const menuNav = document.getElementById('menu-navegacion');
    if (!botonMenu || !menuNav) return;

    const iconoBoton = botonMenu.querySelector('i');
    const enlacesNav = menuNav.querySelectorAll('a');

    // Función auxiliar para cerrar el menú
    function cerrarMenu() {
        menuNav.classList.remove('menu-abierto');
        botonMenu.setAttribute('aria-expanded', 'false');
        botonMenu.setAttribute('aria-label', 'Abrir menú de navegación');
        if (iconoBoton) {
            iconoBoton.classList.remove('fa-xmark');
            iconoBoton.classList.add('fa-bars');
        }
    }

    // Alternar menú al hacer clic en el botón hamburguesa
    botonMenu.addEventListener('click', (evento) => {
        evento.stopPropagation();
        const estaAbierto = menuNav.classList.toggle('menu-abierto');

        botonMenu.setAttribute('aria-expanded', estaAbierto ? 'true' : 'false');
        botonMenu.setAttribute('aria-label', estaAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');

        if (iconoBoton) {
            if (estaAbierto) {
                iconoBoton.classList.remove('fa-bars');
                iconoBoton.classList.add('fa-xmark');
            } else {
                iconoBoton.classList.remove('fa-xmark');
                iconoBoton.classList.add('fa-bars');
            }
        }
    });

    // Cerrar el menú al hacer clic en cualquiera de los enlaces de navegación
    enlacesNav.forEach(enlace => {
        enlace.addEventListener('click', () => {
            cerrarMenu();
        });
    });

    // Cerrar el menú al hacer clic fuera del header o del menú
    document.addEventListener('click', (evento) => {
        if (!menuNav.contains(evento.target) && !botonMenu.contains(evento.target)) {
            cerrarMenu();
        }
    });

    // Cerrar el menú si se presiona la tecla Escape
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && menuNav.classList.contains('menu-abierto')) {
            cerrarMenu();
        }
    });
}

/* ==========================================================================
   4. BOTÓN VOLVER ARRIBA
   ========================================================================== */
function inicializarBotonVolverArriba() {
    const boton = document.getElementById('boton-volver-arriba');
    if (!boton) return;

    // Mostrar el botón solo cuando se ha bajado más de 300px
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            boton.classList.add('visible');
        } else {
            boton.classList.remove('visible');
        }
    });

    // Subir suavemente al hacer clic
    boton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   5. BUSCADOR Y FILTROS EN LA RUTA DE APRENDIZAJE
   ========================================================================== */
function inicializarFiltroRuta() {
    const inputBuscador = document.getElementById('buscador-temas');
    const botonLimpiar = document.getElementById('limpiar-buscador');
    const botonesNivel = document.querySelectorAll('.boton-filtro-nivel');
    const tarjetas = document.querySelectorAll('#ruta .tarjeta');
    const contadorResultados = document.getElementById('contador-resultados-ruta');
    const mensajeVacio = document.getElementById('mensaje-sin-resultados');
    const spanTermino = document.getElementById('termino-busqueda-vacio');
    const botonRestablecer = document.getElementById('boton-restablecer-filtros');
    const bloquesNivel = document.querySelectorAll('.bloque-nivel');

    if (!inputBuscador || tarjetas.length === 0) return;

    let nivelSeleccionado = 'todos';

    function filtrarTarjetas() {
        const textoBusqueda = inputBuscador.value.trim().toLowerCase();
        let totalVisibles = 0;

        tarjetas.forEach(tarjeta => {
            const titulo = tarjeta.querySelector('h3').textContent.toLowerCase();
            const descripcion = tarjeta.querySelector('p').textContent.toLowerCase();
            const bloquePadre = tarjeta.closest('.bloque-nivel');
            const nivelTarjeta = bloquePadre.id.replace('nivel-', ''); // "1", "2" o "3"

            // Validar condición de búsqueda y nivel de dificultad
            const coincideTexto = !textoBusqueda || titulo.includes(textoBusqueda) || descripcion.includes(textoBusqueda);
            const coincideNivel = (nivelSeleccionado === 'todos' || nivelSeleccionado === nivelTarjeta);

            if (coincideTexto && coincideNivel) {
                tarjeta.style.display = '';
                totalVisibles++;
            } else {
                tarjeta.style.display = 'none';
            }
        });

        // Ocultar cabeceras de niveles que no tengan tarjetas visibles
        bloquesNivel.forEach(bloque => {
            const tarjetasVisiblesEnBloque = bloque.querySelectorAll('.tarjeta:not([style*="display: none"])');
            if (tarjetasVisiblesEnBloque.length === 0) {
                bloque.style.display = 'none';
            } else {
                bloque.style.display = '';
            }
        });

        // Actualizar contador
        if (contadorResultados) {
            contadorResultados.innerHTML = `Mostrando <strong>${totalVisibles}</strong> de ${tarjetas.length} temas`;
        }

        // Mostrar u ocultar mensaje de "no encontrado"
        if (mensajeVacio) {
            if (totalVisibles === 0) {
                mensajeVacio.style.display = 'block';
                if (spanTermino) spanTermino.textContent = textoBusqueda;
            } else {
                mensajeVacio.style.display = 'none';
            }
        }

        // Mostrar u ocultar botón de limpiar búsqueda
        if (botonLimpiar) {
            botonLimpiar.style.display = textoBusqueda ? 'inline-flex' : 'none';
        }
    }

    // Evento de escribir en el buscador
    inputBuscador.addEventListener('input', filtrarTarjetas);

    // Botón de la X para limpiar
    if (botonLimpiar) {
        botonLimpiar.addEventListener('click', () => {
            inputBuscador.value = '';
            filtrarTarjetas();
            inputBuscador.focus();
        });
    }

    // Botones de filtro por nivel de dificultad
    botonesNivel.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesNivel.forEach(b => b.classList.remove('activo'));
            boton.classList.add('activo');
            nivelSeleccionado = boton.getAttribute('data-filtro') || 'todos';
            filtrarTarjetas();
        });
    });

    // Botón para restablecer búsqueda
    if (botonRestablecer) {
        botonRestablecer.addEventListener('click', () => {
            inputBuscador.value = '';
            nivelSeleccionado = 'todos';
            botonesNivel.forEach(b => {
                b.classList.toggle('activo', b.getAttribute('data-filtro') === 'todos');
            });
            filtrarTarjetas();
        });
    }
}

/* ==========================================================================
   6. BOTÓN COPIAR CÓDIGO
   ========================================================================== */
function inicializarCopiarCodigo() {
    const botonesCopiar = document.querySelectorAll('.boton-copiar-codigo');

    botonesCopiar.forEach(boton => {
        boton.addEventListener('click', () => {
            const contenedor = boton.closest('.bloque-codigo-contenedor');
            const elementoCodigo = contenedor.querySelector('pre code');

            if (!elementoCodigo) return;

            const textoACopiar = elementoCodigo.innerText;

            // Uso de la API estándar del portapapeles
            navigator.clipboard.writeText(textoACopiar).then(() => {
                const textoOriginal = boton.innerHTML;
                boton.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';

                setTimeout(() => {
                    boton.innerHTML = textoOriginal;
                }, 2000);
            }).catch(() => {
                alert('Código copiado al portapapeles');
            });
        });
    });
}

/* ==========================================================================
   7. CONTROL DE PREGUNTAS FRECUENTES (FAQ)
   ========================================================================== */
function inicializarFAQ() {
    const inputBuscador = document.getElementById('buscador-faq');
    const btnExpandir = document.getElementById('btn-faq-expandir');
    const btnColapsar = document.getElementById('btn-faq-colapsar');
    const listaDetails = document.querySelectorAll('#contenedor-preguntas-faq details');
    const mensajeSinResultados = document.getElementById('faq-sin-resultados');

    if (listaDetails.length === 0) return;

    // Botón para abrir todas las preguntas
    if (btnExpandir) {
        btnExpandir.addEventListener('click', () => {
            listaDetails.forEach(d => { d.open = true; });
        });
    }

    // Botón para cerrar todas las preguntas
    if (btnColapsar) {
        btnColapsar.addEventListener('click', () => {
            listaDetails.forEach(d => { d.open = false; });
        });
    }

    // Buscador sencillo de preguntas frecuentes
    if (inputBuscador) {
        inputBuscador.addEventListener('input', () => {
            const palabra = inputBuscador.value.trim().toLowerCase();
            let encontradas = 0;

            listaDetails.forEach(d => {
                const pregunta = d.querySelector('.resumen-pregunta').textContent.toLowerCase();
                const respuesta = d.querySelector('p').textContent.toLowerCase();

                if (!palabra || pregunta.includes(palabra) || respuesta.includes(palabra)) {
                    d.style.display = '';
                    if (palabra) d.open = true; // Abre automáticamente la coincidencia
                    encontradas++;
                } else {
                    d.style.display = 'none';
                }
            });

            if (mensajeSinResultados) {
                mensajeSinResultados.style.display = (encontradas === 0) ? 'block' : 'none';
            }
        });
    }
}

/* ==========================================================================
   8. FORMULARIO DE SUGERENCIAS Y VALIDACIÓN
   ========================================================================== */
function inicializarFormulario() {
    const formulario = document.getElementById('formulario-sugerencias');
    const inputNombre = document.getElementById('nombre');
    const inputEmail = document.getElementById('email');
    const selectTipo = document.getElementById('tipo-sugerencia');
    const textareaMensaje = document.getElementById('mensaje-sugerencia');
    const contador = document.getElementById('contador-caracteres');
    const toast = document.getElementById('toast-notificacion');

    if (!formulario || !textareaMensaje) return;

    // Contador de caracteres en tiempo real
    textareaMensaje.addEventListener('input', () => {
        const cantidad = textareaMensaje.value.length;
        contador.textContent = `${cantidad} / 500 caracteres`;
    });

    // Validación al enviar el formulario
    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar que la página se recargue

        let esValido = true;

        // Limpiar errores previos
        document.getElementById('error-nombre').textContent = '';
        document.getElementById('error-email').textContent = '';
        document.getElementById('error-tipo').textContent = '';
        document.getElementById('error-mensaje').textContent = '';

        // 1. Validar Nombre
        if (inputNombre.value.trim().length < 3) {
            document.getElementById('error-nombre').textContent = 'Ingresa un nombre de al menos 3 caracteres.';
            esValido = false;
        }

        // 2. Validar Email
        const emailValor = inputEmail.value.trim();
        if (!emailValor.includes('@') || !emailValor.includes('.')) {
            document.getElementById('error-email').textContent = 'Ingresa un correo electrónico válido.';
            esValido = false;
        }

        // 3. Validar Tipo de sugerencia
        if (!selectTipo.value) {
            document.getElementById('error-tipo').textContent = 'Por favor selecciona un tipo de sugerencia.';
            esValido = false;
        }

        // 4. Validar Mensaje
        if (textareaMensaje.value.trim().length < 15) {
            document.getElementById('error-mensaje').textContent = 'El mensaje debe tener al menos 15 caracteres.';
            esValido = false;
        }

        // Si todo es correcto
        if (esValido) {
            const nombreVal = inputNombre.value.trim();
            const emailVal = inputEmail.value.trim();
            const tipoVal = selectTipo.options[selectTipo.selectedIndex].text;
            const mensajeVal = textareaMensaje.value.trim();
            const selectCasoLimite = document.getElementById('caso-limite');
            const casoLimiteTexto = selectCasoLimite && selectCasoLimite.value !== 'no_aplica'
                ? selectCasoLimite.options[selectCasoLimite.selectedIndex].text
                : 'General / No aplica';

            // 1. Abrir Modal de Confirmación si existe en la página
            const modalConfirmacion = document.getElementById('modal-confirmacion-sugerencia');
            const cuerpoConfirmacion = document.getElementById('modal-confirmacion-cuerpo');

            if (modalConfirmacion && cuerpoConfirmacion) {
                cuerpoConfirmacion.innerHTML = `
                    <p>Hemos recibido tus comentarios correctamente. Aquí tienes el resumen registrado:</p>
                    <ul class="modal-resumen-lista">
                        <li class="modal-resumen-item">
                            <strong>Estudiante / Remitente:</strong>
                            <span>${nombreVal}</span>
                        </li>
                        <li class="modal-resumen-item">
                            <strong>Correo de Contacto:</strong>
                            <span>${emailVal}</span>
                        </li>
                        <li class="modal-resumen-item">
                            <strong>Categoría:</strong>
                            <span>${tipoVal}</span>
                        </li>
                        <li class="modal-resumen-item">
                            <strong>Caso de Prueba Límite:</strong>
                            <span>${casoLimiteTexto}</span>
                        </li>
                        <li class="modal-resumen-item">
                            <strong>Propuesta:</strong>
                            <span>${mensajeVal}</span>
                        </li>
                    </ul>
                    <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 12px;">
                        Tu aporte será revisado para seguir enriqueciendo los módulos de AlgoSchool DSA.
                    </p>
                `;
                abrirModalGlobal(modalConfirmacion);
            }

            // 2. Notificación Toast complementaria
            if (toast) {
                toast.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>¡Sugerencia enviada con éxito!</span>';
                toast.className = 'toast-notificacion exito visible';

                setTimeout(() => {
                    toast.classList.remove('visible');
                }, 3500);
            }

            // Reiniciar el formulario
            formulario.reset();
            contador.textContent = '0 / 500 caracteres';
        }
    });
}

/* ==========================================================================
   9. SISTEMA DE MODALES REUTILIZABLE (Ruta, Complejidad y Soporte)
   ========================================================================== */
function abrirModalGlobal(modal) {
    if (!modal) return;
    modal.classList.add('activo');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const botonCerrar = modal.querySelector('.modal-boton-cerrar');
    if (botonCerrar) botonCerrar.focus();
}

function cerrarModalGlobal(modal) {
    if (!modal) return;
    modal.classList.remove('activo');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function inicializarModales() {
    // 1. Manejo universal de cierre para todos los modales (botones y fondo)
    const todosLosModales = document.querySelectorAll('.modal-superposicion');
    todosLosModales.forEach(modal => {
        const botonesCerrar = modal.querySelectorAll('[data-cerrar-modal]');
        botonesCerrar.forEach(btn => {
            btn.addEventListener('click', () => cerrarModalGlobal(modal));
        });

        // Cierre al hacer clic en el fondo oscuro
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                cerrarModalGlobal(modal);
            }
        });
    });

    // Cierre con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modalAbierto = document.querySelector('.modal-superposicion.activo');
            if (modalAbierto) cerrarModalGlobal(modalAbierto);
        }
    });

    // 2. MODAL FICHA TÉCNICA EN LA RUTA (ruta.html)
    inicializarModalFichaRuta();

    // 3. MODAL ANÁLISIS DE COMPLEJIDAD (complejidad.html)
    inicializarModalComplejidad();
}

/* Base de datos de fichas técnicas para la Ruta de Aprendizaje */
function inicializarModalFichaRuta() {
    const modalRuta = document.getElementById('modal-ficha-algoritmo');
    if (!modalRuta) return;

    const tituloModal = document.getElementById('modal-ficha-titulo');
    const cuerpoModal = document.getElementById('modal-ficha-cuerpo');
    const enlaceSimulador = document.getElementById('modal-ficha-simulador');
    const enlaceWiki = document.getElementById('modal-ficha-wiki');
    const botonesFicha = document.querySelectorAll('.enlace-ficha[data-tema]');

    const datosFichas = {
        arreglos: {
            titulo: 'Arreglos (Arrays)',
            icono: 'fa-layer-group',
            categoria: 'Nivel 1: Conceptos Básicos y Estructuras Lineales',
            descripcion: 'Colección secuencial de elementos de tipo homogéneo alojados en posiciones de memoria RAM físicamente contiguas. El acceso por índice es instantáneo al calcular directamente la dirección de memoria física mediante la fórmula: dirección = base + (índice × tamaño_elemento).',
            metricas: {
                acceso: 'O(1)',
                busqueda: 'O(n)',
                insercion: 'O(n)',
                espacio: 'O(n)'
            },
            casoUso: 'Ideal cuando se conoce el tamaño total de antemano y se requiere lecturas frecuentes por posición. Desfavorable si se realizan inserciones o eliminaciones constantes al inicio o al medio.',
            wiki: 'https://es.wikipedia.org/wiki/Vector_(inform%C3%A1tica)',
            simulador: 'https://visualgo.net/es/array'
        },
        strings: {
            titulo: 'Cadenas (Strings)',
            icono: 'fa-font',
            categoria: 'Nivel 1: Conceptos Básicos y Estructuras Lineales',
            descripcion: 'Secuencia indexada de caracteres codificados (generalmente ASCII o UTF-8). En muchos lenguajes (como Java o Python) son inmutables en memoria, lo que significa que cualquier modificación genera una nueva copia completa.',
            metricas: {
                acceso: 'O(1)',
                busqueda: 'O(n)',
                subcadena: 'O(k)',
                espacio: 'O(n)'
            },
            casoUso: 'Procesamiento de texto, análisis léxico, validaciones de formato y algoritmos de coincidencia de patrones (KMP, Rabin-Karp).',
            wiki: 'https://es.wikipedia.org/wiki/Cadena_de_caracteres',
            simulador: 'https://visualgo.net/es/suffixstack'
        },
        listas: {
            titulo: 'Listas Enlazadas (Linked Lists)',
            icono: 'fa-link',
            categoria: 'Nivel 1: Conceptos Básicos y Estructuras Lineales',
            descripcion: 'Estructura dinámica formada por nodos dispersos en la memoria Heap. Cada nodo almacena su dato y uno o dos punteros que referencian al siguiente (o anterior) nodo en la secuencia.',
            metricas: {
                acceso: 'O(n)',
                busqueda: 'O(n)',
                insercion: 'O(1) extremo',
                espacio: 'O(n)'
            },
            casoUso: 'Excelente cuando la cantidad de datos varía impredeciblemente y se requieren inserciones o supresiones continuas en cabeza o cola sin desplazar bloques de memoria.',
            wiki: 'https://es.wikipedia.org/wiki/Lista_enlazada',
            simulador: 'https://visualgo.net/es/list'
        },
        recursion: {
            titulo: 'Recursividad (Recursion)',
            icono: 'fa-arrows-rotate',
            categoria: 'Nivel 1: Conceptos Básicos y Estructuras Lineales',
            descripcion: 'Técnica algorítmica donde una función se invoca a sí misma para resolver instancias progresivamente más pequeñas del mismo problema, utilizando la pila de llamadas (Call Stack) hasta alcanzar una condición base.',
            metricas: {
                llamada: 'O(1)',
                profundidad: 'O(d)',
                pila_ram: 'O(d)',
                espacio: 'O(d)'
            },
            casoUso: 'Estructura natural para recorrer árboles, grafos, backtracking (Laberintos, N-Reinas) y algoritmos divide y vencerás (Divide & Conquer).',
            wiki: 'https://es.wikipedia.org/wiki/Recursi%C3%B3n',
            simulador: 'https://algorithm-visualizer.org/backtracking/n-queens-problem'
        },
        pilas_colas: {
            titulo: 'Pilas y Colas (Stacks & Queues)',
            icono: 'fa-cubes-stacked',
            categoria: 'Nivel 2: Control de Acceso y Algoritmos Divide & Conquer',
            descripcion: 'Estructuras con políticas estrictas de orden: Pila opera como LIFO (Last In, First Out) y Cola como FIFO (First In, First Out). Garantizan tiempo constante estricto en inserción y extracción.',
            metricas: {
                push_enqueue: 'O(1)',
                pop_dequeue: 'O(1)',
                top_front: 'O(1)',
                espacio: 'O(n)'
            },
            casoUso: 'Pilas: botón "Deshacer" (Undo), balanceo de paréntesis y Call Stack. Colas: colas de impresión, procesamiento de tareas en backend y algoritmos de búsqueda BFS.',
            wiki: 'https://es.wikipedia.org/wiki/Pila_(inform%C3%A1tica)',
            simulador: 'https://visualgo.net/es/stack'
        },
        ordenamiento: {
            titulo: 'Ordenamiento (QuickSort / MergeSort)',
            icono: 'fa-arrow-down-short-wide',
            categoria: 'Nivel 2: Control de Acceso y Algoritmos Divide & Conquer',
            descripcion: 'Algoritmos fundamentales para organizar colecciones. MergeSort divide el arreglo a la mitad recursivamente y combina en O(n log n) garantizado. QuickSort selecciona un pivote y particiona los elementos.',
            metricas: {
                mejor_caso: 'O(n log n)',
                promedio: 'O(n log n)',
                peor_caso: 'O(n²)*',
                espacio: 'O(log n)'
            },
            casoUso: 'Preparación de datos para búsqueda binaria, generación de reportes ordenados y optimización de consultas en motores de bases de datos.',
            wiki: 'https://es.wikipedia.org/wiki/Quicksort',
            simulador: 'https://algorithm-visualizer.org/divide-and-conquer/quicksort'
        },
        busqueda_binaria: {
            titulo: 'Búsqueda Binaria (Binary Search)',
            icono: 'fa-magnifying-glass',
            categoria: 'Nivel 2: Control de Acceso y Algoritmos Divide & Conquer',
            descripcion: 'Algoritmo óptimo de búsqueda sobre colecciones previamente ordenadas. Compara el valor buscado con el elemento central; si no coincide, descarta la mitad del arreglo y repite el proceso en tiempo logarítmico.',
            metricas: {
                mejor_caso: 'O(1)',
                promedio: 'O(log n)',
                peor_caso: 'O(log n)',
                espacio: 'O(1)'
            },
            casoUso: 'Búsqueda instantánea en diccionarios, índices B-Tree de bases de datos relacionales y resolución de problemas de optimización paramétrica.',
            wiki: 'https://es.wikipedia.org/wiki/B%C3%BAsqueda_binaria',
            simulador: 'https://visualgo.net/es/search'
        },
        tablas_hash: {
            titulo: 'Tablas Hash (Hash Maps)',
            icono: 'fa-hashtag',
            categoria: 'Nivel 2: Control de Acceso y Algoritmos Divide & Conquer',
            descripcion: 'Estructura asociativa clave-valor que transforma la clave en un índice numérico mediante una función matemática de hash. Permite acceso, inserción y eliminación en tiempo constante promedio.',
            metricas: {
                acceso_prom: 'O(1)',
                busqueda_prom: 'O(1)',
                insercion_prom: 'O(1)',
                espacio: 'O(n)'
            },
            casoUso: 'Almacenamiento en caché (Redis, Memcached), indexación de sesiones de usuario, tablas de símbolos de compiladores y conteo de frecuencias.',
            wiki: 'https://es.wikipedia.org/wiki/Tabla_hash',
            simulador: 'https://visualgo.net/es/hashtable'
        },
        arboles: {
            titulo: 'Árboles Binarios de Búsqueda (BST)',
            icono: 'fa-sitemap',
            categoria: 'Nivel 3: Estructuras No Lineales, Grafos y Programación Dinámica',
            descripcion: 'Estructura jerárquica no lineal donde cada nodo tiene a lo sumo dos hijos. Cumple la propiedad de orden: todos los valores del subárbol izquierdo son menores que la raíz y los del derecho son mayores.',
            metricas: {
                acceso: 'O(log n)',
                busqueda: 'O(log n)',
                insercion: 'O(log n)',
                espacio: 'O(n)'
            },
            casoUso: 'Mapas y conjuntos ordenados (std::map en C++, TreeMap en Java), sistemas de archivos jerárquicos y tablas de decisión.',
            wiki: 'https://es.wikipedia.org/wiki/%C3%81rbol_binario_de_b%C3%BAsqueda',
            simulador: 'https://visualgo.net/es/bst'
        },
        grafos: {
            titulo: 'Grafos & Algoritmo de Dijkstra',
            icono: 'fa-diagram-project',
            categoria: 'Nivel 3: Estructuras No Lineales, Grafos y Programación Dinámica',
            descripcion: 'Conjunto de vértices (nodos) conectados por aristas con peso. El algoritmo de Dijkstra calcula el camino más corto desde un nodo origen a todos los demás explorando siempre el vértice de menor costo acumulado.',
            metricas: {
                recorrido: 'O(V + E)',
                dijkstra: 'O(E log V)',
                espacio_grafo: 'O(V + E)',
                espacio_cola: 'O(V)'
            },
            casoUso: 'Cálculo de rutas de navegación satelital (Google Maps, Waze), protocolos de enrutamiento en redes de Internet (OSPF) y redes sociales.',
            wiki: 'https://es.wikipedia.org/wiki/Algoritmo_de_Dijkstra',
            simulador: 'https://visualgo.net/es/sssp'
        },
        dinamica: {
            titulo: 'Programación Dinámica (Dynamic Programming)',
            icono: 'fa-brain',
            categoria: 'Nivel 3: Estructuras No Lineales, Grafos y Programación Dinámica',
            descripcion: 'Paradigma de optimización que resuelve problemas con subestructura óptima y subproblemas superpuestos. Evita recalcular soluciones almacenándolas en memoria mediante memoización (top-down) o tabulación (bottom-up).',
            metricas: {
                tiempo: 'O(subproblemas)',
                espacio: 'O(tabla)',
                reutilizacion: 'O(1)',
                eficiencia: 'Exponencial a Polinomial'
            },
            casoUso: 'Problema de la Mochila (Knapsack), alineamiento de secuencias de ADN (Needleman-Wunsch), cálculo de distancias de edición (Levenshtein) y finanzas.',
            wiki: 'https://es.wikipedia.org/wiki/Programaci%C3%B3n_din%C3%A1mica',
            simulador: 'https://visualgo.net/es/dp'
        },
        monticulos: {
            titulo: 'Montículos (Heaps / Colas de Prioridad)',
            icono: 'fa-mountain',
            categoria: 'Nivel 3: Estructuras No Lineales, Grafos y Programación Dinámica',
            descripcion: 'Árbol binario completo implementado eficientemente sobre un arreglo contiguo. En un Max-Heap, la raíz siempre almacena el valor mayor; en un Min-Heap almacena el menor, permitiendo consultar el extremo prioritario en O(1).',
            metricas: {
                consultar_max_min: 'O(1)',
                insercion: 'O(log n)',
                extraccion: 'O(log n)',
                heapify: 'O(n)'
            },
            casoUso: 'Colas de prioridad para planificadores de CPU del sistema operativo, algoritmo de Dijkstra y algoritmo de ordenamiento HeapSort.',
            wiki: 'https://es.wikipedia.org/wiki/Mont%C3%ADculo_(inform%C3%A1tica)',
            simulador: 'https://visualgo.net/es/heap'
        }
    };

    botonesFicha.forEach(btn => {
        btn.addEventListener('click', () => {
            const temaKey = btn.getAttribute('data-tema');
            const data = datosFichas[temaKey];
            if (!data) return;

            tituloModal.innerHTML = `<i class="fa-solid ${data.icono}"></i> ${data.titulo}`;
            cuerpoModal.innerHTML = `
                <div class="modal-seccion-bloque">
                    <span style="font-size: 0.75rem; color: var(--color-primary); font-weight: 700; text-transform: uppercase; font-family: var(--font-mono);">${data.categoria}</span>
                    <p style="margin-top: 8px;">${data.descripcion}</p>
                </div>

                <div class="modal-seccion-bloque">
                    <strong>Rendimiento y Complejidad Asintótica:</strong>
                    <div class="modal-rejilla-metricas">
                        ${Object.entries(data.metricas).map(([k, v]) => `
                            <div class="modal-caja-metrica">
                                <span class="etiqueta-metrica">${k.replace('_', ' ')}</span>
                                <span class="valor-metrica">${v}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="modal-seccion-bloque">
                    <strong>Aplicación en Entrevistas y Software Real:</strong>
                    <p>${data.casoUso}</p>
                </div>
            `;

            enlaceSimulador.href = data.simulador;
            enlaceWiki.href = data.wiki;

            abrirModalGlobal(modalRuta);
        });
    });
}

/* Base de datos de análisis asintótico para la tabla de Complejidad */
function inicializarModalComplejidad() {
    const modalComplejidad = document.getElementById('modal-detalle-complejidad');
    if (!modalComplejidad) return;

    const tituloModal = document.getElementById('modal-complejidad-titulo');
    const cuerpoModal = document.getElementById('modal-complejidad-cuerpo');
    const enlaceWiki = document.getElementById('modal-complejidad-wiki');
    const botonesAnalisis = document.querySelectorAll('.btn-modal-complejidad[data-estructura]');

    const datosComplejidad = {
        arreglo: {
            titulo: 'Análisis Asintótico: Arreglo (Array)',
            wiki: 'https://es.wikipedia.org/wiki/Vector_(inform%C3%A1tica)',
            cuerpo: `
                <p>El arreglo almacena elementos de manera <strong>contigua en la memoria física RAM</strong>.</p>
                <div class="modal-seccion-bloque">
                    <strong>¿Por qué el Acceso es O(1)?</strong>
                    <p>El procesador no necesita recorrer los elementos. Conoce la dirección base en memoria y calcula la posición exacta mediante aritmética de punteros en un solo ciclo de reloj: <code>dir = base + (índice × tamaño)</code>.</p>
                </div>
                <div class="modal-seccion-bloque">
                    <strong>¿Por qué la Búsqueda es O(n)?</strong>
                    <p>Si el arreglo no está ordenado, en el peor caso el elemento buscado se encuentra en la última posición o no existe, requiriendo verificar uno a uno los <em>N</em> elementos (búsqueda lineal).</p>
                </div>
                <div class="modal-seccion-bloque">
                    <strong>¿Por qué la Inserción/Eliminación es O(n)?</strong>
                    <p>Insertar o borrar un elemento en la posición 0 obliga al sistema operativo a desplazar los <em>N - 1</em> elementos restantes una celda a la derecha o izquierda en la memoria.</p>
                </div>
            `
        },
        lista: {
            titulo: 'Análisis Asintótico: Lista Enlazada',
            wiki: 'https://es.wikipedia.org/wiki/Lista_enlazada',
            cuerpo: `
                <p>Los nodos se alojan en <strong>direcciones dispersas de memoria Heap</strong> conectados únicamente por punteros.</p>
                <div class="modal-seccion-bloque">
                    <strong>¿Por qué el Acceso y la Búsqueda son O(n)?</strong>
                    <p>No existe aritmética de índices. Para leer el elemento <em>k</em>, la CPU debe saltar obligatoriamente puntero por puntero desde el nodo inicial (Head) hasta llegar a él.</p>
                </div>
                <div class="modal-seccion-bloque">
                    <strong>¿Por qué la Inserción/Eliminación en extremos es O(1)?</strong>
                    <p>No se mueve ningún bloque de datos en memoria. Basta con cambiar el puntero del nodo nuevo para que apunte al siguiente y reasignar el puntero Head en tiempo constante.</p>
                </div>
            `
        },
        pila_cola: {
            titulo: 'Análisis Asintótico: Pilas y Colas',
            wiki: 'https://es.wikipedia.org/wiki/Pila_(inform%C3%A1tica)',
            cuerpo: `
                <p>Son estructuras con <strong>acceso estrictamente restringido</strong> a sus extremos.</p>
                <div class="modal-seccion-bloque">
                    <strong>¿Por qué Inserción y Extracción son siempre O(1)?</strong>
                    <p>En una Pila (LIFO) únicamente se opera sobre el puntero <em>Top</em>. En una Cola (FIFO) se encola por <em>Tail</em> y se desencola por <em>Head</em>. Nunca se itera sobre los elementos internos.</p>
                </div>
                <div class="modal-seccion-bloque">
                    <strong>¿Por qué la Búsqueda de un valor arbitrario es O(n)?</strong>
                    <p>Para comprobar si un elemento intermedio existe, formalmente habría que desapilar o desencolar todos los elementos precedentes uno por uno.</p>
                </div>
            `
        },
        hash: {
            titulo: 'Análisis Asintótico: Tabla Hash',
            wiki: 'https://es.wikipedia.org/wiki/Tabla_hash',
            cuerpo: `
                <p>Estructura basada en la aplicación de una <strong>función matemática de dispersión (Hash Function)</strong>.</p>
                <div class="modal-seccion-bloque">
                    <strong>¿Por qué Búsqueda, Inserción y Borrado son O(1) promedio?</strong>
                    <p>La clave pasa por la función hash y genera directamente el número de celda (bucket) en el arreglo interno, logrando acceso inmediato sin comparaciones sucesivas.</p>
                </div>
                <div class="modal-seccion-bloque">
                    <strong>¿Cuándo ocurre el peor escenario O(n)?</strong>
                    <p>Si la función hash es deficiente y genera colisiones repetitivas (todas las claves van al mismo bucket), la tabla degenera internamente en una lista enlazada.</p>
                </div>
            `
        },
        bst: {
            titulo: 'Análisis Asintótico: Árbol BST Balanceado',
            wiki: 'https://es.wikipedia.org/wiki/%C3%81rbol_binario_de_b%C3%BAsqueda',
            cuerpo: `
                <p>Estructura jerárquica con <strong>particionamiento ordenado</strong> en cada bifurcación.</p>
                <div class="modal-seccion-bloque">
                    <strong>¿Por qué todas las operaciones son O(log n)?</strong>
                    <p>En cada nivel del árbol balanceado (como AVL o Red-Black), comparar con el nodo actual permite descartar la mitad del conjunto de datos restante, lo que resulta en una altura máxima proporcional al logaritmo en base 2 de <em>N</em>.</p>
                </div>
                <div class="modal-seccion-bloque">
                    <strong>¿Qué pasa si el árbol no está balanceado?</strong>
                    <p>Si los datos se insertan ordenados sin balanceo (ej. 1, 2, 3, 4, 5), el árbol degenera en una línea recta y las operaciones se degradan a tiempo lineal <em>O(n)</em>.</p>
                </div>
            `
        }
    };

    botonesAnalisis.forEach(btn => {
        btn.addEventListener('click', () => {
            const estKey = btn.getAttribute('data-estructura');
            const data = datosComplejidad[estKey];
            if (!data) return;

            tituloModal.innerHTML = `<i class="fa-solid fa-chart-line"></i> ${data.titulo}`;
            cuerpoModal.innerHTML = data.cuerpo;
            enlaceWiki.href = data.wiki;

            abrirModalGlobal(modalComplejidad);
        });
    });
}

/* ==========================================================================
   10. HUB MULTIMEDIA: VIDEOTECA Y PODCAST ALGOCAST
   ========================================================================== */
function inicializarMultimediaHub() {
    inicializarVideoPrincipal();
    inicializarPodcastAlgoCast();
}

/**
 * Control del reproductor de video principal y capítulos sincronizados
 */
function inicializarVideoPrincipal() {
    const video = document.getElementById('video-principal-dsa');
    if (!video) return;

    const botonesVelocidad = document.querySelectorAll('.btn-velocidad-media');
    const btnReiniciar = document.getElementById('btn-video-reiniciar');
    const btnPiP = document.getElementById('btn-video-pip');
    const btnPantallaCompleta = document.getElementById('btn-video-pantalla-completa');
    const itemsCapitulos = document.querySelectorAll('.item-capitulo-video');

    // 1. Selector de velocidad
    botonesVelocidad.forEach(btn => {
        btn.addEventListener('click', () => {
            const vel = parseFloat(btn.getAttribute('data-velocidad'));
            video.playbackRate = vel;
            botonesVelocidad.forEach(b => b.classList.remove('activa'));
            btn.classList.add('activa');
        });
    });

    // 2. Reiniciar video
    if (btnReiniciar) {
        btnReiniciar.addEventListener('click', () => {
            video.currentTime = 0;
            video.play();
        });
    }

    // 3. Picture-in-Picture
    if (btnPiP) {
        if (!document.pictureInPictureEnabled) {
            btnPiP.style.display = 'none';
        } else {
            btnPiP.addEventListener('click', async () => {
                try {
                    if (document.pictureInPictureElement) {
                        await document.exitPictureInPicture();
                    } else {
                        await video.requestPictureInPicture();
                    }
                } catch (e) {
                    console.error('Error al activar PiP:', e);
                }
            });
        }
    }

    // 4. Pantalla completa
    if (btnPantallaCompleta) {
        btnPantallaCompleta.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        });
    }

    // 5. Clic en capítulos para saltar al tiempo exacto
    itemsCapitulos.forEach(item => {
        item.addEventListener('click', () => {
            const tiempo = parseFloat(item.getAttribute('data-tiempo'));
            video.currentTime = tiempo;
            video.play();
            actualizarCapituloActivo(tiempo);
        });
    });

    // 6. Sincronizar capítulo activo durante la reproducción
    video.addEventListener('timeupdate', () => {
        actualizarCapituloActivo(video.currentTime);
    });

    function actualizarCapituloActivo(tiempoActual) {
        let capituloActual = null;
        itemsCapitulos.forEach(item => {
            const tiempoItem = parseFloat(item.getAttribute('data-tiempo'));
            if (tiempoActual >= tiempoItem) {
                capituloActual = item;
            }
        });

        if (capituloActual) {
            itemsCapitulos.forEach(item => item.classList.remove('activo'));
            capituloActual.classList.add('activo');
        }
    }
}

/**
 * Control del reproductor interactivo de podcast AlgoCast
 */
function inicializarPodcastAlgoCast() {
    const audio = document.getElementById('audio-algocast');
    if (!audio) return;

    // Elementos de la UI
    const btnPlay = document.getElementById('btn-audio-play');
    const iconoPlay = document.getElementById('icono-audio-play');
    const pistaProgreso = document.getElementById('podcast-pista-progreso');
    const barraRelleno = document.getElementById('podcast-barra-relleno');
    const textoActual = document.getElementById('podcast-tiempo-actual');
    const textoTotal = document.getElementById('podcast-tiempo-total');
    const btnMute = document.getElementById('btn-audio-mute');
    const iconoVolumen = document.getElementById('icono-audio-volumen');

    // Metadatos dinámicos
    const tituloActivo = document.getElementById('podcast-titulo-activo');
    const categoriaActiva = document.getElementById('podcast-tema-categoria');
    const instructorActivo = document.getElementById('podcast-instructor-activo');
    const textoTranscripcion = document.getElementById('podcast-texto-transcripcion');
    const itemsEpisodios = document.querySelectorAll('.item-episodio-podcast');

    // Diccionario de episodios
    const episodiosPodcast = {
        big_o: {
            src: './assets/audio/podcast_big_o.wav',
            titulo: 'Episodio 1: La intuición detrás de Big O y por qué no medimos en segundos',
            categoria: 'Fundamentos Asintóticos',
            instructor: '<i class="fa-solid fa-chalkboard-user"></i> Prof. Algoritmos UTP · Duración: ~12s',
            transcripcion: '«Bienvenidos a AlgoSchool DSA. En esta lección analizamos la notación Big O. Recuerda que no medimos el tiempo en segundos de reloj, sino en el número de operaciones elementales en función del tamaño de entrada N. Esto nos permite comparar algoritmos de forma independiente del hardware.»',
            timestamps: [
                { segundo: 0, etiqueta: '00:00 Introducción a Big O' },
                { segundo: 4, etiqueta: '00:04 Por qué ignoramos el reloj' },
                { segundo: 8, etiqueta: '00:08 Operaciones elementales en función de N' }
            ]
        },
        recursion: {
            src: './assets/audio/podcast_recursion.wav',
            titulo: 'Episodio 2: Recursión vs Iteración y el Call Stack',
            categoria: 'Control de Flujo y Memoria',
            instructor: '<i class="fa-solid fa-chalkboard-user"></i> Prof. Algoritmos UTP · Duración: ~14s',
            transcripcion: '«Episodio dos de AlgoSchool. Recursión versus iteración. Cada llamada recursiva añade un nuevo marco a la pila de llamadas (Call Stack), consumiendo memoria auxiliar O de N en el peor de los casos, a menos que el compilador optimice la recursión de cola.»',
            timestamps: [
                { segundo: 0, etiqueta: '00:00 Marcos en el Call Stack' },
                { segundo: 5, etiqueta: '00:05 Consumo de memoria O(N)' },
                { segundo: 10, etiqueta: '00:10 Optimización de cola (TCO)' }
            ]
        },
        tecnicas: {
            src: './assets/audio/podcast_tecnicas.wav',
            titulo: 'Episodio 3: Estrategia de Dos Punteros en Arreglos',
            categoria: 'Estrategias de Entrevista',
            instructor: '<i class="fa-solid fa-chalkboard-user"></i> Prof. Algoritmos UTP · Duración: ~12s',
            transcripcion: '«Episodio tres. Estrategia de resolución técnica. Al enfrentarte a un problema en entrevistas, aplica la técnica de dos punteros cuando tengas un arreglo ordenado y busques pares que sumen un valor objetivo en tiempo lineal O de N.»',
            timestamps: [
                { segundo: 0, etiqueta: '00:00 El patrón Two Pointers' },
                { segundo: 4, etiqueta: '00:04 Arreglos ordenados' },
                { segundo: 8, etiqueta: '00:08 Reducción de O(N²) a O(N)' }
            ]
        }
    };

    function formatearTiempo(segundos) {
        if (isNaN(segundos) || segundos < 0) return '00:00';
        const mins = Math.floor(segundos / 60);
        const secs = Math.floor(segundos % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // 1. Play / Pause
    if (btnPlay) {
        btnPlay.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                iconoPlay.classList.replace('fa-play', 'fa-pause');
                btnPlay.setAttribute('aria-label', 'Pausar episodio');
            } else {
                audio.pause();
                iconoPlay.classList.replace('fa-pause', 'fa-play');
                btnPlay.setAttribute('aria-label', 'Reproducir episodio');
            }
        });
    }

    // 2. Progreso y tiempo
    audio.addEventListener('timeupdate', () => {
        textoActual.textContent = formatearTiempo(audio.currentTime);
        const porcentaje = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
        barraRelleno.style.width = `${porcentaje}%`;
        if (pistaProgreso) {
            pistaProgreso.setAttribute('aria-valuenow', Math.floor(porcentaje));
        }
    });

    audio.addEventListener('loadedmetadata', () => {
        textoTotal.textContent = formatearTiempo(audio.duration);
    });

    audio.addEventListener('ended', () => {
        iconoPlay.classList.replace('fa-pause', 'fa-play');
        btnPlay.setAttribute('aria-label', 'Reproducir episodio');
        barraRelleno.style.width = '0%';
        textoActual.textContent = '00:00';
    });

    // 3. Salto en la barra de progreso al hacer clic
    if (pistaProgreso) {
        pistaProgreso.addEventListener('click', (e) => {
            const rect = pistaProgreso.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            if (audio.duration) {
                audio.currentTime = clickPos * audio.duration;
            }
        });
    }

    // 4. Silenciar / activar sonido
    if (btnMute && iconoVolumen) {
        btnMute.addEventListener('click', () => {
            audio.muted = !audio.muted;
            if (audio.muted) {
                iconoVolumen.classList.replace('fa-volume-high', 'fa-volume-xmark');
                btnMute.setAttribute('title', 'Reactivar sonido');
            } else {
                iconoVolumen.classList.replace('fa-volume-xmark', 'fa-volume-high');
                btnMute.setAttribute('title', 'Silenciar');
            }
        });
    }

    // 7. Cambio dinámico de episodios desde la playlist
    itemsEpisodios.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-audio-id');
            const data = episodiosPodcast[id];
            if (!data) return;

            // Actualizar playlist visual
            itemsEpisodios.forEach(it => {
                it.classList.remove('activo');
                const icono = it.querySelector('.episodio-estado-icono i');
                if (icono) {
                    icono.className = 'fa-solid fa-play';
                }
            });
            item.classList.add('activo');
            const iconoActivo = item.querySelector('.episodio-estado-icono i');
            if (iconoActivo) {
                iconoActivo.className = 'fa-solid fa-volume-high';
            }

            // Actualizar metadatos del reproductor
            audio.src = data.src;
            tituloActivo.textContent = data.titulo;
            categoriaActiva.textContent = data.categoria;
            instructorActivo.innerHTML = data.instructor;
            textoTranscripcion.innerHTML = `<p><em>${data.transcripcion}</em></p>`;

            // Iniciar reproducción del nuevo episodio
            audio.play();
            iconoPlay.classList.replace('fa-play', 'fa-pause');
            btnPlay.setAttribute('aria-label', 'Pausar episodio');
        });
    });
}

/* ==========================================================================
   11. DESAFÍO ALGORÍTMICO DEL DÍA (index.html)
   ========================================================================== */
function inicializarDesafioDiario() {
    const contenedor = document.getElementById('tarjeta-desafio-diario');
    if (!contenedor) return;

    const textoPregunta = document.getElementById('desafio-pregunta');
    const contenedorOpciones = document.getElementById('desafio-opciones');
    const retroalimentacion = document.getElementById('desafio-retroalimentacion');
    const btnVerificar = document.getElementById('btn-verificar-desafio');
    const btnSiguiente = document.getElementById('btn-siguiente-desafio');

    const bancoDesafios = [
        {
            pregunta: '¿Cuál es la complejidad temporal promedio para buscar un elemento por clave en una Tabla Hash bien dimensionada?',
            opciones: ['O(1) — Tiempo constante', 'O(log n) — Tiempo logarítmico', 'O(n) — Tiempo lineal', 'O(n²) — Tiempo cuadrático'],
            correcta: 0,
            explicacion: '¡Correcto! Una función de dispersión uniforme mapea la clave directamente al bucket de memoria RAM en tiempo constante O(1), sin requerir comparaciones secuenciales.'
        },
        {
            pregunta: '¿Qué estructura de datos es la más adecuada para implementar el historial de "Deshacer" (Undo) en aplicaciones de software?',
            opciones: ['Cola FIFO (Queue)', 'Pila LIFO (Stack)', 'Árbol BST Balanceado', 'Grafo no dirigido'],
            correcta: 1,
            explicacion: '¡Excelente! La Pila sigue la disciplina Last-In First-Out (LIFO), lo que permite recuperar y revertir el último estado registrado en tiempo O(1) con la operación Pop.'
        },
        {
            pregunta: 'En una Búsqueda Binaria sobre un arreglo ordenado de 1,024 elementos, ¿cuántas comparaciones como máximo se necesitan en el peor de los casos?',
            opciones: ['10 comparaciones', '512 comparaciones', '1,024 comparaciones', '32 comparaciones'],
            correcta: 0,
            explicacion: '¡Exacto! La búsqueda binaria descarta la mitad de los elementos en cada paso. Como log₂(1024) = 10, se requieren como máximo 10 comparaciones para hallar cualquier elemento o determinar su ausencia.'
        },
        {
            pregunta: '¿Qué estructura de datos permite al Algoritmo de Dijkstra extraer eficientemente en cada paso el vértice no visitado de menor distancia?',
            opciones: ['Min-Heap / Cola de Prioridad', 'Lista enlazada sin ordenar', 'Pila recursiva', 'Matriz de adyacencia directa'],
            correcta: 0,
            explicacion: '¡Correcto! Una Cola de Prioridad implementada con Min-Heap permite extraer el valor mínimo acumulado en O(log V), logrando una cota óptima de O(E log V).'
        }
    ];

    let indiceDesafio = parseInt(localStorage.getItem('algoschool_desafio_idx') || '0', 10);
    if (isNaN(indiceDesafio) || indiceDesafio >= bancoDesafios.length) indiceDesafio = 0;

    let opcionSeleccionada = null;

    function renderizarDesafio() {
        const item = bancoDesafios[indiceDesafio];
        textoPregunta.textContent = item.pregunta;
        opcionSeleccionada = null;

        if (retroalimentacion) {
            retroalimentacion.style.display = 'none';
            retroalimentacion.className = 'desafio-retroalimentacion';
            retroalimentacion.innerHTML = '';
        }

        if (btnVerificar) {
            btnVerificar.style.display = 'inline-flex';
            btnVerificar.disabled = true;
        }

        contenedorOpciones.innerHTML = item.opciones.map((opt, i) => `
            <label class="opcion-desafio-label" style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: var(--bg-alt); border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer; transition: all 0.2s ease;">
                <input type="radio" name="desafio-radio" value="${i}" style="cursor: pointer;">
                <span style="font-size: 0.9rem; color: var(--text-primary);">${opt}</span>
            </label>
        `).join('');

        const radios = contenedorOpciones.querySelectorAll('input[name="desafio-radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                opcionSeleccionada = parseInt(e.target.value, 10);
                if (btnVerificar) btnVerificar.disabled = false;
            });
        });
    }

    if (btnVerificar) {
        btnVerificar.addEventListener('click', () => {
            if (opcionSeleccionada === null) return;
            const item = bancoDesafios[indiceDesafio];
            const esCorrecto = (opcionSeleccionada === item.correcta);

            // Deshabilitar radios
            const labels = contenedorOpciones.querySelectorAll('.opcion-desafio-label');
            labels.forEach((label, i) => {
                const radio = label.querySelector('input');
                radio.disabled = true;
                if (i === item.correcta) {
                    label.style.borderColor = '#10b981';
                    label.style.background = 'rgba(16, 185, 129, 0.08)';
                } else if (i === opcionSeleccionada && !esCorrecto) {
                    label.style.borderColor = '#ef4444';
                    label.style.background = 'rgba(239, 68, 68, 0.08)';
                }
            });

            if (retroalimentacion) {
                retroalimentacion.style.display = 'block';
                if (esCorrecto) {
                    retroalimentacion.innerHTML = `
                        <p style="color: #10b981; font-weight: 600; margin: 0 0 6px 0;"><i class="fa-solid fa-circle-check"></i> ¡Respuesta correcta!</p>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary);">${item.explicacion}</p>
                    `;
                } else {
                    retroalimentacion.innerHTML = `
                        <p style="color: #ef4444; font-weight: 600; margin: 0 0 6px 0;"><i class="fa-solid fa-circle-xmark"></i> Respuesta incorrecta</p>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary);">${item.explicacion}</p>
                    `;
                }
            }

            btnVerificar.style.display = 'none';
        });
    }

    if (btnSiguiente) {
        btnSiguiente.addEventListener('click', () => {
            indiceDesafio = (indiceDesafio + 1) % bancoDesafios.length;
            localStorage.setItem('algoschool_desafio_idx', indiceDesafio);
            renderizarDesafio();
        });
    }

    renderizarDesafio();
}

/* ==========================================================================
   12. TEST DE DIAGNÓSTICO (index.html)
   ========================================================================== */
function inicializarTestDiagnostico() {
    const contenedor = document.getElementById('tarjeta-diagnostico');
    if (!contenedor) return;

    const textoPaso = document.getElementById('diagnostico-paso-texto');
    const barraRelleno = document.getElementById('barra-diagnostico-relleno');
    const cuerpoDiagnostico = document.getElementById('diagnostico-cuerpo');
    const resultadoDiagnostico = document.getElementById('diagnostico-resultado');

    const preguntas = [
        {
            pregunta: '1. ¿Cuál es tu nivel de familiaridad analizando la complejidad Big O de un bucle?',
            opciones: [
                { texto: 'No comprendo qué significa O(1), O(n) o O(n²).', puntos: 0 },
                { texto: 'Entiendo la diferencia entre tiempo lineal y cuadrático en bucles simples.', puntos: 1 },
                { texto: 'Puedo calcular la recurrencia asintótica con el Teorema Maestro y análisis amortizado.', puntos: 2 }
            ]
        },
        {
            pregunta: '2. ¿Qué experiencia tienes manipulando estructuras con punteros y memoria dinámica?',
            opciones: [
                { texto: 'Solo utilizo arreglos o listas nativas sin pensar en su disposición en memoria RAM.', puntos: 0 },
                { texto: 'He implementado pilas, colas o listas enlazadas enlazando nodos.', puntos: 1 },
                { texto: 'Manejo árboles balanceados (AVL/BST), montículos o grafos con listas de adyacencia.', puntos: 2 }
            ]
        },
        {
            pregunta: '3. ¿Cuál es tu objetivo prioritario de estudio en este momento?',
            opciones: [
                { texto: 'Comprender los fundamentos esenciales para aprobar mi asignatura universitaria.', puntos: 0 },
                { texto: 'Aprender patrones algorítmicos para resolver desafíos en LeetCode o HackerRank.', puntos: 1 },
                { texto: 'Dominar programación dinámica, grafos avanzados y optimizaciones para entrevistas senior.', puntos: 2 }
            ]
        }
    ];

    let pasoActual = 0;
    let puntajeAcumulado = 0;

    function renderizarPaso() {
        if (pasoActual < preguntas.length) {
            const item = preguntas[pasoActual];
            if (textoPaso) textoPaso.textContent = `Pregunta ${pasoActual + 1} de ${preguntas.length}`;
            if (barraRelleno) barraRelleno.style.width = `${((pasoActual + 1) / preguntas.length) * 100}%`;

            cuerpoDiagnostico.style.display = 'block';
            resultadoDiagnostico.style.display = 'none';

            cuerpoDiagnostico.innerHTML = `
                <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 12px; color: var(--text-primary);">${item.pregunta}</p>
                <div class="diagnostico-opciones-lista" style="display: flex; flex-direction: column; gap: 8px;">
                    ${item.opciones.map((opt, i) => `
                        <button type="button" class="btn-opcion-diagnostico" data-puntos="${opt.puntos}" style="text-align: left; padding: 10px 14px; background: var(--bg-alt); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-size: 0.88rem; cursor: pointer; transition: all 0.2s ease;">
                            <i class="fa-regular fa-circle" style="margin-right: 8px; color: var(--text-muted);"></i> ${opt.texto}
                        </button>
                    `).join('')}
                </div>
            `;

            const botones = cuerpoDiagnostico.querySelectorAll('.btn-opcion-diagnostico');
            botones.forEach(btn => {
                btn.addEventListener('click', () => {
                    const pts = parseInt(btn.getAttribute('data-puntos'), 10);
                    puntajeAcumulado += pts;
                    pasoActual++;
                    renderizarPaso();
                });
            });
        } else {
            // Mostrar resultado diagnóstico
            cuerpoDiagnostico.style.display = 'none';
            if (textoPaso) textoPaso.textContent = 'Diagnóstico completado';
            if (barraRelleno) barraRelleno.style.width = '100%';

            let recomendacion = {};
            if (puntajeAcumulado <= 2) {
                recomendacion = {
                    nivel: 'Nivel 1: Conceptos Básicos y Estructuras Lineales',
                    badge: 'Básico',
                    descripcion: 'Te recomendamos iniciar con la teoría de complejidad asintótica Big O, manipulación de arreglos en memoria contigua, cadenas y listas enlazadas.',
                    enlace: 'ruta.html#nivel-1'
                };
            } else if (puntajeAcumulado <= 4) {
                recomendacion = {
                    nivel: 'Nivel 2: Control de Acceso y Algoritmos Divide & Conquer',
                    badge: 'Intermedio',
                    descripcion: 'Cuentas con las bases. Es el momento perfecto para dominar Pilas, Colas, Búsqueda Binaria, Algoritmos de Ordenamiento (MergeSort/QuickSort) y Tablas Hash.',
                    enlace: 'ruta.html#nivel-2'
                };
            } else {
                recomendacion = {
                    nivel: 'Nivel 3: Estructuras No Lineales, Grafos y DP',
                    badge: 'Avanzado',
                    descripcion: 'Posees un sólido dominio previo. Enfréntate directamente a Árboles BST, Heaps de prioridad, Algoritmo de Dijkstra en Grafos y Programación Dinámica.',
                    enlace: 'ruta.html#nivel-3'
                };
            }

            resultadoDiagnostico.style.display = 'block';
            resultadoDiagnostico.innerHTML = `
                <div style="padding: 16px; background: var(--bg-alt); border: 1px solid var(--border-color); border-radius: 8px; margin-top: 8px;">
                    <span style="font-size: 0.75rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-primary); text-transform: uppercase;">Recomendación Personalizada</span>
                    <h4 style="margin: 6px 0 8px 0; color: var(--text-primary);">${recomendacion.nivel}</h4>
                    <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 14px;">${recomendacion.descripcion}</p>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <a href="${recomendacion.enlace}" class="boton-primario" style="font-size: 0.85rem; padding: 8px 14px;">
                            <i class="fa-solid fa-arrow-right"></i> Ir a tu Nivel Recomendado
                        </a>
                        <button type="button" id="btn-reiniciar-diagnostico" class="boton-secundario" style="font-size: 0.85rem; padding: 8px 14px;">
                            <i class="fa-solid fa-rotate-left"></i> Repetir Test
                        </button>
                    </div>
                </div>
            `;

            const btnReset = resultadoDiagnostico.querySelector('#btn-reiniciar-diagnostico');
            if (btnReset) {
                btnReset.addEventListener('click', () => {
                    pasoActual = 0;
                    puntajeAcumulado = 0;
                    renderizarPaso();
                });
            }
        }
    }

    renderizarPaso();
}

/* ==========================================================================
   13. SEGUIMIENTO DE PROGRESO DE LA RUTA (ruta.html)
   ========================================================================== */
function inicializarProgresoRuta() {
    const widgetProgreso = document.getElementById('widget-progreso-estudiante');
    const botonesCheck = document.querySelectorAll('.btn-check-tema');
    const tarjetasRuta = document.querySelectorAll('#ruta .tarjeta[data-tema-id]');
    const textoResumen = document.getElementById('texto-resumen-progreso');
    const barraProgreso = document.getElementById('barra-progreso-fill');
    const btnReiniciar = document.getElementById('btn-reiniciar-progreso');

    if (!widgetProgreso && botonesCheck.length === 0) return;

    const CLAVE_STORAGE = 'algoschool_progreso_ruta';

    function obtenerCompletados() {
        try {
            return JSON.parse(localStorage.getItem(CLAVE_STORAGE) || '[]');
        } catch (e) {
            return [];
        }
    }

    function guardarCompletados(lista) {
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista));
    }

    function actualizarUI() {
        const completados = obtenerCompletados();
        const total = tarjetasRuta.length || 12;
        const totalCompletados = completados.length;
        const porcentaje = Math.round((totalCompletados / total) * 100);

        if (textoResumen) {
            textoResumen.textContent = `${totalCompletados} de ${total} temas completados (${porcentaje}%)`;
        }

        if (barraProgreso) {
            barraProgreso.style.width = `${porcentaje}%`;
            const pista = widgetProgreso.querySelector('.barra-progreso-pista');
            if (pista) pista.setAttribute('aria-valuenow', totalCompletados);
        }

        // Marcar tarjetas y botones
        tarjetasRuta.forEach(tarjeta => {
            const temaId = tarjeta.getAttribute('data-tema-id');
            const estaCompletado = completados.includes(temaId);
            const btn = tarjeta.querySelector('.btn-check-tema');

            if (estaCompletado) {
                tarjeta.classList.add('tema-completado');
                if (btn) {
                    btn.classList.add('activo');
                    btn.setAttribute('title', 'Completado (clic para desmarcar)');
                    btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span class="texto-check">Completado</span>';
                }
            } else {
                tarjeta.classList.remove('tema-completado');
                if (btn) {
                    btn.classList.remove('activo');
                    btn.setAttribute('title', 'Marcar como completado');
                    btn.innerHTML = '<i class="fa-regular fa-circle-check"></i> <span class="texto-check">Completar</span>';
                }
            }
        });
    }

    botonesCheck.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const temaId = btn.getAttribute('data-tema-check');
            if (!temaId) return;

            let completados = obtenerCompletados();
            if (completados.includes(temaId)) {
                completados = completados.filter(id => id !== temaId);
            } else {
                completados.push(temaId);
            }
            guardarCompletados(completados);
            actualizarUI();
        });
    });

    if (btnReiniciar) {
        btnReiniciar.addEventListener('click', () => {
            if (confirm('¿Deseas reiniciar tu progreso guardado en la Ruta de Aprendizaje?')) {
                guardarCompletados([]);
                actualizarUI();
            }
        });
    }

    actualizarUI();
}

/* ==========================================================================
   14. COMPARADOR FRENTE A FRENTE EN MEMORIA RAM (complejidad.html)
   ========================================================================== */
function inicializarComparadorEstructuras() {
    const seccion = document.getElementById('comparador');
    if (!seccion) return;

    const selectEst1 = document.getElementById('comp-estructura-1');
    const selectOp = document.getElementById('comp-operacion');
    const selectEst2 = document.getElementById('comp-estructura-2');
    const rejillaResultado = document.getElementById('resultado-comparador-rejilla');

    if (!selectEst1 || !selectOp || !selectEst2 || !rejillaResultado) return;

    const baseComparador = {
        arreglo: {
            nombre: 'Arreglo Contiguo (Array)',
            icono: 'fa-layer-group',
            memoria: 'Alojado en memoria física estrictamente contigua. Alta eficiencia de CPU Cache L1/L2 por localidad espacial.',
            operaciones: {
                acceso: { o: 'O(1)', ventaja: true, desc: 'Aritmética de punteros instantánea: dir = base + (índice × tamaño_elemento).' },
                busqueda: { o: 'O(n)', ventaja: false, desc: 'Búsqueda lineal evaluando celdas una a una si no está previamente ordenado.' },
                insercion_inicio: { o: 'O(n)', ventaja: false, desc: 'Obliga a desplazar los N elementos una posición hacia la derecha en RAM.' },
                insercion_final: { o: 'O(1)*', ventaja: true, desc: 'Tiempo constante en arreglos fijos o amortizado O(1) si hay reserva en dinámicos.' },
                eliminacion: { o: 'O(n)', ventaja: false, desc: 'Obliga a desplazar todos los elementos restantes a la izquierda para cubrir la vacante.' }
            }
        },
        lista: {
            nombre: 'Lista Enlazada (Linked List)',
            icono: 'fa-link',
            memoria: 'Nodos dispersos en la memoria Heap conectados por punteros. Menor aprovechamiento del CPU Cache.',
            operaciones: {
                acceso: { o: 'O(n)', ventaja: false, desc: 'No hay cálculo directo. Debe saltar secuencialmente de nodo en nodo desde Head.' },
                busqueda: { o: 'O(n)', ventaja: false, desc: 'Recorrido secuencial siguiendo los punteros Next de cada nodo.' },
                insercion_inicio: { o: 'O(1)', ventaja: true, desc: 'Solo reasigna el puntero Head al nuevo nodo sin mover ningún dato en memoria.' },
                insercion_final: { o: 'O(1)', ventaja: true, desc: 'Tiempo constante si se mantiene un puntero al nodo Tail.' },
                eliminacion: { o: 'O(1)*', ventaja: true, desc: 'O(1) si ya se tiene referencia al nodo predecesor; O(n) si requiere búsqueda previa.' }
            }
        },
        pila_cola: {
            nombre: 'Pila / Cola (Stack / Queue)',
            icono: 'fa-cubes-stacked',
            memoria: 'Acceso restringido a los extremos (LIFO o FIFO) protegiendo el orden de inserción.',
            operaciones: {
                acceso: { o: 'O(n)', ventaja: false, desc: 'La indexación directa está prohibida conceptualmente; requiere desapilar/desencolar.' },
                busqueda: { o: 'O(n)', ventaja: false, desc: 'Requiere inspección secuencial extrayendo elementos uno a uno.' },
                insercion_inicio: { o: 'O(1)', ventaja: true, desc: 'Push o Enqueue en tiempo constante estricto en el extremo habilitado.' },
                insercion_final: { o: 'O(1)', ventaja: true, desc: 'Operación atómica en tiempo constante en el extremo.' },
                eliminacion: { o: 'O(1)', ventaja: true, desc: 'Pop o Dequeue extrae el extremo en O(1) sin desplazar la colección.' }
            }
        },
        hash: {
            nombre: 'Tabla Hash (Hash Map)',
            icono: 'fa-hashtag',
            memoria: 'Arreglo de buckets con función hash dispersora y resolución de colisiones en memoria.',
            operaciones: {
                acceso: { o: 'N/A', ventaja: false, desc: 'El acceso se realiza por clave alfanumérica matemática, no por índice de posición numérico.' },
                busqueda: { o: 'O(1)', ventaja: true, desc: 'Localiza el bucket en tiempo constante promedio computando hash(clave).' },
                insercion_inicio: { o: 'O(1)', ventaja: true, desc: 'Inserción asociativa en tiempo constante promedio O(1).' },
                insercion_final: { o: 'O(1)', ventaja: true, desc: 'Inserción asociativa en tiempo constante promedio O(1).' },
                eliminacion: { o: 'O(1)', ventaja: true, desc: 'Borrado directo en el bucket en tiempo constante promedio O(1).' }
            }
        },
        bst: {
            nombre: 'Árbol BST Balanceado',
            icono: 'fa-sitemap',
            memoria: 'Estructura jerárquica no lineal con balanceo en memoria Heap (AVL o Red-Black).',
            operaciones: {
                acceso: { o: 'O(log n)', ventaja: false, desc: 'Desciende por niveles según relación menor/mayor descartando mitades.' },
                busqueda: { o: 'O(log n)', ventaja: true, desc: 'Búsqueda logarítmica óptima en colecciones ordenadas dinámicas.' },
                insercion_inicio: { o: 'O(log n)', ventaja: false, desc: 'Desciende hasta la hoja correspondiente manteniendo el invariante de orden.' },
                insercion_final: { o: 'O(log n)', ventaja: false, desc: 'Desciende hasta la hoja correspondiente manteniendo el invariante de orden.' },
                eliminacion: { o: 'O(log n)', ventaja: false, desc: 'Localiza el nodo y reestructura los punteros del sucesor en tiempo logarítmico.' }
            }
        }
    };

    function actualizarComparador() {
        const id1 = selectEst1.value;
        const id2 = selectEst2.value;
        const op = selectOp.value;

        const est1 = baseComparador[id1];
        const est2 = baseComparador[id2];
        if (!est1 || !est2) return;

        const op1 = est1.operaciones[op];
        const op2 = est2.operaciones[op];

        rejillaResultado.innerHTML = `
            <div class="tarjeta-comparacion-resultado">
                <div class="cabecera-comparacion-item">
                    <h4><i class="fa-solid ${est1.icono}"></i> ${est1.nombre}</h4>
                    <code class="bigo-codigo ${op1.ventaja ? 'bigo-excelente' : 'bigo-bueno'}">${op1.o}</code>
                </div>
                <p class="detalle-operacion-texto"><strong>Comportamiento:</strong> ${op1.desc}</p>
                <div class="nota-memoria-ram">
                    <span class="etiqueta-ram"><i class="fa-solid fa-memory"></i> Disposición en RAM:</span>
                    <p>${est1.memoria}</p>
                </div>
            </div>

            <div class="tarjeta-comparacion-resultado">
                <div class="cabecera-comparacion-item">
                    <h4><i class="fa-solid ${est2.icono}"></i> ${est2.nombre}</h4>
                    <code class="bigo-codigo ${op2.ventaja ? 'bigo-excelente' : 'bigo-bueno'}">${op2.o}</code>
                </div>
                <p class="detalle-operacion-texto"><strong>Comportamiento:</strong> ${op2.desc}</p>
                <div class="nota-memoria-ram">
                    <span class="etiqueta-ram"><i class="fa-solid fa-memory"></i> Disposición en RAM:</span>
                    <p>${est2.memoria}</p>
                </div>
            </div>
        `;
    }

    selectEst1.addEventListener('change', actualizarComparador);
    selectOp.addEventListener('change', actualizarComparador);
    selectEst2.addEventListener('change', actualizarComparador);

    actualizarComparador();
}

/* ==========================================================================
   15. PESTAÑAS MULTILENGUAJE DE CÓDIGO (complejidad.html)
   ========================================================================== */
function inicializarPestanasLenguaje() {
    const grupos = document.querySelectorAll('.pestanas-lenguaje-grupo');
    if (grupos.length === 0) return;

    const snippets = {
        binaria: {
            js: {
                etiqueta: '<i class="fa-brands fa-js"></i> JavaScript ES6 — Búsqueda Binaria',
                codigo: `// Búsqueda Binaria en JavaScript ES6 - Complejidad O(log n)
function busquedaBinaria(arreglo, objetivo) {
    let inicio = 0;
    let fin = arreglo.length - 1;

    while (inicio <= fin) {
        let medio = Math.floor((inicio + fin) / 2);

        if (arreglo[medio] === objetivo) {
            return medio; // Localizado en índice medio
        }
        if (arreglo[medio] < objetivo) {
            inicio = medio + 1; // Descartar mitad izquierda
        } else {
            fin = medio - 1;    // Descartar mitad derecha
        }
    }
    return -1; // Elemento no presente
}`
            },
            python: {
                etiqueta: '<i class="fa-brands fa-python"></i> Python 3 — Búsqueda Binaria',
                codigo: `# Búsqueda Binaria en Python 3 - Complejidad O(log n)
def busqueda_binaria(arreglo: list[int], objetivo: int) -> int:
    inicio = 0
    fin = len(arreglo) - 1

    while inicio <= fin:
        medio = (inicio + fin) // 2

        if arreglo[medio] == objetivo:
            return medio  # Elemento localizado
        elif arreglo[medio] < objetivo:
            inicio = medio + 1  # Descartar mitad izquierda
        else:
            fin = medio - 1     # Descartar mitad derecha

    return -1  # No encontrado`
            },
            cpp: {
                etiqueta: '<i class="fa-solid fa-file-code"></i> C++ Moderno — Búsqueda Binaria',
                codigo: `// Búsqueda Binaria en C++ - Complejidad O(log n)
#include <vector>

int busquedaBinaria(const std::vector<int>& arreglo, int objetivo) {
    int inicio = 0;
    int fin = static_cast<int>(arreglo.size()) - 1;

    while (inicio <= fin) {
        int medio = inicio + (fin - inicio) / 2; // Prevenir overflow

        if (arreglo[medio] == objetivo) {
            return medio;
        }
        if (arreglo[medio] < objetivo) {
            inicio = medio + 1;
        } else {
            fin = medio - 1;
        }
    }
    return -1;
}`
            }
        },
        burbuja: {
            js: {
                etiqueta: '<i class="fa-brands fa-js"></i> JavaScript ES6 — Ordenamiento por Burbuja',
                codigo: `// Ordenamiento por Burbuja en JavaScript ES6 - Complejidad O(n²)
function ordenamientoBurbuja(arreglo) {
    let n = arreglo.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arreglo[j] > arreglo[j + 1]) {
                // Intercambio de valores adyacentes
                let temporal = arreglo[j];
                arreglo[j] = arreglo[j + 1];
                arreglo[j + 1] = temporal;
            }
        }
    }
    return arreglo;
}`
            },
            python: {
                etiqueta: '<i class="fa-brands fa-python"></i> Python 3 — Ordenamiento por Burbuja',
                codigo: `# Ordenamiento por Burbuja en Python 3 - Complejidad O(n²)
def ordenamiento_burbuja(arreglo: list[int]) -> list[int]:
    n = len(arreglo)
    for i in range(n - 1):
        intercambio = False
        for j in range(0, n - i - 1):
            if arreglo[j] > arreglo[j + 1]:
                arreglo[j], arreglo[j + 1] = arreglo[j + 1], arreglo[j]
                intercambio = True
        if not intercambio:
            break  # Optimización si ya está ordenado
    return arreglo`
            },
            cpp: {
                etiqueta: '<i class="fa-solid fa-file-code"></i> C++ Moderno — Ordenamiento por Burbuja',
                codigo: `// Ordenamiento por Burbuja en C++ - Complejidad O(n²)
#include <vector>
#include <utility>

void ordenamientoBurbuja(std::vector<int>& arreglo) {
    int n = static_cast<int>(arreglo.size());
    for (int i = 0; i < n - 1; ++i) {
        bool huboIntercambio = false;
        for (int j = 0; j < n - i - 1; ++j) {
            if (arreglo[j] > arreglo[j + 1]) {
                std::swap(arreglo[j], arreglo[j + 1]);
                huboIntercambio = true;
            }
        }
        if (!huboIntercambio) break;
    }
}`
            }
        }
    };

    const botonesLang = document.querySelectorAll('.btn-pestana-lang');
    botonesLang.forEach(btn => {
        btn.addEventListener('click', () => {
            const snippetKey = btn.getAttribute('data-snippet');
            const langKey = btn.getAttribute('data-lang');
            const data = snippets[snippetKey]?.[langKey];
            if (!data) return;

            // Actualizar botones de la fila
            const contenedorGrupo = btn.closest('.pestanas-lenguaje-grupo');
            if (contenedorGrupo) {
                const botonesEnGrupo = contenedorGrupo.querySelectorAll('.btn-pestana-lang');
                botonesEnGrupo.forEach(b => {
                    b.classList.remove('activa');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('activa');
                btn.setAttribute('aria-selected', 'true');
            }

            // Actualizar bloque de código y etiqueta
            const etiqueta = document.getElementById(`etiqueta-lang-${snippetKey}`);
            const codigo = document.getElementById(`codigo-${snippetKey}`);

            if (etiqueta) etiqueta.innerHTML = data.etiqueta;
            if (codigo) codigo.textContent = data.codigo;
        });
    });
}

/* ==========================================================================
   16. CHEAT SHEET: IMPRESIÓN Y DESCARGA EN PDF (recursos.html)
   ========================================================================== */
function inicializarCheatSheetAcciones() {
    const btnImprimir = document.getElementById('btn-imprimir-cheatsheet');

    if (btnImprimir) {
        btnImprimir.addEventListener('click', () => {
            window.print();
        });
    }
}

/* ==========================================================================
   17. COMUNIDAD OPEN SOURCE: PROPUESTAS DE APRENDIZAJE (soporte.html)
   ========================================================================== */
function inicializarComunidadRFC() {
    const seccion = document.getElementById('comunidad-rfc');
    if (!seccion) return;

    const form = document.getElementById('form-nueva-propuesta');
    const inputTitulo = document.getElementById('propuesta-titulo');
    const selectCat = document.getElementById('propuesta-categoria');
    const tablon = document.getElementById('tablon-propuestas-rfc');

    if (!tablon) return;

    const CLAVE_PROPUESTAS = 'algoschool_rfc_propuestas';
    const CLAVE_VOTOS = 'algoschool_rfc_votos_usuario';

    const propuestasBase = [
        {
            id: 'rfc_1',
            titulo: 'Tutorial interactivo de Árboles AVL con rotaciones izquierda-derecha visuales',
            categoria: 'Estructuras de Datos',
            autor: 'Comunidad UTP',
            votos: 34,
            fecha: 'Hace 2 días'
        },
        {
            id: 'rfc_2',
            titulo: 'Explicación del Algoritmo A* comparado con Dijkstra sobre cuadrículas 2D',
            categoria: 'Grafos y Redes',
            autor: 'dsa_dev',
            votos: 28,
            fecha: 'Hace 4 días'
        },
        {
            id: 'rfc_3',
            titulo: 'Guía paso a paso del Patrón Ventana Deslizante (Sliding Window) en Strings',
            categoria: 'Patrones de Entrevista',
            autor: 'algo_fan',
            votos: 19,
            fecha: 'Hace 1 semana'
        }
    ];

    function obtenerPropuestas() {
        try {
            const data = localStorage.getItem(CLAVE_PROPUESTAS);
            return data ? JSON.parse(data) : propuestasBase;
        } catch (e) {
            return propuestasBase;
        }
    }

    function guardarPropuestas(lista) {
        localStorage.setItem(CLAVE_PROPUESTAS, JSON.stringify(lista));
    }

    function obtenerVotosUsuario() {
        try {
            return JSON.parse(localStorage.getItem(CLAVE_VOTOS) || '[]');
        } catch (e) {
            return [];
        }
    }

    function guardarVotosUsuario(lista) {
        localStorage.setItem(CLAVE_VOTOS, JSON.stringify(lista));
    }

    function renderizarPropuestas() {
        const propuestas = obtenerPropuestas();
        const votosUsuario = obtenerVotosUsuario();

        tablon.innerHTML = propuestas.map(p => {
            const haVotado = votosUsuario.includes(p.id);
            return `
                <div class="tarjeta-propuesta-rfc" style="display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 14px 18px; background: var(--bg-alt); border: 1px solid var(--border-color); border-radius: 8px; margin-bottom: 10px;">
                    <div style="flex: 1;">
                        <span style="font-size: 0.72rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-primary); text-transform: uppercase;">${p.categoria}</span>
                        <h4 style="margin: 4px 0 6px 0; font-size: 0.95rem; color: var(--text-primary);">${p.titulo}</h4>
                        <div style="font-size: 0.78rem; color: var(--text-muted); display: flex; gap: 12px;">
                            <span><i class="fa-solid fa-user-pen"></i> ${p.autor}</span>
                            <span><i class="fa-regular fa-clock"></i> ${p.fecha}</span>
                        </div>
                    </div>
                    <div>
                        <button type="button" class="btn-voto-rfc ${haVotado ? 'votado' : ''}" data-id="${p.id}" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 54px; padding: 8px 12px; background: ${haVotado ? 'var(--color-primary)' : 'var(--bg-primary)'}; color: ${haVotado ? '#ffffff' : 'var(--text-primary)'}; border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer; transition: all 0.2s ease;">
                            <i class="fa-solid fa-thumbs-up" style="font-size: 0.9rem;"></i>
                            <span style="font-size: 0.82rem; font-weight: 700; margin-top: 2px;">${p.votos}</span>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        const botonesVoto = tablon.querySelectorAll('.btn-voto-rfc');
        botonesVoto.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                let lista = obtenerPropuestas();
                let votos = obtenerVotosUsuario();
                const item = lista.find(x => x.id === id);
                if (!item) return;

                if (votos.includes(id)) {
                    votos = votos.filter(v => v !== id);
                    item.votos = Math.max(0, item.votos - 1);
                } else {
                    votos.push(id);
                    item.votos += 1;
                }

                guardarVotosUsuario(votos);
                guardarPropuestas(lista);
                renderizarPropuestas();
            });
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const tit = inputTitulo.value.trim();
            const cat = selectCat.value;
            if (!tit || !cat) return;

            const nueva = {
                id: 'rfc_' + Date.now(),
                titulo: tit,
                categoria: cat,
                autor: 'Tú (Estudiante)',
                votos: 1,
                fecha: 'Recién publicado'
            };

            let lista = obtenerPropuestas();
            lista.unshift(nueva);
            guardarPropuestas(lista);

            let votos = obtenerVotosUsuario();
            votos.push(nueva.id);
            guardarVotosUsuario(votos);

            form.reset();
            renderizarPropuestas();
        });
    }

    renderizarPropuestas();
}

/* ==========================================================================
   18. GLOSARIO DE CIENCIAS DE LA COMPUTACIÓN A-Z (soporte.html)
   ========================================================================== */
function inicializarGlosarioDSA() {
    const seccionGlosario = document.getElementById('glosario-dsa');
    if (!seccionGlosario) return;

    const inputBuscador = document.getElementById('buscador-glosario');
    const rejillaTerminos = document.getElementById('rejilla-terminos-glosario');
    const mensajeSinResultados = document.getElementById('glosario-sin-resultados');

    if (!rejillaTerminos) return;

    const glosarioTerminos = [
        {
            termino: 'Call Stack (Pila de Llamadas)',
            categoria: 'Control de Flujo',
            definicion: 'Estructura tipo LIFO gestionada por el runtime para almacenar las direcciones de retorno y variables locales de cada invocación a función o llamada recursiva.'
        },
        {
            termino: 'In-place (En el lugar)',
            categoria: 'Complejidad Espacial',
            definicion: 'Propiedad de un algoritmo que transforma la entrada sin requerir memoria auxiliar proporcional a N, utilizando a lo sumo O(1) de memoria adicional.'
        },
        {
            termino: 'Memoización (Memoization)',
            categoria: 'Programación Dinámica',
            definicion: 'Técnica de optimización top-down que almacena los resultados de funciones puras en una tabla hash para evitar recalcular subproblemas idénticos superpuestos.'
        },
        {
            termino: 'Heapify',
            categoria: 'Montículos',
            definicion: 'Operación que transforma un arreglo de tamaño N en un Heap válido que satisface la propiedad min/max en tiempo lineal garantizado O(N).'
        },
        {
            termino: 'Análisis Amortizado',
            categoria: 'Complejidad Asintótica',
            definicion: 'Método que calcula el costo promedio garantizado por operación en el peor caso a lo largo de una secuencia, compensando operaciones costosas infrecuentes con muchas operaciones baratas.'
        },
        {
            termino: 'Colisión Hash',
            categoria: 'Estructuras Asociativas',
            definicion: 'Ocurrencia donde dos claves distintas producen exactamente el mismo índice de celda o bucket mediante la función matemática de dispersión.'
        },
        {
            termino: 'Puntero (Pointer)',
            categoria: 'Arquitectura de Memoria',
            definicion: 'Variable que almacena la dirección física o virtual en la memoria RAM donde se encuentra alojado otro valor o estructura de datos.'
        },
        {
            termino: 'Divide y Vencerás (Divide & Conquer)',
            categoria: 'Estrategias Algorítmicas',
            definicion: 'Paradigma que fragmenta un problema en subproblemas disjuntos recursivos, resuelve cada uno independientemente y recombina sus soluciones sin solapamiento.'
        },
        {
            termino: 'Cota Asintótica Superior (Big O)',
            categoria: 'Complejidad Asintótica',
            definicion: 'Límite matemático formal que acota el crecimiento del tiempo de ejecución o consumo de memoria RAM de un algoritmo para entradas N arbitrariamente grandes.'
        },
        {
            termino: 'Invariante de Bucle (Loop Invariant)',
            categoria: 'Verificación Formal',
            definicion: 'Propiedad lógica que es verdadera antes de iniciar un bucle, se mantiene verdadera tras cada iteración y demuestra matemáticamente la corrección del algoritmo al finalizar.'
        }
    ];

    function filtrarGlosario() {
        const texto = inputBuscador ? inputBuscador.value.trim().toLowerCase() : '';
        let coincidencias = 0;

        rejillaTerminos.innerHTML = glosarioTerminos.map(t => {
            const coincide = !texto || t.termino.toLowerCase().includes(texto) || t.definicion.toLowerCase().includes(texto) || t.categoria.toLowerCase().includes(texto);
            if (!coincide) return '';
            coincidencias++;
            return `
                <div class="tarjeta-glosario-item" style="padding: 14px; background: var(--bg-alt); border: 1px solid var(--border-color); border-radius: 8px;">
                    <span style="font-size: 0.72rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-primary); text-transform: uppercase;">${t.categoria}</span>
                    <h4 style="margin: 4px 0 6px 0; font-size: 0.95rem; color: var(--text-primary);">${t.termino}</h4>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">${t.definicion}</p>
                </div>
            `;
        }).join('');

        if (mensajeSinResultados) {
            mensajeSinResultados.style.display = (coincidencias === 0) ? 'block' : 'none';
        }
    }

    if (inputBuscador) {
        inputBuscador.addEventListener('input', filtrarGlosario);
    }

    filtrarGlosario();
}
