const example1 = { min: 111111, max: 111112 };
const example2 = { min: 223450, max: 223450 };
const example3 = { min: 123789, max: 123789 };
const example4 = { min: 112233, max: 112233 };
const example5 = { min: 123444, max: 123444 };
const example6 = { min: 111122, max: 111122 };
const input = { min: 153517, max: 630395};

part1 = (a) => {
    let count = 0;
    for (let i = a.min; i <= a.max; i++) {
        if (evalPassword1(i)) count++;
    }
    console.log(count);
};

part2 = (a) => {
    let count = 0;
    for (let i = a.min; i <= a.max; i++) {
        if (evalPassword2(i)) count++;
    }
    console.log(count);
};

evalPassword1 = (x) => {
    let str = x.toString();

    let hasMatchingPair = false;
    for (let i = 0; i < str.length; i++) {
        let a = str.charAt(i);
        let b = str.charAt(i + 1);
        if (!b || !b.length) break;

        let pairMatches = digitsMatch(a, b);
        if (!hasMatchingPair) hasMatchingPair = pairMatches;

        let pairIncreases = digitsIncrease(a, b);
        if (!pairIncreases) return false;
    }

    return hasMatchingPair;
};

evalPassword2 = (x) => {
    let str = x.toString();

    let matchingPairs = [];
    let matchingTrios = [];
    for (let i = 0; i < str.length; i++) {
        let a = str.charAt(i);
        let b = str.charAt(i + 1);
        let c = str.charAt(i + 2);
        if (!b || !b.length) break;

        let pairMatches = digitsMatch(a, b);
        if (pairMatches) matchingPairs.push(a);

        let pairIncreases = digitsIncrease(a, b);
        if (!pairIncreases) return false;

        if (!c || !c.length) continue;
        let trioMatches = digitsMatch(a, b, c);
        if (trioMatches) matchingTrios.push(a);
    }

    let pairsWithoutTrios = [];
    pairsWithoutTrios = matchingPairs.filter(a => {
        return matchingTrios.indexOf(a) === -1;
    });

    return pairsWithoutTrios.length;
};

digitsMatch = (a, b, c) => {
    if (!b) return;
    if (c && c.length) {
        return a === b && b === c && a === c;
    }

    return a === b;
};

digitsIncrease = (a, b) => {
    let x = parseInt(a);
    let y = parseInt(b);
    return y >= x;
};

// part1(example1);
// part1(example2);
// part1(example3);
// part1(input);

part2(example4);
part2(example5);
part2(example6);
part2(input);