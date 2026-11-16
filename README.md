# my_tampermonkey

Userscripts I wrote for myself and actually use. Each file is a standalone [Tampermonkey](https://www.tampermonkey.net/) script — no build, no bundle.

## The scripts

| Script | Site | What it does |
|---|---|---|
| [`ChatGPT Model Usage Tracker.js`](ChatGPT%20Model%20Usage%20Tracker.js) | chatgpt.com | Counts how many times you pick each model per day and shows the tally under the model names in the picker |
| [`Chatgpt Chat Auto Remover.js`](Chatgpt%20Chat%20Auto%20Remover.js) | chatgpt.com | Bulk-deletes chats continuously, driven from the Tampermonkey menu |
| [`Amplitude - ID Copier.js`](Amplitude%20-%20ID%20Copier.js) | app.amplitude.com | Click a user stream row and its ID goes straight to your clipboard |
| [`TeknoAsian Force Click (All myButton).js`](TeknoAsian%20Force%20Click%20\(All%20myButton\).js) | teknoasian.com | Auto-clicks the verify / next / skip buttons so you don't have to |

## How to install one

1. Install the [Tampermonkey](https://www.tampermonkey.net/) extension
2. Open the script file above and click **Raw**
3. Tampermonkey will offer to install it — confirm

Or copy the file contents into a new Tampermonkey script by hand.

## Heads up

These are scraped against specific sites' markup, so when a site redesigns, its script breaks. They're written for my own use, not maintained as products — read one before you run it.

## Contributing

Contributions are very welcome, thank you! Before you start on a pull request, please open an issue and tell me what you would like to add or change. That way we can agree on it first, and your time is not wasted on something that might not fit. Thanks for helping make my_tampermonkey better.

## Share

<a href="https://p32929.github.io/share/?repo=my_tampermonkey"><picture><source media="(prefers-color-scheme: dark)" srcset="https://p32929.github.io/readme/share-dark.svg"><img src="https://p32929.github.io/readme/share-light.svg" alt="Share this with your friends in just a click" width="420"></picture></a>

## Support

<a href="https://p32929.github.io/support/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://p32929.github.io/readme/support-dark.svg"><img src="https://p32929.github.io/readme/support-light.svg" alt="If you like my works and want to support me, feel free to support" width="420"></picture></a>
