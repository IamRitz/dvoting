pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Lock {
  using Counters for Counters.Counter;
  Counters.Counter public _voterId;
  Counters.Counter public _candidateId;

  address public votingOrganizer;

  struct Candidate {
    uint256 candidateId;
    uint256 age;
    string name;
    string image;
    uint256 votecount;
    address _address;
    string moto;
  }

  address[] public candidateAddress;

  event CandidateAdded(
    uint256 indexed candidateId,
    uint256 age,
    string name,
    string image,
    uint256 votecount,
    address _address,
    string moto
  );

  mapping(address => Candidate) public candidates;

  struct Voter {
    uint256 voterId;
    string name;
    string image;
    address _address;
    uint256 allowed;
    bool voted;
    uint256 votedCandidateId;
    string remark;
    uint256 age;
  }
  
  event VoterAdded(
    uint256 indexed voterId,
    string name,
    string image,
    address _address,
    uint256 allowed,
    bool voted,
    uint256 votedCandidateId,
    string remark,
    uint256 age
  );

  address[] public votedVoters;
  address[] public votersAddress;
  mapping(address => Voter) public voters;

  constructor() {
    votingOrganizer = msg.sender;
  }

  function addCandidate(
    uint256 _age,
    string memory _name,
    string memory _image,
    address _address,
    string memory _moto
  ) public {
    require(msg.sender == votingOrganizer, "Only the organizer can add candidates");
    _candidateId.increment();
    uint256 candidateId = _candidateId.current();
    Candidate storage candidate = candidates[_address];
    candidate.candidateId = candidateId;
    candidate.age = _age;
    candidate.name = _name;
    candidate.image = _image;
    candidate.votecount = 0;
    candidate._address = _address;
    candidate.moto = _moto;
    candidateAddress.push(_address);
    emit CandidateAdded(candidateId, _age, _name, _image, 0, _address, _moto);
  }

  function readAllAddress() public view returns (address[] memory) {
    return candidateAddress;
  }

  function readCandidateNumber() public view returns (uint256) {
    return candidateAddress.length;
  }

  function readCandidateData(address _address)
    public
    view
    returns (
      uint256,
      uint256,
      string memory,
      string memory,
      uint256,
      address,
      string memory
    )
  {
    return (
      candidates[_address].candidateId,
      candidates[_address].age,
      candidates[_address].name,
      candidates[_address].image,
      candidates[_address].votecount,
      candidates[_address]._address,
      candidates[_address].moto
    );
  }

  function addVoter(
    string memory _name,
    string memory _image,
    address _address,
    string memory _remark,
    uint256 _age
  ) public {
    require(msg.sender == votingOrganizer, "Only the organizer can add voters");
    Voter storage voter = voters[_address];
    require(voter.allowed == 0, "Voter already exists");

    _voterId.increment();

    voter.voterId = _voterId.current();
    voter.name = _name;
    voter.image = _image;
    voter._address = _address;
    voter.allowed = 1;
    voter.voted = false;
    voter.votedCandidateId = 1000;
    voter.remark = _remark;
    voter.age = _age;
    votersAddress.push(_address);
    emit VoterAdded(voter.voterId, _name, _image, _address, 1, false, voter.votedCandidateId, _remark, _age);
  }

  function addVote(uint256 _candidateID, address _candidateAddress) external {
    Voter storage voter = voters[msg.sender];
    Candidate storage candidate = candidates[_candidateAddress];
    require(voter.allowed == 1, "You cannot vote");
    require(voter.voted == false, "Voter has already voted");
    require(candidate.candidateId > 0, "Candidate does not exist");

    voter.voted = true;
    voter.votedCandidateId = _candidateID;
    candidate.votecount += 1;
    votedVoters.push(msg.sender);
  }

  function readVoterNumber() public view returns (uint256) {
    return votersAddress.length;
  }

  function readAllVoters() public view returns (address[] memory) {
    return votersAddress;
  }

  function readAllVotedVoters() public view returns (address[] memory) {
    return votedVoters;
  }

  function readVoterData(address _address)
    public
    view
    returns (
      string memory,
      string memory,
      uint256,
      bool,
      uint256,
      string memory,
      uint256
    )
  {
    return (
      voters[_address].name,
      voters[_address].image,
      voters[_address].allowed,
      voters[_address].voted,
      voters[_address].votedCandidateId,
      voters[_address].remark,
      voters[_address].age
    );
  }
}
