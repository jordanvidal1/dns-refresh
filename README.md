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

My approach involves pulling the current list of hosts from an object file containing the hosts and their associated IP addresses (or a new host from using the user input env variable). I then loop through the hosts and query the dns.google.com endpoint for each host.

Using the responses from each query, I can update the object file with the current IP address associated to its host. I'm then able to mark any IP addresses that do not match the current one as 'hanging'.

I could've used a database or csv file to store the hosts and IP addresses, but I thought using a json file and read/write functions was the most simple method.
