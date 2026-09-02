const introLines = document.querySelectorAll('.intro-line');
const intro = document.getElementById('intro');
const welcomeLine = document.getElementById('welcome-line');
const consoleOutput = document.getElementById('console-output');
const consoleLine = document.getElementById('console-line');
const consoleCmd = document.getElementById('console-cmd');
const navLinks = document.querySelectorAll('header a');
let contentTimers = [];
const speedModifier = 0.6;

const themes = {
  green: {
    primary: "#33ff66",
    secondary: "#25b349",
    tertiary: "#a5b325",
    accent: "#3347ff",
    background: "#0d0d0d",
    fade: "#2b2b2b",
  },
  amber: {
    primary: "#ffb000",
    secondary: "#d17b00",
    tertiary: "#ffe066",
    accent: "#ff5c35",
    background: "#140f08",
    fade: "#3a2b18",
  },
  blue: {
    primary: "#62d8ff",
    secondary: "#2aa6c9",
    tertiary: "#b5e853",
    accent: "#9d7cff",
    background: "#080d14",
    fade: "#233342",
  },
  mono: {
    primary: "#5c3b24",
    secondary: "#79563b",
    tertiary: "#9a6b3f",
    accent: "#3f2a1d",
    background: "#e8dcc4",
    fade: "#b9a98a",
  },
};

function applyTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) return;

  const root = document.documentElement;
  Object.entries(theme).forEach(([role, color]) => {
    root.style.setProperty(`--crt-${role}`, color);
  });

  document.querySelectorAll('.theme-button').forEach(button => {
    button.setAttribute('aria-pressed', button.dataset.theme === themeName);
  });

  localStorage.setItem('crt-theme', themeName);
}

document.querySelectorAll('.theme-button').forEach(button => {
  button.addEventListener('click', () => applyTheme(button.dataset.theme));
});

applyTheme(localStorage.getItem('crt-theme') || 'green');

class Song{
  constructor(filename, title, artist, link = ""){
    this.albumcover = filename;
    this.title = title;
    this.artist = artist;
    this.link = link;
  }
}

const songs = [
  new Song("assets/music/blow.jpg", "Blow", "Kesha", "https://open.spotify.com/track/3pYDZTJM2tVBUhIRifWVzI?si=19898db7f5884f7c"),
  new Song("assets/music/champion.jpg", "Champion", "Kanye West", "https://open.spotify.com/track/4UQMOPSUVJVicIQzjAcRRZ?si=ed9e7d994c6b42b5"),
  new Song("assets/music/darkthoughts.jpg", "Dark Thoughts", "Lil Tecca", "https://open.spotify.com/track/7EW7Yivb93qKAtp5qEm5of?si=56f34410ef234a15"),
  new Song("assets/music/easy.jpg", "EASY", "LE SSERAFIM", "https://open.spotify.com/track/2O4Bb2WCkjlTPO827OnBMI?si=d79f789489a245f6"),
  new Song("assets/music/home.jpg", "Home", "Metro Boomin", "https://open.spotify.com/track/2qlBAT108lYOzlXhBxBqEv?si=a57337b664034bb6"),
  new Song("assets/music/igloo.jpg", "Igloo", "KISS OF LIFE", "https://open.spotify.com/track/2DbDefRFJ5YOfXCKOeCJJh?si=b20540fd8d8c45a8"),
  new Song("assets/music/inthenight.jpg", "In the Night", "The Weeknd", "https://open.spotify.com/track/25KybV9BOUlvcnv7nN3Pyo?si=8c36dc61488a40ca"),
  new Song("assets/music/nightcrawler.jpg", "Nightcrawler", "Travis Scott", "https://open.spotify.com/track/3xby7fOyqmeON8jsnom0AT?si=66f961a345ed4811"),
  new Song("assets/music/wakemeup.jpg", "Wake Me Up", "The Weeknd", "https://open.spotify.com/track/5673WA8EEUSPx1ir26lhGW?si=dc7d66df795540c1"),
  new Song("assets/music/wastedsummer.jpg", "Alphabet (Wasted Summer)", "Lovejoy", "https://open.spotify.com/track/0NnRAEXyHbn6xJACYVFnb0?si=b94b6030405845fe"),
  new Song("assets/music/goosebumps.jpg", "Goosebumps", "Travis Scott", "https://open.spotify.com/track/6gBFPUFcJLzWGx4lenP6h2?si=dd74968f22ad4ad0"),
];

function createSongSection(songIndex) {
  const song = songs[songIndex];
  const songTitle = `<a href="${song.link}" target="_blank" rel="noopener noreferrer">${song.title} <i class="bi bi-box-arrow-up-right"></i></a>`;

  return `<div class="song-section" data-song-index="${songIndex}">
    <div class="song-heading">
      <span>random song:</span>
    </div>
    <div class="song-row">
      <img src="${song.albumcover}" alt="${song.title} album cover">
      <div>
        <div>${songTitle} </div>
        <div style="--crt-color: var(--crt-secondary);">${song.artist}</div>
      </div>
    </div>
  </div>`;
}

function createAboutContent() {
  const songIndex = Math.floor(Math.random() * songs.length);

  return `<div class="sequential-content">
    <p>Hi! I'm Varun Sammeta, a Computer Engineering Student at the University of Maryland, College Park, most likely graduating Fall 2028. I have experience with robotics, various types of collaborative software projects, and AI.</p>
    <p>I am currently working tech staff and development at UMIACS, and working on some side projects including an NES emulator and microcontroller tools.</p>
    <p>Based in MD.</p>
    <p>Feel free to reach out at <a href="mailto:vsammeta5526@gmail.com" target="_blank" rel="noopener noreferrer">vsammeta5526@gmail.com</a></p>
    ${createSongSection(songIndex)}
  </div>`;
}

const content = {
  about: createAboutContent,
  experience: `
  <div class="sequential-content" style="
    display: flex;
    flex-direction: column;
  ">

    <div style="margin-bottom: 0.5rem;">Work Experience</div>
    <div style="
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
      margin-bottom: 2rem;
    ">
      <img
        src="assets/umiacs.png"
        alt="UMIACS"
        style="
          width: 6ch;
          height: 6ch;
          object-fit: fill;
          flex-shrink: 0;
        "
      >

      <div style="flex: 1;">
        <a href="https://umiacs.umd.edu" target="_blank" rel="noopener noreferrer">
          Technical Staff and Development @ UMIACS <i class="bi bi-box-arrow-up-right"></i>
        </a> | Feb 26-Now
        <br>
        <span style="--crt-color: var(--crt-secondary);">
          Setup/modification of software and hardware used for research,
          system administration, creation and revamping of internal apps
          used for management, and staffing of the UMIACS Help Desk.
        </span><br>
        <span style="--crt-color: var(--crt-tertiary);">Tech: Django, Puppet, Linux, Cobbler</span>
      </div>
    </div>

    <div style="
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
    ">
      <img
        src="assets/trev2.png"
        alt="Terps Racing EV"
        style="
          width: 6ch;
          height: 6ch;
          object-fit: contain;
          flex-shrink: 0;
        "
      >

      <div style="flex: 1;">
        <a href="https://racing.umd.edu/formula-ev/" target="_blank" rel="noopener noreferrer">
          Electrical Subteam @ Terps Racing EV <i class="bi bi-box-arrow-up-right"></i>
        </a> | Sep 25-Now
        <br>
        <span style="--crt-color: var(--crt-secondary);">
          UMD's Formula SAE Electric Vehicle team. I worked on the CAN bus
          for car telemetry as well as on the software for the car's dashboard
          utilizing a Raspberry Pi and a custom CAN HAT. I also created a
          webapp to make custom dashboard and signal configurations.
        </span><br>
        <span style="--crt-color: var(--crt-tertiary);">Tech: Python, Raspberry Pi, CAN</span>
      </div>
    </div>
    <br>
    <div style="margin-bottom: 0.1rem;">Skills</div>
    <span style="--crt-color: var(--crt-secondary);">
      Rust, C++, Python, Java, HTML/CSS/JS, React, Node.js, C#<br>
      Microcontrollers, Robotics, Linux, Git, Docker, REST APIs, Emulation, Django, Unity
    </span>
  </div>
`,
  projects: `
  <div class="sequential-content" style="
    display: flex;
    flex-direction: column;
    gap: 2rem;
  ">

    <div style="
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
    ">
      <div style="flex: 1;">
        <a href="https://github.com/oolio151/nes" target="_blank" rel="noopener noreferrer">
          oolio151-nes <i class="bi bi-box-arrow-up-right"></i>
        </a>
        <br>
        <span style="--crt-color: #25b349;">
          An in progress Nintendo Entertainment System emulator written in Rust. Currently working on the APU (audio processing unit), while the 6502-based CPU interpreter and PPU graphics chip are complete. For now it only supports NROM-based games, but more mappers will be added.
        </span>
        <br>
        <span style="--crt-color: var(--crt-tertiary);">Tech: Rust, 6502 Assembly</span>
      </div>
    </div>

    <div style="
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
    ">
      <div style="flex: 1;">
        <a href="https://github.com/oolio151/esp32-api-companion" target="_blank" rel="noopener noreferrer">
          esp32-api-companion <i class="bi bi-box-arrow-up-right"></i>
        </a>
        <br>
        <span style="--crt-color: var(--crt-secondary);">
          An in-progress tool for the ESP32 microcontroller (and perhaps soon the raspberry pi) that allows for easy control and reading of the pins and serial output, as well as other states, through a REST API and a web interface, allowing for easier integration. Created using Arduino C++ libraries.
        </span>
        <br>
        <span style="--crt-color: var(--crt-tertiary);">Tech: C++, REST API, Microcontrollers</span>
      </div>
    </div>

  </div>`,
  connect: "email here"
};

introLines.forEach((line, i) => {
  setTimeout(() => {
    line.classList.add('visible');
  }, i * 500);
});

setTimeout(() => {
  intro.style.display = 'none';
  welcomeLine.innerHTML = createAboutContent();
  welcomeLine.style.display = 'block';
  consoleLine.style.display = 'block';
  revealSequentialContent(welcomeLine);
}, introLines.length * 500 + 400);

function revealSequentialContent(output) {
  const container = output.querySelector('.sequential-content');
  if (!container) return;

  const blocks = Array.from(container.children).filter(
    element => element.tagName !== 'BR'
  );

  blocks.forEach((block, i) => {
    block.classList.add('loading-block');
    const timer = setTimeout(() => {
      block.classList.add('visible');
    }, i * 500 * speedModifier);
    contentTimers.push(timer);
  });
}

function showContentSequentially(html) {
  contentTimers.forEach(clearTimeout);
  contentTimers = [];
  consoleOutput.innerHTML = html;
  revealSequentialContent(consoleOutput);
}

document.addEventListener('click', (event) => {
  const refreshButton = event.target.closest('.song-refresh');
  if (!refreshButton) return;

  const currentSection = refreshButton.closest('.song-section');
  const currentIndex = Number(currentSection.dataset.songIndex);
  let nextIndex = currentIndex;

  if (songs.length > 1) {
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * songs.length);
    }
  }

  currentSection.outerHTML = createSongSection(nextIndex);
});

navLinks.forEach(link => {
  const section = link.getAttribute('href').replace('#', '');

  const label = link.dataset.label || section;

  link.addEventListener('mouseenter', () => {

    if (label === "varun")
        consoleCmd.textContent = '$ clear';
    else if (label === "https://github.com/oolio151")
        consoleCmd.textContent = '$ github -u oolio151'
    else if (label === "https://linkedin.com/in/varsam")
        consoleCmd.textContent = '$ linkedin -u varsam'
    else if (label === "mailto:vsammeta5526@gmail.com")
        consoleCmd.textContent = '$ email -m \"vsammeta5526@gmail.com\"'
    else if (label === "")
        {}
    else 
        consoleCmd.textContent = '$ ' + label;
  });

  link.addEventListener('mouseleave', () => {
    consoleCmd.textContent = '$';
  });

  link.addEventListener('click', (e) => {
    if(!(label.startsWith("https") || label.startsWith("mailto"))){
        e.preventDefault();
        welcomeLine.style.display = 'none';
        const sectionContent = typeof content[section] === 'function'
          ? content[section]()
          : content[section] || '';
        showContentSequentially(sectionContent);
    }
    
  });
});
