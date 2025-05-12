// 初始美颜配置
const initBeautify = {
  whiten: 0.1, // 美白 0-1
  dermabrasion: 0.3, // 磨皮 0-1
  lift: 0, // 瘦脸 0-1
  shave: 0, // 削脸 0-1
  eye: 0.2, // 大眼 0-1
  chin: 0, // 下巴 0-1
};

// 美颜特效操作面板交互
function initOperationPanel() {
  $('#effect-btn').click(() => {
    $('#ar_operation.card').toggleClass('visible');
  });
  // 点击别处关闭面板
  $(document).on('click', (e) => {
    const closet = $(e.target).closest($('#ar_operation.card')).length;
    const isEffectbtn = $(e.target).closest($('#effect-btn')).length;
    if (!isEffectbtn && closet < 1) {
      $('#ar_operation.card').removeClass('visible');
    }

  });

}

// 切换设备交互
function initSwitchAction(cameraApi){

  $('#switch-btn').off('click').on('click', async () => {
    //$('#ar_operation.card').toggleClass('visible');
    const container = $('#switch-list')
    const list = $('#switch-list select')

    if(container.is(':visible')){
      container.hide()
    }else{
      container.show()
    }

    if(list.children().length<1){
      const ds = await cameraApi.getDevices()
      const cameras = ds.filter(d => d.kind == 'videoinput')
      cameras.forEach((e)=>{
        list.append('<option value="'+e.deviceId+'">'+e.label+'</option>')
      })
      list.off('change').on('change',(e)=>{
        const value = list.find(':selected').val()
        cameraApi.switchDevice('video', value)
      })
    }

  });

}

// 美颜参数设置交互
function initBeautyAction(cb) {
  $('#beauty input[type=range]').each((i, item) => {
    const key = $(item).attr('id');
    $(item).attr({
      min: 1,
      max: 100,
      step: 1,
      value: initBeautify[key] * 100,
    });
    $(item).change(() => {
      cb({
        [key]: $(item).val() / 100,
      })
    });
    $(`<label for="${key}">${$(item).data('name')}</label>`).insertBefore($(item));
  });
  // 关闭美颜
  $('#beauty .ar_close').click(() => {
    $('#beauty input[type=range]').val(0);
    cb({
        whiten: 0, // 美白 0-1
        dermabrasion: 0, // 磨皮 0-1
        lift: 0, // 瘦脸 0-1
        shave: 0, // 削脸 0-1
        eye: 0, // 大眼 0-1
        chin: 0, // 下巴 0-1
    });
});
}

// 美妆特效设置交互
function initEffectAction(effects, type, cb) {
  const container = $(`#${type}>.list`);
  effects.forEach((item, i) => {
    const optionHtml = $(`<div class="col-3 ar_option" style="flex-direction: column;">
                <a title=${item.name}><img src="${item.cover}" alt="" data-id="${item.id}" class="rounded-circle w-100"></a>
                <span>${item.name}</span>
                </div>`);

    container.append(optionHtml);
    if ((i + 1) % 4 === 0) {
      container.append('<div class="w-100"></div>');
    }
  });
  
  // 事件处理
  container.off('click').on('click', 'img', (e)=>{
    let id = $(e.target).attr('data-id');
    container.find('a').removeClass('selected');
    $(e.target).parent().addClass('selected');
    $('<span class="ar_loading spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>').appendTo($(e.target).parent());
    cb(id)
    return false
  });

  if (type==='filter') {
    $('#filter .ar_close').off('click').on('click',() => {
      console.log('close filter')
      cb();
      container.find('a').removeClass('selected');
      return false;
    });
  } else if (type==='makeup') {
    $('#makeup .ar_close').off('click').on('click',() => {
      console.log('close makeup')
      cb();
      container.find('a').removeClass('selected');
      return false
    });
  } else {
    $('#sticker .ar_close').off('click').on('click',() => {
      console.log('close makeup')
      cb();
      container.find('a').removeClass('selected');
      return false
    });
  }
}

function cancelSelect(type) {
  const container = $(`#${type}>.list`);
  container.find('a').removeClass('selected');
}

// 初始化 ar sdk 方法
async function initARSDK(stream) {
  return new Promise((resolve, reject) => {
    const { ArSdk } = window.AR;  
    /** ----- 鉴权配置 ----- */

    /**
     * 腾讯云账号 APPID
     * 
     * 进入[腾讯云账号中心](https://console.cloud.tencent.com/developer) 即可查看 APPID
     */
    const APPID = ''; // 此处请填写您自己的参数

    /**
      * Web LicenseKey
      * 
      * 登录音视频终端 SDK 控制台的[Web License 管理](https://console.cloud.tencent.com/vcube/web)，创建项目即可获得 LicenseKey
      */
    const LICENSE_KEY = ''; // 此处请填写您自己的参数

    /**
      * 计算签名用的密钥 Token
      * 
      * 注意：此处仅用于 DEMO 调试，正式环境中请将 Token 保管在服务端，签名方法迁移到服务端实现，通过接口提供，前端调用拉取签名，参考
      * [签名方法](https://https://cloud.tencent.com/document/product/616/71370#.E7.AD.BE.E5.90.8D.E6.96.B9.E6.B3.95)
      */
      const token = ''; // 此处请填写您自己的参数

    /** ----------------------- */


    /**
     * 定义获取签名方法
     *
     * 注意：签名方法推荐在服务端实现，通过接口提供，前端调用拉取签名，此处为了帮助您快速跑通所以在前端计算签名
     * 如：
     * async function () {
     *  return fetch('http://xxx.com/get-ar-sign').then(res => res.json());
     * };
     */
    const getSignature = function () {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const signature = sha256(timestamp + token + APPID + timestamp).toUpperCase();
      return { signature, timestamp };
    };

    const beautify = Object.assign({}, initBeautify);

    // ar sdk 基础配置参数
    const config = {
      camera:{
        width:1280,
        height:720,
      },
      auth: {
        licenseKey: LICENSE_KEY,
        appId: APPID,
        authFunc: getSignature
      },
      // 初始美颜效果（可选参数）
      beautify: initBeautify,
    }



    // config 传入ar sdk
    const ar = new ArSdk(config);
    console.log('config', config)
    ar.on('ready', (e) => {

      console.log('sdk allReady', +new Date())
      // 返回 ar sdk 实例
      resolve(ar);
    });
    let currentMakeup

    ar.on('created', () => {

      // 显示美颜特效操作面板
      initOperationPanel();
      // 美颜交互
      initBeautyAction((data) => {
        ar.setBeautify(Object.assign(beautify, data))
      });

      // 获取内置特效，支持分页
      ar.getEffectList({
        Type: 'Preset',
        Label: '美妆'
      }).then((res) => {
        const list = res.map(item => ({
          name: item.Name,
          id: item.EffectId,
          cover: item.CoverUrl,
          url: item.Url,
          label: item.Label,
          type: item.PresetType,
        }));

        // 美妆交互
        initEffectAction(list, 'makeup', (id) => {
          if(id) {
            currentMakeup = {id: id, intensity: 1}

            ar.setEffect([currentMakeup], () => {
              $('.ar_loading').remove();
              // 内置美妆自带滤镜，设置了美妆则取消滤镜的选择，使美妆内置的滤镜生效
              cancelSelect('filter')
              ar.setFilter();
            });
          } else {
            currentMakeup = null
            ar.setEffect([]);
          }
        });
      }).catch((e) => {
        console.log(e);
      });

      // 内置滤镜
      ar.getCommonFilter().then((res) => {
        const list = res.map(item => ({
          name: item.Name,
          id: item.EffectId,
          cover: item.CoverUrl,
          url: item.Url,
          label: item.Label,
          type: item.PresetType,
        }));
        
        // 滤镜交互
        initEffectAction(list, 'filter', (id) => {
          if(id) {
            ar.setFilter(id, 1, () => {
              $('.ar_loading').remove();
            });
            if (currentMakeup) {
              ar.setEffect([{
                ...currentMakeup,
                filterIntensity: 0 // 覆盖美妆的内置滤镜
              }]);
            }
          } else {
            ar.setFilter();
            if (currentMakeup) {
              ar.setEffect([{
                ...currentMakeup,
                filterIntensity: 1 // 恢复美妆的内置滤镜
              }]);
            }
          }
        });

      }).catch((e) => {
        console.log(e);
      });

      // 获取内置贴纸，支持分页
      ar.getEffectList({
        Type: 'Preset',
        Label: '贴纸',
      }).then((res) => {
        const list = res.map(item => ({
          name: item.Name,
          id: item.EffectId,
          cover: item.CoverUrl,
          url: item.Url,
          label: item.Label,
          type: item.PresetType,
        }));

        // 美妆交互
        initEffectAction(list, 'sticker', (id) => {
            if(id) {
              // 设置美妆特效 传入素材id和强度，回调
              ar.setEffect([{id: id, intensity: 1}], () => {
                $('.ar_loading').remove();
              });
            } else {
              ar.setEffect([])
            }
          
        });
      }).catch((e) => {
        console.log(e);
      });
    });

    // cameraReady事件内可以获取ar.camera实例进行设备控制
    ar.on('cameraReady', async (e) => {
      // 获取sdk内置camera实例
      const cameraApi = ar.camera;
      // 切换设备的UI交互
      initSwitchAction(cameraApi);
      // 支持获取设备列表
      const devices = await cameraApi.getDevices()
      console.log('list devices',devices)
    });

    ar.on('error', (e) => {
      console.log(e);
    });
  });
}
