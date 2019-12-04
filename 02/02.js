let input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,6,19,2,19,6,23,1,23,5,27,1,9,27,31,1,31,10,35,2,35,9,39,1,5,39,43,2,43,9,47,1,5,47,51,2,51,13,55,1,55,10,59,1,59,10,63,2,9,63,67,1,67,5,71,2,13,71,75,1,75,10,79,1,79,6,83,2,13,83,87,1,87,6,91,1,6,91,95,1,10,95,99,2,99,6,103,1,103,5,107,2,6,107,111,1,10,111,115,1,115,5,119,2,6,119,123,1,123,5,127,2,127,6,131,1,131,5,135,1,2,135,139,1,139,13,0,99,2,0,14,0];

let startPos = 0;
let optCode = 0;
let noun = 0;
let verb = 0;

runIntcode = (arr) => {
    for (let i in arr) {
        let x = arr[i];
        let pos = i - startPos;
        console.log('index ' + i + ' with value ' + x + ' is position ' + pos);
        switch (pos) {
            case 0:
                optCode = x;
                console.log('optCode is now ' + optCode);
                break;
            case 1:
                noun = arr[x];
                console.log('noun is now ' + noun);
                break;
            case 2:
                verb = arr[x];
                console.log('verb is now ' + verb);
                break;
            case 3:
                let calcResult = doCalc(optCode, noun, verb);
                arr[x] = calcResult;
                console.log('calc result is ' + calcResult);

                if (calcResult === 19690720) {
                    console.log('THIS IS THE ANSWER')
                }

                console.log('array is now ' + arr);
                break;
        }

        //if (optCode === 99) resetMemory(1);
        if (pos === 3)  resetMemory(4);

        console.log('----');
    }

    return arr;
};

doCalc = (optCode, val1, val2) => {
    switch (optCode) {
        case 1:
            return val1 + val2;
        case 2:
            return val1 * val2;
        default:
            return;
    }
};

doCalc2 = (arr) => {
    let optCode = arr[0];
    switch (optCode) {
        case 1:
            return val1 + val2;
        case 2:
            return val1 * val2;
        case 99:
            return -1;
        default:
            return;
    }
};

resetMemory = (x) => {
    startPos += x;
    console.log('start position is now ' + startPos);

    optCode = 0;
    noun = 0;
    verb = 0;
};

demo = arr => {
    let answer = runIntcode(arr);
    console.log('the final array is ' + answer);
    return answer;
};

part1 = arr => {
    let errorState = arr => {
        arr[1] = 12;
        arr[2] = 2;
        return arr;
    };

    let answer = runIntcode(errorState(arr));
    console.log(answer[0]);
    return answer;
};

part2 = arr => {
    let answer = runIntcode(arr);
    console.log(answer[0]);
    return answer;
};

//demo([2,4,4,5,99,0]);
part1(input);