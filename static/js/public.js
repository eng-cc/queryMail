//添加class
var addclas = function(elem, className) {
    var fullClassName = elem.className;
    fullClassName += " ";
    fullClassName += className;
};

var ajax = function(method, url, cb, data, dataType) {

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open(method.toUpperCase(), url, true);
    if (method.toLowerCase() == 'get') {
        xhr.send(null);
    } else {
        var contentType = 'application/x-www-form-urlencoded';
        if (dataType) {
            if (dataType.toLowerCase() == 'json') {
                contentType = 'application/json'
            };
        };
        xhr.setRequestHeader("Content-type", contentType);
        xhr.send(data);
    };
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                cb(xhr.responseText);
            };
        };
    };
};

//七牛上传
var initQiniuBtn = function(containerId, bottonId, callBack) {
    //containerId为按钮父元素ID，bottonId为按钮ID
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4', //上传模式,依次退化
        browse_button: bottonId, //上传选择的点选按钮，**必需**
        uptoken_url: '/upToken',
        //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
        // uptoken : '<Your upload token>',
        //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
        // unique_names: true,
        // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
        //save_key: true,
        // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
        domain: 'http://scc1.qiniu.com',
        //bucket 域名，下载资源时用到，**必需**
        container: containerId, //上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '5mb', //最大文件体积限制
        flash_swf_url: 'http://jssdk.demo.qiniu.io/js/plupload/Moxie.swf', //引入flash,相对路径
        max_retries: 3, //上传失败最大重试次数
        dragdrop: true, //开启可拖曳上传
        drop_element: containerId, //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb', //分块上传时，每片的体积
        auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        filters: {
            mime_types: [{
                title: "Image files",
                extensions: "jpg,jpeg,gif,png,zip"
            }]
        },
        multi_selection: false,
        init: {
            'FilesAdded': function(up, files) {
                plupload.each(files, function(file) {
                	console.log('bfuploads');
                    // 文件添加进队列后,处理相关的事情
                });
            },
            'BeforeUpload': function(up, file) {
            	console.log('bfupload');
                // 每个文件上传前,处理相关的事情
            },
            'UploadProgress': function(up, file) {
            	console.log('uploading');
                // 每个文件上传时,处理相关的事情
            },
            'FileUploaded': function(up, file, info) {
                var domain = up.getOption('domain');
                var res = parseJSON(info);

                callBack(domain, res);

            },
            'Error': function(up, err, errTip) {
            	console.log(err);
                //上传出错时,处理相关的事情
            },
            'UploadComplete': function() {
            	console.log('afupload');
                //队列文件处理完毕后,处理相关的事情
            }/*,
            'Key': function(up, file) {
                // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                // 该配置必须要在 unique_names: false , save_key: false 时才生效
                var key = "";
                // do something with key here
                return key
            }*/
        }
    });
    // domain 为七牛空间（bucket)对应的域名，选择某个空间后，可通过"空间设置->基本设置->域名设置"查看获取
    // uploader 为一个plupload对象，继承了所有plupload的方法，参考http://plupload.com/docs
};

var q = function(css){
    return document.querySelector(css);
};
var qa = function(css){
    return document.querySelectorAll(css);
};

var cb = function(data){
    var msg = JSON.parse(data);
    if (msg.succ) {
        alert('succ');
    }else{
        alert(msg.msg);
    };
};
var post = function(){
    var data = {
        name:qa('input')[0].value,
        password:qa('input')[1].value,
        email:qa('input')[2].value
    };
    console.log(data);
    var jsonData = JSON.stringify(data);
    ajax('post','/post',cb,jsonData,'json');
};
q('button').addEventListener('click',post,false);