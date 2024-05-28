const Lock = artifacts.require("Lock");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Lock);

  const lockInstance = await Lock.deployed();
  console.log("Lock deployed to:", lockInstance.address);
};

