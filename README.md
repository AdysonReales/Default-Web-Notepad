# 📝 WebNotepad

A lightweight Chrome extension that combines a **persistent sticky note** with a **developer-focused to-do list**.

WebNotepad gives you a quick workspace for writing notes and managing small development tasks without leaving the website or opening another application.

---

## ✨ Features

### 📌 Sticky Notes

- Persistent note-taking
- Automatically saves while typing
- Notes are available across new tabs and websites
- Simple, distraction-free interface

### ✅ Developer To-Do List

- Add tasks using the `+` button
- Each task supports:
  - **Title**
  - **Description**
- Mark tasks as completed
- Delete tasks
- Tasks are automatically saved
- Tasks remain available after restarting Chrome
- Color-coded task cards for easier visual organization

### 🌐 New Tab Integration

WebNotepad replaces the default Chrome New Tab page with a personal workspace containing:

- To-do list
- Sticky note
- Quick task creation

### 💾 Persistent Storage

The extension uses Chrome's local storage to save:

- Sticky notes
- To-do tasks
- Task completion status

Your notes and tasks remain available between browser sessions.

---

## 🖥️ Interface

```text
┌──────────────────────────────┬───────────────────────────┐
│ To-do                    [+] │ Sticky Note               │
├──────────────────────────────┤                           │
│                              │                           │
│ ☐ Fix authentication         │ Type your notes here...   │
│   Fix JWT refresh bug        │                           │
│                              │                           │
│ ☐ Update dashboard           │                           │
│   Finish admin statistics    │                           │
│                              │                           │
│ ☑ Update documentation       │                           │
│   Add API endpoint docs      │                           │
│                              │                           │
└──────────────────────────────┴───────────────────────────┘
