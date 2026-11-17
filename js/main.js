/* ==========================================================================
   PHỤ KIỆN 88 - INTERACTIVE SCRIPT (Vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initBackToTop();
  initProductFilter();
  initPricingCalculator();
  initBookingForm();
  initQuickViewModal();
  initCounters();
});

/* ==========================================================================
   1. NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.querySelector('.nav-toggle-btn');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');

  // Sticky Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close when clicking any nav link
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
    });
  }

  // Active section indicator via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "-80px 0px 0px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkItems.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   2. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const topBtn = document.getElementById('backToTopBtn');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      topBtn.classList.add('show');
    } else {
      topBtn.classList.remove('show');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   3. PRODUCT FILTER TABS
   ========================================================================== */
function initProductFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const products = document.querySelectorAll('.product-card');

  if (!tabs.length || !products.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      products.forEach(product => {
        const category = product.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          product.style.display = 'flex';
          setTimeout(() => {
            product.style.opacity = '1';
            product.style.transform = 'translateY(0)';
          }, 50);
        } else {
          product.style.opacity = '0';
          product.style.transform = 'translateY(15px)';
          setTimeout(() => {
            product.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   4. INTERACTIVE PRICING CALCULATOR
   ========================================================================== */
const pricingDatabase = {
  iphone: {
    models: [
      { id: 'ip15pm', name: 'iPhone 15 Pro Max', prices: { pin: '850.000đ', epkinh: '1.200.000đ', man: '5.900.000đ', ppf: '250.000đ' }, time: '20 - 35 phút', warranty: '12 Tháng' },
      { id: 'ip15p', name: 'iPhone 15 Pro', prices: { pin: '800.000đ', epkinh: '1.100.000đ', man: '5.200.000đ', ppf: '220.000đ' }, time: '20 - 35 phút', warranty: '12 Tháng' },
      { id: 'ip14pm', name: 'iPhone 14 Pro Max', prices: { pin: '750.000đ', epkinh: '950.000đ', man: '4.800.000đ', ppf: '220.000đ' }, time: '15 - 30 phút', warranty: '12 Tháng' },
      { id: 'ip13pm', name: 'iPhone 13 Pro Max', prices: { pin: '650.000đ', epkinh: '850.000đ', man: '3.900.000đ', ppf: '200.000đ' }, time: '15 - 30 phút', warranty: '12 Tháng' },
      { id: 'ip12pm', name: 'iPhone 12 Pro Max', prices: { pin: '550.000đ', epkinh: '750.000đ', man: '2.800.000đ', ppf: '180.000đ' }, time: '15 - 25 phút', warranty: '12 Tháng' },
      { id: 'ip11pm', name: 'iPhone 11 Pro Max', prices: { pin: '450.000đ', epkinh: '650.000đ', man: '1.950.000đ', ppf: '180.000đ' }, time: '15 - 25 phút', warranty: '12 Tháng' }
    ]
  },
  samsung: {
    models: [
      { id: 's24u', name: 'Galaxy S24 Ultra', prices: { pin: '750.000đ', epkinh: '1.250.000đ', man: '5.600.000đ', ppf: '250.000đ' }, time: '25 - 40 phút', warranty: '12 Tháng' },
      { id: 's23u', name: 'Galaxy S23 Ultra', prices: { pin: '650.000đ', epkinh: '1.050.000đ', man: '4.800.000đ', ppf: '220.000đ' }, time: '25 - 40 phút', warranty: '12 Tháng' },
      { id: 's22u', name: 'Galaxy S22 Ultra', prices: { pin: '550.000đ', epkinh: '950.000đ', man: '4.200.000đ', ppf: '200.000đ' }, time: '20 - 35 phút', warranty: '12 Tháng' },
      { id: 'zfold5', name: 'Galaxy Z Fold 5', prices: { pin: '850.000đ', epkinh: '1.800.000đ', man: '7.500.000đ', ppf: '350.000đ' }, time: '35 - 50 phút', warranty: '12 Tháng' }
    ]
  },
  xiaomi: {
    models: [
      { id: 'mi14', name: 'Xiaomi 14 / 14 Pro', prices: { pin: '550.000đ', epkinh: '750.000đ', man: '2.800.000đ', ppf: '180.000đ' }, time: '20 - 30 phút', warranty: '12 Tháng' },
      { id: 'mi13', name: 'Xiaomi 13 / 13 Pro', prices: { pin: '450.000đ', epkinh: '650.000đ', man: '2.400.000đ', ppf: '160.000đ' }, time: '20 - 30 phút', warranty: '12 Tháng' },
      { id: 'redmik60', name: 'Redmi K60 / K70', prices: { pin: '400.000đ', epkinh: '550.000đ', man: '1.800.000đ', ppf: '150.000đ' }, time: '15 - 25 phút', warranty: '12 Tháng' }
    ]
  },
  oppo: {
    models: [
      { id: 'findx7', name: 'OPPO Find X7 / Ultra', prices: { pin: '650.000đ', epkinh: '950.000đ', man: '3.800.000đ', ppf: '200.000đ' }, time: '25 - 35 phút', warranty: '12 Tháng' },
      { id: 'reno11', name: 'OPPO Reno 11 / 11 Pro', prices: { pin: '450.000đ', epkinh: '650.000đ', man: '1.950.000đ', ppf: '160.000đ' }, time: '20 - 30 phút', warranty: '12 Tháng' }
    ]
  }
};

function initPricingCalculator() {
  const brandSelect = document.getElementById('calcBrandSelect');
  const modelSelect = document.getElementById('calcModelSelect');
  const serviceSelect = document.getElementById('calcServiceSelect');
  const priceDisplay = document.getElementById('calcPriceResult');
  const timeDisplay = document.getElementById('calcTimeResult');
  const warrantyDisplay = document.getElementById('calcWarrantyResult');
  const bookBtn = document.getElementById('calcBookNowBtn');

  if (!brandSelect || !modelSelect || !serviceSelect) return;

  function populateModels(brand) {
    modelSelect.innerHTML = '';
    const brandData = pricingDatabase[brand];
    if (brandData && brandData.models) {
      brandData.models.forEach(m => {
        const option = document.createElement('option');
        option.value = m.id;
        option.textContent = m.name;
        modelSelect.appendChild(option);
      });
    }
  }

  function updatePrice() {
    const brand = brandSelect.value;
    const modelId = modelSelect.value;
    const service = serviceSelect.value;

    const brandData = pricingDatabase[brand];
    if (!brandData) return;

    const modelObj = brandData.models.find(m => m.id === modelId) || brandData.models[0];
    if (!modelObj) return;

    const price = modelObj.prices[service] || 'Liên hệ Hotline';
    priceDisplay.textContent = price;
    timeDisplay.textContent = modelObj.time;
    warrantyDisplay.textContent = modelObj.warranty;
  }

  brandSelect.addEventListener('change', () => {
    populateModels(brandSelect.value);
    updatePrice();
  });

  modelSelect.addEventListener('change', updatePrice);
  serviceSelect.addEventListener('change', updatePrice);

  // Initialize defaults
  populateModels('iphone');
  updatePrice();

  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      const selectedModelName = modelSelect.options[modelSelect.selectedIndex]?.text || '';
      const selectedService = serviceSelect.options[serviceSelect.selectedIndex]?.text || '';
      
      // Auto-fill into booking section
      const formDevice = document.getElementById('bookDevice');
      const formService = document.getElementById('bookService');
      
      if (formDevice) formDevice.value = selectedModelName;
      if (formService) formService.value = serviceSelect.value;

      const bookingSection = document.getElementById('dat-lich');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        showToast(`Đã chọn ${selectedModelName} - ${selectedService}!`);
      }
    });
  }
}

/* ==========================================================================
   5. BOOKING FORM HANDLER
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  const modal = document.getElementById('bookingSuccessModal');
  const closeBtn = document.getElementById('closeBookingModalBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('bookName')?.value.trim();
    const phone = document.getElementById('bookPhone')?.value.trim();
    const device = document.getElementById('bookDevice')?.value.trim();
    const branch = document.getElementById('bookBranch')?.options[document.getElementById('bookBranch').selectedIndex]?.text;
    const date = document.getElementById('bookDate')?.value;

    if (!name || !phone) {
      alert('Vui lòng nhập Họ tên và Số điện thoại để hoàn tất đặt lịch!');
      return;
    }

    // Populate modal details
    const confirmName = document.getElementById('confirmName');
    const confirmPhone = document.getElementById('confirmPhone');
    const confirmDevice = document.getElementById('confirmDevice');
    const confirmBranch = document.getElementById('confirmBranch');
    const confirmCode = document.getElementById('confirmCode');

    if (confirmName) confirmName.textContent = name;
    if (confirmPhone) confirmPhone.textContent = phone;
    if (confirmDevice) confirmDevice.textContent = device || 'Điện thoại';
    if (confirmBranch) confirmBranch.textContent = branch || 'Chi nhánh Cần Thơ';
    
    // Generate random booking code
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    if (confirmCode) confirmCode.textContent = `PK88-VIP${randomNum}`;

    if (modal) {
      modal.classList.add('active');
    }

    form.reset();
    showToast('🎉 Đặt lịch thành công! Tư vấn viên sẽ gọi xác nhận trong 5 phút.');
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   6. QUICK VIEW MODAL & CART TOAST
   ========================================================================== */
const productData = {
  'p1': {
    title: 'Cáp WiWU Titan 100W 4-in-1 Bọc Dù Siêu Bền (PK88 Cần Thơ)',
    category: 'CỦ CÁP SẠC NHANH',
    price: '280.000đ',
    oldPrice: '350.000đ',
    image: 'assets/showcase/wiwu-titan-cable.png',
    desc: 'Cáp sạc siêu tốc WiWU Titan chính hãng phân phối tại Phụ Kiện 88. Hỗ trợ sạc đa năng 4 cổng (USB-A, Type-C, Lightning), công suất cực đại 100W Power Delivery, tích hợp màn hình LED hiển thị công suất sạc trực tiếp. Vỏ hợp kim kẽm bọc dù chống đứt gãy tuyệt đối.',
    specs: ['Công suất: 100W PD Fast Charge', 'Màn hình LED đo Wats thông minh', 'Dây bọc dù xoắn 5 lớp chống đứt', 'Bảo hành 1 đổi 1 trong 12 tháng']
  },
  'p2': {
    title: 'Ốp Lưng Chống Sốc Gear4 Crystal Palace D3O (iPhone 15 Series)',
    category: 'ỐP LƯNG CHỐNG SỐC',
    price: '490.000đ',
    oldPrice: '650.000đ',
    image: 'assets/showcase/gear4-case-d3o.png',
    desc: 'Ốp lưng chống sốc cao cấp ứng dụng vật liệu D3O độc quyền tiêu chuẩn quân đội, chống rơi vỡ từ độ cao 4 mét (13ft). Mặt lưng trong suốt pha lê kháng ố vàng Anti-Yellowing công nghệ mới, tương thích hoàn hảo sạc không dây 5G & MagSafe.',
    specs: ['Chống sốc tiêu chuẩn quân đội 4m', 'Vật liệu D3O giảm chấn 90%', 'Kháng ố vàng vĩnh viễn', 'Viền nhô cao bảo vệ camera & màn hình']
  },
  'p3': {
    title: 'Ốp Lưng Armor Chống Va Đập Tiêu Chuẩn Quân Đội',
    category: 'ỐP LƯNG CHỐNG SỐC',
    price: '190.000đ',
    oldPrice: '260.000đ',
    image: 'assets/showcase/shockproof-case-banner.png',
    desc: 'Thiết kế hầm hố nam tính, túi khí đệm khí 4 góc chống va đập toàn diện khi rơi rớt. Chất liệu TPU + Polycarbonate cao su non cao cấp, không cấn viền dán cường lực hay tróc sơn máy.',
    specs: ['Đệm khí 4 góc Airbag Protection', 'Không cấn kính cường lực', 'Gờ bảo vệ cụm camera 1.2mm', 'Độ bám tay chống trơn trượt']
  },
  'p4': {
    title: 'Kính Cường Lực KingKong 9D Siêu Mượt Chống Nhìn Trộm',
    category: 'KÍNH CƯỜNG LỰC & PPF',
    price: '120.000đ',
    oldPrice: '180.000đ',
    image: 'assets/showcase/screen-repair-result.png',
    desc: 'Độ cứng 9H tiêu chuẩn quốc tế, phủ nano Oleophobic cao cấp lướt mượt mà không bám vân tay hay mồ hôi. Góc chống nhìn trộm 28 độ bảo vệ riêng tư tối đa khi ở nơi đông người.',
    specs: ['Độ cứng 9H chống trầy xước dao kéo', 'Góc nhìn trộm 28 độ', 'Phủ Nano Oleophobic vuốt cực êm', 'Dán lấy ngay tại quầy 5 phút']
  },
  'p5': {
    title: 'Dán PPF USA 360° Tự Phục Hồi Vết Xước (Full Viền + Lưng)',
    category: 'KÍNH CƯỜNG LỰC & PPF',
    price: '180.000đ',
    oldPrice: '250.000đ',
    image: 'assets/showcase/screen-repair-result.png',
    desc: 'Film PPF nhập khẩu chính ngạch USA độ trong suốt 99%, độ dẻo dai đàn hồi cực tốt, tự phục hồi các vết xước dăm bằng nhiệt độ tự nhiên. Cắt máy laser CNC chuẩn xác từng lỗ loa, phím bấm.',
    specs: ['Film PPF TPU USA chính hãng', 'Tự lành vết trầy xước bằng nhiệt', 'Bảo toàn 100% màu sơn zin của máy', 'Bảo hành bong tróc 60 ngày']
  },
  'p6': {
    title: 'Củ Sạc GaN 65W 3 Cổng Đa Năng Sạc Nhanh Laptop & Phone',
    category: 'CỦ CÁP SẠC NHANH',
    price: '420.000đ',
    oldPrice: '550.000đ',
    image: 'assets/showcase/wiwu-titan-cable.png',
    desc: 'Công nghệ chip GaN bán dẫn thế hệ mới giúp thu nhỏ kích thước 40% nhưng tỏa nhiệt cực thấp. Hỗ trợ cùng lúc 2 cổng Type-C và 1 cổng USB-A sạc được cả MacBook, iPad và iPhone cùng lúc.',
    specs: ['Công nghệ Gallium Nitride (GaN)', 'Sạc cùng lúc 3 thiết bị an toàn', 'Tự điều chỉnh dòng điện chống cháy nổ', 'Bảo hành lỗi 1 đổi 1 trong 12T']
  }
};

function initQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  const closeBtn = document.getElementById('closeQuickViewBtn');
  const viewBtns = document.querySelectorAll('.btn-quick-view');
  const buyBtns = document.querySelectorAll('.btn-buy-now');

  if (!modal) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pid = btn.getAttribute('data-pid');
      const item = productData[pid];
      if (!item) return;

      document.getElementById('qvCategory').textContent = item.category;
      document.getElementById('qvTitle').textContent = item.title;
      document.getElementById('qvPrice').textContent = item.price;
      document.getElementById('qvOldPrice').textContent = item.oldPrice;
      document.getElementById('qvImage').src = item.image;
      document.getElementById('qvDesc').textContent = item.desc;

      const specsList = document.getElementById('qvSpecs');
      if (specsList) {
        specsList.innerHTML = '';
        item.specs.forEach(s => {
          const li = document.createElement('li');
          li.innerHTML = `<i class="fa-solid fa-check text-gold"></i> ${s}`;
          specsList.appendChild(li);
        });
      }

      modal.classList.add('active');
    });
  });

  buyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = btn.closest('.product-card');
      const title = card ? card.querySelector('.product-title')?.textContent : 'Sản phẩm';
      showToast(`🛒 Đã thêm "${title}" vào giỏ hàng!`);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   7. TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message, iconClass = 'fa-solid fa-circle-check') {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <i class="${iconClass} toast-icon"></i>
    <span class="toast-text">${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   8. ANIMATED COUNTERS
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  const handleScroll = () => {
    if (animated) return;
    const strip = document.querySelector('.trust-strip');
    if (!strip) return;

    const rect = strip.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      animated = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.ceil(current).toLocaleString('vi-VN');
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString('vi-VN');
          }
        };
        updateCounter();
      });
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}
