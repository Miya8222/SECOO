var shopCartdatas = {
    shopcartdatas: [{
        "checked": false,
        "supplier": "",
        "num": 0,
        "saveandremove": true,
        "type": "商品",
    }]
}
var vm = new Vue({
    el: "#myVue",
    data: {
        shopTableDatas: shopCartdatas.shopcartdatas,
        /*默认选择标签*/
        checkedAll: false, //全选状态
        stopDelete: "", //定时器id(用于清空定时器)

        /*关键字段初始化*/
        goodNums: 0, //商品总数
        totalMoney: 0, //总价格
        goodsNum: 0, //商品的数量
    },

    methods: {
        /*商品数量增加减少函数*/
        goodNum: function(item, way) {
            if (way == 1) {
                item.num++;
                vm.countTotalMoney()
            } else {
                if (item.num < 2) {
                    item.num = 1;
                } else {
                    item.num--;
                    vm.countTotalMoney()
                }

            }
        },

        /*单选函数*/
        checkedRadioBtn: function(tabledatas) {
            this.countTotalMoney()
                /*单选计算商品数量*/
            if (tabledatas.type == "商品" && tabledatas.checked == true) {
                this.goodsNum += 1;
            } else if (tabledatas.type == "商品" && tabledatas.checked == false) {
                this.goodsNum -= 1;
            } else {
                console.log("未知错误！")
            }
        },

        /*全选函数*/
        checkedAllBtn: function(checkedAll) {
            var _this = this;
            /*全选计算商品或服务数量*/
            if (checkedAll == true) {
                for (x in this.shopTableDatas) {
                    this.shopTableDatas[x].checked = true;
                    if (this.shopTableDatas[x].type == "商品") {
                        _this.goodsNum += 1;
                    }
                }
            } else {
                for (y in this.shopTableDatas) {
                    this.shopTableDatas[y].checked = false;
                    this.goodsNum = 0;
                    this.serviceNum = 0;
                }
            }
            vm.countTotalMoney();
        },

        /*保存购买数据*/
        saveData: function() {
            if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                sidbox = $.cookie('cookiesid').split(',');
                numbox = $.cookie('cookienum').split(',');
                console.log(sidbox, numbox);
                for (let i = 0; i < sidbox.length; i++) {
                    rendercart(sidbox[i], numbox[i]);
                }
            }

            function rendercart(sid, num) { //sid:商品的编号  num:商品的数量
                $.ajax({
                    url: 'http://localhost/www/SECOO/php/listpagedata.php'
                }).then(function(data) {
                    data = JSON.parse(data);
                    // console.log(data);
                    let total = 0;
                    $.each(data, function(index, value) {
                        // console.log(value);
                        let strhtml = '';
                        if (value.sid == sid) {
                            strhtml += `
                            <tr v-for="(tabledatas,index) in shopTableDatas">
                                <td class="selectLeft">
                                    <template>
                                    <el-checkbox @change="checkedRadioBtn(tabledatas)" v-model="tabledatas.checked"></el-checkbox>
                                </template>
                                    <span class="goodName">
                                    <img class="goodImg" src="${value.url}" />
                                </span>
                                    <span class="goodName goodsName">
                                    <h2 class="goodname" v-text="tabledatas.name">${value.title}</h2>
                                    </span>
                                </td>
                                <td class="danPrice">${value.price}</td>
                                <td>
                                    <i @click="goodNum(tabledatas,-1)" class="fa  deleteBtn" aria-hidden="true">-</i>
                                    <input v-model="tabledatas.num" type="text" class="form-control numInput" aria-label="..." value="${num}">
                                    <i @click="goodNum(tabledatas,1)" class="fa  addBtn" aria-hidden="true">+</i>
                                </td>
                                <td>
                                    <p class="totalPrice">${(value.price*num).toFixed(2)}</p>
                                </td>
                                <td class="gongneng">
                                    <p class="deletegoods" @click="alertRadio(index)">删除</p>
                                    <template v-if="tabledatas.saveandremove">
                                </template>
                                    <template v-else>
                                </template>
                                </td>
                            </tr>
                            `;
                            $('tbody').get(0).innerHTML += strhtml;
                            total = Number($('.totalPrice').html());
                            // console.log(total);
                        }
                        $('.totalMoneyClass').html(total);
                    })
                });
            }
        }(),
        // /*计算商品总价函数*/
        countTotalMoney: function() {},
        /*提示删除单个商品*/
        alertRadio: function(index) {
            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!',
                    callback: vm.deletegoods(index)
                });
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '已取消删除'
                });
            });
        },
    }
});