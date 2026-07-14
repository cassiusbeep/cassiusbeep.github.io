// helpers to wrap angles into appropriate range
export function wrapAngle(angle) {
    // convert angle to 0-360
    angle %= 360;

    if (angle < 0) {
        angle += 360;
    }

    return angle;
}

export function wrapDelta(delta) {
    // convert angle DIFFERENCE into -180 to 180
    while (delta > 180) {
        delta -= 360;
    }

    while (delta <= -180) {
        delta += 360;
    }

    return delta;
}