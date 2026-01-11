import { Request, Commitment, Transaction, Connection, Review } from '../types/profile';

export const NGOS = [
    {
        "name": "Child Rights and You (CRY)",
        "bio": "Ensuring happy, healthy and creative childhoods.",
        "location": "Mumbai, MH",
        "metadata": {
            "type": "Child Welfare", "verified": true, "reg_no": "E-1234 (BOM)", "beneficiaries": "1.2M children",
            "avatar": "/logos/cry.png",
            "cover_image": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
        },
        "posts": [
            {
                "content": "Urgent: 500 Winter Jackets needed 🧥 for children in our northern centers. Temperatures are dropping fast! ❄️",
                "meta": { "items": ["Jackets"], "quantity": "500 Units", "deadline": "2 Days", "requirements": "New/Good Condition", "logistics": "Pickup Needed", "category": "Clothes", "urgency": "Critical" }
            },
            {
                "content": "Need 200 School Kits 🎒 (Notebooks, Pens, Bags) for the upcoming academic year. Help us educate the future! ✏️",
                "meta": { "items": ["School Kits"], "quantity": "200 Kits", "deadline": "15 Days", "requirements": "Standard Set", "logistics": "Drop-off", "category": "Education", "urgency": "Medium" }
            },
            {
                "content": "Looking for nutritional supplements 🥛 for 50 malnourished infants in our care. Critical need! 🆘",
                "meta": { "items": ["Supplements"], "quantity": "5 Packs", "deadline": "Immediate", "requirements": "Sealed/Fresh", "logistics": "Expedited", "category": "Food", "urgency": "Critical" }
            }
        ]
    },
    {
        "name": "The Akanksha Foundation",
        "bio": "High-quality education for children from low-income communities.",
        "location": "Mumbai / Pune",
        "metadata": {
            "type": "Education", "verified": true, "reg_no": "U80301MH2007NPL175736", "beneficiaries": "14,000 students",
            "avatar": "/logos/akanksha.png",
            "cover_image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop"
        },
        "posts": [
            {
                "content": "We need 50 Tablets 📱 for our digital literacy program. Bridging the digital divide for slum children! 💻",
                "meta": { "items": ["Tablets"], "quantity": "50 Units", "deadline": "10 Days", "requirements": "Functional", "logistics": "Fragile", "category": "Education", "urgency": "High" }
            },
            {
                "content": "Requesting volunteers for weekend math classes ➗. Make a difference with your time! 🕐",
                "meta": { "items": ["Volunteers"], "quantity": "10 Tutors", "deadline": "Flexible", "requirements": "Math Skills", "logistics": "Virtual/In-person", "category": "Volunteering", "urgency": "Low" }
            }
        ]
    },
    {
        "name": "Pratham",
        "bio": "Improving literacy rates and quality of education across India.",
        "location": "Mumbai, MH",
        "metadata": {
            "type": "Education", "verified": true, "reg_no": "F-12345", "beneficiaries": "5M+",
            "avatar": "/logos/pratham.png",
            "cover_image": "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop"
        },
        "posts": [
            {
                "content": "Library drive! 📚 We need storybooks in Marathi and Hindi for our community libraries. 📖",
                "meta": { "items": ["Books"], "quantity": "1000 Books", "deadline": "30 Days", "requirements": "Local Language", "logistics": "Bulk Pickup", "category": "Education", "urgency": "Medium" }
            },
            {
                "content": "Need 100 Projectors 📽️ for smart classrooms in rural schools.",
                "meta": { "items": ["Projectors"], "quantity": "100 Units", "deadline": "20 Days", "requirements": "HDMI Compatible", "logistics": "Fragile Handling", "category": "Electronics", "urgency": "High" }
            }
        ]
    },
    {
        "name": "United Way Mumbai",
        "bio": "Community impact, health, education, and environmental safety.",
        "location": "Mumbai, MH",
        "metadata": {
            "type": "Community Development", "verified": true, "reg_no": "E-23456", "beneficiaries": "500k+",
            "avatar": "/logos/unitedway.png",
            "cover_image": "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=1000&auto=format&fit=crop"
        },
        "posts": [
            {
                "content": "Beach Cleanup Drive 🏖️ this Sunday! We need gloves 🧤, masks 😷, and garbage bags 🗑️.",
                "meta": { "items": ["Cleanup Kit"], "quantity": "200 Sets", "deadline": "Target: Sunday", "requirements": "Eco-friendly", "logistics": "On-site", "category": "Environment", "urgency": "High" }
            },
            {
                "content": "Health Camp supplies needed: Glucometers, BP Monitors 🩺, and First Aid Kits 🩹.",
                "meta": { "items": ["Medical Kits"], "quantity": "50 Kits", "deadline": "Yesterday", "requirements": "Certified", "logistics": "Pickup", "category": "Health", "urgency": "Critical" }
            }
        ]
    },
    {
        "name": "Swades Foundation",
        "bio": "Rural empowerment through health, education, and water sanitation.",
        "location": "Raigad / Mumbai",
        "metadata": {
            "type": "Rural Development", "verified": true, "reg_no": "E-34567", "beneficiaries": "2k Villages",
            "avatar": "/logos/swades.png",
            "cover_image": "https://images.unsplash.com/photo-1621981386829-9b788a846c77?q=80&w=1000&auto=format&fit=crop"
        },
        "posts": [
            {
                "content": "Water filters needed 💧 for 200 homes in Raigad. Clean water is a basic right! 🚰",
                "meta": { "items": ["Water Filters"], "quantity": "200 Units", "deadline": "1 Week", "requirements": "Gravity Based", "logistics": "Heavy Transport", "category": "Water", "urgency": "High" }
            },
            {
                "content": "Solar lamps ☀️ requested for rigorous study hours in load-shedding areas. 💡",
                "meta": { "items": ["Solar Lamps"], "quantity": "500 Units", "deadline": "1 Month", "requirements": "Durable", "logistics": "Bulk", "category": "Electronics", "urgency": "Medium" }
            }
        ]
    },
    {
        "name": "SNEHA",
        "bio": "Health and nutrition for women and children in urban slums.",
        "location": "Mumbai, MH",
        "metadata": {
            "type": "Health & Nutrition", "verified": true, "reg_no": "E-45678", "beneficiaries": "300k women",
            "avatar": "/logos/sneha.png",
            "cover_image": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1000&auto=format&fit=crop"
        },
        "posts": [
            {
                "content": "Iron and Folic Acid supplements needed 💊 for expectant mothers in Dharavi.",
                "meta": { "items": ["Medicine"], "quantity": "5000 Strips", "deadline": "Urgent", "requirements": "Pharma Grade", "logistics": "Cold Chain", "category": "Health", "urgency": "Critical" }
            },
            {
                "content": "Baby kits: Diapers 👶, Baby Oil, and Towels needed for our maternity center.",
                "meta": { "items": ["Baby Kits"], "quantity": "100 Kits", "deadline": "1 Week", "requirements": "Hypoallergenic", "logistics": "Drop-off", "category": "Health", "urgency": "High" }
            }
        ]
    },
    {
        "name": "Annamrita Foundation",
        "bio": "Providing hygienic mid-day meals to school-going children.",
        "location": "Mumbai, MH",
        "metadata": {
            "type": "Food Relief", "verified": true, "reg_no": "E-67890", "beneficiaries": "1.2M meals/day",
            "avatar": "/logos/annamrita.png",
            "cover_image": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
        },
        "posts": [
            {
                "content": "Rice and Dal donations required! 🍚 We are running low on stock for next week's meals.",
                "meta": { "items": ["Grains", "Pulses"], "quantity": "1000 Kgs", "deadline": "2 Days", "requirements": "Grade A", "logistics": "Truck Needed", "category": "Food", "urgency": "Critical" }
            },
            {
                "content": "We need a new commercial refrigerator ❄️ for our central kitchen storage.",
                "meta": { "items": ["Refrigerator"], "quantity": "1 Unit", "deadline": "10 Days", "requirements": "500L Capacity", "logistics": "Installation Req", "category": "Equipment", "urgency": "High" }
            }
        ]
    },
    {
        "name": "St. Jude India Childcare Centres",
        "bio": "Holistic support and housing for children undergoing cancer treatment.",
        "location": "Mumbai, MH",
        "metadata": { "type": "Childcare/Health", "verified": true, "reg_no": "E-90123", "beneficiaries": "500 families", "avatar": "/logos/stjude.png", "cover_image": "https://images.unsplash.com/photo-1502086223501-636b0f027376?q=80&w=1000&auto=format&fit=crop" },
        "posts": [
            {
                "content": "Nutritional supplements (Ensure/Pediasure) 🥛 needed for children on chemotherapy.",
                "meta": { "items": ["Supplements"], "quantity": "200 Cans", "deadline": "5 Days", "requirements": "Sealed", "logistics": "Pickup", "category": "Health", "urgency": "High" }
            },
            {
                "content": "Hygiene kits: Toothpaste 🪥, Soap 🧼, and Sanitizers needed for infection control.",
                "meta": { "items": ["Hygiene Kits"], "quantity": "300 Kits", "deadline": "1 Week", "requirements": "Standard", "logistics": "Bulk Drop", "category": "Health", "urgency": "Medium" }
            }
        ]
    },
    {
        "name": "Magic Bus India",
        "bio": "Life skills and livelihood opportunities for youth in poverty.",
        "location": "Navi Mumbai, MH",
        "metadata": { "type": "Youth Development", "verified": true, "reg_no": "E-01234", "beneficiaries": "400k youth", "avatar": "/logos/magicbus.png", "cover_image": "https://images.unsplash.com/photo-1529390003868-fe08793b584d?q=80&w=1000&auto=format&fit=crop" },
        "posts": [
            {
                "content": "Sports equipment needed! ⚽ Footballs, Volleyballs, and Cones for our activity sessions.",
                "meta": { "items": ["Sports Gear"], "quantity": "50 Sets", "deadline": "2 Weeks", "requirements": "Durable/Outdoor", "logistics": "Pickup", "category": "Sports", "urgency": "Medium" }
            }
        ]
    },
    {
        "name": "Goonj",
        "bio": "Disaster relief and community development using urban surplus.",
        "location": "Mumbai (Office)",
        "metadata": { "type": "Disaster Relief", "verified": true, "reg_no": "E-78906", "beneficiaries": "Pan India", "avatar": "/logos/goonj.png", "cover_image": "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop" },
        "posts": [
            {
                "content": "URGENT: Flood relief material needed! 🌊 Tarpaulins, Dry Food, medicines.",
                "meta": { "items": ["Relief Kits"], "quantity": "5000 Kits", "deadline": "24 Hours", "requirements": "Waterproof", "logistics": "Air Lift / Truck", "category": "Disaster Relief", "urgency": "Critical" }
            },
            {
                "content": "Fabric scraps 🧵 needed for our 'My Pad' sanitary napkin initiative.",
                "meta": { "items": ["Fabric"], "quantity": "500 Kgs", "deadline": "Ongoing", "requirements": "Cotton", "logistics": "Regular Pickup", "category": "Health", "urgency": "High" }
            }
        ]
    },
    {
        "name": "Teach For India",
        "bio": "Building a movement of leaders to eliminate educational inequity.",
        "location": "Mumbai, MH",
        "metadata": { "type": "Education", "verified": true, "reg_no": "E-99900", "beneficiaries": "32k students", "avatar": "/logos/teachforindia.png", "cover_image": "https://images.unsplash.com/photo-1427504746086-64744bad9842?q=80&w=1000&auto=format&fit=crop" },
        "posts": [
            {
                "content": "Looking for 20 Fellow volunteers 👩‍🏫 to help with after-school remedial classes.",
                "meta": { "items": ["Volunteers"], "quantity": "20 Fellows", "deadline": "1 Month", "requirements": "Graduate", "logistics": "In-person", "category": "Education", "urgency": "Medium" }
            }
        ]
    },
    {
        "name": "HelpAge India",
        "bio": "Supporting the elderly and advocating for their rights.",
        "location": "Delhi / Pan India",
        "metadata": { "type": "Elderly Care", "verified": true, "reg_no": "E-10101", "beneficiaries": "2M+ elderly", "avatar": "/logos/helpage.png", "cover_image": "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=1000&auto=format&fit=crop" },
        "posts": [
            {
                "content": "Adult diapers and walking sticks 🦯 needed for our old age home in Delhi.",
                "meta": { "items": ["Elderly Care"], "quantity": "500 Sets", "deadline": "2 Weeks", "requirements": "Standard", "logistics": "Pickup", "category": "Health", "urgency": "High" }
            }
        ]
    },
    {
        "name": "GiveIndia",
        "bio": "India's largest donation platform and NGO network.",
        "location": "Bangalore, KA",
        "metadata": { "type": "Platform", "verified": true, "reg_no": "E-20202", "beneficiaries": "10M+", "avatar": "/logos/giveindia.png", "cover_image": "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000&auto=format&fit=crop" },
        "posts": [
            {
                "content": "Matching Grant Alert! 💰 We are matching 100% of donations made to Education NGOs this week.",
                "meta": { "items": ["Funds"], "quantity": "₹ 1 Crore", "deadline": "7 Days", "requirements": "Registered NGOs", "logistics": "Online", "category": "Funding", "urgency": "Medium" }
            }
        ]
    },
    {
        "name": "Save the Children India",
        "bio": "Protecting children from harm and providing education/health.",
        "location": "New Delhi / Mumbai",
        "metadata": { "type": "Child Rights", "verified": true, "reg_no": "E-30303", "beneficiaries": "1M+ children", "avatar": "/logos/savechildren.png", "cover_image": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop" },
        "posts": [
            {
                "content": "Warm blankets 🛌 needed for street children in Delhi winters.",
                "meta": { "items": ["Blankets"], "quantity": "1000 Units", "deadline": "Urgent", "requirements": "Woolen", "logistics": "Drop-off", "category": "Relief", "urgency": "Critical" }
            }
        ]
    },
    {
        "name": "Oxfam India",
        "bio": "Fighting inequality to end poverty and injustice.",
        "location": "New Delhi, Delhi",
        "metadata": { "type": "Human Rights", "verified": true, "reg_no": "E-40404", "beneficiaries": "700k+", "avatar": "/logos/oxfam.png", "cover_image": "https://images.unsplash.com/photo-1464695110811-dcf3903dc2f4?q=80&w=1000&auto=format&fit=crop" },
        "posts": [
            {
                "content": "Hygiene kits for women 🧼 in Bihar flood-hit areas.",
                "meta": { "items": ["Hygiene Kits"], "quantity": "2000 Units", "deadline": "3 Days", "requirements": "Standard", "logistics": "Transport Req", "category": "Relief", "urgency": "High" }
            }
        ]
    },
    {
        "name": "Care India",
        "bio": "Empowering women and girls from marginalized communities.",
        "location": "Patna, Bihar",
        "metadata": { "type": "Women Empowerment", "verified": true, "reg_no": "E-50505", "beneficiaries": "55M since 1950", "avatar": "/logos/care.png", "cover_image": "https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?q=80&w=1000&auto=format&fit=crop" },
        "posts": [
            {
                "content": "Sewing machines 🧵 for livelihood training center in rural Bihar.",
                "meta": { "items": ["Machines"], "quantity": "50 Units", "deadline": "30 Days", "requirements": "Manual", "logistics": "Bulk", "category": "Livelihood", "urgency": "Medium" }
            }
        ]
    },
    {
        "name": "The Nudge Foundation",
        "bio": "Alleviating poverty sustainably and scalably.",
        "location": "Bangalore, KA",
        "metadata": { "type": "Poverty Alleviation", "verified": true, "reg_no": "E-60606", "beneficiaries": "10M+", "avatar": "/logos/nudge.png", "cover_image": "https://images.unsplash.com/photo-1542601906990-24ccd08d7455?q=80&w=1000&auto=format&fit=crop" },
        "posts": [
            {
                "content": "Seeking mentors 👨‍💼 for our Gurukul program to guide youth.",
                "meta": { "items": ["Mentors"], "quantity": "50 Mentors", "deadline": "Apply by 30th", "requirements": "Professional", "logistics": "Virtual", "category": "Education", "urgency": "Medium" }
            }
        ]
    },
    {
        "name": "EdelGive Foundation",
        "bio": "Philanthropic arm of Edelweiss Group.",
        "location": "Mumbai, MH",
        "metadata": { "type": "Philanthropy", "verified": true, "reg_no": "E-70707", "beneficiaries": "Pan India", "avatar": "/logos/edelgive.png", "cover_image": "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1000&auto=format&fit=crop" },
        "posts": [
            {
                "content": "Funding opportunity! 💸 Grants available for NGOs working in Water & Sanitation.",
                "meta": { "items": ["Grants"], "quantity": "₹ 50 Lakhs", "deadline": "Applications Open", "requirements": "Proposal", "logistics": "Online", "category": "Funding", "urgency": "High" }
            }
        ]
    },
    {
        "name": "Dasra",
        "bio": "Strategic philanthropy foundation.",
        "location": "Mumbai, MH",
        "metadata": { "type": "Strategic Philanthropy", "verified": true, "reg_no": "E-80808", "beneficiaries": "100+ NGOs", "avatar": "/logos/dasra.png", "cover_image": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop" },
        "posts": [
            {
                "content": "Capacity building workshop 💡 for NGO leaders. Register now!",
                "meta": { "items": ["Training"], "quantity": "100 Seats", "deadline": "Next Week", "requirements": "Leadership", "logistics": "Mumbai", "category": "Training", "urgency": "Medium" }
            }
        ]
    },
    {
        "name": "Bhumi",
        "bio": " Volunteer based organization.",
        "location": "Chennai / Pan India",
        "metadata": { "type": "Volunteering", "verified": true, "reg_no": "E-90909", "beneficiaries": "25k children", "avatar": "/logos/bhumi.png", "cover_image": "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1000&auto=format&fit=crop" },
        "posts": [
            {
                "content": "Tree plantation drive! 🌳 Need 500 saplings and 100 volunteers.",
                "meta": { "items": ["Saplings", "Volunteers"], "quantity": "500 + 100", "deadline": "This Weekend", "requirements": "Outdoor", "logistics": "On-site", "category": "Environment", "urgency": "Medium" }
            }
        ]
    }
];

export const COMPANIES = [
    {
        name: "Marriott International",
        bio: "Leading luxury hotel chain committed to sustainability.",
        location: "New York, USA",
        post_content: "We have 100 sets of hotel-grade Bed Linens 🛏️ (Sheets, Towels) lightly used, available for donation.",
        meta: { "items": ["Linens"], "quantity": "100 Sets", "deadline": "Available Now", "requirements": "Self Pickup", "logistics": "Boxed", "category": "Donation", "urgency": "Medium", "avatar": "https://ui-avatars.com/api/?name=Marriott+International&background=A51C30&color=fff&size=128", "cover_image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop" },
        metadata: { "type": "Corporate" }
    },
    {
        name: "DHL Supply Chain",
        bio: "End-to-end logistics solutions.",
        location: "London, UK",
        post_content: "One 14ft Truck 🚚 available for free transport of relief materials from Mumbai to Pune this weekend.",
        meta: { "items": ["Truck"], "quantity": "1 Vehicle", "deadline": "This Weekend", "requirements": "Driver Included", "logistics": "Mumbai->Pune", "category": "Logistics", "urgency": "Medium", "avatar": "https://ui-avatars.com/api/?name=DHL+Supply&background=FFCC00&color=D40511&size=128", "cover_image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop" },
        metadata: { "type": "Corporate" }
    },
    {
        name: "Tata CSR",
        bio: "Community support division of Tata Group.",
        location: "Mumbai, India",
        post_content: "50 Refurbished Laptops 💻 available for digital literacy programs. Windows 10 installed.",
        meta: { "items": ["Laptops"], "quantity": "50 Units", "deadline": "Apply by 15th", "requirements": "NGO Verification", "logistics": "Pickup", "category": "Donation", "urgency": "High", "avatar": "https://ui-avatars.com/api/?name=Tata+CSR&background=4863A0&color=fff&size=128", "cover_image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop" },
        metadata: { "type": "Corporate" }
    },
    {
        name: "Reliance Foundation",
        bio: "Philanthropic arm of Reliance Industries.",
        location: "Mumbai, India",
        post_content: "Surplus Medical Supplies 💊 (Masks, Gloves, Basic Antibiotics) available from our health camps.",
        meta: { "items": ["Medical"], "quantity": "5 Cartons", "deadline": "Immediate", "requirements": "Licence Check", "logistics": "Cold Chain", "category": "Health", "urgency": "High", "avatar": "https://ui-avatars.com/api/?name=Reliance+Fdn&background=EE1C25&color=fff&size=128", "cover_image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop" },
        metadata: { "type": "Corporate" }
    },
    {
        name: "Zomato Feeding India",
        bio: "Hunger Hero.",
        location: "Gurgaon, India",
        post_content: "Ready to sponsor 1000 meals 🍛 for any orphanage in need. Connect with us!",
        meta: { "items": ["Meals"], "quantity": "1000 Meals", "deadline": "Anytime", "requirements": "Verified NGO", "logistics": "Credits", "category": "Funding", "urgency": "Medium", "avatar": "https://ui-avatars.com/api/?name=Zomato&background=CB202D&color=fff&size=128", "cover_image": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop" },
        metadata: { "type": "Corporate" }
    },
    {
        name: "Microsoft CSR",
        bio: "Empowering every person to achieve more.",
        location: "Hyderabad, India",
        post_content: "Offering 200 Cloud Credits ☁️ for NGOs to host their websites and databases securely.",
        meta: { "items": ["Cloud Credits"], "quantity": "$5000 Credits", "deadline": "Apply Now", "requirements": "Tech NGO", "logistics": "Online", "category": "Technology", "urgency": "Low", "avatar": "https://ui-avatars.com/api/?name=Microsoft&background=00A4EF&color=fff&size=128", "cover_image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop" },
        metadata: { "type": "Corporate" }
    },
    {
        name: "Amazon Logistics",
        bio: "Delivering smiles.",
        location: "Bangalore, India",
        post_content: "We have spare warehouse space 🏭 (2000 sqft) available for storage of relief materials.",
        meta: { "items": ["Storage"], "quantity": "2000 Sqft", "deadline": "1 Month", "requirements": "Non-perishable", "logistics": "Warehousing", "category": "Logistics", "urgency": "Medium", "avatar": "https://ui-avatars.com/api/?name=Amazon&background=FF9900&color=000&size=128", "cover_image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop" },
        metadata: { "type": "Corporate" }
    }
];

export const SAMPLE_REQUESTS: Request[] = [
    {
        id: 'req-1',
        content: "Urgent: 500 Winter Jackets needed 🧥 for children in our northern centers.",
        status: 'LIVE',
        createdAt: '2025-12-10T10:00:00Z',
        meta: {
            items: ["Jackets"],
            quantity: "500 Units",
            deadline: "2 Days",
            requirements: "New/Good Condition",
            logistics: "Pickup Needed",
            category: "Clothes",
            urgency: "Critical"
        }
    },
    {
        id: 'req-2',
        content: "Need 200 School Kits 🎒 (Notebooks, Pens, Bags) for the upcoming academic year.",
        status: 'PENDING',
        createdAt: '2025-11-15T09:30:00Z',
        meta: {
            items: ["School Kits"],
            quantity: "200 Kits",
            deadline: "15 Days",
            requirements: "Standard Set",
            logistics: "Drop-off",
            category: "Education",
            urgency: "Medium"
        }
    },
    {
        id: 'req-3',
        content: "Looking for nutritional supplements 🥛 for 50 malnourished infants in our care.",
        status: 'FULFILLED',
        createdAt: '2025-10-01T14:45:00Z',
        meta: {
            items: ["Supplements"],
            quantity: "5 Packs",
            deadline: "Immediate",
            requirements: "Sealed/Fresh",
            logistics: "Expedited",
            category: "Food",
            urgency: "Critical"
        }
    }
];

export const SAMPLE_COMMITMENTS: Commitment[] = [
    {
        id: 'com-1',
        title: "500 Winter Jackets Delivery",
        description: "Confirmed delivery of winter jackets via DHL Logistics.",
        status: 'IN_PROGRESS',
        ngoName: "Child Rights and You (CRY)",
        ngoId: "ngo-1",
        date: "2025-12-12",
        trackingId: "DHL-99887766",
        courierStatus: 'In Transit'
    },
    {
        id: 'com-2',
        title: "School Kits Sponsorship",
        description: "Sponsorship for 200 school kits.",
        status: 'COMPLETED',
        ngoName: "The Akanksha Foundation",
        ngoId: "ngo-2",
        date: "2025-11-20",
        courierStatus: 'Delivered'
    }
];

export const SAMPLE_TRANSACTIONS: Transaction[] = [
    {
        id: 'tx-101',
        amount: "₹ 50,000",
        recipientName: "Child Rights and You (CRY)",
        recipientId: "ngo-1",
        date: "2025-12-12",
        status: 'SUCCESS',
        type: 'DONATION'
    },
    {
        id: 'tx-102',
        amount: "₹ 25,000",
        recipientName: "Pratham",
        recipientId: "ngo-3",
        date: "2025-11-05",
        status: 'SUCCESS',
        type: 'DONATION'
    },
    {
        id: 'tx-103',
        amount: "₹ 1,00,000",
        recipientName: "United Way Mumbai",
        recipientId: "ngo-4",
        date: "2025-10-20",
        status: 'PROCESSING',
        type: 'GRANT'
    }
];

export const SAMPLE_CONNECTIONS: Connection[] = [
    {
        id: 'conn-1',
        name: "Marriott International",
        role: "COMPANY",
        avatar: "/logos/marriott.png",
        connectedSince: "Dec 2024",
        location: "New York, USA"
    },
    {
        id: 'conn-2',
        name: "Teach For India",
        role: "NGO",
        avatar: "/logos/teachforindia.png",
        connectedSince: "Oct 2025",
        location: "Mumbai, MH"
    },
    {
        id: 'conn-3',
        name: "District Collector Office",
        role: "GOVERNMENT",
        avatar: "/logos/govt.png",
        connectedSince: "Jan 2025",
        location: "Mumbai, MH"
    }
];

export const TRENDING_NEWS = [
    {
        id: 'news-1',
        category: 'CSR Policy',
        title: 'New government mandate for 2% CSR spending effective next quarter.',
        timestamp: '2h ago',
        posts: '2.5k'
    },
    {
        id: 'news-2',
        category: 'Climate Action',
        title: 'Mumbai aims for zero carbon status by 2040.',
        timestamp: '4h ago',
        posts: '12k'
    },
    {
        id: 'news-3',
        category: 'Tech for Good',
        title: 'AI-driven logistics solving hunger in urban slums.',
        timestamp: '1d ago',
        posts: '5k'
    },
    {
        id: 'news-4',
        hashtag: '#ImpactBridgeLaunch',
        posts: '150k'
    },
    {
        id: 'news-5',
        hashtag: '#EducationForAll',
        posts: '45k'
    }
];

export const SAMPLE_REVIEWS: Review[] = [
    {
        id: 'rev-1',
        authorName: "Pratham",
        authorId: "ngo-3",
        authorAvatar: "/logos/pratham.png",
        content: "Extremely grateful for the prompt delivery of 50 tablets. The logistics were handled perfectly.",
        date: "2025-11-25",
        context: "Donation of 50 Tablets"
    },
    {
        id: 'rev-2',
        authorName: "SNEHA",
        authorId: "ngo-6",
        authorAvatar: "/logos/sneha.png",
        content: "The nutritional supplements provided were a lifesaver for the infants in our care. Thank you for your support.",
        date: "2025-10-15",
        context: "Supply of 5 Packs of Supplements"
    }
];
