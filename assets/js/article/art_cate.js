$(function () {
    let layer = layui.layer;
    let form = layui.form;
    // 1.文章列表展示
    initArtCateList();
    // 函数封装
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            type: 'GET',
            data: {},
            success: (res) => {
                // console.log(res.data);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                let htmlStr = template('tpl-art-cate', { content: res.data })
                $('tbody').html(htmlStr);
            }
        })
    };
    // 2.1模态框
    let indexAdd = null;
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })
    // 2.2添加成功
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                // 更新列表
                initArtCateList();
                layer.msg('添加成功!', { icon: 6 });
                // 关闭模态框
                layer.close(indexAdd);
            }
        })
    })
    // 3.1获取
    let indexEdit = null;
    $('tbody').on('click', '#btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        let Id = $(this).attr('data-id')
        // 3.2修改成功
        $.ajax({
            url: '/my/article/cates/' + Id,
            type: 'get',
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }

                form.val('form-edit', res.data)
            }
        })
    });
    // 3.2修改
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                initArtCateList();
                layer.msg('添加成功!', { icon: 6 });
                // 关闭模态框
                layer.close(indexEdit);
            }
        })
    });
    // 删除
    $('tbody').on('click', '.btn-delete', function () {
        // console.log(Id);
        let id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/deletecate/' + id,
                type: 'GET',
                success: (res) => {
                    if (res.status != 0) {
                        return layui.layer.msg(res.message, { icon: 5 })
                    }
                    initArtCateList();
                    layer.close(index);
                    layer.msg('恭喜，删除成功！')
                }
            })

        });
    })
})