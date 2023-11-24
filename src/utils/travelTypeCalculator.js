function determineDominantTravelType(choices) {
    const typeCounts = {};
    choices.forEach(choice => {
        if (!typeCounts[choice]) {
            typeCounts[choice] = 1;
        } else {
            typeCounts[choice]++;
        }
    });

    return Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b);
}

async function updateUserTravelType(userId, travelType) {
    try {
        await User.findByIdAndUpdate(userId, { travelType });
    } catch (err) {
        console.error("Error updating user's travel type", err);
    }
}

module.exports = {
    determineDominantTravelType, updateUserTravelType
};