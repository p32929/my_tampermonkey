// ==UserScript==
// @name         ChatGPT Model Tracker
// @namespace    http://tampermonkey.net/
// @version      1.7.2
// @description  Tracks how many times the model is selected per day, fixes date issues for local timezone, and displays stats
// @author       You
// @match        https://chatgpt.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    console.log('Monitoring ChatGPT model interactions...');

    // Helper function to get today's date as a string (YYYY-MM-DD) in the local timezone
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    // Helper function to get the last 5 days (including today) as an array of strings in the local timezone
    const getLastNDays = (n) => {
        const dates = [];
        for (let i = 0; i < n; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i); // Local timezone adjustment
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            dates.push(`${yyyy}-${mm}-${dd}`);
        }
        return dates.reverse(); // Reverse to show days in ascending order
    };

    // Function to get data from localStorage
    const getStoredData = () => {
        const data = localStorage.getItem('modelTrackerData');
        return data ? JSON.parse(data) : {};
    };

    // Function to update data in localStorage
    const updateStoredData = (modelValue) => {
        const today = getTodayDate();
        const data = getStoredData();

        if (!data[modelValue]) {
            data[modelValue] = {};
        }

        if (!data[modelValue][today]) {
            data[modelValue][today] = 0;
        }

        data[modelValue][today] += 1;

        localStorage.setItem('modelTrackerData', JSON.stringify(data));
        console.log('Updated model tracker data:', data);
    };

    // Function to handle form submission
    const handleSubmission = () => {
        const modelButton = document.querySelector('button[data-testid="model-switcher-dropdown-button"]');
        if (modelButton) {
            const modelValue = modelButton.innerText.trim().split(" ")[1];
            console.log('Model Selected:', modelValue);
            updateStoredData(modelValue);
        } else {
            console.log('Model switcher button not found.');
        }
    };

    // Function to update menu items with usage stats
    const updateMenuItems = () => {
        const data = getStoredData();
        const lastFiveDays = getLastNDays(5);
        const menuItems = document.querySelectorAll('div[role="menuitem"]');

        menuItems.forEach((menuItem) => {
            const modelNameElement = menuItem.querySelector('div:first-child > div:first-child > div:first-child');
            if (!modelNameElement) return;

            const modelName = modelNameElement.innerText.trim().split("\n")[0].split("-")[1];
            const modelData = data[modelName] || {};
            let statsText = '';

            lastFiveDays.forEach((date) => {
                const count = modelData[date] || 0;
                statsText += `${date}: ${count} times\n`;
            });

            // Add or update stats in the menu item
            let statsElement = menuItem.querySelector('.model-stats');
            if (!statsElement) {
                statsElement = document.createElement('div');
                statsElement.className = 'model-stats text-xs text-token-text-secondary mt-1';
                menuItem.appendChild(statsElement);
            }
            statsElement.innerText = statsText.trim();
        });

        console.log('Menu items updated with model stats.');
    };

    // Monitor DOM for textarea, submit interactions, and menu updates
    const observer = new MutationObserver(() => {
        const textarea = document.querySelector('div[contenteditable="true"][id="prompt-textarea"]');
        const form = textarea?.closest('form');
        const submitButton = form?.querySelector('button[type="button"]');
        const menu = document.querySelector('div[role="menu"]');

        // Attach listener to textarea for Enter key submissions
        if (textarea && !textarea.dataset.listenerAttached) {
            textarea.dataset.listenerAttached = true;
            textarea.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault(); // Prevent new line
                    handleSubmission();
                }
            });
            console.log('Textarea listener attached!');
        }

        // Attach listener to submit button
        if (submitButton && !submitButton.dataset.listenerAttached) {
            submitButton.dataset.listenerAttached = true;
            submitButton.addEventListener('click', handleSubmission);
            console.log('Submit button listener attached!');
        }

        // Update menu stats when the menu is opened
        if (menu && !menu.dataset.statsUpdated) {
            menu.dataset.statsUpdated = true; // Avoid redundant updates
            updateMenuItems();
        }
    });

    // Start observing the DOM
    observer.observe(document.body, { childList: true, subtree: true });

    console.log('Listening for DOM changes...');
})();
