/**
 * NYC Venue Data - Real locations in New York City
 */

const NYCData = {
    venues: [
        // Lower Manhattan / Financial District
        {
            id: 1,
            name: "Pier 17",
            type: "waterfront",
            emoji: "🌊",
            people: 234,
            intensity: "hot",
            position: { top: "80%", left: "57%" },
            neighborhood: "Financial District"
        },
        {
            id: 2,
            name: "Stone Street",
            type: "bars",
            emoji: "🍻",
            people: 156,
            intensity: "warm",
            position: { top: "78%", left: "56%" },
            neighborhood: "Financial District"
        },

        // SoHo / Tribeca
        {
            id: 3,
            name: "Spring Lounge",
            type: "bar",
            emoji: "🍺",
            people: 89,
            intensity: "warm",
            position: { top: "72%", left: "54%" },
            neighborhood: "SoHo"
        },

        // East Village / LES
        {
            id: 4,
            name: "Tompkins Square",
            type: "park",
            emoji: "🌳",
            people: 67,
            intensity: "cool",
            position: { top: "66%", left: "56%" },
            neighborhood: "East Village"
        },
        {
            id: 5,
            name: "Alphabet City Bars",
            type: "nightlife",
            emoji: "🎵",
            people: 142,
            intensity: "warm",
            position: { top: "67%", left: "57%" },
            neighborhood: "East Village"
        },

        // Union Square / Flatiron
        {
            id: 6,
            name: "Union Square",
            type: "plaza",
            emoji: "🏛️",
            people: 178,
            intensity: "warm",
            position: { top: "62%", left: "53%" },
            neighborhood: "Union Square"
        },

        // Chelsea / Meatpacking
        {
            id: 7,
            name: "Chelsea Market",
            type: "food",
            emoji: "🍕",
            people: 267,
            intensity: "hot",
            position: { top: "58%", left: "51%" },
            neighborhood: "Chelsea"
        },
        {
            id: 8,
            name: "The Highline",
            type: "park",
            emoji: "🌿",
            people: 198,
            intensity: "hot",
            position: { top: "56%", left: "50%" },
            neighborhood: "Chelsea"
        },

        // Midtown
        {
            id: 9,
            name: "Times Square",
            type: "landmark",
            emoji: "🎭",
            people: 423,
            intensity: "hot",
            position: { top: "48%", left: "52%" },
            neighborhood: "Midtown"
        },
        {
            id: 10,
            name: "Bryant Park",
            type: "park",
            emoji: "📚",
            people: 134,
            intensity: "warm",
            position: { top: "47%", left: "53%" },
            neighborhood: "Midtown"
        },
        {
            id: 11,
            name: "Hell's Kitchen",
            type: "restaurants",
            emoji: "🍜",
            people: 156,
            intensity: "warm",
            position: { top: "50%", left: "49%" },
            neighborhood: "Hell's Kitchen"
        },

        // Upper East Side
        {
            id: 12,
            name: "The Met Museum",
            type: "culture",
            emoji: "🎨",
            people: 234,
            intensity: "hot",
            position: { top: "38%", left: "54%" },
            neighborhood: "Upper East Side"
        },

        // Upper West Side
        {
            id: 13,
            name: "Lincoln Center",
            type: "culture",
            emoji: "🎭",
            people: 167,
            intensity: "warm",
            position: { top: "42%", left: "49%" },
            neighborhood: "Upper West Side"
        },

        // Central Park
        {
            id: 14,
            name: "Central Park",
            type: "park",
            emoji: "🌲",
            people: 312,
            intensity: "hot",
            position: { top: "40%", left: "51.5%" },
            neighborhood: "Central Park"
        },

        // Williamsburg, Brooklyn
        {
            id: 15,
            name: "Bedford Ave",
            type: "nightlife",
            emoji: "🎸",
            people: 245,
            intensity: "hot",
            position: { top: "70%", left: "62%" },
            neighborhood: "Williamsburg"
        },
        {
            id: 16,
            name: "Smorgasburg",
            type: "food",
            emoji: "🍔",
            people: 189,
            intensity: "warm",
            position: { top: "72%", left: "63%" },
            neighborhood: "Williamsburg"
        },

        // DUMBO, Brooklyn
        {
            id: 17,
            name: "Brooklyn Bridge Park",
            type: "waterfront",
            emoji: "🌉",
            people: 201,
            intensity: "hot",
            position: { top: "76%", left: "60%" },
            neighborhood: "DUMBO"
        },

        // Long Island City, Queens
        {
            id: 18,
            name: "Gantry Plaza",
            type: "waterfront",
            emoji: "🏙️",
            people: 98,
            intensity: "cool",
            position: { top: "60%", left: "68%" },
            neighborhood: "Long Island City"
        },

        // Astoria, Queens
        {
            id: 19,
            name: "Astoria Beer Garden",
            type: "bar",
            emoji: "🍺",
            people: 176,
            intensity: "warm",
            position: { top: "52%", left: "72%" },
            neighborhood: "Astoria"
        }
    ],

    // Heat map spots aligned with NYC geography
    heatSpots: [
        // Lower Manhattan cluster
        {
            size: "200px",
            intensity: "hot",
            position: { top: "78%", left: "56%" }
        },
        // East Village cluster
        {
            size: "150px",
            intensity: "warm",
            position: { top: "66%", left: "56%" }
        },
        // Midtown cluster
        {
            size: "220px",
            intensity: "hot",
            position: { top: "48%", left: "52%" }
        },
        // Central Park area
        {
            size: "180px",
            intensity: "warm",
            position: { top: "40%", left: "51%" }
        },
        // Chelsea/Meatpacking
        {
            size: "190px",
            intensity: "hot",
            position: { top: "57%", left: "51%" }
        },
        // Williamsburg cluster
        {
            size: "170px",
            intensity: "warm",
            position: { top: "70%", left: "62%" }
        },
        // Upper East Side
        {
            size: "140px",
            intensity: "cool",
            position: { top: "38%", left: "54%" }
        },
        // DUMBO/Brooklyn Heights
        {
            size: "160px",
            intensity: "warm",
            position: { top: "76%", left: "60%" }
        }
    ],

    // Sample user profiles for Discovery screen (NYC residents)
    users: [
        {
            name: "Sarah Chen",
            avatar: "👩‍💼",
            distance: "0.3 mi",
            level: "Explorer",
            verified: true,
            bio: "Product designer who loves coffee, Chelsea Market brunches, and finding the best hidden spots in the city. Let's explore together!",
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
            name: "Mike Johnson",
            avatar: "🧑‍💻",
            distance: "0.5 mi",
            level: "Connector",
            verified: true,
            bio: "Startup founder in FiDi, fitness enthusiast, and amateur chef. Always up for spontaneous adventures around Manhattan!",
            gradient: "linear-gradient(135deg, #FF6B6B, #FF8787)"
        },
        {
            name: "Emma Rodriguez",
            avatar: "👩‍🎨",
            distance: "0.2 mi",
            level: "Ambassador",
            verified: true,
            bio: "Artist in Williamsburg, yoga instructor, and sustainability advocate. Love meeting creative souls at Brooklyn Bridge Park!",
            gradient: "linear-gradient(135deg, #4ECDC4, #44A08D)"
        },
        {
            name: "Alex Thompson",
            avatar: "👨‍🎤",
            distance: "0.4 mi",
            level: "Connector",
            verified: true,
            bio: "Music producer in Astoria. Catch me at live shows in the East Village or exploring new food spots in Queens!",
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
            name: "Rachel Kim",
            avatar: "👩‍🔬",
            distance: "0.2 mi",
            level: "Explorer",
            verified: true,
            bio: "Biotech researcher at Cornell. Love The Met, Central Park runs, and discovering new coffee shops on the UES!",
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        }
    ],

    // Sample Spark requests (NYC locations)
    sparks: [
        {
            name: "Alex Thompson",
            avatar: "👨‍🎤",
            location: "Pier 17",
            distance: "0.4 mi",
            time: "2 minutes ago"
        },
        {
            name: "Rachel Kim",
            avatar: "👩‍🔬",
            location: "The Met Museum",
            distance: "0.2 mi",
            time: "15 minutes ago"
        },
        {
            name: "Jordan Davis",
            avatar: "🧑‍🎓",
            location: "Bryant Park",
            distance: "0.6 mi",
            time: "1 hour ago"
        }
    ]
};

// Export for use in other modules
window.NYCData = NYCData;
