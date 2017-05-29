'use strict';

function UrlGlob(patternUrl) {
	var patternUrlTokens = [];
	var validateUrl = function(url) {
		if(!url.startsWith('http://') && !url.startsWith('https://')) {
			return false;
		}
		var startPosition = 0;
		if(url.startsWith('http://')) {
			startPosition = 7;
		}else {
			startPosition = 8;
		}
		var noProtocolUrl = url.substring(startPosition);
		var urlParts = noProtocolUrl.split('/');
		return (urlParts.length > 0);
	};
	var tokenize = function(url) {
		var startPosition = 0;
		if(url.startsWith('http://')) {
			startPosition = 7;
		}else if(url.startsWith('https://')) {
			startPosition = 8;
		}
		var noProtocolUrl = url.substring(startPosition);
		var urlParts = noProtocolUrl.split('/');
		return urlParts;
	};

	var checkEqualsWithGlobing = function(patternString, actualString) {

		var patternStringTokens = [];
		var current = '';
		for(var x = 0 ; x < patternString.length ; x ++ ) {
			if(patternString[x] === '*'){
				patternStringTokens.push(current);
				patternStringTokens.push('*');
				current = '';
			}else {
				current += patternString[x];
			}
		}
		if(current !== ''){
			patternStringTokens.push(current);
		}

		var j = 0 ;
		for(var i = 0 ; i < patternStringTokens.length; i ++ ) {
			if(patternStringTokens[i] === '*'){
				var isMatched = false;
				do{
					if(i + 1 === patternStringTokens.length){
						return true;
					}
					while(j < actualString.length && actualString[j] !== patternStringTokens[i + 1][0]){
						j++;
					}
					if(actualString.substring(j,j + patternStringTokens[i + 1].length) === patternStringTokens[i + 1]){
						j += patternStringTokens[i + 1].length;
						i++;
						isMatched = true;
						break;
					}
					j++;
				}while(j < actualString.length );
				
				if(!isMatched){
					return false;
				}
				
			}else {
				if(patternStringTokens[i] !== actualString.substring(j,j + patternStringTokens[i].length)){
					return false;
				}
				j += patternStringTokens[i].length;
			}
		}
		if(j !== actualString.length){
			return false;
		}
		return true;
	};
	var removeEmptyStrings = function(array) {
		for(var x = 0;x < array.length ; x++) {
			if(array[x].length === 0){
				array.splice(x,1);
				x--;
			}
		}
	};
	
	patternUrlTokens = tokenize(patternUrl.trim());
	removeEmptyStrings(patternUrlTokens);
	this.match = function(url) {

		if(!validateUrl(url.trim())) {
			throw new Error('Invalid pattern url');
		}
		var urlTokens = tokenize(url.trim());
		removeEmptyStrings(urlTokens);
		var i = 0 , j = 0 ;
		while(i < patternUrlTokens.length && j < urlTokens.length){
			if(patternUrlTokens[i] === '*' || patternUrlTokens[i] === urlTokens[j]){
				i++;
				j++;
			}else if(patternUrlTokens[i] === '**'){
				if(i + 1 === patternUrlTokens.length) {
					return true;
				}
				while(j < urlTokens.length  && 
				 (!checkEqualsWithGlobing(patternUrlTokens[i + 1], urlTokens[j]))) j++;
						
				i++;
			}else if(patternUrlTokens[i] !== urlTokens[j]) {
				if(!checkEqualsWithGlobing(patternUrlTokens[i], urlTokens[j])){
					return false;
				}
				i++;
				j++;
			}
			
		}
		if(i !== patternUrlTokens.length || j !== urlTokens.length){
			return false;
		}
		return true;	
	};

}


module.exports  =  UrlGlob;