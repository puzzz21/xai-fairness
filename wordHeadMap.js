if ($('#layerWord option:selected').text() === "") {
    for (const layer of layers) {
        $('#layerWord').append($("<option />").val(layer).text(layer));
    }
}

if ($('#attentionWord option:selected').text() === "") {
    for (const atten of [...Array(totHeads).keys()]) {
        $('#attentionWord').append($("<option />").val(atten).text(atten));
    }
}

wordShow(params['attention'])

function wordShow(attention) {

    $("#source").html("")
    $("#result").html("")

    for (const [key, value] of Object.entries(attention[0]["src"])) {
        let v = value.replaceAll("▁", "")
        $("#source").append("<span class='words' id='src" + key + "' >" + v + "</span>")
    }

    for (const [key, value] of Object.entries(attention[0]["target"])) {
        let v = value.replaceAll("▁", "")
        $("#result").append("<span class='words' id='res" + key + "' >" + v + "</span>")
    }

    for (const [key, value] of Object.entries(attention[0]["src"])) {
        $("#src" + key).click(function () {
            $('#source').find("*").removeClass("selectedWord");

            if ($("#src" + key).hasClass("selectedWord")) {

                $("#src" + key).removeClass("selectedWord")


                $("#src" + key).css({"margin": "10px", "padding": "10px"})


            } else {
                $("#src" + key).attr("class", "selectedWord")
                srcKey = key
                srcSelect = true
                $("#src" + key).css({"margin": "10px", "padding": "10px"})

                selectRes(attention, key)


            }
        });
    }
}

function selectRes(attention, srcKey) {
    let atten = $('#attentionWord option:selected').text()
    let layer = $('#layerWord option:selected').text()
    for (const [key, value] of Object.entries(attention[0]["target"])) {
        let op = attention[filter]['attn'][layer][atten][srcKey][key]
        $("#res" + key).css({"background-color": "rgba(238, 75, 43, " + parseFloat(op) + ")"})
    }
}
