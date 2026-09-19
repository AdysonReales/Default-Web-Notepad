document.addEventListener("DOMContentLoaded", () => {
  const noteArea = document.getElementById("note");

  // Load saved note when popup opens
  chrome.storage.local.get(["userNote"], (result) => {
    if (result.userNote) {
      noteArea.value = result.userNote;
    }
  });

  // Save note automatically on every keypress
  noteArea.addEventListener("input", () => {
    chrome.storage.local.set({ userNote: noteArea.value });
  });
});