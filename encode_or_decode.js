var output = [];
var decodedarray = [];
var encodedarray = [];

var fs = require('fs'),
readline = require('readline'),
stream = require('stream');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (str) => new Promise(resolve => rl.question(str, resolve));

const steps = {
  start: async () => {
    return steps.confirmChoice();
  },
  confirmChoice: async () => {
    const confirmChoice = await question("Would you like to encode or decode? Please type encode/decode: ");
    if (confirmChoice === 'encode') { return steps.encodeMessage(); }
    if (confirmChoice === 'decode') { return steps.decodeMessage(); }
    console.log('No worries, have a nice day');
    return steps.end();
  },
  encodeMessage: async () => {
    EncodeText();
  },
  decodeMessage: async () => {
	DecodeList();
  },
  end: async () => {
    rl.close();
  },
};

steps.start();



function DecodeList(){
	var nums = [];

	rl.question('enter numbers separated by space: ', function(input) {
		var rex = /(\s*[0-9]+)+/;
		if (rex.test(input) == true) {
			let arrayOfInputs = input.trim().split(' ');
			arrayOfInputs.map(input => nums.push(input));
			rl.close();
		}
		else {
			console.log('input numbers only');
			rl.close();
		}

	});

	rl.on("close", function() {
	decodeArray(nums);
	});
}

function EncodeText() {
	var TextEncoded = [];
	

        rl.question('enter text to encode: ', function(input) {
            TextEncoded.push(input);
			rl.close();
        });

        rl.on('close', function(){
            encodeArray(TextEncoded);
	
        })
}

///////////////CODE TO DECODE/////////////// 


function decodeArray(ArrayVar){
	const arrayLength = ArrayVar.length;
		var fullarray = [];
		for (var i=0; i< arrayLength ;i++) { 
			changeToArrayD(ArrayVar[i]);
		}    
		var partial = decodedarray.join('');
		console.log(partial);	
}

function changeToArrayD(decimal) {
	let rem, i = 1, step = 1;
	
	while (decimal != 0) {
		
		rem = decimal % 2;
		decimal = parseInt(decimal/2);
		output.unshift(rem);
		i = i * 10;
	}

	decodeMessage(padToThirtyTwo(output));
	
}

function padToThirtyTwo(arrayd) {
	if ((arrayd.length) < 32) {
		var spaces = 32 - (arrayd.length);
		for (var i = 1; i <= spaces; i++) {
		arrayd.unshift(0);
		}
	}
	return arrayd;
}



function decodeMessage(arrayEncoded) {
	var arrayoutput = [];
	var array1 = arrayEncoded.splice(0,8);
	var array2 = arrayEncoded.splice(0,8);
	var array3 = arrayEncoded.splice(0,8);
	var array4 = arrayEncoded.splice(0,8);
	
	
	for (var i = 0; i < 4; i++){
			arrayoutput.push(array1[i]);
			arrayoutput.push(array1[i+4]);
			arrayoutput.push(array2[i]);
			arrayoutput.push(array2[i+4]);
			arrayoutput.push(array3[i]);
			arrayoutput.push(array3[i+4]);
			arrayoutput.push(array4[i]);
			arrayoutput.push(array4[i+4]);
	}
	
	binToChar(arrayoutput);

}


function binToChar(arrayb){
	var arr1 = arrayb.splice(0,8);
	var arr2 = arrayb.splice(0,8);
	var arr3 = arrayb.splice(0,8);
	var arr4 = arrayb.splice(0,8);
	
	
	decodedarray.push(convertToChar(arr4));
	decodedarray.push(convertToChar(arr3));
	decodedarray.push(convertToChar(arr2));
	decodedarray.push(convertToChar(arr1));
	

}

function convertToChar(arrc) {
	var sum = 0;
	for (var i=0; i<arrc.length;i++){
		if ((arrc[i]) == 1) {
			sum += 2**(7 - i);
		}
		else {
			sum += 0;
		}
	}

	return String.fromCharCode(sum);
	
}

///////////////CODE TO ENCODE/////////////////

function encodeArray(ArrayVar){

	var arraye = ArrayVar[0];
	var arraymessage = arraye.match(/.{1,4}/g);

	for (var i = 0 ; i < arraymessage.length ; i++) {
		setArrays(arraymessage[i]);
			
	}
		
	console.log(encodedarray);
		
		
} 

function padToEight(arrayc) {
	if ((arrayc.length) < 8) {
		var spaces = 8 - (arrayc.length);
		for (var i = 1; i <= spaces; i++) {
		arrayc.unshift(0);
		}
	}
}

function changeToArray(decimal) {
	let rem, i = 1, step = 1;
	
	while (decimal != 0) {
		
		rem = decimal % 2;
		decimal = parseInt(decimal/2);
		output.unshift(rem);
		i = i * 10;
	}

	padToEight(output);
	
}

function setArrays(chunk) {
	var rawMessage = [];
	const strlength = chunk.length;


	if (strlength > 3) {
		
		changeToArray(chunk.charCodeAt(0));
			for (var i of output) {
				rawMessage.push(i);
			}
		output.splice(0, output.length);
			
		changeToArray(chunk.charCodeAt(1));
			for (var i of output) {
				rawMessage.push(i);
			}
		output.splice(0, output.length);
	
		changeToArray(chunk.charCodeAt(2));
			for (var i of output) {
				rawMessage.push(i);
			}
		output.splice(0, output.length);	
	
		changeToArray(chunk.charCodeAt(3));
			for (var i of output) {
				rawMessage.push(i);
			}
		output.splice(0, output.length);
		scrambleMessage(rawMessage);
	
	}
	else {
		
		if (strlength > 2) {
			changeToArray(chunk.charCodeAt(0));
			for (var i of output) {
				rawMessage.push(i);
			}
			output.splice(0, output.length);
			
			changeToArray(chunk.charCodeAt(1));
			for (var i of output) {
					rawMessage.push(i);
			}
			output.splice(0, output.length);
	
			changeToArray(chunk.charCodeAt(2));
			for (var i of output) {
					rawMessage.push(i);
			}
			output.splice(0, output.length);	
	

			for (var i=0; i< 8;i++) {
				rawMessage.push(0);
			}
			output.splice(0, output.length);
			scrambleMessage(rawMessage);
			
		}
		else {
			if (strlength > 1) {
				changeToArray(chunk.charCodeAt(0));
				for (var i of output) {
					rawMessage.push(i);
				}
				output.splice(0, output.length);
			
				changeToArray(chunk.charCodeAt(1));
				for (var i of output) {
					rawMessage.push(i);
				}
				output.splice(0, output.length);
	
				for (var i=0; i< 8;i++) {
					rawMessage.push(0);
				}
	
				for (var i=0; i< 8;i++) {
					rawMessage.push(0);
				}
						scrambleMessage(rawMessage);

			}
			else {
					changeToArray(chunk.charCodeAt(0));
					for (var i of output) {
						rawMessage.push(i);
					}
				
					output.splice(0, output.length);
			
					for (var i=0; i< 8;i++) {
						rawMessage.push(0);
					}
				
					for (var i=0; i< 8;i++) {
						rawMessage.push(0);
					}
				
					for (var i=0; i< 8;i++) {
						rawMessage.push(0);
					}
					scrambleMessage(rawMessage);

				
			}
			
		}
		
	}
}


function scrambleMessage(rawArray) {
	var arrayoutput = []; 

	var array1 = rawArray.splice(0,8);
	var array2 = rawArray.splice(0,8);
	var array3 = rawArray.splice(0,8);
	var array4 = rawArray.splice(0,8);

	for (var i = 0; i < 8; i++){
			arrayoutput.push(array4[i]);	
			arrayoutput.push(array3[i]);
			arrayoutput.push(array2[i]);
			arrayoutput.push(array1[i]);
	}
	
	arrayToDecimal(arrayoutput);	

}



function arrayToDecimal(bin) {
	var num = bin.join('');
	var digit = parseInt(num, 2);
	encodedarray.push(digit);
}   