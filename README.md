<h1><img width="25px" src="https://raw.githubusercontent.com/naiemofficial/Linkedin-bulk-connection-remover/main/linkedin.png"/> Linkedin-bulk-connection-remover</h1>
<p align="center"><img align="center" width="600px" src="https://user-images.githubusercontent.com/34242279/158029998-e3703467-b980-4ec2-b223-ec9d8e796ebf.png" alt="Linkedin remove connections - (image source: cdn.snov.io)"/></p>
The script is an easiest solution to remove multiple linked connections even with excluding linked users as your wish. You can put the excluded usernames through GUI and manual process.
<br><br>
<ul>
	<li>Enter the number of connections iteration to the <code>target</code> variable. <br> <sub><sup>This script will do the process till the value from the connections list.</sup></sub></li>
	<li>Enter the value between true or false to the <code>loading_status</code> variable. <br> <sub><sup>Value <code>true</code> will show if any connections loaded below on the Linkedin connections page. Value <code>false</code> won't show the loaded connection updates.</sup></sub></li>
	<li>Enter the excluded usernames to the <code>exclude</code> variable. <br> <sub><sup>Keep every single username in the single or double quotes e.g. <code>['username_2']</code> or <code>["username_3"]</code> and separate every username by <code>,</code> <br> 🔴 Don't use enocoded string like <code>ab%C4%87</code> as a username. In some cases, encoded string may not be matched in the excluded usernames list.</sup></sub>
	</li>
	<li>After copying the code, go to <a href="https://www.linkedin.com/mynetwork/invite-connect/connections/" target="_blank">Linkedin connections page</a> <br> <sub><sup>Press <code>CTRL + SHIFT + I</code> then go to console tab and paste the the copied code and then hti <code>Enter</code></sup></sub></li>
</ul>
<br><br>
<p align="center">
	Follow this link to generate code <br>
	<sub><img height="20px" src="https://user-images.githubusercontent.com/34242279/157722497-db7e3df1-b593-4175-8557-614046fa4cc7.png"/></sub>
	<a href="https://naiemofficial.github.io/Linkedin-bulk-connection-remover/" target="_blank"><strong>https://naiemofficial.github.io/Linkedin-bulk-connection-remover/</strong></a>
</p>

<p align="center"><sup><sub><b>OR</b></sub></sup></p>

<p align="center">Copy the below code <sub><sup>(edit if needed)</sup></sub></p>

```js
var target = 50;            // Enter the number of connections iteration
var loading_status = false; // See loading status in the console
var exclude = ['naiemofficial', 'username_1', 'username_2'];

var process = sl = x = i = 0;
var connects = document.querySelectorAll('#main ul > li.mn-connection-card');
var msg = {
    start:  "--------------------| Execution started |--------------------",
    end:    "---------------------| Execution ended |---------------------",
    NAc:    "----------------| No connections available |-----------------",
    trgF:   "-----------| Target value must be greater than 0 |-----------",
    trgS:   "----------------| Target has been completed |----------------"
};

if (sl == 0) console.log(msg.start);
if (connects.length > 0){
    if (target > 0){
        while (x++ < target) {
            setTimeout(async () => {
                connects = document.querySelectorAll('#main ul > li.mn-connection-card');
                var connect = connects[i];
                var uname = connect.querySelectorAll('a')[0].getAttribute('href');
                    uname = decodeURI(uname.split("in/")[1].replaceAll('/', ''));
                var fname = connect.getElementsByClassName('mn-connection-card__name')[0].innerText;

                sl++;
                if (exclude.length > 0 && exclude.includes(uname) === true) {
                    console.log('[' + sl + '] => Action not taken for "' + fname + '"'); i++;
                } else {
                    connect.querySelectorAll('button[type=button].mn-connection-card__dropdown-trigger')[0].click();
                    setTimeout(() => {
                        var connRmItem = connect.querySelectorAll('.artdeco-dropdown__item > button[type=button]');
                        if (connRmItem.length > 0) {
                            connRmItem[0].click();
                            setTimeout(async () => {
                                var prevNds = connects.length;
                                await document.querySelectorAll('#artdeco-modal-outlet button.artdeco-button--primary')[0].click();
                                console.log('[' + sl + '] => Connection removed with "' + fname + '"');
                                prevNds--;
                                if (connects.length > prevNds && loading_status === true){
                                    var items = connects.length - prevNds;
                                    var snpl = (items>1)?'s':'';
                                    console.log('--------------------| ' + items +' item' +snpl+ ' loaded... |--------------------');
                                }
                            }, 050);
                        }
                        setTimeout(() => {
                            if((connects.length-1) == 0){
                                console.log(msg.NAc +'\n'+ msg.end);
                            }else if (sl >= target) {
                                console.log(msg.trgS +'\n'+ msg.end);
                            }
                        }, 0100);
                    }, 0500);
                }
            }, (1000 * process++));
        }
    }else{
        console.log(msg.trgF +'\n'+ msg.end);
    }
} else {
    console.log(msg.NAc +'\n'+ msg.end);
}
```
