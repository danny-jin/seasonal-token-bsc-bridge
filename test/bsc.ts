import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Seasonal Bridge Bsc test network", () => {
  const adminAddress = "0xF5EB5549306b4c05B7D40b91500d3eB440c4576a";
  let Token;
  let springToken: Contract,
    summerToken: Contract,
    autumnToken: Contract,
    winterToken: Contract,
    bscBridgeContract: Contract,
    deployer: SignerWithAddress;
  describe("Deploy", () => {
    it("Should deploy the contracts", async () => {
      [deployer] = await ethers.getSigners();
      console.log("deployer: ", deployer.address);

      Token = await ethers.getContractFactory("Spring");
      springToken = await Token.deploy(adminAddress);
      console.log("springToken address: ", springToken.address);

      Token = await ethers.getContractFactory("Summer");
      summerToken = await Token.deploy(adminAddress);
      console.log("summerToken address: ", summerToken.address);

      Token = await ethers.getContractFactory("Autumn");
      autumnToken = await Token.deploy(adminAddress);
      console.log("autumnToken address: ", autumnToken.address);

      Token = await ethers.getContractFactory("Winter");
      winterToken = await Token.deploy(adminAddress);
      console.log("winterToken address: ", winterToken.address);

      console.log(
        "springToken verify: ",
        `npx hardhat verify --contract "contracts/Spring.sol:Spring" --network bscTestnet ${springToken.address} ${adminAddress}`
      );
      console.log(
        "summerToken verify: ",
        `npx hardhat verify --contract "contracts/Summer.sol:Summer" --network bscTestnet ${summerToken.address} ${adminAddress}`
      );
      console.log(
        "autumnToken verify: ",
        `npx hardhat verify --contract "contracts/Autumn.sol:Autumn" --network bscTestnet ${autumnToken.address} ${adminAddress}`
      );
      console.log(
        "winterToken verify: ",
        `npx hardhat verify --contract "contracts/Winter.sol:Winter" --network bscTestnet ${winterToken.address} ${adminAddress}`
      );

      const BscBridgeContract = await ethers.getContractFactory("BscBridge");
      bscBridgeContract = await BscBridgeContract.deploy(adminAddress);
      console.log("bscBridgeContract address: ", bscBridgeContract.address);
      console.log(
        "bscBridgeContract verify: ",
        `npx hardhat verify --contract "contracts/BscBridge.sol:BscBridge" --network bscTestnet ${bscBridgeContract.address} ${adminAddress}`
      );
    });
  });
});
