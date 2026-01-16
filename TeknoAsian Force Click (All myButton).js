// ==UserScript==
// @name         TeknoAsian Force Click (All myButton)
// @namespace    http://tampermonkey.net/
// @version      3.0
// @match        https://teknoasian.com
// @match        https://teknoasian.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const SELECTOR = '.myButton.verify, .myButton.postnext, .myButton.skipcontent';

    function humanLikeClick(el) {
        if (el.dataset.clicked) return;
        el.dataset.clicked = 'true';

        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();

        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const events = ['mouseover', 'mousemove', 'mousedown', 'mouseup', 'click'];
        events.forEach(type => {
            el.dispatchEvent(new MouseEvent(type, {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: x,
                clientY: y
            }));
        });

        console.log('Attempted human-like click:', el);
    }

    setInterval(() => {
        document.querySelectorAll(SELECTOR).forEach(humanLikeClick);
    }, 1000);
})();
