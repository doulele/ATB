/*公用函数*/
	function setColor(selector,all){//随机添加颜色
		var random=Math.floor(Math.random()*all.length);
		return selector[random].classList.add('orginColor');
	}

	function elementToTop(ele){//图片呢到达页面顶部距离
		if (ele.offsetParent) {
			return this.elementToTop(ele.offsetParent)+ele.offsetTop;
		}
		return ele.offsetTop;
	}

	function throttle(func,wait){//节流函数
		var timer;
		return function(){
			if (timer) {
				return;
			}
			timer=setTimeout(function(){
				func();
				timer=null;
			},wait);
		}
	}
	
	function debounce(func,wait){
		var timer;
		return function(){
			clearInterval(timer);
			timer=setTimeout(func,wait)
		}
	}	
/*顶部导航*/
(function(){
	//数据处理函数
	function topNav(res){
		//为顶部添加数据
		for(var Key in res){
			//遍历数据的每一条数据
			for(var key in res[Key]){
				var cLi=document.createElement('li');
				var cDiv=document.createElement('div');
				var cA=document.createElement('a');
				cDiv.className='topItem';
				cA.href=" ";
				cA.innerText=key;
				cDiv.appendChild(cA);
				cLi.appendChild(cDiv);
				if (Key==='login') {
					//为topleft添加元素
					$("#topLeft").append(cLi);
				}else{
					//为topright添加元素
					$("#topRight").append(cLi);
				}
				//为有下拉框元素添加元素
				if (res[Key][key]!="") {
					var cDiv1=document.createElement('div');
					var cSpan=document.createElement('span');
					for (var i = 0; i < res[Key][key].length; i++) {
						var cA1=document.createElement('a');
						cA1.innerText=res[Key][key][i];
						cDiv1.appendChild(cA1);
					}
					cSpan.className="icon iconfont icon-arrow";
					cDiv1.className='hidden tophid';
					cDiv.appendChild(cSpan);
					cDiv1.style.width=cDiv.parentNode.offsetWidth+'px';
					cDiv.parentNode.appendChild(cDiv1);
				}
			}
		}
		//添加字体图标
		(function(){
			//添加的图标class名称
			var iconsrc=["","icon-gouwuche","icon-shoucangjia","","icon-daohang"];
			//添加图标及修改容器宽度
			function add(){
				$('.tophid')[i].parentNode.firstChild.insertBefore(cSpan2,$('.tophid')[i].parentNode.firstChild.firstChild);
				$(".tophid")[i].style.width=parseInt($(".tophid")[i].style.width)+17+'px';
			};
			//为有图标class的添加图标
			for (var i = 0; i < iconsrc.length; i++) {
				var cSpan2=document.createElement('span');
				cSpan2.className='iconbefor icon iconfont '+iconsrc[i];
				switch (i){
					case 1:
						add();
						break;
					case 2:
						add();
						break;
					case 4:
						add();
						break;
				}
			}	
		}());
		//添加默认的颜色
		(function(){
			var color=[$('.topItem a')[0],$('.topItem a')[3],$('.topItem span')[1],$('.topItem span')[2],$('.topItem span')[6],$('.topItem span')[7]];
			for (var i = 0; i < color.length; i++) {
				color[i].classList.add('orginColor');
			}
		}());
	}
	//请求数据
	$.ajax({
		type:"get",
		url:"http://localhost:6555/php/ATB.php",
		data:"getData=top",
		success:topNav
	})
}());
/*顶部广告*/
(function(){
	function topAd(res){
		//创建元素添加图片
		var loadBefore=res.loadBefore;
		var loadAfter=res.loadAfter;
		var cA=document.createElement('a');
		var cImg=document.createElement('img');
		cA.href='';
		cImg.src=loadBefore;
		cA.appendChild(cImg);
		$("#topAd").append(cA);
		//广告动画，改变图片
		$("#topAd").animate({"height":'74px'},2000,function(){
			cImg.src=loadAfter;
		});
	}
	$.ajax({
		type:"GET",
		url:'http://localhost:6555/php/ATB.php',
		data:'getData=topAd',
		success:topAd
	})
}());
/*搜索*/
(function(){
	function search(res){
		//搜索关键提示词
		var searchKey=res.searchKey;
		for (var i = 0; i < searchKey.length; i++) {
			var cA=document.createElement('a');
			cA.href=' ';
			cA.innerText=searchKey[i];
			$("#searchKey").append(cA);
		};
		(function(){
			$("#searchKey a")[0].classList.add('orginColor');
			setColor($("#searchKey a"),searchKey);
		}());
		//广告
		(function(){
			var searchAdSrc=res.searchAd;
			var cA=document.createElement('a');
			var cImg=document.createElement('img');
			cImg.src=searchAdSrc;
			cA.href=" ";
			cA.appendChild(cImg);
			$("#searchAd").append(cA);
		}());
	}
	$.ajax({
		type:'get',
		url:"http://localhost:6555/php/ATB.php",
		data:"getData=search",
		success:search
	});
}());
/*导航*/
(function(){
	function Nav(res){
		var nav=res.reach;
		var ju=res.ju;
		//数据处理
		for (var key in nav) {
			//添加导航词条
			var cLi=document.createElement('li');
			var cA=document.createElement('a');
			cA.href=' ';
			cA.innerText=key;
			cLi.appendChild(cA);
			$("#nav").append(cLi);
			//添加下拉框选项
			if (nav[key]!='') {
				var cSpan=document.createElement('span');
				cSpan.className='icon iconfont icon-arrow';
				cSpan.id='fengArrow';
				cLi.id='feng';
				cLi.append(cSpan);
				var cDiv=document.createElement('div');
				cLi.appendChild(cDiv);
				for (var i = 0; i < nav[key].length; i++) {
					var cA1=document.createElement('a');
					cA1.href=' ';
					cA1.innerText=nav[key][i];
					cDiv.appendChild(cA1);
				}
			};
			//添加聚字
			if(key==='聚划算'){
				var cImg=document.createElement('img');
				cImg.id="ju";
				cImg.src=ju;
				cLi.appendChild(cImg);
			};
		};
	}
	$.ajax({
		type:'get',
		url:'http://localhost:6555/php/ATB.php',
		data:'getData=nav',
		success:Nav
	})
}());
/*主视区广告*/
(function(){
	function News(res){
		var linshi=[res.mainTopNewsImg,res.mainBotmNewsad.ad,res.mainBotNewsImg];
		for (var i = 0; i < linshi.length; i++) {
			for (var j = 0; j < linshi[i].length; j++) {
				var cA1=document.createElement('a');
				var cImg1=document.createElement('img');
				cA1.href=" ";
				cImg1.src=linshi[i][j];
				cA1.appendChild(cImg1);
				$(".newsad:eq("+i+")").append(cA1);
			}
		}
		for (var i = 0; i < res.mainTopNavImg.length; i++) {
			var cA=document.createElement('a');
			var cImg=document.createElement('img');
			cImg.src=res.mainTopNavImg[i];
			cA.href=" ";
			cA.appendChild(cImg);
			$("#mainRightTopNav").append(cA);
		}
		$("#mainRightTopLeft em")[0].className='icon iconfont '+res.mainBotmNewsad.icon[0];
		$("#mainRightTopRig em")[0].className='icon iconfont '+res.mainBotmNewsad.icon[1];
		$("#mainRightTopLeft span")[0].innerText=res.mainBotmNewsad.top[0];
		$("#mainRightTopRig span")[0].innerText=res.mainBotmNewsad.top[1];
		for (var i = 0; i < res.mainBotmNewsad.title.length; i++) {
			var cA=document.createElement('a');
			var cEm=document.createElement('em');
			var cSpan=document.createElement('span');
			cEm.innerText=res.mainBotmNewsad.title[i];
			cSpan.innerText=res.mainBotmNewsad.news[i];
			cA.href=" ";
			cA.appendChild(cEm);
			cA.appendChild(cSpan);
			$("#mainRightBotmNews").append(cA);
		}
	}
	
	$.ajax({
		type:'get',
		url:'http://localhost:6555/php/ATB.php',
		data:'getData=mainnews',
		success:News
	})
}());
/*折扣区左侧*/
(function(){
	for (var i = 0; i < $(".discutTopContentLineHeng").length; i++) {
		$(".discutTopContentLineHeng")[i].style.top=50*(i+1)+'px';
	}
	function discountLeft(res){
		var oTop=res.top;
		var oBtm=res.bottom;
		$("#discutLefTopTitle a span").text(oTop.title[1]);

		for(var i=0; i<oTop.content.icon.length; i++){
			var cA=document.createElement('a');
			var cEm=document.createElement('em');
			var cSpan=document.createElement('span');
			cA.href=" ";
			cEm.className="icon iconfont "+oTop.content.icon[i];
			cSpan.innerText=oTop.content.text[i];
			cA.appendChild(cEm);
			cA.appendChild(cSpan);
			$("#discutTopContent").append(cA);
		}
		//添加左侧下部分的内容
		$("#discountLeftBottom h4").text(oBtm.title);//填充h4标题内容
		for(var key in oBtm.content.text){
			//每一部分的标题
			var cP=document.createElement('p');
			var cSp=document.createElement('span');
			var cAtit=document.createElement("a");
			cAtit.href=" ";
			cAtit.className="discountLeftBottomTitle";
			cAtit.innerText=key;
			cP.appendChild(cAtit);
			//每一部分的内容
			for (var i = 0; i < oBtm.content.text[key].length; i++) {
				var cAtxt=document.createElement('a');
				cAtxt.href=" ";
				cAtxt.className="discountLeftBottomText";
				cAtxt.innerText=oBtm.content.text[key][i];
				cSp.appendChild(cAtxt);
			}
			cP.appendChild(cSp);
			$("#discutBtmContent").append(cP);
			//随机颜色
			setColor(cSp.children,oBtm.content.text[key]);

		}
	}
	$.ajax({
		type:'get',
		url:'http://localhost:6555/php/ATB.php',
		data:'getData=discountLeft',
		success:discountLeft
	})
}());
/*楼层模板引擎*/
(function(){
	var ready=setInterval(ok,200);
	function ok(){
		if ($("#topAd")[0].offsetHeight=='74') {//顶部广告伸缩结束后再执行
			var flg=true;
			var index=0;
			clearInterval(ready);//清除定时器，只触发一次
			function floors(){
				var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
				var cliHeight=document.documentElement.clientHeight;
				var scrollNow=Math.ceil(scrollTop+cliHeight);
				var disHeight=$("#discount")[0].offsetTop+$("#discount")[0].offsetHeight;
				if (scrollNow>=disHeight&&flg) {//满足指定位置,申请数据,处理数据；并只执行一次
					function floorData(res){
						//处理数据
						var data=JSON.parse(res);
						var obj={};
						for(var key in data){
							obj[key]=JSON.parse(data[key]);
						}
						/*模板引擎*/
							var context={comments:obj};//将数据放入一个对象的属性中
							var tempHtml=template('temp',context);
							$("#floor").append(tempHtml);
						//为字体添加颜色
						for (var i = 0; i < $('.floorsBox').length; i++) {
							var objEtamColor=obj['page'+(i+1).toString()].right.color;
							$(".FBleft")[i].style.color=objEtamColor.form;
							$(".FBleft h4")[i].style.borderColor=objEtamColor.form;
							$(".floorLeftTitleAd")[i].style.color=objEtamColor.form;
							$(".FBRright")[i].style.background="linear-gradient(to top,"+objEtamColor.form+","+objEtamColor.to+")";
							//为左下 品类选项 的字体 随机变红色
							for (var j = 0; j < $(".FBLbottom:eq("+[i]+") p").length; j++) {
								setColor($(".FBLbottom:eq("+[i]+") p span")[j].children,$(".FBLbottom:eq("+[i]+") p span")[j].children)
							}

						}
					}
					$.ajax({
						type:'get',
						url:'http://localhost:6555/php/getFloorsData.php',
						data:'getFloorPage=floors',
						success:floorData
					})
					flg=false;
				}
			}
			floors();//一开始就做判断；浏览位置是不是大于触发数据申请的位置
			document.addEventListener('scroll',floors)
		}
	}
}());
/*猜你喜欢*/
(function(){
	var pageOneFlg=true;
	var pageTwoFlg=true;
	function recomPg(page){
		//点击的是侯都会回到推荐区的顶部
		document.documentElement.scrollTop=$("#recommend")[0].offsetTop;
		//点击选页的时候另一页隐藏这一页显示
		page=="pageOne"? ($("#pageOneBox")[0].className='',$("#pageTwoBox")[0].className="hidden"):page=="pageTwo"? ($("#pageOneBox")[0].className='hidden',$("#pageTwoBox")[0].className=""):null;

		if ((page=="pageOne"&&pageOneFlg)||(page=="pageTwo"&&pageTwoFlg)) {//判断点击的是那一页，并将该页的请求门关上避免每次点击都请求一次数据执行一次代码
			page=="pageOne"? pageOneFlg=false:page=="pageTwo"? pageTwoFlg=false:null;
			function recommended(res){
				var Res=JSON.parse(res);
				for(var key in Res){
					var ResKey=JSON.parse(Res[key]);
					for(var key1 in ResKey){
						var cA=document.createElement('a');
						var cImg=document.createElement('img');
						var cSpan=document.createElement('span');
						var cP=document.createElement('p');
						cA.href=" ";
						cA.className='recomItem';
						cImg.className="recomImg";
						cImg.setAttribute("data-src",ResKey[key1].src);
						cSpan.innerText=ResKey[key1].price;
						cP.innerText=ResKey[key1].newsad;
						cA.appendChild(cSpan);
						cA.appendChild(cImg);
						cA.appendChild(cP)
						$("#"+page+"Box").append(cA);
					}
					
				}
				//去除每行首个的左侧外边距值
				for (var i = 0; i < $(".recomItem").length; i++) {
					if(i%4==0){
						$(".recomItem")[i].style.marginLeft='0';
					}
				}
			}
			
			$.ajax({
				type:"get",
				url:"http://localhost:6555/php/pageData.php",
				data:"getRecomPage="+page,
				success:recommended
			})
		}

	}
	recomPg("pageOne");
	function clear(ele){//清除页码按钮的样式
		return ($(ele).addClass('recomChangecolor').siblings().removeClass('recomChangecolor'));
	}
	$("#pageOne").on('click',function(){
		clear(this);
		recomPg("pageOne");
	});
	$("#pageTwo").on('click',function(){
		clear(this);
		recomPg("pageTwo");
	});	
}());
/*图片懒加载*/
(function(){
	var clock;
	function lazy(){
		var lazyImg=$("img[data-src]");
		var scrollNow=$(window).height()+$(window).scrollTop();
		if (lazyImg.length>0) {//当还有data-src属性的img图片存在时才执行
			lazyImg.each(function(){
				var _that=this;
				if (scrollNow>elementToTop(_that)) {
					this.src=this.getAttribute('data-src');
					$(this).removeAttr('data-src');//去除这个属性，减少每次获取img的量;
				}
			});
		}
	}
	lazy();//先执行一遍，防止刷新时用户视窗不在顶端
	document.addEventListener('scroll',throttle(lazy,200));
}());



(function(){
	function carsousel(res){
		var carsousel1=res.carousel1;
		var carsousel2=res.carousel2;
		var carsousel3=res.carousel3;
		//主视区轮播
		(function(){
			var imgSrc=carsousel1.src;
			var cP=document.createElement('p');
			var index=0;
			var flg=true;
			$("#mainRightTopCarsousel").append(cP);
			//添加元素
			for (var i = 0; i < imgSrc.length; i++) {
				//添加图片数据
				var cLi=document.createElement('li');
				var cA=document.createElement("a");
				var cImg=document.createElement("img");
				cImg.className='carsouselImg';
				cA.href=" ";
				cImg.src=imgSrc[i];
				cA.appendChild(cImg);
				cLi.appendChild(cA);
				$("#carousel1Box").append(cLi);
				//添加圆点;
				var cSpan=document.createElement('span');
				cSpan.className='carsousel1Point';
				cSpan.index=index;
				cP.appendChild(cSpan);
				index++;
			};
			//设置轮播盒子的长度
			$("#carousel1Box").css("width",$(".carsouselImg")[0].offsetWidth*(imgSrc.length+1)+"px");
			//复制第一个轮播图片
			$("#carousel1Box").append($("#carousel1Box :first").clone(true));
			//设置第一个圆点默认颜色
			$(".carsousel1Point:first").css("background-color",'#ff5a00');
			//添加动画
			(function(){
				var _that=0;
				var wid=$('.carsouselImg')[0].offsetWidth;
				//设置动画函数
					function animated(){
						$("#carousel1Box").animate({left:-_that*wid+'px'},500,function(){
							flg=true;
						})
					}
				//设置圆点颜色
					function pointColor(){
						$('.carsousel1Point').css("background-color","#cbcbcb");
						if (_that<8) {
							$('.carsousel1Point')[_that].style.backgroundColor='#ff5a00';
						}else{
							$('.carsousel1Point')[0].style.backgroundColor='#ff5a00';
						}
						
					}
				//设置圆点导航
					$('.carsousel1Point').mouseover(function(){
						_that=this.index;//关联下标
						if(flg){//再上一个动画未完成之前不触发新的动画
							flg=false;
							animated();
							pointColor();
						}
					})
					;
				//设置点击导航
					function carClick(){
						if(flg){//再上一个动画未结束之前不处罚新的动画
							flg=false;
							if (this==$("#carLeftNav")[0]) {//左侧点击
								_that<=0? ($("#carousel1Box").css("left",-520*8+'px'),_that=7):_that-=1;
							}else{//右侧点击
								_that>7? ($("#carousel1Box").css("left",'0px'),_that=1):_that-=-1;
							}
							animated();
							pointColor();
						}
					}
					//点击
					$("#mainRightTopCarsousel div").click(carClick);
				//设置自动导航
					var auto=window.setInterval(carClick.bind($("#carRightNav")[0]),3000);
				//设置鼠标悬停停止定时器动画
					$("#carousel1Box").mouseover(function(){
						clearInterval(auto);
					})
					$("#carousel1Box").mouseout(function(){
						auto=setInterval(carClick.bind($("#carRightNav")[0]),3000);//注意这里调用定时器一定要把语句柄带上(变量),以便清理
					})
			}());
		}());
		//主视区小轮播
		(function(){
			var imgSrc=carsousel2.src;
			var flg=true;
			var index=0;
			//处理数据
			for(var i=0; i < imgSrc.length; i++){
				//创建轮播图片
				var cLi=document.createElement('li');
				var cA=document.createElement('a');
				var cImg=document.createElement('img');
				cA.href=" ";
				cImg.className="carsousel2Img";
				cImg.src=carsousel2.src[i];
				cImg.index=i;
				cA.appendChild(cImg);
				cLi.appendChild(cA);
				$("#carousel2Box").append(cLi);
				//创建覆盖层
				var cP=document.createElement('p');
				var cH5=document.createElement('h4');
				var cSpan=document.createElement('span');
				cH5.className="carsousel2h5";
				cH5.innerText=carsousel2.title[i];
				cSpan.innerText=carsousel2.news[i];
				cP.appendChild(cH5);
				cP.appendChild(cSpan);
				cA.appendChild(cP);
			}
			var wid=$(".carsousel2Img")[0].offsetWidth;
			//设置轮播盒子的长度
			$("#carousel2Box").css("width",wid*(imgSrc.length+1)+"px");
			//复制第一个轮播图片
			$("#carousel2Box").append($("#carousel2Box :first").clone(true));
			//动画封装
				function animated(){
					$("#carousel2Box").animate({left:-index*wid+"px"},500,function(){
						flg=true;
					})
				}
			//右侧点击导航
				function carRigBtn(){
					if (flg) {
						flg=false;
						if (this==$("#carRightNav1")[0]) {
							index+=1;
							index>$(".carsousel2Img").length-1? ($("#carousel2Box").css("left",'0px'),index=1):null;
						}else if (this==$("#carLeftNav1")[0]) {
							index-=1;
							index<0? ($("#carousel2Box").css("left",'-630px'),index=2):null;
						}
						animated();
					}
				}
				$("#mainRightBttomCarsousel div").click(carRigBtn);
			//自动导航
			 var car2Timer=setInterval(carRigBtn.bind($("#carRightNav1")[0]),3000);
		}());
		//折扣区轮播图
		(function(){
			var index=0;
			//处理数据，生成节点
			for(var key in carsousel3){
				var cDiv=document.createElement('div');
				var cSpanChose=document.createElement('span');
				cSpanChose.className='car3ChosePoint';
				cSpanChose.index=index;
				cDiv.className='car3Page';
				$("#car3Chose p").append(cSpanChose);	
				index++;
				for (var i = 0; i < carsousel3[key].src.length; i++) {
					var cA=document.createElement('a');
					var cImg=document.createElement('img');
					var cSpan=document.createElement('span');
					var cEm=document.createElement('em');
					var cSpanPirce=document.createElement('span');
					var cSpanOldPir=document.createElement('span');
					var cSpanBaoyou=document.createElement('span');
					var cP=document.createElement('p');
					cEm.innerText="￥";
					cSpanPirce.innerText=carsousel3[key].price[i];
					cSpanOldPir.innerText=carsousel3[key].oldPrice[i];
					cSpanBaoyou.innerText="包邮";
					cImg.setAttribute('data-src',carsousel3[key].src[i]);
					/*cImg.setAttribute("data-src",carsousel3[key].src[i]);*/
					cSpan.innerText=carsousel3[key].picNew[i];
					cA.href=" ";
					cSpanPirce.className='pirce';
					cSpanOldPir.className='oldpirce';
					cSpanBaoyou.className='baoyou';
					cP.appendChild(cEm);
					cP.appendChild(cSpanPirce);
					cP.appendChild(cSpanOldPir);
					cP.appendChild(cSpanBaoyou);
					cA.appendChild(cImg);
					cA.appendChild(cSpan);
					cA.appendChild(cP);
					cDiv.appendChild(cA);
				}
				$("#car3Box").append(cDiv);
			}
			var wid=$(".car3Page")[0].offsetWidth;
			var leng=$(".car3Page").length;
			//设置轮播盒子的长度
			$("#car3Box").css("width",wid*(leng+1)+"px");
			//复制第一个轮播图片
			$("#car3Box").append($("#car3Box :first").clone(true));
			//设置第一个圆点颜色
			$(".car3ChosePoint")[0].style.backgroundColor="#E43825";
			var flg=true;
			var _that=0;
			//设置动画
				function animated(){
					if (flg) {
						flg=false;
						$("#car3Chose em")[0].innerText=_that+1+"/5";
						$(".car3ChosePoint").css('background-color','#cbcbcb');
						$(".car3ChosePoint:eq("+_that+")").css('background-color','#E43825');
						if(_that==5){
							$("#car3Chose em")[0].innerText=1+"/5";
							$(".car3ChosePoint:eq(0)").css('background-color','#E43825');
						};
						$("#car3Box").animate({left:-_that*wid+'px'},500,function(){
							flg=true;
						})
					}
				
				}
			//圆点导航
			$(".car3ChosePoint").click(function(){
				_that=this.index;
				animated();
			})
			//自动播放
			function auto(){
				_that+=1;
				
				if (_that>5) {
					$('#car3Box').css("left",'0px');
					_that=1;
				}
				animated();		
			}
			var car3Auto=setInterval(auto,3000)
		}());
	}
	$.ajax({
		type:'get',
		url:'http://localhost:6555/php/ATB.php',
		data:"getData=carsousel",
		success:carsousel
	})
}());

(function(){
	function mainLeftNav(res){
		var newsAd=res.newsAd;
		var mainLeft=res.mainLeft;
		//添加头部广告
		$("#mainLeftTop a span").text(newsAd.new);
		$("#mainLeftTop a em").addClass(newsAd.icon);
		var index=0;
		for(var key in mainLeft){
			//添加mainleft的左侧选项元素
			var cA=document.createElement('a');
			var cEm=document.createElement('em');
			cA.href='';
			cA.innerText=key;
			cA.style.color=mainLeft[key].color;
			cEm.className='icon iconfont '+mainLeft[key].icon;
			cEm.style.color=mainLeft[key].color;
			$('.mLNLeft')[index].children[0].appendChild(cA);
			$('.mLNLeft')[index].children[0].appendChild(cEm);
			//添加mainleft的右侧每一项的选项元素
			for(Key in mainLeft[key].chose){
				var cA1=document.createElement('a');
				cA1.href="";
				cA1.innerText=mainLeft[key].chose[Key];
				$(".mLNRight")[index].append(cA1);
			};
			//添加字体随机颜色颜色
			setColor($(".mLNRight")[index].children,mainLeft[key].chose);
			$(".mainLeftNavHidden")[index].style.top=-index*66.25-2.5+'px';
			//添加鼠标移入移出后的颜色
			(function(key){
				$('.mLNLeft')[index].parentNode.addEventListener('mouseenter',function(){
					this.style.borderColor=mainLeft[key].color;
					this.children[0].style.backgroundColor=mainLeft[key].color;
					this.children[2].style.display='block';
					this.children[2].style.borderColor=mainLeft[key].color;
				});
				$('.mLNLeft')[index].parentNode.addEventListener('mouseleave',function(){
					this.style.borderColor="#eee";
					this.children[0].style.backgroundColor="#eee";
					this.children[2].style.display='none';
				});
			})(key);
			//添加右侧选项卡片
			(function(){
				
				var mlnrt=mainLeft[key].title;
				var mlnrn=mainLeft[key].newAd;
				var index1=0;
				for(var key1 in mlnrt){
					var cDiv1=document.createElement('div');//创建选项卡的选项组
					var cDiv2=document.createElement('div');//创建标题div
					var cAmLNRhiddenTitle=document.createElement('a');//创建标题
					var cDivLine=document.createElement('div');
					var cDiv3=document.createElement('div');//创建内容div
					for(var key2 in mlnrt[key1]){//创建选项卡的选项内容
						var cAmLNRhiddenContent=document.createElement('a');
						cAmLNRhiddenContent.href=" ";
						cAmLNRhiddenContent.innerText=mlnrt[key1][key2];//填充内容
						cDiv3.appendChild(cAmLNRhiddenContent);
					};
					cAmLNRhiddenTitle.href=" ";
					cAmLNRhiddenTitle.className='title';
					cDiv1.className='mLNRHidEvervDiv';
					cDiv2.className='mLNRhiddenTop';
					cDiv3.className='mLNRhiddenContent';
					cDivLine.className='lineColor';
					cAmLNRhiddenTitle.innerText=key1;//填充title
					cDiv1.appendChild(cDiv2);
					cDiv1.appendChild(cDivLine);
					cDiv1.appendChild(cDiv3);
					cDiv2.appendChild(cAmLNRhiddenTitle);
					$(".mainLeftNavHidden")[index].append(cDiv1);
				}
				for (var i = 0; i < mlnrn.length; i++) {//创建新闻体	
					if(mlnrn[i]!=" "){
						var cPmLNRhiddenIcon=document.createElement('p');//创建新闻盒子
						cPmLNRhiddenIcon.className="icon iconfont icon-tuangouzhekou";
						var cPmLNRhiddenIconA=document.createElement('a');//创建新闻内容
						cPmLNRhiddenIconA.innerText=mlnrn[i];
						cPmLNRhiddenIconA.href=" ";
						cPmLNRhiddenIcon.appendChild(cPmLNRhiddenIconA);
						
						var addNew=$(".mainLeftNavHidden")[index].children[i].children[0];//获取每一个选项卡的每一组选项的顶部
						addNew.appendChild(cPmLNRhiddenIcon);//添加进去
						//添加新闻体颜色
						addNew.style.top='-5px';
						addNew.style.marginBottom='0px';
						addNew.children[1].style.color=mainLeft[key].color;
						addNew.children[1].children[0].style.color=mainLeft[key].color;
						addNew.children[1].children[0].style.borderColor=mainLeft[key].color;
						//随机添加颜色
						var mLNRhiddenContentA=$(".mainLeftNavHidden")[index].children[i].children[2].children;
						setColor(mLNRhiddenContentA,mLNRhiddenContentA)
					}
					
					//设置渐变条颜色
					$(".mainLeftNavHidden")[index].children[i].children[1].style.background='linear-gradient(to right,'+mainLeft[key].color+',#fff)';
				}
				//如果选项卡的个数小于6个则调整前三个的高度
				if($(".mainLeftNavHidden")[index].children.length<6){
					for (var i = 0; i < 3; i++) {
						$(".mainLeftNavHidden")[index].children[i].style.height=(420-140)/($(".mainLeftNavHidden")[index].children.length-2)+'px';
					}
				};
			}())
			index++;
		};
		
	}
	$.ajax({
		type:"get",
		url:'http://localhost:6555/php/ATB.php',
		data:'getData=mainLeftNav',
		success:mainLeftNav
	});
}());