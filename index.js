const menuToggle = document.querySelector(".menu-toggle");
const menuContent = document.querySelector(".menu-content");
const menuIconsOnly = document.querySelector(".menu-icons-only");

    menuToggle.addEventListener("click", function() {
        //toggles menu state when the button is clicked
        menuContent.classList.toggle("withText");

        // menu withText => state is saved in local storage as the menu with text gets shown
        // menu with no withText => removes the state from local storage and shows the icon only menu
        if (menuContent.classList.contains("withText")) {
            localStorage.setItem("showText", "true");
            document.querySelector(".menu-content-icons").style.display = "none";

        } else {
            localStorage.removeItem("showText");
            document.querySelector(".menu-content-icons").style = "display:flex;flex-direction:column;";
        }

    });

    //changes between the menu with text(if it is saved) or
    // the icon only menu at page refresh
    if (localStorage.getItem("showText") === "true") {
        menuContent.classList.add("withText");
    } else {
        document.querySelector(".menu-content-icons").style.display="flex";
    }

    ///////////---specific menu page opening code---//////////

const userConfigMenu = document.querySelector(".userConfigMenu");
const gameSettingsMenu = document.querySelector(".gameSettingsMenu");
const playButton = document.querySelector(".playButton");

    function switchMenu(menuId) {
        userConfigMenu.style.display = "none";
        gameSettingsMenu.style.display = "none";
        playButton.style.display = "none";

        switch(menuId) {
            case 'userConfigMenu':
                userConfigMenu.style.display = "flex";
                break;
            case 'gameSettingsMenu':
                gameSettingsMenu.style.display = "flex";
                break;
            case 'playButton':
                playButton.style.display = "flex";
                break;
            default:
                break;
        }
        // saves the currently opened menu item
        localStorage.setItem("openedMenu", menuId);

    }
const userConfigMenuConst = document.querySelector(".uConfig");
const userConfigMenuConstIcon = document.querySelector(".uConfigIcon");
const gameSettingsMenuConst = document.querySelector(".gSettgs");
const gameSettingsMenuConstIcon = document.querySelector(".gSettgsIcon");
const playButtonConst = document.querySelector(".gameStrt");
const playButtonConstIcon = document.querySelector(".gameStrtIcon");

    
    userConfigMenuConst.addEventListener("click", function() {
        switchMenu('userConfigMenu');
    });

    userConfigMenuConstIcon.addEventListener("click", function() {
        switchMenu('userConfigMenu');
    });
    
    gameSettingsMenuConst.addEventListener("click", function() {
        switchMenu('gameSettingsMenu');
    });

    gameSettingsMenuConstIcon.addEventListener("click", function() {
        switchMenu('gameSettingsMenu');
    });
    
    playButtonConst.addEventListener("click", function() {
        switchMenu('playButton');
    });

    playButtonConstIcon.addEventListener("click", function() {
        switchMenu('playButton');
    });

window.addEventListener("load", function() {
    const openedMenu = this.localStorage.getItem("openedMenu");
    if (openedMenu) {
        switchMenu(openedMenu);
    }
});

userConfigMenuConst.addEventListener("click", function() {
    userConfigMenuConst.classList.toggle("active");
});
    if (userConfigMenuConst.classList.contains("active")) {
        localStorage.setItem("active", "true");
        document.querySelector(".uConfig").style.color="red"
    }
