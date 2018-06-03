pragma solidity ^0.4.22;

contract gpContr {
    struct plomba {
        uint    id;
        string  date;
        string  loc;
        address from;
        address tH;
    }
    
    plomba currentCall;
    
    function pushData(uint _id, string _date, string _location) public {
        currentCall = plomba(_id,_date,_location,msg.sender,this);
    }
    
    function getData() public constant returns(address,uint,string,string) {
        return (currentCall.from,currentCall.id,currentCall.date,currentCall.loc);
    }
}