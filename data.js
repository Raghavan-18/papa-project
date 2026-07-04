const schemes = {
  farmers: [
    {
      name: "PM-KISAN",
      category: "Farmer Support",
      description: "Provides ₹6000 yearly financial assistance to eligible farmer families in three installments.",
      benefits: [
        "₹6000 yearly financial support",
        "Direct bank transfer",
        "Support for small farmers"
      ],
      eligibility: [
        "Indian citizen farmer",
        "Small and marginal farmers",
        "Landholding farmer families"
      ],
      documents: [
        "Aadhaar Card",
        "Bank Account",
        "Land Records",
        "Mobile Number"
      ],
      website: "https://pmkisan.gov.in/"
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana",
      category: "Crop Insurance",
      description: "Crop insurance scheme protecting farmers against natural disasters and crop loss.",
      benefits: [
        "Crop loss compensation",
        "Natural disaster protection",
        "Pest and disease coverage"
      ],
      eligibility: [
        "Farmers growing notified crops",
        "Loanee farmers",
        "Non-loanee farmers"
      ],
      documents: [
        "Aadhaar Card",
        "Bank Passbook",
        "Land Details"
      ],
      website: "https://pmfby.gov.in/"
    },
    {
      name: "PM Kisan Maandhan Yojana",
      category: "Farmer Pension",
      description: "Pension scheme for small and marginal farmers after 60 years.",
      benefits: [
        "₹3000 monthly pension",
        "Social security support",
        "Family pension benefits"
      ],
      eligibility: [
        "Farmers aged 18-40",
        "Small farmers",
        "Up to 2 hectares landholding"
      ],
      documents: [
        "Aadhaar Card",
        "Bank Account",
        "Land Records"
      ],
      website: "https://maandhan.in/"
    },
    {
      name: "Soil Health Card Scheme",
      category: "Agriculture",
      description: "Provides soil nutrient analysis and fertilizer recommendations.",
      benefits: [
        "Free soil testing",
        "Improved crop productivity",
        "Scientific fertilizer usage"
      ],
      eligibility: [
        "All farmers"
      ],
      documents: [
        "Aadhaar Card",
        "Land Information"
      ],
      website: "https://soilhealth.dac.gov.in/"
    },
    {
      name: "Kisan Credit Card",
      category: "Agricultural Loan",
      description: "Provides low-interest agricultural loans for farming activities.",
      benefits: [
        "Low-interest loans",
        "Flexible repayment",
        "Credit support"
      ],
      eligibility: [
        "Farmers",
        "Animal husbandry farmers",
        "Fishery farmers"
      ],
      documents: [
        "Aadhaar Card",
        "PAN Card",
        "Land Records"
      ],
      website: "https://www.myscheme.gov.in/"
    }
  ],
  students: [
    {
      name: "National Scholarship Portal",
      category: "Scholarship",
      description: "Centralized platform for various student scholarships.",
      benefits: [
        "Financial assistance",
        "Easy online application",
        "Direct benefit transfer"
      ],
      eligibility: [
        "School and college students",
        "Eligible income category"
      ],
      documents: [
        "Aadhaar Card",
        "Income Certificate",
        "Mark Sheets"
      ],
      website: "https://scholarships.gov.in/"
    },
    {
      name: "PM YASASVI Scheme",
      category: "Education",
      description: "Scholarship scheme for OBC, EBC, and DNT students.",
      benefits: [
        "Scholarship support",
        "Education encouragement"
      ],
      eligibility: [
        "OBC/EBC students",
        "Eligible income criteria"
      ],
      documents: [
        "Community Certificate",
        "Income Certificate"
      ],
      website: "https://yet.nta.ac.in/"
    },
    {
      name: "AICTE Pragati Scholarship",
      category: "Girls Education",
      description: "Scholarship for girl students pursuing technical education.",
      benefits: [
        "Financial support",
        "Encourages girls in technology"
      ],
      eligibility: [
        "Girl students",
        "Technical education students"
      ],
      documents: [
        "College ID",
        "Bank Account"
      ],
      website: "https://www.aicte-india.org/"
    },
    {
      name: "Pudhumai Penn Scheme",
      category: "Tamil Nadu Education",
      description: "Monthly financial assistance for girl students.",
      benefits: [
        "₹1000 monthly support",
        "Higher education encouragement"
      ],
      eligibility: [
        "Government school girls",
        "Higher education students"
      ],
      documents: [
        "Aadhaar Card",
        "College ID"
      ],
      website: "https://www.tn.gov.in/"
    },
    {
      name: "Free Laptop Scheme",
      category: "Digital Education",
      description: "Provides free laptops for eligible students.",
      benefits: [
        "Free laptop",
        "Digital learning support"
      ],
      eligibility: [
        "Government school students"
      ],
      documents: [
        "School ID",
        "Mark Sheet"
      ],
      website: "https://www.tn.gov.in/"
    }
  ],
  women: [
    {
      name: "Beti Bachao Beti Padhao",
      category: "Women Welfare",
      description: "Supports girl child education and protection.",
      benefits: [
        "Girl child welfare",
        "Education awareness"
      ],
      eligibility: [
        "Girl children",
        "Families with girl children"
      ],
      documents: [
        "Birth Certificate",
        "Aadhaar Card"
      ],
      website: "https://wcd.nic.in/"
    },
    {
      name: "PM Matru Vandana Yojana",
      category: "Maternity",
      description: "Financial assistance for pregnant women.",
      benefits: [
        "Maternity benefits",
        "Nutritional support"
      ],
      eligibility: [
        "Pregnant women",
        "First childbirth"
      ],
      documents: [
        "Aadhaar Card",
        "Medical Certificate"
      ],
      website: "https://pmmvy.wcd.gov.in/"
    },
    {
      name: "Mahila Samman Savings Certificate",
      category: "Savings",
      description: "Savings scheme for women investors.",
      benefits: [
        "Safe savings",
        "High interest returns"
      ],
      eligibility: [
        "Women and girls"
      ],
      documents: [
        "Aadhaar Card",
        "PAN Card"
      ],
      website: "https://www.indiapost.gov.in/"
    },
    {
      name: "Kalaignar Magalir Urimai Thittam",
      category: "Tamil Nadu Women Welfare",
      description: "Monthly financial support for eligible women.",
      benefits: [
        "₹1000 monthly assistance"
      ],
      eligibility: [
        "Eligible women family heads"
      ],
      documents: [
        "Aadhaar Card",
        "Family Card"
      ],
      website: "https://www.tn.gov.in/"
    },
    {
      name: "Free Bus Travel Scheme",
      category: "Transport",
      description: "Free public bus travel for women in Tamil Nadu.",
      benefits: [
        "Free bus travel",
        "Financial savings"
      ],
      eligibility: [
        "Women passengers"
      ],
      documents: [
        "Government ID"
      ],
      website: "https://www.tn.gov.in/"
    }
  ],
  healthcare: [
    {
      name: "Ayushman Bharat",
      category: "Health Insurance",
      description: "Health insurance scheme for low-income families.",
      benefits: [
        "Cashless treatment",
        "Hospital coverage"
      ],
      eligibility: [
        "Economically weaker families"
      ],
      documents: [
        "Aadhaar Card",
        "Family ID"
      ],
      website: "https://pmjay.gov.in/"
    },
    {
      name: "PM Jan Arogya Yojana",
      category: "Healthcare",
      description: "Provides free medical treatment benefits.",
      benefits: [
        "Medical insurance",
        "Free treatment"
      ],
      eligibility: [
        "Eligible families"
      ],
      documents: [
        "Aadhaar Card",
        "Ration Card"
      ],
      website: "https://pmjay.gov.in/"
    },
    {
      name: "Jan Aushadhi Scheme",
      category: "Medicines",
      description: "Affordable generic medicines through Jan Aushadhi Kendras.",
      benefits: [
        "Low-cost medicines",
        "Healthcare affordability"
      ],
      eligibility: [
        "All citizens"
      ],
      documents: [
        "Prescription"
      ],
      website: "https://janaushadhi.gov.in/"
    },
    {
      name: "CM Comprehensive Health Insurance Scheme",
      category: "Tamil Nadu Healthcare",
      description: "Free medical treatment for eligible Tamil Nadu families.",
      benefits: [
        "Free surgeries",
        "Medical insurance coverage"
      ],
      eligibility: [
        "Eligible TN families"
      ],
      documents: [
        "Aadhaar Card",
        "Income Certificate"
      ],
      website: "https://www.cmchistn.com/"
    },
    {
      name: "Makkalai Thedi Maruthuvam",
      category: "Home Healthcare",
      description: "Doorstep healthcare services in Tamil Nadu.",
      benefits: [
        "Healthcare at home",
        "Regular health monitoring"
      ],
      eligibility: [
        "Senior citizens",
        "Patients needing care"
      ],
      documents: [
        "Health Records"
      ],
      website: "https://www.tn.gov.in/"
    }
  ],
  environment: [
    {
      name: "Swachh Bharat Mission",
      category: "Cleanliness",
      description: "National cleanliness and sanitation mission.",
      benefits: [
        "Improved sanitation",
        "Cleaner environment"
      ],
      eligibility: [
        "All citizens"
      ],
      documents: [
        "Government ID"
      ],
      website: "https://swachhbharatmission.gov.in/"
    },
    {
      name: "Green India Mission",
      category: "Environment",
      description: "Afforestation and climate change mitigation initiative.",
      benefits: [
        "Forest restoration",
        "Climate protection"
      ],
      eligibility: [
        "State agencies",
        "Communities"
      ],
      documents: [
        "Project Proposal"
      ],
      website: "https://moef.gov.in/"
    },
    {
      name: "PM Kusum Scheme",
      category: "Solar Energy",
      description: "Solar energy support scheme for farmers.",
      benefits: [
        "Solar pump subsidy",
        "Renewable energy support"
      ],
      eligibility: [
        "Farmers"
      ],
      documents: [
        "Aadhaar Card",
        "Land Documents"
      ],
      website: "https://pmkusum.mnre.gov.in/"
    },
    {
      name: "Rainwater Harvesting Scheme",
      category: "Water Conservation",
      description: "Promotes rainwater harvesting and water conservation.",
      benefits: [
        "Water conservation",
        "Groundwater recharge"
      ],
      eligibility: [
        "Home owners",
        "Institutions"
      ],
      documents: [
        "Building Documents"
      ],
      website: "https://www.tn.gov.in/"
    },
    {
      name: "Tamil Nadu Green Mission",
      category: "Environment",
      description: "Tree plantation and green environment initiative.",
      benefits: [
        "Tree plantation",
        "Environmental protection"
      ],
      eligibility: [
        "Citizens",
        "Organizations"
      ],
      documents: [
        "Government ID"
      ],
      website: "https://www.tn.gov.in/"
    }
  ]
};

// Transform the schemes object into the flat array expected by results.js
const schemesData = [];
let idCounter = 1;

for (const group in schemes) {
    let groupName = "";
    if (group === "farmers") groupName = "Farmer";
    else if (group === "students") groupName = "Student";
    else if (group === "women") groupName = "Women";
    else if (group === "healthcare") groupName = "Healthcare";
    else if (group === "environment") groupName = "Environment";
    else groupName = group;

    schemes[group].forEach(scheme => {
        // Generate a random compatibility score between 75 and 98 for visual display
        const randomScore = Math.floor(Math.random() * 24) + 75;
        
        schemesData.push({
            id: idCounter++,
            title: scheme.name,
            category: groupName, // matches existing category filters
            subCategory: scheme.category, // e.g. 'Farmer Support'
            description: scheme.description,
            eligibility: randomScore,
            benefits: scheme.benefits,
            documents: scheme.documents,
            eligibilityCriteria: scheme.eligibility,
            deadline: "Ongoing",
            website: scheme.website
        });
    });
}

const dashboardStats = {
    totalUsers: "1,24,500+",
    totalSchemes: "450+",
    activeApplications: "45,200",
    successRate: "92%"
};

const chatbotResponses = {
    greetings: ["Hello! I am your AI assistant. How can I help you today?", "Hi there! Looking for government schemes?"],
    farmer: "You are eligible for 3 agricultural support schemes including PM Kisan and Crop Insurance.",
    student: "Based on your profile, you can apply for 5 different educational scholarships.",
    default: "I can help you find eligibility for various schemes. Please try asking about specific categories like Farmer, Student, or Healthcare."
};

// Expose to window for module scripts
window.schemesData = schemesData;
window.chatbotResponses = chatbotResponses;
window.dashboardStats = dashboardStats;
