function view() {
    return (
        <ul id="filmList" className="list">
            <li className="main">
                content
                <ul>
                    <li>
                        test1
                        <ul>
                            <li>test11</li>
                            <li>test22</li>
                        </ul>
                    </li>
                    <li>test2</li>
                </ul>
            </li>
            {
                true
                    ? <li>
                        true
                        <ul>
                            <li>true1</li>
                            <li>true2</li>
                        </ul>
                    </li>
                    : null
            }
            {
                console.log('mid')
            }
            {
                false ? <li>false</li> : null
            }
            <li>Ferdinand</li>
            <li>Paddington 2</li>
        </ul>
    )
}

function flatten(arr) {
    return [].concat(...arr)
}

// 用 jsx 编译后的 js, 创建 vnode
function h(type, props, ...children) {
    return {
        type,
        props: props || {},
        children: flatten(children)
    }
}

// 设置属性（class、id等）
function setProp(target, name, value) {
    if (name === 'className') {
        return target.setAttribute('class', value)
    }

    target.setAttribute(name, value)
}

// 批量设置属性
function setProps(target, props) {
    Object.keys(props).forEach(key => {
        setProp(target, key, props[key])
    })
}

// 创建dom
function createElement(node) {
    if (!node) {
        return
    }

    if (typeof (node) === 'string') {
        return document.createTextNode(node)
    }

    let { type, props, children } = node
    // 根据 type 创建节点
    const el = document.createElement(type)
    // 设置属性（class、id等）
    setProps(el, props)
    // 子节点递归创建，并且添加到父节点中
    children.map(createElement)
        .filter(e => (e ? e : null))
        .forEach(el.appendChild.bind(el))

    return el
}

// 渲染 dom
function render(el) {
    console.log(view())
    el.appendChild(createElement(view()))
}