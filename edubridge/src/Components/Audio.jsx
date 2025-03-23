const speakerBtn = document.getElementById("speakerBtn");
const soundPopup = document.getElementById("soundPopup");
const closePopupBtn = document.getElementById("closePopupBtn");
const audioPlayer = document.getElementById("audioPlayer");
const audioSource = document.getElementById("audioSource");
const soundOptions = document.querySelectorAll(".sound-option");

// Function to open the popup
speakerBtn.addEventListener("click", () => {
  soundPopup.style.display = "block";
});

// Function to close the popup
closePopupBtn.addEventListener("click", () => {
  soundPopup.style.display = "none";
});

// Function to play selected sound
soundOptions.forEach(option => {
  option.addEventListener("click", (e) => {
    const selectedSound = e.target.dataset.sound;
    let soundUrl = "";

    // Set the audio source based on the selected sound
    if (selectedSound === "brown") {
      soundUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Example link for Brown Noise (Replace with real URL)
    } else if (selectedSound === "white") {
      soundUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"; // Example link for White Noise (Replace with real URL)
    } else if (selectedSound === "rain") {
      soundUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"; // Example link for Rain Sounds (Replace with real URL)
    } else if (selectedSound === "none") {
      audioPlayer.pause();
      audioSource.src = ""; // Stop any sound if "No Sound" is selected
      return;
    }

    // Set the audio source and play
    audioSource.src = soundUrl;
    audioPlayer.load();  // Reload the audio element
    audioPlayer.play();  // Start the audio
    soundPopup.style.display = "none";  // Close the popup after selecting
  });
});