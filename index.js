function w3_open() {
  document.getElementById("SidebarProfileSettings").style.display = "block";
  setCookie("SidebarProfileSettings", "open", 30);  
}
function w3_close() {
  document.getElementById("SidebarProfileSettings").style.display = "none";
  setCookie("SidebarProfileSettings", "closed", 30);
}

function w2_open() {
  document.getElementById("SidebarGameSettings").style.display = "block";
  setCookie("SidebarGameSettings", "open", 30);
}
function w2_close() {
  document.getElementById("SidebarGameSettings").style.display = "none";
  setCookie("SidebarGameSettings", "closed", 30);
}

function w1_open() {
  document.getElementById("SidebarPlay").style.display = "block";
  setCookie("SidebarPlay", "open", 30);
}
function w1_close() {
  document.getElementById("SidebarPlay").style.display = "none";
  setCookie("SidebarPlay", "closed", 30);
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

window.onload = function(){
  if (getCookie("SidebarProfileSettings") == "open") {
    document.getElementById("SidebarProfileSettings").style.display = "block";
  } else {
    document.getElementById("SidebarProfileSettings").style.display = "none";
  }

  if (getCookie("SidebarGameSettings") == "open") {
    document.getElementById("SidebarGameSettings").style.display = "block";
  } else {
    document.getElementById("SidebarGameSettings").style.display = "none";
  }

  if (getCookie("SidebarPlay") == "open") {
    document.getElementById("SidebarPlay").style.display = "block";
  } else {
    document.getElementById("SidebarPlay").style.display = "none";
  }
}