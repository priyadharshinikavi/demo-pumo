/* PUMO TECHNOVATION CAREER GUIDES - Shared JS */

(function(){
  // Smooth scrolling for hash navigation
  function scrollToHash(hash){
    if(!hash || hash.length < 2) return;
    var el = document.querySelector(hash);
    if(!el) return;
    el.scrollIntoView({behavior:'smooth', block:'start'});
  }

  // Footer Previous/Next buttons (page-to-page links)
  // Supports optional data-prev-url/data-next-url attributes.
  var historyPrev = document.getElementById('historyPrevBtn');
  var historyNext = document.getElementById('historyNextBtn');

  if(historyPrev){
    historyPrev.addEventListener('click', function(){
      var url = historyPrev.getAttribute('data-prev-url');
      if(url){
        window.location.href = url;
        return;
      }
      window.history.back();
    });
  }

  if(historyNext){
    historyNext.addEventListener('click', function(){
      var url = historyNext.getAttribute('data-next-url');
      if(url){
        window.location.href = url;
        return;
      }
      window.history.forward();
    });
  }

  // Page fade effect (triggered in HTML via a class; keep JS minimal)

  // Courses page: auto-scroll to department section from URL hash
  if(document.body && document.body.dataset && document.body.dataset.courses==='1'){
    // Wait a tick for layout
    setTimeout(function(){
      scrollToHash(window.location.hash);
    }, 250);

    // Also handle manual hash changes
    window.addEventListener('hashchange', function(){
      scrollToHash(window.location.hash);
    });
  }

  // AI Chatbot
  var chatToggle = document.getElementById('chat-toggle');
  var chatWidget = document.getElementById('chat-widget');
  var chatInput = document.getElementById('chat-input');
  var chatSend = document.getElementById('chat-send');
  var chatMessages = document.getElementById('chat-messages');

  var BOT = {
    'hi': 'Welcome to PUMO Technovation Career Guides. How can I help you today?',
    'hello': 'Hello. Please tell me which course or department you are interested in.',
    'how are you': 'I’m doing great! Thanks for asking. Ready to explore your career path?',
    'which course is best for me': 'It depends on your interest. If you like coding & software, try Full Stack / Java / Python. For electronics, explore ECE courses. For creativity, check MONZ Creative School.',
    'what courses are available': 'We offer IT, MECH, ECE, EEE, and MONZ Creative School courses. Visit the Courses page to see the full list.',
    'which branch is nearest': 'Share your location/area (city & locality), and I’ll suggest the nearest branch from our Branches carousel on the About page.',
    'what is ai': 'AI (Artificial Intelligence) is technology that enables machines to learn, reason, and perform tasks that normally require human intelligence.',
    'do you provide placements': 'Yes. We support students with placement guidance and placement opportunities through our training and placement cell.',
    'what is the course duration': 'Course durations vary by program. After you choose a course, our team will guide you with the exact duration during enrollment.',
    'how can i enroll': 'Click the Enroll button on the Courses page. You can also contact us from the Contact section (if available).'
  };

  function normalize(s){
    return (s||'').toString().trim().toLowerCase();
  }

  function addBubble(text, cls){
    var div = document.createElement('div');
    div.className = 'chat-bubble ' + cls;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function botReply(userText){
    var t = normalize(userText);

    // Quick matching with includes for flexibility
    if(t === 'hi') return BOT['hi'];
    if(t === 'hello') return BOT['hello'];
    if(t === 'how are you') return BOT['how are you'];
    if(t.includes('best for me')) return BOT['which course is best for me'];
    if(t.includes('available')) return BOT['what courses are available'];
    if(t.includes('nearest') || t.includes('branch')) return BOT['which branch is nearest'];
    if(t === 'what is ai' || t.includes('what is ai') || t.includes('ai')) return BOT['what is ai'];
    if(t.includes('placements') || t.includes('placement')) return BOT['do you provide placements'];
    if(t.includes('duration')) return BOT['what is the course duration'];
    if(t.includes('enroll') || t.includes('admission') || t.includes('enrolling')) return BOT['how can i enroll'];

    // fallback
    return 'I can help with: best course for you, available courses, nearest branch, AI basics, placements, duration, and enrollment. Try one of the suggested questions.';
  }

  function sendMessage(){
    if(!chatInput || !chatMessages) return;
    var value = chatInput.value;
    if(!value || !value.trim()) return;

    addBubble(value, 'chat-user');
    chatInput.value = '';

    // simulate thinking
    setTimeout(function(){
      addBubble(botReply(value), 'chat-bot');
    }, 450);
  }

  if(chatToggle && chatWidget){
    chatToggle.addEventListener('click', function(){
      chatWidget.style.display = (chatWidget.style.display === 'block') ? 'none' : 'block';
    });
  }

  if(chatSend && chatInput){
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', function(e){
      if(e.key === 'Enter') sendMessage();
    });
  }

  // Departments redirect buttons (optional convenience if used anywhere else)
  function createFloatingNavButtons(){
    var currentFile = window.location.pathname.split('/').pop() || 'index.html';
    if (currentFile === '') currentFile = 'index.html';

        var fallbackFlow = {
      'index.html': { prev: 'thankyou.html', next: 'about.html' },
      'about.html': { prev: 'index.html', next: 'departments.html' },
      'departments.html': { prev: 'about.html', next: 'courses.html' },
      'courses.html': { prev: 'departments.html', next: 'placements.html' },
      'placements.html': { prev: 'courses.html', next: 'thankyou.html' },
      'thankyou.html': { prev: 'placements.html', next: 'index.html' },
      'course-details-full-stack-python.html': { prev: 'course-details-digital-marketing.html', next: 'course-details-full-stack-java.html' },
      'course-details-full-stack-java.html': { prev: 'course-details-full-stack-python.html', next: 'course-details-software-testing.html' },
      'course-details-software-testing.html': { prev: 'course-details-full-stack-java.html', next: 'course-details-manual-testing.html' },
      'course-details-manual-testing.html': { prev: 'course-details-software-testing.html', next: 'course-details-automation-testing.html' },
      'course-details-automation-testing.html': { prev: 'course-details-manual-testing.html', next: 'course-details-artificial-intelligence.html' },
      'course-details-artificial-intelligence.html': { prev: 'course-details-automation-testing.html', next: 'course-details-data-science.html' },
      'course-details-data-science.html': { prev: 'course-details-artificial-intelligence.html', next: 'course-details-data-analyst.html' },
      'course-details-data-analyst.html': { prev: 'course-details-data-science.html', next: 'course-details-business-analyst.html' },
      'course-details-business-analyst.html': { prev: 'course-details-data-analyst.html', next: 'course-details-cyber-security.html' },
      'course-details-cyber-security.html': { prev: 'course-details-business-analyst.html', next: 'course-details-aws-devops.html' },
      'course-details-aws-devops.html': { prev: 'course-details-cyber-security.html', next: 'course-details-generative-ai.html' },
      'course-details-generative-ai.html': { prev: 'course-details-aws-devops.html', next: 'course-details-masters-in-cad-cam.html' },
      'course-details-masters-in-cad-cam.html': { prev: 'course-details-generative-ai.html', next: 'course-details-autocad.html' },
      'course-details-autocad.html': { prev: 'course-details-masters-in-cad-cam.html', next: 'course-details-solidworks.html' },
      'course-details-solidworks.html': { prev: 'course-details-autocad.html', next: 'course-details-catia.html' },
      'course-details-catia.html': { prev: 'course-details-solidworks.html', next: 'course-details-creo.html' },
      'course-details-creo.html': { prev: 'course-details-catia.html', next: 'course-details-nx-cad.html' },
      'course-details-nx-cad.html': { prev: 'course-details-creo.html', next: 'course-details-mastercam.html' },
      'course-details-mastercam.html': { prev: 'course-details-nx-cad.html', next: 'course-details-3dexperience.html' },
      'course-details-3dexperience.html': { prev: 'course-details-mastercam.html', next: 'course-details-ansa.html' },
      'course-details-ansa.html': { prev: 'course-details-3dexperience.html', next: 'course-details-hypermesh.html' },
      'course-details-hypermesh.html': { prev: 'course-details-ansa.html', next: 'course-details-ansys.html' },
      'course-details-ansys.html': { prev: 'course-details-hypermesh.html', next: 'course-details-certified-embedded.html' },
      'course-details-certified-embedded.html': { prev: 'course-details-ansys.html', next: 'course-details-professional-embedded.html' },
      'course-details-professional-embedded.html': { prev: 'course-details-certified-embedded.html', next: 'course-details-masters-embedded.html' },
      'course-details-masters-embedded.html': { prev: 'course-details-professional-embedded.html', next: 'course-details-certified-pcb.html' },
      'course-details-certified-pcb.html': { prev: 'course-details-masters-embedded.html', next: 'course-details-masters-pcb.html' },
      'course-details-masters-pcb.html': { prev: 'course-details-certified-pcb.html', next: 'course-details-certified-iot.html' },
      'course-details-certified-iot.html': { prev: 'course-details-masters-pcb.html', next: 'course-details-masters-iot.html' },
      'course-details-masters-iot.html': { prev: 'course-details-certified-iot.html', next: 'course-details-vlsi.html' },
      'course-details-vlsi.html': { prev: 'course-details-masters-iot.html', next: 'course-details-certified-matlab.html' },
      'course-details-certified-matlab.html': { prev: 'course-details-vlsi.html', next: 'course-details-masters-matlab.html' },
      'course-details-masters-matlab.html': { prev: 'course-details-certified-matlab.html', next: 'course-details-certified-labview.html' },
      'course-details-certified-labview.html': { prev: 'course-details-masters-matlab.html', next: 'course-details-masters-labview.html' },
      'course-details-masters-labview.html': { prev: 'course-details-certified-labview.html', next: 'course-details-ev-design.html' },
      'course-details-ev-design.html': { prev: 'course-details-masters-labview.html', next: 'course-details-automotive-embedded.html' },
      'course-details-automotive-embedded.html': { prev: 'course-details-ev-design.html', next: 'course-details-certified-automation.html' },
      'course-details-certified-automation.html': { prev: 'course-details-automotive-embedded.html', next: 'course-details-certified-industrial-automation.html' },
      'course-details-certified-industrial-automation.html': { prev: 'course-details-certified-automation.html', next: 'course-details-masters-industrial-automation.html' },
      'course-details-masters-industrial-automation.html': { prev: 'course-details-certified-industrial-automation.html', next: 'course-details-certified-ecad.html' },
      'course-details-certified-ecad.html': { prev: 'course-details-masters-industrial-automation.html', next: 'course-details-masters-ecad.html' },
      'course-details-masters-ecad.html': { prev: 'course-details-certified-ecad.html', next: 'course-details-robotics.html' },
      'course-details-robotics.html': { prev: 'course-details-masters-ecad.html', next: 'course-details-sap-fico.html' },
      'course-details-sap-fico.html': { prev: 'course-details-robotics.html', next: 'course-details-sap-sd.html' },
      'course-details-sap-sd.html': { prev: 'course-details-sap-fico.html', next: 'course-details-sap-mm.html' },
      'course-details-sap-mm.html': { prev: 'course-details-sap-sd.html', next: 'course-details-sap-pp.html' },
      'course-details-sap-pp.html': { prev: 'course-details-sap-mm.html', next: 'course-details-sap-abap.html' },
      'course-details-sap-abap.html': { prev: 'course-details-sap-pp.html', next: 'course-details-spoken-english.html' },
      'course-details-spoken-english.html': { prev: 'course-details-sap-abap.html', next: 'course-details-ielts.html' },
      'course-details-ielts.html': { prev: 'course-details-spoken-english.html', next: 'course-details-german.html' },
      'course-details-german.html': { prev: 'course-details-ielts.html', next: 'course-details-japanese.html' },
      'course-details-japanese.html': { prev: 'course-details-german.html', next: 'course-details-graphic-design.html' },
      'course-details-graphic-design.html': { prev: 'course-details-japanese.html', next: 'course-details-ui-ux-design.html' },
      'course-details-ui-ux-design.html': { prev: 'course-details-graphic-design.html', next: 'course-details-video-editing.html' },
      'course-details-video-editing.html': { prev: 'course-details-ui-ux-design.html', next: 'course-details-digital-marketing.html' },
      'course-details-digital-marketing.html': { prev: 'course-details-video-editing.html', next: 'course-details-full-stack-python.html' },
    };

    var footerPrev = document.getElementById('historyPrevBtn');
    var footerNext = document.getElementById('historyNextBtn');
    
    var prevUrl = footerPrev ? footerPrev.getAttribute('data-prev-url') : null;
    var nextUrl = footerNext ? footerNext.getAttribute('data-next-url') : null;

    // Use fallback map if DOM elements or attributes are missing
    if (!prevUrl && fallbackFlow[currentFile]) {
      prevUrl = fallbackFlow[currentFile].prev;
    }
    if (!nextUrl && fallbackFlow[currentFile]) {
      nextUrl = fallbackFlow[currentFile].next;
    }
    
    if (prevUrl) {
      var prevBtn = document.createElement('button');
      prevBtn.id = 'floatingPrevBtn';
      prevBtn.className = 'floating-side-btn floating-prev';
      prevBtn.setAttribute('aria-label', 'Previous Page');
      prevBtn.innerHTML = '&#8592;'; // Left Arrow
      prevBtn.type = 'button';
      
      prevBtn.addEventListener('click', function() {
        if (footerPrev && footerPrev.getAttribute('data-prev-url') === prevUrl) {
          footerPrev.click();
        } else {
          window.location.href = prevUrl;
        }
      });
      document.body.appendChild(prevBtn);
    }
    
    if (nextUrl) {
      var nextBtn = document.createElement('button');
      nextBtn.id = 'floatingNextBtn';
      nextBtn.className = 'floating-side-btn floating-next';
      nextBtn.setAttribute('aria-label', 'Next Page');
      nextBtn.innerHTML = '&#8594;'; // Right Arrow
      nextBtn.type = 'button';
      
      nextBtn.addEventListener('click', function() {
        if (footerNext && footerNext.getAttribute('data-next-url') === nextUrl) {
          footerNext.click();
        } else {
          window.location.href = nextUrl;
        }
      });
      document.body.appendChild(nextBtn);
    }
  }

  // Inject premium global contact topbar at the top of the body
  function createGlobalContactTopbar() {
    var topbar = document.createElement('div');
    topbar.className = 'global-contact-topbar';
    topbar.innerHTML = 
      '<div class="topbar-container">' +
        '<ul class="topbar-row">' +
          '<li class="topbar-item">' +
            '<a class="topbar-link" href="tel:+917305635666">' +
              '<img class="topbar-flag" src="flags/in.svg" alt="India flag">' +
              '<span class="topbar-country">India</span>' +
              '<span class="topbar-phone">+91 7305635666</span>' +
            '</a>' +
          '</li>' +
          '<li class="topbar-item">' +
            '<a class="topbar-link" href="tel:+971561016865">' +
              '<img class="topbar-flag" src="flags/ae.svg" alt="UAE flag">' +
              '<span class="topbar-country">UAE</span>' +
              '<span class="topbar-phone">+971 561016865</span>' +
            '</a>' +
          '</li>' +
          '<li class="topbar-item">' +
            '<a class="topbar-link" href="tel:+60162592727">' +
              '<img class="topbar-flag" src="flags/my.svg" alt="Malaysia flag">' +
              '<span class="topbar-country">Malaysia</span>' +
              '<span class="topbar-phone">+60 162592727</span>' +
            '</a>' +
          '</li>' +
          '<li class="topbar-item">' +
            '<a class="topbar-link" href="tel:+61540868663">' +
              '<img class="topbar-flag" src="flags/au.svg" alt="Australia flag">' +
              '<span class="topbar-country">Australia</span>' +
              '<span class="topbar-phone">+61 540868663</span>' +
            '</a>' +
          '</li>' +
          '<li class="topbar-item">' +
            '<a class="topbar-link" href="tel:+16192033624">' +
              '<img class="topbar-flag" src="flags/us.svg" alt="USA flag">' +
              '<span class="topbar-country">USA</span>' +
              '<span class="topbar-phone">+1 619203-3624</span>' +
            '</a>' +
          '</li>' +
        '</ul>' +
      '</div>';
      
    if (document.body) {
      document.body.insertBefore(topbar, document.body.firstChild);
    }
  }

  // Inject PUMO Career Journey Roadmap dynamically on course detail pages
  function injectRoadmap() {
    const isCourseDetails = document.querySelector('.course-details-page') || window.location.pathname.indexOf('course-details-') !== -1;
    if (!isCourseDetails) return;

    // Ensure Bootstrap Icons stylesheet is loaded dynamically
    if (!document.querySelector('link[href*="bootstrap-icons"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
      document.head.appendChild(link);
    }

    const footer = document.querySelector('footer');
    if (!footer) return;

    // Personalize content based on technology stack of course
    const pageTitle = (document.title || "").toLowerCase();
    const pageUrl = window.location.pathname.toLowerCase();

    let step1Title = "1. Profile & Enroll";
    let step1Desc = "We analyze your background and career goals to map you to the perfect syllabus and track.";
    let step2Title = "2. Hands-on Training";
    let step2Desc = "Master concepts with practical lab sessions guided directly by experienced corporate experts.";
    let step3Title = "3. Industrial Projects";
    let step3Desc = "Work on real-world industrial prototypes and live company-sponsored capstone deployments.";
    let step4Title = "4. Mock Interviews";
    let step4Desc = "Undergo rigorous aptitude preparation, resume review, and mock interview drills.";
    let step5Title = "5. Placement Drives";
    let step5Desc = "Unlock direct placement drives and start your tech career in leading global enterprises.";

    if (pageTitle.includes("embedded") || pageTitle.includes("iot") || pageTitle.includes("vlsi") || pageTitle.includes("labview") || pageTitle.includes("pcb") || pageUrl.includes("embedded") || pageUrl.includes("iot")) {
      step2Title = "2. Core HW/FW Training";
      step2Desc = "Master MCU programming (ARM, AVR), PCB layout design, and firmware debugging in high-tech labs.";
      step3Title = "3. Hardware R&D Projects";
      step3Desc = "Build actual hardware prototypes, sensor integration interfaces, and live IoT cloud connection projects.";
    } else if (pageTitle.includes("cad") || pageTitle.includes("cam") || pageTitle.includes("creo") || pageTitle.includes("solidworks") || pageTitle.includes("nx") || pageTitle.includes("catia") || pageTitle.includes("ansa") || pageTitle.includes("hypermesh") || pageTitle.includes("robotics") || pageTitle.includes("automation") || pageUrl.includes("cad") || pageUrl.includes("solidworks") || pageUrl.includes("nx")) {
      step2Title = "2. Modeling & CAD Lab";
      step2Desc = "Master industrial drafting, 3D modeling, FEA meshing, and PLC/SCADA configurations under expert supervision.";
      step3Title = "3. Mechanical Prototypes";
      step3Desc = "Design production-ready automotive components, mechanical assemblies, and optimize automated manufacturing simulations.";
    } else if (pageTitle.includes("python") || pageUrl.includes("python")) {
      step1Title = "1. Python & SQL Core";
      step1Desc = "First 2 months master Python, followed by 15 days of intensive SQL training.";
      step2Title = "2. Tech Mock Interviews";
      step2Desc = "Undergo focused mock interview sessions specifically for Python and SQL to validate skills.";
      step3Title = "3. Frontend & Internship";
      step3Desc = "Next 2 months cover HTML, CSS, JS, jQuery, Bootstrap, followed by a guaranteed internship offer.";
      step4Title = "4. Django & Tools";
      step4Desc = "After the internship, continue mastering the Django framework and remaining industry tools.";
      step5Title = "5. Placement Drives";
      step5Desc = "Final step: Unlock direct placement drives and get placed at top global technology companies.";
    } else if (pageTitle.includes("java") || pageTitle.includes("testing") || pageTitle.includes("science") || pageTitle.includes("analyst") || pageTitle.includes("cyber") || pageTitle.includes("aws") || pageTitle.includes("devops") || pageTitle.includes("ai") || pageTitle.includes("ui") || pageTitle.includes("ux") || pageUrl.includes("java") || pageUrl.includes("testing")) {
      step2Title = "2. Full-Stack Coding Lab";
      step2Desc = "Build scalable backend APIs, web applications, and database designs using modern frameworks (Django, Spring Boot).";
      step3Title = "3. Real-world Deployments";
      step3Desc = "Deploy live full-stack applications, automate CI/CD pipelines, and train machine learning or generative AI models.";
    } else if (pageTitle.includes("design") || pageTitle.includes("video") || pageTitle.includes("graphic") || pageUrl.includes("video") || pageUrl.includes("graphic")) {
      step2Title = "2. Creative Design Lab";
      step2Desc = "Master editing software (Premiere Pro, After Effects), visual composition, typography, and motion graphics design.";
      step3Title = "3. Commercial Production";
      step3Desc = "Produce professional commercial ads, cinematic edits, branding guidelines, and high-fidelity UI/UX portfolios.";
    }

    let steps = [
      { title: step1Title, desc: step1Desc, icon: "bi-send-fill", color: "#a855f7" },
      { title: step2Title, desc: step2Desc, icon: "bi-laptop", color: "#0d6efd" },
      { title: step3Title, desc: step3Desc, icon: "bi-database", color: "#06b6d4" },
      { title: step4Title, desc: step4Desc, icon: "bi-briefcase", color: "#10b981" },
      { title: step5Title, desc: step5Desc, icon: "bi-trophy", color: "#f59e0b" }
    ];

    if (pageTitle.includes("python") || pageUrl.includes("python")) {
      steps = [
        { title: "1. Python & SQL Core", desc: "First 2 months master Python, followed by 15 days of intensive SQL training.", icon: "bi-send-fill", color: "#a855f7" },
        { title: "2. Tech Mock Interviews", desc: "Undergo focused mock interview sessions specifically for Python and SQL to validate skills.", icon: "bi-laptop", color: "#0d6efd" },
        { title: "3. Resume & Soft Skills", desc: "Comprehensive resume building and communication training for professional readiness.", icon: "bi-person-lines-fill", color: "#14b8a6" },
        { title: "4. Frontend Mastery", desc: "Next 2 months cover HTML, CSS, JS, jQuery, Bootstrap.", icon: "bi-layout-text-window", color: "#06b6d4" },
        { title: "5. Guaranteed Internship", desc: "We provide a guaranteed internship offer to gain real-world industrial exposure.", icon: "bi-award", color: "#10b981" },
        { title: "6. Django & Tools", desc: "After the internship, continue mastering the Django framework and remaining industry tools.", icon: "bi-database", color: "#f43f5e" },
        { title: "7. Placement Training", desc: "Rigorous technical placement training, company-specific mock tests, and HR interview prep.", icon: "bi-briefcase", color: "#ec4899" },
        { title: "8. Placement Drives", desc: "Final step: Unlock direct placement drives and get placed at top global technology companies.", icon: "bi-trophy", color: "#f59e0b" }
      ];
    } else if (pageUrl.includes("ansys") || pageUrl.includes("autocad") || pageUrl.includes("catia") || pageUrl.includes("creo") || pageUrl.includes("nx-cad") || pageUrl.includes("solidworks") || pageTitle.includes("ANSYS") || pageTitle.includes("AUTOCAD") || pageTitle.includes("CATIA") || pageTitle.includes("CREO") || pageTitle.includes("NX CAD") || pageTitle.includes("SOLIDWORKS")) {
      steps = [
        { title: "1. CAD/CAE Fundamentals", desc: "Master the core software interface and basic 2D/3D design.", icon: "bi-send-fill", color: "#a855f7" },
        { title: "2. Tech Mock Interviews", desc: "Focused technical evaluations to validate engineering skills.", icon: "bi-laptop", color: "#0d6efd" },
        { title: "3. Resume & Soft Skills", desc: "Comprehensive resume building and communication training.", icon: "bi-person-lines-fill", color: "#14b8a6" },
        { title: "4. Advanced 3D Modeling", desc: "Complex surfacing, sheet metal, and GD&T concepts.", icon: "bi-layout-text-window", color: "#06b6d4" },
        { title: "5. Guaranteed Internship", desc: "Real-world industrial exposure.", icon: "bi-award", color: "#10b981" },
        { title: "6. Professional Simulation", desc: "Advanced assemblies, kinematics, and structural analysis.", icon: "bi-database", color: "#f43f5e" },
        { title: "7. Placement Training", desc: "Company-specific mock tests and HR interview prep.", icon: "bi-briefcase", color: "#ec4899" },
        { title: "8. Placement Drives", desc: "Unlock direct placement drives at top engineering companies.", icon: "bi-trophy", color: "#f59e0b" }
      ];
    }

    let stepsHtml = '';
    steps.forEach((step, index) => {
      let stepNum = index + 1;
      stepsHtml += 
        '<!-- Step ' + stepNum + ' -->' +
        '<div class="roadmap-step step-' + stepNum + '" style="--step-color: ' + step.color + ';">' +
          '<div class="step-line d-none d-lg-block"></div>' +
          '<div class="step-circle">' +
            '<i class="bi ' + step.icon + '"></i>' +
          '</div>' +
          '<div class="step-content">' +
            '<h4 class="step-title">' + step.title + '</h4>' +
            '<p class="step-desc">' + step.desc + '</p>' +
          '</div>' +
        '</div>';
    });

    const section = document.createElement('section');
    section.className = 'roadmap-section py-5';
    section.id = 'pumo-career-roadmap';

    section.innerHTML = 
      '<div class="container">' +
        '<div class="text-center mb-5">' +
          '<h2 class="section-title text-center mb-2 fw-extrabold display-6" style="color: var(--pumo-navy, #0f172a); font-family: Poppins, system-ui, sans-serif; font-weight: 800;">PUMO Career Journey Roadmap</h2>' +
          '<p class="section-subtitle text-muted mb-0 text-center">How we train, groom, and place you in global technology companies.</p>' +
        '</div>' +
        '<div class="roadmap-wrapper">' +
          '<!-- SVG path for desktop -->' +
          '<svg class="roadmap-svg-bg d-none d-lg-block" viewBox="0 0 1200 450" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M 50 380 Q 150 250 220 280 T 1150 70" stroke="#cbd5e1" stroke-width="24" stroke-linecap="round" fill="none" />' +
            '<!-- Glowing accent path -->' +
            '<path d="M 50 380 Q 150 250 220 280 T 1150 70" stroke="url(#roadmap-grad)" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.8" />' +
            '<defs>' +
              '<linearGradient id="roadmap-grad" x1="0%" y1="100%" x2="100%" y2="0%">' +
                '<stop offset="0%" stop-color="#a855f7" />' +
                '<stop offset="25%" stop-color="#0d6efd" />' +
                '<stop offset="50%" stop-color="#06b6d4" />' +
                '<stop offset="75%" stop-color="#10b981" />' +
                '<stop offset="100%" stop-color="#f59e0b" />' +
              '</linearGradient>' +
            '</defs>' +
          '</svg>' +
          
          '<!-- Floating Graduate Student with Trophy (Desktop) -->' +
          '<div class="roadmap-student-graphic d-none d-lg-block">' +
            '<img src="happy_student_trophy.png" alt="Happy Pumo Student with Trophy">' +
          '</div>' +
          
          '<!-- Timeline Steps -->' +
          '<div class="roadmap-steps ' + (steps.length > 5 ? 'has-' + steps.length + '-steps' : '') + '">' +
            stepsHtml +
          '</div>' +
        '</div>' +
        '<!-- Floating Graduate Student with Trophy (Mobile) -->' +
        '<div class="roadmap-student-graphic-mobile d-lg-none text-center mt-5">' +
          '<img src="happy_student_trophy.png" alt="Happy Pumo Student with Trophy" style="width: 130px; height: auto; filter: drop-shadow(0 10px 20px rgba(15, 23, 42, 0.1));">' +
        '</div>' +
      '</div>';

    footer.parentNode.insertBefore(section, footer);
  }

  // Initialize UI additions
  createGlobalContactTopbar();
  createFloatingNavButtons();
  injectRoadmap();
})();


