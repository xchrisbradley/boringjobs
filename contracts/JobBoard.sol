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
        address[] applicants;
        address successfulApplicant;
    }

    uint256 public nextJobId;
    mapping(uint256 => Job) public jobs;
    mapping(address => uint256[]) public applicantJobs;

    event JobCreated(uint256 jobId, address employer, uint256 reward);
    event JobApplied(uint256 jobId, address applicant);
    event JobFulfilled(uint256 jobId, address successfulApplicant);

    // Employer posts a job
    function createJob(string memory description, uint256 reward) public {
        jobs[nextJobId] = Job(
            nextJobId,
            msg.sender,
            description,
            reward,
            true,
            new address[](0),
            address(0)
        );
        emit JobCreated(nextJobId, msg.sender, reward);
        nextJobId++;
    }

    // Job seekers apply for the job
    function applyForJob(uint256 jobId) public {
        Job storage job = jobs[jobId];
        require(job.isOpen, "Job is not open for application.");
        job.applicants.push(msg.sender);
        applicantJobs[msg.sender].push(jobId);
        emit JobApplied(jobId, msg.sender);
    }

    // Employer selects a successful applicant
    function fulfillJob(uint256 jobId, address successfulApplicant) public {
        Job storage job = jobs[jobId];
        require(
            msg.sender == job.employer,
            "Only the employer can fulfill the job."
        );
        require(job.isOpen, "Job is already fulfilled.");
        job.successfulApplicant = successfulApplicant;
        job.isOpen = false;
        emit JobFulfilled(jobId, successfulApplicant);
        // Logic to distribute rewards goes here, possibly involving calling the RewardPool contract
    }
}
