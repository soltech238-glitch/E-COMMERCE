/* MyShop - plain JavaScript version (English / Hindi / Marathi)
   Pages: #/ (Home), #/products (Products), #/profile (Profile)
   Works on GitHub Pages: no server code needed, only static files. */
(function () {
  'use strict';

  /* ---------- Settings ---------- */
  var API_BASE = 'https://a2zithub.org/dairy/abi/';
  var SLIDER_URL = API_BASE + 'slider_det';
  var PRODUCT_URL = API_BASE + 'product_det';
  var PRICE = 1500; // same fixed price as the original site
  var PRODUCT_IMG = 'https://tse2.mm.bing.net/th/id/OIP.NTg2RwK-BYDzzZakmgaJsQHaFD?w=937&h=640&rs=1&pid=ImgDetMain&o=7&rm=3';
  var STORAGE_LANG = 'myshop_lang';
  var STORAGE_CART = 'myshop_cart';

  /* ---------- Translations ---------- */
  var I18N = {
    en: {
      brand: 'MyShop',
      navHome: 'Home', navProducts: 'Products', navProfile: 'Profile', navContact: 'Contact', navAbout: 'About',
      cart: '🛒 Cart', cartPlain: 'Cart',
      featured: '⭐ Featured Products', newArrivals: '🆕 New Arrivals',
      productsTitle: 'Products',
      sportsShoes: 'Sports Shoes', sampleProduct: 'Sample product',
      addToCart: 'Add to Cart', added: 'Added ✓',
      footerAbout: 'Your one-stop online store for quality products at best prices.',
      quickLinks: 'Quick Links', contactUs: 'Contact Us', india: 'India',
      rights: '© 2025 MyShop | All Rights Reserved',
      loading: 'Loading...', loadError: 'Could not load data. Please check your internet connection and try again.',
      retry: 'Try again', noProducts: 'No products found.',
      cartTitle: 'Your Cart', cartEmpty: 'Your cart is empty.', total: 'Total',
      clearCart: 'Clear cart', close: 'Close', remove: 'Remove',
      profileText: 'Profile page is coming soon.',
      slide: 'Slide', prev: 'Previous', next: 'Next',
      metaDesc: 'MyShop'
    },
    hi: {
      brand: 'MyShop',
      navHome: 'होम', navProducts: 'उत्पाद', navProfile: 'प्रोफ़ाइल', navContact: 'संपर्क', navAbout: 'हमारे बारे में',
      cart: '🛒 कार्ट', cartPlain: 'कार्ट',
      featured: '⭐ विशेष उत्पाद', newArrivals: '🆕 नए उत्पाद',
      productsTitle: 'उत्पाद',
      sportsShoes: 'स्पोर्ट्स शूज़', sampleProduct: 'नमूना उत्पाद',
      addToCart: 'कार्ट में जोड़ें', added: 'जोड़ दिया ✓',
      footerAbout: 'गुणवत्तापूर्ण उत्पाद सबसे अच्छी कीमतों पर, आपकी एक ही जगह की ऑनलाइन दुकान।',
      quickLinks: 'त्वरित लिंक', contactUs: 'हमसे संपर्क करें', india: 'भारत',
      rights: '© 2025 MyShop | सर्वाधिकार सुरक्षित',
      loading: 'लोड हो रहा है...', loadError: 'डेटा लोड नहीं हो सका। कृपया इंटरनेट कनेक्शन जाँचें और फिर कोशिश करें।',
      retry: 'फिर कोशिश करें', noProducts: 'कोई उत्पाद नहीं मिला।',
      cartTitle: 'आपका कार्ट', cartEmpty: 'आपका कार्ट खाली है।', total: 'कुल',
      clearCart: 'कार्ट खाली करें', close: 'बंद करें', remove: 'हटाएँ',
      profileText: 'प्रोफ़ाइल पेज जल्द आ रहा है।',
      slide: 'स्लाइड', prev: 'पिछला', next: 'अगला',
      metaDesc: 'MyShop'
    },
    mr: {
      brand: 'MyShop',
      navHome: 'मुख्यपृष्ठ', navProducts: 'उत्पादने', navProfile: 'प्रोफाइल', navContact: 'संपर्क', navAbout: 'आमच्याबद्दल',
      cart: '🛒 कार्ट', cartPlain: 'कार्ट',
      featured: '⭐ वैशिष्ट्यपूर्ण उत्पादने', newArrivals: '🆕 नवीन आगमन',
      productsTitle: 'उत्पादने',
      sportsShoes: 'स्पोर्ट्स शूज', sampleProduct: 'नमुना उत्पादन',
      addToCart: 'कार्टमध्ये जोडा', added: 'जोडले ✓',
      footerAbout: 'उत्तम दर्जाची उत्पादने सर्वोत्तम किमतीत, तुमचे वन-स्टॉप ऑनलाइन स्टोअर.',
      quickLinks: 'झटपट दुवे', contactUs: 'आमच्याशी संपर्क साधा', india: 'भारत',
      rights: '© 2025 MyShop | सर्व हक्क राखीव',
      loading: 'लोड होत आहे...', loadError: 'डेटा लोड होऊ शकला नाही. कृपया इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा.',
      retry: 'पुन्हा प्रयत्न करा', noProducts: 'कोणतेही उत्पादन आढळले नाही.',
      cartTitle: 'तुमचा कार्ट', cartEmpty: 'तुमचा कार्ट रिकामा आहे.', total: 'एकूण',
      clearCart: 'कार्ट रिकामा करा', close: 'बंद करा', remove: 'काढा',
      profileText: 'प्रोफाइल पेज लवकरच येत आहे.',
      slide: 'स्लाइड', prev: 'मागील', next: 'पुढील',
      metaDesc: 'MyShop'
    }
  };

  /* ---------- Small helpers ---------- */
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function storageGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function storageSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* storage may be blocked */ }
  }

  function money(n) { return '₹' + n; }

  var lang = 'en';
  function t(key) {
    var table = I18N[lang] || I18N.en;
    return table[key] != null ? table[key] : (I18N.en[key] != null ? I18N.en[key] : key);
  }

  var appEl = document.getElementById('app');

  /* ---------- Data loading (cached, loaded only once) ---------- */
  // status: 'idle' -> 'loading' -> 'ok' | 'error'
  var sliders = { status: 'idle', data: [] };
  var products = { status: 'idle', data: [] };

  function fetchJSON(url) {
    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, 15000) : null;
    return fetch(url, controller ? { signal: controller.signal } : undefined)
      .then(function (res) {
        if (!res.ok) { throw new Error('HTTP ' + res.status); }
        return res.json();
      })
      .then(function (json) {
        if (timer) { clearTimeout(timer); }
        return Array.isArray(json) ? json : [];
      }, function (err) {
        if (timer) { clearTimeout(timer); }
        throw err;
      });
  }

  function load(box, url) {
    if (box.status !== 'idle') { return; }
    box.status = 'loading';
    fetchJSON(url).then(function (list) {
      box.data = list;
      box.status = 'ok';
    }).catch(function (err) {
      console.error('MyShop: failed to load ' + url, err);
      box.status = 'error';
    }).then(render);
  }

  /* ---------- Cart ---------- */
  var cart = [];
  try {
    var saved = JSON.parse(storageGet(STORAGE_CART) || '[]');
    if (Array.isArray(saved)) {
      cart = saved.filter(function (i) { return i && i.key != null && i.qty > 0; });
    }
  } catch (e) { cart = []; }

  var itemsByKey = {}; // product key -> product info, filled while rendering cards

  function saveCart() { storageSet(STORAGE_CART, JSON.stringify(cart)); }

  function cartCount() {
    return cart.reduce(function (sum, i) { return sum + i.qty; }, 0);
  }

  function addToCart(key) {
    var info = itemsByKey[key];
    if (!info) { return; }
    var found = cart.filter(function (i) { return i.key === key; })[0];
    if (found) {
      found.qty += 1;
    } else {
      cart.push({ key: key, name: info.name, nameKey: info.nameKey || null, qty: 1 });
    }
    saveCart();
    renderCart();
  }

  function changeQty(key, delta) {
    cart.forEach(function (i) { if (i.key === key) { i.qty += delta; } });
    cart = cart.filter(function (i) { return i.qty > 0; });
    saveCart();
    renderCart();
  }

  function removeItem(key) {
    cart = cart.filter(function (i) { return i.key !== key; });
    saveCart();
    renderCart();
  }

  function renderCart() {
    var count = cartCount();
    var badge = document.getElementById('cartCount');
    badge.textContent = count;
    badge.hidden = count === 0;

    var body = document.getElementById('cartBody');
    var clearBtn = document.getElementById('clearCartBtn');
    if (cart.length === 0) {
      body.innerHTML = '<p class="text-center text-muted my-4">' + esc(t('cartEmpty')) + '</p>';
      clearBtn.disabled = true;
    } else {
      clearBtn.disabled = false;
      body.innerHTML = cart.map(function (i) {
        var sub = i.nameKey ? t(i.nameKey) : i.name;
        var key = esc(i.key);
        return '<div class="cart-row d-flex align-items-center justify-content-between py-2">' +
          '<div class="me-2"><div class="fw-semibold">' + esc(t('sportsShoes')) + '</div>' +
          '<div class="text-muted small">' + esc(sub) + '</div>' +
          '<div class="text-primary small fw-bold">' + money(PRICE) + '</div></div>' +
          '<div class="d-flex align-items-center gap-1">' +
          '<button type="button" class="btn btn-outline-secondary btn-sm" data-act="dec" data-key="' + key + '" aria-label="-">−</button>' +
          '<span class="cart-qty">' + i.qty + '</span>' +
          '<button type="button" class="btn btn-outline-secondary btn-sm" data-act="inc" data-key="' + key + '" aria-label="+">+</button>' +
          '<button type="button" class="btn btn-outline-danger btn-sm ms-2" data-act="remove" data-key="' + key + '">' + esc(t('remove')) + '</button>' +
          '</div></div>';
      }).join('');
    }
    document.getElementById('cartTotal').textContent = money(count * PRICE);
  }

  function openCart() {
    var el = document.getElementById('cartModal');
    if (window.bootstrap && window.bootstrap.Modal) {
      window.bootstrap.Modal.getOrCreateInstance(el).show();
    }
  }

  /* ---------- Page templates ---------- */
  function statusBox(box, retryAttr) {
    if (box.status === 'loading' || box.status === 'idle') {
      return '<div class="status-box"><div class="spinner-border text-primary" role="status"></div>' +
        '<p class="mt-2 text-muted">' + esc(t('loading')) + '</p></div>';
    }
    return '<div class="status-box"><div class="alert alert-warning d-inline-block mb-3">' + esc(t('loadError')) + '</div><br>' +
      '<button type="button" class="btn btn-primary btn-sm" data-retry="' + retryAttr + '">' + esc(t('retry')) + '</button></div>';
  }

  function productKey(data, index, prefix) {
    var id = data.id != null ? data.id : (data.products_id != null ? data.products_id : null);
    return id != null ? 'p-' + id : prefix + '-' + index + '-' + (data.products_name || '');
  }

  function cardHTML(info) {
    itemsByKey[info.key] = info;
    var sub = info.nameKey ? t(info.nameKey) : info.name;
    return '<div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">' +
      '<div class="card h-100 border-0 shadow-sm product-card">' +
      '<img src="' + esc(PRODUCT_IMG) + '" class="card-img-top p-3" alt="' + esc(t('sportsShoes')) + '" loading="lazy">' +
      '<div class="card-body text-center">' +
      '<h6 class="fw-semibold mb-1">' + esc(t('sportsShoes')) + '</h6>' +
      '<p class="text-muted small mb-2">' + esc(sub) + '</p>' +
      '<h6 class="text-primary fw-bold">' + money(PRICE) + '</h6></div>' +
      '<div class="card-footer bg-white border-0 text-center pb-3">' +
      '<button type="button" class="btn btn-sm btn-primary px-4 add-to-cart" data-key="' + esc(info.key) + '">' +
      esc(t('addToCart')) + '</button></div></div></div>';
  }

  function homeProductCards(list, prefix) {
    if (list.length === 0) {
      // data not available: show sample cards so the layout still works
      list = [0, 1].map(function (n) { return { sample: true, n: n }; });
    }
    return list.map(function (d, i) {
      if (d.sample) {
        return cardHTML({ key: 'sample-' + prefix + '-' + d.n, name: '', nameKey: 'sampleProduct' });
      }
      return cardHTML({ key: productKey(d, i, prefix), name: d.products_name || '' });
    }).join('');
  }

  function sliderHTML() {
    if (sliders.status !== 'ok') {
      return statusBox(sliders, 'sliders');
    }
    if (sliders.data.length === 0) { return ''; }
    var items = sliders.data.map(function (s, i) {
      return '<div class="carousel-item' + (i === 0 ? ' active' : '') + '">' +
        '<img src="' + esc(s.slider_img) + '" class="d-block w-100" alt="' + esc(t('slide') + ' ' + (i + 1)) + '"></div>';
    }).join('');
    return '<div id="mainSlider" class="carousel slide rounded-3 overflow-hidden">' +
      '<div class="carousel-inner">' + items + '</div>' +
      '<button class="carousel-control-prev" type="button" data-bs-target="#mainSlider" data-bs-slide="prev">' +
      '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">' + esc(t('prev')) + '</span></button>' +
      '<button class="carousel-control-next" type="button" data-bs-target="#mainSlider" data-bs-slide="next">' +
      '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">' + esc(t('next')) + '</span></button>' +
      '</div>';
  }

  function homeHTML() {
    var list = products.status === 'ok' ? products.data : [];
    return sliderHTML() +
      '<section class="container my-5"><h4 class="mb-4 fw-bold">' + esc(t('featured')) + '</h4>' +
      '<div class="row">' + homeProductCards(list.slice(0, 2), 'f') + '</div></section>' +
      '<section class="container my-5"><h4 class="mb-4 fw-bold">' + esc(t('newArrivals')) + '</h4>' +
      '<div class="row">' + homeProductCards(list.slice(2, 4), 'n') + '</div></section>';
  }

  function productsHTML() {
    var inner;
    if (products.status !== 'ok') {
      inner = statusBox(products, 'products');
    } else if (products.data.length === 0) {
      inner = '<p class="text-center text-muted">' + esc(t('noProducts')) + '</p>';
    } else {
      inner = '<div class="row">' + products.data.map(function (d, i) {
        return cardHTML({ key: productKey(d, i, 'x'), name: d.products_name || '' });
      }).join('') + '</div>';
    }
    return '<h1 class="text-center my-4">' + esc(t('productsTitle')) + '</h1><div class="container">' + inner + '</div>';
  }

  function profileHTML() {
    return '<div class="container my-5 text-center"><h1>' + esc(t('navProfile')) + '</h1>' +
      '<p class="text-muted mt-3">' + esc(t('profileText')) + '</p></div>';
  }

  /* ---------- Router ---------- */
  function currentRoute() {
    var h = (window.location.hash || '').replace(/^#/, '');
    if (h === '/products' || h === '/Products') { return 'products'; }
    if (h === '/profile') { return 'profile'; }
    return 'home';
  }

  function setActiveNav(route) {
    ['home', 'products', 'profile'].forEach(function (name) {
      var a = document.getElementById('nav-' + name);
      var on = name === route;
      a.classList.toggle('active', on);
      a.classList.toggle('fw-semibold', on);
      if (on) { a.setAttribute('aria-current', 'page'); } else { a.removeAttribute('aria-current'); }
    });
  }

  function render() {
    var route = currentRoute();
    setActiveNav(route);

    // clean up an old carousel before replacing the page
    var oldSlider = document.getElementById('mainSlider');
    if (oldSlider && window.bootstrap && window.bootstrap.Carousel) {
      var inst = window.bootstrap.Carousel.getInstance(oldSlider);
      if (inst) { inst.dispose(); }
    }

    itemsByKey = {};
    if (route === 'home') {
      load(sliders, SLIDER_URL);
      load(products, PRODUCT_URL);
      appEl.innerHTML = homeHTML();
      var slider = document.getElementById('mainSlider');
      if (slider && window.bootstrap && window.bootstrap.Carousel) {
        window.bootstrap.Carousel.getOrCreateInstance(slider, { interval: 3000, ride: 'carousel' });
      }
    } else if (route === 'products') {
      load(products, PRODUCT_URL);
      appEl.innerHTML = productsHTML();
    } else {
      appEl.innerHTML = profileHTML();
    }
  }

  /* ---------- Language ---------- */
  function applyLang(newLang, persist) {
    if (!I18N[newLang]) { newLang = 'en'; }
    lang = newLang;
    if (persist) { storageSet(STORAGE_LANG, lang); }
    document.documentElement.lang = lang;
    document.title = t('brand');
    var meta = document.querySelector('meta[name="description"]');
    if (meta) { meta.setAttribute('content', t('metaDesc')); }
    document.getElementById('langSelect').value = lang;

    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = t(nodes[i].getAttribute('data-i18n'));
    }
    render();
    renderCart();
  }

  function detectLang() {
    var savedLang = storageGet(STORAGE_LANG);
    if (savedLang && I18N[savedLang]) { return savedLang; }
    var nav = ((navigator.language || 'en') + '').toLowerCase().slice(0, 2);
    return I18N[nav] ? nav : 'en';
  }

  /* ---------- Events ---------- */
  function collapseNavbar() {
    var el = document.getElementById('navbarNav');
    if (el && el.classList.contains('show') && window.bootstrap && window.bootstrap.Collapse) {
      window.bootstrap.Collapse.getOrCreateInstance(el, { toggle: false }).hide();
    }
  }

  document.getElementById('langSelect').addEventListener('change', function (e) {
    applyLang(e.target.value, true);
  });

  document.getElementById('cartBtn').addEventListener('click', function () {
    collapseNavbar();
    openCart();
  });

  document.getElementById('footerCart').addEventListener('click', function (e) {
    e.preventDefault();
    openCart();
  });

  document.getElementById('clearCartBtn').addEventListener('click', function () {
    cart = [];
    saveCart();
    renderCart();
  });

  document.getElementById('cartBody').addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-act]');
    if (!btn) { return; }
    var key = btn.getAttribute('data-key');
    var act = btn.getAttribute('data-act');
    if (act === 'inc') { changeQty(key, 1); }
    else if (act === 'dec') { changeQty(key, -1); }
    else if (act === 'remove') { removeItem(key); }
  });

  // "Add to Cart" and "Try again" buttons inside the page
  appEl.addEventListener('click', function (e) {
    var add = e.target.closest('.add-to-cart');
    if (add) {
      addToCart(add.getAttribute('data-key'));
      add.textContent = t('added');
      setTimeout(function () {
        if (add.isConnected) { add.textContent = t('addToCart'); }
      }, 1000);
      return;
    }
    var retry = e.target.closest('[data-retry]');
    if (retry) {
      // retry everything that failed (slider and products share the same connection)
      if (sliders.status === 'error') { sliders.status = 'idle'; }
      if (products.status === 'error') { products.status = 'idle'; }
      render();
    }
  });

  // Contact / About links scroll to the footer sections
  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-scroll]');
    if (link) {
      e.preventDefault();
      collapseNavbar();
      var target = document.getElementById(link.getAttribute('data-scroll'));
      if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      return;
    }
    if (e.target.closest('#navbarNav a.nav-link, a.navbar-brand')) { collapseNavbar(); }
  });

  window.addEventListener('hashchange', function () {
    render();
    window.scrollTo(0, 0);
  });

  /* ---------- Start ---------- */
  applyLang(detectLang(), false);
})();
