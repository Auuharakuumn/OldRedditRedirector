link_regex = "(.*?)((www\.|m\.|old\.|)reddit.com)(.*)";
old_reddit = "old.reddit.com";
url_matches = {url:[{hostEquals: "m.reddit.com"},
                    {hostEquals: "www.reddit.com"},
                    {hostEquals: "reddit.com"}
                    ]};

function reddit_redirect() {
    var url = window.location.href;
    var found = url.match(link_regex);

    if (found && found[2] !== "old.reddit.com") {
        var redirect_url = found[1] + old_reddit + found[4];

        window.location.replace(redirect_url);
    }
}

reddit_redirect();