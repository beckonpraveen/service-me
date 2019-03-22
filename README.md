# service-me

Steps to Run:

Install latest version of mongo
Install latest version of node and npm: https://websiteforstudents.com/install-the-latest-node-js-and-nmp-packages-on-ubuntu-16-04-18-04-lts/

Navigate to the data directory and execute below imports
1) mongoimport --db helpdesk --collection tickets --file processed_sample_data.json --jsonArray
2) mongoimport --db helpdesk --collection users --file User.json --jsonArray

Navigate to home directory
1) npm install
2) npm run dev
