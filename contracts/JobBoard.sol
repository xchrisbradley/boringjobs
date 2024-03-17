// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract JobBoard is Ownable {
    struct Job {
        uint256 id;
        address employer;
        string description;
        uint256 reward;
        bool isOpen;
        mapping(address => bool) applicants;
        address successfulApplicant;
    }

    uint256 public nextJobId;
    mapping(uint256 => Job) public jobs;

    event JobCreated(uint256 jobId, address employer, uint256 reward);
    event JobApplied(uint256 jobId, address applicant);
    event JobFulfilled(uint256 jobId, address successfulApplicant);

    constructor() Ownable(msg.sender) {}

    // Employer posts a job
    function createJob(string calldata description, uint256 reward) external {
        require(bytes(description).length > 0, "Description cannot be empty.");
        require(reward > 0, "Reward must be greater than zero.");

        Job storage job = jobs[nextJobId];
        job.id = nextJobId;
        job.employer = msg.sender;
        job.description = description;
        job.reward = reward;
        job.isOpen = true;

        emit JobCreated(nextJobId, msg.sender, reward);
        nextJobId++;
    }

    // Job seekers apply for the job
    function applyForJob(uint256 jobId) external {
        Job storage job = jobs[jobId];
        require(job.isOpen, "Job is not open for application.");
        require(!job.applicants[msg.sender], "Applicant has already applied.");

        job.applicants[msg.sender] = true;
        emit JobApplied(jobId, msg.sender);
    }

    // Employer selects a successful applicant
    function fulfillJob(uint256 jobId, address successfulApplicant) external {
        Job storage job = jobs[jobId];
        require(
            msg.sender == job.employer,
            "Only the employer can fulfill the job."
        );
        require(job.isOpen, "Job is already fulfilled.");
        require(
            job.applicants[successfulApplicant],
            "Selected applicant did not apply."
        );

        job.successfulApplicant = successfulApplicant;
        job.isOpen = false;
        emit JobFulfilled(jobId, successfulApplicant);
    }

    // Function to check if an address has applied to a job
    function hasApplied(
        uint256 jobId,
        address applicant
    ) external view returns (bool) {
        return jobs[jobId].applicants[applicant];
    }
}
