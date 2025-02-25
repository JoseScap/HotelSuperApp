import type { Activity, Destination } from "@/types/activities"

export const activities: Activity[] = [
  {
    id: "spa-wellness",
    title: "Spa & Wellness",
    description:
      "Disfruta de un día de relajación completa con nuestros tratamientos de spa premium y servicios de bienestar.",
    imageUrl: "https://example.com/spa.jpg",
    duration: "2 horas",
    schedule: "10:00 AM - 8:00 PM",
    price: 120,
    category: "spa",
    available: true,
    maxParticipants: 1,
    location: "Spa Center - Nivel 2",
    amenities: [
      "Masaje relajante",
      "Acceso a sauna",
      "Hidroterapia",
      "Té y refrigerios saludables",
      "Kit de spa personal",
    ],
  },
  {
    id: "yoga-beach",
    title: "Yoga en la Playa",
    description:
      "Sesiones de yoga al amanecer frente al mar, perfectas para comenzar el día con energía y paz interior.",
    imageUrl: "https://example.com/yoga.jpg",
    duration: "1 hora",
    schedule: "7:00 AM - 8:00 AM",
    price: 45,
    category: "fitness",
    available: true,
    maxParticipants: 15,
    location: "Playa Principal",
    amenities: [
      "Instructor certificado",
      "Esterilla de yoga",
      "Toallas",
      "Agua mineral",
      "Snack saludable post-clase",
    ],
  },
  {
    id: "gourmet-dinner",
    title: "Cena Gourmet",
    description:
      "Una experiencia culinaria única con un menú de 5 tiempos preparado por nuestro chef ejecutivo.",
    imageUrl: "https://example.com/dinner.jpg",
    duration: "2.5 horas",
    schedule: "7:00 PM - 9:30 PM",
    price: 150,
    category: "dining",
    available: true,
    maxParticipants: 30,
    location: "Restaurante La Vista",
    amenities: [
      "Menú de 5 tiempos",
      "Maridaje de vinos",
      "Vista al mar",
      "Música en vivo",
      "Servicio personalizado",
    ],
  },
]

export const popularDestinations: Destination[] = [
  {
    id: "private-beach",
    name: "Playa Privada",
    location: "Zona Norte del Resort",
    imageUrl: "https://example.com/beach.jpg",
    rating: 4.8,
    distance: "5",
    description:
      "Una exclusiva playa privada con aguas cristalinas y arena blanca, perfecta para relajarse y disfrutar del sol.",
  },
  {
    id: "sports-center",
    name: "Centro Deportivo",
    location: "Zona Recreativa",
    imageUrl: "https://example.com/sports.jpg",
    rating: 4.6,
    distance: "10",
    description:
      "Modernas instalaciones deportivas que incluyen canchas de tenis, gimnasio y piscina olímpica.",
  },
  {
    id: "infinity-pool",
    name: "Infinity Pool",
    location: "Terraza Principal",
    imageUrl: "https://example.com/pool.jpg",
    rating: 4.9,
    distance: "2",
    description:
      "Piscina infinita con vistas panorámicas al océano, ideal para relajarse y disfrutar del atardecer.",
  },
]

export const recommendations: Destination[] = [
  {
    id: "sea-restaurant",
    name: "Restaurante Vista Mar",
    location: "Nivel 8",
    imageUrl: "https://example.com/restaurant.jpg",
    rating: 4.7,
    description:
      "Restaurante gourmet con espectaculares vistas al mar y cocina internacional de primer nivel.",
  },
  {
    id: "sunset-lounge",
    name: "Sunset Lounge",
    location: "Terraza Superior",
    imageUrl: "https://example.com/lounge.jpg",
    rating: 4.5,
    description:
      "Bar lounge con ambiente sofisticado, cócteles artesanales y las mejores vistas del atardecer.",
  },
  {
    id: "kids-club",
    name: "Kids Club",
    location: "Área Familiar",
    imageUrl: "https://example.com/kids.jpg",
    rating: 4.8,
    description:
      "Espacio seguro y divertido para niños con actividades supervisadas y juegos educativos.",
  },
] 