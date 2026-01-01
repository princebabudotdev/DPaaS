// for github Oauth System   https://chatgpt.com/s/t_694e5813474881918fd9c28b07debc1b
// for protected routes in reactjs https://chatgpt.com/s/t_6956dcd0c6dc8191b968003e736f2fe3


// frontend production-ready-folder-structure

/*
src/
│
├── app/                    # App-level setup (providers, routing, store)
│   ├── App.jsx
│   ├── routes.jsx
│   ├── providers.jsx
│
├── assets/                 # Static assets
│   ├── images/
│   ├── icons/
│   ├── fonts/
│
├── components/             # Reusable UI components (dumb components)
│   ├── ui/                 # Buttons, Inputs, Modals, etc.
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   │
│   ├── layout/             # Layout components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Sidebar.jsx
│   │
│   └── common/             # Small shared components
│       ├── Loader.jsx
│       └── ErrorBoundary.jsx
│
├── features/               # Feature-based modules (VERY IMPORTANT)
│   ├── auth/
│   │   ├── components/
│   │   │   └── LoginForm.jsx
│   │   ├── pages/
│   │   │   └── Login.jsx
│   │   ├── services/
│   │   │   └── auth.api.js
│   │   └── hooks/
│   │       └── useAuth.js
│   │
│   ├── dashboard/
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── components/
│   │   └── services/
│   │
│   └── profile/
│       ├── pages/
│       ├── components/
│       └── services/
│
├── hooks/                  # Global reusable hooks
│   ├── useDebounce.js
│   ├── useTheme.js
│   └── useAuth.js
│
├── context/                # Context API providers
│   ├── ThemeContext.jsx
│   └── AuthContext.jsx
│
├── services/               # API & external services
│   ├── apiClient.js        # Axios / Fetch config
│   ├── endpoints.js
│   └── storage.js          # localStorage helpers
│
├── utils/                  # Helper functions
│   ├── formatDate.js
│   ├── constants.js
│   └── validators.js
│
├── styles/                 # Global styles
│   ├── index.css
│   └── tailwind.css
│
├── config/                 # App configuration
│   ├── env.js
│   └── theme.js
│
├── lib/                    # Third-party wrappers
│   ├── axios.js
│   └── socket.js
│
├── tests/                  # Unit & integration tests
│   ├── setup.js
│   └── auth.test.jsx
│
├── main.jsx                # Entry point
└── index.html


// backend ready-folder-structure

/ *
src/
│
├── app.js                  # Express app config
├── server.js               # Server bootstrap
│
├── config/                 # App & environment configs
│   ├── env.js
│   ├── db.js
│   ├── cors.js
│   └── logger.js
│
├── modules/                # Feature-based modules ⭐
│   ├── auth/
│   │   ├── auth.routes.js
│   │   ├── auth.controller.js
│   │   ├── auth.service.js
│   │   ├── auth.dao.js
│   │   ├── auth.model.js
│   │   └── auth.validation.js
│   │
│   ├── user/
│   │   ├── user.routes.js
│   │   ├── user.controller.js
│   │   ├── user.service.js
│   │   ├── user.dao.js
│   │   └── user.model.js
│   │
│   └── dashboard/
│       ├── dashboard.routes.js
│       ├── dashboard.controller.js
│       └── dashboard.service.js
│
├── middlewares/             # Express middlewares
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   ├── rateLimiter.js
│   └── validate.js
│
├── utils/                   # Helper utilities
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│   ├── jwt.js
│   └── password.js
│
├── services/                # External services
│   ├── mail.service.js
│   ├── cloudinary.service.js
│   └── redis.service.js
│
├── constants/               # App constants
│   ├── roles.js
│   └── messages.js
│
├── routes/                  # Route aggregation
│   └── index.js
│
├── validations/             # Global schemas (Joi/Zod)
│   └── common.validation.js
│
├── tests/                   # Unit & integration tests
│   ├── auth.test.js
│   └── user.test.js
│
└── docs/                    # Swagger / API docs
    └── swagger.js

    */


    