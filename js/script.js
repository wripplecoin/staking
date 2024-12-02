let userAccount;
let stakingContract;
let web3Modal;
let provider;

const contractAddress = "0x42b1c60A1C73E5e61F3aD5422DC8C7C29864F129"; // Replace with your contract address
const contractABI = [{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"_initialInterestRate","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newInterestRate","type":"uint256"}],"name":"InterestRateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referee","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ReferralReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstaked","type":"event"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"calculateRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimCooldown","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_referrer","type":"address"}],"name":"getReferralRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"interestRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastClaimedTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referralRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referrer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newInterestRate","type":"uint256"}],"name":"setInterestRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_referrer","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const ERC20_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"safeTransferToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"safeTransferTokenWithAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Initialize Web3Modal
function initWeb3Modal() {
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider.default,
            options: {
                rpc: { 56: "https://bsc-dataseed.binance.org/" },
                chainId: 56,
            },
        },
    };

    web3Modal = new Web3Modal.default({
        cacheProvider: false,
        providerOptions,
        theme: "dark",
    });
}

// Connect Wallet
async function connectWallet() {
    try {
        provider = await web3Modal.connect();
        web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();
        userAccount = accounts[0];

        document.getElementById("walletAddress").innerText = `Wallet Address: ${userAccount}`;
        stakingContract = new web3.eth.Contract(contractABI, contractAddress);

        handleReferralLink(); // Handle referral link if any
        updateUserInfo(); // Update staking info
        updateCooldownTime(); // Check cooldown time
        updateCalculatedRewards();

        showToast("Wallet connected successfully!", "success");
    } catch (error) {
        console.error("Failed to connect wallet:", error);
        showToast("Failed to connect wallet. Please try again.", "error");
    }
}

// Fetch and Update User Info
async function updateUserInfo() {
    try {
        const stake = await stakingContract.methods.stakes(userAccount).call();
        const rewards = await stakingContract.methods.rewards(userAccount).call();

        document.getElementById("userStake").innerText = web3.utils.fromWei(stake, "ether");

        if (rewards === '0') {
            document.getElementById("userRewards").innerText = "0 Tokens";
        } else {
            document.getElementById("userRewards").innerText = web3.utils.fromWei(rewards, "ether");
        }
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
}


// Display Pending Rewards (On page load)
async function displayPendingRewards() {
    try {
        const userAccount = await web3.eth.getAccounts().then(accounts => accounts[0]);
        const calculatedRewards = await stakingContract.methods.calculateRewards(userAccount).call();
        const formattedCalculatedRewards = web3.utils.fromWei(calculatedRewards, 'ether');
        document.getElementById("pendingRewardsDisplay").innerText = `${parseFloat(formattedCalculatedRewards).toFixed(4)} wXRP`;
    } catch (error) {
        console.error("Error displaying pending rewards:", error);
        alert("Could not fetch pending rewards. Please try again.");
    }
}

let isApproved = false; 
let isProcessing = false; 

async function stakeTokens() {
    if (isProcessing) {
        console.log("Please wait. A process is already in progress.");
        return;
    }

    const amount = document.getElementById("stakeAmount").value;
    const referrer = document.getElementById("referrer").value || "0x0000000000000000000000000000000000000000";

    if (amount <= 0) {
        showToast("Please enter a valid amount to stake.", "error");
        return;
    }

    try {
        isProcessing = true; 


        if (!web3 || !userAccount) {
            throw new Error("Wallet not connected. Please connect your wallet.");
        }

        if (!isApproved) {
            document.getElementById("approveProcessing").style.display = "block";
            document.getElementById("approveComplete").style.display = "none";
            document.getElementById("loadingIndicator").style.display = "none";

            await approveTokens(amount);  

            isApproved = true;

            document.getElementById("approveProcessing").style.display = "none";
            document.getElementById("approveComplete").style.display = "block";
        }


        document.getElementById("loadingIndicator").style.display = "block"; 

        const amountInWei = web3.utils.toWei(amount, "ether");
        const tx = await stakingContract.methods.stake(amountInWei, referrer).send({ from: userAccount });


        showToast("Stake success!", "success");
        updateUserInfo();  

        const stakingTxLink = `https://bscscan.com/tx/${tx.transactionHash}`;
        document.getElementById("stakingTxHash").innerHTML = `Transaction Hash: <a href="${stakingTxLink}" target="_blank">${tx.transactionHash}</a>`;
        document.getElementById("stakingTxHash").style.display = "block"; 

        document.getElementById("approveComplete").style.display = "none";
        document.getElementById("loadingIndicator").style.display = "none";
        document.getElementById("stakeAmount").value = ""; // Reset input field after stake

    } catch (error) {
        console.error("Error in staking process:", error);

        if (error.message.includes("User rejected")) {
            showToast("Transaction was rejected by the user.", "error");
        } else if (error.message.includes("Wallet not connected")) {
            showToast("Please connect your wallet to proceed.", "error");
        } else if (error.message.includes("insufficient funds")) {
            showToast("Insufficient funds or gas to complete the transaction.", "error");
        } else {
            showToast("An unexpected error occurred. Please try again later.", "error");
        }

        document.getElementById("approveProcessing").style.display = "none";
        document.getElementById("loadingIndicator").style.display = "none";
    } finally {
        isProcessing = false;  
    }
}

async function approveTokens(amount) {
    try {
        const tokenAddress = await stakingContract.methods.token().call();
        const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
        const amountInWei = web3.utils.toWei(amount, "ether");

        // Kiểm tra allowance
        const allowance = await tokenContract.methods.allowance(userAccount, contractAddress).call();
        if (parseInt(allowance) >= amountInWei) {
            console.log("Tokens already approved.");
            isApproved = true; 
            return; 
        }

        // Phê duyệt token
        await tokenContract.methods.approve(contractAddress, amountInWei).send({ from: userAccount });
        showToast("Tokens approved successfully!", "success");

    } catch (error) {
        console.error("Failed to approve tokens:", error);
        showToast("Approval failed. Please ensure you have enough tokens.", "error");
        throw new Error("Approval failed. Please ensure you have enough tokens.");
    }
}


// Unstaking Tokens
async function unstakeTokens() {
    const amount = document.getElementById("unstakeAmount").value;
    if (amount > 0) {
        try {
            const amountInWei = web3.utils.toWei(amount, "ether");
            const tx = await stakingContract.methods.unstake(amountInWei).send({ from: userAccount });
            showToast("Tokens unstaked successfully!", "success");
            updateUserInfo(); // Update user staking info

            const unstakingTxLink = `https://bscscan.com/tx/${tx.transactionHash}`;
            document.getElementById("unstakingTxHash").innerHTML = `Transaction Hash: <a href="${unstakingTxLink}" target="_blank">${tx.transactionHash}</a>`;
            document.getElementById("unstakingTxHash").style.display = "block"; 
        } catch (error) {
            console.error("Failed to unstake tokens:", error);
            showToast("Failed to unstake tokens. Please try again.", "error");
        }
    } else {
        showToast("Please enter a valid amount to unstake.", "error");
    }
}

let isProcessingClaim = false;

async function claimRewards() {
    if (isProcessingClaim) {
        console.log("Claim already in progress.");
        return;
    }

    isProcessingClaim = true;

    try {
        if (!web3 || !userAccount) {
            showToast("Please connect your wallet to claim rewards.", "error");  
            return;
        }

        const tx = await stakingContract.methods.claim().send({ from: userAccount });

        if (tx && tx.transactionHash) {
            showToast("Claim successful! Rewards received.", "success");
            await updateUserInfo(); 

            const claimTxLink = `https://bscscan.com/tx/${tx.transactionHash}`;
            document.getElementById("claimTxHash").innerHTML = `Transaction Hash: <a href="${claimTxLink}" target="_blank">${tx.transactionHash}</a>`;
            document.getElementById("claimTxHash").style.display = "block"; 
        }

    } catch (error) {
        console.error("Error in claiming rewards:", error);

        if (error.message.includes("User rejected")) {
            showToast("Transaction was rejected by the user.", "error");
        } else if (error.message.includes("Wallet not connected")) {
        } else {
        }
    } finally {
        isProcessingClaim = false; // Reset processing flag
    }
}


async function updateCalculatedRewards() {
    try {
        const calculatedRewards = await stakingContract.methods.calculateRewards(userAccount).call();

        const formattedCalculatedRewards = web3.utils.fromWei(calculatedRewards, "ether");

        document.getElementById("calculatedRewards").innerText = `${parseFloat(formattedCalculatedRewards).toFixed(4)} Tokens`;
    } catch (error) {
        console.error("Error calculating rewards:", error);
    }
}

// Show Toast Notification
function showToast(message, type) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: type === "error" ? "red" : "green",
        stopOnFocus: true,
    }).showToast();
}

async function updateCooldownTime() {
    try {
        const lastClaimTime = await stakingContract.methods.lastClaimedTime(userAccount).call();
        const cooldownTime = await stakingContract.methods.claimCooldown().call();

        const currentTime = Math.floor(Date.now() / 1000);
        const timeRemaining = cooldownTime - (currentTime - lastClaimTime);

        if (timeRemaining > 0) {
            document.getElementById("claimButton").disabled = true;
            startCooldownTimer(timeRemaining);
        } else {
            document.getElementById("claimButton").disabled = false;
            document.getElementById("claimCooldownTime").innerText = "Ready to claim!";
        }
    } catch (error) {
        console.error("Failed to fetch cooldown time:", error);
    }
}


// Start Cooldown Timer
function startCooldownTimer(timeRemaining) {
    const claimCooldownTimeElement = document.getElementById("claimCooldownTime");
    const claimButton = document.getElementById("claimButton");

    const interval = setInterval(() => {
        timeRemaining--;
        const hours = Math.floor(timeRemaining / 3600);
        const minutes = Math.floor((timeRemaining % 3600) / 60);
        const seconds = timeRemaining % 60;

        claimCooldownTimeElement.innerText = `${hours}h : ${minutes}m : ${seconds}s`;

        if (timeRemaining <= 0) {
            clearInterval(interval);
            claimButton.disabled = false;
            claimCooldownTimeElement.innerText = "Ready to claim!";
        }
    }, 1000);
}

// Handle Referral Link
function handleReferralLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = urlParams.get("referrer");

    if (referrer) {
        document.getElementById("referrer").value = referrer; // Populate referrer input
    }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    initWeb3Modal();
    document.getElementById("connectWallet").addEventListener("click", connectWallet);
    document.getElementById("stakeButton").addEventListener("click", stakeTokens);
    document.getElementById("unstakeButton").addEventListener("click", unstakeTokens);
    document.getElementById("claimButton").addEventListener("click", claimRewards);
    document.getElementById("claimCooldownTime").style.display = "none"; // Hide cooldown time initially
    displayPendingRewards();  // Display pending rewards on load
});


// JavaScript to toggle the menu visibility on mobile
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active"); // Toggle visibility of the menu
});

// JavaScript for burger menu and logo size adjustment
document.getElementById("burgerMenu").addEventListener("click", function() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("visible");  // Toggle 'visible' class to show/hide menu
});