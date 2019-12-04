const example1 = [1,0,0,0,99];
const example2 = [2,3,0,3,99];
const example3 = [2,4,4,5,99,0];
const example4 = [1,1,1,4,99,5,6,0,99];
const puzzleInput = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,6,19,2,19,6,23,1,23,5,27,1,9,27,31,1,31,10,35,2,35,9,39,1,5,39,43,2,43,9,47,1,5,47,51,2,51,13,55,1,55,10,59,1,59,10,63,2,9,63,67,1,67,5,71,2,13,71,75,1,75,10,79,1,79,6,83,2,13,83,87,1,87,6,91,1,6,91,95,1,10,95,99,2,99,6,103,1,103,5,107,2,6,107,111,1,10,111,115,1,115,5,119,2,6,119,123,1,123,5,127,2,127,6,131,1,131,5,135,1,2,135,139,1,139,13,0,99,2,0,14,0];

runIntcode = (input, noun, verb) => {
    let memory = [].concat(input);

    if (noun && verb) {
        memory[1] = noun;
        memory[2] = verb;
        console.log('\n -- NOUN ' + noun + ' VERB ' + verb + ' -- ');
    }

    //console.log('the starting array is ' + input);

    let instructionStart = 0;
    let optCode = 0;
    let param1 = 0;
    let param2 = 0;

    memory.forEach((x, address) => {
        let instructionPointer = address - instructionStart;
        //console.log('index ' + address + ' with value ' + x + ' is position ' + instructionPointer);
        switch (instructionPointer) {
            case 0:
                optCode = x;
                break;
            case 1:
                param1 = memory[x];
                break;
            case 2:
                param2 = memory[x];
                break;
            case 3:
                let calcResult = doCalc(optCode, param1, param2);

                if (calcResult < 0) {
                    // Less than 0 means that optcode 99 or unknown was provided.
                    console.log('PROGRAM ENDED: address ' + address + ' optcode ' + optCode + ' param1 ' + param1 + ' param2 ' + param2);
                    return memory;
                }

                memory[x] = calcResult;

                instructionStart += 4;
                optCode = 0;
                param1 = 0;
                param2 = 0;

                break;
        }
    });

    return memory;
};

doCalc = (optCode, x, y) => {
    switch (optCode) {
        case 1:
            return x + y;
        case 2:
            return x * y;
        case 99:
            console.log('Optcode 99');
            return -1;
        default:
            console.log('Optcode ' + optCode);
            return -2;
    }
};

part1 = (input, noun, verb) => {
    console.log('\n-- PART ONE --');
    let res = runIntcode(input, noun, verb);
    let answer = res[0];

    console.log('the final array is ' + res);
    console.log('the first item is ' + answer);
    return answer;
};

part2 = (arr) => {
    console.log('\n-- PART TWO --');
    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb < 99; verb++) {
            let res = runIntcode(arr, noun, verb);
            if (res[0] === 19690720) {
                let answer = (100 * noun) + verb;
                console.log('\nTHIS IS THE ANSWER: ' + answer);
                return answer;
            }
        }
    }

    console.log('NO ANSWER FOUND');
};

part1(example1);
part1(example2);
part1(example3);
part1(example4);
part1(puzzleInput, 12, 2);
part2(puzzleInput);