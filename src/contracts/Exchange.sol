// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./Token.sol";
// TODO:
// [X] Set the fee account
// [X] Deposit Ether
// [] Withdraw Ether
// [X] Deposit tokens
// [] Withdraw tokens
// [] Check balances
// [ ] Make order
// [ ] Cancel order
// [ ] Fill order
// [ ] Charge fees

contract Exchange {
      using SafeMath for uint;

    address public feeAccount; // the account that receives the exchange fees
    uint256 public feePercent; // the fee percentage
    address constant ETHER = address(0);

    constructor(address _feeAccount, uint _feePercent) public {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }
    

//                     == Mapping key value pairs Below ==

    mapping(address => mapping(address => uint256)) public tokens;

//                     == Creating Events Below ==
    event Deposit(address token, address user, uint256 amount, uint256 balance);
    event Withdraw(address token, address user, uint256 amount, uint256 balance);


 //================================================================================ Fallback: reverts if Ether is sent to this smart contract by mistake
       function() external {
        revert();
    }

//================================================================================= Deposit Ether Function below
    function depositEther() payable public {
        tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].add(msg.value);
        emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
    }

//================================================================================= Withdraw Ether Function below

    function withdrawEther(uint _amount) public {
        tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].sub(_amount);
        emit Withdraw(ETHER, msg.sender, _amount, tokens[ETHER][msg.sender]);
        
    }

//=================================================================================

    function depositToken(address _token, uint _amount) public {
    // TODO: Don't allow Ether deposits
      require(_token != ETHER);
      require(Token(_token).transferFrom(msg.sender, address(this), _amount));
      tokens[_token][msg.sender] = tokens[_token][msg.sender].add(_amount);
      emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }


//=================================================================================
}





