# 🛒 JavaScript Full-Stack Ecommerce Platform (Amazon Clone)

![JavaScript](https://img.shields.io/badge/Vanilla_JS-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Jasmine](https://img.shields.io/badge/Jasmine-Testing_Framework-8A4182?style=for-the-badge&logo=jasmine&logoColor=white)
![Day.js](https://img.shields.io/badge/Day.js-Date_Engine-FF5F5F?style=for-the-badge)

A modular, production-ready multi-page e-commerce web platform engineered entirely with modern **Vanilla JavaScript (ES6+)**, strict **Object-Oriented Programming (OOP)** patterns, automated test suites, and asynchronous REST backend communication.

---

## 🔗 Project Link
- **GitHub Repository:** [https://github.com/madhavjindalwork2009/javascript-amazon-project](https://github.com/madhavjindalwork2009/javascript-amazon-project)

---

## 📑 Table of Contents
- [Executive Overview](#-executive-overview)
- [Key Features & System Architecture](#-key-features--system-architecture)
- [Tech Stack & Engineering Skills](#-tech-stack--engineering-skills)
- [Directory Architecture](#-directory-architecture)
- [Automated Testing Suite](#-automated-testing-suite)
- [Local Setup Guide](#-local-setup-guide)

---

## 💡 Executive Overview

This project implements a multi-page e-commerce web application without front-end frameworks (React/Vue), showcasing native browser APIs, software design patterns, and asynchronous data pipelines.

It features complete state synchronization across browser tabs and distinct pages, OOP domain modeling, test-driven validation using Jasmine, dynamic URL routing, and real-time backend API integration.

---

## ⚡ Key Features & System Architecture

### 1. Storefront & Catalog Management
* **Dynamic Content Hydration:** Renders product cards on demand using asynchronous backend fetch pipelines rather than hardcoded markup.
* **Instant Filtering & Search:** Evaluates keywords and product tags in real time across the catalog.
* **Interactive Cart Feedback:** Provides animated add-to-cart notifications alongside dynamic item quantity selectors.

### 2. Multi-Page State Management & Checkout Pipeline
* **Cross-Page State Persistence:** Synchronizes product allocations and cart totals across the Storefront, Checkout, and Tracking dashboards via `localStorage`.
* **Dynamic Delivery Logistics (Day.js):** Computes variable delivery dates and shipping fees based on chosen speed tiers (Standard vs. Express), formatting timestamps cleanly.
* **Real-Time Financial Engine:** Updates item subtotals, shipping surcharges, estimated tax (10%), and final order totals dynamically upon quantity modification or item deletion.

### 3. Asynchronous Order Fulfillment & Package Tracker
* **REST API Communication:** Submits complete order payloads using asynchronous `fetch()` POST requests with error boundaries (`try...catch`).
* **Dynamic Route Parameters:** Employs the `URLSearchParams` API on the tracking view to extract `orderId` and `productId`, rendering accurate delivery milestone progress bars.

### 4. Object-Oriented Domain Layer (OOP)
* Refactored procedural handlers into maintainable **ES6 Classes** featuring constructor initializers and private class fields (`#`).
* **Inheritance & Polymorphism:** Extends base `Product` models into specialized subtypes (such as apparel with interactive size-chart modal behaviors).

---

## 🛠️ Tech Stack & Engineering Skills

| Domain | Tools & Paradigms |
| :--- | :--- |
| **Core Languages** | JavaScript (ES6+), Semantic HTML5, Modular CSS3 |
| **Architectural Patterns**| MVC Architecture, ES Modules (`import`/`export`), OOP (Classes, Polymorphism) |
| **Libraries & Utilities** | [Day.js](https://day.js.org/) (Date parsing & arithmetic), Jasmine Framework |
| **Async & Networking** | Fetch API, REST Endpoints, Promises, `async`/`await`, URL Query Parameters |
| **Quality Assurance** | Automated Unit Testing, DOM Integration Testing, Test Spies (`spyOn`) |
| **Tooling & Environment**| Git, GitHub, VS Code, Chrome DevTools |

---

## 📂 Directory Architecture

```text
javascript-amazon-project/
├── data/
│   ├── backend-practice.js      # Asynchronous fetch and backend request pipelines
│   ├── cart-class.js            # Class-based Cart model with encapsulation
│   ├── cart-oop.js              # Factory function & OOP cart implementation
│   ├── cart.js                  # Modular cart store and localStorage sync logic
│   ├── deliveryOptions.js       # Delivery rate options & Day.js date engines
│   ├── orders.js                # Order placement, persistence, and state retrieval
│   └── products.js              # Product class definitions and polymorphic models
├── scripts/
│   ├── amazon.js                # Storefront catalog renderer and cart controller
│   ├── checkout.js              # Checkout orchestrator using async/await pipelines
│   ├── checkout/
│   │   ├── orderSummary.js      # Cart item DOM generator and event dispatcher
│   │   └── paymentSummary.js    # Subtotal, tax, and order submission pipeline
│   ├── orders.js                # Historical order history DOM renderer
│   ├── tracking.js              # Package tracker utilizing URLSearchParams
│   └── utils/
│       └── money.js             # Currency formatting utilities
├── tests/                       # Automated Jasmine test suites
│   ├── data/
│   │   ├── cartTest.js          # Cart state mutation unit tests
│   │   └── productsTest.js      # Product class and polymorphism unit tests
│   ├── checkout/
│   │   └── orderSummaryTest.js  # DOM rendering and deletion integration tests
│   └── test-simple/             # Pure JS runner for lightweight assertions
├── styles/                      # Production CSS stylesheets
├── amazon.html                  # Main catalog storefront
├── checkout.html                # Payment and delivery checkout dashboard
├── orders.html                  # Historical orders view
└── tracking.html                # Live order delivery tracker

🧪 Automated Testing Suite
The repository includes a comprehensive testing harness powered by the Jasmine Test Framework:

Unit Testing: Validates pure utility calculations (e.g., precise currency conversion, rounding, and array operations).

Integration & DOM Testing: Verifies that user interactions (e.g., removing a cart item or changing shipping speed) properly mutate the live DOM tree and persistent storage in tandem.

Test Doubles & Mocking: Utilizes Jasmine test spies (spyOn) to mock localStorage.getItem, localStorage.setItem, and network calls for isolated, deterministic test results.

💻 Local Setup Guide
Follow these steps to clone and run the application locally:
# 1. Clone the repository
git clone [https://github.com/madhavjindalwork2009/javascript-amazon-project.git](https://github.com/madhavjindalwork2009/javascript-amazon-project.git)

# 2. Navigate to the project root
cd javascript-amazon-project

Running the Web Server:
Because this application relies on native JavaScript ES Modules (<script type="module">) and live fetch() API calls, running via file:/// will trigger browser CORS restrictions. Run it via a local development server:

VS Code Live Server (Recommended): Right-click amazon.html and select Open with Live Server.

Node npx serve:

npx serve .
