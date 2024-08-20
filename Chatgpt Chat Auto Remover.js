// ==UserScript==
// @name         Chatgpt Chat Auto Remover
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  Chatgpt Chat Auto Remover
// @author       You
// @match        https://chatgpt.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Create the start button
    const startButton = document.createElement('button');
    startButton.textContent = 'Delete All Chats';
    startButton.style.position = 'fixed';
    startButton.style.top = '16px';
    startButton.style.right = '110px';
    startButton.style.zIndex = 1000;
    startButton.style.padding = '10px';
    startButton.style.backgroundColor = '#000000';
    startButton.style.color = 'white';
    startButton.style.border = 'none';
    startButton.style.borderRadius = '5px';
    startButton.style.cursor = 'pointer';
    startButton.style.fontSize = '12px';
    document.body.appendChild(startButton);

    // Function to wait for a specified amount of time
    function waitFor(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function to wait for an element to exist
    function waitForElement(xpath) {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (element && element.nodeType === Node.ELEMENT_NODE) { // Ensure it's an element node
                    clearInterval(interval);
                    resolve(element);
                }
            }, 100);

            setTimeout(() => {
                clearInterval(interval);
                reject(`Element with XPath ${xpath} not found`);
            }, 5000); // Time out after 5 seconds
        });
    }

    // Function to simulate a full mouse click (mousedown, mouseup, click)
    function simulateMouseClick(element) {
        element.focus(); // Ensure the element is focused
        const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
        const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true, cancelable: true });
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

        element.dispatchEvent(mouseDownEvent);
        element.dispatchEvent(mouseUpEvent);
        element.dispatchEvent(clickEvent);

        // Additional keyboard event simulation
        const keydownEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
        const keyupEvent = new KeyboardEvent('keyup', { key: 'Enter', bubbles: true });
        element.dispatchEvent(keydownEvent);
        element.dispatchEvent(keyupEvent);
    }

    // Function to perform the automation task
    async function startAutomation() {
        const listItems = document.evaluate('//div[@class="relative mt-5 first:mt-0 last:mb-5"]/ol/li', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        if (listItems.snapshotLength === 0) {
            alert('No items found to process.');
            return;
        }

        for (let i = 0; i < listItems.snapshotLength; i++) {
            const listItem = listItems.snapshotItem(i);

            try {
                // Update the button text with remaining items
                startButton.textContent = `Deleting Chat ${i + 1} of ${listItems.snapshotLength}`;

                // Click on the first 'a' tag inside the list item
                const link = listItem.getElementsByTagName('a')[0];
                if (link) {
                    link.click();
                } else {
                    throw new Error('No link found in the list item');
                }

                // Wait for the page to load (adjust the wait time if needed)
                // await waitFor(3000); // You may need to tweak this delay

                // Locate and simulate a full mouse click on the button with aria-haspopup="menu"
                const menuButton = await waitForElement('//button[@aria-haspopup="menu"]');
                simulateMouseClick(menuButton);

                // Wait for the popup menu to appear
                await waitFor(500); // Wait for half a second (500ms)

                // Click on the 4th menu item
                const menuItem = await waitForElement('(//div[@role="menuitem"])[4]');
                menuItem.click();

                // Click on the button with class="btn relative btn-danger"
                const dangerButton = await waitForElement('//button[contains(@class, "btn relative btn-danger")]');
                dangerButton.click();

                // Optional: wait for some time before moving to the next item
                await waitFor(2000); // Adjust as needed

            } catch (error) {
                alert(`Error during automation: ${error}`);
                return;
            }
        }

        alert('Automation completed successfully!');
        startButton.textContent = 'Delete All Chats';
        startButton.style.backgroundColor = '#28a745';
        startButton.disabled = false;
    }

    // Add event listener to the start button
    startButton.addEventListener('click', function () {
        startButton.disabled = true;
        startButton.style.backgroundColor = '#6c757d';
        startAutomation().catch((error) => {
            alert(`Automation failed: ${error}`);
            startButton.disabled = false;
            startButton.textContent = 'Delete All Chats';
            startButton.style.backgroundColor = '#28a745';
        });
    });

})();
