link_regex = "(.*?)((www\.|m\.|old\.|)reddit.com)(.*)";
old_reddit = "old.reddit.com";
url_matches = ["*://www.reddit.com/*",
               "*://m.reddit.com/*",
               "*://reddit.com/*"
              ];

function reddit_redirect(details) {
    var url = details.url;
    var found = url.match(link_regex);
    var redirect_url = url;

    if (found && found[2] !== "old.reddit.com") {
        redirect_url = found[1] + old_reddit + found[4];
    }

    return {redirectUrl: redirect_url};
}

var firefox_webrq;
var chrome_webrq;
var redirector = undefined;

try {
    firefox_webrq = browser.webRequest.onBeforeRequest;
} catch (e) {
    firefox_webrq = undefined;
}

try {
    chrome_webrq = chrome.webRequest.onBeforeRequest;
} catch (e) {
    chrome_webrq = undefined;
}

if (firefox_webrq !== undefined) {
    redirector = firefox_webrq;
} else if (chrome_webrq !== undefined) {
    redirector = chrome_webrq;
}

if (redirector !== undefined) {
    redirector.addListener(
        reddit_redirect,
        {urls: url_matches, types: ["main_frame"]},
        ["blocking"]
    );
}