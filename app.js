const DATA = {
  profile: {
    name: "Ethan Sheffield",
    headline: "Embedded, Systems & Full-Stack Software Engineer",
    bio: "CS B.S. student at Colorado State University (4.0 GPA, May 2027). I build embedded telemetry pipelines, zero-dependency network protocols, and automated Python workflows.",
    location: "Fort Collins, CO",
    availability: "Available May/June 2027",
    email: "ethan.sheffield@colostate.edu",
    phone: "307-258-2374",
    github: "https://github.com/esheffield48",
    linkedin: "https://www.linkedin.com/in/ethan-sheffield-616452388"
  },
  tracks: ["All", "Embedded & IoT", "Systems & Networking", "Full-Stack", "ML & Data"],
  projects: [
    {
      slug: "monitoring",
      title: "Remote Patient Monitoring System",
      track: "Embedded & IoT",
      context: "CS370 Operating Systems",
      summary: "Biomedical sensors on Arduino Nano 33 IoT streaming vitals over UDP to a Raspberry Pi Linux host and MQTT dashboard.",
      details: [
        "Offloaded packet parsing from the microcontroller to a Python service on Raspberry Pi Linux so sensor sampling stayed responsive.",
        "Published structured live telemetry over MQTT to a ThingsBoard monitoring dashboard."
      ],
      stack: ["Arduino Nano 33 IoT", "Raspberry Pi", "Linux", "Python", "UDP", "MQTT", "ThingsBoard"],
      github: "https://github.com/esheffield48/IoT-Based-Remote-Health-Monitoring-System"
    },
    {
      slug: "tankscii",
      title: "Tankscii: Terminal Artillery",
      track: "Systems & Networking",
      context: "CS457 Computer Networks · Google Antigravity",
      summary: "Multi-client turn-based terminal game with an authoritative Python 3 server and custom JSON protocol over TCP/WebSockets.",
      details: [
        "Built with zero external dependencies using only the Python 3 standard library.",
        "Eliminated multi-subnet state drift across Cisco Modeling Labs using a strict newline-delimited JSON protocol."
      ],
      stack: ["Python 3", "IPv4 TCP Sockets", "WebSockets", "JSON", "Cisco Modeling Labs", "Google Antigravity"],
      github: "https://github.com/esheffield48/CS457_Tankscii-_Terminal_Artillery"
    },
    {
      slug: "trip-planner",
      title: "Trip Planning Web Application",
      track: "Full-Stack",
      context: "CS314 Software Engineering · 4-Person Agile Team",
      summary: "Full-stack global trip planner with Java, SQL, REST endpoint validation in Postman, and automated JUnit test suites.",
      details: [
        "Implemented route calculation/optimization, place search, and SQL queries for nearby locations.",
        "Managed sprint delivery via GitHub pull requests, peer code reviews, and JUnit regression checks."
      ],
      stack: ["Java", "SQL", "REST APIs", "JUnit", "Postman", "Agile", "Git/GitHub"],
      github: ""
    },
    {
      slug: "noerouge",
      title: "NoeRouge: 2D Roguelike Game",
      track: "Full-Stack",
      context: "CSC2034 C++ Programming · FRCC",
      summary: "C++ 2D roguelike featuring procedural map generation, real-time input, and decoupled Raylib rendering.",
      details: [
        "Separated core simulation state and inventory management from the Raylib 2D rendering layer for clean maintenance."
      ],
      stack: ["C++", "Raylib", "Visual Studio", "Git/GitHub"],
      github: "https://github.com/esheffield48/NoeRouge"
    },
    {
      slug: "nba-predictor",
      title: "NBA Game Predictor: ML Pipeline",
      track: "ML & Data",
      context: "CS345 Machine Learning · CSU",
      summary: "Leakage-free chronological ML pipeline evaluating 33 differential features across 46,562 NBA games (1979–2023).",
      details: [
        "Used strict chronological splits and TimeSeriesSplit CV to prevent temporal data leakage.",
        "Reached 61.4% test accuracy (0.715 F1) with a GridSearchCV-tuned Linear SVM classifier."
      ],
      stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Jupyter Notebook"],
      github: "https://github.com/esheffield48/NBA-Game-Predictor-ML-Model-Analysis"
    }
  ],
  skills: [
    { category: "Languages", items: ["Python", "C", "C++", "Java", "SQL", "Assembly (x86, RISC-V, MIPS, LC3)"] },
    { category: "Embedded & Networking", items: ["Linux", "Arduino Nano 33 IoT", "Raspberry Pi", "UDP", "MQTT", "IPv4 TCP Sockets", "WebSockets", "Cisco Modeling Labs"] },
    { category: "Testing & Tooling", items: ["JUnit", "Postman", "Git/GitHub", "Docker", "Maven", "Google Antigravity", "Agile / Code Reviews"] },
    { category: "Data & Graphics", items: ["NumPy", "Pandas", "Scikit-learn", "Matplotlib", "Raylib", "Jupyter Notebook"] }
  ],
  experience: {
    role: "Operations & Technology Manager",
    org: "Manders Art LLC · Fort Collins, CO",
    period: "2018 – Present",
    highlights: [
      "Automated intake for ~700–800 submissions and ~200 bookings/year using Python CSV scripts and Google Workspace, deduplicating repeat clients and generating summary reports.",
      "Designed and maintained the Squarespace website, custom scheduling workflow, inventory tracking, and client communications."
    ]
  },
  education: [
    {
      school: "Colorado State University",
      degree: "B.S. in Computer Science · Expected May 2027 · 4.0 GPA",
      coreCoursework: "OS (CS370), Computer Architecture (CS470 / ECE452: Memory Hierarchy, Storage & I/O), Software Engineering (CS314), Algorithms (CS320), ML (CS345)",
      inProgress: "Computer Networks (CS457), Distributed Systems (CS455), Software Testing (CS415), CyberSecurity (CS456), Software Dev with AI (CS480A9), 3D UI (CS567)"
    },
    {
      school: "Front Range Community College",
      degree: "A.S. in Computer Science · Completed May 2025 · 4.0 GPA · Summa Cum Laude",
      coreCoursework: "Computer Architecture/Assembly (CSC2025), C++ Programming (CSC2034), CS II (CS165), Discrete Structures (CS220)",
      inProgress: ""
    }
  ]
};

const COMMANDS = ["overview", "whoami", "projects", "ls", "cat", "skills", "experience", "education", "contact", "theme", "help", "clear"];
const viewportEl = document.getElementById("terminal-output");
const feedbackEl = document.getElementById("cli-feedback");
const formEl = document.getElementById("terminal-form");
const inputEl = document.getElementById("cli-input");
const themeSelect = document.getElementById("theme-select");
const titlePathEl = document.getElementById("title-path");

let activeTrack = "All";
const expandedSlugs = new Set();
const cmdHistory = [];
let historyIndex = -1;

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function renderOverview() {
  const p = DATA.profile;
  document.getElementById("overview-content").innerHTML = `
    <div class="hero-box">
      <pre class="ascii-art" aria-hidden="true">
  ______ _   _                 
 |  ____| | | |                
 | |__  | |_| |__   __ _ _ __  
 |  __| | __| '_ \\ / _\` | '_ \\ 
 | |____| |_| | | | (_| | | | |
 |______|\\__|_| |_|\\__,_|_| |_|
      </pre>
      <div class="hero-meta">
        <h1>${esc(p.name)}</h1>
        <div class="subtitle">${esc(p.headline)}</div>
        <p>${esc(p.bio)}</p>
        <div class="stat-pills">
          <span class="stat-pill">4.0 GPA (CSU &amp; FRCC)</span>
          <span class="stat-pill">${esc(p.location)}</span>
          <span class="stat-pill">${esc(p.availability)}</span>
        </div>
      </div>
    </div>
  `;
}

function renderProjects() {
  const filtered = activeTrack === "All"
    ? DATA.projects
    : DATA.projects.filter((pr) => pr.track === activeTrack);

  document.getElementById("projects-content").innerHTML = `
    <div class="filter-bar">
      ${DATA.tracks.map((t) => `
        <button type="button" class="filter-pill ${t === activeTrack ? "is-active" : ""}" data-track="${esc(t)}">${esc(t)}</button>
      `).join("")}
    </div>
    <div class="card-list">
      ${filtered.map((pr) => {
        const isOpen = expandedSlugs.has(pr.slug);
        return `
          <article class="term-card" id="proj-${esc(pr.slug)}">
            <div class="term-card-head">
              <span class="term-card-title">${esc(pr.title)}</span>
              <span class="term-card-meta">${esc(pr.context)}</span>
            </div>
            <div class="card-summary">${esc(pr.summary)}</div>
            <div class="tag-row">
              ${pr.stack.slice(0, 5).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
            </div>
            <div class="card-actions">
              <button type="button" class="inline-action" data-toggle-slug="${esc(pr.slug)}">${isOpen ? "[-] hide details" : "[+] inspect"}</button>
              ${pr.github ? `<a class="inline-action" href="${esc(pr.github)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>` : `<span class="muted" style="font-size:11.5px;">Course Repo (Private)</span>`}
            </div>
            ${isOpen ? `
              <div class="expand-box">
                <ul class="bullet-list">
                  ${pr.details.map((d) => `<li>${esc(d)}</li>`).join("")}
                </ul>
              </div>
            ` : ""}
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderSkills() {
  document.getElementById("skills-content").innerHTML = `
    <div class="grid-2">
      ${DATA.skills.map((grp) => `
        <div class="term-card">
          <div class="term-card-title" style="margin-bottom:8px;">${esc(grp.category)}</div>
          <div class="tag-row">
            ${grp.items.map((item) => `<span class="tag">${esc(item)}</span>`).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderExperience() {
  const e = DATA.experience;
  document.getElementById("experience-content").innerHTML = `
    <div class="term-card">
      <div class="term-card-head">
        <span class="term-card-title">${esc(e.role)}</span>
        <span class="term-card-meta">${esc(e.org)} · ${esc(e.period)}</span>
      </div>
      <div class="stat-pills" style="margin:8px 0 10px;">
        <span class="stat-pill">~700–800 submissions/yr automated</span>
        <span class="stat-pill">~200 bookings/yr</span>
        <span class="stat-pill">8+ years ownership</span>
      </div>
      <ul class="bullet-list">
        ${e.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderEducation() {
  document.getElementById("education-content").innerHTML = `
    <div class="card-list">
      ${DATA.education.map((ed) => `
        <div class="term-card">
          <div class="term-card-head">
            <span class="term-card-title">${esc(ed.school)}</span>
            <span class="term-card-meta">${esc(ed.degree)}</span>
          </div>
          <div class="card-summary"><strong>Core:</strong> ${esc(ed.coreCoursework)}</div>
          ${ed.inProgress ? `<div class="muted" style="font-size:12px;"><strong>In Progress (2026–2027):</strong> ${esc(ed.inProgress)}</div>` : ""}
        </div>
      `).join("")}
    </div>
  `;
}

function renderContact() {
  const p = DATA.profile;
  document.getElementById("contact-content").innerHTML = `
    <div class="grid-2">
      <div class="term-card">
        <div class="term-card-title" style="margin-bottom:6px;">Direct Contact</div>
        <div class="card-summary">Email: <a class="accent" href="mailto:${esc(p.email)}">${esc(p.email)}</a></div>
        <div class="card-summary">Phone: <span class="secondary">${esc(p.phone)}</span></div>
        <div class="muted" style="font-size:12px;">${esc(p.location)} · ${esc(p.availability)}</div>
      </div>
      <div class="term-card">
        <div class="term-card-title" style="margin-bottom:6px;">Profiles</div>
        <div class="card-actions" style="margin-top:4px;">
          <a class="inline-action" href="${esc(p.github)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a class="inline-action" href="${esc(p.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <button type="button" class="inline-action" data-copy-email="${esc(p.email)}">Copy Email</button>
        </div>
      </div>
    </div>
  `;
}

function setActiveTab(sectionId) {
  document.querySelectorAll(".quick-bar .cmd-chip[data-section]").forEach((el) => {
    el.classList.toggle("is-active", el.dataset.section === sectionId);
  });
  titlePathEl.textContent = sectionId === "overview" ? "~/portfolio" : `~/portfolio/${sectionId}`;
}

function jumpToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return;
  setActiveTab(sectionId);
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setTheme(name) {
  if (!["emerald", "amber", "cobalt", "light"].includes(name)) return false;
  document.documentElement.setAttribute("data-theme", name);
  themeSelect.value = name;
  return true;
}

function showHelpBanner() {
  const rows = [
    ["overview / whoami", "Jump to top overview"],
    ["projects / ls", "Jump to projects section"],
    ["cat &lt;slug&gt;", "Expand & jump to a project (monitoring, tankscii, trip-planner, noerouge, nba-predictor)"],
    ["skills / experience / education / contact", "Jump directly to that section"],
    ["theme &lt;name&gt;", "Switch theme: emerald, amber, cobalt, or light"],
    ["clear", "Dismiss this help box"]
  ];
  feedbackEl.innerHTML = `
    <div class="term-card">
      <div class="term-card-head" style="margin-bottom:8px;">
        <span class="term-card-title">CLI Commands</span>
        <button type="button" class="inline-action" id="close-help" style="margin:0;">[x] close</button>
      </div>
      <div class="help-table">
        ${rows.map(([c, d]) => `
          <span class="help-cmd" data-run="${c.split("/")[0].replace(/&lt;.*&gt;/, "").trim()}">${c}</span>
          <span>${d}</span>
        `).join("")}
      </div>
    </div>
  `;
  viewportEl.scrollTo({ top: 0, behavior: "smooth" });
}

function executeCommand(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return;
  cmdHistory.unshift(trimmed);
  historyIndex = -1;

  const [cmd, ...args] = trimmed.split(/\s+/);
  const lower = cmd.toLowerCase();
  const arg = args.join(" ").toLowerCase();

  switch (lower) {
    case "overview":
    case "whoami":
    case "neofetch":
      feedbackEl.innerHTML = "";
      jumpToSection("overview");
      break;
    case "projects":
    case "ls":
      feedbackEl.innerHTML = "";
      jumpToSection("projects");
      break;
    case "cat":
    case "open": {
      const match = DATA.projects.find((pr) => pr.slug.includes(arg) || pr.title.toLowerCase().includes(arg));
      if (match) {
        activeTrack = "All";
        expandedSlugs.add(match.slug);
        renderProjects();
        feedbackEl.innerHTML = "";
        setActiveTab("projects");
        document.getElementById(`proj-${match.slug}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        feedbackEl.innerHTML = `<div class="term-card"><span class="error">No project matching "${esc(arg)}".</span></div>`;
      }
      break;
    }
    case "skills":
      feedbackEl.innerHTML = "";
      jumpToSection("skills");
      break;
    case "experience":
    case "exp":
      feedbackEl.innerHTML = "";
      jumpToSection("experience");
      break;
    case "education":
    case "edu":
      feedbackEl.innerHTML = "";
      jumpToSection("education");
      break;
    case "contact":
      feedbackEl.innerHTML = "";
      jumpToSection("contact");
      break;
    case "theme":
      if (setTheme(arg)) {
        feedbackEl.innerHTML = `<div class="term-card">Switched theme to <span class="accent">${esc(arg)}</span>.</div>`;
      } else {
        feedbackEl.innerHTML = `<div class="term-card"><span class="error">Unknown theme "${esc(arg)}".</span> Use emerald, amber, cobalt, or light.</div>`;
      }
      break;
    case "help":
    case "?":
      showHelpBanner();
      break;
    case "clear":
    case "cls":
      feedbackEl.innerHTML = "";
      jumpToSection("overview");
      break;
    default:
      feedbackEl.innerHTML = `<div class="term-card"><span class="error">bash: ${esc(cmd)}: command not found.</span> Click <span class="help-cmd" data-run="help">help</span> to see commands.</div>`;
      viewportEl.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Smooth jump for top nav links
document.querySelectorAll(".quick-bar a[data-section]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    jumpToSection(link.dataset.section);
  });
});

document.getElementById("help-toggle").addEventListener("click", () => {
  if (feedbackEl.innerHTML.trim()) feedbackEl.innerHTML = "";
  else showHelpBanner();
});

// Highlight active section on scroll
const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries.filter((en) => en.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible.length) {
      setActiveTab(visible[0].target.dataset.section);
    }
  },
  { root: viewportEl, threshold: [0.25, 0.6] }
);
document.querySelectorAll(".term-section").forEach((sec) => sectionObserver.observe(sec));

// Form submit, history & Tab autocomplete
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  executeCommand(inputEl.value);
  inputEl.value = "";
});

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIndex < cmdHistory.length - 1) inputEl.value = cmdHistory[++historyIndex];
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIndex > 0) inputEl.value = cmdHistory[--historyIndex];
    else { historyIndex = -1; inputEl.value = ""; }
  } else if (e.key === "Tab") {
    e.preventDefault();
    const val = inputEl.value.trim().toLowerCase();
    if (!val) return;
    const match = COMMANDS.find((c) => c.startsWith(val));
    if (match) inputEl.value = match;
  }
});

// Delegated clicks
document.addEventListener("click", (e) => {
  if (e.target.id === "close-help") {
    feedbackEl.innerHTML = "";
    return;
  }
  const runEl = e.target.closest("[data-run]");
  if (runEl) {
    executeCommand(runEl.dataset.run);
    inputEl.focus();
    return;
  }
  const trackBtn = e.target.closest("[data-track]");
  if (trackBtn) {
    activeTrack = trackBtn.dataset.track;
    renderProjects();
    return;
  }
  const toggleBtn = e.target.closest("[data-toggle-slug]");
  if (toggleBtn) {
    const slug = toggleBtn.dataset.toggleSlug;
    if (expandedSlugs.has(slug)) expandedSlugs.delete(slug);
    else expandedSlugs.add(slug);
    renderProjects();
    return;
  }
  const copyBtn = e.target.closest("[data-copy-email]");
  if (copyBtn) {
    navigator.clipboard?.writeText(copyBtn.dataset.copyEmail);
    copyBtn.textContent = "Copied!";
    setTimeout(() => { copyBtn.textContent = "Copy Email"; }, 1500);
  }
});

themeSelect.addEventListener("change", (e) => {
  setTheme(e.target.value);
  inputEl.focus();
});

// Initial render of all 1-page sections
renderOverview();
renderProjects();
renderSkills();
renderExperience();
renderEducation();
renderContact();
