function isPalindromes(str) {
    let lowerStr = str.toLowerCase().replace(/\s+/g, "");

    for (let i = 0; i < lowerStr.length; i++) {
        if (!((lowerStr.charCodeAt(i) >= 97 && lowerStr.charCodeAt(i) <= 122) || (lowerStr.charAt(i) >= 0 && lowerStr.charAt(i) <= 9))) {
            lowerStr = lowerStr.replace(lowerStr.charAt(i), ' ')
        }
    }
    if (lowerStr.trim().length == 0) throw "no strings"
    let newStr = lowerStr.replace(/\s+/g, "");
    for (let i = 0, j = newStr.length - 1; i <= j; i++, j--) {
        if (newStr[i] != newStr[j]) {
            return false;
        }
    }
    return true;
}


let myForm = document.getElementById('myForm');
let phrase = document.getElementById('phrase');
let attempts = document.getElementById('attempts');
let errorDiv = document.getElementById('error');

if (myForm) {
    myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (phrase.value && phrase.value.trim().length != 0) {
            errorDiv.hidden = true;
            try {
                if (isPalindromes(phrase.value)) {
                    let li = document.createElement('li');
                    li.innerHTML = phrase.value;
                    li.setAttribute("class", "is-palindrome");
                    attempts.appendChild(li);
                    myForm.reset();
                    phrase.focus();
                } else {
                    let li = document.createElement('li');
                    li.innerHTML = phrase.value;
                    li.setAttribute("class", "not-palindrome");
                    attempts.appendChild(li);
                    myForm.reset();
                    phrase.focus();
                }
            } catch (e) {
                errorDiv.hidden = false;
                errorDiv.innerHTML = "Input must be alphanumeric characters!!!";
                myForm.reset();
                phrase.focus();
            }
        } else {
            errorDiv.hidden = false;
            errorDiv.innerHTML = "Input can not be empty!!!";
            myForm.reset();
            phrase.focus();

        }
    })
}