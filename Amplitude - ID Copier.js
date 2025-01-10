// ==UserScript==
// @name         Amplitude - ID Copier
// @namespace    http://tampermonkey.net/
// @version      2024-11-18
// @description  try to take over the world!
// @author       You
// @match        https://app.amplitude.com/analytics/herogram/chart/new/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amplitude.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function monitorAndCopyToClipboard() {
        // Set up the MutationObserver to look for new elements with the data-testid attribute
        const observer = new MutationObserver(() => {
            const testIdDivs = document.querySelectorAll('[data-testid^="user-streams-user-"]');

            testIdDivs.forEach((div) => {
                if (!div.dataset.listenerAdded) {
                    div.dataset.listenerAdded = true; // Mark the element to avoid duplicate listeners

                    // Add a click listener to the div
                    div.addEventListener('click', (event) => {
                        const childWithTitle = div.querySelector('[title]');
                        if (childWithTitle) {
                            const titleText = childWithTitle.getAttribute('title');
                            navigator.clipboard.writeText(titleText).then(
                                () => {
                                    console.log(`Copied to clipboard: ${titleText}`);
                                },
                                (err) => {
                                    console.error('Failed to copy text: ', err);
                                }
                            );
                        } else {
                            console.warn('No child with title attribute found in the clicked div.');
                        }
                    });
                }
            });
        });

        // Observe the body for changes in the DOM
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Run the function
    monitorAndCopyToClipboard();


})();
