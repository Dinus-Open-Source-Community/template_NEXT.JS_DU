"use client";

import { HeroUIProvider } from "@heroui/react";

const Providers = ({ children }) => {
    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    );
}

export default Providers;
