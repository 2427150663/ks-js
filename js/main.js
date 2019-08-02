let $ = function (sel) {
    return document.querySelector(sel);
}
//报告查询
class reportSeach {
    constructor() {
        //导航举报号输入框
        this.navIpt = $("nav .con .seach input");
        //导航举报查询按钮
        this.navBtn = $("nav .con .seach span");
        //查询结果输入框
        this.seachIpt = $("section .conter .btm .seach input");
        //查询举报查询按钮
        this.seachBtn = $("section .conter .btm .seach button");
        //是否在查询中
        this.loading = false;
        //查询中动画
        this.seachAnimate = $("section .conter .btm #spend");
        //查询结果
        this.seachOver = $("section .conter .btm .seachOver");
    }
    init() {
        this.onload();
        this.bindEvent();
    }
    bindEvent() {
        this.navBtn.addEventListener("click", this.navSeach.bind(this), false);
        if (this.seachBtn) {
            this.seachBtn.addEventListener("click", this.getSeachList.bind(this), false);
        }
    }
    onload() {
        if (window.location.search != "") {
            this.seachIpt.value = window.location.search.split("=")[1];
            this.getSeachList();
        }
    }
    navSeach() {
        let iptVal = this.navIpt.value;
        if (iptVal.trim() != "") {
            window.open("seach.html?number=" + iptVal, "_black")
        } else {
            window.open("seach.html", "_black")
        }
    }
    getSeachList() {
        if (this.loading) {
            return false;
        }
        let ipt1 = this.seachIpt.value;
        if (ipt1.trim() != "") {
            this.loading = true;
            this.seachAnimate.style.display = "block";
            this.seachOver.style.display = "none";
            setTimeout(() => {
                this.loading = false
                this.seachAnimate.style.display = "none";
                this.seachOver.style.display = "block";
            }, 3000)
        }
    }

}
//分页跳转
class pageJump {
    constructor() {
        //上一页
        this.pageTop = $("section .conter .btm .page .pageSize .icon-zuo");
        //分页输入框
        this.pageIpt = $("section .conter .btm .page .pageSize input");
        //下一页
        this.pageBtm = $("section .conter .btm .page .pageSize .icon-you");
        //总数
        this.total = 0;
        //当前页码
        this.pageIndex = 1;
    }
    init() {
        this.getList();
        this.bindEvent();
    }
    bindEvent() {
        if (this.pageBtm) {
            this.pageIpt.addEventListener("blur", this.getPageList.bind(this), false);
            this.pageTop.addEventListener("click", this.getPageTop.bind(this), false);
            this.pageBtm.addEventListener("click", this.getpageBtm.bind(this), false);
        }
    }
    getPageTop() {
        this.pageIpt.value = this.pageIpt.value * 1 - 1;
        this.pageChange();
    }
    getpageBtm() {
        this.pageIpt.value = this.pageIpt.value * 1 + 1;
        this.pageChange();
    }
    getPageList() {
        this.pageChange();
    }
    pageChange() {
        if (this.pageIndex == this.pageIpt.value) {
            return this.pageIpt.value = this.pageIpt.value * 1;
        }
        this.pageIndex = this.pageIpt.value * 1;
        if (this.pageIndex < 1) {
            this.pageIndex = 1;
        }
        if (this.pageIndex > this.total) {
            this.pageIndex = this.total;
        }
        this.pageIpt.value = this.pageIndex;
        this.getList();
    }
    getList() {
        //法律分页总条目
        this.total = 20;
    }
}
//兵团举报提交
class regionSubmit {
    constructor() {
        //上传图片file
        this.fileIpt = $("#chooseImage input");
        //图片插入容器
        this.titImg = $(".bleftCon .form .iptForm #imgList");
        //图片对象存储
        this.imgArr = [];
        //图片预览显示
        this.imgShow = $("#imgShow");
        //图片预览关闭
        this.imghide = $("#imgShow #bgimg .closeImg");
        //预览图片
        this.imgShowUrl = $("#imgShow #bgimg img");
        //性别切换
        this.sex = $(".bleftCon .form .iptForm #sex");
        //双性别
        this.sexTwo = document.querySelectorAll(".bleftCon .form .iptForm #sex .radio");
        //提交
        this.dataSubmit = $(".bleftCon .form .iptForm .submit");
        //重置
        this.dataChong = $(".bleftCon .form .iptForm .reset");
        //form表单
        this.formData = $("section .conter .btm #formData");
        //表单下的所有input
        this.formIpt = document.querySelectorAll("section .conter .btm #formData input");
        //表单下的所有textarea
        this.formText = document.querySelectorAll("section .conter .btm #formData textarea");
        //表单下的所有select
        this.formSel = document.querySelectorAll("section .conter .btm #formData select");
        //表单所有数据
        this.obj = {};
        //举报提交内容
        this.region = $("section .conter #region");
        //举报成功
        this.success = $("section .conter #success");
        //继续举报
        this.goOn = $("section .conter #success .bLeCon .suBtn a");
        //姓名
        this.txtRealName = $("section .conter #txtRealName");
        //电话
        this.txtPhone = $("section .conter #txtPhone");
        //邮箱
        this.txtEmail = $("section .conter #txtEmail");
        //举报类型
        this.selSiteType = $("section .conter #selSiteType");
        //网站名称
        this.txtSiteName = $("section .conter #txtSiteName");
        //被举报网址(url)
        this.txtSiteUrl = $("section .conter #txtSiteUrl");
        //信息所在详情网址(url)
        this.txtInfoUrl = $("section .conter #txtInfoUrl");
        //举报内容
        this.txtContent = $("section .conter #txtContent");
        //验证码
        this.codeNumber = $("section .conter #codeNumber");
        //城市集合
        this.cityList = [];
        //省
        this.peoplearea = $("section .conter #peoplearea");
        //市
        this.peoplearea2 = $("section .conter #peoplearea2");
        //县
        this.peoplearea3 = $("section .conter #peoplearea3");
    }
    init() {
        if (this.dataSubmit) {
            this.getcityList();
            this.bindEvent();
        }
    }
    bindEvent() {
        if (this.fileIpt) {
            //图片上传
            this.fileIpt.addEventListener("change", this.fileIptForm.bind(this), false);
            //图片预览/删除
            this.titImg.addEventListener("click", this.imgClick.bind(this), false);
            //关闭图片预览
            this.imghide.addEventListener("click", this.imgClickhide.bind(this), false);
            //性别切换
            this.sex.addEventListener("click", this.sexChange.bind(this), false);
            //提交
            this.dataSubmit.addEventListener("click", this.SubmitData.bind(this), false);
            //重置
            this.dataChong.addEventListener("click", this.SubmitReset.bind(this), false);
            //验证不能大于200字符
            this.txtContent.addEventListener("input", this.count.bind(this), false);
            //继续上报
            this.goOn.addEventListener("click", this.goOnRegion.bind(this), false);
            //姓名
            this.txtRealName.addEventListener("blur", this.txtRealNameBlur.bind(this), false);
            //电话
            this.txtPhone.addEventListener("blur", this.txtPhoneBlur.bind(this), false);
            //邮箱
            this.txtEmail.addEventListener("blur", this.txtEmailBlur.bind(this), false);
            //省
            this.peoplearea.addEventListener("blur", this.peopleareaBlur.bind(this), false);
            //市
            this.peoplearea2.addEventListener("blur", this.peopleareaBlur2.bind(this), false);
            //县
            this.peoplearea3.addEventListener("blur", this.peopleareaBlur3.bind(this), false);
            //被举报类型
            this.selSiteType.addEventListener("blur", this.selSiteTypeBlur.bind(this), false);
            //网站名称
            this.txtSiteName.addEventListener("blur", this.txtSiteNameBlur.bind(this), false);
            //网站网址
            this.txtSiteUrl.addEventListener("blur", this.txtSiteUrlBlur.bind(this), false);
            //信息所在详情网址(url)
            this.txtInfoUrl.addEventListener("blur", this.txtInfoUrlBlur.bind(this), false);
            //举报内容
            this.txtContent.addEventListener("blur", this.txtContentBlur.bind(this), false);
            //验证码
            this.codeNumber.addEventListener("blur", this.codeNumberBlur.bind(this), false);
            //省
            this.peoplearea.addEventListener("change", this.peopleareaChange.bind(this), false);
            //市
            this.peoplearea2.addEventListener("change", this.peopleareaChange2.bind(this), false);
            //县
            this.peoplearea3.addEventListener("change", this.peopleareaChange3.bind(this), false);
            //市区下标
            this.len1 = "";
            //县级下标
            this.len2 = "";
        }
    }
    //获取全国城市
    getcityList() {
        fetch('http://yapi.demo.qunar.com/mock/70481/getCityList')
            .then(response => response.json())
            .then(data => {
                this.cityList = data.data.result;
                let htm = `<option value="">--请选择--</option>`;
                this.cityList.forEach((x, i) => {
                    htm += `<option value='${x.name}'>${x.name}</option>`
                })
                this.peoplearea.innerHTML = htm;
            });
    }
    //市区
    cityChange(city) {
        if (city.trim() == "") {
            return;
        }
        let val = city;
        var i = this.cityList.length;
        while (i--) {
            if (this.cityList[i].name === val) {
                this.len1 = i;
            }
        }
        let htm = `<option value="">--请选择--</option>`;
        this.cityList[this.len1].city.forEach((x, i) => {
            htm += `<option value='${x.name}'>${x.name}</option>`
        })
        this.peoplearea2.innerHTML = htm;
    }
    //县区
    cityChange2(shi) {
        if (shi.trim() == "") {
            return;
        }
        let len1 = this.len1;
        let val = shi;
        var i = this.cityList[len1].city.length;
        while (i--) {
            if (this.cityList[len1].city[i].name === val) {
                this.len2 = i;
            }
        }
        let htm = `<option value="">--请选择--</option>`;
        if (this.cityList[this.len1].city[this.len2].area) {
            this.cityList[this.len1].city[this.len2].area.forEach((x, i) => {
                htm += `<option value='${x}'>${x}</option>`
            })
            this.peoplearea3.innerHTML = htm;
        }
    }
    //姓名验证
    txtRealNameBlur() {
        if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(this.txtRealName.value.trim()))) {
            $("#txtRealName").classList.add("red");
            this.add1($("#txtRealName").parentNode, "请输入正确的姓名")
        } else {
            this.add1($("#txtRealName").parentNode, "")
        }
    }
    //电话验证
    txtPhoneBlur() {
        if (!(/^1[3456789]\d{9}$/.test(this.txtPhone.value.trim()))) {
            $("#txtPhone").classList.add("red");
            this.add1($("#txtPhone").parentNode, "请输入正确的电话")
        } else {
            this.add1($("#txtPhone").parentNode, "")
        }
    }
    //邮箱验证
    txtEmailBlur() {
        var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
        if (!reg.test(this.txtEmail.value.trim())) {
            $("#txtEmail").classList.add("red");
            this.add1($("#txtEmail").parentNode, "请输入正确的电子邮箱");
        } else {
            this.add1($("#txtEmail").parentNode, "")
        }
    }
    //区域
    peopleareaBlur() {
        this.peoplearea2.classList.add("show");
        this.peoplearea3.classList.add("show");
        if (this.selected($("#peoplearea")).trim() == "") {
            $("#peoplearea").classList.add("red");
            this.add1($("#peoplearea").parentNode, "请选择区域", 0);
        } else {
            this.add1($("#peoplearea").parentNode, "", 0);
            this.peoplearea2.classList.remove("show");
            this.peoplearea2.classList.remove("red");
        }
    }
    peopleareaBlur2() {
        this.peoplearea3.classList.add("show");
        if (this.selected($("#peoplearea2")).trim() == "") {
            $("#peoplearea2").classList.add("red");
            this.add1($("#peoplearea2").parentNode, "请选择区域", 1);
        } else {
            this.add1($("#peoplearea2").parentNode, "", 1);
            this.peoplearea3.classList.remove("show");
            this.peoplearea3.classList.remove("red");
        }
    }
    peopleareaBlur3() {
        if (this.selected($("#peoplearea3")).trim() == "") {
            $("#peoplearea3").classList.add("red");
            this.add1($("#peoplearea3").parentNode, "请选择区域", 2);
        } else {
            this.add1($("#peoplearea3").parentNode, "", 2);
        }
    }
    //区域
    peopleareaChange() {
        this.peopleareaBlur();
        this.cityChange(this.selected($("#peoplearea")));
    }
    peopleareaChange2() {
        this.peopleareaBlur2();
        this.cityChange2(this.selected($("#peoplearea2")));
    }
    peopleareaChange3() {
        this.peopleareaBlur3();
    }

    //被举报类型
    selSiteTypeBlur() {
        if (this.selected($("#selSiteType")).trim() == "") {
            $("#selSiteType").classList.add("red");
            this.add1($("#selSiteType").parentNode, "请选择举报类型");
        } else {
            this.add1($("#selSiteType").parentNode, "", 0);
        }
    }

    //网站名称
    txtSiteNameBlur() {
        if ($("#txtSiteName").value.trim() == "") {
            $("#txtSiteName").classList.add("red");
            this.add1($("#txtSiteName").parentNode, "请输入网站名称");
        } else {
            this.add1($("#txtSiteName").parentNode, "");
        }
    }
    //举报网址
    txtSiteUrlBlur() {
        var reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
        if (!reg.test(this.txtSiteUrl.value.trim())) {
            $("#txtSiteUrl").classList.add("red");
            this.add1($("#txtSiteUrl").parentNode, "请输入正确的举报网址");
        } else {
            this.add1($("#txtSiteUrl").parentNode, "");
        }
    }
    //信息所在详情网址(url)
    txtInfoUrlBlur() {
        let arr = $("#txtInfoUrl").value.trim().split(/[(\r\n)\r\n]+/);
        var reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
        if ($("#txtInfoUrl").value.trim() == "") {
            $("#txtInfoUrl").classList.add("red");
            this.add1($("#txtInfoUrl").parentNode, "请输入信息所在详情网址(url)");
            return;
        }
        arr.forEach((x, i) => {
            if (x.trim() != "") {
                if (!reg.test(x.trim())) {
                    $("#txtInfoUrl").classList.add("red");
                    this.add1($("#txtInfoUrl").parentNode, `第${i + 1}行网址有误`);
                } else {
                    this.add1($("#txtInfoUrl").parentNode, "");
                }
            }
        })
    }
    //举报内容
    txtContentBlur() {
        if ($("#txtContent").value.trim() == "") {
            $("#txtContent").classList.add("red");
            this.add1($("#txtContent").parentNode, "请输入举报内容");
        } else {
            this.add1($("#txtContent").parentNode, "");
        }
    }
    //验证码
    codeNumberBlur() {
        if ($("#codeNumber").value.trim() == "") {
            $("#codeNumber").classList.add("red");
            this.add1($("#codeNumber").parentNode, "请输入验证码");
            return;
        }
        if ($("#codeNumber").value.trim() != 7364) {
            $("#codeNumber").classList.add("red");
            this.add1($("#codeNumber").parentNode, "验证码不对，请重新输入");
        } else {
            this.add1($("#codeNumber").parentNode, "");
        }

    }
    //继续举报
    goOnRegion() {
        this.success.classList.add("show");
        this.region.classList.remove("show");
        this.SubmitReset();
        this.txtRealName.focus();
    }
    //重置
    SubmitReset() {
        //清空附件图片
        var id2 = document.getElementById('imgList');
        var id2Div = id2.querySelectorAll(".titImg");
        // 此处一定要先保存好length 因为removeChild对画面是实时影响
        var length = id2Div.length;
        for (var i = 0; i < length - 1; i++) {
            id2Div[i].remove();
        }
        //性别重置
        for (let i = 0; i < 2; i++) {
            this.sexTwo[i].setAttribute("class", "radio");
        }

        this.sexTwo[0].setAttribute("class", "radio checked");
        //** */姓名
        $("#txtRealName").value = "";
        //*** */电话号码
        $("#txtPhone").value = "";
        //*** */电子邮箱
        $("#txtEmail").value = "";
        //***** */区域
        this.selectedNull($("#peoplearea"));
        this.selectedNull($("#peoplearea2"));
        this.selectedNull($("#peoplearea3"));
        $("#peoplearea2").classList.add("show");
        $("#peoplearea3").classList.add("show");
        //通讯地址
        $("#txtAddress").value = "";
        //**** */举报类型
        this.selectedNull($("#selSiteType"));
        //**** */网站名称
        $("#txtSiteName").value = "";
        //**** */被举报网址(url)
        $("#txtSiteUrl").value = "";
        //****** */信息所在详情网址(url)
        $("#txtInfoUrl").value = "";
        //****举报内容 */
        $("#txtContent").value = "";
        //危害类型
        this.selectedNull($("#selHarmType"));
        //附件
        this.imgArr.length = 0;
        //验证码
        $("#codeNumber").value = "";
        //清空所有提示
        var id2 = this.formData;
        var id2Div = id2.querySelectorAll(".txtred");
        // 此处一定要先保存好length 因为removeChild对画面是实时影响
        var length = id2Div.length;
        for (var i = 0; i < length; i++) {
            id2Div[i].remove();
        }
        this.formIpt.forEach(x => {
            x.classList.remove("red")
        })
        this.formText.forEach(x => {
            x.classList.remove("red")
        })
        this.formSel.forEach(x => {
            x.classList.remove("red")
        })
    }
    //提交
    SubmitData() {
        this.yanzheng();
        if (!$("section .conter .btm #formData .right .red")) {
            this.success.classList.remove("show");
            this.region.classList.add("show");
            //所有的上传内容
            this.getFormData();
        }
    }
    //获取所有的上传内容
    getFormData() {
        this.obj = {
            //** */姓名
            txtRealName: $("#txtRealName").value.trim(),
            //*** */性别
            sex: $("#sex .radioLeft .checked").getAttribute("data-radio"),
            //*** */电话号码
            txtPhone: $("#txtPhone").value.trim(),
            //*** */电子邮箱
            txtEmail: $("#txtEmail").value.trim(),
            //***** */区域省
            peoplearea: this.selected($("#peoplearea")),
            //***** */区域市
            peoplearea2: this.selected($("#peoplearea2")),
            //***** */区域区
            peoplearea3: this.selected($("#peoplearea3")),
            //通讯地址
            txtAddress: $("#txtAddress").value.trim(),
            //**** */举报类型
            selSiteType: this.selected($("#selSiteType")),
            //**** */网站名称
            txtSiteName: $("#txtSiteName").value.trim(),
            //**** */被举报网址(url)
            txtSiteUrl: $("#txtSiteUrl").value.trim(),
            //****** */信息所在详情网址(url)
            txtInfoUrl: $("#txtInfoUrl").value.trim().split(/[(\r\n)\r\n]+/),
            //****举报内容 */
            txtContent: $("#txtContent").value.trim(),
            //危害类型
            selHarmType: this.selected($("#selHarmType")),
            //附件
            fileList: this.imgArr,
            //**** */验证码
            codeNumber: $("#codeNumber").value.trim()
        }
        console.log(JSON.stringify(this.obj));
    }
    //所有的验证方法集合
    yanzheng() {
        this.txtRealNameBlur();
        this.txtPhoneBlur();
        this.txtEmailBlur();
        this.selSiteTypeBlur();
        this.txtSiteNameBlur();
        this.txtSiteUrlBlur();
        this.txtInfoUrlBlur();
        this.txtContentBlur();
        this.codeNumberBlur();
        if (this.selected($("#peoplearea")).trim() == "") {
            $("#peoplearea").classList.add("red");
            this.add1($("#peoplearea").parentNode, "请选择区域", 0);
        }
        if ($("#peoplearea2").getAttribute("class") != "show") {
            if (this.selected($("#peoplearea2")).trim() == "") {
                $("#peoplearea2").classList.add("red");
                this.add1($("#peoplearea2").parentNode, "请选择区域", 0);
            }
        }
        if ($("#peoplearea3").getAttribute("class") != "show") {
            if (this.selected($("#peoplearea3")).trim() == "") {
                $("#peoplearea3").classList.add("red");
                this.add1($("#peoplearea3").parentNode, "请选择区域", 0);
            }
        }
    }
    //select选择
    selected(sel) {
        if (sel.getAttribute("class") == "show") {
            return;
        }
        var obj = sel//定位id
        var index = obj.selectedIndex; // 选中索引
        var text = obj.options[index].innerHTML; // 选中文本
        var value = obj.options[index].value; // 选中值
        return value;
    }
    //select清空
    selectedNull(sel) {
        sel.selectedIndex = 0;
    }
    //汉字替换成英文
    getStringUTFLength(str) {
        var value = str.replace(/[\u4e00-\u9fa5]/g, "ss");
        //将汉字替换为两个空格
        return value.length;
    }
    //字符多余替换
    leftUTFString(str, len) {
        if (this.getStringUTFLength(str) <= len) {
            return str;
        }
        var value = str.substring(0, len);
        while (this.getStringUTFLength(value) > len) {
            value = value.substring(0, value.length - 1);
        }
        return value;
    }
    //字符不能超过200验证
    count() {
        var len = 200;
        var value = this.txtContent.value.trim();
        if (this.getStringUTFLength(value) >= len) {
            this.txtContent.value = this.leftUTFString(this.txtContent.value, len);
        }
    }
    //追加提示节点
    add1(dom, str, num) {
        if (dom.querySelector(".txtred")) {
            dom.querySelector(".txtred").remove();
        }
        if (dom.querySelector(".txtred") && str != "") {
            return
        }
        if (str == "") {
            if (dom.querySelector("input")) {
                dom.querySelector("input").classList.remove("red");
            }
            if (dom.querySelector("textarea")) {
                dom.querySelector("textarea").classList.remove("red");
            }
            if (dom.querySelectorAll("select")[num]) {
                dom.querySelectorAll("select")[num].classList.remove("red");
            }
        } else {
            //获取到ul标签
            var ul1 = dom;
            //创建标签
            var li1 = document.createElement("span");
            li1.setAttribute("class", "txtred");
            //创建文本
            var tex1 = document.createTextNode(str);
            //把文本加入到li下面
            li1.appendChild(tex1);
            //把li加入到ul下面
            ul1.appendChild(li1);
        }
    }
    //性别选择
    sexChange(e) {
        var e = e || window.event;
        var tar = e.target || e.srcElement;
        if (tar.getAttribute("class") == "radio") {
            for (let i = 0; i < 2; i++) {
                this.sexTwo[i].setAttribute("class", "radio");
            }
            tar.setAttribute("class", "radio checked");
        }
    }
    //关闭图片预览
    imgClickhide() {
        this.imgShow.classList.add("show");
    }
    //操作图片
    imgClick(e) {
        var e = e || window.event;
        var tar = e.target || e.srcElement;
        //预览
        if (tar.getAttribute("class") == "iconfont icon-yanjing") {
            this.imgShow.classList.remove("show");
            this.imgShowUrl.src = tar.getAttribute("data-src");
        }
        //删除
        if (tar.getAttribute("class") == "iconfont icon-laji") {
            tar.parentNode.parentNode.remove();
            this.imgArr.forEach((x, i) => {
                if (x.imgUrl == tar.getAttribute("data-src")) {
                    this.imgArr.splice(i, 1);
                }
            })
        }
    }
    //图片上传
    fileIptForm() {
        let file = this.fileIpt.files[0];
        var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
        if (!rFilter.test(file.type)) {
            // alert("文件格式必须为图片");
            return;
        }
        var urlsrc = window.URL.createObjectURL(this.fileIpt.files[0]);
        var newNode = document.createElement("div"); // createElement 是在对象中创建一个对象
        newNode.setAttribute("class", "titImg");
        newNode.innerHTML = `<img src='${urlsrc}' alt="" width="84px" height="84px")'>
                            <div class="hoverBg">
                                <span class="iconfont icon-yanjing" data-src="${urlsrc}"></span>
                                <span class="iconfont icon-laji" data-src="${urlsrc}"></span>                          
                            </div>`;
        var list = this.titImg;
        list.insertBefore(newNode, list.childNodes[0]);
        this.imgArr.push({
            imgUrl: urlsrc,
            fileData: file
        })
    }
    //上传方法
    saveUser() {
        var id = $("#id").val().trim();
        var uname = $("#uname").val().trim();
        var pwd = $("#pwd").val().trim();
        var file = document.getElementById("file").files[0];

        //原生ajax实现文件上传
        var formData = new FormData();
        formData.append("uname", uname); // 可以增加表单数据
        formData.append("id", id);
        formData.append("pwd", pwd);
        if (file) {
            formData.append("file", file);
        }
        //得到xhr对象
        var xhr = null;
        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.open("post", "/home/about", true);//设置提交方式，url，异步提交
        xhr.onload = function () {
            var data = xhr.responseText;    //得到返回值
            alert(data);
        }
        xhr.send(formData);
    }
}
window.onload = function () {
    //报告查询
    new reportSeach().init();
    //分页
    new pageJump().init();
    //兵团举报
    new regionSubmit().init();
}