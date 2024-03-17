// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RewardPool is Ownable, ReentrancyGuard {
    IERC20 public token;

    constructor(IERC20 _token) {
        token = _token;
    }

    mapping(uint256 => uint256) public jobRewards;
    mapping(uint256 => bool) public rewardDistributed;

    event RewardAllocated(uint256 jobId, uint256 rewardAmount);
    event RewardDistributed(uint256 jobId, address to, uint256 amount);

    // Allocate rewards for job fulfillment
    function allocateReward(
        uint256 jobId,
        uint256 rewardAmount
    ) external onlyOwner {
        require(rewardAmount > 0, "Reward amount must be greater than zero");
        jobRewards[jobId] = rewardAmount;
        emit RewardAllocated(jobId, rewardAmount);
    }

    // Distribute rewards to the successful applicant
    // Note: In a real implementation, you'd also distribute to other applicants as per the project requirements
    function distributeReward(
        uint256 jobId,
        address successfulApplicant
    ) external nonReentrant onlyOwner {
        require(!rewardDistributed[jobId], "Reward already distributed.");
        uint256 rewardAmount = jobRewards[jobId];
        require(rewardAmount > 0, "No reward allocated for this job.");

        rewardDistributed[jobId] = true;
        token.transfer(successfulApplicant, rewardAmount);

        emit RewardDistributed(jobId, successfulApplicant, rewardAmount);
    }
}
