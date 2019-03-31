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
                var tableRef = document.getElementById('table').getElementsByTagName('tbody')[0];
                tableRef.empty();
                for (var i = 1; i <= count; i++) {
                    OrderWholesalerInstance.orderMap(i).then(function (candidate) {
                        var orderid = candidate[0];
                        var comid = candidate[4];
                        var sta = candidate[5];
                        console.log(orderid)
                        $(table).find('tbody').append("<tr><td>"+orderid+"</a></td><td>"+comid+"</td><td>"+sta+"</td></tr>");
                    });
                }
            });
    },


},



    $(window).on("load", function () {
        Stack.render();
    });
