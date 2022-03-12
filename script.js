$(document).ready(function() {
    $(document).on('change', 'input, select', function(e) {
        $('[name=result] > *').remove();
    });
    $(document).on('click', 'span.add', function(e) {
        $('[name=result] > *').remove();
        $('<input type="text" name="uname[]" placeholder="username_' + ($('input[name="uname[]"]').length + 1) + '"/>').insertBefore('.add-uname');
    });
    $(document).on('click', 'button[type=submit]', function() {
        $('[name=result] > *').remove();
        var target = parseInt($('#target').val());
        var LS = $('#loading_status').val();
        var unames = $('input[name="uname[]"]');
        var unames_array = unames.map((key, uname_field) => {
            var uname = $(uname_field).val().trim();
            if (uname.length > 0) {
                if (/"|\^|'/.test(uname)) {
                    alert("Invalid charecter contains at " + $(uname_field).attr("placeholder") + "\nAction: username not included.");
                } else {
                    return '"' + uname + '"';
                }
            }
        }).get().join(', ');
        if (target > 0) {
            if (LS == "true" || LS == "false") {
                if (unames.length > 1 && unames_array < 1) {
                    alert('No excluded usernames found.\nHowever, you can also continue without excluding usernames.');
                }
                var HTML = "<label for=\"generated-code\">Copy this code and paste into console</label>" +
                    "<textarea class=\"genrated-code\" style=\"opacity: 0;\" readonly>" +
                    "var target = " + target + ";             // Enter the number of connections iteration\n" +
                    "var loading_status = " + LS + "; // See loading status in the console\n" +
                    "var exclude = [" + unames_array + "];\n\n" +

                    "var process = sl = x = i = 0;\n" +
                    "var connects = document.querySelectorAll('#main ul > li.mn-connection-card');\n" +
                    "var msg = {\n" +
                    "    start:  \"--------------------| Execution started |--------------------\",\n" +
                    "    end:    \"---------------------| Execution ended |---------------------\",\n" +
                    "    NAc:    \"----------------| No connections available |-----------------\",\n" +
                    "    trgF:   \"-----------| Target value must be greater than 0 |-----------\",\n" +
                    "    trgS:   \"----------------| Target has been completed |----------------\"\n" +
                    "};\n\n" +

                    "if (sl == 0) console.log(msg.start);\n" +
                    "if (connects.length > 0){\n" +
                    "    if (target > 0){\n" +
                    "        while (x++ < target) {\n" +
                    "            setTimeout(async () => {\n" +
                    "                connects = document.querySelectorAll('#main ul > li.mn-connection-card');\n" +
                    "                var connect = connects[i];\n" +
                    "                var uname = connect.querySelectorAll('a')[0].getAttribute('href');\n" +
                    "                    uname = decodeURI(uname.split(\"in/\")[1].replaceAll('/', ''));\n" +
                    "                var fname = connect.getElementsByClassName('mn-connection-card__name')[0].innerText;\n" +

                    "                sl++;\n" +
                    "                if (exclude.length > 0 && exclude.includes(uname) === true) {\n" +
                    "                    console.log('[' + sl + '] => Action not taken for \"' + fname + '\"'); i++;\n" +
                    "                } else {\n" +
                    "                    connect.querySelectorAll('button[type=button].mn-connection-card__dropdown-trigger')[0].click();\n" +
                    "                    setTimeout(() => {\n" +
                    "                        var connRmItem = connect.querySelectorAll('.artdeco-dropdown__item > button[type=button]');\n" +
                    "                        if (connRmItem.length > 0) {\n" +
                    "                            connRmItem[0].click();\n" +
                    "                            setTimeout(async () => {\n" +
                    "                                var prevNds = connects.length;\n" +
                    "                                await document.querySelectorAll('#artdeco-modal-outlet button.artdeco-button--primary')[0].click();\n" +
                    "                                console.log('[' + sl + '] => Connection removed with \"' + fname + '\"');\n" +
                    "                                prevNds--;\n" +
                    "                                if (connects.length > prevNds && loading_status === true){\n" +
                    "                                    var items = connects.length - prevNds;\n" +
                    "                                    var snpl = (items>1)?'s':'';\n" +
                    "                                    console.log('--------------------| ' + items +' item' +snpl+ ' loaded... |--------------------');\n" +
                    "                                }\n" +
                    "                            }, 050);\n" +
                    "                        }\n" +
                    "                        setTimeout(() => {\n" +
                    "                            if((connects.length-1) == 0){\n" +
                    "                                console.log(msg.NAc +'\\n'+ msg.end);\n" +
                    "                            }else if (sl >= target) {\n" +
                    "                                console.log(msg.trgS +'\\n'+ msg.end);\n" +
                    "                            }\n" +
                    "                        }, 0100);\n" +
                    "                    }, 0500);\n" +
                    "                }\n" +
                    "            }, (1000 * process++));\n" +
                    "        }\n" +
                    "    }else{\n" +
                    "        console.log(msg.trgF +'\\n'+ msg.end);\n" +
                    "    }\n" +
                    "} else {\n" +
                    "    console.log(msg.NAc +'\\n'+ msg.end);\n" +
                    "}\n" +
                    '</textarea>';

            } else {
                alert("Data manipulation detected. Reload the page to retry.");
            }
        } else {
            alert($('label[for=target]').text() + " must be at least " + $('input#target').attr('min'));
        }

        $('div[name=result]').append(HTML).promise().done((code) => {
            setTimeout(() => { code.children('textarea').addClass('expand'); }, 100);
        });


    });
});