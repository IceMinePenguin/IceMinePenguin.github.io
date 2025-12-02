header = document.getElementsByTagName("header")[0];
fetch("/nav.html").then(response=> response.text()).then(text=> header.innerHTML = text).then(e=> document.getElementById("title2").innerText = document.getElementsByTagName("title")[0].innerText)
