const style = document.createElement("style");
style.textContent = `
  #floating-note-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 250px;
    height: 250px;
    min-width: 150px;
    min-height: 150px;
    background-color: #fefabc;
    border: 1px solid #e0d882;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    border-radius: 8px;
    z-index: 999999;
    display: flex;
    flex-direction: column;
    resize: both;
    overflow: hidden;
    font-family: Arial, sans-serif;
  }
  #floating-note-header {
    background-color: #f5e87a;
    padding: 6px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 12px;
    color: #444;
  }
  #floating-note-hide {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    color: #555;
  }
  #floating-note-container textarea {
    flex: 1;
    border: none;
    background: transparent;
    padding: 8px;
    resize: none;
    outline: none;
    font-size: 13px;
    color: #333;
  }
  #floating-note-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fefabc;
    border: 1px solid #e0d882;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    cursor: pointer;
    z-index: 999999;
    display: none;
    font-size: 18px;
  }
`;
document.head.appendChild(style);
// Create toggle button
const toggleBtn = document.createElement("button");
toggleBtn.innerText = "📝";
toggleBtn.id = "floating-note-toggle";

// Create note container
const noteContainer = document.createElement("div");
noteContainer.id = "floating-note-container";

// Create header for dragging/hiding
const header = document.createElement("div");
header.id = "floating-note-header";
header.innerHTML = "<span>Sticky Note</span>";

const hideBtn = document.createElement("button");
hideBtn.innerText = "✕";
hideBtn.id = "floating-note-hide";

header.appendChild(hideBtn);

// Create resizable textarea
const textarea = document.createElement("textarea");
textarea.placeholder = "Type your notes here...";

noteContainer.appendChild(header);
noteContainer.appendChild(textarea);

document.body.appendChild(toggleBtn);
document.body.appendChild(noteContainer);

// Load saved note
chrome.storage.local.get(["userNote", "noteHidden"], (result) => {
  if (result.userNote) textarea.value = result.userNote;
  if (result.noteHidden) {
    noteContainer.style.display = "none";
    toggleBtn.style.display = "block";
  }
});

// Auto-save on typing
textarea.addEventListener("input", () => {
  chrome.storage.local.set({ userNote: textarea.value });
});

// Hide panel
hideBtn.addEventListener("click", () => {
  noteContainer.style.display = "none";
  toggleBtn.style.display = "block";
  chrome.storage.local.set({ noteHidden: true });
});

// Unhide panel
toggleBtn.addEventListener("click", () => {
  noteContainer.style.display = "flex";
  toggleBtn.style.display = "none";
  chrome.storage.local.set({ noteHidden: false });
});