window.addEventListener("touchstart", function(event) {
    if (event.target.tagName === "HTML" || event.target.tagName === "BODY") {
        event.preventDefault();
    }
}, false);
window.addEventListener("scroll", function() {
    window.scrollTo(0, 0)
}, false)