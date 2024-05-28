// test/lock_test.js
const Lock = artifacts.require("Lock");

contract("Lock", accounts => {
  it("should add a candidate and retrieve candidate details correctly", async () => {
    const instance = await Lock.deployed();
    
    // Add a candidate
    await instance.addCandidate(30, "Alice", "image_url", accounts[1], "For a better future", { from: accounts[0] });
    
    // Retrieve candidate details
    const candidateData = await instance.readCandidateData(accounts[1]);
    assert.equal(candidateData[1], 30, "The candidate's age was not set correctly");
    assert.equal(candidateData[2], "Alice", "The candidate's name was not set correctly");
    assert.equal(candidateData[3], "image_url", "The candidate's image was not set correctly");
    assert.equal(candidateData[6], "For a better future", "The candidate's moto was not set correctly");
  });

  it("should add a voter and retrieve voter details correctly", async () => {
    const instance = await Lock.deployed();

    // Add a voter
    await instance.addVoter("Bob", "image_url", accounts[2], "Remark", 25, { from: accounts[0] });

    // Retrieve voter details
    const voterData = await instance.readVoterData(accounts[2]);
    assert.equal(voterData[0], "Bob", "The voter's name was not set correctly");
    assert.equal(voterData[1], "image_url", "The voter's image was not set correctly");
    assert.equal(voterData[6], 25, "The voter's age was not set correctly");
  });

  it("should allow a voter to vote for a candidate", async () => {
    const instance = await Lock.deployed();

    // Add a candidate
    await instance.addCandidate(30, "Charlie", "image_url", accounts[3], "Change", { from: accounts[0] });
    
    // Add a voter
    await instance.addVoter("Dave", "image_url", accounts[4], "Remark", 28, { from: accounts[0] });
    
    // Voter votes for the candidate
    await instance.addVote(1, accounts[3], { from: accounts[4] });

    // Check that the voter's voted status is true and the candidate's vote count is 1
    const voterData = await instance.readVoterData(accounts[4]);
    assert.equal(voterData[3], true, "The voter should have voted");

    const candidateData = await instance.readCandidateData(accounts[3]);
    assert.equal(candidateData[4], 1, "The candidate's vote count should be 1");
  });
});
