'use strict';

const cookieDialog = document.getElementById('cookie-dialog');
const cookieSettings = document.getElementById('cookieSettings');
const acceptAllButton = document.getElementById('acceptAll');
const settingsButton = document.getElementById('settings');
const body = document.body;
const mainContent = document.getElementById('main-content');

// Function to display the initial cookie information dialog
function showCookieInformationDialog() {
    // Create Accept button
    const acceptButton = document.createElement('button');
    mainContent.classList.add('blurry-background');
    acceptButton.textContent = 'Accept';
    acceptButton.className = 'accept-all';
    acceptButton.onclick = acceptAllCookies;

    // Create Settings button
    const settingsBtn = document.createElement('button');
    settingsBtn.textContent = 'Settings';
    settingsBtn.className = 'settings';
    settingsBtn.onclick = showCookieSettingsDialog;

    // Clear existing content and append the new buttons
    cookieDialog.innerHTML = '';
    cookieDialog.appendChild(document.createTextNode("We use cookies to improve your experience on our website. By clicking \"Accept\", you agree to the use of cookies for marketing and analytics purposes."));
    cookieDialog.appendChild(acceptButton);
    cookieDialog.appendChild(settingsBtn);

    // Display the cookie information dialog
    cookieDialog.style.display = 'block';
}

// Function to display the cookie settings dialog
function showCookieSettingsDialog() {
    // Hide cookieDialog
    cookieDialog.style.display = 'none';

    // Generate HTML for cookie settings
    cookieSettings.innerHTML = `
        <p>Settings</p>
        <div class="slider-group">
            <label class="switch">
                <input type="checkbox" checked id="browserCheckbox"> Browser Information
                <span class="slider round"></span>
            </label>
            <label class="switch"> Operating System
                <input type="checkbox" checked id="osCheckbox">
                <span class="slider round"></span>
            </label>
            <label class="switch">
                <input type="checkbox" checked id="screenCheckbox"> Screen Width
                <span class="slider round"></span>
            </label>
            <label class="switch">
                <input type="checkbox" checked id="screenHeightCheckbox"> Screen Height
                <span class="slider round"></span>
            </label>
        </div>
        <button id="saveSettings">Save Settings</button>
    `;

    // Add event listener to display settings information on Save Settings button click
    const saveSettingsButton = document.getElementById('saveSettings');
    if (saveSettingsButton) {
        saveSettingsButton.addEventListener('click', saveCookieSettings);
    }

    // Display the cookie settings dialog
    cookieSettings.style.display = 'block';
}

// Function to handle accepting all cookies
function acceptAllCookies() {
    createCookie('allCookiesAccepted', 'true');
    console.log('Cookies have been accepted.');
    hideCookieDialogs();
}

// Function to initialize cookie settings
function initializeCookieSettings() {
    const browserCheckbox = document.getElementById('browserCheckbox');
    const osCheckbox = document.getElementById('osCheckbox');
    const screenCheckbox = document.getElementById('screenCheckbox');
    const screenHeightCheckbox = document.getElementById('screenHeightCheckbox');
    const screenWidthCheckbox = document.getElementById('screenWidthCheckbox');

    // Check if checkboxes are found
    if (browserCheckbox && osCheckbox && screenCheckbox && screenHeightCheckbox && screenWidthCheckbox) {
        // Check if all cookies are already accepted
        const allCookiesAccepted = getCookie('allCookiesAccepted') === 'true';

        // Hide dialogs if all cookies are accepted
        if (allCookiesAccepted) {
            hideCookieDialogs();
        }

        // Add event listener to display settings information on Save Settings button click
        const saveSettingsButton = document.getElementById('saveSettings');
        if (saveSettingsButton) {
            saveSettingsButton.addEventListener('click', displaySettingsInfo);
        }
    } else {
        // Log an error if one or more checkboxes are not found
        console.error('One or more checkboxes not found.');
    }
}

// Call the function when the window has loaded
window.addEventListener('load', initializeCookieSettings);

// Function to save cookie settings
function saveCookieSettings() {
    const browserCheckbox = document.getElementById('browserCheckbox').checked;
    const osCheckbox = document.getElementById('osCheckbox').checked;
    const screenCheckbox = document.getElementById('screenCheckbox').checked;
    const screenHeightCheckbox = document.getElementById('screenHeightCheckbox').checked;
    const screenWidthCheckbox = document.getElementById('screenWidthCheckbox').checked;

    // Log information to the console regardless of cookie acceptance
    if (screenWidthCheckbox) {
        const screenWidth = getScreenWidth();
        console.log('Screen Width:', screenWidth);
    }

    if (screenHeightCheckbox) {
        const screenHeight = getScreenHeight();
        console.log('Screen Height:', screenHeight);
    }

    if (browserCheckbox) {
        const browserName = getBrowserName();
        console.log('Browser Name:', browserName);
    }

    if (osCheckbox) {
        const operatingSystem = getOperatingSystem();
        console.log('Operating System:', operatingSystem);
    }

    // Allow the dialog to come back after a delay
    setTimeout(showCookieInformationDialog, 1000);

    // Hide the cookieSettings dialog
    cookieSettings.style.display = 'none';
}

// Function to get the screen width
function getScreenWidth() {
    return window.innerWidth;
}

// Function to get the screen height
function getScreenHeight() {
    return window.innerHeight;
}

// Function to hide cookie dialogs
function hideCookieDialogs() {
    mainContent.classList.remove('blurry-background');
    cookieDialog.style.display = 'none';
    cookieSettings.style.display = 'none';
}

// Function to create a cookie
function createCookie(name, value) {
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + 15); // Cookies live for 15 seconds
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=None;Secure`;
}

// Function to get a cookie by name
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Function to display the cookie information dialog with a delay
function showCookieInformationDialogWithDelay() {
    setTimeout(() => {
        showCookieInformationDialog();
    }, 1000);
}

// Check if cookies are enabled and if the user has accepted cookies previously
const cookiesEnabled = navigator.cookieEnabled;
const storedCookies = getCookie('allCookiesAccepted');

// Show the cookie information dialog with a delay if cookies are not enabled or not accepted
if (!cookiesEnabled || storedCookies === undefined) {
    showCookieInformationDialogWithDelay();
}

// Function to get the browser name
function getBrowserName() {
    const userAgent = navigator.userAgent;

    if (userAgent.indexOf("Edge") !== -1) {
        return "Microsoft Edge";
    } else if (userAgent.indexOf("FireFox") !== -1) {
        return "Mozilla FireFox";
    } else if (userAgent.indexOf("Opera") !== -1 || userAgent.indexOf("OPR") !== -1) {
        return "Opera";
    } else if (userAgent.indexOf("Chrome") !== -1) {
        return "Google Chrome";
    } else if (userAgent.indexOf("Safari") !== -1) {
        return "Apple Safari";
    } else if (userAgent.indexOf("Trident") !== -1) {
        return "Internet Explorer";
    } else {
        return "Unknown";
    }
}

// Display the browser name on the page
const browserName = getBrowserName();
document.getElementById('Browser').innerHTML = (`Browser : ${browserName}.`);

// Function to get the operating system
function getOperatingSystem() {
    const platform = navigator.userAgent;

    if (platform.indexOf("Win") !== -1) {
        return "Windows";
    } else if (platform.indexOf("Mac") !== -1) {
        return "macOS";
    } else if (platform.indexOf("Linux") !== -1) {
        return "Linux";
    } else if (platform.indexOf("iOS") !== -1) {
        return "iOS";
    } else if (platform.indexOf("Android") !== -1) {
        return "Android";
    } else {
        return "Unknown";
    }
}

// Function to set window dimensions on page load and resize
function setWindowDimensions() {
    const pageW = document.getElementById('pageW');
    const pageH = document.getElementById('pageH');

    if (pageW && pageH) {
        pageW.innerText = `Window width: ${window.innerWidth}px`;
        pageH.innerText = `Window height: ${window.innerHeight}px`;
    }
}

// Add event listeners for window load and resize to set window dimensions
window.addEventListener('load', () => {
    setWindowDimensions();
    checkOrientation();
});

window.addEventListener('resize', () => {
    setWindowDimensions();
    checkOrientation();
});

// Function to get the page orientation and update the pageO element
const pageO = document.getElementById('pageO');
function checkOrientation() {
    if (pageO) {
        if (window.innerHeight > window.innerWidth) {
            pageO.innerText = 'Orientation: Portrait';
        } else {
            pageO.innerText = 'Orientation: Landscape';
        }
    }
}

// Add event listener for window resize to check and update orientation
window.addEventListener('resize', () => {
    checkOrientation();
});

// Call checkOrientation on window load
window.addEventListener('load', () => {
    checkOrientation();
});

// Function to display settings information
function displaySettingsInfo() {
    const infoContainer = document.getElementById('settingsInfo');
    const browserCheckbox = document.getElementById('browserCheckbox').checked;
    const osCheckbox = document.getElementById('osCheckbox').checked;
    const screenHeightCheckbox = document.getElementById('screenHeightCheckbox').checked;
    const screenWidthCheckbox = document.getElementById('screenWidthCheckbox').checked;

    let info = '';

    if (screenWidthCheckbox) {
        const screenWidth = getScreenWidth();
        info += `Window width: ${screenWidth}px\n`;
    }

    if (screenHeightCheckbox) {
        const screenHeight = getScreenHeight();
        info += `Window height: ${screenHeight}px\n`;
    }

    if (osCheckbox) {
        const operatingSystem = getOperatingSystem();
        info += `OS: ${operatingSystem}\n`;
    }

    if (browserCheckbox) {
        const browserName = getBrowserName();
        info += `Browser: ${browserName}\n`;
    }

    if (infoContainer) {
        infoContainer.innerText = info;
    }

    // Allow the dialog to come back
    showCookieInformationDialog();

    // Log information to the console
    console.log(info);
}

// Add event listener to display settings information on Save Settings button click
const saveSettingsButton = document.getElementById('saveSettings');

saveSettingsButton.addEventListener('click', displaySettingsInfo);
