var nav_home;
var nav_materialslivewallpaper;
var nav_donate;

var nav_items = [];

var content;

document.addEventListener("DOMContentLoaded", function()
{
    nav_home = document.getElementById("nav_home");
    nav_materialslivewallpaper = document.getElementById("nav_materialslivewallpaper");
    nav_donate = document.getElementById("nav_donate");
    content = document.getElementById("content");

    nav_home.setAttribute("href", "javascript:load_home()");
    nav_materialslivewallpaper.setAttribute("href", "javascript:load_materialslivewallpaper()");
    nav_donate.setAttribute("href", "javascript:load_donate()");

    nav_items = [
        nav_home,
        nav_materialslivewallpaper,
        nav_donate
    ]
});

function load_home()
{
    nav_home.setAttribute("class", "selected");
    nav_materialslivewallpaper.removeAttribute("class");
    nav_donate.removeAttribute("class");

    set_content(
        "/index_content.html",
        "/",
        "Reminimalism",
        nav_home
    );
}

function load_materialslivewallpaper()
{
    nav_home.removeAttribute("class");
    nav_materialslivewallpaper.setAttribute("class", "selected");
    nav_donate.removeAttribute("class");

    set_content(
        "/materialslivewallpaper_content.html",
        "/materialslivewallpaper",
        "Reminimalism - Materials Live Wallpaper",
        nav_materialslivewallpaper
    );
}

function load_donate()
{
    nav_home.removeAttribute("class");
    nav_materialslivewallpaper.removeAttribute("class");
    nav_donate.setAttribute("class", "selected");

    set_content(
        "/donate_content.html",
        "/donate",
        "Reminimalism - Donate",
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
        this.set_content(e.state.content_url, null, null);
    }
});

function set_content(content_url, page_url, title, nav_item)
{
    var request;
    if (window.XMLHttpRequest)
        request = new XMLHttpRequest();
    else
        request = new ActiveXObject("Microsoft.XMLHTTP");

    request.onreadystatechange=function()
    {
        if (request.readyState==4 && request.status==200)
        {
            if (title != null && page_url != null && nav_item != null)
            {
                var data = {};
                data.content_url = content_url;
                data.nav_item_id = nav_item.id;
                window.history.pushState(data, title, page_url);
            }
            content.innerHTML = request.responseText;
        }
    }

    request.open("GET", content_url, false );
    request.send();
}
