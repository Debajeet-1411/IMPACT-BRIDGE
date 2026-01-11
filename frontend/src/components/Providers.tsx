"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
    // Replace with your actual Google Client ID
    const clientId = "YOUR_GOOGLE_CLIENT_ID_PLACEHOLDER";

    return (
        <GoogleOAuthProvider clientId={clientId}>
            {children}
        </GoogleOAuthProvider>
    );
}
