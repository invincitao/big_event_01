// 入口函数
$(window).on('load', function () {
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    // 2.点击按钮换头像
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    });
    // 3.修改裁剪图片
    $('#file').on('change', function (e) {
        // 3.1拿到用户所选的文件
        // e.target为事件源
        let file = e.target.files[0];
        // 非空校验
        if (file == undefined) {
            layui.layer.msg('请选择图片！');
        }
        // 保存选择图片的路径
        let newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    // 4.上传头像
    $('#btnUpload').on('click', function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 80,
                height: 80
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // console.log($image);
        // console.log(typeof dataURL);
        $.ajax({
            url: '/my/update/avatar',
            type: 'POST',
            data: {
                avatar: dataURL
            },
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg('头像上传成功！', { icon: 6 });
                window.parent.getUserInfo();
            }
        })
    })
})
