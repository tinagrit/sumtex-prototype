/* 

    THIS JS DOCUMENT IS THE MAIN UI JAVASCRIPT OF THE WEBSITE

    DEVELOPED BY TINAGRITPROJECT ON BEHALF OF SHANGHAI SUMTEX INTERNATIONAL LOGISTICS CO., LTD. ("SUMTEX")

    THIS CODE IS STILL IN DEVELOPMENT WHICH MEANS TINAGRITPROJECT OWNS ALL RIGHTS TO THIS DOCUMENT
    WITHOUT FORMAL AND WRITTEN PERMISSION FROM TINAGRITPROJECT, YOU MAY NOT COPY THIS CODE

    THIS WEBSITE IS DEVELOPED BY A DEVELOPER WHO RESIDES IN CANADA
    THEREFORE COPYRIGHT LAW IN CANADA JURISDICTION APPLIES IN THE PROCESS OF DEVELOPMENT
    PLEASE CONTACT THE DEV AT webmasters@tinagrit.com FOR ANY REQUESTS OR CONCERNS

    ui.js 1.0.1
    
*/

const phoneMenu = document.getElementById("phone-menu");
const emailMenu = document.getElementById("email-menu");
const phoneTrigger = document.getElementById("phone-link");
const emailTrigger = document.getElementById("email-link");

let activemenu = {origin: null, context: null};

const normalizePozition = (origin, context) => {
    // ? compute the position of the link relative to the container element (scope)
    let {
        left: linkOffsetX,
        top: linkOffsetY,
    } = origin.getBoundingClientRect();

    linkOffsetX = linkOffsetX < 0 ? 0 : linkOffsetX;
    linkOffsetY = linkOffsetY < 0 ? 0 : linkOffsetY;

    let normalizedX = linkOffsetX;
    let normalizedY = linkOffsetY + origin.clientHeight;

    const outOfBoundsOnX =
        linkOffsetX + context.clientWidth > document.querySelector("body").clientWidth;

    if (outOfBoundsOnX) {
        normalizedX =
            document.querySelector("body").clientWidth - context.clientWidth;
    }

    return {
        normalizedX,
        normalizedY
    };
};

const showPopup = (origin, context) => {
    const {
        normalizedX,
        normalizedY
    } = normalizePozition(origin, context);

    context.classList.remove("visible");

    context.style.top = `${normalizedY}px`;
    context.style.left = `${normalizedX}px`;

    setTimeout(() => {
        context.classList.add("visible");
        activemenu.origin = origin;
        activemenu.context = context;
    });
}

const initPopup = (origin, context) => {
    origin.addEventListener("click",(event) => {
        event.preventDefault();
        showPopup(origin, context);
    })
    origin.addEventListener("contextmenu",(event) => {
        event.preventDefault();
        showPopup(origin, context);
    })
}

document.addEventListener("click", (e) => {
    // ? close the menu if the user clicks outside of it or the link
    if (activemenu.context != null) {
        const itemRect = activemenu.context.getBoundingClientRect();
        if (activemenu.context === e.target || activemenu.context.contains(e.target) || (
            e.clientX >= itemRect.left && e.clientX <= itemRect.right &&
            e.clientY >= itemRect.top && e.clientY <= itemRect.bottom
          )) {
            return;
        }
        activemenu.context.classList.remove("visible");
        activemenu.origin = null;
        activemenu.context = null;
    }
});

initPopup(phoneTrigger, phoneMenu);
initPopup(emailTrigger, emailMenu);







const initToggler = (toggler,togglecontent) => {
    toggler.addEventListener('click',()=>{
        togglecontent.classList.toggle('activated');
        if (toggler.querySelector('.togglerarrow')) {
            toggler.querySelector('.togglerarrow').classList.toggle('activated')
        }
    })
}

if (document.getElementById('toggler_terms') && document.getElementById('togglecontent_terms')) {
    initToggler(document.getElementById('toggler_terms'), document.getElementById('togglecontent_terms'))
}

if (document.getElementById('toggler_coop') && document.getElementById('togglecontent_coop')) {
    initToggler(document.getElementById('toggler_coop'), document.getElementById('togglecontent_coop'))
}








const initCopier = (buttonElement, stringToCopy) => {
    buttonElement.addEventListener('click', () => {
      navigator.clipboard.writeText(stringToCopy);
      const originalButtonText = buttonElement.innerHTML;
      buttonElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg><p>Copied</p>`;
      setTimeout(() => {
        buttonElement.innerHTML = originalButtonText;
      }, 3000); // Change back to original text after 3 seconds
    });
}

if (document.getElementById('copynumber_contact')) {
    initCopier(document.getElementById('copynumber_contact'),'+862158824797');
}

if (document.getElementById('copynumber_nav')) {
    initCopier(document.getElementById('copynumber_nav'),'+862158824797');
}

if (document.getElementById('copyemail_contact')) {
    initCopier(document.getElementById('copyemail_contact'),'info@sumtex.com');
}

if (document.getElementById('copyemail_nav')) {
    initCopier(document.getElementById('copyemail_nav'),'info@sumtex.com');
}