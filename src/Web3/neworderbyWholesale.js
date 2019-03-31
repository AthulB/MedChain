Stack = {
    web3Provider: null,
    contracts: {},
    account: '0x0',



    render: function () {
        if (typeof web3 !== "undefined") {
            Stack.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            Stack.web3Provider = new Web3(
                new Web3.providers.HttpProvider("http://127.0.0.1:7545")
            );
            web3 = new Web3(Stack.web3Provider);
        }

        $.ajaxSetup({ async: false });
        $.getJSON("UserInfo.json", function (i) {
            //Instantiate a new truffle contract from the artifact
            Stack.contracts.UserInfo = TruffleContract(i);
            //connect provider to interact with contract
            Stack.contracts.UserInfo.setProvider(Stack.web3Provider);
        });

        Stack.contracts.UserInfo.deployed()
            .then(function (instance) {
                UserInfoInstance = instance;
                return UserInfoInstance.userCount();
            })
            .then(function (count) {
                var candidatesResults = $("#select");
                candidatesResults.empty();
                for (var i = 1; i <= count; i++) {
                    UserInfoInstance.userslist(i).then(function (candidate) {
                        var type = candidate[5];
                        if (type == 0) {
                            var dropdown = document.getElementById("select");
                            var dropdown = document.getElementById("select");
                            var opt = document.createElement("option");
                            opt.text = web3.toAscii(candidate[1].toString());
                            opt.value = candidate[0].toString();
                            dropdown.options.add(opt);
                        }
                    });
                }
            });
    },


    initialize :function(){
        if (typeof web3 !== "undefined") {
          Stack.web3Provider = web3.currentProvider;
          web3 = new Web3(web3.currentProvider);
        } else {
          Stack.web3Provider = new Web3(
            new Web3.providers.HttpProvider("http://127.0.0.1:7545")
          );
          web3 = new Web3(Stack.web3Provider);
        }

        $.ajaxSetup({ async: false });
        $.getJSON("OrderWholesaler.json", function (i) {
            //Instantiate a new truffle contract from the artifact
            Stack.contracts.OrderWholesaler = TruffleContract(i);
            //connect provider to interact with contract
            Stack.contracts.OrderWholesaler.setProvider(Stack.web3Provider);
        });

        Stack.contracts.OrderWholesaler.deployed().then(function (instance) {
            OrderWholesalerInstance = instance;
            return OrderWholesalerInstance.startOrder(1).then(function (i) {
                
            })
        })
    },


    
    addCarton: function (e, medName2, medCount2){
        var lol;
        if(medName2=='Crocin'){
            var id = 1
        }
        else if(medName2=='Eno') {
            var id = 2
        }

        if (typeof web3 !== "undefined") {
          Stack.web3Provider = web3.currentProvider;
          web3 = new Web3(web3.currentProvider);
        } else {
          Stack.web3Provider = new Web3(
            new Web3.providers.HttpProvider("http://127.0.0.1:7545")
          );
          web3 = new Web3(Stack.web3Provider);
        }
        $.ajaxSetup({ async: false });
        $.getJSON("UserInfo.json", function (i) {
            //Instantiate a new truffle contract from the artifact
            Stack.contracts.UserInfo = TruffleContract(i);
            //connect provider to interact with contract
            Stack.contracts.UserInfo.setProvider(Stack.web3Provider);
        });

        Stack.contracts.UserInfo.deployed().then(function (instance) {
            UserInfoInstance = instance;

            return UserInfoInstance.userMap(e).then(function (i) {
               lol  = i
               console.log(lol.toNumber()-1)
            })
        })
        console.log(lol.toNumber()-1)
        $.ajaxSetup({ async: false });
        $.getJSON("OrderWholesaler.json", function (i) {
            //Instantiate a new truffle contract from the artifact
            Stack.contracts.OrderWholesaler = TruffleContract();
            //connect provider to interact with contract
            Stack.contracts.OrderWholesaler.setProvider(Stack.web3Provider);
        });

        Stack.contracts.OrderWholesaler.deployed().then(function (instance) {
            OrderWholesalerInstance = instance;
            return OrderWholesalerInstance.addMedToOrder(id,medCount2,lol.toNumber()-1).then(function (i) {
                return i
            })
        })

    }



},



    $(window).on("load", function () {
        Stack.render();
    });



function extr() {
    var e = $('#select').find(":selected").val();

    var medName1 = $("#medName1").val();
    var medCount1 = $("#medCount1").val();
    var count = 1
    if ($("#medName2").val() != ""){
        var medName2 = $("#medName2").val();
        var medCount2 = $("#medCount2").val();
        count = 2;
    }

    if ($("#medName3").val() != "") {
        var medName3 = $("#medName3").val();
        var medCount3 = $("#medCount3").val();
        count = 3;
    }
    if ($("#medName4").val() != "") {
        var medName4 = $("#medName4").val();
        var medCount4 = $("#medCount4").val();
        count = 4;
    }

    Stack.initialize();
    if(count==4){
        Stack.addCarton(e,medName1,medCount1);
        Stack.addCarton(e, medName2, medCount2);
        Stack.addCarton(e, medName3, medCount3);
        Stack.addCarton(e, medName4, medCount4);
    }
    else if(count==3){
        Stack.addCarton(e, medName1, medCount1);
        Stack.addCarton(e, medName2, medCount2);
        Stack.addCarton(e, medName3, medCount3);
    }
    else if (count == 2) {
        Stack.addCarton(e, medName1, medCount1);
        Stack.addCarton(e, medName2, medCount2);
    }
    else if (count == 1) {
        Stack.addCarton(e, medName1, medCount1);
    }
}