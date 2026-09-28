(function () {
  // Database of all 29 branches, structured by Country -> City -> Branches list.
  // Each branch is represented as an object with name, address, and contact phone.
  const COUNTRY_DATA = {
    India: {
      flag: 'flags/in.svg',
      tagline: '10 Cities • 26 Locations',
      cities: [
        { 
          name: 'Coimbatore', 
          count: '8 Locations', 
          branches: [
            { 
              name: 'Coimbatore - Gandhipuram', 
              address: '401-A, GES Complex, Second Floor, 7th Street, Gandhipuram, Coimbatore, Tamil Nadu 641012', 
              phone: '9789989283' 
            },
            { 
              name: 'Coimbatore - Gandhipuram (CrossCut)', 
              address: 'Sree Devi Textiles 94 B, Second, Cross Cut Rd, Gandhipuram, Coimbatore, Tamil Nadu 641012', 
              phone: '9042697719',
              email: 'pumotechnovationaicbe@gmail.com'
            },
            { 
              name: 'Coimbatore - Race Course', 
              address: '3rd Floor, A3, Rathinam Circle View, Race Course Rd, Gopalapuram, Coimbatore, Tamil Nadu 641018', 
              phone: '9087873296' 
            },
            { 
              name: 'Coimbatore - Malumichampatti', 
              address: 'RSA TOWERS, Guruvayur Nagar, Settipalayam, Malumichampatti, Tamil Nadu 641021', 
              phone: '8925890822' 
            },
            { 
              name: 'Coimbatore - Malumichampatti (2nd Branch)', 
              address: 'S.NO.4 P, 1st Floor, Indhira Nagar, Malumichampatti, Coimbatore, Tamil Nadu 641050', 
              phone: '9843337779' 
            },
            { 
              name: 'Coimbatore - Saravanampatti', 
              address: '3rd Floor, Indian bank building, Sathy Rd, Ramanandha Nagar, Saravanampatti, Coimbatore, Tamil Nadu 641035', 
              phone: '9600600263' 
            },
            { 
              name: 'Coimbatore - Saravanampatti (2nd Branch)', 
              address: '3rd floor, 3XJR+H3H Saravanampatti, Coimbatore, Tamil Nadu 641035', 
              phone: '7305635666' 
            },
            { 
              name: 'Coimbatore - Thudiyalur', 
              address: 'SF.No:327/2A1C1B, Mettupalayam Road, Thudiyalur, Coimbatore-641 034', 
              phone: '9787775552' 
            }
          ] 
        },
        { 
          name: 'Chennai', 
          count: '7 Locations', 
          branches: [
            { name: 'Chennai - Vadapalani', address: '3rd floor, No 321, Doshi Gardens, Arcot Rd, Ottagapalayam, Kannika Puram, Vadapalani, Chennai, Tamil Nadu 600026', phone: '8925894691' },
            { name: 'Chennai - Tambaram', address: '2nd Floor, No. 23, Chandra Towers, Rajaji Road, Tambaram West, Chennai, Tamil Nadu 600045', phone: '9940211129' },
            { name: 'Chennai - Velachery', address: 'No 14, 1st Floor, Vee Jay Tower, Velachery Bypass Rd, Officer Colony, Vijaya Nagar, Velachery, Chennai, Tamil Nadu 600042', phone: '8489591801' },
            { name: 'Chennai - Poonamallee', address: 'No. 222, First Floor, Poojaa Diamond Anandam, Poonamallee High Road, Kumananchavadi, Kattupakkam, Poonamallee, Chennai west, Chennai - 600056', phone: '8667542372' },
            { name: 'Chennai - Ambattur', address: '235A Tinny Sector, Indl Estate South, Ambattur, Chennai - 600018', phone: '9003201270' },
            { name: 'Chennai - Guduvanchery', address: 'NO.5, adhiprasakthi nagar, GST Rd, EB Stopping, Guduvancheri, Tamil Nadu 603202', phone: '8925894121' },
            { name: 'Chennai - Anna Nagar East', address: 'A13 , 2nd Floor , 3rd Avenue , Anna Nagar East , Chennai, Near Anna Nagar Rountana, Tamil Nadu 600102', phone: '7305635666' }
          ] 
        },
        { 
          name: 'Bengaluru', 
          count: '3 Locations', 
          branches: [
            { name: 'Bengaluru - Marathahalli', address: 'SY. NO 88, Marathahalli - Sarjapur Outer Ring Rd, opposite More Megastore, Marathahalli, Bengaluru, Karnataka 560037', phone: '8904708555' },
            { name: 'Bengaluru - Bommasandra', address: 'Site No. 14/1, Katha No. 313, Bommasandra Village, Anekal Taluk - 560105', phone: '8925890821' },
            { name: 'Bengaluru - Nagasandra', address: '4th floor, No 536/1, 13th main road, M S Ramaiah enclave, Nagasandra, Bangalore - 560073', phone: '9071021021' }
          ] 
        },
        { 
          name: 'Pune', 
          count: '2 Locations + Aug 15 Launch', 
          branches: [
            { name: 'Pune - Shivajinagar', address: 'Office 102 & Part Of 101, 1st Floor, Mosaik Commercial Complex, CTS No. 1216/1, F.P.No.576/1, Bhamburda, opp. F.C. main gate, Shivajinagar, Pune - 411004.', phone: '7305635666' },
            { name: 'Pune - R&D Division', address: '#B-51, NICE,SATPUR,NASHIK, PUNE - 07.', phone: '9626111155' },
            { name: 'Pune - Expansion (Aug 15 Launch)', address: 'Grand opening of our new campus expansion on August 15! Stay tuned for course schedules and launch details!', phone: '' }
          ] 
        },
        { 
          name: 'Tiruppur', 
          count: '1 Location', 
          branches: [
            { name: 'Tiruppur - Bungalow Stop', address: 'BMW Towers, Bungalow stop, opposite RK Residencey, Murungapalayam, Odakkadu, Tiruppur, Tamil Nadu 641602', phone: '9363039367' }
          ] 
        },
        { 
          name: 'Trichy', 
          count: '1 Location', 
          branches: [
            { name: 'Trichy - Thillai Nagar', address: '19/B30-24, Thillai Nagar, 2nd Cross, Tiruchirappalli - 620018.', phone: '9843337774' }
          ] 
        },
        { 
          name: 'Hosur', 
          count: '1 Location', 
          branches: [
            { name: 'Hosur - Bangalore Highway', address: 'Door No: 76/B1, 1st Floor, Shree Towers Buildings, Hamumanthapuram, Kamaraj Colony, Hosur, Tamil Nadu 635109', phone: '9003376300' }
          ] 
        },
        { 
          name: 'Kanchipuram', 
          count: '1 Location', 
          branches: [
            { 
              name: 'Kanchipuram - Vallal Pachaiyappan Street', 
              address: '30, Vallal Pachaiyappan Street, Kanchipuram, Tamil Nadu 631501', 
              phone: '7338855592',
              email: 'pumotechkanchipuram@gmail.com'
            }
          ] 
        },
        { 
          name: 'Tirupathi', 
          count: '1 Location', 
          branches: [
            { name: 'Tirupathi - Chittoor District', address: '4th Floor of ELITE PLAZA-II D. No-23-8-153/3C, Air bypass Road, Tripathi, Chittoor District, Andhra Pradesh - 517501', phone: '7305635666' }
          ] 
        },
        { 
          name: 'Madurai', 
          count: 'Launching Aug 15', 
          comingSoon: true,
          branches: [] 
        }
      ]
    },
    UAE: {
      flag: 'flags/ae.svg',
      tagline: '1 City • 1 Location',
      cities: [
        { 
          name: 'Dubai', 
          count: '1 Location', 
          branches: [
            { name: 'Dubai - Al Quasis', address: 'Bin Shabib Mall - Al Qusais Industrial First - Plot Number 55-0 - Property No 046 - Dubai - United Arab Emirates', phone: '971561016865' }
          ] 
        }
      ]
    },
    Malaysia: {
      flag: 'flags/my.svg',
      tagline: '1 City • 1 Location',
      cities: [
        { 
          name: 'Kuala Lumpur', 
          count: '1 Location', 
          branches: [
            { name: 'Malaysia - Kuala Lumpur Bricks Field', address: 'No. 76, 1st Floor, JLN Tun Sambanthan, Brickfields, 50470, Kuala Lumpur.', phone: '60162592727' }
          ] 
        }
      ]
    },
    Australia: {
      flag: 'flags/au.svg',
      tagline: '1 City • 1 Location',
      cities: [
        { 
          name: 'Sydney', 
          count: '1 Location', 
          branches: [
            { name: 'Australia - Sydney - AI Project Division', address: '6 Hendon St, Ropes Crossing NSW 2760, Australia', phone: '61450868663' }
          ] 
        }
      ]
    },
    USA: {
      flag: 'flags/us.svg',
      tagline: '1 City • 1 Location',
      cities: [
        { 
          name: 'USA Division', 
          count: '1 Location', 
          branches: [
            { name: 'USA - AI Project And Server Division', address: '1309 COFFEEN AVE STE 1200 SHERIDAN, WY 82801', phone: '16192033624' }
          ] 
        }
      ]
    }
  };

  let activeCountry = 'India';

  function renderCountryCards() {
    const container = document.getElementById('country-cards-container');
    if (!container) return;

    container.innerHTML = '';

    Object.keys(COUNTRY_DATA).forEach(function (countryKey) {
      const data = COUNTRY_DATA[countryKey];
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'country-card' + (countryKey === activeCountry ? ' is-active' : '');
      card.setAttribute('aria-label', 'Select ' + countryKey);

      card.innerHTML = 
        '<img src="' + data.flag + '" class="country-card-flag" alt="' + countryKey + ' flag">' +
        '<div class="country-card-info">' +
          '<div class="country-card-name">' + countryKey + '</div>' +
          '<div class="country-card-tag">' + data.tagline + '</div>' +
        '</div>';

      card.addEventListener('click', function () {
        if (activeCountry === countryKey) return;
        activeCountry = countryKey;
        renderCountryCards();
        renderCitiesGrid();
      });

      container.appendChild(card);
    });
  }

  function renderCitiesGrid() {
    const container = document.getElementById('city-cards-container');
    const headerTitle = document.getElementById('city-grid-title');
    if (!container) return;

    container.innerHTML = '';
    const countryData = COUNTRY_DATA[activeCountry];
    if (!countryData) return;

    if (headerTitle) {
      headerTitle.textContent = activeCountry + ' Hubs';
    }

    countryData.cities.forEach(function (city) {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'city-card';
      
      var countBadgeHtml = '<span class="city-count-badge">' + city.count + '</span>';
      if (city.comingSoon) {
        countBadgeHtml = '<span class="city-count-badge coming-soon-badge">' + city.count + '</span>';
      }

      card.innerHTML = 
        '<div class="city-card-header">' +
          '<span class="city-icon"><i class="bi bi-geo-alt-fill text-primary"></i></span>' +
          '<h4 class="city-name">' + city.name + '</h4>' +
        '</div>' +
        '<div class="city-card-footer">' +
          countBadgeHtml +
          '<span class="city-action-arrow">Explore &rarr;</span>' +
        '</div>';

      card.addEventListener('click', function () {
        openBranchDrawer(city.name, city.branches);
      });

      container.appendChild(card);
    });
  }

  function getCleanDialNumber(phone) {
    if (!phone || typeof phone !== 'string') return '';
    var clean = phone.replace(/[^0-9]/g, '');
    // If it is a 10 digit Indian number, prefix with 91
    if (clean.length === 10) {
      return '91' + clean;
    }
    return clean;
  }

  function openBranchDrawer(cityName, branches) {
    const panel = document.getElementById('active-city-branches');
    const title = document.getElementById('active-city-title');
    const content = document.getElementById('active-branches-grid');

    if (!panel || !title || !content) return;

    title.textContent = cityName + ' Locations';
    content.innerHTML = '';

    if (branches && Array.isArray(branches) && branches.length > 0) {
      branches.forEach(function (branch) {
        if (!branch) return;
        const card = document.createElement('div');
        card.className = 'branch-card';
        
        // Use a dummy video for now, in the future this can use branch.video
        const videoUrl = branch.video || 'https://www.youtube.com/embed/dQw4w9WgXcQ';

        card.innerHTML = 
          '<div class="branch-card-icon"><i class="bi bi-building"></i></div>' +
          '<div class="branch-card-body" style="width: 100%;">' +
            '<h5 class="branch-name mb-3">' + (branch.name || 'PUMO Branch') + '</h5>' +
            '<div class="branch-video" style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">' +
              '<iframe width="100%" height="180" src="' + videoUrl + '" title="' + (branch.name || 'Branch') + ' Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
            '</div>' +
          '</div>';
        content.appendChild(card);
      });
    } else {
      // Empty or Coming Soon branch list (like Madurai)
      const card = document.createElement('div');
      card.className = 'branch-card';
      card.style.gridColumn = '1 / -1'; // Span across all grid columns
      card.innerHTML = 
        '<div class="branch-card-icon"><i class="bi bi-info-circle-fill text-warning"></i></div>' +
        '<div class="branch-card-body">' +
          '<h5 class="branch-name">Launch Announcement</h5>' +
          '<p class="branch-address">Our team is actively setting up the campus in ' + cityName + '. Grand launch on August 15! Launch schedules, course outlines, and placement registrations will be available shortly!</p>' +
        '</div>';
      content.appendChild(card);
    }

    panel.style.display = 'block';
    // Small timeout to allow browser display cycle before adding anim class
    setTimeout(function () {
      panel.classList.add('is-open');
      // Scroll panel into center focus
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  }

  function closeBranchDrawer() {
    const panel = document.getElementById('active-city-branches');
    if (panel) {
      panel.classList.remove('is-open');
      panel.style.display = 'none';
    }
  }

  function initGlobalPresence() {
    renderCountryCards();
    renderCitiesGrid();

    const closeBtn = document.getElementById('close-branches-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeBranchDrawer);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalPresence);
  } else {
    initGlobalPresence();
  }
})();
