/* ==========================================================================
   AL RAYYAN FURNITURE 2 (مفروشات الريان 2) - JavaScript Application Logic
   Features:
   - Dynamic English & Arabic Translations without page reload
   - Direction switching (LTR / RTL)
   - localStorage persistence for language preference
   - Dynamic 12 Categories and 12+ Detailed Furniture Products
   - Category filtering
   - Pre-filled WhatsApp ordering logic (+966 53 555 4962)
   - Mobile navigation hamburger menu
   - Product detail modal / lightbox
   ========================================================================== */

// Store Phone & Base URLs
const WHATSAPP_NUMBER = "966535554962";
const SHOP_NAME_EN = "AL RAYYAN FURNITURE 2";
const SHOP_NAME_AR = "مفروشات الريان 2";

// Current active language ('en' or 'ar')
let currentLang = localStorage.getItem('alrayyan_lang') || 'en';

// Categories Data (12 Categories)
const categoriesData = [
    {
        id: "sofas",
        nameEn: "Sofas & Couches",
        nameAr: "أطقم كنب ومجالس",
        image: "IMAGES/images (21).jpg"
    },
    {
        id: "chairs",
        nameEn: "Luxury Armchairs",
        nameAr: "كراسي فاخرة",
        image: "IMAGES/images (10).jpg"
    },
    {
        id: "tables",
        nameEn: "Tables & Coffee Tables",
        nameAr: "طاولات وطاولات شاي",
        image: "IMAGES/images (17).jpg"
    },
    {
        id: "beds",
        nameEn: "Beds & Mattresses",
        nameAr: "أسرة نوم وغرف نوم",
        image: "IMAGES/images (15).jpg"
    },
    {
        id: "wardrobes",
        nameEn: "Wardrobes & Closets",
        nameAr: "خزائن ملابس وخزائن",
        image: "IMAGES/images (74).jpg"
    },
    {
        id: "dining-tables",
        nameEn: "Dining Tables",
        nameAr: "طاولات طعام",
        image: "IMAGES/images (30).jpg"
    },
    {
        id: "dining-chairs",
        nameEn: "Dining Chairs",
        nameAr: "كراسي طعام",
        image: "IMAGES/images (33).jpg"
    },
    {
        id: "curtains",
        nameEn: "Curtains & Drapes",
        nameAr: "ستائر وديكورات نوافذ",
        image: "IMAGES/images (27).jpg"
    },
    {
        id: "upholstery",
        nameEn: "Upholstery & Fabrics",
        nameAr: "تنجيد وقماش أثاث",
        image: "IMAGES/images (66).jpg"
    },
    {
        id: "decor",
        nameEn: "Home Decoration",
        nameAr: "ديكورات منزلية",
        image: "IMAGES/images (38).jpg"
    },
    {
        id: "living-room",
        nameEn: "Living Room Furniture",
        nameAr: "أثاث غرف المعيشة",
        image: "IMAGES/images (22).jpg"
    },
    {
        id: "bedroom",
        nameEn: "Bedroom Furniture",
        nameAr: "أثاث غرف النوم الكاملة",
        image: "IMAGES/images (13).jpg"
    }
];

// Products Data (12 Realistic Furniture Products)
const productsData = [
    {
        id: 1,
        category: "sofas",
        nameEn: "Royal Velvet Living Room Sofa Set",
        nameAr: "طقم كنب مخملي ملكي لغرفة المعيشة",
        descEn: "Plush velvet upholstery with gold frame trim, supreme comfort, and durable cushions.",
        descAr: "تنجيد مخملي ناعم مع إطار ذكي ومذهب، راحة فائقة ووسائد عالية التحمل.",
        priceEn: "Contact for Price",
        priceAr: "تواصل لمعرفة السعر",
        image: "IMAGES/images (21).jpg",
        badgeEn: "Best Seller",
        badgeAr: "الأكثر مبيعاً"
    },
    {
        id: 2,
        category: "beds",
        nameEn: "Luxury Master Bed with Padded Headboard",
        nameAr: "سرير نوم رئيسي فاخر مع خلفية مبطنة",
        descEn: "Modern king-size bed with premium fabric headboard and solid wood frame construction.",
        descAr: "سرير نوم فاخر مقاس كبير مع خلفية قماشية مبطنة وفاخرة وإطار خشب متين.",
        priceEn: "Contact for Price",
        priceAr: "تواصل لمعرفة السعر",
        image: "IMAGES/images (15).jpg",
        badgeEn: "New Arrival",
        badgeAr: "وصل حديثاً"
    },
    {
        id: 3,
        category: "dining",
        nameEn: "Modern 8-Seater Dining Table Set",
        nameAr: "طقم طاولة طعام حديثة 8 مقاعد",
        descEn: "Elegant marble finish tabletop with 8 comfortable velvet padded dining chairs.",
        descAr: "سطح طاولة بتشطيب رخامي أنيق مع 8 كراسي طعام مخملية مريحة.",
        priceEn: "Contact for Price",
        priceAr: "تواصل لمعرفة السعر",
        image: "IMAGES/images (30).jpg",
        badgeEn: "Featured",
        badgeAr: "مميز"
    },
    {
        id: 4,
        category: "sofas",
        nameEn: "Arabic Majlis L-Shape Sectional Sofa",
        nameAr: "كنب مجلس عربي على شكل L",
        descEn: "Traditional & modern blend sectional sofa tailored for spacious Saudi home receptions.",
        descAr: "تصميم يجمع بين الأصالة والحداثة لمجالس وضيوف المنازل السعودية.",
        priceEn: "Contact for Price",
        priceAr: "تواصل لمعرفة السعر",
        image: "IMAGES/images (22).jpg",
        badgeEn: "Popular",
        badgeAr: "رائج"
    },
    {
        id: 5,
        category: "decor",
        nameEn: "Luxury Sheer & Blackout Curtains Set",
        nameAr: "طقم ستائر فاخرة طبقتين (شفاف وبلاك أوت)",
        descEn: "Custom fitted premium curtains with elegant drape lines and thermal insulation fabric.",
        descAr: "ستائر مفصلة حسب الطلب بأقمشة عازلة للحرارة وديكورات ذهبية أنيقة.",
        priceEn: "Contact for Price",
        priceAr: "تواصل لمعرفة السعر",
        image: "IMAGES/images (27).jpg",
        badgeEn: "Custom Made",
        badgeAr: "تفصيل حسب الطلب"
    },
    {
        id: 6,
        category: "beds",
        nameEn: "Modern 6-Door Bedroom Wardrobe",
        nameAr: "خزانة ملابس حديثة 6 أبواب",
        descEn: "Spacious wooden wardrobe with mirror doors, inner LED lighting, and drawer organizers.",
        descAr: "خزانة ملابس خشبية واسعة مع مرايا وإضاءة داخلية وتقسيمات عملات.",
        priceEn: "Contact for Price",
        priceAr: "تواصل لمعرفة السعر",
        image: "IMAGES/images (74).jpg",
        badgeEn: "Spacious",
        badgeAr: "مساحة واسعة"
    },
    {
        id: 7,
        category: "sofas",
        nameEn: "Classic Accent Lounge Chair",
        nameAr: "كرسي استرخاء كلاسيكي أنيق",
        descEn: "Ergonomic wingback accent chair upholstered in high-density premium fabric.",
        descAr: "كرسي مفرد بتصميم مريح وتنجيد قماشي ممتاز للصالونات والزوايا.",
        priceEn: "Contact for Price",
        priceAr: "تواصل لمعرفة السعر",
        image: "IMAGES/images (10).jpg",
        badgeEn: "Classic",
        badgeAr: "كلاسيكي"
    },
    {
        id: 8,
        category: "dining",
        nameEn: "Contemporary Coffee Table Set",
        nameAr: "طقم طاولات شاي وقهوة عصري",
        descEn: "Nested coffee table set with gold metallic legs and scratch-resistant surface.",
        descAr: "طقم طاولات خدمة متداخلة بأرجل معدنية ذهبية وسطح مقاوم للخدش.",
        priceEn: "Contact for Price",
        priceAr: "تواصل لمعرفة السعر",
        image: "IMAGES/images (17).jpg",
        badgeEn: "Set of 3",
        badgeAr: "طقم 3 قطع"
    },
    {
        id: 9,
        category: "decor",
        nameEn: "Custom Sofa Upholstery Fabric Service",
        nameAr: "خدمة تنجيد وتجديد أطقم الكنب",
        descEn: "High-grade Turkish and European upholstery fabrics for custom home renovation.",
        descAr: "أقمشة تنجيد تركية وأوروبية فاخرة لتجديد وتفصيل أثاث بيتك.",
        priceEn: "Contact for Price",
        priceAr: "تواصل لمعرفة السعر",
        image: "IMAGES/images (66).jpg",
        badgeEn: "Service",
        badgeAr: "خدمة خاصة"
    },
    {
        id: 10,
        category: "beds",
        nameEn: "Complete Modern Bedroom Suite",
        nameAr: "غرفة نوم حديثة متكاملة",
        descEn: "Includes King bed, 2 nightstands, dresser with mirror, and wardrobe closet.",
        descAr: "تشمل سرير كبير، 2 كومودينو، تسريحة مع مرآة، وخزانة ملابس راقية.",
        priceEn: "Contact for Price",
        priceAr: "تواصل لمعرفة السعر",
        image: "IMAGES/images (13).jpg",
        badgeEn: "Full Set",
        badgeAr: "طقم كامل"
    },
    {
        id: 11,
        category: "decor",
        nameEn: "Luxury Wall Mirrors & Home Decor Set",
        nameAr: "مرايا جدارية وديكورات فاخرة للمنزل",
        descEn: "Artistic metallic framed mirrors to elevate living room and hall aesthetics.",
        descAr: "مرايا ديكورية بإطارات ذهبية وفضية تضفي لمسة فخامة على الصالة والغرف.",
        priceEn: "Contact for Price",
        priceAr: "تواصل لمعرفة السعر",
        image: "IMAGES/images (38).jpg",
        badgeEn: "Luxury Decor",
        badgeAr: "ديكور فاخر"
    },
    {
        id: 12,
        category: "dining",
        nameEn: "Premium Upholstered Dining Chairs (Set of 6)",
        nameAr: "طقم كراسي طعام مبطنة فاخرة (6 كراسي)",
        descEn: "Sturdy wooden frame dining chairs with water-resistant fabric seats.",
        descAr: "كراسي طعام خشبية متينة بتنجيد قماشي مقاوم للبقع والماء.",
        priceEn: "Contact for Price",
        priceAr: "تواصل لمعرفة السعر",
        image: "IMAGES/images (33).jpg",
        badgeEn: "Set of 6",
        badgeAr: "طقم 6 كراسي"
    }
];

// Translation Dictionary for Static UI Elements
const translations = {
    en: {
        deliveryText: "Delivery available all over Saudi Arabia 🇸🇦 | التوصيل متوفر لكافة أنحاء المملكة العربية السعودية",
        navHome: "Home",
        navCategories: "Categories",
        navProducts: "Products",
        navAbout: "About Us",
        navHowToBuy: "How to Buy",
        navLocation: "Location",
        navContact: "Contact",
        headerWhatsApp: "Contact Us",
        heroBadge: "Luxury Living Collection",
        heroTagline: '"Quality Furniture for Your Beautiful Home"',
        heroSubtext: "Transforming living spaces with elegance, comfort, and unmatched craftsmanship.",
        exploreBtn: "Explore Furniture",
        heroWaBtn: "Contact on WhatsApp",
        statQuality: "Premium Quality",
        statDelivery: "Nationwide Delivery",
        statSupport: "WhatsApp Support",
        catSubtitle: "Our Showroom Specialties",
        catTitle: "Furniture Categories",
        prodSubtitle: "Featured Showroom Collection",
        prodTitle: "Our Exclusive Products",
        filterAll: "All Products",
        filterSofas: "Sofas & Living",
        filterBeds: "Beds & Bedroom",
        filterDining: "Dining Tables",
        filterDecor: "Decor & Curtains",
        buySubtitle: "Simple Ordering Process",
        buyTitle: "HOW TO BUY",
        step1Title: "Browse Collection",
        step1Desc: "Browse our furniture collection on our website or showroom.",
        step2Title: "Select Product",
        step2Desc: "Select the product you like that fits your home style.",
        step3Title: "Click Buy on WhatsApp",
        step3Desc: 'Click the "Buy on WhatsApp" button on your chosen product card.',
        step4Title: "Get Pricing & Details",
        step4Desc: "Contact us on WhatsApp for price, customization, and availability.",
        step5Title: "Confirm & Delivery",
        step5Desc: "Confirm your order with our team and receive delivery all over Saudi Arabia.",
        buyCtaBtn: "CONTACT US ON WHATSAPP TO BUY",
        buyCtaBtnShort: "Contact Us on WhatsApp",
        aboutSubtitle: "Welcome To Our Showroom",
        aboutText: "AL RAYYAN FURNITURE 2 (مفروشات الريان 2) provides quality furniture and home furnishing products for beautiful and comfortable homes. Our showroom offers a wide range of furniture including sofas, chairs, tables, beds, curtains, upholstery and more.",
        ownerTitle: "Owner:",
        ownerLabel: "Showroom Owner",
        feat1: "Premium Craftsmanship & Fabrics",
        feat2: "Delivery Available All Over Saudi Arabia 🇸🇦",
        feat3: "Custom Upholstery & Curtains Service",
        feat4: "Competitive Prices & Dedicated Support",
        locSubtitle: "Visit Our Showroom",
        locTitle: "OUR LOCATION",
        locCoordTitle: "Coordinates:",
        contactWaTitle: "WhatsApp:",
        deliveryTitle: "Delivery:",
        deliveryDesc: "Delivery Available All Over Saudi Arabia",
        getDirections: "Get Directions",
        openMap: "Open Map Link",
        contactSubtitle: "Get In Touch With Us",
        contactTitle: "CONTACT US",
        contactOwnerLabel: "Showroom Owner",
        contactWaLabel: "WhatsApp Contact",
        chatWaBtn: "WhatsApp",
        contactEmailLabel: "Email Address",
        emailBtn: "Email Us",
        contactLocLabel: "Showroom Coordinates",
        inquiryTitle: "Send Quick WhatsApp Inquiry",
        inquirySub: "Fill out your request and click send to initiate an instant WhatsApp chat with our sales team.",
        formName: "Your Name",
        formInterest: "Product / Service Interest",
        optSofa: "Sofa Set / Living Room",
        optBed: "Bedroom / Beds",
        optDining: "Dining Furniture",
        optDecor: "Curtains & Upholstery",
        optCustom: "Custom Order Inquiry",
        formMsg: "Your Message",
        formSubmit: "Send Inquiry via WhatsApp",
        floatingWaText: "Chat on WhatsApp",
        footerDesc: "Premium furniture, sofas, beds, dining sets, curtains, and custom upholstery in Saudi Arabia.",
        footerDelivery: "Delivery Available All Over Saudi Arabia 🇸🇦",
        footerQuickLinks: "Quick Links",
        footerContactTitle: "Contact Information",
        footerBuyTitle: "To Buy Any Product",
        footerBuyNotice: '"To Buy Any Product, Contact Us on WhatsApp."',
        managedBy: "Owner:",
        buyOnWaBtn: "Buy on WhatsApp"
    },
    ar: {
        deliveryText: "التوصيل متوفر لكافة أنحاء المملكة العربية السعودية 🇸🇦 | Delivery available all over Saudi Arabia",
        navHome: "الرئيسية",
        navCategories: "الأقسام",
        navProducts: "المنتجات",
        navAbout: "من نحن",
        navHowToBuy: "كيفية الشراء",
        navLocation: "الموقع",
        navContact: "اتصل بنا",
        headerWhatsApp: "تواصل معنا",
        heroBadge: "تشكيلة المعرض الفاخرة",
        heroTagline: '"أثاث عالي الجودة لبيتك الجميل"',
        heroSubtext: "نحول مساحات منزلك إلى تحفة معمارية بالرقي والراحة والجودة العالية.",
        exploreBtn: "استكشف الأثاث",
        heroWaBtn: "تواصل عبر الواتساب",
        statQuality: "جودة ممتازة",
        statDelivery: "توصيل لكافة أنحاء المملكة",
        statSupport: "دعم عبر الواتساب 24/7",
        catSubtitle: "تخصصات معرضنا",
        catTitle: "أقسام الأثاث",
        prodSubtitle: "مجموعة المعرض المميزة",
        prodTitle: "منتجاتنا الحصرية",
        filterAll: "جميع المنتجات",
        filterSofas: "أطقم كنب ومعيشة",
        filterBeds: "أسرة وغرف نوم",
        filterDining: "طاولات طعام",
        filterDecor: "ستائر وديكورات",
        buySubtitle: "خطوات طلب سهلة وسريعة",
        buyTitle: "كيفية الشراء",
        step1Title: "تصفح المجموعة",
        step1Desc: "استعرض تشكيلة الأثاث عبر موقعنا الإلكتروني أو بالمعرض.",
        step2Title: "اختر المنتج",
        step2Desc: "اختر المنتج المناسب الذي يعجبك ويتناسق مع ديكور بيتك.",
        step3Title: "اضغط على الشراء عبر الواتساب",
        step3Desc: 'اضغط زر "الشراء عبر الواتساب" الموجود في بطاقة المنتج.',
        step4Title: "استفسر عن السعر والتفاصيل",
        step4Desc: "تواصل معنا عبر الواتساب لمعرفة السعر، المقاسات والتوافر.",
        step5Title: "تأكيد الطلب والتوصيل",
        step5Desc: "أكد طلبك مع فريقنا ليصلك أثاثك لكافة أنحاء المملكة العربية السعودية.",
        buyCtaBtn: "تواصل معنا عبر الواتساب للشراء",
        buyCtaBtnShort: "تواصل معنا عبر الواتساب",
        aboutSubtitle: "مرحباً بكم في معرضنا",
        aboutText: "تقدم مفروشات الريان 2 (AL RAYYAN FURNITURE 2) أثاثاً ومفروشات عالية الجودة لمنازل جميلة ومريحة. يقدم معرضنا مجموعة واسعة من الأثاث تشمل الكنب، الكراسي، الطاولات، الأسرة، الستائر، والتنجيد وغيرها الكثير.",
        ownerTitle: "المالك:",
        ownerLabel: "مالك المعرض",
        feat1: "صناعة وأقمشة فائقة الجودة",
        feat2: "التوصيل متوفر لكافة أنحاء المملكة العربية السعودية 🇸🇦",
        feat3: "خدمة تفصيل الستائر وتنجيد الأثاث",
        feat4: "أسعار منافسة ودعم مستمر للعملاء",
        locSubtitle: "تفصلوا بزيارة معرضنا",
        locTitle: "موقعنا",
        locCoordTitle: "الإحداثيات:",
        contactWaTitle: "الواتساب:",
        deliveryTitle: "التوصيل:",
        deliveryDesc: "التوصيل متوفر لكافة أنحاء المملكة العربية السعودية",
        getDirections: "احصل على الاتجاهات",
        openMap: "فتح رابط الخريطة",
        contactSubtitle: "تواصل معنا دائماً",
        contactTitle: "اتصل بنا",
        contactOwnerLabel: "مالك المعرض",
        contactWaLabel: "رقم الواتساب",
        chatWaBtn: "الواتساب",
        contactEmailLabel: "البريد الإلكتروني",
        emailBtn: "أرسل إيميل",
        contactLocLabel: "إحداثيات المعرض",
        inquiryTitle: "إرسال استفسار سريع عبر الواتساب",
        inquirySub: "اكتب بياناتك واضغط إرسال لبدء محادثة مباشرة عبر الواتساب مع فريق المبيعات.",
        formName: "اسمك الكريم",
        formInterest: "المنتج / الخدمة المطلوبة",
        optSofa: "أطقم كنب / غرف معيشة",
        optBed: "أسرة / غرف نوم",
        optDining: "طاولات ومفروشات طعام",
        optDecor: "ستائر وتنجيد أثاث",
        optCustom: "استفسار عن طلب خاص",
        formMsg: "رسالتك",
        formSubmit: "إرسال الاستفسار عبر الواتساب",
        floatingWaText: "محادثة عبر الواتساب",
        footerDesc: "أثاث ومفروشات فاخرة، كنب، أسرة، طاولات طعام، ستائر وتنجيد في المملكة العربية السعودية.",
        footerDelivery: "التوصيل متوفر لكافة أنحاء المملكة العربية السعودية 🇸🇦",
        footerQuickLinks: "روابط سريعة",
        footerContactTitle: "معلومات الاتصال",
        footerBuyTitle: "لشراء أي منتج",
        footerBuyNotice: '"لشراء أي منتج، تواصل معنا عبر الواتساب."',
        managedBy: "المالك:",
        buyOnWaBtn: "الشراء عبر الواتساب"
    }
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    // Set initial language from storage or default
    applyLanguage(currentLang);

    // Setup Mobile Navigation Toggle
    setupMobileNav();

    // Render Categories & Products
    renderCategories();
    renderProducts('all');

    // Setup Category Filter Buttons
    setupFilterButtons();

    // Setup Language Button Handler
    document.getElementById("langToggle").addEventListener("click", () => {
        currentLang = currentLang === "en" ? "ar" : "en";
        localStorage.setItem('alrayyan_lang', currentLang);
        applyLanguage(currentLang);
    });

    // Update Footer Year
    document.getElementById("currentYear").textContent = new Date().getFullYear();
});

// Switch Language and Direction Dynamically
function applyLanguage(lang) {
    const htmlEl = document.documentElement;
    htmlEl.setAttribute("lang", lang);
    htmlEl.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    // Update active class on lang toggle buttons
    const langBtn = document.getElementById("langToggle");
    const enSpan = langBtn.querySelector(".lang-en");
    const arSpan = langBtn.querySelector(".lang-ar");
    
    if (lang === "ar") {
        enSpan.classList.remove("active");
        arSpan.classList.add("active");
    } else {
        arSpan.classList.remove("active");
        enSpan.classList.add("active");
    }

    // Translate all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Re-render categories & products to match language strings
    renderCategories();
    
    // Find active filter
    const activeFilterBtn = document.querySelector(".filter-btn.active");
    const activeCategory = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";
    renderProducts(activeCategory);
}

// Render 12 Categories Cards
function renderCategories() {
    const container = document.getElementById("categoriesGrid");
    if (!container) return;

    container.innerHTML = categoriesData.map(cat => {
        const title = currentLang === 'ar' ? cat.nameAr : cat.nameEn;
        const subTitle = currentLang === 'ar' ? cat.nameEn : cat.nameAr;
        return `
            <a href="#products" onclick="filterByCategory('${cat.id}')" class="category-card">
                <div class="cat-img-wrapper">
                    <img src="${cat.image}" alt="${title}" class="cat-img" loading="lazy" onerror="this.src='IMAGES/images (21).jpg'">
                    <div class="cat-overlay"></div>
                </div>
                <div class="cat-content">
                    <h3 class="cat-title-en">${title}</h3>
                    <p class="cat-title-ar">${subTitle}</p>
                </div>
            </a>
        `;
    }).join("");
}

// Render Products with WhatsApp Buy Button
function renderProducts(filterCategory = 'all') {
    const container = document.getElementById("productsGrid");
    if (!container) return;

    const filtered = filterCategory === 'all' 
        ? productsData 
        : productsData.filter(p => p.category === filterCategory || (filterCategory === 'sofas' && p.category === 'sofas') || (filterCategory === 'beds' && p.category === 'beds') || (filterCategory === 'dining' && p.category === 'dining') || (filterCategory === 'decor' && p.category === 'decor'));

    container.innerHTML = filtered.map(prod => {
        const name = currentLang === 'ar' ? prod.nameAr : prod.nameEn;
        const desc = currentLang === 'ar' ? prod.descAr : prod.descEn;
        const price = currentLang === 'ar' ? prod.priceAr : prod.priceEn;
        const badge = currentLang === 'ar' ? prod.badgeAr : prod.badgeEn;
        const buyBtnText = currentLang === 'ar' ? "الشراء عبر الواتساب" : "Buy on WhatsApp";

        // Pre-filled WhatsApp message
        const waMessage = encodeURIComponent(
            `Hello AL RAYYAN FURNITURE 2, I am interested in buying [${name}]. Please provide me with more details and price.`
        );
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

        return `
            <div class="product-card" data-category="${prod.category}">
                <div class="prod-img-wrapper" onclick="openProductModal(${prod.id})">
                    <img src="${prod.image}" alt="${name}" class="prod-img" loading="lazy" onerror="this.src='IMAGES/images (21).jpg'">
                    <span class="prod-badge">${badge}</span>
                </div>
                <div class="prod-info">
                    <h3 class="prod-name-en">${name}</h3>
                    <p class="prod-desc">${desc}</p>
                    <div class="prod-footer">
                        <span class="prod-price">${price}</span>
                        <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp sm-btn">
                            <i class="fa-brands fa-whatsapp"></i>
                            <span>${buyBtnText}</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

// Category Filter Click Handler
function setupFilterButtons() {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filter = btn.getAttribute("data-filter");
            renderProducts(filter);
        });
    });
}

function filterByCategory(catId) {
    const filterBtn = document.querySelector(`.filter-btn[data-filter="${catId}"]`) || document.querySelector('.filter-btn[data-filter="all"]');
    if (filterBtn) {
        filterBtn.click();
    }
}

// Mobile Hamburger Menu Navigation
function setupMobileNav() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });
}

// Quick WhatsApp Form Inquiry Handler
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("custName").value.trim();
    const interest = document.getElementById("custInterest").value;
    const msg = document.getElementById("custMsg").value.trim();

    if (!name || !msg) {
        alert(currentLang === 'ar' ? "يرجى تعبئة الحقول المطلوبة" : "Please fill out all required fields.");
        return;
    }

    const text = `Hello AL RAYYAN FURNITURE 2,\n\nName: ${name}\nInterest: ${interest}\nMessage: ${msg}\n\nI want more details and pricing.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

// Lightbox Modal for Product Detail View
function openProductModal(productId) {
    const prod = productsData.find(p => p.id === productId);
    if (!prod) return;

    const modal = document.getElementById("productModal");
    const modalBody = document.getElementById("modalBody");
    const name = currentLang === 'ar' ? prod.nameAr : prod.nameEn;
    const desc = currentLang === 'ar' ? prod.descAr : prod.descEn;
    const price = currentLang === 'ar' ? prod.priceAr : prod.priceEn;
    const buyBtnText = currentLang === 'ar' ? "الشراء عبر الواتساب" : "Buy on WhatsApp";

    const waMessage = encodeURIComponent(
        `Hello AL RAYYAN FURNITURE 2, I am interested in buying [${name}]. Please provide me with more details and price.`
    );
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

    modalBody.innerHTML = `
        <div class="modal-body-grid">
            <div class="modal-img-wrapper">
                <img src="${prod.image}" alt="${name}" class="modal-img">
            </div>
            <div class="modal-info">
                <span class="prod-badge">${prod.badgeEn}</span>
                <h2 style="font-family: var(--font-heading); margin: 12px 0; color: var(--charcoal-dark);">${name}</h2>
                <p style="color: var(--text-muted); margin-bottom: 20px;">${desc}</p>
                <div style="font-weight: 700; font-size: 1.2rem; color: var(--brown-dark); margin-bottom: 24px;">${price}</div>
                <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp" style="align-self: flex-start;">
                    <i class="fa-brands fa-whatsapp"></i>
                    <span>${buyBtnText}</span>
                </a>
            </div>
        </div>
    `;

    modal.classList.add("active");
}

function closeModal() {
    const modal = document.getElementById("productModal");
    modal.classList.remove("active");
}
