var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Killable = artifacts.require("./zeppelin/lifecycle/Killable.sol");
var KingOfHill = artifacts.require("./KingOfHill.sol");
var Strings = artifacts.require("./Strings.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.deploy(Strings)
  deployer.link(Killable, KingOfHill);
  deployer.link(Strings, KingOfHill);
  deployer.deploy(KingOfHill);
};
