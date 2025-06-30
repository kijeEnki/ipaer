let xMap;
let arpaMap;

fetch("data/x-sampa.json")
    .then(response => response.json())
    .then(data => {
        xMap = new Map(Object.entries(data));
    });
fetch("data/arpa.json")
    .then(response => response.json())
    .then(data => {
        arpaMap = new Map(Object.entries(data));
    });

function convert() {
    const source = $("#source");
    let ipa = source.val().trim();
    const scheme = $("#scheme").val();
    let conversion;
    const result = $("#result");
    result.empty();

    if (scheme === "x-sampa") { conversion = xMap; }
    else if (scheme === "arpa") { conversion = arpaMap; ipa = ipa.toLowerCase(); }

    for (const [symbol, repl] of conversion) {
        ipa = ipa.replaceAll(symbol, repl);
    }

    result.text(ipa);
}

$(
    () => {
        $("#source").on("input", convert);
        $("#scheme").on("change", convert);
        $("#convert").on("click", convert);
    }
);