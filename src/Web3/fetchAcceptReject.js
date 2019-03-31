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
        $.getJSON("OrderWholesaler.json", function (i) {
            //Instantiate a new truffle contract from the artifact
            Stack.contracts.OrderWholesaler = TruffleContract(i);
            //connect provider to interact with contract
            Stack.contracts.OrderWholesaler.setProvider(Stack.web3Provider);
        });

        Stack.contracts.OrderWholesaler.deployed().then(function (instance) {
                OrderWholesalerInstance = instance;
                return OrderWholesalerInstance.orderCount();
            }).then(function (count) {
                // var candidatesResults = $("#select");
                // candidatesResults.empty();
                for (var i = 1; i <= count; i++) {
                    OrderWholesalerInstance.orderMap(i).then(function (candidate) {
                        var orderId = (candidate[0]).toNumber();
                        var medId = (candidate[1]).toNumber();
                        var count = (candidate[2]).toNumber();
                        var uid = (candidate[3]).toNumber();
                        var manId = (candidate[4]).toNumber();
                        var status = (candidate[5]).toNumber();
                        var medname
                        var stat
                        if(medId == 1){
                            medname='Crocin';
                        }
                        else if(medId == 2){
                            medname='Eno';
                        }
                        else if(medId == 3){
                            medname='Vicks';
                        }
                        else if(medId == 4){
                            medname='Moov';
                        }
                        if(status == 0){
                            stat='Pending';
                        }
                        else if(medId == 1){
                            stat='Accepted';
                        }
                        console.log(medname)
                        $("#tblEntAttributes tbody").append("<tr><td>"+medname+"</td><td>"+orderId+"</td><td>"+count+"</td><td>"+manId+"</td><td>"+stat+"</td><td><button class='btn btn-success'>Success</button></td><td><button class='btn btn-danger'>Reject</button></td></tr>");
                    });
                }
            });
    },
    


},



    $(window).on("load", function () {
        Stack.render();
    });


