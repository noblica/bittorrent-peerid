"use strict";
exports.__esModule = true;
exports.isAzStyle = function (peerId) {
    if (peerId[0] !== "-") {
        return false;
    }
    if (peerId[7] === "-") {
        return true;
    }
    /**
     * Hack for FlashGet - it doesn't use the trailing dash.
     * Also, LH-ABC has strayed into "forgetting about the delimiter" territory.
     *
     * In fact, the code to generate a peer ID for LH-ABC is based on BitTornado's,
     * yet tries to give an Az style peer ID... oh dear.
     *
     * BT Next Evolution seems to be in the same boat as well.
     *
     * KTorrent 3 appears to use a dash rather than a final character.
     */
    var shorthand = peerId.substring(1, 3);
    var validSubstrings = ["FG", "LH", "NE", "KT", "SP"];
    return validSubstrings.indexOf(shorthand) > -1;
};
/**
 * Checking whether a peer ID is Shadow style or not is a bit tricky.
 *
 * The BitTornado peer ID convention code is explained here:
 *   http://forums.degreez.net/viewtopic.php?t=7070
 *
 * The main thing we are interested in is the first six characters.
 * Although the other characters are base64 characters, there's no
 * guarantee that other clients which follow that style will follow
 * that convention (though the fact that some of these clients use
 * BitTornado in the core does blur the lines a bit between what is
 * "style" and what is just common across clients).
 *
 * So if we base it on the version number information, there's another
 * problem - there isn't the use of absolute delimiters (no fixed dash
 * character, for example).
 *
 * There are various things we can do to determine how likely the peer
 * ID is to be of that style, but for now, I'll keep it to a relatively
 * simple check.
 *
 * We'll assume that no client uses the fifth version digit, so we'll
 * expect a dash. We'll also assume that no client has reached version 10
 * yet, so we expect the first two characters to be "letter,digit".
 *
 * We've seen some clients which don't appear to contain any version
 * information, so we need to allow for that.
 */
exports.isShadowStyle = function (peerId) {
    if (peerId[5] !== "-" ||
        !isLetter(peerId[0]) ||
        !(isDigit(peerId[1]) || peerId[1] === "-")) {
        return false;
    }
    // Find where the version number string ends.
    var lastVersionNumberIndex = 4;
    for (; lastVersionNumberIndex > 0; lastVersionNumberIndex -= 1) {
        if (peerId[lastVersionNumberIndex] !== "-")
            break;
    }
    // For each digit in the version string, check if it is a valid version identifier.
    for (var i = 1; i <= lastVersionNumberIndex; i++) {
        var c = peerId[i];
        if (c === "-" || isAlphaNumeric(c) === null) {
            return false;
        }
    }
    return true;
};
exports.isMainlineStyle = function (peerId) {
    /**
     * One of the following styles will be used:
     *   Mx-y-z--
     *   Mx-yy-z-
     */
    return (peerId[2] === "-" &&
        peerId[7] === "-" &&
        (peerId[4] === "-" || peerId[5] === "-"));
};
exports.isPossibleSpoofClient = function (peerId) {
    return peerId.endsWith("UDP0") || peerId.endsWith("HTTPBT");
};
exports.decodeNumericValueOfByte = function (b, minDigits) {
    if (minDigits === void 0) { minDigits = 0; }
    var result = "" + (b & 0xff);
    while (result.length < minDigits) {
        result = "0" + result;
    }
    return result;
};
exports.getAzStyleVersionNumber = function (peerId, version) {
    if (typeof version === "function") {
        return version(peerId);
    }
    return null;
};
exports.decodeBitSpiritClient = function (peerId, buffer) {
    if (peerId.substring(2, 4) !== "BS") {
        return null;
    }
    var version = "" + buffer[1];
    if (version === "0") {
        version = 1;
    }
    console.log("BUFFER ", buffer[1], typeof buffer[1]);
    return {
        client: "BitSpirit",
        version: "" + buffer[1] === "0" ? 1 : "" + buffer[1]
    };
};
exports.decodeBitCometClient = function (peerId, buffer) {
    var modName = "";
    var peerIdFirst4Chars = peerId.substr(0, 4);
    switch (peerIdFirst4Chars) {
        case "exbc":
            modName = "";
            break;
        case "FUTB":
            modName = "(Solidox Mod)";
            break;
        case "xUTB":
            modName = "(Mod 2)";
            break;
        default:
            return null;
    }
    var isBitlord = peerId.substring(6, 10) === "LORD";
    // Older versions of BitLord are of the form x.yy, whereas new versions (1 and onwards),
    // are of the form x.y. BitComet is of the form x.yy
    var clientName = isBitlord ? "BitLord" : "BitComet";
    var majVersion = exports.decodeNumericValueOfByte(buffer[4]);
    var minVersionLength = isBitlord && majVersion !== "0" ? 1 : 2;
    return {
        client: "" + clientName + (modName ? " " + modName : ""),
        version: majVersion + "." + exports.decodeNumericValueOfByte(buffer[5], minVersionLength)
    };
};
exports.identifyAwkwardClient = function (buffer) {
    var firstNonZeroIndex = buffer.findIndex(function (bufferItem) { return bufferItem > 0; });
    firstNonZeroIndex = firstNonZeroIndex > -1 ? firstNonZeroIndex : 20;
    // Shareaza check
    if (firstNonZeroIndex === 0) {
        var isShareaza = true;
        for (var i = 0; i < 16; ++i) {
            if (buffer[i] === 0) {
                isShareaza = false;
                break;
            }
        }
        if (isShareaza) {
            for (var i = 16; i < 20; ++i) {
                if (buffer[i] !== (buffer[i % 16] ^ buffer[15 - (i % 16)])) {
                    isShareaza = false;
                    break;
                }
            }
            if (isShareaza)
                return { client: "Shareaza" };
        }
    }
    if (firstNonZeroIndex === 9 &&
        buffer[9] === 3 &&
        buffer[10] === 3 &&
        buffer[11] === 3) {
        return { client: "I2PSnark" };
    }
    if (firstNonZeroIndex === 12 && buffer[12] === 97 && buffer[13] === 97) {
        return { client: "Experimental", version: "3.2.1b2" };
    }
    if (firstNonZeroIndex === 12 && buffer[12] === 0 && buffer[13] === 0) {
        return { client: "Experimental", version: "3.1" };
    }
    if (firstNonZeroIndex === 12) {
        return { client: "Mainline" };
    }
    return null;
};
//
// Private helper functions for the public utility functions
//
function isDigit(s) {
    var code = s.charCodeAt(0);
    return code >= "0".charCodeAt(0) && code <= "9".charCodeAt(0);
}
function isLetter(s) {
    var code = s.toLowerCase().charCodeAt(0);
    return code >= "a".charCodeAt(0) && code <= "z".charCodeAt(0);
}
function isAlphaNumeric(s) {
    return isDigit(s) || isLetter(s) || s === ".";
}
