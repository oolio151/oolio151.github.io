const introLines = document.querySelectorAll('.intro-line');
const intro = document.getElementById('intro');
const welcomeLine = document.getElementById('welcome-line');
const consoleOutput = document.getElementById('console-output');
const consoleLine = document.getElementById('console-line');
const consoleCmd = document.getElementById('console-cmd');
const navLinks = document.querySelectorAll('header a');

const content = {
  about: "Hi! I'm Varun Sammeta, a Computer Engineering Student at the University of Maryland, College Park. I have experience with robotics, various types of collaborative software projects, and AI.<br>I am currently working tech staff and development at UMIACS, and working on some side projects including emulators and microcontroller tools.",
  experience: "<a href='https://umiacs.umd.edu'>Technical Staff and Development @ UMIACS</a> | Feb 26-Now<br><span style='--crt-color: #25b349;'>Setup/modfication of software and hardware used for research, system administration, creation and revamping of internal apps used for management, and staffing of the UMIACS Help Desk.</span><br><br><a href='https://terpsracing.umd.edu'>Electrical Subteam @ Terps Racing EV</a><br><span style='--crt-color: #25b349;'>UMD's Formula SAE Electric Vehicle team. I worked on the CAN bus for car telemetry as well as on the software for the car's dashboard utilizing a Raspberry Pi and a custom CAN HAT. I also created a webapp to make custom dashboard and signal configurations.</span>",
  projects: "coming soon",
  connect: "email here"
};

introLines.forEach((line, i) => {
  setTimeout(() => {
    line.classList.add('visible');
  }, i * 500);
});

setTimeout(() => {
  intro.style.display = 'none';
  welcomeLine.style.display = 'block';
  consoleLine.style.display = 'block';
}, introLines.length * 500 + 400);

navLinks.forEach(link => {
  const section = link.getAttribute('href').replace('#', '');

  const label = link.dataset.label || section;

  link.addEventListener('mouseenter', () => {

    if (label === "varun")
        consoleCmd.textContent = '$ bash magic_page_refresh.sh';
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
        consoleOutput.innerHTML = content[section] || '';    
    }
    
  });
});