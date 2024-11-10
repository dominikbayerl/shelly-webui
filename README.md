# shelly-webui
[![Node.js CI](https://github.com/dominikbayerl/shelly-webui/actions/workflows/node.js.yml/badge.svg)](https://github.com/dominikbayerl/shelly-webui/actions/workflows/node.js.yml)

## Description

This project is a stand-alone web application that allows local control of Shelly 
smart home devices, without having to install a slow-ish App or suddendly requiring 
a mandatory Cloud account (Looking at you, Shelly Ltd! 😡).
Everything is stored locally in your browser's `localStorage`. 

This is currently in an early proof-of-concept state. Thus, the only things working
right now are:
- Adding and removing devices
- Controlling Shelly 2 roller switches
- Controlling Shelly Dimmer 2

Support is planned for:
- Other Gen1 devices
- Authentication
- Exporting/Importing profiles to share them on multiple browser instances

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your proposed changes.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
