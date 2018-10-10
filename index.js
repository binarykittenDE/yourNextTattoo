/**
 * Created by franziskah on 09.10.18.
 */

var Twit = require('twit');
var T = new Twit({
    consumer_key: 'xC1K9rrNtAEwYARUlb45Sef3E',
    consumer_secret: 'T93w6nfneDnwoypMUEbTDDD4k7MbY3tAb1klgAE9PWY6UN6gNj',
    access_token: '1049939418461741056-orvbJF7L4GTVMxjgyLJXAaKKrSkaB9',
    access_token_secret: 'CuFv5vwXauNI8fJrZTEapoGr6W4v8P0Yu6n81cwOqJOLg'
});

const BODY_PARTS = ['Ankle', 'Arm', 'Back', 'Bicep', 'Buttocks', 'Calf', 'Chest', 'Right Ear', 'Left Ear', 'Face', 'Foot',
    'Forearm', 'Full back', 'Full leg', 'Half sleeve', 'Hand', 'Head', 'Hip', 'Knee', 'Leg', 'Lip', 'Lower Back',
    'Mouth', 'Neck', 'Ribcage', 'Shoulder', 'Side', 'Sleeve', 'Sternum', 'Stomach', 'Thigh', 'Torso', 'Upper back', 'Wrist'];

const TATTOO_STYLES = ['Abstract', 'Armband', 'Baroque', 'Bio-mechanical', 'Bio-organic', 'Black & Grey', 'All black', 'Botanical',
    'Cartoon', 'Celtic', 'Chinese', 'Classic', 'Color', 'Couples', 'Dotwork', 'Fantasy', 'Geometric', 'Graffiti', 'Illusion', 'Illustrative',
    'Lettering', 'Linework', 'Macabre', 'Minimalism', 'Neo-Traditional', 'New School', 'Old School', 'Ornamental', 'Portrait', 'Realistic', 'Religious',
    'Quote', 'Sexy', 'Surrealism', 'Traditional', 'Tribal', 'UV light', 'Watercolor', 'White ink'];

const MOTIVES = ['Eagle', 'Knife', 'Heart', 'Skull', 'Rainbow', 'Bird', 'Wolf', 'Dragon', 'Dolphin', 'Star', 'Zodiac', 'Biker',
    'I Love Mom', 'Wind Rose', 'Arrow', 'An Astronaut being abducted by an alien', 'Sonic', 'Cracked Woman Head With A Forest',
    'Tiny Spider-Man Head', 'Black Octopus', 'Cthulhu', 'Dove', 'Wonder Woman', 'Tiger', 'Joker from Batman', 'Panther doing acid',
    'Floating Astronauts Skull', 'Roaring Gorilla Head', 'all seeing eye', 'Burning Church', 'Death Star', 'A little cow',
    'An amazing horse so people would look at it', '20 sided die', 'd20', 'Rainbow', 'Bongo Cat', 'Constellation', 'Planet', 'Galaxy',
    'Compass', 'Butterfly', 'Cross', 'Hexagram', 'Tribal', 'Book', 'Flower', 'Dandelion', 'Wings', 'Snake', 'Fox', 'Joker', 'Salvador Dalí: The Elephants',
    'Hourglass', 'Ship', 'Mountains', 'Abstract Punctuation', 'Mandala', 'Unicorn', 'Football banter', 'Sword', 'Superhero', 'Renew your mind', 'Be Nice!', 'Infinity',
    'Sun', 'Moon', 'Cat', 'Your dead pet', 'Chinese Sign'];

/**
 * Master function to generate all motives required to provide
 * a tattoo result.
 * @param {Array} motives array of motives to choose from.
 */
function getMotives(motives) {
    let motives = motives.slice();
    let selected = [];
    const maxNoOfMotives = 3;
    // Always select at least 1 motive.
    selected.push(getMotive(motives));

    // Selection of subsequent motives is random. Use maxNoOfMotives to
    // determine max length of returned motives.
    for (let i = 0; i < maxNoOfMotives - 1; i++) {
        if (Math.round(Math.random()) === 1) {
            // Removes the last selected motive from the array.
            motives = removeArrayValue(motives, selected[selected.length - 1]);
            selected.push(getMotive(motives));
        }
    }

    while (selected.length < maxNoOfMotives) {
        selected.push('---');
    }

    return selected;
}

/**
 * Returns a possible tattoo motive.
 * Motives are passed in rather than using global array to avoid
 * motive double ups.
 *
 * @param {Array} motives Array of motives to choose from.
 */
function getMotive(motives) {
    return motives[Math.floor(Math.random() * motives.length)];
}

/**
 * Returns a possible tattoo style.
 *
 * @param {Array} tattooStyles Array of tattoo styles to choose from.
 */
function getTattooStyle(tattooStyles) {
    console.log('Im getTatttoStyle');
    let tattooStyles = tattooStyles.slice();
    return tattooStyles[Math.floor(Math.random() * tattooStyles.length)];
}

/**
 * Returns a possible body part.
 *
 * @param {Array} bodyPart Array of body parts to choose from.
 */
function getBodyPart(bodyPart) {
    let bodyPart = bodyPart.slice();
    return bodyPart[Math.floor(Math.random() * bodyPart.length)];
}

/**
 * Removes a value from an array and returns a new array.
 *
 * @param {Array} array  Array of values to be searched.
 * @param {String} value Value to be removed from Array.
 */
function removeArrayValue(array, value) {
    const valueIndex = array.indexOf(value);

    // If value found in array:
    if (valueIndex > -1) {
        array.splice(valueIndex);
    }

    return array;
}


/**
 * Generates a random tattoo design with a relevant color, and 2 motives.
 */
function generateTattoo() {
    const tattooStyle = getTattooStyle(TATTOO_STYLES);
    const motives = getMotives(MOTIVES);
    const getBodyPart = getBodyPart(BODY_PARTS);
    console.log(tattooStyle);
    console.log(motives);
    console.log(getBodyPart);
    //todo twittern
}


//Tweet
T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
    if (err){
        console.log(err);
    }
});
