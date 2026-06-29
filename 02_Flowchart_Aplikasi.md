# Tahap 2: Flowchart Aplikasi - Teacher Generator PJOK SD

## 2.1 User Flow Diagram

### 2.1.1 User Flow Utama (Main Journey)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           USER FLOW - TEACHER GENERATOR                      │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌──────────────┐
                              │   START      │
                              └──────┬───────┘
                                     │
                                     ▼
                          ┌─────────────────────┐
                          │   Login / Auth      │
                          │   (Google Account)  │
                          └──────────┬──────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
           ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
           │ First Time   │ │ Existing     │ │ Admin        │
           │ User         │ │ User         │ │ User         │
           └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
                  │                │                │
                  ▼                ▼                ▼
         ┌────────────────┐ ┌──────────────┐ ┌──────────────┐
         │ Setup Sekolah  │ │ Dashboard    │ │ Dashboard    │
         │ Setup Guru     │ │              │ │ + Admin Menu │
         │ Setup Tahun    │ │              │ │              │
         └───────┬────────┘ └──────┬───────┘ └──────┬───────┘
                 │                │                │
                 └────────────────┼────────────────┘
                                  │
                                  ▼
                        ┌─────────────────┐
                        │   MAIN MENU     │
                        │   NAVIGATION    │
                        └────────┬────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
        ▼                        ▼                        ▼
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│ Master Data   │       │ Teacher       │       │ Perangkat     │
│ Management    │       │ Generator     │       │ Ajar View     │
└───────┬───────┘       └───────┬───────┘       └───────┬───────┘
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│ - Sekolah     │       │ Pilih:        │       │ View/Edit:    │
│ - Guru        │       │ - Kelas       │       │ - Modul Ajar  │
│ - Kelas       │       │ - Semester    │       │ - ATP         │
│ - Mapel       │       │ - Materi      │       │ - Prosem      │
│ - Fase        │       │ - TP          │       │ - Promes      │
│ - CP          │       │ - Model       │       │ - Jurnal      │
│ - TP          │       │ - Metode      │       │ - Asesmen     │
│ - ATP         │       │ - Media       │       │ - Bank Soal   │
│ - Materi      │       │ - Profil      │       │ - Permainan   │
│ - Permainan   │       │   Pancasila   │       └───────┬───────┘
│ - Media       │       └───────┬───────┘               │
└───────┬───────┘               │                       │
        │                       ▼                       │
        │            ┌─────────────────┐                │
        │            │   GENERATE      │                │
        │            │   (AI Process)  │                │
        │            └────────┬────────┘                │
        │                     │                         │
        │                     ▼                         │
        │            ┌─────────────────┐                │
        │            │ Loading State   │                │
        │            │ Progress Bar    │                │
        │            └────────┬────────┘                │
        │                     │                         │
        │                     ▼                         │
        │            ┌─────────────────┐                │
        │            │ Generate        │                │
        │            │ Complete        │                │
        │            └────────┬────────┘                │
        │                     │                         │
        │                     ▼                         │
        │            ┌─────────────────┐                │
        │            │ Preview Result  │◄───────────────┘
        │            └────────┬────────┘
        │                     │
        │                     ▼
        │            ┌─────────────────┐
        │            │ Edit/Customize  │
        │            │ (Optional)      │
        │            └────────┬────────┘
        │                     │
        │                     ▼
        │            ┌─────────────────┐
        │            │ Save to DB      │
        │            └────────┬────────┘
        │                     │
        │                     ▼
        │            ┌─────────────────┐
        │            │ Export Options  │
        │            │ - PDF           │
        │            │ - Word          │
        │            │ - Google Docs   │
        │            │ - Print         │
        │            └────────┬────────┘
        │                     │
        │                     ▼
        │            ┌─────────────────┐
        │            │ Sync to Drive   │
        │            └────────┬────────┘
        │                     │
        ▼                     ▼                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACK TO DASHBOARD                          │
└─────────────────────────────────────────────────────────────────┘
```

### 2.1.2 User Flow - Generator Detail

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GENERATOR FLOW - DETAIL                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐
│ SELECT INPUTS   │
│                 │
│ ☑ Nama Guru     │
│ ☑ Sekolah       │
│ ☑ Kelas (1-6)   │
│ ☑ Semester      │
│ ☑ Fase (A-C)    │
│ ☑ Materi        │
│ ☑ Jam Pelajaran │
│ ☑ Model         │
│ ☑ Pendekatan    │
│ ☑ Metode        │
│ ☑ Media         │
│ ☑ Profil        │
│   Pancasila     │
│ ☑ Target Siswa  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ VALIDATE INPUT  │
│                 │
│ All required    │
│ fields filled?  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
   YES       NO
    │         │
    │         ▼
    │  ┌──────────────┐
    │  │ Show Error   │
    │  │ Toast        │
    │  │ Highlight    │
    │  │ Missing      │
    │  └──────┬───────┘
    │         │
    └─────────┘
         │
         ▼
┌─────────────────┐
│ PREPARE PROMPT  │
│                 │
│ Build AI Prompt │
│ with all inputs │
│ + Context PJOK  │
│ + Kurikulum     │
│   Merdeka       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ CALL AI API     │
│                 │
│ Send to AI      │
│ Service         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ SHOW LOADING    │
│                 │
│ • Spinner       │
│ • Progress Bar  │
│ • Status Text   │
│ • Tips Display  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ PROCESSING      │
│                 │
│ AI generates:   │
│ 1. Identitas    │
│ 2. CP           │
│ 3. TP           │
│ 4. ATP          │
│ 5. KKTP         │
│ 6. Tujuan       │
│ 7. Pemahaman    │
│    Bermakna     │
│ 8. Pertanyaan   │
│    Pemantik     │
│ 9. Kegiatan     │
│    Pembelajaran │
│ 10. Asesmen     │
│ 11. Rubrik      │
│ 12. Pengayaan   │
│ 13. Remedial    │
│ 14. Refleksi    │
│ 15. Lampiran    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ PARSE RESPONSE  │
│                 │
│ Extract JSON    │
│ Validate Data   │
│ Format Output   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
 SUCCESS    FAIL
    │         │
    │         ▼
    │  ┌──────────────┐
    │  │ Error Handle │
    │  │ Retry Option │
    │  │ Log Error    │
    │  └──────┬───────┘
    │         │
    └─────────┘
         │
         ▼
┌─────────────────┐
│ DISPLAY RESULT  │
│                 │
│ Tabbed Interface│
│ - Modul Ajar    │
│ - ATP           │
│ - Asesmen       │
│ - LKPD          │
│ - Media         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ EDIT & SAVE     │
│                 │
│ User can edit   │
│ any section     │
│ Auto-save draft │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ EXPORT & SHARE  │
│                 │
│ Multiple format │
│ options         │
└─────────────────┘
```

## 2.2 Process Flow Diagram

### 2.2.1 Process Flow - Generate Modul Ajar

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              PROCESS FLOW - GENERATE MODUL AJAR PJOK                        │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │   START     │
    │  GENERATE   │
    └──────┬──────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │  STEP 1: COLLECT INPUT DATA                                         │
    │                                                                     │
    │  → Get selected Guru from Database                                  │
    │  → Get selected Sekolah from Database                               │
    │  → Get Kelas, Semester, Fase                                        │
    │  → Get Materi from Master Data                                      │
    │  → Get Model, Pendekatan, Metode                                    │
    │  → Get Media preferences                                            │
    │  → Get Profil Pelajar Pancasila selection                           │
    │  → Get Target Peserta Didik                                         │
    └─────────────────────────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │  STEP 2: FETCH CURRICULUM DATA                                      │
    │                                                                     │
    │  → Query CP based on Fase                                           │
    │  → Query TP based on CP + Kelas                                     │
    │  → Query ATP based on TP + Semester                                 │
    │  → Query KKTP based on TP                                           │
    │  → Validate data consistency                                        │
    └─────────────────────────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │  STEP 3: BUILD AI PROMPT                                            │
    │                                                                     │
    │  → Construct system prompt (Kurikulum Merdeka context)              │
    │  → Insert user inputs                                               │
    │  → Insert curriculum data (CP, TP, ATP, KKTP)                       │
    │  → Add PJOK-specific constraints                                    │
    │  → Define output format (JSON structure)                            │
    │  → Set generation parameters                                        │
    └─────────────────────────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │  STEP 4: CALL AI SERVICE                                            │
    │                                                                     │
    │  → Send HTTP request to AI API                                      │
    │  → Wait for response (async)                                        │
    │  → Handle timeout (>60s retry)                                      │
    │  → Parse JSON response                                              │
    └─────────────────────────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │  STEP 5: VALIDATE AI OUTPUT                                         │
    │                                                                     │
    │  → Check required fields present                                    │
    │  → Validate data types                                              │
    │  → Check content quality (min length, relevance)                    │
    │  → If invalid → Regenerate or show error                            │
    └─────────────────────────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │  STEP 6: FORMAT FOR DISPLAY                                         │
    │                                                                     │
    │  → Convert to HTML for each section                                 │
    │  → Apply templates                                                  │
    │  → Add styling classes                                              │
    │  → Prepare tab navigation                                           │
    └─────────────────────────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │  STEP 7: SAVE TO DATABASE                                           │
    │                                                                     │
    │  → Insert record to MODUL_AJAR sheet                                │
    │  → Link to Guru, Kelas, Semester, Materi                            │
    │  → Store timestamp                                                  │
    │  → Create version history                                           │
    └─────────────────────────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │  STEP 8: GENERATE SUPPORTING DOCUMENTS                              │
    │                                                                     │
    │  → Create ATP visualization                                         │
    │  → Generate LKPD template                                           │
    │  → Prepare assessment instruments                                   │
    │  → Suggest media resources                                          │
    │  → Recommend games from Bank Permainan                              │
    └─────────────────────────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │  STEP 9: PREPARE EXPORT OPTIONS                                     │
    │                                                                     │
    │  → Generate PDF template                                            │
    │  → Create Google Docs version                                       │
    │  → Prepare Word export                                              │
    │  → Setup print layout                                               │
    └─────────────────────────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────┐
    │    END      │
    │  COMPLETE   │
    └─────────────┘
```

### 2.2.2 Process Flow - Export Document

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  PROCESS FLOW - EXPORT DOCUMENT                             │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │ SELECT      │
    │ EXPORT TYPE │
    └──────┬──────┘
           │
    ┌──────┴──────┬─────────────┬──────────────┬─────────────┐
    │             │             │              │             │
    ▼             ▼             ▼              ▼             ▼
┌────────┐  ┌────────┐  ┌───────────┐  ┌────────┐  ┌────────┐
│  PDF   │  │  Word  │  │Google Docs│  │ Print  │  │Spread- │
│        │  │        │  │           │  │        │  │  sheet │
└───┬────┘  └───┬────┘  └─────┬─────┘  └───┬────┘  └───┬────┘
    │           │             │            │           │
    │           │             │            │           │
    ▼           ▼             ▼            ▼           ▼
┌─────────────────────────────────────────────────────────────────┐
│  PREPARE CONTENT                                                │
│                                                                 │
│  → Fetch Modul Ajar data from DB                                │
│  → Apply document template                                      │
│  → Format headers, sections, tables                             │
│  → Add school logo & header                                     │
│  → Add footer with page numbers                                 │
└─────────────────────────────────────────────────────────────────┘
    │           │             │            │           │
    ▼           ▼             ▼            ▼           ▼
┌──────────┐ ┌──────────┐ ┌────────────┐ ┌──────────┐ ┌──────────┐
│Convert to│ │Create    │ │Create new  │ │Open print│ │Convert to│
│PDF via   │ │.docx file│ │Google Doc  │ │dialog    │ │Google    │
│HTML2PDF  │ │library   │ │via Docs API│ │          │ │Sheets    │
└────┬─────┘ └────┬─────┘ └─────┬──────┘ └────┬─────┘ └────┬─────┘
     │            │             │             │            │
     ▼            ▼             ▼             ▼            ▼
┌──────────┐ ┌──────────┐ ┌────────────┐ ┌──────────┐ ┌──────────┐
│Save to   │ │Download  │ │Save to     │ │Browser   │ │Save to   │
│Drive or  │ │to local  │ │selected    │ │print     │ │Drive or  │
│download  │ │device    │ │folder      │ │preview   │ │download  │
└────┬─────┘ └────┬─────┘ └─────┬──────┘ └────┬─────┘ └────┬─────┘
     │            │             │             │            │
     └────────────┴─────────────┴─────────────┴────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ SHOW SUCCESS    │
                    │ TOAST           │
                    │ + OPEN FILE     │
                    └─────────────────┘
```

## 2.3 Data Flow Diagram (DFD)

### 2.3.1 DFD Level 0 (Context Diagram)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DATA FLOW DIAGRAM - LEVEL 0                              │
└─────────────────────────────────────────────────────────────────────────────┘

                         ┌──────────────────┐
                         │     GURU         │
                         │   (User)         │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
            ┌───────────┐ ┌───────────┐ ┌───────────┐
            │ Input     │ │ Request   │ │ Receive   │
            │ Data      │ │ Generate  │ │ Documents │
            └─────┬─────┘ └─────┬─────┘ └─────┬─────┘
                  │             │             │
                  └─────────────┼─────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │                       │
                    │   TEACHER GENERATOR   │
                    │      SYSTEM           │
                    │                       │
                    └───────────┬───────────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
    ┌─────────────────┐ ┌─────────────┐ ┌─────────────────┐
    │  Google Sheets  │ │ Google      │ │  Google Drive   │
    │  Database       │ │ AI Service  │ │  Storage        │
    │                 │ │             │ │                 │
    │ - Master Data   │ │ - Generate  │ │ - Backup        │
    │ - Modul Ajar    │ │   Content   │ │ - Exports       │
    │ - Jurnal        │ │ - Analyze   │ │ - Templates     │
    │ - Asesmen       │ │             │ │                 │
    │ - Bank Soal     │ │             │ │                 │
    │ - Bank Permainan│ │             │ │                 │
    └─────────────────┘ └─────────────┘ └─────────────────┘
```

### 2.3.2 DFD Level 1 (Main Processes)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DATA FLOW DIAGRAM - LEVEL 1                              │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────┐
                              │    GURU     │
                              └──────┬──────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         │                           │                           │
         ▼                           ▼                           ▼
┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
│  1.0 AUTHENTIC  │        │  2.0 MANAGE     │        │  3.0 GENERATE   │
│     ATION       │        │  MASTER DATA    │        │  DEVICE         │
└────────┬────────┘        └────────┬────────┘        └────────┬────────┘
         │                          │                          │
         ▼                          ▼                          ▼
┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
│  D1: USER       │        │  D2: MASTER     │        │  D3: GENERATED  │
│     SESSION     │        │     DATA        │        │     DATA        │
└─────────────────┘        └─────────────────┘        └─────────────────┘
         │                          │                          │
         │                          │                          │
         ▼                          ▼                          ▼
┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
│  4.0 VIEW &     │        │  5.0 EXPORT     │        │  6.0 BACKUP     │
│  EDIT DOCUMENT  │        │  DOCUMENT       │        │  & RESTORE      │
└────────┬────────┘        └────────┬────────┘        └────────┬────────┘
         │                          │                          │
         ▼                          ▼                          ▼
┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
│  D4: DOCUMENT   │        │  D5: EXPORT     │        │  D6: BACKUP     │
│  VERSIONS       │        │  LOGS           │        │  FILES          │
└─────────────────┘        └─────────────────┘        └─────────────────┘

DATA STORES:
┌─────────────────────────────────────────────────────────────────────────────┐
│  D1: USER_SESSION    → Session tokens, user preferences                     │
│  D2: MASTER_DATA     → Sekolah, Guru, Kelas, CP, TP, ATP, Materi, etc.      │
│  D3: GENERATED_DATA  → Modul Ajar, ATP, Prosem, Jurnal, etc.                │
│  D4: DOCUMENT_VER    → Version history, edit logs                           │
│  D5: EXPORT_LOGS     → Export history, download logs                        │
│  D6: BACKUP_FILES    → Backup snapshots, restore points                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3.3 DFD Level 2 (Generate Process Detail)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              DATA FLOW DIAGRAM - LEVEL 2 (GENERATE PROCESS)                 │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────┐
                              │    GURU     │
                              └──────┬──────┘
                                     │
                                     │ 1. Select Parameters
                                     ▼
                          ┌─────────────────────┐
                          │  3.1 GET INPUTS     │
                          └──────────┬──────────┘
                                     │
                                     │ 2. Fetch Master Data
                                     ▼
                          ┌─────────────────────┐
                          │  3.2 FETCH MASTER   │◄───────┐
                          │      DATA           │        │
                          └──────────┬──────────┘        │
                                     │                   │
                                     │ 3. CP, TP, ATP    │ D2: MASTER_DATA
                                     ▼                   │
                          ┌─────────────────────┐        │
                          │  3.3 BUILD PROMPT   │        │
                          └──────────┬──────────┘        │
                                     │                   │
                                     │ 4. AI Request     │
                                     ▼                   │
                          ┌─────────────────────┐        │
                          │  3.4 CALL AI API    │───────►│ External AI
                          └──────────┬──────────┘        │
                                     │                   │
                                     │ 5. AI Response    │
                                     ▼                   │
                          ┌─────────────────────┐        │
                          │  3.5 PARSE RESPONSE │        │
                          └──────────┬──────────┘        │
                                     │                   │
                                     │ 6. Validate       │
                                     ▼                   │
                          ┌─────────────────────┐        │
                          │  3.6 VALIDATE OUT   │        │
                          └──────────┬──────────┘        │
                                     │                   │
                            ┌────────┴────────┐          │
                            │                 │          │
                           OK              FAIL          │
                            │                 │          │
                            ▼                 └──────────┘
                          ┌─────────────────────┐
                          │  3.7 SAVE TO DB     │
                          └──────────┬──────────┘
                                     │
                                     │ 7. Store Generated Data
                                     ▼
                          ┌─────────────────────┐
                          │  3.8 PREPARE VIEW   │
                          └──────────┬──────────┘
                                     │
                                     │ 8. Display Result
                                     ▼
                              ┌─────────────┐
                              │    GURU     │
                              │  (View Doc) │
                              └─────────────┘
```

## 2.4 State Transition Diagram

### 2.4.1 Document State Machine

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              STATE TRANSITION DIAGRAM - DOCUMENT LIFECYCLE                  │
└─────────────────────────────────────────────────────────────────────────────┘

                         ┌─────────────┐
                         │   CREATED   │
                         │  (Initial)  │
                         └──────┬──────┘
                                │
                                │ Generate Complete
                                ▼
                         ┌─────────────┐
                    ┌────│    DRAFT    │◄────┐
                    │    └──────┬──────┘     │
                    │           │             │ Auto-save
                    │           │ Edit        │
                    │           ▼             │
                    │    ┌─────────────┐      │
                    │    │   EDITING   │──────┘
                    │    └──────┬──────┘
                    │           │
                    │           │ Save
                    │           ▼
                    │    ┌─────────────┐
                    │    │    SAVED    │
                    │    └──────┬──────┘
                    │           │
                    │           │ Export Request
                    │           ▼
                    │    ┌─────────────┐
                    │    │  EXPORTING  │
                    │    └──────┬──────┘
                    │           │
                    │           │ Export Complete
                    │           ▼
                    │    ┌─────────────┐
                    └───►│   READY     │
                         └──────┬──────┘
                                │
                                │ Archive
                                ▼
                         ┌─────────────┐
                         │  ARCHIVED   │
                         └─────────────┘

STATE TRANSITIONS:
┌─────────────────────────────────────────────────────────────────────────────┐
│ From      │ To        │ Trigger              │ Action                      │
├───────────┼───────────┼──────────────────────┼─────────────────────────────┤
│ CREATED   │ DRAFT     │ Generate complete    │ Store initial data          │
│ DRAFT     │ EDITING   │ User clicks edit     │ Load editor                 │
│ EDITING   │ DRAFT     │ Cancel edit          │ Discard changes             │
│ EDITING   │ SAVED     │ Click save           │ Update database             │
│ SAVED     │ EXPORTING │ Select export format │ Prepare document            │
│ EXPORTING │ READY     │ Export complete      │ Provide download link       │
│ READY     │ ARCHIVED  │ Manual archive       │ Move to archive             │
│ Any       │ DRAFT     │ Revert to draft      │ Restore previous version    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.4.2 User Session State Machine

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              STATE TRANSITION DIAGRAM - USER SESSION                        │
└─────────────────────────────────────────────────────────────────────────────┘

                    ┌─────────────┐
                    │   LOGGED    │
                    │    OUT      │
                    └──────┬──────┘
                           │
                           │ Login Attempt
                           ▼
                    ┌─────────────┐
                    │ AUTHENTICAT │
                    │     ING     │
                    └──────┬──────┘
                           │
                  ┌────────┴────────┐
                  │                 │
                Success           Failure
                  │                 │
                  ▼                 ▼
           ┌─────────────┐   ┌─────────────┐
           │  LOGGED IN  │   │   ERROR     │
           └──────┬──────┘   └──────┬──────┘
                  │                 │
                  │                 │ Retry
                  │                 │
                  │                 ▼
                  │          ┌─────────────┐
                  │          │ AUTHENTICAT │
                  │          │     ING     │
                  │          └─────────────┘
                  │
                  │ Active Session
                  ▼
           ┌─────────────┐
           │   ACTIVE    │◄───────┐
           └──────┬──────┘        │
                  │               │ User Activity
                  │ Idle Timeout  │
                  │               │
                  ▼               │
           ┌─────────────┐        │
           │    IDLE     │────────┘
           └──────┬──────┘
                  │
                  │ Extended Idle
                  ▼
           ┌─────────────┐
           │  EXPIRED    │
           └──────┬──────┘
                  │
                  │ Logout / Session End
                  ▼
           ┌─────────────┐
           │   LOGGED    │
           │    OUT      │
           └─────────────┘
```

## 2.5 Activity Diagram - Main Use Cases

### 2.5.1 Activity: Generate Modul Ajar

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ACTIVITY DIAGRAM - GENERATE MODUL AJAR                   │
└─────────────────────────────────────────────────────────────────────────────┘

    [Start]
       │
       ▼
    [Open Generator Page]
       │
       ▼
    [Load Form Inputs]
       │
       ├────────────────────────────────────────────┐
       │                                            │
       ▼                                            ▼
[Select Guru]                              [Select Sekolah]
       │                                            │
       ▼                                            ▼
[Select Kelas]                             [Select Semester]
       │                                            │
       ▼                                            ▼
[Select Fase]                              [Select Materi]
       │                                            │
       ▼                                            ▼
[Select Model Pembelajaran]                [Select Pendekatan]
       │                                            │
       ▼                                            ▼
[Select Metode]                            [Select Media]
       │                                            │
       ▼                                            ▼
[Select Profil Pelajar]                    [Input Jam Pelajaran]
       │                                            │
       └────────────────────────────────────────────┘
                          │
                          ▼
                   [Validate All Inputs]
                          │
                    ┌─────┴─────┐
                    │           │
                  Valid      Invalid
                    │           │
                    │           ▼
                    │     [Show Error Toast]
                    │           │
                    │           ▼
                    │     [Highlight Fields]
                    │           │
                    └───────────┘
                          │
                          ▼
                   [Build AI Prompt]
                          │
                          ▼
                   [Show Loading Screen]
                          │
                          ├──────────────────────┐
                          │                      │
                          ▼                      ▼
                   [Display Progress]     [Show Generation Tips]
                          │                      │
                          └──────────────────────┘
                                     │
                                     ▼
                          [Call AI Service]
                                     │
                                     ▼
                              {AI Processing}
                                     │
                                     ▼
                          [Receive AI Response]
                                     │
                                     ▼
                          [Parse JSON Response]
                                     │
                               ┌─────┴─────┐
                               │           │
                             Success    Failure
                               │           │
                               │           ▼
                               │     [Show Error]
                               │           │
                               │           ▼
                               │     [Offer Retry]
                               │           │
                               └───────────┘
                                     │
                                     ▼
                          [Format for Display]
                                     │
                                     ▼
                          [Render in Tabs]
                                     │
                          ┌──────────┴──────────┐
                          │                     │
                          ▼                     ▼
                   [Modul Ajar Tab]      [ATP Tab]
                          │                     │
                          ▼                     ▼
                   [Asesmen Tab]         [LKPD Tab]
                          │                     │
                          ▼                     ▼
                   [Media Tab]           [Refleksi Tab]
                          │
                          └──────────┬──────────┘
                                     │
                                     ▼
                          [Enable Edit Mode]
                                     │
                              ┌──────┴──────┐
                              │             │
                              ▼             ▼
                       [User Edits]   [Skip Edit]
                              │             │
                              │             │
                              └──────┬──────┘
                                     │
                                     ▼
                          [Save to Database]
                                     │
                                     ▼
                          [Show Success Toast]
                                     │
                                     ▼
                          [Enable Export Options]
                                     │
                              ┌──────┴──────┐
                              │             │
                              ▼             ▼
                       [Export PDF]   [Export Docs]
                              │             │
                              ▼             ▼
                       [Print]        [Save to Drive]
                              │
                              └──────┬──────┘
                                     │
                                     ▼
                                  [End]
```

### 2.5.2 Activity: Manage Master Data

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ACTIVITY DIAGRAM - MANAGE MASTER DATA                    │
└─────────────────────────────────────────────────────────────────────────────┘

    [Start]
       │
       ▼
    [Open Master Data Menu]
       │
       ├─────────────────────────────────────────────────────────────────┐
       │                                                                 │
       ▼                                                                 ▼
[Select Data Type]                                             [Search/Filter]
       │                                                                 │
       ├─────────────────────────────────────────────────────────┐       │
       │                                                         │       │
       ▼                                                         ▼       │
┌──────────────┐                                          [Apply Filter]  │
│ Available    │                                                 │       │
│ Types:       │                                                 ▼       │
│              │                                          [Filtered List] │
│ • Sekolah    │                                                 │       │
│ • Guru       │                                                 │       │
│ • Kelas      │                                                 │       │
│ • Fase       │                                                 │       │
│ • CP         │                                                 │       │
│ • TP         │                                                 │       │
│ • ATP        │                                                 │       │
│ • Materi     │                                                 │       │
│ • Permainan  │                                                 │       │
│ • Media      │                                                 │       │
└──────┬───────┘                                                 │       │
       │                                                         │       │
       └─────────────────────────────────────────────────────────┘       │
                                 │                                       │
                                 ▼                                       │
                          [Display Data Table]◄──────────────────────────┘
                                 │
                                 ├──────────────────────────────────┐
                                 │                                  │
                                 ▼                                  ▼
                          [View Details]                    [Add New Record]
                                 │                                  │
                                 │                                  ▼
                                 │                          [Show Add Form]
                                 │                                  │
                                 │                                  ▼
                                 │                          [Fill Form Data]
                                 │                                  │
                                 │                                  ▼
                                 │                          [Validate Input]
                                 │                                  │
                                 │                            ┌──────┴──────┐
                                 │                            │             │
                                 │                          Valid        Invalid
                                 │                            │             │
                                 │                            │             ▼
                                 │                            │       [Show Error]
                                 │                            │             │
                                 │                            └──────┬──────┘
                                 │                                   │
                                 ▼                                   ▼
                          [Edit Record]                    [Save to Database]
                                 │                                   │
                                 │                                   ▼
                                 │                           [Show Success]
                                 │                                   │
                                 │                                   │
                                 └───────────────────────────────────┘
                                                     │
                                                     ▼
                                              [Delete Record?]
                                                     │
                                               ┌─────┴─────┐
                                               │           │
                                              Yes         No
                                               │           │
                                               ▼           │
                                        [Confirm Delete]   │
                                               │           │
                                               ▼           │
                                        [Remove from DB]   │
                                               │           │
                                               ▼           │
                                        [Show Success]     │
                                               │           │
                                               └─────┬─────┘
                                                     │
                                                     ▼
                                              [Refresh List]
                                                     │
                                                     ▼
                                                  [End]
```

## 2.6 Sequence Diagram

### 2.6.1 Sequence: Generate Modul Ajar

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  SEQUENCE DIAGRAM - GENERATE MODUL AJAR                     │
└─────────────────────────────────────────────────────────────────────────────┘

Guru          UI (HTML)      Client (JS)      Server (GS)      Database      AI Service
 │                │                │                │              │              │
 │  Open          │                │                │              │              │
 │  Generator     │                │                │              │              │
 │───────────────>│                │                │              │              │
 │                │  Load Form     │                │              │              │
 │                │───────────────>│                │              │              │
 │                │                │  getMasterData │              │              │
 │                │                │───────────────>│              │              │
 │                │                │                │  querySheets │              │
 │                │                │                │─────────────>│              │
 │                │                │                │              │              │
 │                │                │                │<─────────────│              │
 │                │                │<───────────────│              │              │
 │                │<───────────────│                │              │              │
 │                │  Render Form   │                │              │              │
 │<───────────────│                │                │              │              │
 │                │                │                │              │              │
 │  Fill Form     │                │                │              │              │
 │  & Submit      │                │                │              │              │
 │───────────────>│                │                │              │              │
 │                │  validateInput │                │              │              │
 │                │───────────────>│                │              │              │
 │                │                │                │              │              │
 │                │<───────────────│ (valid)        │              │              │
 │                │                │                │              │              │
 │                │  showLoading   │                │              │              │
 │                │───────────────>│                │              │              │
 │                │                │  generateDoc   │              │              │
 │                │                │───────────────>│              │              │
 │                │                │                │  buildPrompt │              │
 │                │                │                │──────────────┼──────────────>│
 │                │                │                │              │              │
 │                │                │                │<─────────────┼──────────────│
 │                │                │                │  AI Response │              │
 │                │                │                │              │              │
 │                │                │                │  parseResult │              │
 │                │                │                │              │              │
 │                │                │                │  saveToDB    │              │
 │                │                │                │─────────────>│              │
 │                │                │                │              │              │
 │                │                │                │<─────────────│              │
 │                │                │                │              │              │
 │                │                │<───────────────│              │              │
 │                │<───────────────│                │              │              │
 │                │  renderResult  │                │              │              │
 │<───────────────│                │                │              │              │
 │                │                │                │              │              │
 │  Review & Edit │                │                │              │              │
 │───────────────>│                │                │              │              │
 │                │  saveChanges   │                │              │              │
 │                │───────────────>│                │              │              │
 │                │                │  updateRecord  │              │              │
 │                │                │───────────────>│              │              │
 │                │                │                │─────────────>│              │
 │                │                │                │<─────────────│              │
 │                │                │<───────────────│              │              │
 │                │<───────────────│                │              │              │
 │<───────────────│                │                │              │              │
 │                │                │                │              │              │
 │  Export PDF    │                │                │              │              │
 │───────────────>│                │                │              │              │
 │                │  exportPDF     │                │              │              │
 │                │───────────────>│                │              │              │
 │                │                │  generatePDF   │              │              │
 │                │                │───────────────>│              │              │
 │                │                │                │  createPDF   │              │
 │                │                │                │─────────────>│              │
 │                │                │                │<─────────────│              │
 │                │                │<───────────────│              │              │
 │                │<───────────────│                │              │              │
 │<───────────────│ (Download)     │                │              │              │
 │                │                │                │              │              │
```

## 2.7 Wireframe Flow Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         APPLICATION FLOW SUMMARY                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐
│   LOGIN     │
│   PAGE      │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MAIN LAYOUT                                       │
│  ┌────────────┐  ┌───────────────────────────────────────────────────────┐  │
│  │   SIDEBAR  │  │                    CONTENT AREA                       │  │
│  │            │  │                                                       │  │
│  │  Dashboard │  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  Generator │  │  │              DYNAMIC CONTENT                    │  │  │
│  │  Master    │  │  │                                                 │  │  │
│  │  Perangkat │  │  │  Changes based on menu selection                │  │  │
│  │  Asesmen   │  │  │                                                 │  │  │
│  │  Jurnal    │  │  │  • Dashboard Cards                              │  │  │
│  │  Permainan │  │  │  • Generator Form                               │  │  │
│  │  Admin     │  │  │  • Data Tables                                  │  │  │
│  │  Export    │  │  │  • Charts & Graphs                              │  │  │
│  │  Backup    │  │  │  • Document Viewer                              │  │  │
│  │  Setting   │  │  │                                                 │  │  │
│  │            │  │  └─────────────────────────────────────────────────┘  │  │
│  └────────────┘  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
       │
       ├──────────────────────────────────────────────────────────────────┐
       │                                                                  │
       ▼                                                                  ▼
┌─────────────┐                                                  ┌─────────────┐
│ GENERATOR   │                                                  │  DASHBOARD  │
│   FLOW      │                                                  │    FLOW     │
└──────┬──────┘                                                  └──────┬──────┘
       │                                                                │
       ▼                                                                ▼
┌─────────────┐                                                  ┌─────────────┐
│ Select      │                                                  │ Load        │
│ Parameters  │                                                  │ Statistics  │
└──────┬──────┘                                                  └──────┬──────┘
       │                                                                │
       ▼                                                                ▼
┌─────────────┐                                                  ┌─────────────┐
│ Generate    │                                                  │ Render      │
│ (AI)        │                                                  │ Charts      │
└──────┬──────┘                                                  └──────┬──────┘
       │                                                                │
       ▼                                                                ▼
┌─────────────┐                                                  ┌─────────────┐
│ Preview     │                                                  │ Show KPIs   │
│ Result      │                                                  └─────────────┘
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Edit & Save │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Export      │
└─────────────┘
```

---

## ✅ TAHAP 2: FLOWCHART APLIKASI - SELESAI

### 📋 Deliverables Tahap 2:

1. **User Flow Diagram** - Complete journey dari login hingga export
2. **Process Flow Diagram** - Detail proses generate dan export
3. **Data Flow Diagram (DFD)** - Level 0, 1, dan 2
4. **State Transition Diagram** - Document lifecycle dan user session
5. **Activity Diagram** - Main use cases (Generate & Master Data)
6. **Sequence Diagram** - Interaction antara components
7. **Wireframe Flow Summary** - High-level screen flow

### 🎯 Key Insights dari Flowchart:

1. **Generator Flow** adalah core feature dengan 9 langkah terstruktur
2. **Error Handling** di setiap tahap untuk reliability
3. **Multiple Export Paths** untuk fleksibilitas user
4. **State Management** yang jelas untuk document lifecycle
5. **Async AI Processing** dengan loading states yang informatif

### ➡️ Langkah Selanjutnya:
Melanjutkan ke **Tahap 3: ERD Database** yang akan mendefinisikan:
- Entity Relationship Diagram lengkap
- Tabel dan relasi antar entitas
- Primary keys, foreign keys
- Indexing strategy
- Data types dan constraints

**Siap melanjutkan ke Tahap 3?**
