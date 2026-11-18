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

## You might also like

<p><a href="https://openstore.pfay.workers.dev/more/p32929/_/0"><picture><source media="(prefers-color-scheme: dark)" srcset="https://openstore.pfay.workers.dev/more/p32929/_/0-dark.svg"><img src="https://openstore.pfay.workers.dev/more/p32929/_/0-light.svg" width="50%" align="top" alt="More apps by p32929 on OpenStore (1)"></picture></a><a href="https://openstore.pfay.workers.dev/more/p32929/_/1"><picture><source media="(prefers-color-scheme: dark)" srcset="https://openstore.pfay.workers.dev/more/p32929/_/1-dark.svg"><img src="https://openstore.pfay.workers.dev/more/p32929/_/1-light.svg" width="50%" align="top" alt="More apps by p32929 on OpenStore (2)"></picture></a><br><a href="https://openstore.pfay.workers.dev/more/p32929/_/2"><picture><source media="(prefers-color-scheme: dark)" srcset="https://openstore.pfay.workers.dev/more/p32929/_/2-dark.svg"><img src="https://openstore.pfay.workers.dev/more/p32929/_/2-light.svg" width="50%" align="top" alt="More apps by p32929 on OpenStore (3)"></picture></a><a href="https://openstore.pfay.workers.dev/more/p32929/_/3"><picture><source media="(prefers-color-scheme: dark)" srcset="https://openstore.pfay.workers.dev/more/p32929/_/3-dark.svg"><img src="https://openstore.pfay.workers.dev/more/p32929/_/3-light.svg" width="50%" align="top" alt="More apps by p32929 on OpenStore (4)"></picture></a></p>

<p><a href="https://p32929.github.io/share/?repo=my_tampermonkey"><picture><source media="(prefers-color-scheme: dark)" srcset="https://p32929.github.io/readme/footer-share-dark.svg"><img src="https://p32929.github.io/readme/footer-share-light.svg" width="50%" align="top" alt="Share this project with your friends in one click"></picture></a><a href="https://p32929.github.io/support/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://p32929.github.io/readme/footer-support-dark.svg"><img src="https://p32929.github.io/readme/footer-support-light.svg" width="50%" align="top" alt="If you like my work and want to support me, feel free to support"></picture></a><br><a href="https://openstore.pfay.workers.dev/add"><picture><source media="(prefers-color-scheme: dark)" srcset="https://p32929.github.io/readme/footer-join-dark.svg"><img src="https://p32929.github.io/readme/footer-join-light.svg" width="100%" align="top" alt="Put your own apps on OpenStore: free, your listing lives in your own repo"></picture></a></p>
