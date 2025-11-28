// A simple version based on the backend logic
export const getProximityLabel = (userPin, userZone, donationPin, donationZone) => {
    if (userPin === donationPin) return "Very Near";
    if (userZone && userZone === donationZone && userZone !== "") return "Near";
    return "Far";
};