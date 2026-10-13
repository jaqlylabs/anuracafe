(function () {
  "use strict";

  /* ---------- Navegación móvil ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Menú (datos en menu.js) ---------- */
  var tabs = document.getElementById("menu-tabs");
  var panel = document.getElementById("menu-panel");
  var demoNote = document.querySelector(".demo-note");
  if (typeof MENU_DEMO !== "undefined" && !MENU_DEMO) demoNote.hidden = true;

  var peso = new Intl.NumberFormat("es-MX", {
    style: "currency", currency: "MXN", maximumFractionDigits: 0
  });

  function renderCategoria(i) {
    var cat = MENU[i];
    var ul = document.createElement("ul");
    ul.className = "menu-list";
    cat.productos.forEach(function (p) {
      var li = document.createElement("li");
      li.className = "menu-item";
      var h = document.createElement("h3");
      h.textContent = p.nombre;
      var precio = document.createElement("span");
      precio.className = "precio";
      precio.textContent = peso.format(p.precio);
      var d = document.createElement("p");
      d.textContent = p.descripcion || "";
      li.appendChild(h);
      li.appendChild(precio);
      if (p.descripcion) li.appendChild(d);
      ul.appendChild(li);
    });
    panel.replaceChildren(ul);
    Array.prototype.forEach.call(tabs.children, function (b, j) {
      b.setAttribute("aria-selected", String(i === j));
      b.tabIndex = i === j ? 0 : -1;
    });
  }

  MENU.forEach(function (cat, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.textContent = cat.nombre;
    b.addEventListener("click", function () { renderCategoria(i); });
    b.addEventListener("keydown", function (e) {
      var n = MENU.length, next = null;
      if (e.key === "ArrowRight") next = (i + 1) % n;
      if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
      if (next !== null) {
        e.preventDefault();
        renderCategoria(next);
        tabs.children[next].focus();
      }
    });
    tabs.appendChild(b);
  });
  renderCategoria(0);

  /* ---------- Galería (datos en menu.js) ---------- */
  var gallery = document.getElementById("gallery");
  GALERIA.forEach(function (f) {
    var fig = document.createElement("figure");
    var img = document.createElement("img");
    img.src = "img/" + f.archivo;
    img.alt = f.alt;
    img.loading = "lazy";
    img.addEventListener("error", function () {
      var ph = document.createElement("div");
      ph.className = "placeholder";
      ph.textContent = "Foto pendiente: " + f.archivo;
      fig.replaceChildren(ph);
    });
    fig.appendChild(img);
    gallery.appendChild(fig);
  });

  /* ---------- Horario y estado "abierto / cerrado" (hora de Cancún) ---------- */
  var HORARIOS = {
    0: null,                                   // domingo: cerrado
    1: [9, 0, 19, 0], 2: [9, 0, 19, 0], 3: [9, 0, 19, 0],
    4: [9, 0, 19, 0], 5: [9, 0, 19, 0],        // lunes a viernes 9:00–19:00
    6: [9, 0, 20, 30]                          // sábado 9:00–20:30
  };

  function ahoraEnCancun() {
    var partes = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Cancun", weekday: "short",
      hour: "numeric", minute: "numeric", hour12: false
    }).formatToParts(new Date());
    var get = function (t) {
      return partes.filter(function (p) { return p.type === t; })[0].value;
    };
    var dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return {
      dia: dias[get("weekday")],
      minutos: (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10)
    };
  }

  function hora12(h, m) {
    var suf = h >= 12 ? "p. m." : "a. m.";
    var hh = h % 12 === 0 ? 12 : h % 12;
    return hh + ":" + (m < 10 ? "0" : "") + m + " " + suf;
  }

  var status = document.getElementById("open-status");
  var ahora = ahoraEnCancun();
  var hoy = HORARIOS[ahora.dia];

  Array.prototype.forEach.call(document.querySelectorAll("#hours tr"), function (tr) {
    if (tr.dataset.days.split(",").indexOf(String(ahora.dia)) !== -1) tr.classList.add("hoy");
  });

  if (hoy) {
    var abre = hoy[0] * 60 + hoy[1];
    var cierra = hoy[2] * 60 + hoy[3];
    if (ahora.minutos >= abre && ahora.minutos < cierra) {
      status.textContent = "Abierto ahora · cerramos a las " + hora12(hoy[2], hoy[3]);
      status.classList.add("abierto");
    } else if (ahora.minutos < abre) {
      status.textContent = "Cerrado ahora · abrimos hoy a las " + hora12(hoy[0], hoy[1]);
    } else {
      status.textContent = ahora.dia === 6
        ? "Cerrado ahora · abrimos el lunes a las " + hora12(9, 0)
        : "Cerrado ahora · abrimos mañana a las " + hora12(9, 0);
    }
  } else {
    status.textContent = "Hoy domingo estamos cerrados · abrimos el lunes a las " + hora12(9, 0);
  }

  /* ---------- Año del pie de página ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
