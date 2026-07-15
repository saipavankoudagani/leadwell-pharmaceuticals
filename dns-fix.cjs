const dns = require("node:dns");

dns.setServers(["1.1.1.1", "1.0.0.1"]);

console.log("Cloudflare DNS configured for Node.js");
console.log("Node DNS servers:", dns.getServers());