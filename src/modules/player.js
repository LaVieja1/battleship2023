import { SHIP_TYPES, randCoords, createFleet } from "./helpers.js";

const Player = (type = 'human') => {
    let fleet = createFleet(SHIP_TYPES);

    const getType = () => type;
    const getFleet = () => fleet;

    return { getType, getFleet };
};

export default Player;