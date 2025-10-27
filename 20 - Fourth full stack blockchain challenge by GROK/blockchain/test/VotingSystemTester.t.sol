// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { Test, console } from "forge-std/Test.sol";
import { VotingSystem } from "../src/VotingSystem.sol";

contract VotingSystemTester is Test {
    VotingSystem public votingSystem;
    address owner = address(0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496);
    address voter1 = address(0x1);
    address voter2 = address(0x2);
    address voter3 = address(0x3);

    function setUp() public {
        // Deploy the contract with `owner` as the owner
        vm.prank(owner);
        votingSystem = new VotingSystem();
    }

    // Test happy paths for addVoter
    function test_AddVoter() public {
        vm.startPrank(owner);
        vm.expectEmit(true, false, false, true);
        emit VotingSystem.AddedVoter(address(1));
        votingSystem.addVoter(address(1));

        assertTrue(votingSystem.voters(address(1)));
        assertEq(votingSystem.activeVoters(), 1);
        vm.stopPrank();
    }

    // Test unhappy paths for addVoter
    function test_RevertIf_AddressIsZeroForAddVoter() public {
        vm.startPrank(owner);
        vm.expectRevert("Invalid voter address!");
        votingSystem.addVoter(address(0));
        vm.stopPrank();
    }

    function test_RevertIf_VotersAlreadyRegistrered() public {
        vm.startPrank(owner);
        votingSystem.addVoter(address(1));

        vm.expectRevert("Voter already registered!");
        votingSystem.addVoter(address(1));
        vm.stopPrank();
    }

    // Test happy paths for removeVoter
    function test_RemoveVoter() public {
        vm.startPrank(owner);
        votingSystem.addVoter(address(1));
        votingSystem.addVoter(address(2));
        votingSystem.addVoter(address(3));
        assertTrue(votingSystem.voters(address(2)));
        assertEq(votingSystem.activeVoters(), 3);

        vm.expectEmit(true, false, false, true);
        emit VotingSystem.RemovedVoter(address(2));
        votingSystem.removeVoter(address(2));
        assertFalse(votingSystem.voters(address(2)));
        assertEq(votingSystem.activeVoters(), 2);
        vm.stopPrank();
    }

    // Test unhappy paths for remoteVoter
    function test_RevertIf_AddressIsZeroForRemoveVoter() public {
        vm.startPrank(owner);
        vm.expectRevert("Invalid voter address!");
        votingSystem.removeVoter(address(0));
        vm.stopPrank();
    }

    function test_RevertIf_VotersAlreadyRemoved() public {
        vm.startPrank(owner);
        votingSystem.addVoter(address(1));
        votingSystem.addVoter(address(2));
        votingSystem.removeVoter(address(1));

        vm.expectRevert("Voter already removed or not exists!");
        votingSystem.removeVoter(address(1));
        vm.stopPrank();
    }

    // Test happy paths for createProposal
    function test_CreateProposal() public {
        vm.startPrank(owner);
        votingSystem.addVoter(address(1));
        votingSystem.addVoter(address(2));
        votingSystem.addVoter(address(3));
        vm.stopPrank();
        assertEq(votingSystem.activeVoters(), 3);

        vm.startPrank(address(1));
        string memory description = "Upgrade contract to version 2.0";
        uint256 duration = 1 days;
        uint256 quorum = 2;

        vm.expectEmit(true, false, false, false);
        emit VotingSystem.CreatedProposal(1, description, duration, quorum);
        votingSystem.createProposal(description, duration, quorum);
        vm.stopPrank();
    }

    // Test unhappy paths for createProposal
    function test_RevertIf_DescriptionIsEmpty() public {
        vm.startPrank(owner);
        votingSystem.addVoter(address(1));
        votingSystem.addVoter(address(2));
        votingSystem.addVoter(address(3));
        vm.stopPrank();
        assertEq(votingSystem.activeVoters(), 3);

        vm.startPrank(address(1));
        vm.expectRevert("Description is mandatory!");
        votingSystem.createProposal("", block.timestamp + 1 days, 2);
        vm.stopPrank();
    }

    function test_RevertIf_DeadlineIsZero() public {
        vm.startPrank(owner);
        votingSystem.addVoter(address(1));
        votingSystem.addVoter(address(2));
        votingSystem.addVoter(address(3));
        vm.stopPrank();
        assertEq(votingSystem.activeVoters(), 3);

        vm.startPrank(address(1));
        vm.expectRevert("Deadline is mandatory!");
        votingSystem.createProposal("A great proposal", 0, 2);
        vm.stopPrank();
    }

    function test_RevertIf_QuorumIsZero() public {
        vm.startPrank(owner);
        votingSystem.addVoter(address(1));
        votingSystem.addVoter(address(2));
        votingSystem.addVoter(address(3));
        vm.stopPrank();
        assertEq(votingSystem.activeVoters(), 3);

        vm.startPrank(address(1));
        vm.expectRevert("Quorum is mandatory!");
        votingSystem.createProposal("A great proposal", block.timestamp + 1 days, 0);
        vm.stopPrank();
    }

    function test_RevertIf_QuorumExceedsVotersCount() public {
        vm.startPrank(owner);
        votingSystem.addVoter(address(1));
        votingSystem.addVoter(address(2));
        votingSystem.addVoter(address(3));
        vm.stopPrank();
        assertEq(votingSystem.activeVoters(), 3);

        vm.startPrank(address(1));
        vm.expectRevert("Quorum exceeds voter count");
        votingSystem.createProposal("A great proposal", block.timestamp + 1 days, 20);
        vm.stopPrank();
    }

    // AND SO ON FOR OTHERS FUNCTIONS
}
