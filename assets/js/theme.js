// Has to be in the head tag, otherwise a flicker effect will occur.

let toggleTheme = (theme) => {
  if (theme == "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}


let setTheme = (theme) =>  {
  transTheme();
  setHighlight(theme);
  setGiscusTheme(theme);

  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);

    const themeImage = document.getElementById("theme-image");

    if (theme === "dark") {
      themeImage.src = "assets/img/ayty-white-transp.png";
    } else {
      themeImage.src = "assets/img/ayty-black-transp.png";
    }

    // Add class to tables.
    let tables = document.getElementsByTagName('table');
    for(let i = 0; i < tables.length; i++) {
      if (theme == "dark") {
        tables[i].classList.add('table-dark');
      } else {
        tables[i].classList.remove('table-dark');
      }
    }
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  localStorage.setItem("theme", theme);

  // Updates the background of medium-zoom overlay.
  if (typeof medium_zoom !== 'undefined') {
    medium_zoom.update({
      background: getComputedStyle(document.documentElement)
          .getPropertyValue('--global-bg-color') + 'ee',  // + 'ee' for trasparency.
    })
  }
};


let setHighlight = (theme) => {
  if (theme == "dark") {
    document.getElementById("highlight_theme_light").media = "none";
    document.getElementById("highlight_theme_dark").media = "";
  } else {
    document.getElementById("highlight_theme_dark").media = "none";
    document.getElementById("highlight_theme_light").media = "";
  }
}


let setGiscusTheme = (theme) => {

  function sendMessage(message) {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
  }

  sendMessage({
    setConfig: {
      theme: theme
    }
  });

}


let transTheme = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 500)
}


let initTheme = (theme) => {
  const themeImage = document.getElementById("theme-image");

  if (theme == null || theme == 'null') {
    theme = localStorage.getItem("theme");
    if (!theme) {
      const userPref = window.matchMedia;
      if (userPref && userPref('(prefers-color-scheme: light)').matches) {
        theme = 'light';
        
      } else {
        theme = 'dark';
      }
    }
  }

  if (theme === 'dark') {
    document.documentElement.setAttribute("data-theme", "dark");

  } else {
    document.documentElement.removeAttribute("data-theme");
  }

  localStorage.setItem("theme", theme);
  setTheme(theme);

  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === 'dark') {
    themeImage.src = "assets/img/ayty-white-transp.png";

  } else {
    themeImage.src = "assets/img/ayty-black-transp.png";
  }
}

window.addEventListener("DOMContentLoaded", function() {
  initTheme(localStorage.getItem("theme"));
});


initTheme(localStorage.getItem("theme"));
