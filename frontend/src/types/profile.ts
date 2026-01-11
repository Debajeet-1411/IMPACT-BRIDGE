export interface Request {
    id: string;
    content: string;
    status: 'LIVE' | 'PENDING' | 'FULFILLED';
    createdAt: string;
    meta: {
        items: string[];
        quantity: string;
        deadline: string;
        requirements: string;
        logistics: string;
        category: string;
        urgency: 'Critical' | 'High' | 'Medium' | 'Low';
    };
}

export interface Commitment {
    id: string;
    title: string;
    description: string;
    status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    ngoName: string;
    ngoId: string;
    date: string;
    trackingId?: string;
    courierStatus?: 'Dispatched' | 'In Transit' | 'Out for Delivery' | 'Delivered';
}

export interface Transaction {
    id: string;
    amount: string;
    recipientName: string;
    recipientId: string;
    date: string;
    status: 'SUCCESS' | 'FAILED' | 'PROCESSING';
    type: 'DONATION' | 'GRANT' | 'SPONSORSHIP';
}

export interface Connection {
    id: string;
    name: string;
    role: 'NGO' | 'COMPANY' | 'GOVERNMENT';
    avatar: string;
    connectedSince: string;
    location: string;
}

export interface Review {
    id: string;
    authorName: string;
    authorId: string;
    authorAvatar: string;
    content: string;
    date: string;
    context: string; // e.g., "Donation of 500 Blankets"
}
