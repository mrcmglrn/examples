pragma solidity 0.7.0;

import "./IERC20.sol";
import "./IMintableToken.sol";
import "./IDividends.sol";
import "./SafeMath.sol";

contract Token is IERC20, IMintableToken, IDividends {
  // ------------------------------------------ //
  // ----- BEGIN: DO NOT EDIT THIS SECTION ---- //
  // ------------------------------------------ //
  using SafeMath for uint256;
  uint256 public totalSupply;
  uint256 public decimals = 18;
  string public name = "Test token";
  string public symbol = "TEST";
  mapping (address => uint256) public balanceOf;
  // ------------------------------------------ //
  // ----- END: DO NOT EDIT THIS SECTION ------ //  
  // ------------------------------------------ //

  // add allowance
  mapping(address => mapping(address => uint256)) public allowances;


  // New storage for holders and dividends
  address[] public holders;
  mapping(address => bool) public isHolder;
  mapping(address => uint256) public holderIndex;
  mapping(address => uint256) public withdrawableDividends;


  // Add events not present in IERC20 or deps
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);


  // IERC20

  function allowance(address owner, address spender) external view override returns (uint256) {
    return allowances[owner][spender];
  }

  function transfer(address to, uint256 value) external override returns (bool) {
    require(to != address(0), "Transfer to zero address");
    require(balanceOf[msg.sender] >= value, "Insufficient balance");
    
    _transfer(msg.sender, to, value);
    return true;
  }

  function approve(address spender, uint256 value) external override returns (bool) {
    allowances[msg.sender][spender] = value;
    emit Approval(msg.sender, spender, value);
    return true;
  }

  function transferFrom(address from, address to, uint256 value) external override returns (bool) {
    require(to != address(0), "Transfer to zero address");
    require(balanceOf[from] >= value, "Insufficient balance");
    require(allowances[from][msg.sender] >= value, "Insufficient allowance");
    
    allowances[from][msg.sender] = allowances[from][msg.sender].sub(value);
    _transfer(from, to, value);
    return true;
  }

  function _transfer(address from, address to, uint256 value) internal {
    balanceOf[from] = balanceOf[from].sub(value);
    balanceOf[to] = balanceOf[to].add(value);
    
    // Update holders list
    _updateHolders(from, to);
    emit Transfer(from, to, value);
  }

  // IMintableToken

  function mint() external payable override {
    require(msg.value > 0, "Must send ETH to mint");
    
    uint256 tokensToMint = msg.value;
    balanceOf[msg.sender] = balanceOf[msg.sender].add(tokensToMint);
    totalSupply = totalSupply.add(tokensToMint);
    
    // Add to holders if not already
    if (!isHolder[msg.sender]) {
      _addHolder(msg.sender);
    }
    
    emit Transfer(address(0), msg.sender, tokensToMint);
  }

  function burn(address payable dest) external override {
    uint256 tokensToBurn = balanceOf[msg.sender];
    require(tokensToBurn > 0, "No tokens to burn");
    
    balanceOf[msg.sender] = 0;
    totalSupply = totalSupply.sub(tokensToBurn);
    
    // Remove from holders
    if (isHolder[msg.sender]) {
      _removeHolder(msg.sender);
    }
    
    emit Transfer(msg.sender, address(0), tokensToBurn);
    
    // Send ETH back
    dest.transfer(tokensToBurn);
  }

  // IDividends

  function getNumTokenHolders() external view override returns (uint256) {
    return holders.length;
  }

  function getTokenHolder(uint256 index) external view override returns (address) {
    // 1-based index; return zero address if out of bounds per interface docs
    if (index == 0 || index > holders.length) {
      return address(0);
    }
    return holders[index - 1];
  }

  function recordDividend() external payable override {
    require(msg.value > 0, "Must send ETH for dividend");
    require(totalSupply > 0, "No tokens in circulation");
    
    uint256 dividendPerToken = msg.value.mul(1e18).div(totalSupply);
    
    for (uint256 i = 0; i < holders.length; i++) {
      address holder = holders[i];
      uint256 holderDividend = balanceOf[holder].mul(dividendPerToken).div(1e18);
      withdrawableDividends[holder] = withdrawableDividends[holder].add(holderDividend);
    }
  }

  function getWithdrawableDividend(address payee) external view override returns (uint256) {
    return withdrawableDividends[payee];
  }

  function withdrawDividend(address payable dest) external override {
    uint256 dividend = withdrawableDividends[msg.sender];
    require(dividend > 0, "No dividend to withdraw");
    
    withdrawableDividends[msg.sender] = 0;
    dest.transfer(dividend);
  }

  function _addHolder(address holder) internal {
    holders.push(holder);
    isHolder[holder] = true;
    holderIndex[holder] = holders.length - 1;
  }

  function _removeHolder(address holder) internal {
    require(isHolder[holder], "Not a holder");
    
    uint256 index = holderIndex[holder];
    uint256 lastIndex = holders.length - 1;
    
    if (index != lastIndex) {
      address lastHolder = holders[lastIndex];
      holders[index] = lastHolder;
      holderIndex[lastHolder] = index;
    }
    
    holders.pop();
    delete isHolder[holder];
    delete holderIndex[holder];
  }

  function _updateHolders(address from, address to) internal {
    // Remove from holders if balance becomes 0
    if (balanceOf[from] == 0 && isHolder[from]) {
      _removeHolder(from);
    }
    
    // Add to holders if not already and has balance
    if (balanceOf[to] > 0 && !isHolder[to]) {
      _addHolder(to);
    }
  }
}