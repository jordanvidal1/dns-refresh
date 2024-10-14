# DNS Refresh

A script that performs a DNS refresh and marks IPs that are no longer
associated to a specific hostname as `hanging`, and its current IP as `active`.

Hosts are queried using https://dns.google.com/resolve, and the responses are saved to the `data.json` file in `/src` folder.

## Installation

```bash
yarn install
```

## Usage

To run the dns refresh script, use:

```bash
yarn start
```

You can check a new hostname that doesn't exist in the file by adding the `HOST` as an env variable:

```bash
HOST=google.co.uk yarn start
```

## Approach

My approach involves pulling the current list of hosts from a json file containing the hosts and their associated IP addresses. I then loop through the hosts and query the dns.google.com endpoint for each host. A new host that doesn't exist in the file can be checked using the input env variable 'HOST'.

Using the responses from each query, I can update the json file with the current IP addresses. I'm then able to mark any IP addresses that do not match the current IPs as 'hanging'.

I could've used a database or csv file to store the data, but I thought using a json file and read/write functions was the most simple method.
