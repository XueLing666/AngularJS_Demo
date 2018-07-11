var myapp = angular.module("myapp",[]);
myapp.controller("myCtrl",function($scope){
	$scope.data = [
		{"name":"芒果干","price":9.9,"number":1},
		{"name":"肉脯","price":15.9,"number":1},
		{"name":"坚果","price":39,"number":1},
		{"name":"薯片","price":3.9,"number":1},
		{"name":"芒果","price":29.9,"number":1}
	];

	//增
	$scope.add = function(index){
		$scope.data[index].number++;
		$scope.sum();
	};

	$scope.lessen = function(index){
		if ($scope.data[index].number == 1) {
			if (confirm("是否将商品移出购物车？")) {
				$scope.data[index].number--;
				$scope.data.splice(index,1);
				$scope.sum();
			}
		}else if ($scope.data[index].number > 1) {
				$scope.data[index].number--;
				$scope.sum();
			}
	};

	$scope.sum = function(){
		$scope.allPrice = 0;
		for(var i=0; i<$scope.data.length; i++){
			$scope.allPrice += $scope.data[i].price * $scope.data[i].number;
		}
	};
	
	$scope.sum();

	$scope.dianji = function(){
		$scope.sum();
	};

	//删
	$scope.delete = function(index){
		if (confirm("是否将商品移出购物车？")) {
			$scope.data.splice(index,1);
			$scope.sum();
		}	
	};
	//查
	$scope.query = function(){
		var newGoods = [];
		var n1 = $scope.name;
		if (n1 == "" || n1 == null) {
			alert("查询条件不能为空");
			return;
		}
		for(var i=0; i<$scope.data.length; i++){
			var n2 = $scope.data[i].name;
			if (n2.indexOf(n1) != -1) {
				newGoods.push($scope.data[i]);
			} 
		}
		if (newGoods.length == 0) {
			alert("没有匹配项");
			return;
		}
		$scope.data = newGoods;
	};
	//增加商品
	$scope.addItem = function(){
		var newGoods = [{"name":$scope.newName,"price":$scope.newPrice,"number":$scope.newNumber}];
		//console.log(newGoods[0].name);
		if ($scope.newName == "" | $scope.newName == null) {
			alert("商品名称不能为空");
		}else if ($scope.newPrice == "" | $scope.newPrice == null) {
			alert("商品单价不能为空");
		}else if ($scope.newNumber == "" | $scope.newNumber == null) {
			$scope.newNumber = 1;
		}else{
			$scope.data.unshift(newGoods[0]);
			//清空输入框内容
			$scope.newName = "";
			$scope.newPrice = "";
			$scope.newNumber = "";
		}
	};
	//在表格修改信息
	$scope.update = function($event,dataObj,name){
		
	var obj = $event.target;					
	if(obj.nodeName=='SPAN'){
		var input = document.createElement("input");
		input.value = obj.innerHTML;
		obj.parentNode.replaceChild(input,obj);
		input.focus();
			
		input.onblur = function(){
	    obj.innerHTML = input.value;
	    dataObj[name] = angular.isNumber(dataObj[name])?parseInt(input.value):input.value;
		input.parentNode.replaceChild(obj,input);
		};		
	}									
};

});