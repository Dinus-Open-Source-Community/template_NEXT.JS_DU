src/
├── app/
│ ├── layout.js # Layout utama aplikasi
│ ├── page.js # Halaman utama aplikasi
│ ├── api/
│ │ ├── login/
│ │ │ └── route.js # API endpoint untuk login
│ │ ├── register/
│ │ │ └── route.js # API endpoint untuk registrasi
│ │ └── todos/
│ │ ├── puzzle.txt # File teks terkait fitur todos
│ │ └── route.js # API endpoint untuk todos
│ ├── login/
│ │ └── page.js # Halaman login
│ └── register/
│ └── page.js # Halaman registrasi
├── components/
│ ├── Button.jsx
│ ├── ButtonLogout.jsx
│ ├── ButtonSidebar.jsx
│ ├── Header.jsx
│ ├── HeaderDate.jsx
│ ├── Sidebar.jsx
│ ├── SpinnerLoading.jsx
│ ├── TaskCard.jsx
│ ├── TaskColumn.jsx
│ └── TextInput.jsx # Komponen UI aplikasi
├── plugins/
│ └── hero.js # Plugin eksternal (misal: integrasi Hero)
├── providers/
│ └── HeroProvider.jsx # Provider context untuk Hero
├── styles/
│ └── globals.css # File CSS global
├── utility/
│ └── db/
│ └── prisma.js # Utility untuk koneksi database Prisma
└── proxy.js # Proxy handler (jika ada kebutuhan proxy)
