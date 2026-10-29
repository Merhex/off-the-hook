/**
 * True while the player is in the middle of a craving. A downloaded app update is applied (with a reload)
 * when the player leaves the app, but never while this is true: some cards send them to another app
 * ("text someone…"), and a reload then would lose the craving the player's in.
 */
export const cravingInProgress = { current: false };
