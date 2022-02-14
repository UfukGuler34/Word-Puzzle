var keyboard_letter = document.querySelectorAll('#keyboard_letter');
var div_puzzle = document.querySelector('.puzzle');
var div_log_letters = document.querySelector('.log-letters');
var malmal
var h2_hidden_word
var counter = 0
var dene = 0


var showHiddenLetter = (i) => {
    gg = document.querySelectorAll(".letter")
    for (var j = 0; j < gg.length; j++) {
        if (gg[j].textContent == malmal[i]) {
            gg[j].style.visibility = 'visible'
            dene += 1;
        }
    }
    if (dene == gg.length) {
        counter += 1;
        dene = 0;
        setTimeout(function () {
            while (div_puzzle.firstChild) {
                div_puzzle.removeChild(div_puzzle.lastChild);
            }

            kelimeAl(counter)
        }, 2000)

    }
    console.log(dene)
}

var checkWordWithLetter = (get, malmal) => {
    for (var i = 0; i < malmal.length; i++) {
        if (malmal[i] == get) {
            showHiddenLetter(i);
        }
    }
}



// Display the Word on the Screen 

var display_hidden_word = (hidden_word) => {
    for (var i = 0; i < hidden_word.length - 1; i++) {
        h2_hidden_word = document.createElement('h2');
        h2_hidden_word.setAttribute('class', "letter")
        h2_hidden_word.textContent = hidden_word[i]
        div_puzzle.appendChild(h2_hidden_word)
    }
}

var getline = (lines, counter) => {
    var hidden_word = lines[counter]
    malmal = hidden_word
    display_hidden_word(hidden_word)

};


// Display the Logged Letters

var showKeyboardLetter = (get) => {
    var h3_keyboardLetter = document.createElement('h3');
    h3_keyboardLetter.setAttribute('class', "log_letter")
    h3_keyboardLetter.textContent = get
    div_log_letters.appendChild(h3_keyboardLetter)

    if (malmal != undefined) {
        checkWordWithLetter(get, malmal)
    }
}

// Get Key from Keyboard

for (let i = 0; i < keyboard_letter.length; i++) {
    keyboard_letter[i].addEventListener("click", function (e) {
        e.preventDefault();
        var get = keyboard_letter[i].textContent
        showKeyboardLetter(get)
    });
};




// Get Words from Dataset
var kelimeAl = (counter) => {
    fetch("./words.txt")
        .then(response => response.text())
        .then((data) => data.split("\n"))
        .then((lines) => getline(lines, counter))
        .catch((err) => console.log(err));
}


kelimeAl(counter) 