/**
 * Created by franziskah on 09.10.18.
 */

let TwitterPackage = require('twitter');

let Bot = new TwitterPackage({
 consumer_key: process.env.BOT_CONSUMER_KEY,
 consumer_secret: process.env.BOT_CONSUMER_SECRET,
 access_token: process.env.BOT_ACCESS_TOKEN,
 access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
 });


const BODY_PARTS = ['ankle', 'arm', 'back', 'bicep', 'buttocks', 'calf', 'chest', 'right ear', 'left ear', 'face', 'foot',
    'forearm', 'full back', 'full leg', 'half sleeve', 'hand', 'head', 'hip', 'knee', 'leg', 'lip', 'lower back',
    'mouth', 'neck', 'ribcage', 'shoulder', 'side', 'sleeve', 'sternum', 'stomach', 'thigh', 'torso', 'upper back', 'wrist'];

const TATTOO_STYLES = ['abstract', 'armband', 'baroque', 'bio-mechanical', 'bio-organic', 'black & grey', 'all black', 'botanical',
    'cartoon', 'celtic', 'chinese', 'classic', 'color', 'couples', 'dotwork', 'fantasy', 'geometric', 'graffiti', 'illusion', 'illustrative',
    'lettering', 'linework', 'macabre', 'minimalism', 'neo-traditional', 'new School', 'old school', 'ornamental', 'realistic', 'religious',
    'quote', 'sexy', 'surrealism', 'traditional', 'tribal', 'UV light', 'watercolor', 'white ink'];

const MOTIVES = ['eagle', 'knife', 'heart', 'skull', 'rainbow', 'bird', 'wolf', 'dragon', 'dolphin', 'star', 'zodiacsign', 'biker',
    'I-Love-Mom-Banner', 'wind rose', 'arrow', 'astronaut being abducted by an alien', 'sonic',
    'tiny Spider-Man head', 'black octopus', 'Cthulhu', 'dove', 'Wonder Woman', 'tiger', 'Joker from Batman', 'panther doing acid',
    'floating astronauts skull', 'roaring gorilla head', 'all seeing eye', 'burning church', 'death Star', 'little' +
    ' cow',
    'amazing horse, so people would look at it', '20 sided die', 'd20', 'rainbow', 'bongo playig cat', 'constellation', 'planet', 'galaxy',
    'compass', 'butterfly', 'cross', 'hexagram', 'tribal', 'book', 'flower', 'dandelion', 'wings', 'snake', 'fox', 'joker', 'Salvador Dalís "The Elephants"',
    'hourglass', 'ship', 'mountains', 'mandala', 'unicorn', 'football banter', 'sword', 'superhero', 'Be-Nice-Speech-Bubble', 'infinity sign',
    'sun', 'moon', 'cat', 'dead pet of your past', 'chinese sign', 'star', 'table', 'chair', 'fridge', 'plant', 'palm tree', 'ocean', 'towel', 'snake', 'cobra', 'Jesus',
    'Harry Potter lightning', 'masks', 'Spyro', 'portrait of your dad', 'portrait of your mum', 'portrait of your' +
    ' firstborn', 'portrait of yourself', 'eye', 'hentai motive', 'anime figure', 'comic figure', 'bart simpson', 'lisa simpson', 'female power', 'shell',
    'bone', 'foot', 'hand', 'goddess', 'god', 'indian god', 'buddha', 'ace', 'LGBT* motive', 'cross', 'country', 'flag', 'butterfly', 'fish', 'rose', 'number 1', 'monster,',
    'monstera', 'Mickey Mouse', 'Minney Mouse', 'Garfield', 'crystal', 'tree', 'flame', 'icecube', 'rapper', 'DJ', 'popstar', 'politician', 'lion', 'panther', 'acovado',
    'banana', 'flying bird', 'car', 'car brand logo', 'logo', 'cocktail', 'whine glass', 'wine bottle', 'alcohol' +
    ' bottle', 'name', 'name of your ex', 'superhero'];

const MAX_AMOUNT_OF_MOTIVES = 3;

const HASHTAGS = '#yourNextTattoo #tattoo #tattoos #tat #ink #inked #tattooed #tattooIdea #tattooIdeas';

/**
 *
 * @returns {Array} possible motives
 */
function getMotives() {
    //choose 1 to 3
    let motiveAmount = randomIntFromInterval(1, MAX_AMOUNT_OF_MOTIVES);
    let chosenMotives = [];
    let newMotive;

    for (let i = 0; i < motiveAmount; i++) {
        do {
            newMotive = (MOTIVES[randomIntFromInterval(1, MOTIVES.length)]);
        } while (chosenMotives.includes(newMotive));

        chosenMotives.push(newMotive);
    }
    return chosenMotives;
}

//including min and max
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Returns a possible tattoo style.
 */
function getTattooStyle() {
    return TATTOO_STYLES[randomIntFromInterval(1, TATTOO_STYLES.length)];
}

/**
 * Returns a possible body part.
 */
function getBodyPart() {
    return BODY_PARTS[randomIntFromInterval(1, BODY_PARTS.length)];
}

/**
 * Generates a random tattoo design with a relevant color, and 2 motives.
 */
function generateTattoo() {
    const tattooStyle = getTattooStyle();
    const motives = getMotives();
    const bodyPart = getBodyPart();

    return 'Your next tattoo should be a/an ' + tattooStyle + ' tattoo that shows a/an ' + motives.join(' and ') + ' on' +
        ' your ' + bodyPart + ' ' + HASHTAGS;
}

Bot.post('statuses/update', {status: generateTattoo()}, function (error, tweet, response) {
    if (error) {
        console.log(error);
    }
    console.log(tweet);
    console.log(response);
});


