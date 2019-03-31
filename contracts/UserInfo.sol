pragma solidity ^0.5.0;

contract UserInfo {

	enum userType{
		Manufacturer,
		WholeSale_Dealer,
		Pharmasists,
		Admin,
		Transporter
	}
	//Model an order
	struct User {
		address accountId;
		bytes32 name;
		bytes32 email;
		bytes32 contactNumber;
		bytes32 licenseid;
		userType utype;
	}

	//storing number of users
	uint public userCount;
	address public admin;
	bytes32 admin_license;
	
	//Store the users in the system
	mapping(uint=> User ) public userslist;
	//map for userindex to account address
	mapping(address=>uint) public userMap;

	constructor() public {
		addUser(0xF5D2D22681dB772507EF48BE6474Ab5037c10445,"sdf","sdfsdf@gmail.com","9769577063","asdasd",userType.Admin);
		addUser(0x50BB13C54482AEb8c4085BdfE72556adC698C57F,"sdf","sdfsdf@gmail.com","9769577063","asdasd",userType.Manufacturer);
		addUser(0x820FdF60e9e160F147249C82158866175a2F0844,"sdf","sdfsdf@gmail.com","9769577063","asdasd",userType.WholeSale_Dealer);
		addUser(0x86F990A75DF2A4993357bb0D5D9cCE2ca7d98a28,"sdf","sdfsdf@gmail.com","9769577063","asdasd",userType.Pharmasists);
		addUser(0xf32E838a29B25d7dE0E59f9FbAF63116426C64e4,"sdf","sdfsdf@gmail.com","9769577063","asdasd",userType.Transporter);
		userCount = 5;
	}

	modifier onlyAdmin{ 
		require (msg.sender == admin); 
		_; 
	}

	function stringToBytes32(string memory source) public returns (bytes32 result) {
	    bytes memory tempEmptyStringTest = bytes(source);
	    if (tempEmptyStringTest.length == 0) {
	        return 0x0;
	    }

	    assembly {
	        result := mload(add(source, 32))
	    }
	}
	

	function addUser(address account,string memory uname,string memory uemail,string memory ucontactNumber, string memory ulicenseid, userType utype) public{
        bytes32 name = stringToBytes32(uname);
        bytes32 email = stringToBytes32(uemail);
        bytes32 contactNumber = stringToBytes32(ucontactNumber);
        bytes32 licenseid = stringToBytes32(ulicenseid);
        userslist[++userCount] = User(account, name, email, contactNumber, licenseid, utype);
        userMap[account] = userCount;
	}

	function getValue(uint _index)public returns (uint){
      return uint(userslist[_index].utype);
  }

}

