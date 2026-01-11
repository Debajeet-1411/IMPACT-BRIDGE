import { NGOS, COMPANIES } from '../data/seedData';
import { jwtDecode } from "jwt-decode";

// Mock types
interface UserData {
    access_token: string;
    user_id: string;
    role: string;
    name?: string;
    email?: string;
    is_new_user?: boolean;
}

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get local users
const getLocalUsers = () => {
    if (typeof window === 'undefined') return {};
    const users = localStorage.getItem('mock_users');
    return users ? JSON.parse(users) : {};
};

// Helper to save local user
const saveLocalUser = (email: string, userData: any) => {
    if (typeof window === 'undefined') return;
    const users = getLocalUsers();
    users[email] = userData;
    localStorage.setItem('mock_users', JSON.stringify(users));
};

export const authService = {
    login: async (email: string, role: string) => {
        await delay(500);
        return {
            data: {
                access_token: "mock-jwt-token",
                user_id: "user-123",
                role: role,
                name: "Test User",
                email: email
            }
        };
    },
    googleLogin: async (credential: string) => {
        await delay(800);
        const decoded: any = jwtDecode(credential);
        const email = decoded.email;
        const name = decoded.name;
        const picture = decoded.picture;

        // Check against seed data first
        const ngoMatch = NGOS.find((n: any) => n.contact_email === email); // Assuming contact_email exists or similar check
        const compMatch = COMPANIES.find(c => c.name.toLowerCase().includes(email.split('@')[0])); // Rough match

        if (ngoMatch) {
            return {
                data: {
                    access_token: "mock-google-token",
                    user_id: `ngo-${NGOS.indexOf(ngoMatch)}`,
                    role: "NGO",
                    name: ngoMatch.name,
                    email: email,
                    is_new_user: false
                }
            };
        }

        if (compMatch) {
            return {
                data: {
                    access_token: "mock-google-token",
                    user_id: `comp-${COMPANIES.indexOf(compMatch)}`,
                    role: "COMPANY",
                    name: compMatch.name,
                    email: email,
                    is_new_user: false
                }
            };
        }

        // Check local storage for signed up users
        const localUsers = getLocalUsers();
        if (localUsers[email]) {
            return {
                data: {
                    access_token: "mock-google-token",
                    ...localUsers[email],
                    is_new_user: false
                }
            };
        }

        // If not found, it's a new user
        return {
            data: {
                access_token: "mock-pending-token",
                email: email,
                name: name,
                avatar: picture,
                is_new_user: true
            }
        };
    },
    completeOnboarding: async (data: any) => {
        await delay(1000);
        const userId = `new-user-${Date.now()}`;
        const finalData = {
            ...data,
            user_id: userId,
            is_verified: true // Auto-verify for demo
        };

        // Save to local storage
        saveLocalUser(data.email, finalData);

        return {
            data: {
                access_token: "mock-final-token",
                ...finalData
            }
        };
    },
    devLogin: async (credentials: any) => {
        await delay(500);
        return {
            data: {
                access_token: "mock-jwt-token",
                user_id: "dev-user-123",
                role: "COMPANY",
                name: "Dev User"
            }
        };
    },
    signup: async (data: any) => {
        await delay(500);
        return {
            data: {
                access_token: "mock-jwt-token",
                user_id: "new-user-123",
                role: data.role,
                name: data.name
            }
        };
    }

};

export const postService = {
    getAll: async (skip = 0, limit = 20) => {
        await delay(500);
        // Combine posts from NGOs and Companies
        const allPosts: any[] = [];

        NGOS.forEach((ngo, index) => {
            ngo.posts.forEach((post, pIndex) => {
                allPosts.push({
                    id: `ngo-post-${index}-${pIndex}`,
                    content: post.content,
                    type: "NEED",
                    ai_metadata: post.meta,
                    user_id: `ngo-${index}`,
                    author: {
                        name: ngo.name,
                        role: "NGO",
                        avatar: ngo.metadata.avatar,
                        location: ngo.location,
                        id: `ngo-${index}`
                    },
                    created_at: new Date().toISOString()
                });
            });
        });

        COMPANIES.forEach((comp, index) => {
            allPosts.push({
                id: `comp-post-${index}`,
                content: comp.post_content,
                type: "AVAILABILITY",
                ai_metadata: comp.meta,
                user_id: `comp-${index}`,
                author: {
                    name: comp.name,
                    role: "COMPANY",
                    avatar: comp.meta.avatar || "https://via.placeholder.com/50",
                    location: comp.location,
                    id: `comp-${index}`
                },
                created_at: new Date().toISOString()
            });
        });

        // Shuffle posts for variety
        const shuffled = allPosts.sort(() => 0.5 - Math.random());
        return { data: shuffled.slice(skip, skip + limit) };
    },
    create: async (data: any) => {
        await delay(500);
        return { data: { ...data, id: `new-post-${Date.now()}` } };
    }
};

export const profileService = {
    get: async (userId: string) => {
        await delay(300);

        // Check local storage users first (for newly onboarded users)
        const localUsers = getLocalUsers();
        const localUserUrl = Object.values(localUsers).find((u: any) => u.user_id === userId);
        if (localUserUrl) {
            const u: any = localUserUrl;
            return {
                data: {
                    id: u.user_id,
                    name: u.companyName || u.name,
                    bio: u.description || "No description provided.",
                    location: "India", // Default
                    role: u.role,
                    is_verified: true,
                    avatar: u.avatar || "",
                    metadata_json: {
                        avatar: u.avatar,
                        cover_image: "https://via.placeholder.com/800x200"
                    },
                    user_id: u.user_id
                }
            };
        }

        // Check if it's an NGO profile
        if (userId.startsWith('ngo-')) {
            const index = parseInt(userId.split('-')[1]);
            const ngo = NGOS[index];
            if (ngo) {
                return {
                    data: {
                        id: userId,
                        name: ngo.name,
                        bio: ngo.bio,
                        location: ngo.location,
                        role: "NGO",
                        is_verified: ngo.metadata.verified || false,
                        avatar: ngo.metadata.avatar,
                        metadata_json: ngo.metadata,
                        user_id: userId
                    }
                };
            }
        }

        // Check if it's a company profile
        if (userId.startsWith('comp-')) {
            const index = parseInt(userId.split('-')[1]);
            const company = COMPANIES[index];
            if (company) {
                return {
                    data: {
                        id: userId,
                        name: company.name,
                        bio: company.bio,
                        location: company.location,
                        role: "COMPANY",
                        is_verified: true,
                        avatar: company.meta.avatar,
                        metadata_json: {
                            avatar: company.meta.avatar,
                            cover_image: company.meta.cover_image,
                            ...company.metadata
                        },
                        user_id: userId
                    }
                };
            }
        }

        // Fallback generic profile
        return {
            data: {
                id: userId,
                name: "Test Organization",
                bio: "This is a mock profile for demonstration.",
                location: "Mumbai, India",
                role: "NGO",
                is_verified: true,
                avatar: "https://via.placeholder.com/150",
                metadata_json: {
                    avatar: "https://via.placeholder.com/150",
                    cover_image: "https://via.placeholder.com/800x200"
                }
            }
        };
    },
    getProfile: async (userId: string) => profileService.get(userId),
    update: async (userId: string, data: any) => {
        await delay(500);
        return { data: { ...data, id: userId } };
    },
    uploadAvatar: async (userId: string, file: File) => {
        await delay(1000);
        return { data: { avatar_url: URL.createObjectURL(file) } };
    },
    uploadCoverImage: async (userId: string, file: File) => {
        await delay(1000);
        return { data: { cover_image_url: URL.createObjectURL(file) } };
    }
};

export const chatService = {
    sendMessage: async (message: string) => {
        await delay(800);

        const lowerMsg = message.toLowerCase();
        let response = "I'm here to help you connecting with NGOs and Companies. You can ask me about donations, volunteering, or impact reports.";

        if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            response = "Hello! 👋 I'm your Impact Bridge AI assistant. How can I help you make a difference today?";
        } else if (lowerMsg.includes('donate') || lowerMsg.includes('donation')) {
            response = "That's wonderful! 💖 You can find urgent donation needs in the 'Explore Needs' section. We have NGOs looking for food, clothes, and educational supplies right now.";
        } else if (lowerMsg.includes('volunteer')) {
            response = "Volunteering is a great way to help! 🤝 Check out the 'Volunteering' opportunities on the Feed. Organizations like Teach For India and Bhumi are currently looking for volunteers.";
        } else if (lowerMsg.includes('impact') || lowerMsg.includes('report')) {
            response = "You can view detailed Impact Reports 📊 in the sidebar. We track every donation and verify all NGOs to ensure transparency.";
        } else if (lowerMsg.includes('ngo') || lowerMsg.includes('organization')) {
            response = "We have over 20 verified NGOs on our platform including CRY, Pratham, and Goonj. You can view their profiles by clicking on their names in the feed.";
        } else if (lowerMsg.includes('company') || lowerMsg.includes('corporate')) {
            response = "Top corporate partners like Tata CSR and Reliance Foundation are active on our platform, providing crucial resources and funding.";
        } else if (lowerMsg.includes('winter') || lowerMsg.includes('clothes')) {
            response = "There is a predicted shortage of Winter Clothes in Pune. If you have some to spare, please check the 'Urgent Needs' section!";
        }

        return { data: { response: response } };
    }
};

const api = {
    interceptors: {
        request: { use: () => { } }
    },
    get: async () => ({ data: {} }),
    post: async () => ({ data: {} })
};

export default api;
