// ==UserScript==
// @name         Chatgpt Chat Auto Remover
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Chatgpt Chat Auto Remover with Enhanced Check Functionality
// @author       You
// @match        https://chatgpt.com/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
    'use strict';

    // Function to wait for a specified amount of time
    function waitFor(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function to wait for an element to exist
    function waitForElement(xpath) {
        console.log(`Waiting for element with XPath: ${xpath}`);
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (element && element.nodeType === Node.ELEMENT_NODE) { // Ensure it's an element node
                    console.log(`Element found: ${xpath}`);
                    clearInterval(interval);
                    resolve(element);
                }
            }, 100);

            setTimeout(() => {
                clearInterval(interval);
                console.log(`Timeout: Element with XPath ${xpath} not found`);
                reject(`Element with XPath ${xpath} not found`);
            }, 5000); // Time out after 5 seconds
        });
    }

    // Function to simulate a full mouse click (mousedown, mouseup, click)
    function simulateMouseClick(element) {
        console.log('Simulating mouse click on element:', element);
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

    // Function to create and update the status element
    function createStatusElement() {
        console.log('Creating status element...');
        const statusDiv = document.createElement('div');
        statusDiv.id = 'automation-status';
        statusDiv.style.position = 'fixed';
        statusDiv.style.top = '10px';
        statusDiv.style.right = '10px';
        statusDiv.style.padding = '10px';
        statusDiv.style.backgroundColor = '#000';
        statusDiv.style.color = '#fff';
        statusDiv.style.zIndex = '1000';
        statusDiv.style.borderRadius = '5px';
        statusDiv.style.fontSize = '14px';
        statusDiv.innerText = 'Starting automation...';
        document.body.appendChild(statusDiv);
    }

    function updateStatusElement(text) {
        console.log('Updating status element:', text);
        const statusDiv = document.getElementById('automation-status');
        if (statusDiv) {
            statusDiv.innerText = text;
        }
    }

    function removeStatusElement() {
        console.log('Removing status element...');
        const statusDiv = document.getElementById('automation-status');
        if (statusDiv) {
            document.body.removeChild(statusDiv);
        }
    }

    // Function to get the current number of list items
    function getCurrentItemCount() {
        console.log('Getting current item count...');
        const listItems = document.evaluate('//div[@class="relative mt-5 first:mt-0 last:mb-5"]/ol/li', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        const count = listItems.snapshotLength;
        console.log('Current item count:', count);
        return count;
    }

    // Function to get the title and href of the first list item
    function getFirstItemDetails() {
        console.log('Getting the title and href of the first item...');
        const listItems = document.evaluate('//div[@class="relative mt-5 first:mt-0 last:mb-5"]/ol/li', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (listItems.snapshotLength > 0) {
            const listItem = listItems.snapshotItem(0);
            const linkElement = listItem.querySelector('a'); // Assuming the title is within an 'a' tag
            if (linkElement) {
                const title = linkElement.textContent.trim();
                const href = linkElement.href;
                console.log('Current first item title:', title, 'href:', href);
                return { title, href };
            }
        }
        console.log('No title or href found for the first item');
        return null;
    }

    // Function to perform the automation task
    async function startAutomation() {
        createStatusElement();

        let initialItemCount = getCurrentItemCount();
        let initialFirstItemDetails = getFirstItemDetails();

        if (initialItemCount === 0) {
            updateStatusElement('No items found to process.');
            await waitFor(3000);
            removeStatusElement();
            return;
        }

        for (let i = 0; i < initialItemCount; i++) {
            let currentItemCount = getCurrentItemCount();
            let currentFirstItemDetails = getFirstItemDetails();

            try {
                // Update the status element with remaining items
                updateStatusElement(`Deleting Chat ${i + 1} of ${initialItemCount}`);
                console.log(`Processing item ${i + 1} of ${initialItemCount}`);

                // Click on the first 'a' tag inside the list item
                const listItems = document.evaluate('//div[@class="relative mt-5 first:mt-0 last:mb-5"]/ol/li', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                const listItem = listItems.snapshotItem(0);  // Always pick the first item in the list

                if (!listItem) {
                    throw new Error('List item not found');
                }

                const link = listItem.getElementsByTagName('a')[0];
                if (link) {
                    console.log('Clicking on the link inside the list item...');
                    link.click();
                } else {
                    throw new Error('No link found in the list item');
                }

                // Locate and simulate a full mouse click on the button with aria-haspopup="menu"
                const menuButton = await waitForElement('//button[@aria-haspopup="menu"]');
                console.log('Clicking on the menu button...');
                simulateMouseClick(menuButton);
                await waitFor(250); // Wait for a quarter of a second (250ms)

                // Click on the 4th menu item
                const menuItem = await waitForElement('(//div[@role="menuitem"])[4]');
                console.log('Clicking on the 4th menu item...');
                menuItem.click();
                await waitFor(250); // Wait for a quarter of a second (250ms)

                // Click on the button with class="btn relative btn-danger"
                const dangerButton = await waitForElement('//button[contains(@class, "btn relative btn-danger")]');
                console.log('Clicking on the delete confirmation button...');
                dangerButton.click();
                await waitFor(250); // Wait for a quarter of a second (250ms)

                // Wait for either the number of items to decrease, the title of the first item to change, or the href to change
                let newItemCount = getCurrentItemCount();
                let newFirstItemDetails = getFirstItemDetails();
                while (
                    newItemCount >= currentItemCount &&
                    newFirstItemDetails &&
                    newFirstItemDetails.title === currentFirstItemDetails.title &&
                    newFirstItemDetails.href === currentFirstItemDetails.href
                ) {
                    console.log('Waiting for item count to decrease, title or href to change...');
                    await waitFor(100);
                    newItemCount = getCurrentItemCount();
                    newFirstItemDetails = getFirstItemDetails();
                }

                // Wait for an additional 1000 ms after detecting the count decrease, title change, or href change
                await waitFor(250);

            } catch (error) {
                console.error('Error during automation:', error);
                updateStatusElement(`Error: ${error.message}`);
                await waitFor(250);
                removeStatusElement();
                return;
            }
        }

        updateStatusElement('Automation completed successfully!');
        console.log('Automation completed successfully!');
        await waitFor(3000);
        removeStatusElement();
    }

    // Register the start button inside the Tampermonkey menu
    GM_registerMenuCommand('Delete All Chats', function () {
        console.log('Starting automation via Tampermonkey menu...');
        startAutomation().catch((error) => {
            console.error('Automation failed:', error);
            updateStatusElement(`Automation failed: ${error}`);
            waitFor(3000).then(removeStatusElement);
        });
    });

})();
