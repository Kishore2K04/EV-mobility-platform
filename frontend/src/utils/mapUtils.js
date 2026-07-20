export async function reverseGeocode(lat, lng) {

    try {

        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        const data = await response.json();

        return data.display_name || `${lat}, ${lng}`;

    } catch (error) {

        return `${lat}, ${lng}`;

    }

}

export async function getRouteInfo(pickup, destination) {

    try {

        const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${destination.lng},${destination.lat}?overview=false`
        );

        const data = await response.json();

        const distanceKm = (data.routes[0].distance / 1000).toFixed(2);
        const etaMinutes = Math.round(data.routes[0].duration / 60);

        return { distanceKm, etaMinutes };

    } catch (error) {

        return { distanceKm: null, etaMinutes: null };

    }

}