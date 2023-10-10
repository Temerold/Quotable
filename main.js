class Quote {
    constructor(quote, author) {
        this.quote = quote;
        this.author = author;
    }

    getQuoteElement() {
        const quoteElement = document.createElement("div");
        quoteElement.innerHTML = `<p>“${this.quote}”</p><p>${this.author}</p>`;
        return quoteElement;
    }
}

async function fetchQuotes() {
    const response = await fetch("quotes.csv");
    const text = await response.text();
    return text.split("\n").map((line) => line.split(";"));
}

async function getRandomQuoteObject(quotesArray) {
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    const [quote, author] = quotesArray[randomIndex];
    return new Quote(quote, author);
}

async function writeRandomQuote(quoteContainer, quoteArray) {
    const object = await getRandomQuoteObject(quoteArray);
    if (quoteContainer.firstChild) {
        // If the `quoteContainer` already has a child (`Quote` object), replace the child.
        quoteContainer.replaceChild(object.getQuoteElement(), quoteContainer.firstChild);
    } else {
        // If the `quoteContainer` doesn't have a child (`Quote` object), create a child.
        quoteContainer.appendChild(object.getQuoteElement());
    }
}

async function init() {
    const quoteContainer = document.getElementById("quote-container");
    const quotesArray = await fetchQuotes(quoteContainer);

    await writeRandomQuote(quoteContainer, quotesArray);

    document.getElementById("refresh-button").addEventListener("click", async () => {
        await writeRandomQuote(quoteContainer, quotesArray);
    });
}

init();
