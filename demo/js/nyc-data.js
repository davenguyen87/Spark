/**
 * NYC Venue Data - Real locations with actual coordinates
 * Uses Leaflet.js + OpenStreetMap (Free, No API Key Required!)
 */

const NYCData = {
    // NYC center coordinates for initial map view
    center: {
        lat: 40.7589,
        lng: -73.9851,
        zoom: 12
    },

    venues: [
        // Lower Manhattan / Financial District
        {
            id: 1,
            name: "Pier 17",
            type: "waterfront",
            emoji: "🌊",
            people: 234,
            intensity: "hot",
            lat: 40.7069,
            lng: -74.0031,
            neighborhood: "Financial District"
        },
        {
            id: 2,
            name: "Stone Street",
            type: "bars",
            emoji: "🍻",
            people: 156,
            intensity: "warm",
            lat: 40.7044,
            lng: -74.0115,
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
            lat: 40.7234,
            lng: -73.9978,
            neighborhood: "SoHo"
        },

        // East Village / LES
        {
            id: 4,
            name: "Tompkins Square Park",
            type: "park",
            emoji: "🌳",
            people: 67,
            intensity: "cool",
            lat: 40.7264,
            lng: -73.9818,
            neighborhood: "East Village"
        },
        {
            id: 5,
            name: "Alphabet City Bars",
            type: "nightlife",
            emoji: "🎵",
            people: 142,
            intensity: "warm",
            lat: 40.7247,
            lng: -73.9776,
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
            lat: 40.7359,
            lng: -73.9911,
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
            lat: 40.7423,
            lng: -74.0048,
            neighborhood: "Chelsea"
        },
        {
            id: 8,
            name: "The High Line",
            type: "park",
            emoji: "🌿",
            people: 198,
            intensity: "hot",
            lat: 40.7480,
            lng: -74.0048,
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
            lat: 40.7580,
            lng: -73.9855,
            neighborhood: "Midtown"
        },
        {
            id: 10,
            name: "Bryant Park",
            type: "park",
            emoji: "📚",
            people: 134,
            intensity: "warm",
            lat: 40.7536,
            lng: -73.9832,
            neighborhood: "Midtown"
        },
        {
            id: 11,
            name: "Hell's Kitchen",
            type: "restaurants",
            emoji: "🍜",
            people: 156,
            intensity: "warm",
            lat: 40.7645,
            lng: -73.9920,
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
            lat: 40.7794,
            lng: -73.9632,
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
            lat: 40.7723,
            lng: -73.9835,
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
            lat: 40.7829,
            lng: -73.9654,
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
            lat: 40.7213,
            lng: -73.9576,
            neighborhood: "Williamsburg"
        },
        {
            id: 16,
            name: "Smorgasburg",
            type: "food",
            emoji: "🍔",
            people: 189,
            intensity: "warm",
            lat: 40.7208,
            lng: -73.9578,
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
            lat: 40.7024,
            lng: -73.9875,
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
            lat: 40.7447,
            lng: -73.9580,
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
            lat: 40.7691,
            lng: -73.9296,
            neighborhood: "Astoria"
        }
    ],

    // Heat map data points (lat, lng, intensity)
    heatMapData: [
        // Lower Manhattan cluster
        [40.7069, -74.0031, 0.9],  // Financial District
        [40.7044, -74.0115, 0.8],

        // East Village cluster
        [40.7264, -73.9818, 0.7],
        [40.7247, -73.9776, 0.8],

        // Midtown cluster
        [40.7580, -73.9855, 1.0],  // Times Square - hottest
        [40.7536, -73.9832, 0.7],
        [40.7645, -73.9920, 0.7],

        // Central Park area
        [40.7829, -73.9654, 0.8],
        [40.7794, -73.9632, 0.8],

        // Chelsea/Meatpacking
        [40.7423, -74.0048, 0.9],
        [40.7480, -74.0048, 0.8],

        // Williamsburg cluster
        [40.7213, -73.9576, 0.8],
        [40.7208, -73.9578, 0.7],

        // Upper areas
        [40.7723, -73.9835, 0.7],

        // DUMBO/Brooklyn Heights
        [40.7024, -73.9875, 0.8]
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
