/*
  ============================================================
  MENÚ Y GALERÍA DE ANURA CAFÉ  (este es el único archivo
  que la persona de mantenimiento necesita editar)
  ============================================================

  CÓMO EDITAR EL MENÚ
  - Cada categoría tiene un "nombre" y una lista de "productos".
  - Cada producto lleva: nombre, descripcion y precio (número, en pesos MXN).
  - Para quitar un producto, borra su bloque { ... },
  - Para agregar uno, copia un bloque y cambia sus datos.
  - Respeta las comas y las comillas.

  CUANDO EL MENÚ SEA REAL:
  - Cambia MENU_DEMO a false para ocultar el aviso de "menú demostrativo".

  CÓMO EDITAR LA GALERÍA
  - Guarda las fotos en la carpeta img/ y escribe su nombre en la lista GALERIA.
  - Cada foto lleva "archivo" (nombre del archivo) y "alt" (descripción corta).
*/

const MENU_DEMO = true;

const MENU = [
  {
    nombre: "Bebidas frías",
    productos: [
      { nombre: "Frappé de matcha", descripcion: "Matcha cremoso con crema batida.", precio: 79 },
      { nombre: "Frappé de moka", descripcion: "Café y chocolate con crema batida.", precio: 79 },
      { nombre: "Café frío", descripcion: "Café de especialidad servido sobre hielo.", precio: 55 },
      { nombre: "Limonada mineral", descripcion: "Limón natural con agua mineral.", precio: 49 }
    ]
  },
  {
    nombre: "Bebidas calientes",
    productos: [
      { nombre: "Espresso", descripcion: "Intenso y aromático.", precio: 40 },
      { nombre: "Americano", descripcion: "Espresso alargado con agua caliente.", precio: 45 },
      { nombre: "Capuchino", descripcion: "Espresso con leche vaporizada y espuma.", precio: 58 },
      { nombre: "Chocolate caliente", descripcion: "Chocolate cremoso, servido muy caliente.", precio: 60 }
    ]
  },
  {
    nombre: "Desayunos",
    productos: [
      { nombre: "Chilaquiles", descripcion: "Salsa verde o roja, crema y queso.", precio: 95 },
      { nombre: "Hot cakes", descripcion: "Tres piezas con miel y fruta.", precio: 85 },
      { nombre: "Sándwich de jamón y queso", descripcion: "Pan artesanal tostado.", precio: 80 }
    ]
  },
  {
    nombre: "Panadería",
    productos: [
      { nombre: "Croissant", descripcion: "Mantequilla, hojaldrado y dorado.", precio: 45 },
      { nombre: "Concha", descripcion: "Pan dulce tradicional.", precio: 25 },
      { nombre: "Rol de canela", descripcion: "Con glaseado de vainilla.", precio: 55 }
    ]
  }
];

/*
  Fotos de la galería (guárdalas en la carpeta img/).
  Mientras una foto no exista, se muestra un recuadro de color.
*/
const GALERIA = [
  { archivo: "frappe-matcha.jpg", alt: "Frappé de matcha con crema batida" },
  { archivo: "frappe-moka.jpg", alt: "Dos frappés de moka con popote" },
  { archivo: "local-1.jpg", alt: "Interior de Anura café con mesas de madera y plantas" },
  { archivo: "local-2.jpg", alt: "Rincón de Anura café con láminas botánicas en la pared" },
  { archivo: "barra.jpg", alt: "Barra de Anura café" },
  { archivo: "panaderia.jpg", alt: "Panadería de la casa" }
];
