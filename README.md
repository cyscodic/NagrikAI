# 🏛️ NagrikAI — Smart Civic Governance Platform for NDMC

> **AI-Powered Grievance Redressal, Automated SLA Governance, & Vector Duplicate Detection for the New Delhi Municipal Council.**

[![Live Cloud AI](https://img.shields.io/badge/Live_Cloud_AI-https%3A%2F%2Fnagrikai--ahtq.onrender.com-0D9488?style=for-the-badge&logo=render)](https://nagrikai-ahtq.onrender.com)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Node.js Express](https://img.shields.io/badge/Node.js-Express-68A063?style=for-the-badge&logo=express)](https://expressjs.com)

---

## 📌 Executive Overview

**NagrikAI** is a production-grade, multi-tenant citizen complaint management web platform built specifically for the **New Delhi Municipal Council (NDMC)**. 

Traditional civic complaint processes require citizens to guess administrative department names, deal with technical jargon, and suffer long resolution delays without tracking. NagrikAI automates the entire grievance lifecycle:
1. **Natural Language Intake**: Citizens describe issues in Hinglish, Devanagari Hindi, or English.
2. **AI Intent Triage**: Automatically categorizes complaints across 16 NDMC divisions with up to **99% precision**.
3. **Safety Priority Detection**: Flags critical hazards (live wires, fire risks, sewage leaks) and assigns strict SLA targets (2–4 Hours).
4. **Vector Duplicate Merging**: Prevents redundant field trips by merging similar reports in the same ward.
5. **Real-time Resolution Tracking**: Citizens, field officers, and administrators monitor live progress via custom workstations.

---

## 🌟 Key Features

- **🌐 100% Bilingual Accessibility**: English on top with Devanagari Hindi subtitles (`Noto Sans Devanagari`).
- **📝 Guided 4-Step Filing Wizard**: Intake ➔ Ward & Location Selection ➔ Photo Evidence Attachment ➔ AI Triage Summary.
- **🔍 Live Audit Tracker (`/track`)**: Look up any complaint by Reference ID (e.g. `NDMC-2026-ELEC-4921`) or Phone Number to view chronological logs and active SLA countdowns.
- **👨‍💼 Field Officer Workstation (`/officer/dashboard`)**: Dedicated queue manager for field engineers to update ticket status (`In Progress` ➔ `Resolved`) with on-site inspection photos and notes.
- **📊 Super Admin Command Center (`/admin/dashboard`)**: Real-time SLA compliance matrix, active escalations counter, and ward performance heatmaps.

---

## 🤖 AI & Automation Microservice Architecture

The platform connects to a 24/7 cloud AI microservice hosted at **`https://nagrikai-ahtq.onrender.com`**:

| Microservice Module | Cloud Endpoint | Technology | Purpose |
| --- | --- | --- | --- |
| **AI Classifier** | `POST /api/ai/classify` | LLM NLU Engine | Auto-detects department, category, priority, & keywords from Hinglish text. |
| **Vector Duplicate Search** | `POST /api/ai/check-duplicate` | ChromaDB / Embeddings | Scans ward boundary within 72h to link duplicate tickets. |
| **NagrikAI Chatbot** | `POST /api/ai/chat` | LangChain RAG Agent | Powers floating chat widget for 24/7 helpline queries and ticket lookups. |

---

## 🏛️ 16 NDMC Department Directory

1. ⚡ **Electricity & Streetlights** (`ELEC`) — Critical SLA: 2h
2. 🏗️ **Civil Engineering & Roads** (`CIVIL`) — Critical SLA: 4h
3. 🏥 **Public Health & Sanitation** (`PH`) — Critical SLA: 4h
4. 🌳 **Horticulture & Parks** (`HORT`) — Critical SLA: 4h
5. 🔥 **Fire Safety & Emergencies** (`FIRE`) — Critical SLA: 1h
6. 🩺 **Medical Services** (`MED`) — Critical SLA: 2h
7. 🧘 **Ayush Wellness** (`AYUSH`) — Critical SLA: 4h
8. 🚨 **Enforcement & Hawkers** (`ENF`) — Critical SLA: 8h
9. 🅿️ **Parking Management** (`PARK`) — Critical SLA: 8h
10. 📋 **Property Tax & Revenue** (`PTAX`) — Standard SLA: 48h
11. 🏠 **Municipal Housing** (`HOUS`) — Critical SLA: 4h
12. 🚌 **Transport & Bus Stops** (`TRANS`) — Critical SLA: 4h
13. 🛡️ **Security & Surveillance** (`SEC`) — Critical SLA: 1h
14. 🎓 **Education & Schools** (`EDU`) — Critical SLA: 8h
15. 🤝 **Social Welfare** (`WELF`) — Standard SLA: 48h
16. 🏛️ **Estate & Property** (`EST`) — Standard SLA: 48h

---

## 💻 Getting Started (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/cyscodic/NagrikAI.git
cd NagrikAI
```

### 2. Install Dependencies
```bash
npm install
cd server && npm install && cd ..
```

### 3. Run Development Server
```bash
# Terminal 1 — Frontend Web App (http://localhost:5173)
npm run dev

# Terminal 2 — Backend Express REST Server (http://localhost:5000)
cd server && node index.js
```

---

## 📄 License & Attribution

Developed for the **New Delhi Municipal Council (NDMC) Smart Governance Initiative**. All rights reserved © 2026.
