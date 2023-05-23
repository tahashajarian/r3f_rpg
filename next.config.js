/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

const withTM = require("next-transpile-modules")(["three"]);
module.exports = withTM();

module.exports = nextConfig;
