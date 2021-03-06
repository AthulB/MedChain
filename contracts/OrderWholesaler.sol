pragma solidity ^0.5.0;

import "./UserInfo.sol";

contract OrderWholesaler{
	
	
	UserInfo user;
	uint public orderCount;
	uint public distinctOrders;
	uint defManId;
	uint userId;

	//struct of order placed by wholesaler
	struct Order{
		uint orderId;
		uint medId;
		uint count;
		uint uid;
		uint manId;
		uint status;
	}

	constructor() public{
		user = new UserInfo();
		userId = user.userMap(msg.sender);
		startOrder(1);
		addMedToOrder(1,50,1);
		addMedToOrder(2,100,1);
	}

	mapping(uint=>Order) public orderMap;
	Order public obj;

	//initialize order object
	function startOrder(uint manId) public {
		++distinctOrders;
	}

	//complete and place order
	// function placeOrder(uint manId) public{
	// 	obj.manId = manId;
	// 	orderMap[++orderCount] = obj;
	// }

	//append medicines to list
	function addMedToOrder(uint medId, uint count,uint manId) public {
		uint orderId = distinctOrders;
		obj = Order(orderId,medId,count,userId,manId,0);
		orderMap[++orderCount] = obj;
	}

	function acceptOrder(uint orderId) public{
		require(orderId<=distinctOrders);
		for(uint i=1;i<orderCount;i++){
			if(orderMap[i].status == 0){
				if(orderMap[i].orderId == orderId){
					orderMap[i].status = uint(1);
				}
			}
			
		}
	}

	function rejectOrder(uint orderId) public{
		require(orderId<=distinctOrders);
		for(uint i=1;i<orderCount;i++){
			if(orderMap[i].status == 0){
				if(orderMap[i].orderId == orderId){
					orderMap[i].status = uint(2);
				}
			}
		}
	}

}