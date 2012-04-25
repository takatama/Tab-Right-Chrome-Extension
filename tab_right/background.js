tab_right = {
    on: true,
    setOn: function (on) {
        tab_right.on = on;
        if(tab_right.isOn()) {
            chrome.browserAction.setBadgeText({
                text: 'on'
            });
        } else {
            chrome.browserAction.setBadgeText({
                text: 'off'
            });
        }
    },
    isOn: function () {
        return tab_right.on;
    },
    toggle: function () {
        tab_right.setOn(!tab_right.isOn());
    },
    current_id: null,
    current_index: null
}

chrome.browserAction.onClicked.addListener(function (){
    tab_right.toggle();
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    if (tab_right.isOn()) {
        chrome.tabs.query({}, function (tabs) {
            setTimeout(function () {
                chrome.tabs.move(activeInfo.tabId, {
                    index: tabs.length
                }, null);
            }, 200);
        });
    }
});
tab_right.setOn(true);
