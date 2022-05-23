var DEFAULT_TITLE = "Reminimalism";
var DEFAULT_CONTENT = "";

var nav_home;
var nav_materialslivewallpaper;
var nav_particleslivewallpaper;
var nav_donate;

var nav_items = [];

var content;

document.addEventListener("DOMContentLoaded", function()
{
    nav_home = document.getElementById("nav_home");
    nav_materialslivewallpaper = document.getElementById("nav_materialslivewallpaper");
    nav_particleslivewallpaper = document.getElementById("nav_particleslivewallpaper");
    nav_donate = document.getElementById("nav_donate");
    content = document.getElementById("content");

    nav_home.setAttribute("href", "javascript:load_home()");
    nav_materialslivewallpaper.setAttribute("href", "javascript:load_materialslivewallpaper()");
    nav_particleslivewallpaper.setAttribute("href", "javascript:load_particleslivewallpaper()");
    nav_donate.setAttribute("href", "javascript:load_donate()");

    nav_items = [
        nav_home,
        nav_materialslivewallpaper,
        nav_particleslivewallpaper,
        nav_donate
    ]
});

function load_home()
{
    nav_home.setAttribute("class", "selected");
    nav_materialslivewallpaper.removeAttribute("class");
    nav_particleslivewallpaper.removeAttribute("class");
    nav_donate.removeAttribute("class");

    set_content(
        "/",
        nav_home
    );
}

function load_materialslivewallpaper()
{
    nav_home.removeAttribute("class");
    nav_materialslivewallpaper.setAttribute("class", "selected");
    nav_particleslivewallpaper.removeAttribute("class");
    nav_donate.removeAttribute("class");

    set_content(
        "/materialslivewallpaper",
        nav_materialslivewallpaper
    );
}

function load_particleslivewallpaper()
{
    nav_home.removeAttribute("class");
    nav_materialslivewallpaper.removeAttribute("class");
    nav_particleslivewallpaper.setAttribute("class", "selected");
    nav_donate.removeAttribute("class");

    set_content(
        "/particleslivewallpaper",
        nav_particleslivewallpaper
    );
}

function load_donate()
{
    nav_home.removeAttribute("class");
    nav_materialslivewallpaper.removeAttribute("class");
    nav_particleslivewallpaper.removeAttribute("class");
    nav_donate.setAttribute("class", "selected");

    set_content(
        "/donate",
        nav_donate
    );
}

window.addEventListener('popstate', function(e)
{
    if (e.state == null)
        window.location.reload();
    else
    {
        for (i in nav_items)
            if (nav_items[i].id == e.state.nav_item_id)
                nav_items[i].setAttribute("class", "selected");
            else
                nav_items[i].removeAttribute("class");
        this.set_content(e.state.page_url, null);
    }
});

function set_content(page_url, nav_item)
{
    var request;
    if (window.XMLHttpRequest)
        request = new XMLHttpRequest();
    else
        request = new ActiveXObject("Microsoft.XMLHTTP");

    request.onreadystatechange=function()
    {
        if (request.readyState == 4 && request.status == 200)
        {
            var title = get_title(request.responseText);
            if (nav_item != null)
            {
                var data = {};
                data.page_url = page_url;
                data.nav_item_id = nav_item.id;
                window.history.pushState(data, title, page_url);
            }
            document.title = title;
            content.innerHTML = get_content(request.responseText);
        }
    }

    request.open("GET", page_url, false );
    request.send();
}

function get_title(page_content)
{
    var result = get_text_between(page_content, "<title>", "</title>");
    if (result == null)
        return DEFAULT_TITLE;
    return result;
}

function get_content(page_content)
{
    var result = get_text_between(page_content, "<section id=\"content\">", "</section>");
    if (result == null)
        return DEFAULT_CONTENT;
    return result;
}

function get_text_between(text, prefix, postfix)
{
    var start = text.indexOf(prefix);
    if (start == -1)
        return null;
    start += prefix.length;
    var end = text.indexOf(postfix, start);
    if (end == -1)
        return null;
    return text.substring(start, end);
}
