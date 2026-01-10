from app.db.database import engine, Base, SessionLocal
from app.models.user import User, Profile, Role
from app.models.social import Post, PostType
from sqlalchemy import text
import traceback
import random # Added missing import if needed, though not used in snippets below but good practice

import os

def run_seed():
    try:
        print("Initializing seeding process...")
        # Ensure we target the same DB file as database.py
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        db_file = os.path.join(BASE_DIR, "sql_app.db")
        
        if os.path.exists(db_file):
            print(f"Removing existing database file: {db_file}")
            try:
                os.remove(db_file)
            except PermissionError:
                print("Could not delete database file - it might be in use.")
                # Fallback to drop_all if delete fails
                print("Attempting drop_all as fallback...")
                Base.metadata.drop_all(bind=engine)
        
        print("Creating all tables...")
        Base.metadata.create_all(bind=engine)
        
        db = SessionLocal()
        print("Session created.")

        # 20 Verified NGOs with rich metadata and images
        ngos = [
            {
                "name": "Child Rights and You (CRY)",
                "bio": "Ensuring happy, healthy and creative childhoods.",
                "location": "Mumbai, MH",
                "metadata": {
                    "type": "Child Welfare", "verified": True, "reg_no": "E-1234 (BOM)", "beneficiaries": "1.2M children",
                    "avatar": "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2018/07/cry-logo-1531308704.jpg",
                    "cover_image": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
                },
                "posts": [
                    {
                        "content": "Urgent: 500 Winter Jackets needed 🧥 for children in our northern centers. Temperatures are dropping fast! ❄️",
                        "meta": {"items": ["Jackets"], "quantity": "500 Units", "deadline": "2 Days", "requirements": "New/Good Condition", "logistics": "Pickup Needed", "category": "Clothes", "urgency": "Critical"}
                    },
                    {
                        "content": "Need 200 School Kits 🎒 (Notebooks, Pens, Bags) for the upcoming academic year. Help us educate the future! ✏️",
                        "meta": {"items": ["School Kits"], "quantity": "200 Kits", "deadline": "15 Days", "requirements": "Standard Set", "logistics": "Drop-off", "category": "Education", "urgency": "Medium"}
                    },
                    {
                        "content": "Looking for nutritional supplements 🥛 for 50 malnourished infants in our care. Critical need! 🆘",
                        "meta": {"items": ["Supplements"], "quantity": "5 Packs", "deadline": "Immediate", "requirements": "Sealed/Fresh", "logistics": "Expedited", "category": "Food", "urgency": "Critical"}
                    }
                ]
            },
            {
                "name": "The Akanksha Foundation",
                "bio": "High-quality education for children from low-income communities.",
                "location": "Mumbai / Pune",
                "metadata": { 
                    "type": "Education", "verified": True, "reg_no": "U80301MH2007NPL175736", "beneficiaries": "14,000 students",
                    "avatar": "https://csrbox.org/organization/org_logo/1510810948theakankshafoundation.jpg",
                    "cover_image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop"
                },
               "posts": [
                    {
                        "content": "We need 50 Tablets 📱 for our digital literacy program. Bridging the digital divide for slum children! 💻",
                        "meta": {"items": ["Tablets"], "quantity": "50 Units", "deadline": "10 Days", "requirements": "Functional", "logistics": "Fragile", "category": "Education", "urgency": "High"}
                    },
                    {
                        "content": "Requesting volunteers for weekend math classes ➗. Make a difference with your time! 🕐",
                        "meta": {"items": ["Volunteers"], "quantity": "10 Tutors", "deadline": "Flexible", "requirements": "Math Skills", "logistics": "Virtual/In-person", "category": "Volunteering", "urgency": "Low"}
                    }
                ]
            },
            {
                "name": "Pratham",
                "bio": "Improving literacy rates and quality of education across India.",
                "location": "Mumbai, MH",
                "metadata": {
                    "type": "Education", "verified": True, "reg_no": "F-12345", "beneficiaries": "5M+",
                    "avatar": "https://logowiki.net/wp-content/uploads/imgp/Pratham-Logo-1-1775.jpg",
                    "cover_image": "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop"
                },
                 "posts": [
                    {
                        "content": "Library drive! 📚 We need storybooks in Marathi and Hindi for our community libraries. 📖",
                        "meta": {"items": ["Books"], "quantity": "1000 Books", "deadline": "30 Days", "requirements": "Local Language", "logistics": "Bulk Pickup", "category": "Education", "urgency": "Medium"}
                    },
                    {
                        "content": "Need 100 Projectors 📽️ for smart classrooms in rural schools.",
                        "meta": {"items": ["Projectors"], "quantity": "100 Units", "deadline": "20 Days", "requirements": "HDMI Compatible", "logistics": "Fragile Handling", "category": "Electronics", "urgency": "High"}
                    }
                ]
            },
            {
                "name": "United Way Mumbai",
                "bio": "Community impact, health, education, and environmental safety.",
                "location": "Mumbai, MH",
                "metadata": {
                    "type": "Community Development", "verified": True, "reg_no": "E-23456", "beneficiaries": "500k+",
                    "avatar": "https://logos-world.net/wp-content/uploads/2024/12/United-Way-Logo-New-500x281.png",
                    "cover_image": "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=1000&auto=format&fit=crop"
                },
               "posts": [
                    {
                        "content": "Beach Cleanup Drive 🏖️ this Sunday! We need gloves 🧤, masks 😷, and garbage bags 🗑️.",
                        "meta": {"items": ["Cleanup Kit"], "quantity": "200 Sets", "deadline": "Target: Sunday", "requirements": "Eco-friendly", "logistics": "On-site", "category": "Environment", "urgency": "High"}
                    },
                    {
                        "content": "Health Camp supplies needed: Glucometers, BP Monitors 🩺, and First Aid Kits 🩹.",
                        "meta": {"items": ["Medical Kits"], "quantity": "50 Kits", "deadline": "Yesterday", "requirements": "Certified", "logistics": "Pickup", "category": "Health", "urgency": "Critical"}
                    }
                ]
            },
            {
                "name": "Swades Foundation",
                "bio": "Rural empowerment through health, education, and water sanitation.",
                "location": "Raigad / Mumbai",
                "metadata": {
                    "type": "Rural Development", "verified": True, "reg_no": "E-34567", "beneficiaries": "2k Villages",
                    "avatar": "https://www.greatship.com/upload/csr/gil_funding/Swades_Stacked_English_Original_Logo_142.jpg",
                    "cover_image": "https://images.unsplash.com/photo-1621981386829-9b788a846c77?q=80&w=1000&auto=format&fit=crop"
                },
                "posts": [
                    {
                        "content": "Water filters needed 💧 for 200 homes in Raigad. Clean water is a basic right! 🚰",
                        "meta": {"items": ["Water Filters"], "quantity": "200 Units", "deadline": "1 Week", "requirements": "Gravity Based", "logistics": "Heavy Transport", "category": "Water", "urgency": "High"}
                    },
                     {
                        "content": "Solar lamps ☀️ requested for rigorous study hours in load-shedding areas. 💡",
                        "meta": {"items": ["Solar Lamps"], "quantity": "500 Units", "deadline": "1 Month", "requirements": "Durable", "logistics": "Bulk", "category": "Electronics", "urgency": "Medium"}
                    }
                ]
            },
            {
                "name": "SNEHA",
                "bio": "Health and nutrition for women and children in urban slums.",
                "location": "Mumbai, MH",
                "metadata": {
                    "type": "Health & Nutrition", "verified": True, "reg_no": "E-45678", "beneficiaries": "300k women",
                    "avatar": "https://www.snehamumbai.org/wp-content/themes/sneha/img/logo.png",
                    "cover_image": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1000&auto=format&fit=crop"
                },
                 "posts": [
                    {
                        "content": "Iron and Folic Acid supplements needed 💊 for expectant mothers in Dharavi.",
                        "meta": {"items": ["Medicine"], "quantity": "5000 Strips", "deadline": "Urgent", "requirements": "Pharma Grade", "logistics": "Cold Chain", "category": "Health", "urgency": "Critical"}
                    },
                     {
                        "content": "Baby kits: Diapers 👶, Baby Oil, and Towels needed for our maternity center.",
                        "meta": {"items": ["Baby Kits"], "quantity": "100 Kits", "deadline": "1 Week", "requirements": "Hypoallergenic", "logistics": "Drop-off", "category": "Health", "urgency": "High"}
                    }
                ]
            },
             {
                "name": "Annamrita Foundation",
                "bio": "Providing hygienic mid-day meals to school-going children.",
                "location": "Mumbai, MH",
                "metadata": {
                    "type": "Food Relief", "verified": True, "reg_no": "E-67890", "beneficiaries": "1.2M meals/day",
                    "avatar": "https://give.do/static/img/logos/KNX/739e072c-6e14-423c-9187-df2df3b3d28a.png",
                    "cover_image": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
                },
                "posts": [
                    {
                        "content": "Rice and Dal donations required! 🍚 We are running low on stock for next week's meals.",
                         "meta": {"items": ["Grains", "Pulses"], "quantity": "1000 Kgs", "deadline": "2 Days", "requirements": "Grade A", "logistics": "Truck Needed", "category": "Food", "urgency": "Critical"}
                    },
                    {
                        "content": "We need a new commercial refrigerator ❄️ for our central kitchen storage.",
                        "meta": {"items": ["Refrigerator"], "quantity": "1 Unit", "deadline": "10 Days", "requirements": "500L Capacity", "logistics": "Installation Req", "category": "Equipment", "urgency": "High"}
                    }
                ]
            },
            {
                "name": "St. Jude India Childcare Centres",
                "bio": "Holistic support and housing for children undergoing cancer treatment.",
                "location": "Mumbai, MH",
                "metadata": {"type": "Childcare/Health", "verified": True, "reg_no": "E-90123", "beneficiaries": "500 families", "avatar": "https://projectheena.com/uploads/ngo/37139115984738/profileImage/images/stjudeindia.jpg", "cover_image": "https://images.unsplash.com/photo-1502086223501-636b0f027376?q=80&w=1000&auto=format&fit=crop"},
                "posts": [
                     {
                        "content": "Nutritional supplements (Ensure/Pediasure) 🥛 needed for children on chemotherapy.",
                        "meta": {"items": ["Supplements"], "quantity": "200 Cans", "deadline": "5 Days", "requirements": "Sealed", "logistics": "Pickup", "category": "Health", "urgency": "High"}
                    },
                    {
                        "content": "Hygiene kits: Toothpaste 🪥, Soap 🧼, and Sanitizers needed for infection control.",
                        "meta": {"items": ["Hygiene Kits"], "quantity": "300 Kits", "deadline": "1 Week", "requirements": "Standard", "logistics": "Bulk Drop", "category": "Health", "urgency": "Medium"}
                    }
                ]
            },
            {
                "name": "Magic Bus India",
                "bio": "Life skills and livelihood opportunities for youth in poverty.",
                "location": "Navi Mumbai, MH",
                "metadata": {"type": "Youth Development", "verified": True, "reg_no": "E-01234", "beneficiaries": "400k youth", "avatar": "https://tse2.mm.bing.net/th/id/OIP.zmRxKpSaOOD7GUy10CLW3AHaH3?pid=Api&P=0&h=180", "cover_image": "https://images.unsplash.com/photo-1529390003868-fe08793b584d?q=80&w=1000&auto=format&fit=crop"},
                "posts": [
                    {
                        "content": "Sports equipment needed! ⚽ Footballs, Volleyballs, and Cones for our activity sessions.",
                        "meta": {"items": ["Sports Gear"], "quantity": "50 Sets", "deadline": "2 Weeks", "requirements": "Durable/Outdoor", "logistics": "Pickup", "category": "Sports", "urgency": "Medium"}
                    }
                ]
            },
             {
                "name": "Goonj",
                "bio": "Disaster relief and community development using urban surplus.",
                "location": "Mumbai (Office)",
                "metadata": {"type": "Disaster Relief", "verified": True, "reg_no": "E-78906", "beneficiaries": "Pan India", "avatar": "https://goonj.org/wp-content/uploads/2020/06/Goonj-logo-10June20.png", "cover_image": "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop"},
                "posts": [
                    {
                        "content": "URGENT: Flood relief material needed! 🌊 Tarpaulins, Dry Food, medicines.",
                        "meta": {"items": ["Relief Kits"], "quantity": "5000 Kits", "deadline": "24 Hours", "requirements": "Waterproof", "logistics": "Air Lift / Truck", "category": "Disaster Relief", "urgency": "Critical"}
                    },
                     {
                        "content": "Fabric scraps 🧵 needed for our 'My Pad' sanitary napkin initiative.",
                        "meta": {"items": ["Fabric"], "quantity": "500 Kgs", "deadline": "Ongoing", "requirements": "Cotton", "logistics": "Regular Pickup", "category": "Health", "urgency": "High"}
                    }
                ]
            },
            {
                "name": "Teach For India",
                "bio": "Building a movement of leaders to eliminate educational inequity.",
                "location": "Mumbai, MH",
                "metadata": {"type": "Education", "verified": True, "reg_no": "E-99900", "beneficiaries": "32k students", "avatar": "https://tse1.mm.bing.net/th/id/OIP.2WQiDriiyLbQejj1xswGqwAAAA?pid=Api&P=0&h=180", "cover_image": "https://images.unsplash.com/photo-1427504746086-64744bad9842?q=80&w=1000&auto=format&fit=crop"},
                "posts": [
                    {
                        "content": "Looking for 20 Fellow volunteers 👩‍🏫 to help with after-school remedial classes.",
                        "meta": {"items": ["Volunteers"], "quantity": "20 Fellows", "deadline": "1 Month", "requirements": "Graduate", "logistics": "In-person", "category": "Education", "urgency": "Medium"}
                    }
                ]
            },
            {
                "name": "HelpAge India",
                "bio": "Supporting the elderly and advocating for their rights.",
                "location": "Delhi / Pan India",
                "metadata": {"type": "Elderly Care", "verified": True, "reg_no": "E-10101", "beneficiaries": "2M+ elderly", "avatar": "https://tatsatchronicle.com/wp-content/uploads/2023/01/87853027_2822716824430931_3709354707123175424_n.png", "cover_image": "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=1000&auto=format&fit=crop"},
                "posts": [
                    {
                        "content": "Adult diapers and walking sticks 🦯 needed for our old age home in Delhi.",
                        "meta": {"items": ["Elderly Care"], "quantity": "500 Sets", "deadline": "2 Weeks", "requirements": "Standard", "logistics": "Pickup", "category": "Health", "urgency": "High"}
                    }
                ]
            },
            {
                "name": "GiveIndia",
                "bio": "India's largest donation platform and NGO network.",
                "location": "Bangalore, KA",
                "metadata": {"type": "Platform", "verified": True, "reg_no": "E-20202", "beneficiaries": "10M+", "avatar": "https://cdn.givind.org/static/images/sharing-banner.jpg", "cover_image": "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000&auto=format&fit=crop"},
                "posts": [
                    {
                        "content": "Matching Grant Alert! 💰 We are matching 100% of donations made to Education NGOs this week.",
                        "meta": {"items": ["Funds"], "quantity": "₹ 1 Crore", "deadline": "7 Days", "requirements": "Registered NGOs", "logistics": "Online", "category": "Funding", "urgency": "Medium"}
                    }
                ]
            },
            {
                "name": "Save the Children India",
                "bio": "Protecting children from harm and providing education/health.",
                "location": "New Delhi / Mumbai",
                "metadata": {"type": "Child Rights", "verified": True, "reg_no": "E-30303", "beneficiaries": "1M+ children", "avatar": "https://tse2.mm.bing.net/th/id/OIP.lSUbx4jvPeO_1nVkwNVZJQHaG0?pid=Api&P=0&h=180", "cover_image": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"},
                "posts": [
                    {
                        "content": "Warm blankets 🛌 needed for street children in Delhi winters.",
                        "meta": {"items": ["Blankets"], "quantity": "1000 Units", "deadline": "Urgent", "requirements": "Woolen", "logistics": "Drop-off", "category": "Relief", "urgency": "Critical"}
                    }
                ]
            },
             {
                "name": "https://tse2.mm.bing.net/th/id/OIP.lSUbx4jvPeO_1nVkwNVZJQHaG0?pid=Api&P=0&h=180",
                "bio": "Fighting inequality to end poverty and injustice.",
                "location": "New Delhi, Delhi",
                "metadata": {"type": "Human Rights", "verified": True, "reg_no": "E-40404", "beneficiaries": "700k+", "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Oxfam_logo.svg/1200px-Oxfam_logo.svg.png", "cover_image": "https://images.unsplash.com/photo-1464695110811-dcf3903dc2f4?q=80&w=1000&auto=format&fit=crop"},
                "posts": [
                    {
                        "content": "Hygiene kits for women 🧼 in Bihar flood-hit areas.",
                        "meta": {"items": ["Hygiene Kits"], "quantity": "2000 Units", "deadline": "3 Days", "requirements": "Standard", "logistics": "Transport Req", "category": "Relief", "urgency": "High"}
                    }
                ]
            },
            {
                "name": "Care India",
                "bio": "Empowering women and girls from marginalized communities.",
                "location": "Patna, Bihar",
                "metadata": {"type": "Women Empowerment", "verified": True, "reg_no": "E-50505", "beneficiaries": "55M since 1950", "avatar": "https://tse1.mm.bing.net/th/id/OIP.Miow2KykcUiZrmC_TzKNVgHaJR?pid=Api&P=0&h=180", "cover_image": "https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?q=80&w=1000&auto=format&fit=crop"},
                "posts": [
                    {
                        "content": "Sewing machines 🧵 for livelihood training center in rural Bihar.",
                        "meta": {"items": ["Machines"], "quantity": "50 Units", "deadline": "30 Days", "requirements": "Manual", "logistics": "Bulk", "category": "Livelihood", "urgency": "Medium"}
                    }
                ]
            },
            {
                "name": "The Nudge Foundation",
                "bio": "Alleviating poverty sustainably and scalably.",
                "location": "Bangalore, KA",
                "metadata": {"type": "Poverty Alleviation", "verified": True, "reg_no": "E-60606", "beneficiaries": "10M+", "avatar": "https://tse3.mm.bing.net/th/id/OIP.YmO2Ynzyr5Dlrg3y4uj5iwHaC1?pid=Api&P=0&h=180", "cover_image": "https://images.unsplash.com/photo-1542601906990-24ccd08d7455?q=80&w=1000&auto=format&fit=crop"},
                "posts": [
                    {
                        "content": "Seeking mentors 👨‍💼 for our Gurukul program to guide youth.",
                        "meta": {"items": ["Mentors"], "quantity": "50 Mentors", "deadline": "Apply by 30th", "requirements": "Professional", "logistics": "Virtual", "category": "Education", "urgency": "Medium"}
                    }
                ]
            },
            {
                "name": "EdelGive Foundation",
                "bio": "Philanthropic arm of Edelweiss Group.",
                "location": "Mumbai, MH",
                "metadata": {"type": "Philanthropy", "verified": True, "reg_no": "E-70707", "beneficiaries": "Pan India", "avatar": "https://avpn.asia/wp-content/uploads/2014/11/EdelGiveLogo.jpg", "cover_image": "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1000&auto=format&fit=crop"},
                "posts": [
                    {
                        "content": "Funding opportunity! 💸 Grants available for NGOs working in Water & Sanitation.",
                        "meta": {"items": ["Grants"], "quantity": "₹ 50 Lakhs", "deadline": "Applications Open", "requirements": "Proposal", "logistics": "Online", "category": "Funding", "urgency": "High"}
                    }
                ]
            },
            {
                "name": "Dasra",
                "bio": "Strategic philanthropy foundation.",
                "location": "Mumbai, MH",
                "metadata": {"type": "Strategic Philanthropy", "verified": True, "reg_no": "E-80808", "beneficiaries": "100+ NGOs", "avatar": "https://atma.org.in/wp-content/themes/atma-internal/img/supporters/dasra.png", "cover_image": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop"},
                "posts": [
                    {
                        "content": "Capacity building workshop 💡 for NGO leaders. Register now!",
                        "meta": {"items": ["Training"], "quantity": "100 Seats", "deadline": "Next Week", "requirements": "Leadership", "logistics": "Mumbai", "category": "Training", "urgency": "Medium"}
                    }
                ]
            },
            {
                "name": "Bhumi",
                "bio": " Volunteer based organization.",
                "location": "Chennai / Pan India",
                "metadata": {"type": "Volunteering", "verified": True, "reg_no": "E-90909", "beneficiaries": "25k children", "avatar": "https://tse2.mm.bing.net/th/id/OIP.54sDq5wdc0AdShXF3RlBFwHaFr?pid=Api&P=0&h=180", "cover_image": "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1000&auto=format&fit=crop"},
                "posts": [
                    {
                        "content": "Tree plantation drive! 🌳 Need 500 saplings and 100 volunteers.",
                        "meta": {"items": ["Saplings", "Volunteers"], "quantity": "500 + 100", "deadline": "This Weekend", "requirements": "Outdoor", "logistics": "On-site", "category": "Environment", "urgency": "Medium"}
                    }
                ]
            },
        ]
        print(f"NGOs list defined. Item count: {len(ngos)}")

        # Sample Companies
        companies = [
            ("Marriott International", "Leading luxury hotel chain committed to sustainability.", "New York, USA", 
             "We have 100 sets of hotel-grade Bed Linens 🛏️ (Sheets, Towels) lightly used, available for donation.",
             {"items": ["Linens"], "quantity": "100 Sets", "deadline": "Available Now", "requirements": "Self Pickup", "logistics": "Boxed", "category": "Donation", "urgency": "Medium", "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Marriott_International.svg/1200px-Marriott_International.svg.png", "cover_image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop"}),
             
            ("DHL Supply Chain", "End-to-end logistics solutions.", "London, UK", 
             "One 14ft Truck 🚚 available for free transport of relief materials from Mumbai to Pune this weekend.",
             {"items": ["Truck"], "quantity": "1 Vehicle", "deadline": "This Weekend", "requirements": "Driver Included", "logistics": "Mumbai->Pune", "category": "Logistics", "urgency": "Medium", "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/DHL_Logo.svg/1200px-DHL_Logo.svg.png", "cover_image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop"}),

            ("Tata CSR", "Community support division of Tata Group.", "Mumbai, India", 
             "50 Refurbished Laptops 💻 available for digital literacy programs. Windows 10 installed.",
             {"items": ["Laptops"], "quantity": "50 Units", "deadline": "Apply by 15th", "requirements": "NGO Verification", "logistics": "Pickup", "category": "Donation", "urgency": "High", "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/1200px-Tata_logo.svg.png", "cover_image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop"}),

            ("Reliance Foundation", "Philanthropic arm of Reliance Industries.", "Mumbai, India", 
             "Surplus Medical Supplies 💊 (Masks, Gloves, Basic Antibiotics) available from our health camps.",
             {"items": ["Medical"], "quantity": "5 Cartons", "deadline": "Immediate", "requirements": "Licence Check", "logistics": "Cold Chain", "category": "Health", "urgency": "High", "avatar": "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Reliance_Foundation_Logo.svg/1200px-Reliance_Foundation_Logo.svg.png", "cover_image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop"}),
             
            ("Zomato Feeding India", "Hunger Hero.", "Gurgaon, India",
             "Ready to sponsor 1000 meals 🍛 for any orphanage in need. Connect with us!",
            {"items": ["Meals"], "quantity": "1000 Meals", "deadline": "Anytime", "requirements": "Verified NGO", "logistics": "Credits", "category": "Funding", "urgency": "Medium", "avatar": "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png", "cover_image": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"})
        ]

        print("Seeding NGOs...")
        for ngo_data in ngos:
            try:
                print(f"Processing NGO: {ngo_data['name']}")
                email = f"{ngo_data['name'].split(' ')[0].lower()}@ngo.org".replace('(', '').replace(')', '')
                # Check for existing
                if db.query(User).filter(User.email == email).first():
                    print(f"Skipping {ngo_data['name']}, already exists.")
                    continue
                    
                user = User(email=email, role=Role.NGO)
                db.add(user)
                db.flush()
                
                profile = Profile(
                    user_id=user.id, 
                    name=ngo_data['name'], 
                    bio=ngo_data['bio'], 
                    location=ngo_data['location'], 
                    is_verified=True,
                    metadata_json=ngo_data['metadata']
                )
                db.add(profile)
                
                for post_data in ngo_data.get('posts', []):
                    post = Post(
                        user_id=user.id,
                        content=post_data['content'],
                        type=PostType.NEED,
                        ai_metadata=post_data['meta']
                    )
                    db.add(post)
                
                db.commit() # Commit after each NGO
                print(f"Successfully added {ngo_data['name']}")
            except Exception as e:
                db.rollback()
                print(f"FAILED to add {ngo_data['name']}: {e}")
                print(traceback.format_exc())

        print("Seeding Companies...")
        for name, bio, loc, post_content, meta in companies:
            try:
                print(f"Processing Company: {name}")
                email = f"{name.split(' ')[0].lower()}@corp.com"
                
                if db.query(User).filter(User.email == email).first():
                    print(f"Skipping {name}, already exists.")
                    continue

                user = User(email=email, role=Role.COMPANY)
                db.add(user)
                db.flush()
                profile = Profile(user_id=user.id, name=name, bio=bio, location=loc, is_verified=True, metadata_json={"type": "Corporate", **meta})
                db.add(profile)

                post = Post(
                    user_id=user.id,
                    content=post_content,
                    type=PostType.AVAILABILITY,
                    ai_metadata=meta
                )
                db.add(post)
                
                db.commit() # Commit after each Company
                print(f"Successfully added {name}")
            except Exception as e:
                db.rollback()
                print(f"FAILED to add {name}: {e}")
                print(traceback.format_exc())
        db.close()
        print("Database seeded with IMAGES and METADATA successfully!")
    
    except Exception:
        print(traceback.format_exc())

if __name__ == "__main__":
    run_seed()