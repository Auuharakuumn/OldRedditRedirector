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

browser.webRequest.onBeforeRequest.addListener(
    reddit_redirect,
    {urls:url_matches, types:["main_frame"]},
    ["blocking"]
);