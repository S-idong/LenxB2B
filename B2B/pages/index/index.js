//index.js
Page({
  data: {
    isShowDom: false,
    bgcolor: "rgba(255,255,255,0)",
    placeholder: "",
    imgUrls: '',
    pindaoList: '',
    pindaoDots: false,
    newsList: '',
    modelsList: '',
    productsList: '',
    scrollTop: 0,
    gotioTopDisplay: 'none',
    pindaoSwiperCurrent: 0,
    pindaoIndicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 1000
  },
  onLoad: function () {
    //同步存储资源地址
    wx.setStorageSync('StaticFileUrl', 'http://dhh.kuaidingtong.cn:888/');
    wx.setStorageSync('WebApiUrl', 'https://dhh.kuaidingtong.cn/');
    wx.setStorageSync('QYID', '1');
    //初始化组件
    let $toast = this.selectComponent(".J_toast");
    let $loading = this.selectComponent('.J_loading');
    var that = this;
    $loading.show();
    wx.request({
      url: WebApiUrl + 'api/Product/Phone_GetProdIndex',
      header: {
        'content-type': 'application/json; charset=urf-8',
        'Token': 'panshr'
      },
      data: {
        qyid: 1
      },
      success: function (res) {
        if (res.data.length > 0) {
          var pinDaoList = loadPinDao(res.data);
          var isShowPindaoIndicatorDots = pinDaoList.length === 1 ? false : true;
          that.setData({
            isShowDom: true,
            placeholder: loadSearchTitle(res.data),
            imgUrls: loadAD(res.data),
            pindaoList: pinDaoList,
            pindaoIndicatorDots: isShowPindaoIndicatorDots,
            newsList: loadNews(res.data),
            modelsList: loadModes(res.data),
            productsList: loadProducts(res.data, that)
          })
        }
      },
      fail: function (res) {
        $toast.show('网络连接失败');
        that.setData({
          interError:"网络连接失败"
        })
      },
      complete: function (res) {
        $loading.hide();
      }
    })
  },
  onPageScroll: function (e) {
  },
  pindaoSwiperChange: function (e) {
    this.setData({
      pindaoSwiperCurrent: e.detail.current
    })
  },
  searchTab: function (e) {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  callscan: function (e) {
    wx.scanCode({
      success: (res) => {
        this.setData({
          placeholder: res.result
        });
      }
    })
  },
  openlink: function (e) {
    wx.navigateTo({
      url: e.target.dataset.url
    })
  },
  onContainerScroll: function (e) {
    var scrollTop = e.detail.scrollTop;
    var num = (((scrollTop / 150) > 0.9) ? 0.9 : (scrollTop / 150));
    var color = num === 0.9 ? "#7D7D7D" : "#FFF";
    var display = scrollTop > 600 ? "block" : "none";
    this.setData({
      bgcolor: "rgba(255,255,255," + num + ")",
      setcolor: color,
      gotioTopDisplay: display
    });
  },
  goToTop: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop = 0
    });
  }
})



//全局变量
var WebApiUrl = getApp().getWebApiUrl();
var StaticFileUrl = getApp().getStaticFileUrl() + getApp().getQYID() + '/';

function loadSearchTitle(datalist) {
  for (var i = 0; i < datalist.length; i++) {
    if (datalist[i].templettype === '搜索框') {
      wx.setStorage({
        key: "searchAd",
        data: datalist[i]['templetname']
      });
      return datalist[i]['templetname'];
    }
  }
}

function loadAD(datalist) {
  var dataArry = [];
  for (var i = 0; i < datalist.length; i++) {
    if (datalist[i].templettype === '轮播图') {
      dataArry.push(
        {
          "img": StaticFileUrl + 'img/swiper/' + datalist[i]['picturecode'],
          "url": datalist[i]['url'], "name": datalist[i]['templetname'],
          "where": datalist[i]['where']
        });
    }
  }
  return dataArry;
};

function loadPinDao(datalist) {
  var dataArry = [];
  for (var i = 0; i < datalist.length; i++) {
    if (datalist[i].templettype === '频道') {
      dataArry.push({
        "imgurl": StaticFileUrl + 'img/channel/' + datalist[i]['picturecode'],
        "url": datalist[i]['url'],
        "pindaoTitle": datalist[i]['templetname'],
        "where": datalist[i]['where']
      });
    }
  }
  //数组分组
  function group(array, subGroupLength) {
    var index = 0;
    var newArray = [];

    while (index < array.length) {
      //slice(start,end) 返回数组范围
      newArray.push(array.slice(index, index += subGroupLength));
    }

    return newArray;
  }

  return group(dataArry, 10);
};

function loadNews(datalist) {
  var dataArry = [];
  for (var i = 0; i < datalist.length; i++) {
    if (datalist[i].templettype === '资讯') {
      dataArry.push(datalist[i]['templetname']);
    }
  }
  return dataArry;
};

function loadModes(datalist) {
  var dataArry = [];
  for (var i = 0; i < datalist.length; i++) {
    if (datalist[i].templettype === '模块') {
      dataArry.push({
        "imgurl": StaticFileUrl + '/img/model/' + datalist[i]['picturecode'],
        "url": datalist[i]['url'],
        "modelsTitle": datalist[i]['templetname'],
        "where": datalist[i]['where']
      });
    }
  }
  return dataArry;
};

function loadProducts(datalist, that) {
  var dataArry = [];
  var index = 0;
  for (var i = 0; i < datalist.length; i++) {
    if (datalist[i].templettype === '款色') {
      dataArry.push({
        "productsTitle": datalist[i]['templetname'],
        "data": loadProductDetails(datalist[i]['where'], index, that)
      });
      index++;
    }
  }
  return dataArry;
};

function loadProductDetails(where, index, that) {
  var dataArry = [];
  wx.request({
    url: WebApiUrl + 'api/Product/Phone_GetProdInfo',
    header: {
      'content-type': 'application/json; charset=urf-8',
      'Token': 'panshr'
    },
    data: {
      qyid: 1, page: 1, limit: 20, where: where
    },
    success: function (res) {
      var dataList = res.data.data;
      if (dataList.length > 0) {
        for (var i = 0; i < dataList.length; i++) {
          dataArry.push({
            "imgurl": StaticFileUrl + '/img/product/' + dataList[i]['picturecode'],
            "prodcode": dataList[i]['prodcode'],
            "color": dataList[i]['color'],
            "num": dataList[i]['num'],
            "prodname": dataList[i]['prodname'],
            "price1": dataList[i]['price1']
          });
        }
      }
      that.data.productsList[index]['data'] = dataArry;
      //重新渲染，会请求多次，后续处理
      that.setData({
        productsList: that.data.productsList
      })
    },
  });
  return dataArry;
}