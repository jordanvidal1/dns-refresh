import { readFileSync, writeFileSync } from "fs";
import path from "path";
import fetch from "node-fetch";

// input new hostname to check
const hostname: string | undefined = process.env.HOST;
// file path
const filePath = path.join(__dirname, "/data.json");

(async () => {
  console.log("Starting script");

  try {
    // read data from file
    const data: any = readFileSync(filePath);
    const dnsRecords: any = JSON.parse(data);

    const hosts: string[] = Object.keys(dnsRecords);

    // add inputted host to hostnames to check
    if (hostname && hosts.indexOf(hostname) < 0) {
      hosts.push(hostname);
    }

    for (const host of hosts) {
      try {
        const response = await fetch(
          `https://dns.google.com/resolve?name=${host}&type=A`
        );

        const json: any = await response.json();

        const ipAddress: string = json.Answer?.[0]?.data;

        if (dnsRecords.hasOwnProperty([host])) {
          // set current IP address to 'active'
          dnsRecords[host][ipAddress] = "active";

          // set old IPs to 'hanging'
          Object.keys(dnsRecords[host]).forEach(
            (v) => v !== ipAddress && (dnsRecords[host][v] = "hanging")
          );
        } else {
          // if host doesn't exist then add
          dnsRecords[host] = { [ipAddress]: "active" };
        }
      } catch (err) {
        console.log(err);
      }
    }

    // console log dns records
    console.log(dnsRecords);

    // save data to file
    writeFileSync(filePath, JSON.stringify(dnsRecords, null, 2), "utf8");
    console.log("Data written successfully to disk");
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();
